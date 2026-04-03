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

  const changes = data.slice(1).map((d, i) => {
    const prev = data[i][metric] as number
    const curr = d[metric] as number
    const pctChange = prev === 0 ? 0 : ((curr - prev) / prev) * 100
    return { month: d.month, pctChange, value: curr, prevValue: prev }
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
  const pad = { top: 28, right: 16, bottom: 28, left: 40 }
  const plotW = chartW - pad.left - pad.right
  const plotH = chartH - pad.top - pad.bottom
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
          <line x1={pad.left} x2={chartW - pad.right} y1={midY} y2={midY} stroke="#cbd5e1" strokeWidth={1} />

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

          {/* Lollipops */}
          {changes.map((c, i) => {
            const slotW = plotW / changes.length
            const cx = pad.left + i * slotW + slotW / 2
            const dotY = yPos(c.pctChange)
            const isPositive = c.pctChange >= 0
            const color = isPositive ? COLORS.profit : COLORS.cost
            const isHov = hovered === i
            const dotR = isHov ? 7 : 5

            return (
              <g
                key={c.month}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Hit area */}
                <rect x={cx - slotW / 2} y={pad.top} width={slotW} height={plotH} fill="transparent" />
                {/* Stem */}
                <line
                  x1={cx}
                  x2={cx}
                  y1={midY}
                  y2={dotY}
                  stroke={color}
                  strokeWidth={isHov ? 2.5 : 2}
                  strokeLinecap="round"
                  opacity={isHov ? 1 : 0.6}
                />
                {/* Dot */}
                <circle
                  cx={cx}
                  cy={dotY}
                  r={dotR}
                  fill={color}
                  stroke="white"
                  strokeWidth={2}
                />
                {/* % label */}
                <text
                  x={cx}
                  y={isPositive ? dotY - dotR - 4 : dotY + dotR + 11}
                  textAnchor="middle"
                  fontSize={isHov ? 9 : 8}
                  fontWeight={600}
                  fill={color}
                >
                  {fmtPct(c.pctChange)}
                </text>
                {/* Month label */}
                <text x={cx} y={chartH - 6} textAnchor="middle" fontSize={9} fill="#94a3b8">
                  {c.month}
                </text>
              </g>
            )
          })}

          {/* Tooltip */}
          {hovered !== null && (() => {
            const c = changes[hovered]
            const slotW = plotW / changes.length
            const cx = pad.left + hovered * slotW + slotW / 2
            return (
              <foreignObject x={Math.max(0, Math.min(cx - 70, chartW - 140))} y={0} width={140} height={36}>
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
