"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Player, PlayerSeasonTeamStatline, Shot } from "@/app/models";
import { OrderDir } from "@/app/fixed-models";
import { displayHeight, round } from "@/app/utils";
import Table, { ColumnAlignment, TableConfig } from "@/app/ui/table";
import ShotChart from "@/app/ui/shot-chart/shot-chart";
import Spinner from "@/app/ui/spinner";

export default function () {
  const { playerId } = useParams<{ playerId: string }>();

  const [player, setPlayer] = useState({} as Player);
  const [isPlayerLoading, setIsPlayerLoading] = useState(false);
  const [shots, setShots] = useState([] as Shot[]);

  const router = useRouter();

  useEffect(() => {
    setIsPlayerLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/players/${playerId}/`)
      .then((res) => res.json())
      .then((data: Player) => {
        setPlayer(data);
        setIsPlayerLoading(false);
        setConfig({
          columns: [
            {
              name: "Season",
              column: "season",
              alignment: ColumnAlignment.Left,
              sortable: true
            },
            {
              name: "Team",
              column: "team.name",
              alignment: ColumnAlignment.Left,
              content: (v) => (
                <a
                  className="underline hover:cursor-pointer"
                  onClick={() => router.push(`/teams/${v.team.id}`)}
                >
                  {v.team.name}
                </a>
              ),
              sortable: true
            },
            {
              name: "PTS",
              column: "statline.points_per_game",
              alignment: ColumnAlignment.Right,
              format: (v) => round(v, 2),
              sortable: true
            },
            {
              name: "AST",
              column: "statline.assists_per_game",
              alignment: ColumnAlignment.Right,
              format: (v) => round(v, 2),
              sortable: true
            },
            {
              name: "REB",
              column: "statline.rebounds_per_game",
              alignment: ColumnAlignment.Right,
              format: (v) => round(v, 2),
              sortable: true
            },
            {
              name: "OREB",
              column: "statline.offensive_rebounds_per_game",
              alignment: ColumnAlignment.Right,
              format: (v) => round(v, 2),
              sortable: true
            },
            {
              name: "STL",
              column: "statline.steals_per_game",
              alignment: ColumnAlignment.Right,
              format: (v) => round(v, 2),
              sortable: true
            },
            {
              name: "BLK",
              column: "statline.blocks_per_game",
              alignment: ColumnAlignment.Right,
              format: (v) => round(v, 2),
              sortable: true
            },
            {
              name: "FGA",
              column: "statline.fgs_attempted_per_game",
              alignment: ColumnAlignment.Right,
              format: (v) => round(v, 2),
              sortable: true
            },
            {
              name: "FG %",
              column: "statline.fg_pct",
              alignment: ColumnAlignment.Right,
              format: (v) => round(v, 2),
              sortable: true
            },
            {
              name: "3PA",
              column: "statline.threes_attempted_per_game",
              alignment: ColumnAlignment.Right,
              format: (v) => round(v, 2),
              sortable: true
            },
            {
              name: "3P %",
              column: "statline.threes_pct",
              alignment: ColumnAlignment.Right,
              format: (v) => round(v, 2),
              sortable: true
            },
            {
              name: "FTA",
              column: "statline.fts_attempted_per_game",
              alignment: ColumnAlignment.Right,
              format: (v) => round(v, 2),
              sortable: true
            },
            {
              name: "FT %",
              column: "statline.ft_pct",
              alignment: ColumnAlignment.Right,
              format: (v) => round(v, 2),
              sortable: true
            },
            {
              name: "TOV",
              column: "statline.turnovers_per_game",
              alignment: ColumnAlignment.Right,
              format: (v) => round(v, 2),
              sortable: true
            },
            {
              name: "MIN",
              column: "statline.minutes_per_game",
              alignment: ColumnAlignment.Right,
              format: (v) => round(v, 2),
              sortable: true
            },
            {
              name: "GP",
              column: "statline.games_played",
              alignment: ColumnAlignment.Right,
              format: (v) => round(v, 2),
              sortable: true
            }
          ],
          searchFn: (request) =>
            fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL!}/players/${data.id}/career-stats/search`,
              {
                method: "POST",
                body: JSON.stringify(request),
                headers: {
                  "Content-Type": "application/json"
                }
              }
            ),
          initialSearchRequest: {
            order_by: "season",
            order_dir: OrderDir.Desc,
            filter: []
          },
          onRowClick: undefined,
          showSearch: false,
          tableName: PlayerSeasonTeamStatline.name,
          showFilter: false
        });
      });
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/players/${playerId}/shots`)
      .then((res) => res.json())
      .then((shots: Shot[]) => setShots(shots));
  }, []);

  const [config, setConfig] = useState(
    undefined as unknown as TableConfig<PlayerSeasonTeamStatline>
  );

  return (
    <div className="min-h-screen max-h-screen">
      {isPlayerLoading ? (
        <Spinner></Spinner>
      ) : (
        <div className="flex justify-between mb-4">
          <table className="border border-gray-900">
            <tbody>
              <tr className="border-b border-gray-900">
                <td className="px-3 font-bold w-40">Name</td>
                <td className="px-3 text-right">
                  {player.first_name} {player.last_name}
                </td>
              </tr>
              <tr className="border-b border-gray-900">
                <td className="px-3 font-bold">Position</td>
                <td className="px-3 text-right">
                  {player.current_roster?.position}
                </td>
              </tr>
              <tr className="border-b border-gray-900">
                <td className="px-3 font-bold">Team</td>
                <td className="px-3 text-right">
                  {player.current_roster?.roster?.team?.city}{" "}
                  {player.current_roster?.roster?.team?.name}
                </td>
              </tr>
              <tr className="border-b border-gray-900">
                <td className="px-3 font-bold">Age</td>
                <td className="px-3 text-right">
                  {player.current_roster?.age}
                </td>
              </tr>
              <tr className="border-b border-gray-900">
                <td className="px-3 font-bold">Height</td>
                <td className="px-3 text-right">
                  {displayHeight(player.current_roster?.height)}
                </td>
              </tr>
              <tr className="border-b border-gray-900">
                <td className="px-3 font-bold">Weight</td>
                <td className="px-3 text-right">
                  {player.current_roster?.weight} lbs
                </td>
              </tr>
            </tbody>
          </table>
          <ShotChart
            shots={shots}
            size={"small"}
            isPreview
            onClick={() => router.push(`${playerId}/shot-chart`)}
          ></ShotChart>
        </div>
      )}
      <div>
        {config == null ? (
          <div></div>
        ) : (
          <Table config={config} heightClassName="h-player-page-table"></Table>
        )}
      </div>
    </div>
  );
}
