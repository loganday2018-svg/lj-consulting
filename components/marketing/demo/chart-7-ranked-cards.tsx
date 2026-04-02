"use client"

import { useState } from "react"
import { LOCATION_DATA, COLORS } from "@/lib/demo-data"
import { cn } from "@/lib/utils"

type SortBy = "revenue" | "margin" | "efficiency"

function fmtM(n: number): string {
  return `$${(n / 1_000_000).toFixed(1)}M`
}

function fmtK(n: number): string {
  return `$${(n / 1_000).toFixed(0)}K`
}

const sortOptions: { key: SortBy; label: string }[] = [
  { key: "revenue", label: "Revenue" },
  { key: "margin", label: "Margin" },
  { key: "efficiency", label: "Rev/Head" },
]

export function Chart7RankedCards() {
  const [sortBy, setSortBy] = useState<SortBy>("revenue")

  const sorted = [...LOCATION_DATA].sort((a, b) => {
    if (sortBy === "revenue") return b.revenue - a.revenue
    if (sortBy === "margin") return b.margin - a.margin
    return (b.revenue / b.headcount) - (a.revenue / a.headcount)
  })

  const maxRevenue = Math.max(...LOCATION_DATA.map(l => l.revenue))
  const maxMargin = Math.max(...LOCATION_DATA.map(l => l.margin))
  const maxEfficiency = Math.max(...LOCATION_DATA.map(l => l.revenue / l.headcount))

  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">#7 — Location Rankings</h3>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-700">Performance by Location</span>
          <div className="flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5">
            {sortOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSortBy(opt.key)}
                className={cn(
                  "rounded-md px-2 py-1 text-xs font-medium transition-colors",
                  sortBy === opt.key
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {sorted.map((loc, i) => {
            const revBar = (loc.revenue / maxRevenue) * 100
            const marginBar = (loc.margin / maxMargin) * 100
            const effBar = ((loc.revenue / loc.headcount) / maxEfficiency) * 100
            const isTop = i === 0
            const isBottom = i === sorted.length - 1

            return (
              <div
                key={loc.name}
                className={cn(
                  "rounded-lg border p-3 transition-colors",
                  isTop ? "border-teal-200 bg-teal-50/50" : isBottom ? "border-rose-200 bg-rose-50/30" : "border-slate-100 bg-white"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                        style={{ backgroundColor: COLORS.locations[i % COLORS.locations.length], color: "white" }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm font-semibold text-slate-800 truncate">{loc.name}</span>
                    </div>
                    <span className="mt-0.5 block text-[10px] text-slate-400">{loc.type} · {loc.headcount} staff</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-bold text-slate-900 tabular-nums">{fmtM(loc.revenue)}</span>
                  </div>
                </div>

                {/* Metric bars */}
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div>
                    <div className="flex items-baseline justify-between mb-0.5">
                      <span className="text-[9px] text-slate-400">Revenue</span>
                      <span className="text-[10px] font-medium text-slate-600 tabular-nums">{fmtM(loc.revenue)}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100">
                      <div className="h-full rounded-full" style={{ width: `${revBar}%`, backgroundColor: COLORS.revenue }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between mb-0.5">
                      <span className="text-[9px] text-slate-400">Margin</span>
                      <span className="text-[10px] font-medium text-slate-600 tabular-nums">{loc.margin}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100">
                      <div className="h-full rounded-full" style={{ width: `${marginBar}%`, backgroundColor: COLORS.profit }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between mb-0.5">
                      <span className="text-[9px] text-slate-400">Rev/Head</span>
                      <span className="text-[10px] font-medium text-slate-600 tabular-nums">{fmtK(loc.revenue / loc.headcount)}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100">
                      <div className="h-full rounded-full" style={{ width: `${effBar}%`, backgroundColor: COLORS.ebitda }} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
