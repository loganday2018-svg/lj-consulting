"use client"

import { type MonthlyPnL, COLORS } from "@/lib/demo-data"

interface SparklineKPIsProps {
  data: MonthlyPnL[]
  totals: {
    revenue: number
    grossProfit: number
    ebitda: number
  }
}

function Sparkline({ values, color }: { values: number[]; color: string }) {
  if (values.length < 2) return null
  const w = 64
  const h = 24
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 4) - 2
    return `${x},${y}`
  }).join(" ")

  // Area fill
  const areaPoints = `0,${h} ${points} ${w},${h}`

  return (
    <svg width={w} height={h} className="flex-shrink-0">
      <polyline points={areaPoints} fill={color} opacity={0.08} />
      <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function fmtM(n: number): string {
  return `$${(n / 1_000_000).toFixed(1)}M`
}

export function Chart1SparklineKPIs({ data, totals }: SparklineKPIsProps) {
  const cards = [
    { label: "Revenue", value: fmtM(totals.revenue), spark: data.map(d => d.revenue), color: COLORS.revenue },
    { label: "Gross Profit", value: fmtM(totals.grossProfit), spark: data.map(d => d.grossProfit), color: COLORS.profit },
    { label: "EBITDA", value: fmtM(totals.ebitda), spark: data.map(d => d.ebitda), color: COLORS.ebitda },
  ]

  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">#1 — Sparkline KPIs</h3>
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs">{card.label}</p>
            <p className="mt-1 text-lg font-bold text-slate-900 sm:text-2xl">{card.value}</p>
            <div className="mt-2">
              <Sparkline values={card.spark} color={card.color} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
