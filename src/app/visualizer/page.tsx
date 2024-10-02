'use client';

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Group} from '@visx/group';
import {scaleLinear} from '@visx/scale';
import {Point} from '@visx/point';
import {ComparatorOperator, OrderDir, SearchRequest} from "@/app/fixed-models";
import {PlayerSeasonStatline} from "@/app/models";
import {Tooltip, useTooltip} from "@visx/tooltip";
import {voronoi} from "@visx/voronoi";
import {localPoint} from '@visx/event';
import {Grid} from "@visx/grid";
import {AxisBottom, AxisLeft} from "@visx/axis";
import {resolveProperty, round, translate} from "@/app/utils";
import {SeasonOptions, StatOptions} from "@/app/select-options";
import FilterModal, {FilterModalConfig} from "@/app/ui/filter/filter-modal";
import {Filter} from "@/app/ui/filter/filter-form";
import {AdjustmentsHorizontalIcon} from "@heroicons/react/24/solid";
import Spinner from "@/app/ui/spinner";
import FilterSelect, {FilterSelectModel} from "@/app/ui/filter/filter-select";

const highlight = '#12aaff';
const background = '#050505';
const axisColor = "#666";

const tickLabelProps = {
    fill: axisColor,
    fontSize: 12,
    fontFamily: 'sans-serif'
};

const tickLineProps = { fill: axisColor, stroke: axisColor };

function getTickUnit(points: Point[], selector: (p: Point) => number): number {
    const max = Math.max(...points.map(selector));

    const result = Math.round(max / 10 / 2) * 2

    return result > 0 ? result : 1;
}

function getDomain(points: Point[], selector: (p: Point) => number): number[] {
    const min = Math.min(...points.map(selector));
    const max = Math.max(...points.map(selector));

    const tickUnit = getTickUnit(points, selector);

    return [Math.floor(min / tickUnit) * tickUnit, Math.ceil(max / tickUnit) * tickUnit]
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

    const [data, setData] = useState([] as PlayerSeasonStatline[]);
    const [xAxis, setXAxis] = useState("statline.threes_attempted_per_game");
    const [yAxis, setYAxis] = useState("statline.threes_pct");
    const [season, setSeason] = useState(SeasonOptions[0].key);
    const [filters, setFilters] = useState([
        {key: "statline.threes_attempted_per_game", comparator: {operator: ComparatorOperator.Greater, value: 3}},
        {key: "statline.games_played", comparator: {operator: ComparatorOperator.Greater, value: 40}},
    ] as Filter[]);
    const [isLoading, setIsLoading] = useState(false);

    const filterConfig: FilterModalConfig = {
        tableName: "PlayerSeasonStatline",
        onChange: (f) => setFilters(f),
        button: <button className="relative border border-gray-700 p-3 min-w-full mb-2 hover:bg-gray-900">
            <span className="flex justify-center"><AdjustmentsHorizontalIcon className="w-6 mr-4"/>Filter</span>
        </button>,
        onClose: () => search(),
        defaultFilters: filters
    };

    const tooltip = useTooltip<PlayerSeasonStatline>();
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
            ...filters.map(f => [{attribute: f.key, comparator: f.comparator}]),
            [{attribute: "season", comparator: {operator: ComparatorOperator.Equal, value: actualSeason}}],
        ];

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/league-leaders/players/search`, {
            method: "POST",
            body: JSON.stringify(searchRequest),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(r => r.json())
            .then((d: PlayerSeasonStatline[]) => {
                setData(d);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        search();
    }, []);

    const points = data.map(s => new Point({x: resolveProperty(s, xAxis), y: resolveProperty(s, yAxis)}));

    const xScale = scaleLinear<number>({
        range: [marginX, maxX],
        domain: getDomain(points, p => p.x)
    });

    const yDomain = getDomain(points, p => p.y);
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
                height,
            })(points),
        [width, height, xScale, yScale],
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

            const dataPoint = data.map(d => ({
                data: d,
                x: resolveProperty(d, xAxis),
                y: resolveProperty(d, yAxis)
            })).find(d => d.x === closest.data.x && d.y === closest.data.y);

            tooltip.showTooltip({
                tooltipLeft: xScale(closest.data!.x),
                tooltipTop: yScale(closest.data!.y),
                tooltipData: dataPoint?.data
            });
        },
        [xScale, yScale, tooltip.showTooltip, voronoiLayout],
    );

    const handleMouseLeave = useCallback(() => {
        tooltipTimeout = window.setTimeout(() => {
            tooltip.hideTooltip();
        }, 300);
    }, [tooltip.hideTooltip]);

    return width < 10 ? null : (
        <div className="flex">
            {isLoading ? <Spinner></Spinner> : <div>
                <svg width={width} height={height} ref={svgRef} onMouseMove={handleMouseMove}
                     onMouseLeave={handleMouseLeave}
                     onTouchMove={handleMouseMove}
                     onTouchEnd={handleMouseLeave}>
                    <rect fill={background} width={width} height={height} rx={14}/>

                    <Grid
                        xScale={xScale}
                        yScale={yScale}
                        width={maxX}
                        height={maxY}
                        numTicksRows={getTicks(points, p => p.y)}
                        numTicksColumns={getTicks(points, p => p.x)}
                        stroke="white"
                        strokeOpacity={0.15}
                    />
                    <AxisBottom top={maxY} scale={xScale} numTicks={getTicks(points, p => p.x)} stroke={axisColor} tickLineProps={tickLineProps} tickLabelProps={tickLabelProps}/>
                    <AxisLeft left={marginX} scale={yScale} numTicks={getTicks(points, p => p.y)} stroke={axisColor} tickLineProps={tickLineProps} tickLabelProps={tickLabelProps}/>

                    <Group>

                        {points.map((point, i) =>
                            <circle key={`point-${i}`} cx={xScale(point.x)} cy={yScale(point.y)} r={4} fill={highlight}/>
                        )}
                    </Group>

                </svg>
                {tooltip.tooltipOpen && tooltip.tooltipData && (
                    <Tooltip left={tooltip.tooltipLeft! + 2} top={tooltip.tooltipTop! + 2}>
                        <div>
                            {tooltip.tooltipData?.player.first_name} {tooltip.tooltipData?.player.last_name}<br/><br/>
                            <div className="flex justify-between">
                                <b>{translate(`PlayerSeasonStatline.${xAxis}`)}:</b>{round(resolveProperty(tooltip.tooltipData!, xAxis), 2)}
                            </div>
                            <div className="flex justify-between">
                                <b>{translate(`PlayerSeasonStatline.${yAxis}`)}:</b>{round(resolveProperty(tooltip.tooltipData!, yAxis), 2)}
                            </div>
                        </div>
                    </Tooltip>)}

            </div>}

            <div className="flex-col ml-10">
                <div>
                    <label className="ml-1 text-xs">X - Axis</label>
                    <select className="webkit-none bg-black rounded-none border-b border-b-gray-700 p-3 min-w-full mb-5"
                            onChange={evt => setXAxis(evt.target.value)} defaultValue={xAxis}>
                        {StatOptions.map((o, idx) =>
                            <option className="webkit-none" key={idx} value={o.key}>{o.name}</option>)}
                    </select>
                </div>

                <div>
                    <label className="ml-1 text-xs">Y - Axis</label>
                    <select className="webkit-none bg-black rounded-none border-b border-b-gray-700 p-3 min-w-full mb-5"
                            defaultValue={yAxis}
                            onChange={evt => setYAxis(evt.target.value)}>
                        {StatOptions.map((o, idx) =>
                            <option className="webkit-none" key={idx} value={o.key}>{o.name}</option>)}
                    </select>
                </div>

                <div>
                    <label className="ml-1 text-xs">Season</label>
                    <select className="webkit-none bg-black rounded-none border-b border-b-gray-700 p-3 min-w-full"
                            onChange={evt => {
                                setSeason(evt.target.value);
                                search(evt.target.value)
                            }}>
                        {SeasonOptions.map((o, idx) =>
                            <option className="webkit-none" key={idx} value={o.key}>{o.name}</option>)}
                    </select>
                </div>
                <div className="mt-4">
                    <FilterModal config={filterConfig}></FilterModal>
                </div>
            </div>
        </div>

    );
}