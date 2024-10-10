export interface Option {
  name: string;
  key: string;
}

export const StatOptions: Option[] = [
  { name: "Points (PTS)", key: "statline.points_per_game" },
  { name: "Assists (AST)", key: "statline.assists_per_game" },
  { name: "Rebounds (REB)", key: "statline.rebounds_per_game" },
  {
    name: "Offensive Rebounds (OREB)",
    key: "statline.offensive_rebounds_per_game"
  },
  { name: "Steals (STL)", key: "statline.steals_per_game" },
  { name: "Blocks (BLK)", key: "statline.blocks_per_game" },
  {
    name: "Field Goals Attempted (FGA)",
    key: "statline.fgs_attempted_per_game"
  },
  { name: "Field Goal Percentage (FG %)", key: "statline.fg_pct" },
  { name: "Threes Attempted (3PA)", key: "statline.threes_attempted_per_game" },
  { name: "Three Percentage (3P %)", key: "statline.threes_pct" },
  {
    name: "Free Throws Attempted (FGA)",
    key: "statline.fts_attempted_per_game"
  },
  { name: "Free Throws Percentage (FG %)", key: "statline.ft_pct" },
  { name: "Turnovers (TO)", key: "statline.turnovers_per_game" },
  { name: "Minutes (MIN)", key: "statline.minutes_per_game" },
  { name: "Games Played (GP)", key: "statline.games_played" },
  {
    name: "Mid Range FGA",
    key: "player_season_shot_statline.shot_statline.mid_range_attempted_per_game"
  },
  {
    name: "Mid Range FGM",
    key: "player_season_shot_statline.shot_statline.mid_range_made_per_game"
  },
  {
    name: "Mid Range FG %",
    key: "player_season_shot_statline.shot_statline.mid_range_pct"
  },
  {
    name: "Paint FGA",
    key: "player_season_shot_statline.shot_statline.paint_attempted_per_game"
  },
  {
    name: "Paint FGM",
    key: "player_season_shot_statline.shot_statline.paint_made_per_game"
  },
  {
    name: "Paint FG %",
    key: "player_season_shot_statline.shot_statline.paint_pct"
  },
  {
    name: "Very Tightly Contended FGA",
    key: "player_season_shot_statline.shot_statline.fgs_attempted_very_tight_per_game"
  },
  {
    name: "Very Tightly Contended FGM",
    key: "player_season_shot_statline.shot_statline.fgs_made_very_tight_per_game"
  },
  {
    name: "Very Tightly Contended FG %",
    key: "player_season_shot_statline.shot_statline.fg_pct_very_tight"
  },
  {
    name: "Very Tightly Contended 3PA",
    key: "player_season_shot_statline.shot_statline.threes_attempted_very_tight_per_game"
  },
  {
    name: "Very Tightly Contended 3PM",
    key: "player_season_shot_statline.shot_statline.threes_made_very_tight_per_game"
  },
  {
    name: "Very Tightly Contended 3P %",
    key: "player_season_shot_statline.shot_statline.threes_pct_very_tight"
  },
  {
    name: "Tightly Contended FGA",
    key: "player_season_shot_statline.shot_statline.fgs_attempted_tight_per_game"
  },
  {
    name: "Tightly Contended FGM",
    key: "player_season_shot_statline.shot_statline.fgs_made_tight_per_game"
  },
  {
    name: "Tightly Contended FG %",
    key: "player_season_shot_statline.shot_statline.fg_pct_tight"
  },
  {
    name: "Tightly Contended 3PA",
    key: "player_season_shot_statline.shot_statline.threes_attempted_tight_per_game"
  },
  {
    name: "Tightly Contended 3PM",
    key: "player_season_shot_statline.shot_statline.threes_made_tight_per_game"
  },
  {
    name: "Tightly Contended 3P %",
    key: "player_season_shot_statline.shot_statline.threes_pct_tight"
  },
  {
    name: "Open FGA",
    key: "player_season_shot_statline.shot_statline.fgs_attempted_open_per_game"
  },
  {
    name: "Open FGM",
    key: "player_season_shot_statline.shot_statline.fgs_made_open_per_game"
  },
  {
    name: "Open FG %",
    key: "player_season_shot_statline.shot_statline.fg_pct_open"
  },
  {
    name: "Open 3PA",
    key: "player_season_shot_statline.shot_statline.threes_attempted_open_per_game"
  },
  {
    name: "Open 3PM",
    key: "player_season_shot_statline.shot_statline.threes_made_open_per_game"
  },
  {
    name: "Open 3P %",
    key: "player_season_shot_statline.shot_statline.threes_pct_open"
  },
  {
    name: "Wide Open FGA",
    key: "player_season_shot_statline.shot_statline.fgs_attempted_wide_open_per_game"
  },
  {
    name: "Wide Open FGM",
    key: "player_season_shot_statline.shot_statline.fgs_made_wide_open_per_game"
  },
  {
    name: "Wide Open FG %",
    key: "player_season_shot_statline.shot_statline.fg_pct_wide_open"
  },
  {
    name: "Wide Open 3PA",
    key: "player_season_shot_statline.shot_statline.threes_attempted_wide_open_per_game"
  },
  {
    name: "Wide Open 3PM",
    key: "player_season_shot_statline.shot_statline.threes_made_wide_open_per_game"
  },
  {
    name: "Wide Open 3P %",
    key: "player_season_shot_statline.shot_statline.threes_pct_wide_open"
  }
];

export const SeasonOptions: Option[] = Array.from(Array(24).keys())
  .map((_, idx) => 2000 + idx)
  .sort((a, b) => b - a)
  .map((v) => `${v.toString()}-${(v - 1999).toString()}`)
  .map((v) => ({ key: v, name: v }));
