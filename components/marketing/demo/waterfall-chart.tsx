"use client"

import { useState, useRef, useEffect } from "react"
import { COLORS } from "@/lib/demo-data"

interface WaterfallChartProps {
  totals: {
    revenue: number
    patientServices: number
    ancillaryRevenue: number
    otherIncome: number
    totalCogs: number
    grossProfit: number
    totalOpex: number
    ebitda: number
    providerComp: number
    nursingStaff: number
    medicalSupplies: number
    labDiagnostic: number
    pharmacy: number
    facilityCosts: number
    equipmentLease: number
    adminStaff: number
    billingCollections: number
    itSystems: number
    malpracticeInsurance: number
    generalInsurance: number
    marketing: number
    utilities: number
    depreciation: number
    professionalFees: number
    officeSupplies: number
    staffTraining: number
  }
}

function fmtM(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  return `$${(value / 1_000).toFixed(0)}K`
}

function pct(value: number, total: number): string {
  return `${((value / total) * 100).toFixed(0)}%`
}

interface SubItem {
  label: string
  value: number
  color: string
}

// Navy gradient for COGS slices, slate gradient for OpEx
const REV_COLORS = ["#0c2340", "#1e3a5f", "#2a5580"]
const COGS_COLORS = ["#7f1d1d", "#991b1b", "#b91c1c", "#dc2626", "#ef4444", "#f87171", "#fca5a5"]
const OPEX_COLORS = ["#64748b", "#78859b", "#8b97ab", "#9eaabb", "#b1bccb", "#c4cedb", "#d7e0eb", "#e2e8f0", "#eef2f7", "#f5f7fa", "#fafbfc"]

function getRevenueItems(totals: WaterfallChartProps["totals"]): SubItem[] {
  return [
    { label: "Patient Services", value: totals.patientServices, color: REV_COLORS[0] },
    { label: "Ancillary Revenue", value: totals.ancillaryRevenue, color: REV_COLORS[1] },
    { label: "Other Income", value: totals.otherIncome, color: REV_COLORS[2] },
  ].sort((a, b) => b.value - a.value)
}

function getCogsItems(totals: WaterfallChartProps["totals"]): SubItem[] {
  return [
    { label: "Provider Comp", value: totals.providerComp, color: COGS_COLORS[0] },
    { label: "Nursing Staff", value: totals.nursingStaff, color: COGS_COLORS[1] },
    { label: "Medical Supplies", value: totals.medicalSupplies, color: COGS_COLORS[2] },
    { label: "Lab & Diagnostic", value: totals.labDiagnostic, color: COGS_COLORS[3] },
    { label: "Facility Costs", value: totals.facilityCosts, color: COGS_COLORS[4] },
    { label: "Equipment Lease", value: totals.equipmentLease, color: COGS_COLORS[5] },
    { label: "Pharmacy", value: totals.pharmacy, color: COGS_COLORS[6] },
  ].sort((a, b) => b.value - a.value)
}

function getOpexItems(totals: WaterfallChartProps["totals"]): SubItem[] {
  return [
    { label: "Admin Staff", value: totals.adminStaff, color: OPEX_COLORS[0] },
    { label: "Billing", value: totals.billingCollections, color: OPEX_COLORS[1] },
    { label: "IT Systems", value: totals.itSystems, color: OPEX_COLORS[2] },
    { label: "Malpractice Ins.", value: totals.malpracticeInsurance, color: OPEX_COLORS[3] },
    { label: "Marketing", value: totals.marketing, color: OPEX_COLORS[4] },
    { label: "Insurance", value: totals.generalInsurance, color: OPEX_COLORS[5] },
    { label: "Utilities", value: totals.utilities, color: OPEX_COLORS[6] },
    { label: "Depreciation", value: totals.depreciation, color: OPEX_COLORS[7] },
    { label: "Prof Fees", value: totals.professionalFees, color: OPEX_COLORS[8] },
    { label: "Office Supplies", value: totals.officeSupplies, color: OPEX_COLORS[9] },
    { label: "Staff Training", value: totals.staffTraining, color: OPEX_COLORS[10] },
  ].filter(i => i.value > 0).sort((a, b) => b.value - a.value)
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
  subItems?: SubItem[]
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
    { label: "Revenue", value: totals.revenue, base: 0, color: COLORS.revenue, type: "bar", sign: "positive", tooltip: `Total Revenue: ${fmtM(totals.revenue)}`, subItems: getRevenueItems(totals) },
    { label: "COGS", value: totals.totalCogs, base: totals.revenue - totals.totalCogs, color: COLORS.cost, type: "bar", sign: "negative", tooltip: `Cost of Goods Sold: ${fmtM(totals.totalCogs)} (${pct(totals.totalCogs, totals.revenue)} of rev)`, subItems: getCogsItems(totals) },
    { label: "GP", value: totals.grossProfit, base: 0, color: COLORS.profit, type: "line", sign: "subtotal", tooltip: `Gross Profit: ${fmtM(totals.grossProfit)} (${pct(totals.grossProfit, totals.revenue)} margin)` },
    { label: "OpEx", value: totals.totalOpex, base: totals.grossProfit - totals.totalOpex, color: COLORS.cost, type: "bar", sign: "negative", tooltip: `Operating Expenses: ${fmtM(totals.totalOpex)} (${pct(totals.totalOpex, totals.revenue)} of rev)`, subItems: getOpexItems(totals) },
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
                <rect x={x - 4} y={lineY - 16} width={barW + 8} height={32} fill="transparent" />
                <line x1={colX(i - 1) + barW} x2={x} y1={lineY} y2={lineY} stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1={x} x2={x + barW} y1={lineY} y2={lineY} stroke={col.color} strokeWidth={isHovered ? 4 : 3} strokeLinecap="round" />
                <line x1={x + barW} x2={colX(i + 1)} y1={lineY} y2={lineY} stroke="#e2e8f0" strokeDasharray="3 3" />
                <text x={centerX} y={lineY - 10} textAnchor="middle" fontSize={9} fontWeight={600} fill={col.color}>{fmtM(col.value)}</text>
                <text x={centerX} y={chartH - 8} textAnchor="middle" fontSize={10} fill="#64748b">{col.label}</text>
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

          // Animation
          const barH = animated ? fullH : 0
          const barTop = animated ? fullTop : bot

          // Sub-item slices when hovered
          const showSlices = isHovered && col.subItems && col.subItems.length > 0

          return (
            <g
              key={col.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Connector to next column */}
              {i < cols.length - 1 && cols[i + 1].type !== "line" && (() => {
                const connY = col.sign === "negative" ? yPos(col.base) : fullTop
                return <line x1={x + barW} x2={colX(i + 1)} y1={connY} y2={connY} stroke="#e2e8f0" strokeDasharray="3 3" />
              })()}

              {/* Solid bar (hidden when showing slices) */}
              {!showSlices && (
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
              )}

              {/* Sub-item slices on hover */}
              {showSlices && (() => {
                let runningY = bot
                return col.subItems!.map((sub, si) => {
                  const sliceH = (sub.value / col.value) * fullH
                  runningY -= sliceH
                  const isFirst = si === 0
                  const isLast = si === col.subItems!.length - 1
                  return (
                    <g key={sub.label}>
                      <rect
                        x={x}
                        y={runningY}
                        width={barW}
                        height={sliceH}
                        rx={isFirst || isLast ? 3 : 0}
                        fill={sub.color}
                      />
                      {/* Slice separator line */}
                      {!isLast && (
                        <line x1={x} x2={x + barW} y1={runningY + sliceH} y2={runningY + sliceH} stroke="white" strokeWidth={0.5} />
                      )}
                    </g>
                  )
                })
              })()}

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

              {/* Tooltip — show sub-item breakdown on hover for COGS/OpEx */}
              {isHovered && col.subItems && (
                <foreignObject x={x + barW + 8} y={fullTop} width={160} height={col.subItems.length * 16 + 12}>
                  <div style={{ background: "#1e293b", borderRadius: 6, padding: "6px 8px", color: "white", fontSize: 10, lineHeight: 1.5 }}>
                    {col.subItems.map(sub => (
                      <div key={sub.label} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ width: 6, height: 6, borderRadius: 2, backgroundColor: sub.color, flexShrink: 0 }} />
                          {sub.label}
                        </span>
                        <span style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{fmtM(sub.value)}</span>
                      </div>
                    ))}
                  </div>
                </foreignObject>
              )}

              {/* Simple tooltip for non-drilldown bars */}
              {isHovered && !col.subItems && (
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
