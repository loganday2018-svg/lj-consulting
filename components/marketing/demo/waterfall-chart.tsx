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

type ColType = "bar" | "line"

interface Col {
  label: string
  value: number
  base: number
  color: string
  type: ColType
  sign: "positive" | "negative" | "subtotal"
}

export function WaterfallChart({ totals }: WaterfallChartProps) {
  const cols: Col[] = [
    { label: "Revenue", value: totals.revenue, base: 0, color: COLORS.revenue, type: "bar", sign: "positive" },
    { label: "COGS", value: totals.totalCogs, base: totals.revenue - totals.totalCogs, color: COLORS.cost, type: "bar", sign: "negative" },
    { label: "GP", value: totals.grossProfit, base: 0, color: COLORS.profit, type: "line", sign: "subtotal" },
    { label: "OpEx", value: totals.totalOpex, base: totals.grossProfit - totals.totalOpex, color: COLORS.cost, type: "bar", sign: "negative" },
    { label: "EBITDA", value: totals.ebitda, base: 0, color: COLORS.ebitda, type: "bar", sign: "subtotal" },
  ]

  const chartH = 260, barW = 36, gap = 32, leftPad = 52, topPad = 16, bottomPad = 36
  const drawH = chartH - topPad - bottomPad
  const niceMax = Math.ceil(totals.revenue / 5_000_000) * 5_000_000
  const ticks = Array.from({ length: 6 }, (_, i) => (niceMax / 5) * i)
  const yPos = (v: number) => topPad + drawH - (v / niceMax) * drawH
  const totalW = leftPad + cols.length * (barW + gap) + gap

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <svg viewBox={`0 0 ${totalW} ${chartH}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Grid */}
        {ticks.map(t => (
          <g key={t}>
            <line x1={leftPad} x2={totalW - 8} y1={yPos(t)} y2={yPos(t)} stroke="#f1f5f9" />
            <text x={leftPad - 6} y={yPos(t) + 3} textAnchor="end" fontSize={9} fill="#94a3b8">{fmtM(t)}</text>
          </g>
        ))}

        {cols.map((col, i) => {
          const x = leftPad + i * (barW + gap) + gap / 2
          const centerX = x + barW / 2

          if (col.type === "line") {
            // GP — just a horizontal line at the value level
            const lineY = yPos(col.value)
            return (
              <g key={col.label}>
                {/* Connector from COGS bar */}
                <line x1={leftPad + (i - 1) * (barW + gap) + gap / 2 + barW} x2={x} y1={yPos(cols[i - 1].base + cols[i - 1].value)} y2={yPos(cols[i - 1].base + cols[i - 1].value)} stroke="#e2e8f0" strokeDasharray="3 3" />
                {/* The GP line */}
                <line x1={x} x2={x + barW} y1={lineY} y2={lineY} stroke={col.color} strokeWidth={3} strokeLinecap="round" />
                {/* Bracket ticks */}
                <line x1={x} x2={x} y1={lineY - 5} y2={lineY + 5} stroke={col.color} strokeWidth={2} strokeLinecap="round" />
                <line x1={x + barW} x2={x + barW} y1={lineY - 5} y2={lineY + 5} stroke={col.color} strokeWidth={2} strokeLinecap="round" />
                {/* Value label */}
                <text x={centerX} y={lineY - 10} textAnchor="middle" fontSize={9} fontWeight={600} fill={col.color}>{fmtM(col.value)}</text>
                {/* X-axis label */}
                <text x={centerX} y={chartH - 8} textAnchor="middle" fontSize={10} fill="#64748b">{col.label}</text>
                {/* Connector to OpEx bar */}
                <line x1={x + barW} x2={leftPad + (i + 1) * (barW + gap) + gap / 2} y1={lineY} y2={lineY} stroke="#e2e8f0" strokeDasharray="3 3" />
              </g>
            )
          }

          // Regular bar
          const top = yPos(col.base + col.value)
          const bot = yPos(col.base)
          const h = Math.max(bot - top, 1)

          // Connector from previous bar (only for negative bars that follow a bar)
          const prevCol = cols[i - 1]
          const prevX = leftPad + (i - 1) * (barW + gap) + gap / 2
          const showConnector = i > 0 && col.sign === "negative" && prevCol.type === "bar"

          return (
            <g key={col.label}>
              {showConnector && (
                <line x1={prevX + barW} x2={x} y1={yPos(prevCol.base + prevCol.value)} y2={yPos(prevCol.base + prevCol.value)} stroke="#e2e8f0" strokeDasharray="3 3" />
              )}
              <rect x={x} y={top} width={barW} height={h} rx={3} fill={col.color} opacity={0.85} />
              <text x={centerX} y={top - 7} textAnchor="middle" fontSize={9} fontWeight={600} fill={col.color}>
                {col.sign === "negative" ? `-${fmtM(col.value)}` : fmtM(col.value)}
              </text>
              <text x={centerX} y={chartH - 8} textAnchor="middle" fontSize={10} fill="#64748b">{col.label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
