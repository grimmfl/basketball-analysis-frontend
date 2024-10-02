'use client'

import {Player, Team} from "@/app/models";
import {ComparatorOperator, OrderDir} from "@/app/fixed-models";
import {useRouter} from "next/navigation";
import Table, {ColumnAlignment, TableConfig} from "@/app/ui/table";

export default function() {
    const router = useRouter();

    const config: TableConfig<Player> = {
        columns: [
            {name: "First Name", column: "first_name", alignment: ColumnAlignment.Left, sortable: true},
            {name: "Last Name", column: "last_name", alignment: ColumnAlignment.Left, sortable: true},
            {name: "Team", column: "current_roster.roster.team.name", alignment: ColumnAlignment.Left, sortable: true},
            {name: "Position", column: "current_roster.position", alignment: ColumnAlignment.Left, sortable: true},
            {name: "Height", column: "current_roster.height", alignment: ColumnAlignment.Left, sortable: true},
            {name: "Age", column: "current_roster.age", alignment: ColumnAlignment.Left, sortable: true},
        ],
        searchFn: (request) => fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/players/search`, {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            },
        }),
        initialSearchRequest: {
            order_by: "last_name",
            order_dir: OrderDir.Asc,
            filter: [[
                { attribute: "current_roster", comparator: { operator: ComparatorOperator.IsSet, value: null } }
            ]]
        },
        onRowClick: (entry) => {
            router.push(`/players/${entry.id}`)
        },
        showSearch: true,
        tableName: Player.name,
        showFilter: true
    };

    return (
        <div>
            <Table config={config}></Table>
        </div>
    );
}
