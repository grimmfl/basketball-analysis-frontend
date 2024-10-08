"use client";

import React, { useEffect, useState } from "react";
import { Shot } from "@/app/models";
import { scaleLinear } from "@visx/scale";
import { Highlight, SecondaryAsTransparent } from "@/app/globals";
import { Group } from "@visx/group";
import Court from "@/app/ui/shot-chart/court";
import Zones from "@/app/ui/shot-chart/zones";

type ShotChartSize = "small" | "medium" | "large";

function getDimensions(size: ShotChartSize): {
  width: number;
  height: number;
  shotRadius: number;
} {
  switch (size) {
    case "small":
      return { width: 300, height: 300, shotRadius: 2 };
    case "medium":
      return { width: 500, height: 500, shotRadius: 4 };
    case "large":
      return { width: 700, height: 700, shotRadius: 4 };
  }
}

export default function ShotChart({
  shots,
  size,
  isPreview,
  onClick
}: {
  shots: Shot[];
  size: "small" | "medium" | "large";
  isPreview?: boolean;
  onClick?: () => void;
}) {
  if (isPreview == null) isPreview = false;

  const { width, height, shotRadius } = getDimensions(size);
  const marginY = 30;
  const marginX = 30;

  const maxX = width - marginX;
  const maxY = height - marginY;

  const [isRectVisible, setIsRectVisible] = useState(false);

  const xScale = scaleLinear<number>({
    range: [marginX, maxX],
    domain: [-250, 250]
  });

  const yScale = scaleLinear<number>({
    range: [marginY, maxY],
    domain: [-51, 500]
  });

  const radiusXScale = scaleLinear<number>({
    range: [0, width - 2 * marginX],
    domain: [0, 500]
  });

  const radiusYScale = scaleLinear<number>({
    range: [0, height - 2 * marginY],
    domain: [0, 551]
  });
  return (
    <div>
      <svg
        onMouseEnter={() => setIsRectVisible(true)}
        onMouseLeave={() => setIsRectVisible(false)}
        className="hover:cursor-pointer"
        onClick={() => (onClick != null ? onClick() : {})}
        width={width}
        height={height}
      >
        <Zones
          xScale={xScale}
          yScale={yScale}
          radiusXScale={radiusXScale}
          radiusYScale={radiusYScale}
        ></Zones>
        <Group>
          {shots.map((shot, i) => (
            <circle
              key={`point-${i}`}
              cx={xScale(shot.loc_x)}
              cy={yScale(shot.loc_y)}
              r={shotRadius}
              fill={shot.shot_made ? Highlight : SecondaryAsTransparent}
            />
          ))}
          <Court
            xScale={xScale}
            yScale={yScale}
            radiusXScale={radiusXScale}
            radiusYScale={radiusYScale}
          ></Court>
        </Group>
        {isPreview && isRectVisible && (
          <rect
            fill={"gray"}
            fillOpacity={0.5}
            x={xScale(-250)}
            y={yScale(-50)}
            width={radiusXScale(500)}
            height={radiusYScale(520)}
          />
        )}
      </svg>
    </div>
  );
}
