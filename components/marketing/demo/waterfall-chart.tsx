"use client"

import { useState } from "react"
import { COLORS } from "@/lib/demo-data"
import { cn } from "@/lib/utils"

interface WaterfallChartProps {
  totals: {
    revenue: number
    totalCogs: number
    grossProfit: number
    totalOpex: number
    ebitda: number
  }
}

function fmtM(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  return `$${(value / 1_000).toFixed(0)}K`
}

type Variant = "A1" | "A2" | "A3" | "A4"

// ─── A1: Wide bars + bold GP line with dot endpoints ───
function WaterfallA1({ totals }: WaterfallChartProps) {
  const bars = [
    { label: "Revenue", value: totals.revenue, base: 0, color: COLORS.revenue, type: "positive" as const },
    { label: "COGS", value: totals.totalCogs, base: totals.revenue - totals.totalCogs, color: COLORS.cost, type: "negative" as const },
    { label: "OpEx", value: totals.totalOpex, base: totals.grossProfit - totals.totalOpex, color: COLORS.cost, type: "negative" as const },
    { label: "EBITDA", value: totals.ebitda, base: 0, color: COLORS.ebitda, type: "subtotal" as const },
  ]

  const chartH = 260, barW = 60, gap = 36, leftPad = 52, topPad = 16, bottomPad = 36
  const drawH = chartH - topPad - bottomPad
  const niceMax = Math.ceil(totals.revenue / 5_000_000) * 5_000_000
  const ticks = Array.from({ length: 6 }, (_, i) => (niceMax / 5) * i)
  const yPos = (v: number) => topPad + drawH - (v / niceMax) * drawH
  const totalW = leftPad + bars.length * (barW + gap) + gap

  const gpY = yPos(totals.grossProfit)
  const gpX1 = leftPad + 1 * (barW + gap) + gap / 2 + barW + 6
  const gpX2 = leftPad + 2 * (barW + gap) + gap / 2 - 6

  return (
    <svg viewBox={`0 0 ${totalW} ${chartH}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      {ticks.map(t => (
        <g key={t}>
          <line x1={leftPad} x2={totalW - 8} y1={yPos(t)} y2={yPos(t)} stroke="#f1f5f9" />
          <text x={leftPad - 6} y={yPos(t) + 3} textAnchor="end" fontSize={9} fill="#94a3b8">{fmtM(t)}</text>
        </g>
      ))}
      {bars.map((bar, i) => {
        const x = leftPad + i * (barW + gap) + gap / 2
        const top = yPos(bar.base + bar.value)
        const bot = yPos(bar.base)
        const h = Math.max(bot - top, 1)
        const prevBar = bars[i - 1]
        const prevX = leftPad + (i - 1) * (barW + gap) + gap / 2
        return (
          <g key={bar.label}>
            {i > 0 && bar.type === "negative" && (
              <line x1={prevX + barW} x2={x} y1={yPos(prevBar.base + prevBar.value)} y2={yPos(prevBar.base + prevBar.value)} stroke="#e2e8f0" strokeDasharray="3 3" />
            )}
            <rect x={x} y={top} width={barW} height={h} rx={4} fill={bar.color} opacity={0.85} />
            <text x={x + barW / 2} y={top - 7} textAnchor="middle" fontSize={10} fontWeight={600} fill={bar.color}>{bar.type === "negative" ? `-${fmtM(bar.value)}` : fmtM(bar.value)}</text>
            <text x={x + barW / 2} y={chartH - 8} textAnchor="middle" fontSize={10} fill="#64748b">{bar.label}</text>
          </g>
        )
      })}
      {/* Bold GP line with dot endpoints */}
      <line x1={gpX1} x2={gpX2} y1={gpY} y2={gpY} stroke={COLORS.profit} strokeWidth={2.5} />
      <circle cx={gpX1} cy={gpY} r={3.5} fill={COLORS.profit} />
      <circle cx={gpX2} cy={gpY} r={3.5} fill={COLORS.profit} />
      <text x={(gpX1 + gpX2) / 2} y={gpY - 10} textAnchor="middle" fontSize={10} fontWeight={600} fill={COLORS.profit}>GP {fmtM(totals.grossProfit)}</text>
    </svg>
  )
}

// ─── A2: Thin bars + GP bracket/shelf ───
function WaterfallA2({ totals }: WaterfallChartProps) {
  const bars = [
    { label: "Revenue", value: totals.revenue, base: 0, color: COLORS.revenue, type: "positive" as const },
    { label: "COGS", value: totals.totalCogs, base: totals.revenue - totals.totalCogs, color: COLORS.cost, type: "negative" as const },
    { label: "OpEx", value: totals.totalOpex, base: totals.grossProfit - totals.totalOpex, color: COLORS.cost, type: "negative" as const },
    { label: "EBITDA", value: totals.ebitda, base: 0, color: COLORS.ebitda, type: "subtotal" as const },
  ]

  const chartH = 260, barW = 36, gap = 40, leftPad = 52, topPad = 16, bottomPad = 36
  const drawH = chartH - topPad - bottomPad
  const niceMax = Math.ceil(totals.revenue / 5_000_000) * 5_000_000
  const ticks = Array.from({ length: 6 }, (_, i) => (niceMax / 5) * i)
  const yPos = (v: number) => topPad + drawH - (v / niceMax) * drawH
  const totalW = leftPad + bars.length * (barW + gap) + gap

  const gpY = yPos(totals.grossProfit)
  const gpX1 = leftPad + 1 * (barW + gap) + gap / 2 + barW + 4
  const gpX2 = leftPad + 2 * (barW + gap) + gap / 2 - 4

  return (
    <svg viewBox={`0 0 ${totalW} ${chartH}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      {ticks.map(t => (
        <g key={t}>
          <line x1={leftPad} x2={totalW - 8} y1={yPos(t)} y2={yPos(t)} stroke="#f1f5f9" />
          <text x={leftPad - 6} y={yPos(t) + 3} textAnchor="end" fontSize={9} fill="#94a3b8">{fmtM(t)}</text>
        </g>
      ))}
      {bars.map((bar, i) => {
        const x = leftPad + i * (barW + gap) + gap / 2
        const top = yPos(bar.base + bar.value)
        const bot = yPos(bar.base)
        const h = Math.max(bot - top, 1)
        const prevBar = bars[i - 1]
        const prevX = leftPad + (i - 1) * (barW + gap) + gap / 2
        return (
          <g key={bar.label}>
            {i > 0 && bar.type === "negative" && (
              <line x1={prevX + barW} x2={x} y1={yPos(prevBar.base + prevBar.value)} y2={yPos(prevBar.base + prevBar.value)} stroke="#e2e8f0" strokeDasharray="3 3" />
            )}
            <rect x={x} y={top} width={barW} height={h} rx={3} fill={bar.color} opacity={0.85} />
            <text x={x + barW / 2} y={top - 7} textAnchor="middle" fontSize={9} fontWeight={600} fill={bar.color}>{bar.type === "negative" ? `-${fmtM(bar.value)}` : fmtM(bar.value)}</text>
            <text x={x + barW / 2} y={chartH - 8} textAnchor="middle" fontSize={10} fill="#64748b">{bar.label}</text>
          </g>
        )
      })}
      {/* GP bracket */}
      <line x1={gpX1} x2={gpX2} y1={gpY} y2={gpY} stroke={COLORS.profit} strokeWidth={2} strokeDasharray="6 3" />
      {/* Bracket ticks */}
      <line x1={gpX1} x2={gpX1} y1={gpY - 6} y2={gpY + 6} stroke={COLORS.profit} strokeWidth={2} />
      <line x1={gpX2} x2={gpX2} y1={gpY - 6} y2={gpY + 6} stroke={COLORS.profit} strokeWidth={2} />
      <text x={gpX2 + 8} y={gpY + 4} textAnchor="start" fontSize={9} fontWeight={600} fill={COLORS.profit}>GP {fmtM(totals.grossProfit)}</text>
    </svg>
  )
}

// ─── A3: Rounded + gradient fill ───
function WaterfallA3({ totals }: WaterfallChartProps) {
  const bars = [
    { label: "Revenue", value: totals.revenue, base: 0, color: COLORS.revenue, type: "positive" as const, id: "rev" },
    { label: "COGS", value: totals.totalCogs, base: totals.revenue - totals.totalCogs, color: COLORS.cost, type: "negative" as const, id: "cogs" },
    { label: "OpEx", value: totals.totalOpex, base: totals.grossProfit - totals.totalOpex, color: COLORS.cost, type: "negative" as const, id: "opex" },
    { label: "EBITDA", value: totals.ebitda, base: 0, color: COLORS.ebitda, type: "subtotal" as const, id: "ebitda" },
  ]

  const chartH = 260, barW = 52, gap = 32, leftPad = 52, topPad = 16, bottomPad = 36
  const drawH = chartH - topPad - bottomPad
  const niceMax = Math.ceil(totals.revenue / 5_000_000) * 5_000_000
  const ticks = Array.from({ length: 6 }, (_, i) => (niceMax / 5) * i)
  const yPos = (v: number) => topPad + drawH - (v / niceMax) * drawH
  const totalW = leftPad + bars.length * (barW + gap) + gap

  const gpY = yPos(totals.grossProfit)
  const gpX1 = leftPad + 1 * (barW + gap) + gap / 2 + barW + 4
  const gpX2 = leftPad + 2 * (barW + gap) + gap / 2 - 4

  return (
    <svg viewBox={`0 0 ${totalW} ${chartH}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        {bars.map(bar => (
          <linearGradient key={bar.id} id={`grad-${bar.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={bar.color} stopOpacity={0.6} />
            <stop offset="100%" stopColor={bar.color} stopOpacity={1} />
          </linearGradient>
        ))}
      </defs>
      {ticks.map(t => (
        <g key={t}>
          <line x1={leftPad} x2={totalW - 8} y1={yPos(t)} y2={yPos(t)} stroke="#f1f5f9" />
          <text x={leftPad - 6} y={yPos(t) + 3} textAnchor="end" fontSize={9} fill="#94a3b8">{fmtM(t)}</text>
        </g>
      ))}
      {bars.map((bar, i) => {
        const x = leftPad + i * (barW + gap) + gap / 2
        const top = yPos(bar.base + bar.value)
        const bot = yPos(bar.base)
        const h = Math.max(bot - top, 1)
        const prevBar = bars[i - 1]
        const prevX = leftPad + (i - 1) * (barW + gap) + gap / 2
        return (
          <g key={bar.label}>
            {i > 0 && bar.type === "negative" && (
              <line x1={prevX + barW} x2={x} y1={yPos(prevBar.base + prevBar.value)} y2={yPos(prevBar.base + prevBar.value)} stroke="#e2e8f0" strokeDasharray="2 2" strokeOpacity={0.6} />
            )}
            <rect x={x} y={top} width={barW} height={h} rx={6} fill={`url(#grad-${bar.id})`} />
            <text x={x + barW / 2} y={top - 7} textAnchor="middle" fontSize={9} fontWeight={600} fill={bar.color}>{bar.type === "negative" ? `-${fmtM(bar.value)}` : fmtM(bar.value)}</text>
            <text x={x + barW / 2} y={chartH - 8} textAnchor="middle" fontSize={10} fill="#64748b">{bar.label}</text>
          </g>
        )
      })}
      {/* GP annotation line */}
      <line x1={gpX1} x2={gpX2} y1={gpY} y2={gpY} stroke={COLORS.profit} strokeWidth={1.5} />
      <text x={(gpX1 + gpX2) / 2} y={gpY - 8} textAnchor="middle" fontSize={9} fontWeight={600} fill={COLORS.profit}>GP {fmtM(totals.grossProfit)}</text>
    </svg>
  )
}

// ─── A4: Minimal + arrow connectors ───
function WaterfallA4({ totals }: WaterfallChartProps) {
  const bars = [
    { label: "Revenue", value: totals.revenue, base: 0, color: COLORS.revenue, type: "positive" as const },
    { label: "COGS", value: totals.totalCogs, base: totals.revenue - totals.totalCogs, color: COLORS.cost, type: "negative" as const },
    { label: "OpEx", value: totals.totalOpex, base: totals.grossProfit - totals.totalOpex, color: COLORS.cost, type: "negative" as const },
    { label: "EBITDA", value: totals.ebitda, base: 0, color: COLORS.ebitda, type: "subtotal" as const },
  ]

  const chartH = 260, barW = 44, gap = 36, leftPad = 52, topPad = 16, bottomPad = 36
  const drawH = chartH - topPad - bottomPad
  const niceMax = Math.ceil(totals.revenue / 5_000_000) * 5_000_000
  const yPos = (v: number) => topPad + drawH - (v / niceMax) * drawH
  const totalW = leftPad + bars.length * (barW + gap) + gap

  const gpY = yPos(totals.grossProfit)

  return (
    <svg viewBox={`0 0 ${totalW} ${chartH}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      {/* No grid lines — minimal */}
      <line x1={leftPad} x2={totalW - 8} y1={yPos(0)} y2={yPos(0)} stroke="#e2e8f0" />
      {bars.map((bar, i) => {
        const x = leftPad + i * (barW + gap) + gap / 2
        const top = yPos(bar.base + bar.value)
        const bot = yPos(bar.base)
        const h = Math.max(bot - top, 1)
        const prevBar = bars[i - 1]
        const prevX = leftPad + (i - 1) * (barW + gap) + gap / 2
        // Arrow connector
        const connY = i > 0 && bar.type === "negative" ? yPos(prevBar.base + prevBar.value) : 0
        const arrowFromX = prevX + barW + 2
        const arrowToX = x - 2
        return (
          <g key={bar.label}>
            {i > 0 && bar.type === "negative" && (
              <>
                <line x1={arrowFromX} x2={arrowToX - 5} y1={connY} y2={connY} stroke="#94a3b8" strokeWidth={1} />
                <polygon points={`${arrowToX - 5},${connY - 3} ${arrowToX},${connY} ${arrowToX - 5},${connY + 3}`} fill="#94a3b8" />
              </>
            )}
            <rect x={x} y={top} width={barW} height={h} rx={3} fill={bar.color} opacity={0.9} />
            <text x={x + barW / 2} y={top - 7} textAnchor="middle" fontSize={9} fontWeight={600} fill={bar.color}>{bar.type === "negative" ? `-${fmtM(bar.value)}` : fmtM(bar.value)}</text>
            <text x={x + barW / 2} y={chartH - 8} textAnchor="middle" fontSize={10} fill="#64748b">{bar.label}</text>
          </g>
        )
      })}
      {/* GP tick mark */}
      <line x1={leftPad + 1 * (barW + gap) + gap / 2 + barW + 6} x2={leftPad + 2 * (barW + gap) + gap / 2 - 6} y1={gpY} y2={gpY} stroke={COLORS.profit} strokeWidth={1.5} strokeDasharray="4 2" />
      <text x={leftPad + 2 * (barW + gap) + gap / 2} y={gpY - 6} textAnchor="middle" fontSize={8} fontWeight={600} fill={COLORS.profit}>GP</text>
    </svg>
  )
}

// ─── Main component with variant picker ───
export function WaterfallChart({ totals }: WaterfallChartProps) {
  const [variant, setVariant] = useState<Variant>("A1")

  const variants: { key: Variant; label: string }[] = [
    { key: "A1", label: "Wide + Bold GP" },
    { key: "A2", label: "Thin + Bracket" },
    { key: "A3", label: "Rounded + Gradient" },
    { key: "A4", label: "Minimal + Arrows" },
  ]

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Variant picker */}
      <div className="mb-3 flex flex-wrap items-center gap-1">
        {variants.map((v) => (
          <button
            key={v.key}
            onClick={() => setVariant(v.key)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors border",
              variant === v.key
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 text-slate-400 hover:text-slate-600"
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      {variant === "A1" && <WaterfallA1 totals={totals} />}
      {variant === "A2" && <WaterfallA2 totals={totals} />}
      {variant === "A3" && <WaterfallA3 totals={totals} />}
      {variant === "A4" && <WaterfallA4 totals={totals} />}
    </div>
  )
}
