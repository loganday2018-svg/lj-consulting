"use client"

import { MONTHLY_DATA, COLORS } from "@/lib/demo-data"

function fmtK(n: number): string {
  return `${(n / 1_000).toFixed(0)}`
}

// Color interpolation: low (light) to high (dark navy/teal)
function heatColor(value: number, min: number, max: number): string {
  const t = max === min ? 0.5 : (value - min) / (max - min)
  // Interpolate from light (#e0f2fe) to deep navy
  const r = Math.round(224 + (30 - 224) * t)
  const g = Math.round(242 + (58 - 242) * t)
  const b = Math.round(254 + (95 - 254) * t)
  return `rgb(${r},${g},${b})`
}

const metrics: { key: keyof typeof MONTHLY_DATA[0]; label: string }[] = [
  { key: "revenue", label: "Revenue" },
  { key: "grossProfit", label: "Gross Profit" },
  { key: "ebitda", label: "EBITDA" },
  { key: "totalCogs", label: "COGS" },
  { key: "totalOpex", label: "OpEx" },
]

export function Chart4Heatmap() {
  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">#4 — Monthly Heatmap Grid</h3>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="px-2 py-1.5 text-left text-slate-500 font-medium">$K</th>
              {MONTHLY_DATA.map((d) => (
                <th key={d.month} className="px-2 py-1.5 text-center text-slate-500 font-medium">{d.month}</th>
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
                  <td className="px-2 py-1.5 text-slate-700 font-medium whitespace-nowrap">{metric.label}</td>
                  {MONTHLY_DATA.map((d) => {
                    const val = d[metric.key] as number
                    const bg = heatColor(val, min, max)
                    const textColor = (val - min) / (max - min || 1) > 0.6 ? "white" : COLORS.revenue
                    return (
                      <td
                        key={d.month}
                        className="px-2 py-1.5 text-center tabular-nums rounded-sm"
                        style={{ backgroundColor: bg, color: textColor }}
                      >
                        {fmtK(val)}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
