"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { ANNUAL_TOTALS } from "@/lib/demo-data"

const waterfallData = [
  {
    name: "Revenue",
    base: 0,
    value: ANNUAL_TOTALS.revenue,
    fill: "#22c55e",
  },
  {
    name: "COGS",
    base: ANNUAL_TOTALS.revenue - ANNUAL_TOTALS.totalCogs,
    value: ANNUAL_TOTALS.totalCogs,
    fill: "#ef4444",
  },
  {
    name: "Gross Profit",
    base: 0,
    value: ANNUAL_TOTALS.grossProfit,
    fill: "#3b82f6",
  },
  {
    name: "OpEx",
    base: ANNUAL_TOTALS.grossProfit - ANNUAL_TOTALS.totalOpex,
    value: ANNUAL_TOTALS.totalOpex,
    fill: "#ef4444",
  },
  {
    name: "EBITDA",
    base: 0,
    value: ANNUAL_TOTALS.ebitda,
    fill: "#3b82f6",
  },
]

function fmtM(value: number): string {
  return `$${(value / 1_000_000).toFixed(1)}M`
}

function fmtTooltip(value: number): string {
  return `$${value.toLocaleString("en-US")}`
}

export function WaterfallChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-slate-700">Revenue to EBITDA Bridge</h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={waterfallData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={fmtM} tick={{ fontSize: 11 }} />
          <Tooltip
            formatter={(value) => [fmtTooltip(Number(value)), "Amount"]}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
          />
          <Bar dataKey="base" stackId="waterfall" fill="transparent" isAnimationActive={false} />
          <Bar dataKey="value" stackId="waterfall" radius={[4, 4, 0, 0]}>
            {waterfallData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
