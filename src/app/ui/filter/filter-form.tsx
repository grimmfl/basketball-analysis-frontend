import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useState } from "react";
import { ComparatorOperator, SearchComparator } from "@/app/fixed-models";
import { getProperty, removeDuplicates, zip } from "@/app/utils";
import { FilterType, Translations } from "@/app/translations";
import FilterSelect, { FilterSelectModel } from "@/app/ui/filter/filter-select";
import { Option } from "@/app/select-options";

export interface FilterConfig {
  onChange: (filters: Filter[]) => void;
  tableName: string;
  defaultFilters?: Filter[];
  expandGroups?: boolean;
}

export interface Filter {
  name: string;
  key: string;
  comparator: SearchComparator;
  type: FilterType;
  options: Option[];
}

interface FilterGroup {
  name: string;
  key: string;
  filters: Filter[];
}

function resolveEnumFilter(
  key: string,
  enum_value: { type: string; name: string }
): Filter {
  const translations = getProperty(Translations.__enums__, enum_value.name);
  const options = Object.getOwnPropertyNames(translations).filter(
    (o) => o !== "__name__"
  );

  return {
    name: getProperty(translations, "__name__").name,
    key: key,
    comparator: { operator: ComparatorOperator.Equal, value: options[0] },
    type: "enum",
    options: options.map((o) => ({
      name: getProperty(translations, o).name,
      key: o
    }))
  };
}

function resolveFilters(
  properties: string[],
  translations: any,
  prefix: string = "",
  skipPrefix: number = 0
): FilterGroup[] {
  const group: FilterGroup = {
    name: getProperty(translations, "__name__")?.name,
    filters: [],
    key: prefix
  };

  let groups: FilterGroup[] = [group];

  for (const property of properties) {
    const value = getProperty(translations, property);

    if (!Object.hasOwn(value, "__name__")) {
      if (value.type == "enum") {
        group.filters.push(resolveEnumFilter(prefix + property, value));
      } else {
        group.filters.push({
          key: prefix + property,
          name: value.name,
          comparator: {
            operator:
              value.type === "boolean"
                ? ComparatorOperator.IsTrue
                : value.type === "string"
                  ? ComparatorOperator.Contains
                  : ComparatorOperator.Equal,
            value: value.type === "string" ? "" : 0
          },
          type: value.type,
          options: []
        });
      }
    } else {
      let newPrefix = prefix;
      if (skipPrefix <= 0) newPrefix += property + ".";

      if (value == null) continue;

      const subProperties = Object.getOwnPropertyNames(value).filter(
        (p) => p != "__name__"
      );
      groups = groups.concat(
        resolveFilters(subProperties, value, newPrefix, skipPrefix - 1)
      );
    }
  }

  return removeDuplicates(
    groups
      .filter((g) => g.filters.length > 0)
      .sort((a, b) => a.key.length - b.key.length),
    (i) => i.name
  ).sort((a, b) => a.name.localeCompare(b.name));
}

function resolveTableFilters(table: string) {
  return resolveFilters([table], Translations, "", 1);
}

function getOperators() {
  const valueMembers = [];
  const nonValueMembers = [];

  for (let member in ComparatorOperator) {
    if (Number(member) >= 0) valueMembers.push(member);
    else nonValueMembers.push(member);
  }

  return zip(nonValueMembers, valueMembers).map((v) => ({
    name: v.item1.split(/(?<![A-Z])(?=[A-Z])/).join(" "),
    value: v.item2
  }));
}

function getFilterSelectModel(filter: Filter): FilterSelectModel | null {
  if (!filter.key.endsWith(".id")) return null;

  const splitted = filter.key.split(".");

  const name = splitted.at(-2);

  switch (name) {
    case "team":
      return FilterSelectModel.Team;
    default:
      return null;
  }
}

export default function FilterForm({ config }: { config: FilterConfig }) {
  const expandGroups = config.expandGroups ?? false;

  const allFilters = resolveTableFilters(config.tableName);

  const [availableFilters, setAvailableFilters] = useState(allFilters);
  const filterOperators = getOperators();
  const booleanOperators = [
    { name: "Yes", value: ComparatorOperator.IsTrue },
    { name: "No", value: ComparatorOperator.IsFalse }
  ];

  const defaultFilters = config.defaultFilters ?? [];
  let defaultGroups = availableFilters.filter((g) =>
    g.filters.some((f) => defaultFilters.some((df) => f.key === df.key))
  );

  if (expandGroups) defaultGroups = availableFilters;

  defaultGroups.forEach((g) =>
    g.filters.forEach((f) => {
      const defaultFilter = defaultFilters.find((df) => df.key === f.key);

      if (defaultFilter == null) return;

      f.comparator = defaultFilter.comparator;
    })
  );

  const [filters, setFilters] = useState(defaultFilters);
  const [visibleGroups, setVisibleGroups] = useState(defaultGroups);

  function filterIsActive(filter: Filter) {
    return filters.find((f) => f.key === filter.key) != null;
  }

  function toggleFilter(filter: Filter) {
    let newFilters;

    if (filterIsActive(filter)) {
      newFilters = filters.filter((f) => f.key !== filter.key);
    } else {
      newFilters = filters.concat([filter]);
    }

    update(newFilters);
  }

  function setFilterOperator(filter: Filter, value: string) {
    let newFilters = filters.filter((f) => f.key !== filter.key);
    let thisFilter = filters.find((f) => f.key === filter.key)!;
    newFilters.push({
      ...thisFilter,
      comparator: { ...thisFilter.comparator, operator: Number(value) }
    });
    update(newFilters);
  }

  function setFilterValue(filter: Filter, value: string) {
    let newFilters = filters.filter((f) => f.key !== filter.key);
    let thisFilter = filters.find((f) => f.key === filter.key)!;
    newFilters.push({
      ...thisFilter,
      comparator: { ...thisFilter.comparator, value: value }
    });
    update(newFilters);
  }

  function toggleFilterGroup(group: FilterGroup) {
    const groupIdx = visibleGroups.findIndex((g) => g.name === group.name);

    if (groupIdx === -1) {
      setVisibleGroups(visibleGroups.concat([group]));
    } else {
      setVisibleGroups(visibleGroups.filter((g, idx) => idx !== groupIdx));
    }
  }

  function update(filters: Filter[]) {
    setFilters(filters);
    config.onChange(filters);
  }

  function searchFilters(value: string) {
    value = value.toLowerCase();

    const groups = allFilters
      .map((g) => ({
        ...g,
        filters: g.filters.filter(
          (f) =>
            f.name.toLowerCase().includes(value) ||
            f.key.toLowerCase().includes(value)
        )
      }))
      .filter((g) => g.filters.length > 0);
    setAvailableFilters(groups);

    //const totalFilterCount = groups.reduce((prev, curr) => prev + curr.filters.length, 0);
    //
    //if (totalFilterCount <= 10) {
    //  setVisibleGroups(groups);
    //}
  }

  return (
    <div>
      <input
        placeholder="Search Filters ..."
        className="bg-background border-b border-b-gray-700 p-3 focus:placeholder:text-transparent focus:outline-none"
        onChange={(evt) => searchFilters(evt.target.value)}
      ></input>
      <table>
        <tbody>
          {availableFilters.map((g, idx1) =>
            visibleGroups.some((vg) => vg.name === g.name) ? (
              [
                <tr
                  key={`${idx1}-toggle`}
                  className="hover:cursor-pointer"
                  onClick={() => toggleFilterGroup(g)}
                >
                  <td className="pt-5">
                    <ChevronUpIcon className="w-4 mr-2"></ChevronUpIcon>
                  </td>
                  <td className="pt-5">{g.name}</td>
                </tr>
              ].concat(
                g.filters.map((f, idx2) =>
                  // FILTER SELECT
                  f.key.includes("_id") ||
                  f.key.includes(".id") ||
                  f.key === "id" ? (
                    <tr
                      key={`${idx1}${idx2}`}
                      className={clsx({
                        "text-gray-500": !filterIsActive(f)
                      })}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={filterIsActive(f)}
                          onChange={() => toggleFilter(f)}
                          className="mr-2"
                        ></input>
                      </td>
                      <td>{f.name}</td>
                      <td colSpan={2}>
                        {getFilterSelectModel(f) != null ? (
                          <FilterSelect
                            disabled={!filterIsActive(f)}
                            model={getFilterSelectModel(f)!}
                            onChange={(id) => setFilterValue(f, id.toString())}
                            defaultId={parseInt(f.comparator.value, 10)}
                          ></FilterSelect>
                        ) : (
                          <span className="m-3">Not Available</span>
                        )}
                      </td>
                    </tr>
                  ) : (
                    <tr
                      key={`${idx1}${idx2}`}
                      className={clsx({
                        "text-gray-500": !filterIsActive(f)
                      })}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={filterIsActive(f)}
                          onChange={() => toggleFilter(f)}
                          className="mr-2"
                        ></input>
                      </td>
                      <td className="min-w-32">{f.name}</td>
                      <td>
                        <select
                          disabled={!filterIsActive(f)}
                          className="webkit-none bg-background rounded-none border-b border-b-gray-700 p-3 w-40"
                          onChange={(evt) =>
                            setFilterOperator(f, evt.target.value)
                          }
                          defaultValue={f.comparator.operator}
                        >
                          {(f.type === "boolean"
                            ? booleanOperators
                            : filterOperators
                          ).map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        {f.type === "enum" ? (
                          <select
                            disabled={!filterIsActive(f)}
                            className="webkit-none bg-background rounded-none border-b border-b-gray-700 p-3 w-40 ml-10"
                            defaultValue={f.comparator.value}
                            onChange={(evt) =>
                              setFilterValue(f, evt.target.value)
                            }
                          >
                            {f.options.map((o, idx) => (
                              <option key={idx} value={o.key}>
                                {o.name}
                              </option>
                            ))}
                          </select>
                        ) : f.type === "boolean" ? (
                          ""
                        ) : (
                          <input
                            type={f.type === "number" ? "number" : "text"}
                            disabled={!filterIsActive(f)}
                            className="bg-background border-b border-b-gray-700 p-3 focus:placeholder:text-transparent focus:outline-none w-40 ml-10"
                            defaultValue={f.comparator.value}
                            onChange={(evt) =>
                              setFilterValue(f, evt.target.value)
                            }
                          ></input>
                        )}
                      </td>
                    </tr>
                  )
                )
              )
            ) : (
              <tr
                key={`${idx1}toggle`}
                className="hover:cursor-pointer"
                onClick={() => toggleFilterGroup(g)}
              >
                <td className="pt-5">
                  <ChevronDownIcon className="w-4 mr-2"></ChevronDownIcon>
                </td>
                <td className="pt-5">{g.name}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
