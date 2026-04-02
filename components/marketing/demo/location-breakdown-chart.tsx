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
import { LOCATION_DATA } from "@/lib/demo-data"

const COLORS = ["#2563eb", "#059669", "#d97706", "#7c3aed", "#dc2626", "#0891b2"]

const chartData = LOCATION_DATA.map((loc) => ({
  name: loc.name,
  shortName: loc.name.split(" ").slice(0, 2).join(" "),
  revenue: loc.revenue,
  margin: loc.margin,
})).sort((a, b) => b.revenue - a.revenue)

function fmtM(value: number): string {
  return `$${(value / 1_000_000).toFixed(1)}M`
}

function fmtTooltip(value: number): string {
  return `$${value.toLocaleString("en-US")}`
}

export function LocationBreakdownChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-baseline justify-between sm:mb-4">
        <h3 className="text-sm font-semibold text-slate-700">Revenue by Location</h3>
        <span className="text-xs text-slate-400">EBITDA margin shown on bar</span>
      </div>
      <ResponsiveContainer width="100%" height={280} className="sm:!h-[300px]">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 40, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
          <XAxis type="number" tickFormatter={fmtM} tick={{ fontSize: 10 }} />
          <YAxis
            type="category"
            dataKey="shortName"
            tick={{ fontSize: 10 }}
            width={90}
          />
          <Tooltip
            formatter={(value) => [fmtTooltip(Number(value)), "Revenue"]}
            labelFormatter={(label) => {
              const item = chartData.find((d) => d.shortName === label)
              return item?.name ?? label
            }}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
          />
          <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
