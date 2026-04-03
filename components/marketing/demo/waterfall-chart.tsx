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
    { label: "Revenue", shortLabel: "Revenue", value: totals.revenue, base: 0, color: COLORS.revenue, type: "positive" },
    { label: "COGS", shortLabel: "COGS", value: totals.totalCogs, base: totals.revenue - totals.totalCogs, color: COLORS.cost, type: "negative" },
    // GP is a reference line, not a bar
    { label: "OpEx", shortLabel: "OpEx", value: totals.totalOpex, base: totals.grossProfit - totals.totalOpex, color: COLORS.cost, type: "negative" },
    { label: "EBITDA", shortLabel: "EBITDA", value: totals.ebitda, base: 0, color: COLORS.ebitda, type: "subtotal" },
  ]

  const maxValue = totals.revenue
  const chartHeight = 260
  const barWidth = 52
  const gap = 32
  const leftPad = 52
  const topPad = 12
  const bottomPad = 36
  const drawHeight = chartHeight - topPad - bottomPad

  const niceMax = Math.ceil(maxValue / 5_000_000) * 5_000_000
  const tickCount = 5
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => (niceMax / tickCount) * i)

  function yPos(val: number): number {
    return topPad + drawHeight - (val / niceMax) * drawHeight
  }

  const totalWidth = leftPad + bars.length * (barWidth + gap) + gap

  // GP line position — spans from after COGS bar to before OpEx bar
  const gpY = yPos(totals.grossProfit)
  const gpLineX1 = leftPad + 1 * (barWidth + gap) + gap / 2 + barWidth + 4
  const gpLineX2 = leftPad + 2 * (barWidth + gap) + gap / 2 - 4

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <svg viewBox={`0 0 ${totalWidth} ${chartHeight}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={leftPad}
              x2={totalWidth - 8}
              y1={yPos(tick)}
              y2={yPos(tick)}
              stroke="#f1f5f9"
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
          const prevIdx = i - 1
          const prevBar = bars[prevIdx]
          const prevX = leftPad + prevIdx * (barWidth + gap) + gap / 2

          return (
            <g key={bar.shortLabel}>
              {/* Connector dashed line */}
              {showConnector && (
                <line
                  x1={prevX + barWidth}
                  x2={x}
                  y1={yPos(prevBar.base + prevBar.value)}
                  y2={yPos(prevBar.base + prevBar.value)}
                  stroke="#e2e8f0"
                  strokeDasharray="3 3"
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
                opacity={0.85}
              />

              {/* Value label on bar */}
              <text
                x={x + barWidth / 2}
                y={top - 6}
                textAnchor="middle"
                fontSize={9}
                fontWeight={600}
                fill={bar.color}
              >
                {fmtM(bar.value)}
              </text>

              {/* X-axis label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight - 8}
                textAnchor="middle"
                fontSize={10}
                fill="#64748b"
              >
                {bar.shortLabel}
              </text>
            </g>
          )
        })}

        {/* Gross Profit reference line */}
        <line
          x1={gpLineX1}
          x2={gpLineX2}
          y1={gpY}
          y2={gpY}
          stroke={COLORS.profit}
          strokeWidth={2}
          strokeDasharray="6 3"
        />
        <text
          x={(gpLineX1 + gpLineX2) / 2}
          y={gpY - 8}
          textAnchor="middle"
          fontSize={9}
          fontWeight={600}
          fill={COLORS.profit}
        >
          GP {fmtM(totals.grossProfit)}
        </text>
      </svg>
    </div>
  )
}
