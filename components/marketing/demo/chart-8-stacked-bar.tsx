"use client"

import { COLORS } from "@/lib/demo-data"

interface StackedBarProps {
  totals: {
    revenue: number
    totalCogs: number
    totalOpex: number
    ebitda: number
  }
}

function fmtM(n: number): string {
  return `$${(n / 1_000_000).toFixed(1)}M`
}

function pct(n: number, total: number): string {
  return `${((n / total) * 100).toFixed(0)}%`
}

export function Chart8StackedBar({ totals }: StackedBarProps) {
  const segments = [
    { label: "COGS", value: totals.totalCogs, color: COLORS.cost },
    { label: "OpEx", value: totals.totalOpex, color: COLORS.neutral },
    { label: "EBITDA", value: totals.ebitda, color: COLORS.ebitda },
  ]

  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">#8 — Revenue Decomposition Bar</h3>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-sm font-semibold text-slate-700">Revenue: {fmtM(totals.revenue)}</span>
        </div>

        {/* Stacked bar */}
        <div className="flex h-10 overflow-hidden rounded-lg">
          {segments.map((seg) => {
            const widthPct = (seg.value / totals.revenue) * 100
            return (
              <div
                key={seg.label}
                className="flex items-center justify-center text-xs font-medium text-white transition-all"
                style={{ width: `${widthPct}%`, backgroundColor: seg.color }}
              >
                {widthPct > 12 && <span>{seg.label}</span>}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: seg.color }} />
              <span className="text-xs text-slate-600">{seg.label}</span>
              <span className="text-xs font-medium text-slate-900 tabular-nums">{fmtM(seg.value)}</span>
              <span className="text-xs text-slate-400 tabular-nums">{pct(seg.value, totals.revenue)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
