export type FilterType =
  | "number"
  | "boolean"
  | "string"
  | "date"
  | "enum"
  | "none";

export const Translations = {
  __enums__: {
    Origin: {
      NBA: { name: "NBA", type: "none" },
      __name__: { name: "Origin", type: "none" }
    },
    ShotType: {
      TWO_POINTER: { name: "2PT", type: "none" },
      THREE_POINTER: { name: "3PT", type: "none" },
      __name__: { name: "Shot Type", type: "none" }
    },
    ShotZoneBasic: {
      RESTRICTED_AREA: { name: "Restricted area", type: "none" },
      IN_THE_PAINT: { name: "In the paint (Non RA)", type: "none" },
      ABOVE_THE_BREAK: { name: "Above the break 3PT", type: "none" },
      MID_RANGE: { name: "Mid range", type: "none" },
      LEFT_CORNER: { name: "Left corner 3PT", type: "none" },
      RIGHT_CORNER: { name: "Right corner 3PT", type: "none" },
      BACK_COURT: { name: "Back court", type: "none" },
      __name__: { name: "Shot Zone", type: "none" }
    },
    ShotZoneArea: {
      CENTER: { name: "Center", type: "none" },
      RIGHT_SIDE_CENTER: { name: "Right Side Center", type: "none" },
      LEFT_SIDE_CENTER: { name: "Left Side Center", type: "none" },
      RIGHT_SIDE: { name: "Right Side", type: "none" },
      LEFT_SIDE: { name: "Left Side", type: "none" },
      BACK_COURT: { name: "Back Court", type: "none" },
      __name__: { name: "Shot Area", type: "none" }
    },
    ShotZoneRange: {
      LESS_THAN_8FT: { name: "Less than 8 ft", type: "none" },
      MORE_THAN_24FT: { name: "More than 24 ft", type: "none" },
      BETWEEN_8FT_16FT: { name: "8 ft to 16 ft", type: "none" },
      BETWEEN_16FT_24FT: { name: "16 ft to 24 ft", type: "none" },
      BACK_COURT: { name: "Back cort", type: "none" },
      __name__: { name: "Shot Range", type: "none" }
    }
  },
  Statline: {
    points: { name: "Total PTS", type: "number" },
    rebounds: { name: "Total REB", type: "number" },
    assists: { name: "Total AST", type: "number" },
    steals: { name: "Total STL", type: "number" },
    blocks: { name: "Total BLK", type: "number" },
    fgs_attempted: { name: "Total FGA", type: "number" },
    fgs_made: { name: "Total FGM", type: "number" },
    threes_attempted: { name: "Total 3PA", type: "number" },
    threes_made: { name: "Total 3PM", type: "number" },
    fts_attempted: { name: "Total FTA", type: "number" },
    fts_made: { name: "Total FTM", type: "number" },
    turnovers: { name: "Total TOV", type: "number" },
    offensive_rebounds: { name: "Total OREB", type: "number" },
    fouls: { name: "Total FLS", type: "number" },
    games_played: { name: "GP", type: "number" },
    minutes: { name: "Total MIN", type: "number" },
    points_per_game: { name: "PTS", type: "number" },
    rebounds_per_game: { name: "REB", type: "number" },
    assists_per_game: { name: "AST", type: "number" },
    steals_per_game: { name: "STL", type: "number" },
    blocks_per_game: { name: "BLK", type: "number" },
    fgs_attempted_per_game: { name: "FGA", type: "number" },
    fgs_made_per_game: { name: "FGM", type: "number" },
    threes_attempted_per_game: { name: "3PA", type: "number" },
    threes_made_per_game: { name: "3PM", type: "number" },
    fts_attempted_per_game: { name: "FTA", type: "number" },
    fts_made_per_game: { name: "FTM", type: "number" },
    turnovers_per_game: { name: "TOV", type: "number" },
    offensive_rebounds_per_game: { name: "OREB", type: "number" },
    fouls_per_game: { name: "FLS", type: "number" },
    minutes_per_game: { name: "MIN", type: "number" },
    fg_pct: { name: "FG %", type: "number" },
    threes_pct: { name: "3P %", type: "number" },
    ft_pct: { name: "FT %", type: "number" },
    __name__: { name: "Statline", type: "number" }
  },
  Player: {
    first_name: { name: "First Name", type: "string" },
    last_name: { name: "Last Name", type: "string" },
    current_roster: {
      number: { name: "Number", type: "string" },
      position: { name: "Position", type: "string" },
      height: { name: "Height", type: "string" },
      weight: { name: "Weight", type: "number" },
      age: { name: "Age", type: "number" },
      roster: {
        team: {
          id: { name: "Team", type: "number" },
          name: { name: "Name", type: "string" },
          city: { name: "City", type: "string" },
          __name__: { name: "Team", type: "number" }
        },
        __name__: { name: "Roster", type: "TODO" }
      },
      __name__: { name: "Player Data", type: "number" }
    },
    __name__: { name: "Player", type: "number" }
  },
  Game: {
    season: { name: "Season", type: "string" },
    date: { name: "Date", type: "date" },
    team1_id: { name: "ID Team 1", type: "number" },
    team2_id: { name: "ID Team 2", type: "number" },
    statline_team1_id: { name: "ID Statline Team 1", type: "number" },
    statline_team2_id: { name: "ID Statline Team 2", type: "v" },
    winner_team_id: { name: "ID Winner Team", type: "number" },
    team2: {
      id: { name: "Team", type: "number" },
      name: { name: "Name", type: "string" },
      city: { name: "City", type: "string" },
      __name__: { name: "Team", type: "number" }
    },
    statline_team1: {
      points: { name: "Total PTS", type: "number" },
      rebounds: { name: "Total REB", type: "number" },
      assists: { name: "Total AST", type: "number" },
      steals: { name: "Total STL", type: "number" },
      blocks: { name: "Total BLK", type: "number" },
      fgs_attempted: { name: "Total FGA", type: "number" },
      fgs_made: { name: "Total FGM", type: "number" },
      threes_attempted: { name: "Total 3PA", type: "number" },
      threes_made: { name: "Total 3PM", type: "number" },
      fts_attempted: { name: "Total FTA", type: "number" },
      fts_made: { name: "Total FTM", type: "number" },
      turnovers: { name: "Total TOV", type: "number" },
      offensive_rebounds: { name: "Total OREB", type: "number" },
      fouls: { name: "Total FLS", type: "number" },
      games_played: { name: "GP", type: "number" },
      minutes: { name: "Total MIN", type: "number" },
      points_per_game: { name: "PTS", type: "number" },
      rebounds_per_game: { name: "REB", type: "number" },
      assists_per_game: { name: "AST", type: "number" },
      steals_per_game: { name: "STL", type: "number" },
      blocks_per_game: { name: "BLK", type: "number" },
      fgs_attempted_per_game: { name: "FGA", type: "number" },
      fgs_made_per_game: { name: "FGM", type: "number" },
      threes_attempted_per_game: { name: "3PA", type: "number" },
      threes_made_per_game: { name: "3PM", type: "number" },
      fts_attempted_per_game: { name: "FTA", type: "number" },
      fts_made_per_game: { name: "FTM", type: "number" },
      turnovers_per_game: { name: "TOV", type: "number" },
      offensive_rebounds_per_game: { name: "OREB", type: "number" },
      fouls_per_game: { name: "FLS", type: "number" },
      minutes_per_game: { name: "MIN", type: "number" },
      fg_pct: { name: "FG %", type: "number" },
      threes_pct: { name: "3P %", type: "number" },
      ft_pct: { name: "FT %", type: "number" },
      __name__: { name: "Statline", type: "number" }
    },
    statline_team2: {
      points: { name: "Total PTS", type: "number" },
      rebounds: { name: "Total REB", type: "number" },
      assists: { name: "Total AST", type: "number" },
      steals: { name: "Total STL", type: "number" },
      blocks: { name: "Total BLK", type: "number" },
      fgs_attempted: { name: "Total FGA", type: "number" },
      fgs_made: { name: "Total FGM", type: "number" },
      threes_attempted: { name: "Total 3PA", type: "number" },
      threes_made: { name: "Total 3PM", type: "number" },
      fts_attempted: { name: "Total FTA", type: "number" },
      fts_made: { name: "Total FTM", type: "number" },
      turnovers: { name: "Total TOV", type: "number" },
      offensive_rebounds: { name: "Total OREB", type: "number" },
      fouls: { name: "Total FLS", type: "number" },
      games_played: { name: "GP", type: "number" },
      minutes: { name: "Total MIN", type: "number" },
      points_per_game: { name: "PTS", type: "number" },
      rebounds_per_game: { name: "REB", type: "number" },
      assists_per_game: { name: "AST", type: "number" },
      steals_per_game: { name: "STL", type: "number" },
      blocks_per_game: { name: "BLK", type: "number" },
      fgs_attempted_per_game: { name: "FGA", type: "number" },
      fgs_made_per_game: { name: "FGM", type: "number" },
      threes_attempted_per_game: { name: "3PA", type: "number" },
      threes_made_per_game: { name: "3PM", type: "number" },
      fts_attempted_per_game: { name: "FTA", type: "number" },
      fts_made_per_game: { name: "FTM", type: "number" },
      turnovers_per_game: { name: "TOV", type: "number" },
      offensive_rebounds_per_game: { name: "OREB", type: "number" },
      fouls_per_game: { name: "FLS", type: "number" },
      minutes_per_game: { name: "MIN", type: "number" },
      fg_pct: { name: "FG %", type: "number" },
      threes_pct: { name: "3P %", type: "number" },
      ft_pct: { name: "FT %", type: "number" },
      __name__: { name: "Statline", type: "number" }
    },
    winner_team: {
      id: { name: "Team", type: "number" },
      name: { name: "Name", type: "string" },
      city: { name: "City", type: "string" },
      __name__: { name: "Team", type: "number" }
    },
    __name__: { name: "Game", type: "number" }
  },
  PlayerSeasonTeamStatline: {
    player: {
      first_name: { name: "First Name", type: "string" },
      last_name: { name: "Last Name", type: "string" },
      current_roster: {
        number: { name: "Number", type: "string" },
        position: { name: "Position", type: "string" },
        height: { name: "Height", type: "string" },
        weight: { name: "Weight", type: "number" },
        age: { name: "Age", type: "number" },
        roster: {
          team: {
            id: { name: "Team", type: "number" },
            name: { name: "Name", type: "string" },
            city: { name: "City", type: "string" },
            __name__: { name: "Team", type: "number" }
          },
          __name__: { name: "Roster", type: "TODO" }
        },
        __name__: { name: "Player Data", type: "number" }
      },
      __name__: { name: "Player", type: "number" }
    },
    statline: {
      points: { name: "Total PTS", type: "number" },
      rebounds: { name: "Total REB", type: "number" },
      assists: { name: "Total AST", type: "number" },
      steals: { name: "Total STL", type: "number" },
      blocks: { name: "Total BLK", type: "number" },
      fgs_attempted: { name: "Total FGA", type: "number" },
      fgs_made: { name: "Total FGM", type: "number" },
      threes_attempted: { name: "Total 3PA", type: "number" },
      threes_made: { name: "Total 3PM", type: "number" },
      fts_attempted: { name: "Total FTA", type: "number" },
      fts_made: { name: "Total FTM", type: "number" },
      turnovers: { name: "Total TOV", type: "number" },
      offensive_rebounds: { name: "Total OREB", type: "number" },
      fouls: { name: "Total FLS", type: "number" },
      games_played: { name: "GP", type: "number" },
      minutes: { name: "Total MIN", type: "number" },
      points_per_game: { name: "PTS", type: "number" },
      rebounds_per_game: { name: "REB", type: "number" },
      assists_per_game: { name: "AST", type: "number" },
      steals_per_game: { name: "STL", type: "number" },
      blocks_per_game: { name: "BLK", type: "number" },
      fgs_attempted_per_game: { name: "FGA", type: "number" },
      fgs_made_per_game: { name: "FGM", type: "number" },
      threes_attempted_per_game: { name: "3PA", type: "number" },
      threes_made_per_game: { name: "3PM", type: "number" },
      fts_attempted_per_game: { name: "FTA", type: "number" },
      fts_made_per_game: { name: "FTM", type: "number" },
      turnovers_per_game: { name: "TOV", type: "number" },
      offensive_rebounds_per_game: { name: "OREB", type: "number" },
      fouls_per_game: { name: "FLS", type: "number" },
      minutes_per_game: { name: "MIN", type: "number" },
      fg_pct: { name: "FG %", type: "number" },
      threes_pct: { name: "3P %", type: "number" },
      ft_pct: { name: "FT %", type: "number" },
      __name__: { name: "Statline", type: "number" }
    },
    team: {
      id: { name: "Team", type: "number" },
      name: { name: "Name", type: "string" },
      city: { name: "City", type: "string" },
      __name__: { name: "Team", type: "number" }
    },
    player_season_shot_statline: {
      shot_statline: {
        fgs_attempted_very_tight: {
          name: "Total FGA - very tightly contended",
          type: "number"
        },
        fgs_made_very_tight: {
          name: "Total FGM - very tightly contended",
          type: "number"
        },
        threes_attempted_very_tight: {
          name: "Total 3PA - very tightly contended",
          type: "number"
        },
        threes_made_very_tight: {
          name: "Total 3PM - very tightly contended",
          type: "number"
        },
        fgs_attempted_tight: {
          name: "Total FGA - tightly contended",
          type: "number"
        },
        fgs_made_tight: {
          name: "Total FGM - tightly contended",
          type: "number"
        },
        threes_attempted_tight: {
          name: "Total 3PA - tightly contended",
          type: "number"
        },
        threes_made_tight: {
          name: "Total 3PM - tightly contended",
          type: "number"
        },
        fgs_attempted_open: { name: "Total FGA - open", type: "number" },
        fgs_made_open: { name: "Total FGM - open", type: "number" },
        threes_attempted_open: { name: "Total 3PA - open", type: "number" },
        threes_made_open: { name: "Total 3PM - open", type: "number" },
        fgs_attempted_wide_open: {
          name: "Total FGA - wide open",
          type: "number"
        },
        fgs_made_wide_open: { name: "Total FGM - wide open", type: "number" },
        threes_attempted_wide_open: {
          name: "Total 3PA - wide open",
          type: "number"
        },
        threes_made_wide_open: {
          name: "Total 3PM - wide open",
          type: "number"
        },
        fg_pct_very_tight: {
          name: "FG % - very tightly contended",
          type: "number"
        },
        threes_pct_very_tight: {
          name: "3P % - very tightly contended",
          type: "number"
        },
        fg_pct_tight: { name: "FG % - tightly contended", type: "number" },
        threes_pct_tight: { name: "3P % - tightly contended", type: "number" },
        fg_pct_open: { name: "FG % - open", type: "number" },
        threes_pct_open: { name: "3P % - open", type: "number" },
        fg_pct_wide_open: { name: "FG % - wide open", type: "number" },
        threes_pct_wide_open: { name: "3P % - wide open", type: "number" },
        games_played: { name: "GP", type: "number" },
        fgs_attempted_very_tight_per_game: {
          name: "FGA - very tightly contended",
          type: "number"
        },
        fgs_made_very_tight_per_game: {
          name: "FGM - very tightly contended",
          type: "number"
        },
        threes_attempted_very_tight_per_game: {
          name: "3PA - very tightly contended",
          type: "number"
        },
        threes_made_very_tight_per_game: {
          name: "3PM - very tightly contended",
          type: "number"
        },
        fgs_attempted_tight_per_game: {
          name: "FGA - tightly contended",
          type: "number"
        },
        fgs_made_tight_per_game: {
          name: "FGM - tightly contended",
          type: "number"
        },
        threes_attempted_tight_per_game: {
          name: "3PA - tightly contended",
          type: "number"
        },
        threes_made_tight_per_game: {
          name: "3PM - tightly contended",
          type: "number"
        },
        fgs_attempted_open_per_game: { name: "FGA - open", type: "number" },
        fgs_made_open_per_game: { name: "FGM - open", type: "number" },
        threes_attempted_open_per_game: { name: "3PA - open", type: "number" },
        threes_made_open_per_game: { name: "3PM - open", type: "number" },
        fgs_attempted_wide_open_per_game: {
          name: "FGA - wide open",
          type: "number"
        },
        fgs_made_wide_open_per_game: {
          name: "FGM - wide open",
          type: "number"
        },
        threes_attempted_wide_open_per_game: {
          name: "3PA - wide open",
          type: "number"
        },
        threes_made_wide_open_per_game: {
          name: "3PM - wide open",
          type: "number"
        },
        mid_range_attempted: { name: "Total FGA - mid range", type: "number" },
        mid_range_made: { name: "Total FGM - mid range", type: "number" },
        mid_range_pct: { name: "FG % - mid range", type: "number" },
        mid_range_attempted_per_game: {
          name: "FGA - mid range",
          type: "number"
        },
        mid_range_made_per_game: { name: "FGM - mid range", type: "number" },
        paint_attempted: { name: "Total FGA - paint", type: "number" },
        paint_made: { name: "Total FGM - paint", type: "number" },
        paint_pct: { name: "FG % - paint", type: "number" },
        paint_attempted_per_game: { name: "FGA - paint", type: "number" },
        paint_made_per_game: { name: "FGM - paint", type: "number" },
        __name__: { name: "Shot Stats", type: "number" }
      },
      __name__: { name: "Player Season Shot Stats", type: "number" }
    },
    __name__: { name: "Player Season Team Stats", type: "TODO" }
  },
  Roster: {
    team: {
      id: { name: "Team", type: "number" },
      name: { name: "Name", type: "string" },
      city: { name: "City", type: "string" },
      __name__: { name: "Team", type: "number" }
    },
    __name__: { name: "Roster", type: "TODO" }
  },
  RosterPlayerXref: {
    roster_id: { name: "Roster", type: "number" },
    player_id: { name: "Player", type: "number" },
    number: { name: "Number", type: "string" },
    position: { name: "Position", type: "string" },
    height: { name: "Height", type: "string" },
    weight: { name: "Weight", type: "number" },
    age: { name: "Age", type: "number" },
    player: {
      first_name: { name: "First Name", type: "string" },
      last_name: { name: "Last Name", type: "string" },
      current_roster: {
        number: { name: "Number", type: "string" },
        position: { name: "Position", type: "string" },
        height: { name: "Height", type: "string" },
        weight: { name: "Weight", type: "number" },
        age: { name: "Age", type: "number" },
        roster: {
          team: {
            id: { name: "Team", type: "number" },
            name: { name: "Name", type: "string" },
            city: { name: "City", type: "string" },
            __name__: { name: "Team", type: "number" }
          },
          __name__: { name: "Roster", type: "TODO" }
        },
        __name__: { name: "Player Data", type: "number" }
      },
      __name__: { name: "Player", type: "number" }
    },
    __name__: { name: "Roster Player", type: "number" }
  },
  Team: {
    id: { name: "Team", type: "number" },
    name: { name: "Name", type: "string" },
    city: { name: "City", type: "string" },
    __name__: { name: "Team", type: "number" }
  },
  CurrentRosterPlayer: {
    number: { name: "Number", type: "string" },
    position: { name: "Position", type: "string" },
    height: { name: "Height", type: "string" },
    weight: { name: "Weight", type: "number" },
    age: { name: "Age", type: "number" },
    roster: {
      team: {
        id: { name: "Team", type: "number" },
        name: { name: "Name", type: "string" },
        city: { name: "City", type: "string" },
        __name__: { name: "Team", type: "number" }
      },
      __name__: { name: "Roster", type: "TODO" }
    },
    __name__: { name: "Player Data", type: "number" }
  },
  Shot: {
    period: { name: "Period", type: "number" },
    minutes_remaining: { name: "Minutes Remaining", type: "number" },
    seconds_remaining: { name: "Seconds Remaining", type: "number" },
    shot_type: { name: "ShotType", type: "enum" },
    shot_zone_basic: { name: "ShotZoneBasic", type: "enum" },
    shot_zone_area: { name: "ShotZoneArea", type: "enum" },
    shot_zone_range: { name: "ShotZoneRange", type: "enum" },
    shot_distance: { name: "Shot Distance", type: "number" },
    shot_attempted: { name: "Shot Attempted", type: "boolean" },
    shot_made: { name: "Shot Made", type: "boolean" },
    __name__: { name: "Shot", type: "number" }
  },
  ShotStatline: {
    fgs_attempted_very_tight: {
      name: "Total FGA - very tightly contended",
      type: "number"
    },
    fgs_made_very_tight: {
      name: "Total FGM - very tightly contended",
      type: "number"
    },
    threes_attempted_very_tight: {
      name: "Total 3PA - very tightly contended",
      type: "number"
    },
    threes_made_very_tight: {
      name: "Total 3PM - very tightly contended",
      type: "number"
    },
    fgs_attempted_tight: {
      name: "Total FGA - tightly contended",
      type: "number"
    },
    fgs_made_tight: { name: "Total FGM - tightly contended", type: "number" },
    threes_attempted_tight: {
      name: "Total 3PA - tightly contended",
      type: "number"
    },
    threes_made_tight: {
      name: "Total 3PM - tightly contended",
      type: "number"
    },
    fgs_attempted_open: { name: "Total FGA - open", type: "number" },
    fgs_made_open: { name: "Total FGM - open", type: "number" },
    threes_attempted_open: { name: "Total 3PA - open", type: "number" },
    threes_made_open: { name: "Total 3PM - open", type: "number" },
    fgs_attempted_wide_open: { name: "Total FGA - wide open", type: "number" },
    fgs_made_wide_open: { name: "Total FGM - wide open", type: "number" },
    threes_attempted_wide_open: {
      name: "Total 3PA - wide open",
      type: "number"
    },
    threes_made_wide_open: { name: "Total 3PM - wide open", type: "number" },
    fg_pct_very_tight: {
      name: "FG % - very tightly contended",
      type: "number"
    },
    threes_pct_very_tight: {
      name: "3P % - very tightly contended",
      type: "number"
    },
    fg_pct_tight: { name: "FG % - tightly contended", type: "number" },
    threes_pct_tight: { name: "3P % - tightly contended", type: "number" },
    fg_pct_open: { name: "FG % - open", type: "number" },
    threes_pct_open: { name: "3P % - open", type: "number" },
    fg_pct_wide_open: { name: "FG % - wide open", type: "number" },
    threes_pct_wide_open: { name: "3P % - wide open", type: "number" },
    games_played: { name: "GP", type: "number" },
    fgs_attempted_very_tight_per_game: {
      name: "FGA - very tightly contended",
      type: "number"
    },
    fgs_made_very_tight_per_game: {
      name: "FGM - very tightly contended",
      type: "number"
    },
    threes_attempted_very_tight_per_game: {
      name: "3PA - very tightly contended",
      type: "number"
    },
    threes_made_very_tight_per_game: {
      name: "3PM - very tightly contended",
      type: "number"
    },
    fgs_attempted_tight_per_game: {
      name: "FGA - tightly contended",
      type: "number"
    },
    fgs_made_tight_per_game: {
      name: "FGM - tightly contended",
      type: "number"
    },
    threes_attempted_tight_per_game: {
      name: "3PA - tightly contended",
      type: "number"
    },
    threes_made_tight_per_game: {
      name: "3PM - tightly contended",
      type: "number"
    },
    fgs_attempted_open_per_game: { name: "FGA - open", type: "number" },
    fgs_made_open_per_game: { name: "FGM - open", type: "number" },
    threes_attempted_open_per_game: { name: "3PA - open", type: "number" },
    threes_made_open_per_game: { name: "3PM - open", type: "number" },
    fgs_attempted_wide_open_per_game: {
      name: "FGA - wide open",
      type: "number"
    },
    fgs_made_wide_open_per_game: { name: "FGM - wide open", type: "number" },
    threes_attempted_wide_open_per_game: {
      name: "3PA - wide open",
      type: "number"
    },
    threes_made_wide_open_per_game: { name: "3PM - wide open", type: "number" },
    mid_range_attempted: { name: "Total FGA - mid range", type: "number" },
    mid_range_made: { name: "Total FGM - mid range", type: "number" },
    mid_range_pct: { name: "FG % - mid range", type: "number" },
    mid_range_attempted_per_game: { name: "FGA - mid range", type: "number" },
    mid_range_made_per_game: { name: "FGM - mid range", type: "number" },
    paint_attempted: { name: "Total FGA - paint", type: "number" },
    paint_made: { name: "Total FGM - paint", type: "number" },
    paint_pct: { name: "FG % - paint", type: "number" },
    paint_attempted_per_game: { name: "FGA - paint", type: "number" },
    paint_made_per_game: { name: "FGM - paint", type: "number" },
    __name__: { name: "Shot Stats", type: "number" }
  },
  PlayerSeasonShotStatline: {
    shot_statline: {
      fgs_attempted_very_tight: {
        name: "Total FGA - very tightly contended",
        type: "number"
      },
      fgs_made_very_tight: {
        name: "Total FGM - very tightly contended",
        type: "number"
      },
      threes_attempted_very_tight: {
        name: "Total 3PA - very tightly contended",
        type: "number"
      },
      threes_made_very_tight: {
        name: "Total 3PM - very tightly contended",
        type: "number"
      },
      fgs_attempted_tight: {
        name: "Total FGA - tightly contended",
        type: "number"
      },
      fgs_made_tight: { name: "Total FGM - tightly contended", type: "number" },
      threes_attempted_tight: {
        name: "Total 3PA - tightly contended",
        type: "number"
      },
      threes_made_tight: {
        name: "Total 3PM - tightly contended",
        type: "number"
      },
      fgs_attempted_open: { name: "Total FGA - open", type: "number" },
      fgs_made_open: { name: "Total FGM - open", type: "number" },
      threes_attempted_open: { name: "Total 3PA - open", type: "number" },
      threes_made_open: { name: "Total 3PM - open", type: "number" },
      fgs_attempted_wide_open: {
        name: "Total FGA - wide open",
        type: "number"
      },
      fgs_made_wide_open: { name: "Total FGM - wide open", type: "number" },
      threes_attempted_wide_open: {
        name: "Total 3PA - wide open",
        type: "number"
      },
      threes_made_wide_open: { name: "Total 3PM - wide open", type: "number" },
      fg_pct_very_tight: {
        name: "FG % - very tightly contended",
        type: "number"
      },
      threes_pct_very_tight: {
        name: "3P % - very tightly contended",
        type: "number"
      },
      fg_pct_tight: { name: "FG % - tightly contended", type: "number" },
      threes_pct_tight: { name: "3P % - tightly contended", type: "number" },
      fg_pct_open: { name: "FG % - open", type: "number" },
      threes_pct_open: { name: "3P % - open", type: "number" },
      fg_pct_wide_open: { name: "FG % - wide open", type: "number" },
      threes_pct_wide_open: { name: "3P % - wide open", type: "number" },
      games_played: { name: "GP", type: "number" },
      fgs_attempted_very_tight_per_game: {
        name: "FGA - very tightly contended",
        type: "number"
      },
      fgs_made_very_tight_per_game: {
        name: "FGM - very tightly contended",
        type: "number"
      },
      threes_attempted_very_tight_per_game: {
        name: "3PA - very tightly contended",
        type: "number"
      },
      threes_made_very_tight_per_game: {
        name: "3PM - very tightly contended",
        type: "number"
      },
      fgs_attempted_tight_per_game: {
        name: "FGA - tightly contended",
        type: "number"
      },
      fgs_made_tight_per_game: {
        name: "FGM - tightly contended",
        type: "number"
      },
      threes_attempted_tight_per_game: {
        name: "3PA - tightly contended",
        type: "number"
      },
      threes_made_tight_per_game: {
        name: "3PM - tightly contended",
        type: "number"
      },
      fgs_attempted_open_per_game: { name: "FGA - open", type: "number" },
      fgs_made_open_per_game: { name: "FGM - open", type: "number" },
      threes_attempted_open_per_game: { name: "3PA - open", type: "number" },
      threes_made_open_per_game: { name: "3PM - open", type: "number" },
      fgs_attempted_wide_open_per_game: {
        name: "FGA - wide open",
        type: "number"
      },
      fgs_made_wide_open_per_game: { name: "FGM - wide open", type: "number" },
      threes_attempted_wide_open_per_game: {
        name: "3PA - wide open",
        type: "number"
      },
      threes_made_wide_open_per_game: {
        name: "3PM - wide open",
        type: "number"
      },
      mid_range_attempted: { name: "Total FGA - mid range", type: "number" },
      mid_range_made: { name: "Total FGM - mid range", type: "number" },
      mid_range_pct: { name: "FG % - mid range", type: "number" },
      mid_range_attempted_per_game: { name: "FGA - mid range", type: "number" },
      mid_range_made_per_game: { name: "FGM - mid range", type: "number" },
      paint_attempted: { name: "Total FGA - paint", type: "number" },
      paint_made: { name: "Total FGM - paint", type: "number" },
      paint_pct: { name: "FG % - paint", type: "number" },
      paint_attempted_per_game: { name: "FGA - paint", type: "number" },
      paint_made_per_game: { name: "FGM - paint", type: "number" },
      __name__: { name: "Shot Stats", type: "number" }
    },
    __name__: { name: "Player Season Shot Stats", type: "number" }
  }
};
