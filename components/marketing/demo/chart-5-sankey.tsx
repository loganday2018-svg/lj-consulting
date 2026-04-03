"use client"

import { COLORS } from "@/lib/demo-data"

interface RevenueBridgeProps {
  totals: {
    revenue: number
    patientServices: number
    ancillaryRevenue: number
    otherIncome: number
    totalCogs: number
    totalOpex: number
    ebitda: number
    grossProfit: number
  }
}

function fmtM(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  return `$${(n / 1_000).toFixed(0)}K`
}

function pct(n: number, total: number): string {
  return `${((n / total) * 100).toFixed(0)}%`
}

interface BarSegment {
  label: string
  value: number
  color: string
}

function StackedBar({ segments, total }: { segments: BarSegment[]; total: number }) {
  return (
    <div>
      <div className="flex h-8 overflow-hidden rounded-lg sm:h-10">
        {segments.map((seg) => {
          const widthPct = (seg.value / total) * 100
          return (
            <div
              key={seg.label}
              className="relative group flex items-center justify-center text-xs font-medium text-white transition-all"
              style={{ width: `${widthPct}%`, backgroundColor: seg.color }}
            >
              {widthPct > 15 && <span className="text-[10px] sm:text-xs">{seg.label}</span>}
              <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10">
                <div className="rounded bg-slate-800 px-2 py-1 text-[10px] text-white whitespace-nowrap shadow">
                  {seg.label}: {fmtM(seg.value)} ({pct(seg.value, total)})
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-[10px] text-slate-500 sm:text-xs">{seg.label}</span>
            <span className="text-[10px] font-medium text-slate-700 tabular-nums sm:text-xs">{fmtM(seg.value)}</span>
            <span className="text-[10px] text-slate-400 tabular-nums">{pct(seg.value, total)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Arrow() {
  return (
    <div className="flex justify-center py-1">
      <svg width="20" height="16" viewBox="0 0 20 16" className="text-slate-300">
        <path d="M10 0 L10 10 M4 6 L10 12 L16 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export function Chart5Sankey({ totals }: RevenueBridgeProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Revenue sources */}
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-xs font-semibold text-slate-700">Revenue</span>
        <span className="text-sm font-bold text-slate-900 tabular-nums">{fmtM(totals.revenue)}</span>
      </div>
      <StackedBar
        segments={[
          { label: "Patient Services", value: totals.patientServices, color: COLORS.revenue },
          { label: "Ancillary", value: totals.ancillaryRevenue, color: "#2a5580" },
          { label: "Other", value: totals.otherIncome, color: "#6ba3d6" },
        ]}
        total={totals.revenue}
      />

      <Arrow />

      {/* Cost breakdown */}
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-xs font-semibold text-slate-700">Where It Goes</span>
        <span className="text-sm font-bold text-slate-900 tabular-nums">{fmtM(totals.revenue)}</span>
      </div>
      <StackedBar
        segments={[
          { label: "COGS", value: totals.totalCogs, color: COLORS.cost },
          { label: "OpEx", value: totals.totalOpex, color: COLORS.neutral },
          { label: "EBITDA", value: totals.ebitda, color: COLORS.ebitda },
        ]}
        total={totals.revenue}
      />

      <Arrow />

      {/* EBITDA callout */}
      <div className="flex items-baseline justify-between rounded-lg border-2 border-dashed border-teal-200 bg-teal-50/50 px-3 py-2">
        <span className="text-xs font-semibold" style={{ color: COLORS.ebitda }}>EBITDA</span>
        <span className="text-sm font-bold" style={{ color: COLORS.ebitda }}>
          {fmtM(totals.ebitda)} ({pct(totals.ebitda, totals.revenue)} margin)
        </span>
      </div>
    </div>
  )
}
