import { Player, Team } from "@/app/models";

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

export const PATHS: Path[] = [
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

export async function parse_path(
  paths: Path[],
  crumbs: string[]
): Promise<string[]> {
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
