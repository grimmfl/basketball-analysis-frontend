"use client";

import { useParams } from "next/navigation";
import ShotChart from "@/app/ui/shot-chart/shot-chart";
import FilterForm, { Filter, FilterConfig } from "@/app/ui/filter/filter-form";
import { useEffect, useState } from "react";
import { Shot } from "@/app/models";
import { OrderDir, SearchRequest } from "@/app/fixed-models";

export default function ShotChartPage() {
  const { playerId } = useParams<{ playerId: string }>();

  const filterConfig: FilterConfig = {
    onChange: (f) => search(f),
    tableName: "Shot"
  };

  const [data, setData] = useState([] as Shot[]);

  const searchRequest: SearchRequest = {
    order_by: "id",
    order_dir: OrderDir.Asc,
    filter: [],
    take: -1
  };

  function search(filters: Filter[]) {
    const request = {
      ...searchRequest,
      filter: filters.map((f) => [
        { attribute: f.key, comparator: f.comparator }
      ])
    };

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL!}/players/${playerId}/shots/search`,
      {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then((res) => res.json())
      .then((shots: Shot[]) => setData(shots));
  }

  useEffect(() => {
    search([]);
  }, []);

  return (
    <div className="inline-flex justify-between">
      <ShotChart size={"large"} shots={data}></ShotChart>
      <div className="flex-col">
        <FilterForm config={filterConfig}></FilterForm>
      </div>
    </div>
  );
}
