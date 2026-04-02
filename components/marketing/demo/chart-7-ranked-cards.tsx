"use client"

import { LOCATION_DATA, COLORS } from "@/lib/demo-data"

function fmtM(n: number): string {
  return `$${(n / 1_000_000).toFixed(1)}M`
}

export function Chart7RankedCards() {
  const sorted = [...LOCATION_DATA].sort((a, b) => b.revenue - a.revenue)
  const maxRevenue = sorted[0].revenue

  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">#7 — Location Leaderboard</h3>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="space-y-3">
          {sorted.map((loc, i) => {
            const barWidth = (loc.revenue / maxRevenue) * 100
            return (
              <div key={loc.name} className="flex items-center gap-3">
                <span className="w-5 text-right text-xs font-bold text-slate-400">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-sm font-medium text-slate-800 truncate">{loc.name}</span>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                      <span className="text-xs text-slate-500">{loc.margin}%</span>
                      <span className="text-sm font-semibold text-slate-900 tabular-nums">{fmtM(loc.revenue)}</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${barWidth}%`,
                        backgroundColor: COLORS.locations[i % COLORS.locations.length],
                      }}
                    />
                  </div>
                  <div className="mt-0.5 flex gap-2 text-[10px] text-slate-400">
                    <span>{loc.type}</span>
                    <span>·</span>
                    <span>{loc.headcount} staff</span>
                    <span>·</span>
                    <span>${(loc.revenue / loc.headcount / 1000).toFixed(0)}K/head</span>
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
