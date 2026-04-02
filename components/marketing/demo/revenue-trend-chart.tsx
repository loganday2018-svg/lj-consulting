"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { MONTHLY_DATA } from "@/lib/demo-data"

const chartData = MONTHLY_DATA.map((d) => ({
  month: d.month,
  Revenue: d.revenue,
  EBITDA: d.ebitda,
}))

function fmtM(value: number): string {
  return `$${(value / 1_000_000).toFixed(1)}M`
}

function fmtTooltip(value: number): string {
  return `$${value.toLocaleString("en-US")}`
}

export function RevenueTrendChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-700 sm:mb-4">Monthly Revenue & EBITDA</h3>
      <ResponsiveContainer width="100%" height={260} className="sm:!h-[320px]">
        <AreaChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1e293b" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#1e293b" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="ebitdaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
          <YAxis tickFormatter={fmtM} tick={{ fontSize: 10 }} width={50} />
          <Tooltip
            formatter={(value) => [fmtTooltip(Number(value))]}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Area
            type="monotone"
            dataKey="Revenue"
            stroke="#1e293b"
            strokeWidth={2}
            fill="url(#revenueGradient)"
            dot={{ r: 2, fill: "#1e293b" }}
            activeDot={{ r: 4 }}
          />
          <Area
            type="monotone"
            dataKey="EBITDA"
            stroke="#22c55e"
            strokeWidth={2}
            fill="url(#ebitdaGradient)"
            dot={{ r: 2, fill: "#22c55e" }}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
