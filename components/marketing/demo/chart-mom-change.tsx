"use client"

import { useState } from "react"
import { type MonthlyPnL, COLORS } from "@/lib/demo-data"
import { cn } from "@/lib/utils"

interface MoMChangeProps {
  data: MonthlyPnL[]
}

type MetricKey = "ebitda" | "revenue" | "grossProfit"

const METRIC_OPTIONS: { key: MetricKey; label: string }[] = [
  { key: "ebitda", label: "EBITDA" },
  { key: "revenue", label: "Revenue" },
  { key: "grossProfit", label: "Gross Profit" },
]

function fmtPct(n: number): string {
  const sign = n >= 0 ? "+" : ""
  return `${sign}${n.toFixed(1)}%`
}

function fmtM(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  return `$${(n / 1_000).toFixed(0)}K`
}

export function ChartMoMChange({ data }: MoMChangeProps) {
  const [metric, setMetric] = useState<MetricKey>("ebitda")
  const [hovered, setHovered] = useState<number | null>(null)

  // Compute MoM % changes (skip first month — no prior)
  const changes = data.slice(1).map((d, i) => {
    const prev = data[i][metric] as number
    const curr = d[metric] as number
    const pctChange = prev === 0 ? 0 : ((curr - prev) / prev) * 100
    return {
      month: d.month,
      pctChange,
      value: curr,
      prevValue: prev,
    }
  })

  if (changes.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm text-slate-400 text-center py-8">Select a longer period to see month-over-month changes</p>
      </div>
    )
  }

  const maxAbs = Math.max(...changes.map(c => Math.abs(c.pctChange)), 5)
  const chartW = 440
  const chartH = 220
  const pad = { top: 24, right: 16, bottom: 28, left: 40 }
  const plotW = chartW - pad.left - pad.right
  const plotH = chartH - pad.top - pad.bottom
  const barW = Math.min(plotW / changes.length - 4, 34)
  const midY = pad.top + plotH / 2

  function yPos(pct: number): number {
    return midY - (pct / maxAbs) * (plotH / 2)
  }

  const avgChange = changes.reduce((s, c) => s + c.pctChange, 0) / changes.length
  const positiveMonths = changes.filter(c => c.pctChange >= 0).length

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-sm font-semibold text-slate-700">Month-over-Month Change</span>
          <p className="text-[10px] text-slate-400 sm:text-xs">
            Avg {fmtPct(avgChange)} · {positiveMonths}/{changes.length} months positive
          </p>
        </div>
        <div className="flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5">
          {METRIC_OPTIONS.map((m) => (
            <button
              key={m.key}
              onClick={() => setMetric(m.key)}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium transition-colors",
                metric === m.key
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto" style={{ minWidth: 300 }}>
        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full" preserveAspectRatio="xMidYMid meet">
          {/* Zero line */}
          <line x1={pad.left} x2={chartW - pad.right} y1={midY} y2={midY} stroke="#e2e8f0" strokeWidth={1} />

          {/* Grid lines */}
          {[-maxAbs / 2, maxAbs / 2].map(v => (
            <g key={v}>
              <line x1={pad.left} x2={chartW - pad.right} y1={yPos(v)} y2={yPos(v)} stroke="#f1f5f9" />
              <text x={pad.left - 4} y={yPos(v) + 3} textAnchor="end" fontSize={8} fill="#94a3b8">
                {v > 0 ? "+" : ""}{v.toFixed(0)}%
              </text>
            </g>
          ))}
          <text x={pad.left - 4} y={midY + 3} textAnchor="end" fontSize={8} fill="#94a3b8">0%</text>

          {/* Bars */}
          {changes.map((c, i) => {
            const slotW = plotW / changes.length
            const x = pad.left + i * slotW + (slotW - barW) / 2
            const isPositive = c.pctChange >= 0
            const barH = Math.abs(yPos(c.pctChange) - midY)
            const color = isPositive ? COLORS.profit : COLORS.cost
            const isHov = hovered === i

            return (
              <g
                key={c.month}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Hit area */}
                <rect x={x} y={pad.top} width={barW} height={plotH} fill="transparent" />
                {/* Bar */}
                <rect
                  x={x}
                  y={isPositive ? yPos(c.pctChange) : midY}
                  width={barW}
                  height={Math.max(barH, 3)}
                  rx={3}
                  fill={color}
                  opacity={isHov ? 1 : 0.8}
                />
                {/* Value label — always visible */}
                <text
                  x={x + barW / 2}
                  y={isPositive ? Math.min(yPos(c.pctChange) - 5, midY - 8) : Math.max(midY + barH + 11, midY + 14)}
                  textAnchor="middle"
                  fontSize={8}
                  fontWeight={600}
                  fill={color}
                >
                  {fmtPct(c.pctChange)}
                </text>
                {/* Month label */}
                <text x={x + barW / 2} y={chartH - 6} textAnchor="middle" fontSize={9} fill="#94a3b8">
                  {c.month}
                </text>
              </g>
            )
          })}

          {/* Tooltip */}
          {hovered !== null && (() => {
            const c = changes[hovered]
            const slotW = plotW / changes.length
            const x = pad.left + hovered * slotW + slotW / 2
            return (
              <foreignObject x={Math.max(0, Math.min(x - 70, chartW - 140))} y={0} width={140} height={36}>
                <div style={{ background: "#1e293b", borderRadius: 6, padding: "4px 8px", color: "white", fontSize: 10, textAlign: "center", lineHeight: 1.4 }}>
                  <span style={{ fontWeight: 600 }}>{c.month}:</span> {fmtM(c.value)} from {fmtM(c.prevValue)}
                </div>
              </foreignObject>
            )
          })()}
        </svg>
      </div>
    </div>
  )
}
