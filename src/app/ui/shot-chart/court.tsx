import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { BackgroundDark, BackgroundLight, useDarkMode } from "@/app/globals";
import React from "react";
import { Point } from "@visx/point";

function threePointLine(x: number) {
  return Math.sqrt(Math.pow(237.5, 2) - Math.pow(x, 2));
}

const threePointCircle = Array.from(Array(441).keys()).map(
  (_, idx) => new Point({ x: idx - 220, y: threePointLine(idx - 220) })
);

export default function Court({
  xScale,
  yScale,
  radiusXScale,
  radiusYScale
}: {
  xScale: any;
  yScale: any;
  radiusXScale: any;
  radiusYScale: any;
}) {
  const strokes = useDarkMode() ? BackgroundLight : BackgroundDark;
  const background = useDarkMode() ? BackgroundDark : BackgroundLight;

  return (
    <Group>
      <LinePath
        stroke={strokes}
        strokeWidth={2}
        data={[
          [-250, -50],
          [250, -50]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      <LinePath
        stroke={strokes}
        strokeWidth={2}
        data={[
          [-220, -50],
          [-220, 90]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      <LinePath
        stroke={strokes}
        strokeWidth={2}
        data={[
          [220, -50],
          [220, 90]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      <LinePath
        stroke={strokes}
        strokeWidth={2}
        data={[
          [-30, -10],
          [30, -10]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      <circle
        cx={xScale(0)}
        cy={yScale(0)}
        stroke={strokes}
        strokeWidth={2}
        r={(radiusXScale(10) + radiusYScale(10)) / 2}
        fillOpacity={0}
      />
      <LinePath
        stroke={strokes}
        strokeWidth={2}
        data={[
          [-250, -50],
          [-250, 470]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      <LinePath
        stroke={strokes}
        strokeWidth={2}
        data={[
          [250, -50],
          [250, 470]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      <LinePath
        stroke={strokes}
        strokeWidth={2}
        data={[
          [-250, 470],
          [250, 470]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      <circle
        cx={xScale(0)}
        cy={yScale(470)}
        stroke={strokes}
        strokeWidth={2}
        r={(radiusXScale(20) + radiusYScale(20)) / 2}
        fillOpacity={0}
      />
      <circle
        cx={xScale(0)}
        cy={yScale(470)}
        stroke={strokes}
        strokeWidth={2}
        r={(radiusXScale(60) + radiusYScale(60)) / 2}
        fillOpacity={0}
      />
      <rect
        width={radiusXScale(120)}
        height={radiusYScale(65)}
        fill={background}
        x={xScale(-60)}
        y={yScale(471)}
      ></rect>
      <LinePath
        stroke={strokes}
        strokeWidth={2}
        data={[
          [-80, -50],
          [-80, 140]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      <LinePath
        stroke={strokes}
        strokeWidth={2}
        data={[
          [80, -50],
          [80, 140]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      <LinePath
        stroke={strokes}
        strokeWidth={2}
        data={[
          [-80, 140],
          [80, 140]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      <LinePath
        stroke={strokes}
        strokeWidth={2}
        data={threePointCircle}
        x={(d) => xScale(d.x) ?? 0}
        y={(d) => yScale(d.y) ?? 0}
      />
    </Group>
  );
}
