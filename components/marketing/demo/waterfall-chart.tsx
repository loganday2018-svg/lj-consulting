"use client"

import { COLORS } from "@/lib/demo-data"

interface WaterfallChartProps {
  totals: {
    revenue: number
    totalCogs: number
    grossProfit: number
    totalOpex: number
    ebitda: number
  }
}

function fmtM(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  return `$${(value / 1_000).toFixed(0)}K`
}

interface WaterfallBar {
  label: string
  shortLabel: string
  value: number
  base: number
  color: string
  type: "positive" | "negative" | "subtotal"
}

export function WaterfallChart({ totals }: WaterfallChartProps) {
  const bars: WaterfallBar[] = [
    { label: "Revenue", shortLabel: "Rev", value: totals.revenue, base: 0, color: COLORS.revenue, type: "positive" },
    { label: "COGS", shortLabel: "COGS", value: totals.totalCogs, base: totals.revenue - totals.totalCogs, color: COLORS.cost, type: "negative" },
    { label: "Gross Profit", shortLabel: "GP", value: totals.grossProfit, base: 0, color: COLORS.profit, type: "subtotal" },
    { label: "OpEx", shortLabel: "OpEx", value: totals.totalOpex, base: totals.grossProfit - totals.totalOpex, color: COLORS.cost, type: "negative" },
    { label: "EBITDA", shortLabel: "EBITDA", value: totals.ebitda, base: 0, color: COLORS.profit, type: "subtotal" },
  ]

  const maxValue = totals.revenue
  const chartHeight = 240
  const barWidth = 40
  const gap = 24
  const leftPad = 52
  const topPad = 8
  const bottomPad = 32
  const drawHeight = chartHeight - topPad - bottomPad

  // Y-axis ticks
  const niceMax = Math.ceil(maxValue / 5_000_000) * 5_000_000
  const tickCount = 5
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => (niceMax / tickCount) * i)

  function yPos(val: number): number {
    return topPad + drawHeight - (val / niceMax) * drawHeight
  }

  const totalWidth = leftPad + bars.length * (barWidth + gap)

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-700 sm:mb-4">Revenue to EBITDA Bridge</h3>

      <svg viewBox={`0 0 ${totalWidth} ${chartHeight}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={leftPad}
              x2={totalWidth - 8}
              y1={yPos(tick)}
              y2={yPos(tick)}
              stroke="#e2e8f0"
              strokeDasharray="3 3"
            />
            <text x={leftPad - 6} y={yPos(tick) + 3} textAnchor="end" fontSize={9} fill="#94a3b8">
              {fmtM(tick)}
            </text>
          </g>
        ))}

        {/* Bars */}
        {bars.map((bar, i) => {
          const x = leftPad + i * (barWidth + gap) + gap / 2
          const top = yPos(bar.base + bar.value)
          const bottom = yPos(bar.base)
          const height = Math.max(bottom - top, 1)

          // Connector line from previous bar
          const showConnector = i > 0 && bar.type === "negative"
          const prevBar = bars[i - 1]
          const prevX = leftPad + (i - 1) * (barWidth + gap) + gap / 2

          return (
            <g key={bar.shortLabel}>
              {/* Connector dashed line */}
              {showConnector && (
                <line
                  x1={prevX + barWidth}
                  x2={x}
                  y1={yPos(prevBar.base + prevBar.value)}
                  y2={yPos(prevBar.base + prevBar.value)}
                  stroke="#cbd5e1"
                  strokeDasharray="2 2"
                />
              )}

              {/* Bar */}
              <rect
                x={x}
                y={top}
                width={barWidth}
                height={height}
                rx={3}
                fill={bar.color}
              />

              {/* Value label on bar */}
              <text
                x={x + barWidth / 2}
                y={top - 5}
                textAnchor="middle"
                fontSize={8}
                fontWeight={600}
                fill={bar.color}
              >
                {fmtM(bar.value)}
              </text>

              {/* X-axis label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight - 6}
                textAnchor="middle"
                fontSize={9}
                fill="#64748b"
              >
                {bar.shortLabel}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-center gap-4">
        {[
          { label: "Revenue", color: COLORS.revenue },
          { label: "Cost", color: COLORS.cost },
          { label: "Profit", color: COLORS.profit },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-slate-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
