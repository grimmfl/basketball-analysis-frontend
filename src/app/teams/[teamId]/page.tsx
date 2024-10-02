'use client'

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Roster, RosterPlayerXref, Team} from "@/app/models";
import {OrderDir} from "@/app/fixed-models";
import Table, {ColumnAlignment, TableConfig} from "@/app/ui/table";


export default function () {

    const [team, setTeam] = useState({} as Team);

    const [roster, setRoster] = useState({} as Roster);
    const router = useRouter();

    const {teamId} = useParams<{ teamId: string; }>();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/teams/${teamId}/`)
            .then((res) => res.json())
            .then((data: Team) => {
                setTeam(data)
            });

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/teams/${teamId}/roster`)
            .then((res) => res.json())
            .then((data: Roster) => {
                setConfig({
                    columns: [
                        {name: "First Name", column: "player.first_name", alignment: ColumnAlignment.Left, sortable: true},
                        {name: "Last Name", column: "player.last_name", alignment: ColumnAlignment.Left, sortable: true},
                        {name: "Position", column: "position", alignment: ColumnAlignment.Left, sortable: true},
                        {name: "Height", column: "height", alignment: ColumnAlignment.Right, sortable: true},
                    ],
                    searchFn: (request) => fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/rosters/${data.id}/players/search`, {
                        method: "POST",
                        body: JSON.stringify(request),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }),
                    initialSearchRequest: {
                        order_by: "player.last_name",
                        order_dir: OrderDir.Asc,
                        filter: []
                    },
                    onRowClick: (entry) => {
                        router.push(`/teams/${teamId}/players/${entry.player_id}`)
                    },
                    showSearch: false,
                    tableName: RosterPlayerXref.name,
                    showFilter: false
                });
            });
    }, []);

    const [config, setConfig] = useState(undefined as unknown as TableConfig<RosterPlayerXref>)

    return <div>
        <h1 className="text-xl mb-5">{team.city} {team.name}</h1>
        <div>
            {config == null ? '' : <Table config={config}></Table>}
        </div>
    </div>
}