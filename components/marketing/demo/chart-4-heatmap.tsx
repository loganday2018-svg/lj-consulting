"use client"

import { type MonthlyPnL, COLORS } from "@/lib/demo-data"

function fmtM(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  return `$${(n / 1_000).toFixed(0)}K`
}

function fmtK(n: number): string {
  return `$${(n / 1_000).toFixed(0)}K`
}

const metrics: { key: keyof MonthlyPnL; label: string; color: string }[] = [
  { key: "revenue", label: "Revenue", color: COLORS.revenue },
  { key: "grossProfit", label: "Gross Profit", color: COLORS.profit },
  { key: "ebitda", label: "EBITDA", color: COLORS.ebitda },
  { key: "totalCogs", label: "COGS", color: COLORS.cost },
  { key: "totalOpex", label: "OpEx", color: COLORS.neutral },
]

function MiniArea({ values, color, months }: { values: number[]; color: string; months: string[] }) {
  const w = 240
  const h = 48
  const pad = 2
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const points = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (w - pad * 2)
    const y = h - pad - ((v - min) / range) * (h - pad * 2 - 4)
    return { x, y, val: v, month: months[i] }
  })

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")
  const areaPath = `${linePath} L${points[points.length - 1].x},${h} L${points[0].x},${h} Z`

  // Find min and max points
  const maxIdx = values.indexOf(Math.max(...values))
  const minIdx = values.indexOf(Math.min(...values))

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ minWidth: 180 }} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <path d={areaPath} fill={`url(#grad-${color.replace("#", "")})`} />
      {/* Line */}
      <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots for high and low */}
      <circle cx={points[maxIdx].x} cy={points[maxIdx].y} r={3} fill={color} stroke="white" strokeWidth={1.5} />
      <circle cx={points[minIdx].x} cy={points[minIdx].y} r={3} fill={color} stroke="white" strokeWidth={1.5} opacity={0.6} />
      {/* High label */}
      <text x={points[maxIdx].x} y={points[maxIdx].y - 7} textAnchor="middle" fontSize={8} fontWeight={600} fill={color}>
        {fmtK(values[maxIdx])}
      </text>
      {/* Low label */}
      <text x={points[minIdx].x} y={points[minIdx].y + 12} textAnchor="middle" fontSize={7} fill={color} opacity={0.6}>
        {fmtK(values[minIdx])}
      </text>
    </svg>
  )
}

interface Chart4HeatmapProps {
  monthlyData: MonthlyPnL[]
}

export function Chart4Heatmap({ monthlyData }: Chart4HeatmapProps) {
  const months = monthlyData.map(d => d.month)

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="space-y-3">
        {metrics.map((metric) => {
          const values = monthlyData.map(d => d[metric.key] as number)
          const total = values.reduce((s, v) => s + v, 0)
          const avg = total / values.length
          const maxVal = Math.max(...values)
          const minVal = Math.min(...values)
          const spread = maxVal - minVal
          const spreadPct = avg > 0 ? ((spread / avg) * 100).toFixed(0) : "0"

          return (
            <div key={metric.key} className="flex items-center gap-3 sm:gap-4">
              {/* Label + total */}
              <div className="w-24 flex-shrink-0 sm:w-32">
                <p className="text-xs font-semibold text-slate-700 sm:text-sm">{metric.label}</p>
                <p className="text-[10px] text-slate-400 tabular-nums sm:text-xs">
                  {fmtM(total)} · {spreadPct}% spread
                </p>
              </div>
              {/* Mini chart */}
              <div className="flex-1 min-w-0">
                <MiniArea values={values} color={metric.color} months={months} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
