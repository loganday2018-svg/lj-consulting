"use client"

import { useState } from "react"
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
import { type MonthlyPnL, COLORS } from "@/lib/demo-data"
import { cn } from "@/lib/utils"

type Metric = "both" | "revenue" | "ebitda"

interface RevenueTrendChartProps {
  data: MonthlyPnL[]
}

function fmtM(value: number): string {
  return `$${(value / 1_000_000).toFixed(1)}M`
}

function fmtTooltip(value: number): string {
  return `$${value.toLocaleString("en-US")}`
}

const metrics: { key: Metric; label: string }[] = [
  { key: "both", label: "Both" },
  { key: "revenue", label: "Revenue" },
  { key: "ebitda", label: "EBITDA" },
]

export function RevenueTrendChart({ data }: RevenueTrendChartProps) {
  const [metric, setMetric] = useState<Metric>("both")

  const chartData = data.map((d) => ({
    month: d.month,
    Revenue: d.revenue,
    EBITDA: d.ebitda,
  }))

  const showRevenue = metric === "both" || metric === "revenue"
  const showEbitda = metric === "both" || metric === "ebitda"

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 sm:mb-4">
        <h3 className="text-sm font-semibold text-slate-700">Monthly Trend</h3>
        <div className="flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5">
          {metrics.map((m) => (
            <button
              key={m.key}
              onClick={() => setMetric(m.key)}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium transition-colors",
                metric === m.key
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260} className="sm:!h-[320px]">
        <AreaChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.revenue} stopOpacity={0.12} />
              <stop offset="95%" stopColor={COLORS.revenue} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="ebitdaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.ebitda} stopOpacity={0.08} />
              <stop offset="95%" stopColor={COLORS.ebitda} stopOpacity={0} />
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
          {showRevenue && (
            <Area
              type="monotone"
              dataKey="Revenue"
              stroke={COLORS.revenue}
              strokeWidth={2}
              fill="url(#revenueGradient)"
              dot={{ r: 2, fill: COLORS.revenue }}
              activeDot={{ r: 4 }}
            />
          )}
          {showEbitda && (
            <Area
              type="monotone"
              dataKey="EBITDA"
              stroke={COLORS.ebitda}
              strokeWidth={2}
              strokeDasharray="6 3"
              fill="url(#ebitdaGradient)"
              dot={{ r: 2, fill: COLORS.ebitda }}
              activeDot={{ r: 4 }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
