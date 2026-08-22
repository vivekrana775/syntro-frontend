import { forwardRef, useId, type SVGAttributes } from 'react';

import { cn } from '@/lib/cn';
import type { ChartDatum, ChartMode } from '@/types';

export interface BarChartProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
  mode: ChartMode;
  /** Axis labels from top to bottom, as displayed. */
  yTicks: readonly string[];
  /** Value range spanned by the five grid lines, [min, max]. */
  domain: readonly [number, number];
  data: readonly ChartDatum[];
  /** Accessible name announced for the chart image. */
  title: string;
}

/*
 * Geometry mirrors the Figma "Chart Content" frames (1:1237 diverging, 1:1297 single): 496×226 with the
 * y-axis labels on the left and six bars (8px gap) filling the remaining width. Values scale so the
 * five grid lines cover `domain`; the diverging chart stacks a hatched "secondary" bar below the baseline.
 */
const WIDTH = 496;
const HEIGHT = 226;
const GAP = 8;
const BAR_RADIUS = 12;
const X_AXIS_BASELINE = 218.5;
const TOOLTIP_HEIGHT = 31;
const TOOLTIP_RADIUS: Record<ChartMode, number> = { diverging: 12, single: 8 };

const LAYOUT: Record<
  ChartMode,
  { origin: number; gridTop: number; gridStep: number; labelTop: number; labelStep: number }
> = {
  diverging: { origin: 45, gridTop: 4, gridStep: 45, labelTop: 8, labelStep: 44.5 },
  single: { origin: 39, gridTop: 1, gridStep: 47.5, labelTop: 4.5, labelStep: 46.25 },
};

/** In Figma the positive bars end 14px under the zero line and the hatched bars start 2px lower. */
const DIVERGING_SPLIT = { positiveBottom: 108, negativeTop: 110 };

export const BarChart = forwardRef<SVGSVGElement, BarChartProps>(function BarChart(
  { mode, yTicks, domain, data, title, className, ...rest },
  ref,
) {
  const patternId = useId();
  const layout = LAYOUT[mode];
  const chartWidth = WIDTH - layout.origin;
  const barWidth = (chartWidth - GAP * (data.length - 1)) / data.length;
  const pxPerUnit = (layout.gridStep * 4) / (domain[1] - domain[0]);
  const gridBottom = layout.gridTop + layout.gridStep * 4;

  return (
    <svg
      ref={ref}
      role="img"
      aria-label={title}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMinYMid meet"
      className={cn('h-auto w-full overflow-visible', className)}
      {...rest}
    >
      <title>{title}</title>
      <defs>
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
          patternTransform="rotate(20)"
        >
          <rect width="4" height="2" className="fill-hatch" />
        </pattern>
      </defs>

      {/* y-axis labels */}
      {yTicks.map((tick, i) => (
        <text
          key={tick}
          x={0}
          y={layout.labelTop + i * layout.labelStep}
          dominantBaseline="central"
          className="fill-graphite/60 font-sans text-xs"
        >
          {tick}
        </text>
      ))}

      {/* grid */}
      {yTicks.map((tick, i) => (
        <line
          key={tick}
          x1={layout.origin}
          x2={WIDTH}
          y1={layout.gridTop + i * layout.gridStep}
          y2={layout.gridTop + i * layout.gridStep}
          className="stroke-graphite/[0.08]"
          strokeWidth={1}
        />
      ))}

      {/* bars */}
      {data.map((datum, i) => {
        const x = layout.origin + i * (barWidth + GAP);
        const center = x + barWidth / 2;
        const height = datum.value * pxPerUnit;
        const bottom = mode === 'diverging' ? DIVERGING_SPLIT.positiveBottom : gridBottom;
        const top = bottom - height;
        const fill = datum.emphasis ? 'fill-vermilion' : 'fill-graphite';
        const tooltipWidth = mode === 'diverging' ? 55 : barWidth;
        const tooltipTop = mode === 'diverging' ? top - 39.9 : top - 4 - TOOLTIP_HEIGHT;

        return (
          <g key={datum.label}>
            {mode === 'single' && !datum.emphasis ? (
              <rect
                x={x}
                y={top}
                width={barWidth}
                height={height}
                rx={BAR_RADIUS}
                fill={`url(#${patternId})`}
              />
            ) : (
              <rect
                x={x}
                y={top}
                width={barWidth}
                height={height}
                rx={BAR_RADIUS}
                className={fill}
              />
            )}

            {mode === 'diverging' && datum.secondaryValue !== undefined ? (
              <rect
                x={x}
                y={DIVERGING_SPLIT.negativeTop}
                width={barWidth}
                height={datum.secondaryValue * pxPerUnit}
                rx={BAR_RADIUS}
                fill={`url(#${patternId})`}
              />
            ) : null}

            {datum.tooltip ? (
              <g>
                <rect
                  x={center - tooltipWidth / 2}
                  y={tooltipTop}
                  width={tooltipWidth}
                  height={TOOLTIP_HEIGHT}
                  rx={TOOLTIP_RADIUS[mode]}
                  className="fill-graphite"
                />
                <text
                  x={center}
                  y={tooltipTop + TOOLTIP_HEIGHT / 2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-white font-sans text-base tracking-normal"
                >
                  {datum.tooltip}
                </text>
                {mode === 'diverging' ? (
                  <circle
                    cx={center}
                    cy={top + 3.6}
                    r={4.9}
                    className="fill-white stroke-graphite"
                    strokeWidth={1.96}
                  />
                ) : null}
              </g>
            ) : null}

            <text
              x={center}
              y={X_AXIS_BASELINE}
              textAnchor="middle"
              className="fill-graphite/60 font-sans text-xs"
            >
              {datum.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
});
