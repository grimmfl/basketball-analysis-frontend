export interface Option {
    name: string;
    key: string;
}

export const StatOptions: Option[] = [
    {name: "Points (PTS)", key: "statline.points_per_game"},
    {name: "Assists (AST)", key: "statline.assists_per_game"},
    {name: "Rebounds (REB)", key: "statline.rebounds_per_game"},
    {name: "Offensive Rebounds (OREB)", key: "statline.offensive_rebounds_per_game"},
    {name: "Steals (STL)", key: "statline.steals_per_game"},
    {name: "Blocks (BLK)", key: "statline.blocks_per_game"},
    {name: "Field Goals Attempted (FGA)", key: "statline.fgs_attempted_per_game"},
    {name: "Field Goal Percentage (FG %)", key: "statline.fg_pct"},
    {name: "Threes Attempted (3PA)", key: "statline.threes_attempted_per_game"},
    {name: "Three Percentage (3P %)", key: "statline.threes_pct"},
    {name: "Free Throws Attempted (FGA)", key: "statline.fts_attempted_per_game"},
    {name: "Free Throws Percentage (FG %)", key: "statline.ft_pct"},
    {name: "Minutes (MIN)", key: "statline.minutes_per_game"},
    {name: "Games Played (GP)", key: "statline.games_played"},
];

export const SeasonOptions: Option[] = Array.from(Array(24).keys())
    .map((_, idx) => 2000 + idx)
    .sort((a, b) => b - a)
    .map(v => `${v.toString()}-${(v - 1999).toString()}`)
    .map(v => ({ key: v, name: v}));