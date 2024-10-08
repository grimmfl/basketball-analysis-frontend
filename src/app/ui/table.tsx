import SortIcon from "@/app/ui/sort-icon";
import {
  ComparatorOperator,
  OrderDir,
  SearchRequest
} from "@/app/fixed-models";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Observable } from "@/app/observable";
import { resolveProperty } from "@/app/utils";
import Spinner from "@/app/ui/spinner";
import FilterForm, { Filter, FilterConfig } from "@/app/ui/filter/filter-form";

export enum ColumnAlignment {
  Left,
  Right,
  Center
}

export interface TableColumn<T> {
  column: string;
  headerClassName?: string;
  name: string;
  alignment: ColumnAlignment;
  format?: (value: any) => any;
  content?: (entry: T) => any;
  sortable: boolean;
}

export interface TableConfig<T> {
  columns: TableColumn<T>[];
  searchFn: (searchRequest: SearchRequest) => Promise<Response>;
  initialSearchRequest: SearchRequest;
  onRowClick?: (entry: T) => void;
  showSearch: boolean;
  searchRequest$?: Observable<SearchRequest>;
  tableName: string;
  showFilter: boolean;
}

export default function Table<T>({ config }: { config: TableConfig<T> }) {
  const filterConfig: FilterConfig = {
    tableName: config.tableName,
    onChange: (f) => setFilters(f)
  };

  function updateSearchRequest(request: SearchRequest, prop: string) {
    if (request?.order_by === prop) {
      return {
        ...request,
        order_dir:
          request.order_dir === OrderDir.Asc ? OrderDir.Desc : OrderDir.Asc
      };
    } else {
      return {
        ...request,
        order_by: prop,
        order_dir: OrderDir.Asc
      };
    }
  }

  function changeSearchValue(value: string) {
    if (!config.showSearch) return;

    const newFilter = filters.filter((f) => f.name === "search");

    newFilter.push({
      name: "search",
      key: "search",
      comparator: { operator: ComparatorOperator.Contains, value: value }
    });

    setFilters(newFilter);
    search(searchRequest, undefined, newFilter);
  }

  function sort(column: string) {
    const newSearchRequest = updateSearchRequest(searchRequest, column);

    setSearchRequest(newSearchRequest);

    search(newSearchRequest);
  }

  function search(
    request: SearchRequest,
    custom_external_filters?: Filter[],
    custom_filters?: Filter[]
  ) {
    const ext = custom_external_filters ?? externalFilters;
    const int = custom_filters ?? filters;

    if (ext.length > 0 || int.length > 0)
      request = {
        ...request,
        filter: ext
          .concat(int)
          .map((f) => [{ attribute: f.key, comparator: f.comparator }])
      };

    setIsLoading(true);

    config
      .searchFn(request)
      .then((res) => res.json())
      .then((data: T[] | { detail: any[] }) => {
        if (data != null && !data.hasOwnProperty("detail"))
          setData(data as T[]);
        setIsLoading(false);
      });
  }

  function getHeaderAlignment(column: TableColumn<T>) {
    switch (column.alignment) {
      case ColumnAlignment.Left:
        return "justify-start";
      case ColumnAlignment.Center:
        return "justify-center";
      case ColumnAlignment.Right:
        return "justify-end";
    }
  }

  function getAlignment(column: TableColumn<T>) {
    switch (column.alignment) {
      case ColumnAlignment.Left:
        return "text-left";
      case ColumnAlignment.Center:
        return "text-center";
      case ColumnAlignment.Right:
        return "text-right";
    }
  }

  function getColumnValue(entry: T, column: TableColumn<T>) {
    if (column.content != null) return column.content(entry);

    const value = resolveProperty(entry, column.column);

    if (column.format == null) return value;

    return column.format(value);
  }

  if (config.searchRequest$ != null)
    config.searchRequest$.subscribe((r) => {
      const external = r.filter.map((f) => ({
        key: f[0].attribute,
        name: "",
        comparator: f[0].comparator
      }));
      setExternalFilters(external);
      search(r, external);
      setSearchRequest(r);
    });

  const [data, setData] = useState([] as T[]);

  const [searchRequest, setSearchRequest] = useState(
    config.initialSearchRequest
  );

  const [externalFilters, setExternalFilters] = useState([] as Filter[]);

  const [filters, setFilters] = useState([] as Filter[]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    search(searchRequest);
  }, []);

  useEffect(() => {
    setExternalFilters(
      config.initialSearchRequest.filter.map((f) => ({
        key: f[0].attribute,
        name: "",
        comparator: f[0].comparator
      }))
    );
  }, []);

  const tableRef = useRef(null);

  return (
    <div>
      {config.showSearch ? (
        <input
          placeholder="Search ..."
          className="bg-black border-b border-b-gray-700 p-3 focus:placeholder:text-transparent focus:outline-none mb-5"
          onChange={(evt) => changeSearchValue(evt.target.value)}
        ></input>
      ) : (
        <div></div>
      )}
      <div className="flex justify-between">
        <div className="max-h-screen w-full mr-2">
          <div className="h-full h-table overflow-y-auto">
            <table className="min-w-full" id="table" ref={tableRef}>
              <thead className="position-sticky bg-secondary border-b-4 border-b-gray-900">
                <tr className="text-left border-b-4 border-b-gray-900">
                  {config.columns?.map((c, idx) => (
                    <th
                      key={idx}
                      className={
                        c.headerClassName ??
                        clsx("p-3 w-auto", {
                          "hover:cursor-pointer": c.sortable
                        })
                      }
                      onClick={() => (c.sortable ? sort(c.column) : {})}
                    >
                      <div className={`flex ${getHeaderAlignment(c)}`}>
                        <span className="mr-2">{c.name}</span>
                        <SortIcon
                          prop={c.column}
                          request={searchRequest}
                        ></SortIcon>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="pr-3">
                {isLoading ? (
                  <tr>
                    <td>
                      <Spinner></Spinner>
                    </td>
                  </tr>
                ) : (
                  data.map((entry: T, idx) => (
                    <tr
                      key={idx}
                      className={clsx("border-b border-b-gray-900", {
                        "hover:cursor-pointer hover:bg-gray-900":
                          config.onRowClick != null
                      })}
                      onClick={() =>
                        config.onRowClick != null
                          ? config.onRowClick(entry)
                          : {}
                      }
                    >
                      {config.columns.map((c, cidx) => (
                        <td key={cidx} className={`p-3 ${getAlignment(c)}`}>
                          {getColumnValue(entry, c)}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div
          hidden={!config.showFilter}
          className="w-1/2 max-h-screen h-screen"
        >
          <button
            className="border border-gray-700 p-3 min-w-full mb-2 hover:bg-gray-900"
            onClick={() => search(searchRequest)}
          >
            Apply Filters
          </button>
          <div className="overflow-y-auto h-filter">
            <FilterForm config={filterConfig}></FilterForm>
          </div>
        </div>
      </div>
    </div>
  );
}
