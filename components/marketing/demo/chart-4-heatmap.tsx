"use client"

import { type MonthlyPnL, COLORS } from "@/lib/demo-data"

function fmtK(n: number): string {
  return `${(n / 1_000).toFixed(0)}`
}

// Two-tone scale: low → mid (white) → high
// Revenue/GP/EBITDA: white → teal
// COGS/OpEx: white → navy (costs go darker when higher = worse)
function scaleColor(value: number, min: number, max: number, palette: "teal" | "navy"): { bg: string; text: string } {
  const t = max === min ? 0.5 : (value - min) / (max - min)

  if (palette === "teal") {
    // White → teal-500
    const r = Math.round(255 - (255 - 20) * t)
    const g = Math.round(255 - (255 - 184) * t)
    const b = Math.round(255 - (255 - 166) * t)
    return {
      bg: `rgb(${r},${g},${b})`,
      text: t > 0.55 ? "white" : "#334155",
    }
  }
  // White → navy
  const r = Math.round(255 - (255 - 30) * t)
  const g = Math.round(255 - (255 - 58) * t)
  const b = Math.round(255 - (255 - 95) * t)
  return {
    bg: `rgb(${r},${g},${b})`,
    text: t > 0.55 ? "white" : "#334155",
  }
}

const metrics: { key: keyof MonthlyPnL; label: string; palette: "teal" | "navy" }[] = [
  { key: "revenue", label: "Revenue", palette: "teal" },
  { key: "grossProfit", label: "Gross Profit", palette: "teal" },
  { key: "ebitda", label: "EBITDA", palette: "teal" },
  { key: "totalCogs", label: "COGS", palette: "navy" },
  { key: "totalOpex", label: "OpEx", palette: "navy" },
]

interface Chart4HeatmapProps {
  monthlyData: MonthlyPnL[]
}

export function Chart4Heatmap({ monthlyData }: Chart4HeatmapProps) {
  const MONTHLY_DATA = monthlyData
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="overflow-x-auto -mx-1">
        <table className="w-full border-separate" style={{ borderSpacing: "3px" }}>
          <thead>
            <tr>
              <th className="px-2 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:text-xs">$K</th>
              {MONTHLY_DATA.map((d) => (
                <th key={d.month} className="px-1 py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:text-xs min-w-[40px]">
                  {d.month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => {
              const values = MONTHLY_DATA.map(d => d[metric.key] as number)
              const min = Math.min(...values)
              const max = Math.max(...values)
              return (
                <tr key={metric.key}>
                  <td className="px-2 py-0 text-xs font-medium text-slate-600 whitespace-nowrap">{metric.label}</td>
                  {MONTHLY_DATA.map((d) => {
                    const val = d[metric.key] as number
                    const { bg, text } = scaleColor(val, min, max, metric.palette)
                    return (
                      <td key={d.month} className="px-0 py-0">
                        <div
                          className="flex items-center justify-center rounded-md text-[10px] font-medium tabular-nums sm:text-xs"
                          style={{
                            backgroundColor: bg,
                            color: text,
                            height: 32,
                            minWidth: 36,
                          }}
                        >
                          {fmtK(val)}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {/* Legend */}
      <div className="mt-3 flex items-center justify-end gap-4 text-[10px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "rgb(255,255,255)", border: "1px solid #e2e8f0" }} />
            <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "rgb(138,220,196)" }} />
            <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: COLORS.ebitda }} />
          </div>
          <span>Revenue / Profit</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "rgb(255,255,255)", border: "1px solid #e2e8f0" }} />
            <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: "rgb(143,157,175)" }} />
            <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: COLORS.revenue }} />
          </div>
          <span>Costs (darker = higher)</span>
        </div>
      </div>
    </div>
  )
}
