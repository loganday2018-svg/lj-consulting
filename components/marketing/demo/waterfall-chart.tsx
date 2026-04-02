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
  Legend,
} from "recharts"
import { ANNUAL_TOTALS } from "@/lib/demo-data"

const waterfallData = [
  {
    name: "Revenue",
    shortName: "Rev",
    base: 0,
    value: ANNUAL_TOTALS.revenue,
    fill: "#22c55e",
    label: "Revenue",
  },
  {
    name: "COGS",
    shortName: "COGS",
    base: ANNUAL_TOTALS.revenue - ANNUAL_TOTALS.totalCogs,
    value: ANNUAL_TOTALS.totalCogs,
    fill: "#ef4444",
    label: "Cost",
  },
  {
    name: "Gross Profit",
    shortName: "GP",
    base: 0,
    value: ANNUAL_TOTALS.grossProfit,
    fill: "#3b82f6",
    label: "Subtotal",
  },
  {
    name: "OpEx",
    shortName: "OpEx",
    base: ANNUAL_TOTALS.grossProfit - ANNUAL_TOTALS.totalOpex,
    value: ANNUAL_TOTALS.totalOpex,
    fill: "#ef4444",
    label: "Cost",
  },
  {
    name: "EBITDA",
    shortName: "EBITDA",
    base: 0,
    value: ANNUAL_TOTALS.ebitda,
    fill: "#3b82f6",
    label: "Total",
  },
]

function fmtM(value: number): string {
  return `$${(value / 1_000_000).toFixed(1)}M`
}

function fmtTooltip(value: number): string {
  return `$${value.toLocaleString("en-US")}`
}

const legendPayload = [
  { value: "Revenue", type: "rect" as const, color: "#22c55e" },
  { value: "Cost", type: "rect" as const, color: "#ef4444" },
  { value: "Subtotal / Total", type: "rect" as const, color: "#3b82f6" },
]

export function WaterfallChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-700 sm:mb-4">Revenue to EBITDA Bridge</h3>
      <ResponsiveContainer width="100%" height={260} className="sm:!h-[320px]">
        <BarChart data={waterfallData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="shortName"
            tick={{ fontSize: 11 }}
            interval={0}
          />
          <YAxis tickFormatter={fmtM} tick={{ fontSize: 10 }} width={50} />
          <Tooltip
            formatter={(value) => [fmtTooltip(Number(value)), "Amount"]}
            labelFormatter={(label) => {
              const item = waterfallData.find((d) => d.shortName === label)
              return item?.name ?? label
            }}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
          />
          {/* @ts-expect-error recharts Legend payload typing mismatch */}
          <Legend payload={legendPayload} wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="base" stackId="waterfall" fill="transparent" isAnimationActive={false} legendType="none" />
          <Bar dataKey="value" stackId="waterfall" radius={[4, 4, 0, 0]} legendType="none">
            {waterfallData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
