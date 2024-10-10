"use client";

import { Team } from "@/app/models";
import { OrderDir } from "@/app/fixed-models";
import { useRouter } from "next/navigation";
import Table, { ColumnAlignment, TableConfig } from "@/app/ui/table";

export default function TeamsPage() {
  const router = useRouter();

  const config: TableConfig<Team> = {
    columns: [
      {
        name: "Name",
        column: "name",
        alignment: ColumnAlignment.Left,
        sortable: true
      },
      {
        name: "City",
        column: "city",
        alignment: ColumnAlignment.Left,
        sortable: true
      }
    ],
    searchFn: (request) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/teams/search`, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json"
        }
      }),
    initialSearchRequest: {
      order_by: "name",
      order_dir: OrderDir.Asc,
      filter: []
    },
    onRowClick: (entry) => {
      router.push(`/teams/${entry.id}`);
    },
    showSearch: true,
    tableName: Team.name,
    showFilter: false
  };

  return (
    <div className="min-h-screen max-h-screen">
      <Table config={config} heightClassName="h-team-table"></Table>
    </div>
  );
}
