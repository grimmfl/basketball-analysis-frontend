import { LinePath } from "@visx/shape";
import { Background, White } from "@/app/globals";
import { Group } from "@visx/group";
import React from "react";

export default function Zones({
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
  return (
    <Group>
      {/* Left Corner */}
      <LinePath
        stroke={White}
        strokeWidth={2}
        strokeDasharray={"1,5"}
        z={3}
        data={[
          [-250, 90],
          [-220, 90]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      {/* Right Corner */}
      <LinePath
        stroke={White}
        strokeWidth={2}
        strokeDasharray={"1,5"}
        data={[
          [220, 90],
          [250, 90]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      {/* Right Mid */}
      <LinePath
        stroke={White}
        strokeWidth={2}
        strokeDasharray={"1,5"}
        data={[
          [60, 140],
          [220, 90]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      {/* Right Center */}
      <LinePath
        stroke={White}
        strokeWidth={2}
        strokeDasharray={"1,5"}
        data={[
          [60, 140],
          [60, 230]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      {/* Left Center */}
      <LinePath
        stroke={White}
        strokeWidth={2}
        strokeDasharray={"1,5"}
        data={[
          [-60, 140],
          [-60, 230]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      {/* Left Mid */}
      <LinePath
        stroke={White}
        strokeWidth={2}
        strokeDasharray={"1,5"}
        data={[
          [-60, 140],
          [-220, 90]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      {/* Left 3PT */}
      <LinePath
        stroke={White}
        strokeWidth={2}
        strokeDasharray={"1,5"}
        data={[
          [-60, 230],
          [-195, 400],
          [-250, 400]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      {/* Right 3PT */}
      <LinePath
        stroke={White}
        strokeWidth={2}
        strokeDasharray={"1,5"}
        data={[
          [60, 230],
          [195, 400],
          [250, 400]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      {/* Right 3PT */}
      <LinePath
        stroke={White}
        strokeWidth={2}
        strokeDasharray={"1,5"}
        data={[
          [-195, 400],
          [195, 400]
        ]}
        x={(d) => xScale(d[0]) ?? 0}
        y={(d) => yScale(d[1]) ?? 0}
      />
      <rect
        fill={Background}
        x={xScale(-80)}
        y={yScale(-50)}
        width={radiusXScale(160)}
        height={radiusYScale(190)}
      />
    </Group>
  );
}
