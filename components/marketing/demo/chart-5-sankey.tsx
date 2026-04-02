"use client"

import { COLORS } from "@/lib/demo-data"

interface SankeyProps {
  totals: {
    revenue: number
    patientServices: number
    ancillaryRevenue: number
    otherIncome: number
    providerComp: number
    nursingStaff: number
    medicalSupplies: number
    labDiagnostic: number
    pharmacy: number
    facilityCosts: number
    equipmentLease: number
    totalCogs: number
    grossProfit: number
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
    totalOpex: number
    ebitda: number
  }
}

function fmtM(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  return `$${(n / 1_000).toFixed(0)}K`
}

interface FlowNode {
  label: string
  value: number
  y: number
  h: number
  color: string
}

export function Chart5Sankey({ totals }: SankeyProps) {
  const w = 800
  const h = 520
  const colX = [30, 200, 400, 600]
  const nodeW = 12
  const usableH = h - 60
  const startY = 30

  // Revenue sources — scale to pixel height
  const scale = usableH / totals.revenue

  // Column 1: Revenue breakdown
  const revSources = [
    { label: "Patient Services", value: totals.patientServices, color: COLORS.revenue },
    { label: "Ancillary", value: totals.ancillaryRevenue, color: "#2a4a6f" },
    { label: "Other Income", value: totals.otherIncome, color: "#3b6d8f" },
  ]

  // Column 2: Revenue total
  const revTotal: FlowNode = { label: "Revenue", value: totals.revenue, y: startY, h: totals.revenue * scale, color: COLORS.revenue }

  // Column 3: COGS breakdown + Gross Profit
  const cogsItems = [
    { label: "Provider Comp", value: totals.providerComp },
    { label: "Nursing", value: totals.nursingStaff },
    { label: "Med Supplies", value: totals.medicalSupplies },
    { label: "Lab/Diagnostic", value: totals.labDiagnostic },
    { label: "Pharmacy", value: totals.pharmacy },
    { label: "Facility", value: totals.facilityCosts },
    { label: "Equip Lease", value: totals.equipmentLease },
  ]

  // Column 4: OpEx breakdown + EBITDA
  const opexItems = [
    { label: "Admin Staff", value: totals.adminStaff },
    { label: "Billing", value: totals.billingCollections },
    { label: "IT Systems", value: totals.itSystems },
    { label: "Malpractice", value: totals.malpracticeInsurance },
    { label: "Insurance", value: totals.generalInsurance },
    { label: "Marketing", value: totals.marketing },
    { label: "Utilities", value: totals.utilities },
    { label: "Depreciation", value: totals.depreciation },
    { label: "Prof Fees", value: totals.professionalFees },
  ].filter(item => item.value > 10_000) // skip tiny items

  // Layout helper
  function layoutNodes(items: { label: string; value: number }[], color: string, bottomItem?: { label: string; value: number; color: string }): FlowNode[] {
    const gap = 3
    const allItems = bottomItem ? [...items, { label: bottomItem.label, value: bottomItem.value }] : items
    const totalGap = gap * (allItems.length - 1)
    const totalValue = allItems.reduce((s, i) => s + i.value, 0)
    const availH = totalValue * scale
    const valueScale = (availH - totalGap) / totalValue

    const nodes: FlowNode[] = []
    let cy = startY
    for (const item of items) {
      const ih = item.value * valueScale
      nodes.push({ label: item.label, value: item.value, y: cy, h: ih, color })
      cy += ih + gap
    }
    if (bottomItem) {
      const ih = bottomItem.value * valueScale
      nodes.push({ label: bottomItem.label, value: bottomItem.value, y: cy, h: ih, color: bottomItem.color })
    }
    return nodes
  }

  // Rev sources
  let srcY = startY
  const srcGap = 4
  const srcTotalGap = srcGap * (revSources.length - 1)
  const srcScale = (revTotal.h - srcTotalGap) / totals.revenue
  const revSourceNodes: FlowNode[] = revSources.map((src) => {
    const ih = src.value * srcScale
    const node: FlowNode = { label: src.label, value: src.value, y: srcY, h: ih, color: src.color }
    srcY += ih + srcGap
    return node
  })

  // COGS + GP
  const col3Nodes = layoutNodes(cogsItems, COLORS.cost, { label: "Gross Profit", value: totals.grossProfit, color: COLORS.profit })
  const gpNode = col3Nodes[col3Nodes.length - 1]

  // OpEx + EBITDA — scale relative to GP
  const gpScale = gpNode.h / totals.grossProfit
  const opexGap = 2
  const opexTotalGap = opexGap * opexItems.length
  const opexValueScale = (gpNode.h - opexTotalGap) / (totals.totalOpex + totals.ebitda)
  const col4Nodes: FlowNode[] = []
  let opexY = gpNode.y
  for (const item of opexItems) {
    const ih = item.value * opexValueScale
    col4Nodes.push({ label: item.label, value: item.value, y: opexY, h: ih, color: COLORS.cost })
    opexY += ih + opexGap
  }
  col4Nodes.push({ label: "EBITDA", value: totals.ebitda, y: opexY, h: totals.ebitda * opexValueScale, color: COLORS.ebitda })

  // Flow path
  function flow(x1: number, y1: number, h1: number, x2: number, y2: number, h2: number, color: string, opacity = 0.12) {
    const cx = (x1 + x2) / 2
    return (
      <path
        d={`M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2} L${x2},${y2 + h2} C${cx},${y2 + h2} ${cx},${y1 + h1} ${x1},${y1 + h1} Z`}
        fill={color}
        opacity={opacity}
      />
    )
  }

  function nodeLabel(x: number, node: FlowNode, align: "left" | "right") {
    const textX = align === "right" ? x + nodeW + 5 : x - 5
    const anchor = align === "right" ? "start" : "end"
    const showLabel = node.h > 14

    return showLabel ? (
      <g>
        <text x={textX} y={node.y + node.h / 2 - 5} textAnchor={anchor} fontSize={8} fontWeight={600} fill="#334155" dominantBaseline="middle">
          {node.label}
        </text>
        <text x={textX} y={node.y + node.h / 2 + 5} textAnchor={anchor} fontSize={7} fill="#94a3b8" dominantBaseline="middle">
          {fmtM(node.value)}
        </text>
      </g>
    ) : null
  }

  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">#5 — Full P&L Revenue Flow</h3>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full min-w-[600px]" preserveAspectRatio="xMidYMid meet">
          {/* Flows: Sources → Revenue */}
          {revSourceNodes.map((src, i) => {
            const targetY = revTotal.y + (revSourceNodes.slice(0, i).reduce((s, n) => s + n.h, 0))
            return flow(colX[0] + nodeW, src.y, src.h, colX[1], targetY, src.h, src.color, 0.1)
          })}

          {/* Flows: Revenue → COGS items */}
          {(() => {
            let cumY = revTotal.y
            return col3Nodes.map((node, i) => {
              const srcH = (node.value / totals.revenue) * revTotal.h
              const f = flow(colX[1] + nodeW, cumY, srcH, colX[2], node.y, node.h, node.color, 0.1)
              cumY += srcH
              return <g key={i}>{f}</g>
            })
          })()}

          {/* Flows: GP → OpEx items + EBITDA */}
          {col4Nodes.map((node, i) => {
            const srcFrac = node.value / (totals.totalOpex + totals.ebitda)
            const srcH = gpNode.h * srcFrac
            const srcY = gpNode.y + col4Nodes.slice(0, i).reduce((s, n) => s + (n.value / (totals.totalOpex + totals.ebitda)) * gpNode.h, 0)
            return <g key={i}>{flow(colX[2] + nodeW, srcY, srcH, colX[3], node.y, node.h, node.color, 0.1)}</g>
          })}

          {/* Source nodes */}
          {revSourceNodes.map((node, i) => (
            <g key={i}>
              <rect x={colX[0]} y={node.y} width={nodeW} height={node.h} rx={3} fill={node.color} />
              {nodeLabel(colX[0], node, "left")}
            </g>
          ))}

          {/* Revenue node */}
          <rect x={colX[1]} y={revTotal.y} width={nodeW} height={revTotal.h} rx={3} fill={revTotal.color} />
          <text x={colX[1] + nodeW / 2} y={revTotal.y - 8} textAnchor="middle" fontSize={9} fontWeight={700} fill={COLORS.revenue}>Revenue {fmtM(totals.revenue)}</text>

          {/* COGS + GP nodes */}
          {col3Nodes.map((node, i) => (
            <g key={i}>
              <rect x={colX[2]} y={node.y} width={nodeW} height={node.h} rx={3} fill={node.color} />
              {nodeLabel(colX[2], node, "right")}
            </g>
          ))}

          {/* OpEx + EBITDA nodes */}
          {col4Nodes.map((node, i) => (
            <g key={i}>
              <rect x={colX[3]} y={node.y} width={nodeW} height={node.h} rx={3} fill={node.color} />
              {nodeLabel(colX[3], node, "right")}
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
