"use client";

import { usePathname, useRouter } from "next/navigation";
import { Player, Team } from "@/app/models";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export function prettifyName(name: string) {
  name = name.substring(0, 1)!.toUpperCase() + name.substring(1, name.length);

  name = name
    .split("_")
    .map((n) => n.substring(0, 1)!.toUpperCase() + n.substring(1, name.length))
    .join(" ");

  return name;
}

async function getTeamName(id: string): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/teams/${id}`
  );

  const team: Team = await response.json();

  return `${team.city} ${team.name}`;
}

async function getPlayerName(id: string): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/players/${id}`
  );

  const player: Player = await response.json();

  return `${player.first_name} ${player.last_name}`;
}

interface Path {
  path: string;
  resolve: (_: string) => Promise<string>;
  children: Path[];
}

const PATHS: Path[] = [
  {
    path: "teams",
    resolve: async (_: string) => "teams",
    children: [
      {
        path: "{team_id}",
        resolve: async (id: string) => await getTeamName(id),
        children: [
          {
            path: "players",
            resolve: async (_: string) => "players",
            children: [
              {
                path: "{player_id}",
                resolve: async (id: string) => await getPlayerName(id),
                children: [
                  {
                    path: "shot-chart",
                    resolve: async (_: string) => "shot_chart",
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "players",
    resolve: async (_: string) => "players",
    children: [
      {
        path: "{player_id}",
        resolve: async (id: string) => await getPlayerName(id),
        children: [
          {
            path: "shot-chart",
            resolve: async (_: string) => "shot_chart",
            children: []
          }
        ]
      }
    ]
  },
  {
    path: "league-leaders",
    resolve: async (_: string) => "league_leaders",
    children: []
  }
];

async function parse_path(paths: Path[], crumbs: string[]): Promise<string[]> {
  if (crumbs.length == 0) return [];

  const crumb = crumbs[0];

  const exactMatch = paths.find((p) => p.path === crumb);

  if (exactMatch !== undefined) {
    const resolved = await exactMatch.resolve(crumb);

    const remainder = await parse_path(exactMatch.children, crumbs.slice(1));

    return [resolved].concat(remainder);
  }

  const idMatch = paths.find((p) => p.path.startsWith("{"));

  if (idMatch !== undefined) {
    const resolved = await idMatch.resolve(crumb);

    const remainder = await parse_path(idMatch.children, crumbs.slice(1));

    return [resolved].concat(remainder);
  }

  return [];
}

export default async function Breadcrumbs() {
  function routeTo(idx: number) {
    router.push("/" + crumbs.slice(0, idx + 1).join("/"));
  }

  const path = usePathname();
  const router = useRouter();

  const crumbs = path.split("/").filter((c) => c != "");

  const names = await parse_path(PATHS, crumbs);

  return (
    <div className="flex">
      {names.map((c, idx) => (
        <span key={idx} className="font-bold flex">
          {idx < names.length - 1 ? (
            <a
              className="underline hover:cursor-pointer"
              onClick={() => routeTo(idx)}
            >
              {prettifyName(c)}
            </a>
          ) : (
            prettifyName(c)
          )}

          {idx < names.length - 1 ? (
            <ChevronRightIcon className="w-4 mx-1"></ChevronRightIcon>
          ) : (
            ""
          )}
        </span>
      ))}
    </div>
  );
}
