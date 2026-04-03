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
  const w = 80
  const h = 28
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 4) - 2
    return `${x},${y}`
  }).join(" ")

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

function computeHalfDelta(data: MonthlyPnL[], key: keyof MonthlyPnL): number | null {
  if (data.length < 2) return null
  const mid = Math.floor(data.length / 2)
  const h1 = data.slice(0, mid).reduce((s, d) => s + (d[key] as number), 0)
  const h2 = data.slice(mid).reduce((s, d) => s + (d[key] as number), 0)
  if (h1 === 0) return null
  return ((h2 - h1) / h1) * 100
}

export function Chart1SparklineKPIs({ data, totals }: SparklineKPIsProps) {
  const cards = [
    { label: "Revenue", value: fmtM(totals.revenue), spark: data.map(d => d.revenue), color: COLORS.revenue, delta: computeHalfDelta(data, "revenue") },
    { label: "Gross Profit", value: fmtM(totals.grossProfit), spark: data.map(d => d.grossProfit), color: COLORS.profit, delta: computeHalfDelta(data, "grossProfit") },
    { label: "EBITDA", value: fmtM(totals.ebitda), spark: data.map(d => d.ebitda), color: COLORS.ebitda, delta: computeHalfDelta(data, "ebitda") },
  ]

  return (
    <div>
      <div className="grid grid-cols-3 gap-1.5 sm:gap-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm sm:p-4">
            <p className="text-[9px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs">{card.label}</p>
            <div className="mt-0.5 flex items-baseline gap-1 sm:mt-1 sm:gap-2">
              <p className="text-base font-bold text-slate-900 sm:text-3xl tabular-nums">{card.value}</p>
              {card.delta !== null && (
                <span className={`hidden items-center gap-0.5 text-xs font-semibold sm:inline-flex ${card.delta >= 0 ? "text-teal-600" : "text-rose-600"}`}>
                  <svg width="10" height="10" viewBox="0 0 10 10" className={card.delta < 0 ? "rotate-180" : ""}>
                    <path d="M5 1 L9 6 L1 6 Z" fill="currentColor" />
                  </svg>
                  {Math.abs(card.delta).toFixed(1)}%
                </span>
              )}
            </div>
            <div className="mt-1 hidden sm:block">
              <Sparkline values={card.spark} color={card.color} />
            </div>
            {card.delta !== null && (
              <p className="mt-0.5 text-[9px] text-slate-400 hidden sm:block">H1 → H2</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
