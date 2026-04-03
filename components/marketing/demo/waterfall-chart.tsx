"use client"

import { useState, useRef, useEffect } from "react"
import { COLORS } from "@/lib/demo-data"

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

function pct(value: number, total: number): string {
  return `${((value / total) * 100).toFixed(0)}%`
}

type ColType = "bar" | "line"

interface Col {
  label: string
  value: number
  base: number
  color: string
  type: ColType
  sign: "positive" | "negative" | "subtotal"
  tooltip: string
}

export function WaterfallChart({ totals }: WaterfallChartProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const cols: Col[] = [
    { label: "Revenue", value: totals.revenue, base: 0, color: COLORS.revenue, type: "bar", sign: "positive", tooltip: `Total Revenue: ${fmtM(totals.revenue)}` },
    { label: "COGS", value: totals.totalCogs, base: totals.revenue - totals.totalCogs, color: COLORS.cost, type: "bar", sign: "negative", tooltip: `Cost of Goods Sold: ${fmtM(totals.totalCogs)} (${pct(totals.totalCogs, totals.revenue)} of rev)` },
    { label: "GP", value: totals.grossProfit, base: 0, color: COLORS.profit, type: "line", sign: "subtotal", tooltip: `Gross Profit: ${fmtM(totals.grossProfit)} (${pct(totals.grossProfit, totals.revenue)} margin)` },
    { label: "OpEx", value: totals.totalOpex, base: totals.grossProfit - totals.totalOpex, color: COLORS.cost, type: "bar", sign: "negative", tooltip: `Operating Expenses: ${fmtM(totals.totalOpex)} (${pct(totals.totalOpex, totals.revenue)} of rev)` },
    { label: "EBITDA", value: totals.ebitda, base: 0, color: COLORS.ebitda, type: "bar", sign: "subtotal", tooltip: `EBITDA: ${fmtM(totals.ebitda)} (${pct(totals.ebitda, totals.revenue)} margin)` },
  ]

  const chartH = 260, barW = 36, gap = 32, leftPad = 52, topPad = 16, bottomPad = 36
  const drawH = chartH - topPad - bottomPad
  const niceMax = Math.ceil(totals.revenue / 5_000_000) * 5_000_000
  const ticks = Array.from({ length: 6 }, (_, i) => (niceMax / 5) * i)
  const yPos = (v: number) => topPad + drawH - (v / niceMax) * drawH
  const totalW = leftPad + cols.length * (barW + gap) + gap

  function colX(i: number) { return leftPad + i * (barW + gap) + gap / 2 }

  return (
    <div ref={ref} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <svg viewBox={`0 0 ${totalW} ${chartH}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Grid */}
        {ticks.map(t => (
          <g key={t}>
            <line x1={leftPad} x2={totalW - 8} y1={yPos(t)} y2={yPos(t)} stroke="#f1f5f9" />
            <text x={leftPad - 6} y={yPos(t) + 3} textAnchor="end" fontSize={9} fill="#94a3b8">{fmtM(t)}</text>
          </g>
        ))}

        {/* Columns */}
        {cols.map((col, i) => {
          const x = colX(i)
          const centerX = x + barW / 2
          const isHovered = hovered === i

          if (col.type === "line") {
            const lineY = yPos(col.value)
            return (
              <g
                key={col.label}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Hit area */}
                <rect x={x - 4} y={lineY - 16} width={barW + 8} height={32} fill="transparent" />
                {/* Connector from COGS */}
                <line x1={colX(i - 1) + barW} x2={x} y1={lineY} y2={lineY} stroke="#e2e8f0" strokeDasharray="3 3" />
                {/* The GP line */}
                <line x1={x} x2={x + barW} y1={lineY} y2={lineY} stroke={col.color} strokeWidth={isHovered ? 4 : 3} strokeLinecap="round" />
                {/* Connector to OpEx */}
                <line x1={x + barW} x2={colX(i + 1)} y1={lineY} y2={lineY} stroke="#e2e8f0" strokeDasharray="3 3" />
                {/* Value label */}
                <text x={centerX} y={lineY - 10} textAnchor="middle" fontSize={9} fontWeight={600} fill={col.color}>{fmtM(col.value)}</text>
                {/* X-axis label */}
                <text x={centerX} y={chartH - 8} textAnchor="middle" fontSize={10} fill="#64748b">{col.label}</text>
                {/* Tooltip */}
                {isHovered && (
                  <foreignObject x={centerX - 90} y={lineY - 46} width={180} height={30}>
                    <div style={{ background: "#1e293b", borderRadius: 6, padding: "4px 8px", color: "white", fontSize: 10, textAlign: "center", whiteSpace: "nowrap" }}>
                      {col.tooltip}
                    </div>
                  </foreignObject>
                )}
              </g>
            )
          }

          // Regular bar
          const fullTop = yPos(col.base + col.value)
          const bot = yPos(col.base)
          const fullH = Math.max(bot - fullTop, 1)

          // Animation: bars grow from base
          const barH = animated ? fullH : 0
          const barTop = animated ? fullTop : bot

          return (
            <g
              key={col.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={x}
                y={barTop}
                width={barW}
                height={barH}
                rx={3}
                fill={col.color}
                opacity={isHovered ? 1 : 0.85}
                style={{ transition: "y 0.6s cubic-bezier(0.16,1,0.3,1), height 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.2s", transitionDelay: `${i * 0.1}s` }}
              />
              {/* Value label */}
              <text
                x={centerX}
                y={fullTop - 7}
                textAnchor="middle"
                fontSize={9}
                fontWeight={600}
                fill={col.color}
                style={{ opacity: animated ? 1 : 0, transition: "opacity 0.4s", transitionDelay: `${i * 0.1 + 0.4}s` }}
              >
                {col.sign === "negative" ? `-${fmtM(col.value)}` : fmtM(col.value)}
              </text>
              {/* X-axis label */}
              <text x={centerX} y={chartH - 8} textAnchor="middle" fontSize={10} fill="#64748b">{col.label}</text>
              {/* Tooltip */}
              {isHovered && (
                <foreignObject x={centerX - 100} y={fullTop - 38} width={200} height={28}>
                  <div style={{ background: "#1e293b", borderRadius: 6, padding: "4px 8px", color: "white", fontSize: 10, textAlign: "center", whiteSpace: "nowrap" }}>
                    {col.tooltip}
                  </div>
                </foreignObject>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
