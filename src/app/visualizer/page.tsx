"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { Point } from "@visx/point";
import {
  ComparatorOperator,
  OrderDir,
  SearchRequest
} from "@/app/fixed-models";
import {
  LeagueSeasonStatline,
  PlayerSeasonTeamStatline,
  ShotStatline,
  Statline
} from "@/app/models";
import { Tooltip, useTooltip } from "@visx/tooltip";
import { voronoi } from "@visx/voronoi";
import { localPoint } from "@visx/event";
import { Grid } from "@visx/grid";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { resolveProperty, round, translate } from "@/app/utils";
import { SeasonOptions, StatOptions } from "@/app/select-options";
import FilterModal, { FilterModalConfig } from "@/app/ui/filter/filter-modal";
import { Filter } from "@/app/ui/filter/filter-form";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import Spinner from "@/app/ui/spinner";
import {
  BackgroundDark,
  BackgroundLight,
  Contrast,
  Highlight,
  useDarkMode
} from "@/app/globals";
import FilterSelect, { FilterSelectModel } from "@/app/ui/filter/filter-select";

interface LeagueAverage {
  leagueStatline: LeagueSeasonStatline;
  statline: Statline;
  player_season_shot_statline: {
    shot_statline: ShotStatline;
  };
}

class DataPoint extends Point {
  statline?: PlayerSeasonTeamStatline;
  leagueStatline?: LeagueAverage;
  isLeagueAverage: boolean;

  constructor(
    x: number,
    y: number,
    statline?: PlayerSeasonTeamStatline,
    leagueStatline?: LeagueAverage
  ) {
    super({ x: x, y: y });
    this.statline = statline;
    this.leagueStatline = leagueStatline;
    this.isLeagueAverage = statline == null;
  }
}

const axisColor = "#666";

const tickLabelProps = {
  fill: axisColor,
  fontSize: 12,
  fontFamily: "sans-serif"
};

const tickLineProps = { fill: axisColor, stroke: axisColor };

function getTickUnit(points: Point[], selector: (p: Point) => number): number {
  const max = Math.max(...points.map(selector));

  const result = Math.round(max / 10 / 2) * 2;

  return result > 0 ? result : 1;
}

function getDomain(points: Point[], selector: (p: Point) => number): number[] {
  const min = Math.min(...points.map(selector));
  const max = Math.max(...points.map(selector));

  const tickUnit = getTickUnit(points, selector);

  return [
    Math.floor(min / tickUnit) * tickUnit,
    Math.ceil(max / tickUnit) * tickUnit
  ];
}

function getTicks(points: Point[], selector: (p: Point) => number): number {
  const domain = getDomain(points, selector);

  const tickUnit = getTickUnit(points, selector);

  return (domain[1] - domain[0]) / tickUnit;
}

let tooltipTimeout: number;

export default function Example() {
  const width = 1000;
  const height = 500;
  const marginY = 30;
  const marginX = 30;

  const maxX = width - marginX;
  const maxY = height - marginY;

  const leagueAverageColor = useDarkMode() ? BackgroundLight : BackgroundDark;
  const [data, setData] = useState([] as PlayerSeasonTeamStatline[]);
  const [xAxis, setXAxis] = useState("statline.threes_attempted_per_game");
  const [yAxis, setYAxis] = useState("statline.threes_pct");
  const [season, setSeason] = useState(SeasonOptions[0].key);
  const [leagueAverage, setLeagueAverage] = useState<LeagueSeasonStatline>();
  const [filters, setFilters] = useState([
    {
      key: "statline.threes_attempted_per_game",
      comparator: { operator: ComparatorOperator.Greater, value: 3 }
    },
    {
      key: "statline.games_played",
      comparator: { operator: ComparatorOperator.Greater, value: 40 }
    }
  ] as Filter[]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightPlayer, setHighlightPlayer] = useState(0);

  const background = useDarkMode() ? BackgroundDark : BackgroundLight;

  const filterConfig: FilterModalConfig = {
    tableName: "PlayerSeasonTeamStatline",
    onChange: (f) => setFilters(f),
    button: (
      <button className="relative border border-gray-700 p-3 min-w-full mb-2 hover:bg-secondary">
        <span className="flex justify-center">
          <AdjustmentsHorizontalIcon className="w-6 mr-4" />
          Filter
        </span>
      </button>
    ),
    onClose: () => search(),
    defaultFilters: filters
  };

  const tooltip = useTooltip<DataPoint>();
  const svgRef = useRef<SVGSVGElement>(null);

  const searchRequest: SearchRequest = {
    order_by: "statline.points_per_game",
    order_dir: OrderDir.Desc,
    filter: [],
    take: -1
  };

  function search(customSeason?: string) {
    const actualSeason = customSeason ?? season;

    setIsLoading(true);
    searchRequest.filter = [
      ...filters.map((f) => [{ attribute: f.key, comparator: f.comparator }]),
      [
        {
          attribute: "season",
          comparator: {
            operator: ComparatorOperator.Equal,
            value: actualSeason
          }
        }
      ]
    ];

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL!}/league-leaders/players/search`,
      {
        method: "POST",
        body: JSON.stringify(searchRequest),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then((r) => r.json())
      .then((d: PlayerSeasonTeamStatline[]) => {
        setData(d);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    search();
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/league-average/${season}`)
      .then((res) => res.json())
      .then((s: LeagueSeasonStatline) => setLeagueAverage(s));
  }, []);

  const points: DataPoint[] = data.map(
    (s) =>
      new DataPoint(resolveProperty(s, xAxis), resolveProperty(s, yAxis), s)
  );

  if (leagueAverage != null) {
    const helper: LeagueAverage = {
      leagueStatline: leagueAverage,
      statline: leagueAverage.player_statline,
      player_season_shot_statline: {
        shot_statline: leagueAverage.player_shot_statline
      }
    };
    points.push(
      new DataPoint(
        resolveProperty(helper, xAxis),
        resolveProperty(helper, yAxis),
        undefined,
        helper
      )
    );
  }

  const xScale = scaleLinear<number>({
    range: [marginX, maxX],
    domain: getDomain(points, (p) => p.x)
  });

  const yDomain = getDomain(points, (p) => p.y);
  const yScale = scaleLinear<number>({
    range: [marginY, maxY],
    domain: [yDomain[1], yDomain[0]]
  });

  const voronoiLayout = useMemo(
    () =>
      voronoi<Point>({
        x: (d) => xScale(d.x) ?? 0,
        y: (d) => yScale(d.y) ?? 0,
        width,
        height
      })(points),
    [width, height, xScale, yScale]
  );

  // event handlers
  const handleMouseMove = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (tooltipTimeout) clearTimeout(tooltipTimeout);
      if (!svgRef.current) return;

      // find the nearest polygon to the current mouse position
      const point = localPoint(svgRef.current, event);

      if (!point) return;

      const neighborRadius = 100;
      const closest = voronoiLayout.find(point.x, point.y, neighborRadius);
      if (!closest) return;

      const dataPoint = points.find(
        (d) => d.x === closest.data.x && d.y === closest.data.y
      );

      tooltip.showTooltip({
        tooltipLeft: xScale(closest.data!.x),
        tooltipTop: yScale(closest.data!.y),
        tooltipData: dataPoint
      });
    },
    [xScale, yScale, tooltip.showTooltip, voronoiLayout]
  );

  const handleMouseLeave = useCallback(() => {
    tooltipTimeout = window.setTimeout(() => {
      tooltip.hideTooltip();
    }, 300);
  }, [tooltip.hideTooltip]);

  const filterSelectFilters = [
    // TODO this will only work for season = current season
    [
      {
        attribute: "current_roster",
        comparator: { operator: ComparatorOperator.IsSet, value: 0 }
      }
    ]
  ];

  return width < 10 ? null : (
    <div className="flex">
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        <div>
          <svg
            width={width}
            height={height}
            ref={svgRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseLeave}
          >
            <rect fill={background} width={width} height={height} rx={14} />

            <Grid
              xScale={xScale}
              yScale={yScale}
              width={maxX}
              height={maxY}
              numTicksRows={getTicks(points, (p) => p.y)}
              numTicksColumns={getTicks(points, (p) => p.x)}
              stroke={leagueAverageColor}
              strokeOpacity={0.15}
            />
            <AxisBottom
              top={maxY}
              scale={xScale}
              numTicks={getTicks(points, (p) => p.x)}
              stroke={axisColor}
              tickLineProps={tickLineProps}
              tickLabelProps={tickLabelProps}
            />
            <AxisLeft
              left={marginX}
              scale={yScale}
              numTicks={getTicks(points, (p) => p.y)}
              stroke={axisColor}
              tickLineProps={tickLineProps}
              tickLabelProps={tickLabelProps}
            />

            <Group>
              {points.map((point, i) => (
                <circle
                  key={`point-${i}`}
                  cx={xScale(point.x)}
                  cy={yScale(point.y)}
                  r={
                    point.isLeagueAverage
                      ? 5
                      : point.statline?.player_id === highlightPlayer
                        ? 6
                        : 4
                  }
                  fill={
                    point.isLeagueAverage
                      ? leagueAverageColor
                      : point.statline?.player_id === highlightPlayer
                        ? Contrast
                        : Highlight
                  }
                />
              ))}
            </Group>
          </svg>
          {tooltip.tooltipOpen && tooltip.tooltipData && (
            <Tooltip
              left={tooltip.tooltipLeft! + 2}
              top={tooltip.tooltipTop! + 2}
            >
              <div>
                {tooltip.tooltipData.isLeagueAverage
                  ? "League Average"
                  : `${tooltip.tooltipData?.statline?.player.first_name} ${tooltip.tooltipData?.statline?.player.last_name}`}
                <br />
                <br />
                <div className="flex justify-between">
                  <b>{translate(`PlayerSeasonTeamStatline.${xAxis}`)}:</b>
                  {round(
                    resolveProperty(
                      tooltip.tooltipData.isLeagueAverage
                        ? tooltip.tooltipData.leagueStatline
                        : tooltip.tooltipData!.statline,
                      xAxis
                    ),
                    2
                  )}
                </div>
                <div className="flex justify-between">
                  <b>{translate(`PlayerSeasonTeamStatline.${yAxis}`)}:</b>
                  {round(
                    resolveProperty(
                      tooltip.tooltipData.isLeagueAverage
                        ? tooltip.tooltipData.leagueStatline
                        : tooltip.tooltipData!.statline,
                      yAxis
                    ),
                    2
                  )}
                </div>
              </div>
            </Tooltip>
          )}
        </div>
      )}

      <div className="flex-col ml-10">
        <div className="mb-10">
          <FilterSelect
            model={FilterSelectModel.Player}
            onChange={(p) => setHighlightPlayer(p)}
            filters={filterSelectFilters}
            placeholder={"Highlight ..."}
          ></FilterSelect>
        </div>
        <div>
          <label className="ml-1 text-xs">X - Axis</label>
          <select
            className="webkit-none bg-background rounded-none border-b border-b-gray-700 p-3 min-w-full mb-5"
            onChange={(evt) => setXAxis(evt.target.value)}
            defaultValue={xAxis}
          >
            {StatOptions.map((o, idx) => (
              <option className="webkit-none" key={idx} value={o.key}>
                {o.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="ml-1 text-xs">Y - Axis</label>
          <select
            className="webkit-none bg-background rounded-none border-b border-b-gray-700 p-3 min-w-full mb-5"
            defaultValue={yAxis}
            onChange={(evt) => setYAxis(evt.target.value)}
          >
            {StatOptions.map((o, idx) => (
              <option className="webkit-none" key={idx} value={o.key}>
                {o.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="ml-1 text-xs">Season</label>
          <select
            className="webkit-none bg-background rounded-none border-b border-b-gray-700 p-3 min-w-full"
            onChange={(evt) => {
              setSeason(evt.target.value);
              search(evt.target.value);
            }}
          >
            {SeasonOptions.map((o, idx) => (
              <option className="webkit-none" key={idx} value={o.key}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <FilterModal config={filterConfig}></FilterModal>
        </div>
      </div>
    </div>
  );
}
