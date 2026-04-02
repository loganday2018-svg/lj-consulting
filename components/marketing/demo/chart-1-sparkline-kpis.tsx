"use client"

import { type MonthlyPnL, COLORS } from "@/lib/demo-data"

interface SparklineKPIsProps {
  data: MonthlyPnL[]
  totals: {
    revenue: number
    grossProfit: number
    ebitda: number
    totalOpex: number
  }
}

function Sparkline({ values, color, width = 80, height = 28 }: { values: number[]; color: string; width?: number; height?: number }) {
  if (values.length < 2) return null
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width
    const y = height - ((v - min) / range) * (height - 4) - 2
    return `${x},${y}`
  }).join(" ")

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function fmtM(n: number): string {
  return `$${(n / 1_000_000).toFixed(1)}M`
}

function fmtPct(num: number, den: number): string {
  return `${((num / den) * 100).toFixed(1)}%`
}

export function Chart1SparklineKPIs({ data, totals }: SparklineKPIsProps) {
  const cards = [
    { label: "Revenue", value: fmtM(totals.revenue), spark: data.map(d => d.revenue), color: COLORS.revenue },
    { label: "Gross Profit", value: fmtM(totals.grossProfit), spark: data.map(d => d.grossProfit), color: COLORS.profit },
    { label: "EBITDA", value: fmtM(totals.ebitda), spark: data.map(d => d.ebitda), color: COLORS.ebitda },
    { label: "EBITDA Margin", value: fmtPct(totals.ebitda, totals.revenue), spark: data.map(d => d.ebitda / d.revenue * 100), color: COLORS.ebitda },
  ]

  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">#1 — Sparkline KPI Cards</h3>
      <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500">{card.label}</p>
                <p className="mt-1 text-xl font-bold text-slate-900">{card.value}</p>
              </div>
              <Sparkline values={card.spark} color={card.color} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
