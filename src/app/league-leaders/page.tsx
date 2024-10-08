"use client";

import Table, { ColumnAlignment } from "@/app/ui/table";
import {
  ComparatorOperator,
  OrderDir,
  SearchRequest
} from "@/app/fixed-models";
import { useState } from "react";
import { round } from "@/app/utils";
import { Observable } from "@/app/observable";
import { PlayerSeasonStatline } from "@/app/models";
import { useRouter } from "next/navigation";
import { SeasonOptions, StatOptions } from "@/app/select-options";

export default function () {
  function setStat(idx: string) {
    const option = StatOptions[parseInt(idx, 10)];

    setConfig({
      ...config,
      columns: [
        {
          column: "player.first_name",
          name: "First Name",
          alignment: ColumnAlignment.Left,
          sortable: true
        },
        {
          column: "player.last_name",
          name: "Last Name",
          alignment: ColumnAlignment.Left,
          sortable: true
        },
        {
          column: option.key,
          name: option.name,
          alignment: ColumnAlignment.Right,
          format: (v: any) => round(v, 2),
          sortable: true
        }
      ]
    });

    const searchRequest = {
      ...config.searchRequest$.getValue(),
      order_by: option.key,
      order_dir: OrderDir.Desc
    };

    config.searchRequest$.setValue(searchRequest);
  }

  function setSeason(season: string) {
    const filters = config.searchRequest$
      .getValue()
      .filter.filter(
        (ors) => ors.find((f) => f.attribute === "season") == null
      );

    filters.push([
      {
        attribute: "season",
        comparator: { operator: ComparatorOperator.Equal, value: season }
      }
    ]);

    const searchRequest = {
      ...config.searchRequest$.getValue(),
      filter: filters
    };

    config.searchRequest$.setValue(searchRequest);
  }

  function setTake(take: string) {
    const searchRequest = {
      ...config.searchRequest$.getValue(),
      take: parseInt(take, 10)
    };

    config.searchRequest$.setValue(searchRequest);
  }

  const initialSearchRequest: SearchRequest = {
    order_by: StatOptions[0].key,
    order_dir: OrderDir.Desc,
    filter: [
      [
        {
          attribute: "season",
          comparator: {
            operator: ComparatorOperator.Equal,
            value: SeasonOptions[0].key
          }
        }
      ]
    ],
    take: 10
  };

  const [config, setConfig] = useState({
    columns: [
      {
        column: "player.first_name",
        name: "First Name",
        alignment: ColumnAlignment.Left,
        sortable: false
      },
      {
        column: "player.last_name",
        name: "Last Name",
        alignment: ColumnAlignment.Left,
        sortable: false
      },
      {
        column: StatOptions[0].key,
        name: StatOptions[0].name,
        alignment: ColumnAlignment.Right,
        format: (v: any) => round(v, 2),
        sortable: false
      }
    ],
    searchFn: (request: SearchRequest) =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL!}/league-leaders/players/search`,
        {
          method: "POST",
          body: JSON.stringify(request),
          headers: {
            "Content-Type": "application/json"
          }
        }
      ),
    initialSearchRequest: initialSearchRequest,
    showSearch: false,
    searchRequest$: new Observable(initialSearchRequest),
    tableName: PlayerSeasonStatline.name,
    onRowClick: (entry: PlayerSeasonStatline) =>
      router.push(`/players/${entry.player_id}`),
    showFilter: true
  });

  const router = useRouter();

  return (
    <div>
      <select
        className="webkit-none bg-black rounded-none border-b border-b-gray-700 p-3 w-40 mb-5"
        onChange={(evt) => setStat(evt.target.value)}
      >
        {StatOptions.map((o, idx) => (
          <option className="webkit-none" key={idx} value={idx}>
            {o.name}
          </option>
        ))}
      </select>

      <select
        className="webkit-none bg-black rounded-none border-b border-b-gray-700 p-3 w-40 ml-10"
        onChange={(evt) => setSeason(evt.target.value)}
      >
        {SeasonOptions.map((o, idx) => (
          <option className="webkit-none" key={idx} value={o.key}>
            {o.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="0"
        defaultValue={10}
        className="bg-black border-b border-b-gray-700 p-3 focus:placeholder:text-transparent focus:outline-none w-40 ml-10"
        placeholder="Top "
        onChange={(evt) => setTake(evt.target.value)}
      ></input>

      {config.columns.length > 0 ? (
        <Table config={config}></Table>
      ) : (
        <div></div>
      )}
    </div>
  );
}
