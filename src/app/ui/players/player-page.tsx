'use client'

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Player, PlayerSeasonStatline} from "@/app/models";
import {OrderDir} from "@/app/fixed-models";
import {round} from "@/app/utils";
import Table, {ColumnAlignment, TableConfig} from "@/app/ui/table";
import {Play} from "next/dist/compiled/@next/font/dist/google";

export default function () {
    const {playerId} = useParams<{ playerId: string; }>();

    const [player, setPlayer] = useState({} as Player);

    const router = useRouter();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/players/${playerId}/`)
            .then((res) => res.json())
            .then((data: Player) => {
                setPlayer(data);
                setConfig({
                    columns: [
                        {name: "Season", column: "season", alignment: ColumnAlignment.Left, sortable: true},
                        {
                            name: "Team",
                            column: "team.name",
                            alignment: ColumnAlignment.Left,
                            content: (v) => <a className="underline hover:cursor-pointer"
                                               onClick={() => router.push(`/teams/${v.team.id}`)}>{v.team.name}</a>,
                            sortable: true
                        },
                        {
                            name: "PTS",
                            column: "statline.points_per_game",
                            alignment: ColumnAlignment.Right,
                            format: (v) => round(v, 2), sortable: true
                        },
                        {
                            name: "AST",
                            column: "statline.assists_per_game",
                            alignment: ColumnAlignment.Right,
                            format: (v) => round(v, 2), sortable: true
                        },
                        {
                            name: "REB",
                            column: "statline.rebounds_per_game",
                            alignment: ColumnAlignment.Right,
                            format: (v) => round(v, 2), sortable: true
                        },
                        {
                            name: "OREB",
                            column: "statline.offensive_rebounds_per_game",
                            alignment: ColumnAlignment.Right, format: (v) => round(v, 2), sortable: true
                        },
                        {
                            name: "STL",
                            column: "statline.steals_per_game",
                            alignment: ColumnAlignment.Right,
                            format: (v) => round(v, 2), sortable: true
                        },
                        {
                            name: "BLK",
                            column: "statline.blocks_per_game",
                            alignment: ColumnAlignment.Right,
                            format: (v) => round(v, 2), sortable: true
                        },
                        {
                            name: "FGA",
                            column: "statline.fgs_attempted_per_game",
                            alignment: ColumnAlignment.Right,
                            format: (v) => round(v, 2), sortable: true
                        },
                        {
                            name: "FG %",
                            column: "statline.fg_pct",
                            alignment: ColumnAlignment.Right,
                            format: (v) => round(v, 2), sortable: true
                        },
                        {
                            name: "3PA",
                            column: "statline.threes_attempted_per_game",
                            alignment: ColumnAlignment.Right,
                            format: (v) => round(v, 2), sortable: true
                        },
                        {
                            name: "3P %",
                            column: "statline.threes_pct",
                            alignment: ColumnAlignment.Right,
                            format: (v) => round(v, 2), sortable: true
                        },
                        {
                            name: "FTA",
                            column: "statline.fts_attempted_per_game",
                            alignment: ColumnAlignment.Right,
                            format: (v) => round(v, 2), sortable: true
                        },
                        {
                            name: "FT %",
                            column: "statline.ft_pct",
                            alignment: ColumnAlignment.Right,
                            format: (v) => round(v, 2), sortable: true
                        },
                        {
                            name: "MIN",
                            column: "statline.minutes_per_game",
                            alignment: ColumnAlignment.Right,
                            format: (v) => round(v, 2), sortable: true
                        },
                        {
                            name: "GP",
                            column: "statline.games_played",
                            alignment: ColumnAlignment.Right,
                            format: (v) => round(v, 2), sortable: true
                        },
                    ],
                    searchFn: (request) => fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/players/${data.id}/career-stats/search`, {
                        method: "POST",
                        body: JSON.stringify(request),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }),
                    initialSearchRequest: {
                        order_by: "season",
                        order_dir: OrderDir.Desc,
                        filter: []
                    },
                    onRowClick: undefined,
                    showSearch: false,
                    tableName: PlayerSeasonStatline.name,
                    showFilter: false
                })
            });
    }, []);

    const [config, setConfig] = useState(undefined as unknown as TableConfig<PlayerSeasonStatline>);

    return <div>
        <h1 className="text-xl mb-5">{player.first_name} {player.last_name}</h1>
        <div>
            {config == null ? <div></div> : <Table config={config}></Table>}
        </div>
    </div>
}