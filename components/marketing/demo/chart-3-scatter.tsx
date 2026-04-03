"use client"

import { useState } from "react"
import { LOCATION_DATA, COLORS } from "@/lib/demo-data"

function fmtM(n: number): string {
  return `$${(n / 1_000_000).toFixed(1)}M`
}

const TYPE_COLORS: Record<string, string> = {
  "Primary Care": COLORS.revenue,
  "Specialty": COLORS.ebitda,
  "Urgent Care": COLORS.cost,
  "Ancillary": COLORS.neutral,
}

const LABEL_OFFSETS: Record<string, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
  "Downtown Primary Care": { dx: 0, dy: -20, anchor: "middle" },
  "Southpark Orthopedics": { dx: -16, dy: 24, anchor: "end" },
  "Lakewood Specialty Clinic": { dx: -16, dy: -18, anchor: "end" },
  "Westside Urgent Care": { dx: 16, dy: -18, anchor: "start" },
  "Riverside Imaging Center": { dx: 16, dy: 4, anchor: "start" },
  "Northgate Family Medicine": { dx: 16, dy: -18, anchor: "start" },
}

export function Chart3Scatter() {
  const [hovered, setHovered] = useState<string | null>(null)
  const w = 500
  const h = 380
  const pad = { top: 40, right: 30, bottom: 50, left: 55 }
  const plotW = w - pad.left - pad.right
  const plotH = h - pad.top - pad.bottom

  const revenues = LOCATION_DATA.map(l => l.revenue / 1_000_000)
  const minRev = Math.floor(Math.min(...revenues) - 0.5)
  const maxRev = Math.ceil(Math.max(...revenues) + 0.5)
  const minMargin = 4
  const maxMargin = 20

  const xScale = (v: number) => pad.left + ((v - minRev) / (maxRev - minRev)) * plotW
  const yScale = (v: number) => pad.top + plotH - ((v - minMargin) / (maxMargin - minMargin)) * plotH

  const midRev = (minRev + maxRev) / 2
  const midMargin = (minMargin + maxMargin) / 2

  const types = [...new Set(LOCATION_DATA.map(l => l.type))]

  return (
    <div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="xMidYMid meet">
          {/* Quadrant backgrounds */}
          <rect x={xScale(midRev)} y={pad.top} width={plotW / 2} height={plotH / 2} fill="#f0fdfa" rx={4} opacity={0.3} />
          <rect x={pad.left} y={pad.top + plotH / 2} width={plotW / 2} height={plotH / 2} fill="#fef2f2" rx={4} opacity={0.2} />

          {/* Quadrant labels */}
          <text x={xScale(midRev) + plotW / 4} y={pad.top + 14} textAnchor="middle" fontSize={9} fontWeight={600} fill="#0d9488" opacity={0.4}>
            Stars
          </text>
          <text x={pad.left + plotW / 4} y={pad.top + plotH - 6} textAnchor="middle" fontSize={9} fontWeight={600} fill="#be123c" opacity={0.35}>
            Watch List
          </text>

          {/* Grid lines */}
          {[8, 12, 16].map(v => (
            <line key={`y-${v}`} x1={pad.left} x2={pad.left + plotW} y1={yScale(v)} y2={yScale(v)} stroke="#f1f5f9" />
          ))}
          {Array.from({ length: Math.ceil(maxRev - minRev) + 1 }, (_, i) => minRev + i).filter(v => v % 2 === 0).map(v => (
            <line key={`x-${v}`} x1={xScale(v)} x2={xScale(v)} y1={pad.top} y2={pad.top + plotH} stroke="#f1f5f9" />
          ))}

          {/* Midpoint lines */}
          <line x1={xScale(midRev)} x2={xScale(midRev)} y1={pad.top} y2={pad.top + plotH} stroke="#e2e8f0" strokeDasharray="6 3" />
          <line x1={pad.left} x2={pad.left + plotW} y1={yScale(midMargin)} y2={yScale(midMargin)} stroke="#e2e8f0" strokeDasharray="6 3" />

          {/* Axes */}
          <line x1={pad.left} x2={pad.left + plotW} y1={pad.top + plotH} y2={pad.top + plotH} stroke="#cbd5e1" />
          <line x1={pad.left} x2={pad.left} y1={pad.top} y2={pad.top + plotH} stroke="#cbd5e1" />

          {/* X-axis ticks */}
          {Array.from({ length: Math.ceil(maxRev - minRev) + 1 }, (_, i) => minRev + i).filter(v => v % 2 === 0).map(v => (
            <text key={`xt-${v}`} x={xScale(v)} y={pad.top + plotH + 16} textAnchor="middle" fontSize={9} fill="#94a3b8">
              ${v}M
            </text>
          ))}
          <text x={pad.left + plotW / 2} y={h - 8} textAnchor="middle" fontSize={9} fill="#94a3b8">Revenue</text>

          {/* Y-axis ticks */}
          {[minMargin, 8, 12, 16, maxMargin].map(v => (
            <text key={`yt-${v}`} x={pad.left - 6} y={yScale(v) + 3} textAnchor="end" fontSize={9} fill="#94a3b8">
              {v}%
            </text>
          ))}
          <text x={14} y={pad.top + plotH / 2} textAnchor="middle" fontSize={9} fill="#94a3b8" transform={`rotate(-90, 14, ${pad.top + plotH / 2})`}>
            EBITDA Margin
          </text>

          {/* Bubbles */}
          {LOCATION_DATA.map((loc) => {
            const cx = xScale(loc.revenue / 1_000_000)
            const cy = yScale(loc.margin)
            const r = 12 + loc.headcount * 0.4
            const color = TYPE_COLORS[loc.type] || COLORS.neutral
            const offset = LABEL_OFFSETS[loc.name] || { dx: 0, dy: -20, anchor: "middle" }
            const isUnderperformer = loc.margin < 10
            const shortName = loc.name.split(" ").slice(0, 2).join(" ")
            const isHovered = hovered === loc.name

            return (
              <g
                key={loc.name}
                onMouseEnter={() => setHovered(loc.name)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Bubble */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? r + 2 : r}
                  fill={color}
                  fillOpacity={isHovered ? 0.35 : 0.2}
                  stroke={color}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                />
                {/* Label */}
                <text
                  x={cx + offset.dx}
                  y={cy + offset.dy}
                  textAnchor={offset.anchor}
                  fontSize={9}
                  fontWeight={600}
                  fill={isUnderperformer ? "#be123c" : "#475569"}
                >
                  {shortName}
                </text>
                {/* Tooltip */}
                {isHovered && (
                  <foreignObject x={cx - 80} y={cy - r - 56} width={160} height={48}>
                    <div style={{ background: "#1e293b", borderRadius: 6, padding: "4px 8px", color: "white", fontSize: 10, textAlign: "center", lineHeight: 1.4 }}>
                      <div style={{ fontWeight: 600 }}>{loc.name}</div>
                      <div>{fmtM(loc.revenue)} · {loc.margin}% margin · {loc.headcount} staff</div>
                    </div>
                  </foreignObject>
                )}
              </g>
            )
          })}
        </svg>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-3">
          {types.map((type) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: TYPE_COLORS[type] }} />
              <span className="text-xs text-slate-500">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
