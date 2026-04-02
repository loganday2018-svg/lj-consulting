"use client"

import { COLORS } from "@/lib/demo-data"

interface SankeyProps {
  totals: {
    revenue: number
    totalCogs: number
    grossProfit: number
    totalOpex: number
    ebitda: number
  }
}

function fmtM(n: number): string {
  return `$${(n / 1_000_000).toFixed(1)}M`
}

export function Chart5Sankey({ totals }: SankeyProps) {
  const w = 600
  const h = 280
  const nodeW = 14
  const pad = 40

  // Left node: Revenue (full height)
  const revH = h - 2 * pad
  const revY = pad

  // Middle nodes: COGS + Gross Profit
  const cogsRatio = totals.totalCogs / totals.revenue
  const gpRatio = totals.grossProfit / totals.revenue
  const midX = w / 2 - nodeW / 2
  const cogsH = revH * cogsRatio
  const gpH = revH * gpRatio
  const cogsY = pad
  const gpY = pad + cogsH + 8

  // Right nodes: OpEx + EBITDA
  const opexRatio = totals.totalOpex / totals.grossProfit
  const ebitdaRatio = totals.ebitda / totals.grossProfit
  const rightX = w - pad - nodeW
  const opexH = gpH * opexRatio
  const ebitdaH = gpH * ebitdaRatio
  const opexY = gpY
  const ebitdaY = gpY + opexH + 8

  // Flow paths
  function flowPath(x1: number, y1: number, h1: number, x2: number, y2: number, h2: number): string {
    const cx = (x1 + x2) / 2
    return `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2} L${x2},${y2 + h2} C${cx},${y2 + h2} ${cx},${y1 + h1} ${x1},${y1 + h1} Z`
  }

  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">#5 — Revenue Flow (Sankey-style)</h3>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="xMidYMid meet">
          {/* Revenue → COGS flow */}
          <path
            d={flowPath(pad + nodeW, revY, cogsH, midX, cogsY, cogsH)}
            fill={COLORS.cost}
            opacity={0.15}
          />
          {/* Revenue → GP flow */}
          <path
            d={flowPath(pad + nodeW, revY + cogsH, gpH, midX, gpY, gpH)}
            fill={COLORS.profit}
            opacity={0.15}
          />
          {/* GP → OpEx flow */}
          <path
            d={flowPath(midX + nodeW, gpY, opexH, rightX, opexY, opexH)}
            fill={COLORS.cost}
            opacity={0.15}
          />
          {/* GP → EBITDA flow */}
          <path
            d={flowPath(midX + nodeW, gpY + opexH, ebitdaH, rightX, ebitdaY, ebitdaH)}
            fill={COLORS.ebitda}
            opacity={0.2}
          />

          {/* Revenue node */}
          <rect x={pad} y={revY} width={nodeW} height={revH} rx={4} fill={COLORS.revenue} />
          <text x={pad - 4} y={revY + revH / 2} textAnchor="end" fontSize={11} fontWeight={600} fill={COLORS.revenue} dominantBaseline="middle">Revenue</text>
          <text x={pad - 4} y={revY + revH / 2 + 14} textAnchor="end" fontSize={10} fill="#64748b" dominantBaseline="middle">{fmtM(totals.revenue)}</text>

          {/* COGS node */}
          <rect x={midX} y={cogsY} width={nodeW} height={cogsH} rx={4} fill={COLORS.cost} />
          <text x={midX + nodeW + 6} y={cogsY + cogsH / 2 - 6} fontSize={10} fontWeight={600} fill={COLORS.cost} dominantBaseline="middle">COGS</text>
          <text x={midX + nodeW + 6} y={cogsY + cogsH / 2 + 8} fontSize={9} fill="#64748b" dominantBaseline="middle">{fmtM(totals.totalCogs)}</text>

          {/* GP node */}
          <rect x={midX} y={gpY} width={nodeW} height={gpH} rx={4} fill={COLORS.profit} />
          <text x={midX + nodeW + 6} y={gpY + gpH / 2 - 6} fontSize={10} fontWeight={600} fill={COLORS.profit} dominantBaseline="middle">Gross Profit</text>
          <text x={midX + nodeW + 6} y={gpY + gpH / 2 + 8} fontSize={9} fill="#64748b" dominantBaseline="middle">{fmtM(totals.grossProfit)}</text>

          {/* OpEx node */}
          <rect x={rightX} y={opexY} width={nodeW} height={opexH} rx={4} fill={COLORS.cost} />
          <text x={rightX + nodeW + 6} y={opexY + opexH / 2 - 6} fontSize={10} fontWeight={600} fill={COLORS.cost} dominantBaseline="middle">OpEx</text>
          <text x={rightX + nodeW + 6} y={opexY + opexH / 2 + 8} fontSize={9} fill="#64748b" dominantBaseline="middle">{fmtM(totals.totalOpex)}</text>

          {/* EBITDA node */}
          <rect x={rightX} y={ebitdaY} width={nodeW} height={ebitdaH} rx={4} fill={COLORS.ebitda} />
          <text x={rightX + nodeW + 6} y={ebitdaY + ebitdaH / 2 - 6} fontSize={10} fontWeight={600} fill={COLORS.ebitda} dominantBaseline="middle">EBITDA</text>
          <text x={rightX + nodeW + 6} y={ebitdaY + ebitdaH / 2 + 8} fontSize={9} fill="#64748b" dominantBaseline="middle">{fmtM(totals.ebitda)}</text>
        </svg>
      </div>
    </div>
  )
}
