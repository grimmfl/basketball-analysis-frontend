export enum Origin {
  NBA
}

export enum ShotType {
  TWO_POINTER,
  THREE_POINTER
}

export enum ShotZoneBasic {
  RESTRICTED_AREA,
  IN_THE_PAINT,
  ABOVE_THE_BREAK,
  MID_RANGE,
  LEFT_CORNER,
  RIGHT_CORNER,
  BACK_COURT
}

export enum ShotZoneArea {
  CENTER,
  RIGHT_SIDE_CENTER,
  LEFT_SIDE_CENTER,
  RIGHT_SIDE,
  LEFT_SIDE,
  BACK_COURT
}

export enum ShotZoneRange {
  LESS_THAN_8FT,
  MORE_THAN_24FT,
  BETWEEN_8FT_16FT,
  BETWEEN_16FT_24FT,
  BACK_COURT
}

export class Statline {
  id: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  fgs_attempted: number;
  fgs_made: number;
  threes_attempted: number;
  threes_made: number;
  fts_attempted: number;
  fts_made: number;
  turnovers: number;
  offensive_rebounds: number;
  fouls: number;
  games_played: number;
  minutes: number;
  points_per_game: number;
  rebounds_per_game: number;
  assists_per_game: number;
  steals_per_game: number;
  blocks_per_game: number;
  fgs_attempted_per_game: number;
  fgs_made_per_game: number;
  threes_attempted_per_game: number;
  threes_made_per_game: number;
  fts_attempted_per_game: number;
  fts_made_per_game: number;
  turnovers_per_game: number;
  offensive_rebounds_per_game: number;
  fouls_per_game: number;
  minutes_per_game: number;
  fg_pct: number;
  threes_pct: number;
  ft_pct: number;
  statline_opponent_id: number;

  constructor(
    id: number,
    points: number,
    rebounds: number,
    assists: number,
    steals: number,
    blocks: number,
    fgs_attempted: number,
    fgs_made: number,
    threes_attempted: number,
    threes_made: number,
    fts_attempted: number,
    fts_made: number,
    turnovers: number,
    offensive_rebounds: number,
    fouls: number,
    games_played: number,
    minutes: number,
    points_per_game: number,
    rebounds_per_game: number,
    assists_per_game: number,
    steals_per_game: number,
    blocks_per_game: number,
    fgs_attempted_per_game: number,
    fgs_made_per_game: number,
    threes_attempted_per_game: number,
    threes_made_per_game: number,
    fts_attempted_per_game: number,
    fts_made_per_game: number,
    turnovers_per_game: number,
    offensive_rebounds_per_game: number,
    fouls_per_game: number,
    minutes_per_game: number,
    fg_pct: number,
    threes_pct: number,
    ft_pct: number,
    statline_opponent_id: number
  ) {
    this.id = id;
    this.points = points;
    this.rebounds = rebounds;
    this.assists = assists;
    this.steals = steals;
    this.blocks = blocks;
    this.fgs_attempted = fgs_attempted;
    this.fgs_made = fgs_made;
    this.threes_attempted = threes_attempted;
    this.threes_made = threes_made;
    this.fts_attempted = fts_attempted;
    this.fts_made = fts_made;
    this.turnovers = turnovers;
    this.offensive_rebounds = offensive_rebounds;
    this.fouls = fouls;
    this.games_played = games_played;
    this.minutes = minutes;
    this.points_per_game = points_per_game;
    this.rebounds_per_game = rebounds_per_game;
    this.assists_per_game = assists_per_game;
    this.steals_per_game = steals_per_game;
    this.blocks_per_game = blocks_per_game;
    this.fgs_attempted_per_game = fgs_attempted_per_game;
    this.fgs_made_per_game = fgs_made_per_game;
    this.threes_attempted_per_game = threes_attempted_per_game;
    this.threes_made_per_game = threes_made_per_game;
    this.fts_attempted_per_game = fts_attempted_per_game;
    this.fts_made_per_game = fts_made_per_game;
    this.turnovers_per_game = turnovers_per_game;
    this.offensive_rebounds_per_game = offensive_rebounds_per_game;
    this.fouls_per_game = fouls_per_game;
    this.minutes_per_game = minutes_per_game;
    this.fg_pct = fg_pct;
    this.threes_pct = threes_pct;
    this.ft_pct = ft_pct;
    this.statline_opponent_id = statline_opponent_id;
  }
}

export class Player {
  id: number;
  first_name: string;
  last_name: string;
  current_roster: CurrentRosterPlayer;

  constructor(
    id: number,
    first_name: string,
    last_name: string,
    current_roster: CurrentRosterPlayer
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.current_roster = current_roster;
  }
}

export class Game {
  id: number;
  season: string;
  date: Date;
  team1_id: number;
  team2_id: number;
  statline_team1_id: number;
  statline_team2_id: number;
  winner_team_id: number;
  team2: Team;
  statline_team1: Statline;
  statline_team2: Statline;
  winner_team: Team;

  constructor(
    id: number,
    season: string,
    date: Date,
    team1_id: number,
    team2_id: number,
    statline_team1_id: number,
    statline_team2_id: number,
    winner_team_id: number,
    team2: Team,
    statline_team1: Statline,
    statline_team2: Statline,
    winner_team: Team
  ) {
    this.id = id;
    this.season = season;
    this.date = date;
    this.team1_id = team1_id;
    this.team2_id = team2_id;
    this.statline_team1_id = statline_team1_id;
    this.statline_team2_id = statline_team2_id;
    this.winner_team_id = winner_team_id;
    this.team2 = team2;
    this.statline_team1 = statline_team1;
    this.statline_team2 = statline_team2;
    this.winner_team = winner_team;
  }
}

export class PlayerSeasonStatline {
  player_id: number;
  statline_id: number;
  season: string;
  team_id: number;
  player: Player;
  statline: Statline;
  team: Team;

  constructor(
    player_id: number,
    statline_id: number,
    season: string,
    team_id: number,
    player: Player,
    statline: Statline,
    team: Team
  ) {
    this.player_id = player_id;
    this.statline_id = statline_id;
    this.season = season;
    this.team_id = team_id;
    this.player = player;
    this.statline = statline;
    this.team = team;
  }
}

export class Roster {
  id: number;
  team_id: number;
  season: string;
  team: Team;

  constructor(id: number, team_id: number, season: string, team: Team) {
    this.id = id;
    this.team_id = team_id;
    this.season = season;
    this.team = team;
  }
}

export class RosterPlayerXref {
  roster_id: number;
  player_id: number;
  number: string;
  position: string;
  height: string;
  weight: number;
  age: number;
  player: Player;

  constructor(
    roster_id: number,
    player_id: number,
    number: string,
    position: string,
    height: string,
    weight: number,
    age: number,
    player: Player
  ) {
    this.roster_id = roster_id;
    this.player_id = player_id;
    this.number = number;
    this.position = position;
    this.height = height;
    this.weight = weight;
    this.age = age;
    this.player = player;
  }
}

export class Team {
  id: number;
  name: string;
  city: string;

  constructor(id: number, name: string, city: string) {
    this.id = id;
    this.name = name;
    this.city = city;
  }
}

export class CurrentRosterPlayer {
  player_id: number;
  number: string;
  position: string;
  height: string;
  weight: number;
  age: number;
  roster: Roster;

  constructor(
    player_id: number,
    number: string,
    position: string,
    height: string,
    weight: number,
    age: number,
    roster: Roster
  ) {
    this.player_id = player_id;
    this.number = number;
    this.position = position;
    this.height = height;
    this.weight = weight;
    this.age = age;
    this.roster = roster;
  }
}

export class Shot {
  id: number;
  player_id: number;
  team_id: number;
  game_id: number;
  period: number;
  minutes_remaining: number;
  seconds_remaining: number;
  shot_type: number;
  shot_zone_basic: number;
  shot_zone_area: number;
  shot_zone_range: number;
  shot_distance: number;
  loc_x: number;
  loc_y: number;
  shot_attempted: boolean;
  shot_made: boolean;

  constructor(
    id: number,
    player_id: number,
    team_id: number,
    game_id: number,
    period: number,
    minutes_remaining: number,
    seconds_remaining: number,
    shot_type: number,
    shot_zone_basic: number,
    shot_zone_area: number,
    shot_zone_range: number,
    shot_distance: number,
    loc_x: number,
    loc_y: number,
    shot_attempted: boolean,
    shot_made: boolean
  ) {
    this.id = id;
    this.player_id = player_id;
    this.team_id = team_id;
    this.game_id = game_id;
    this.period = period;
    this.minutes_remaining = minutes_remaining;
    this.seconds_remaining = seconds_remaining;
    this.shot_type = shot_type;
    this.shot_zone_basic = shot_zone_basic;
    this.shot_zone_area = shot_zone_area;
    this.shot_zone_range = shot_zone_range;
    this.shot_distance = shot_distance;
    this.loc_x = loc_x;
    this.loc_y = loc_y;
    this.shot_attempted = shot_attempted;
    this.shot_made = shot_made;
  }
}
