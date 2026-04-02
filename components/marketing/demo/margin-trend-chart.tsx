"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts"
import { type MonthlyPnL, COLORS } from "@/lib/demo-data"

interface MarginTrendChartProps {
  data: MonthlyPnL[]
}

export function MarginTrendChart({ data }: MarginTrendChartProps) {
  const chartData = data.map((d) => ({
    month: d.month,
    "Gross Margin": Number(((d.grossProfit / d.revenue) * 100).toFixed(1)),
    "EBITDA Margin": Number(((d.ebitda / d.revenue) * 100).toFixed(1)),
  }))

  const avgGross = chartData.reduce((acc, d) => acc + d["Gross Margin"], 0) / chartData.length
  const avgEbitda = chartData.reduce((acc, d) => acc + d["EBITDA Margin"], 0) / chartData.length

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 sm:mb-4">
        <h3 className="text-sm font-semibold text-slate-700">Margin Trend</h3>
        <p className="mt-0.5 text-xs text-slate-400">
          Avg gross {avgGross.toFixed(1)}% &middot; Avg EBITDA {avgEbitda.toFixed(1)}%
        </p>
      </div>
      <ResponsiveContainer width="100%" height={260} className="sm:!h-[320px]">
        <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
          <YAxis
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 10 }}
            width={40}
            domain={[0, "auto"]}
          />
          <Tooltip
            formatter={(value) => [`${value}%`]}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <ReferenceLine y={avgGross} stroke={COLORS.revenue} strokeDasharray="6 4" strokeOpacity={0.25} />
          <ReferenceLine y={avgEbitda} stroke={COLORS.ebitda} strokeDasharray="6 4" strokeOpacity={0.25} />
          <Line
            type="monotone"
            dataKey="Gross Margin"
            stroke={COLORS.revenue}
            strokeWidth={2}
            dot={{ r: 3, fill: COLORS.revenue }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="EBITDA Margin"
            stroke={COLORS.ebitda}
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={{ r: 3, fill: COLORS.ebitda }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
