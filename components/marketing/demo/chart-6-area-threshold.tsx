"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { type MonthlyPnL, COLORS } from "@/lib/demo-data"
import { cn } from "@/lib/utils"

interface AreaThresholdProps {
  data: MonthlyPnL[]
}

type MetricKey = "revenue" | "cogs" | "ebitda"

const METRIC_CONFIG: { key: MetricKey; label: string; color: string; dataKey: string }[] = [
  { key: "revenue", label: "Revenue", color: COLORS.revenue, dataKey: "revenue" },
  { key: "cogs", label: "COGS", color: COLORS.cost, dataKey: "cogs" },
  { key: "ebitda", label: "EBITDA", color: COLORS.ebitda, dataKey: "ebitda" },
]

function fmtM(value: number): string {
  return `$${(value / 1_000_000).toFixed(1)}M`
}

function fmtTooltip(value: number): string {
  return `$${value.toLocaleString("en-US")}`
}

function computeTrendLine(data: { month: string; value: number }[]): { month: string; trend: number }[] {
  const n = data.length
  if (n < 2) return data.map(d => ({ month: d.month, trend: d.value }))
  const xMean = (n - 1) / 2
  const yMean = data.reduce((s, d) => s + d.value, 0) / n
  let num = 0, den = 0
  data.forEach((d, i) => {
    num += (i - xMean) * (d.value - yMean)
    den += (i - xMean) ** 2
  })
  const slope = den === 0 ? 0 : num / den
  const intercept = yMean - slope * xMean
  return data.map((d, i) => ({ month: d.month, trend: Math.round(intercept + slope * i) }))
}

export function Chart6AreaThreshold({ data }: AreaThresholdProps) {
  const [activeMetrics, setActiveMetrics] = useState<Set<MetricKey>>(new Set(["revenue", "cogs", "ebitda"]))
  const [showTrend, setShowTrend] = useState(false)

  const chartData = data.map((d) => ({
    month: d.month,
    revenue: d.revenue,
    cogs: d.totalCogs,
    ebitda: d.ebitda,
  }))

  // Compute trend lines for active metrics
  const trendData = METRIC_CONFIG.filter(m => activeMetrics.has(m.key)).map(m => ({
    key: m.key,
    data: computeTrendLine(data.map(d => ({
      month: d.month,
      value: m.key === "revenue" ? d.revenue : m.key === "cogs" ? d.totalCogs : d.ebitda,
    }))),
  }))

  // Merge trend values into chart data
  const mergedData = chartData.map((d, i) => {
    const merged: Record<string, unknown> = { ...d }
    trendData.forEach(t => {
      merged[`${t.key}Trend`] = t.data[i]?.trend
    })
    return merged
  })

  function toggleMetric(key: MetricKey) {
    setActiveMetrics(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        if (next.size > 1) next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  return (
    <div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {METRIC_CONFIG.map((m) => (
              <button
                key={m.key}
                onClick={() => toggleMetric(m.key)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-colors border",
                  activeMetrics.has(m.key)
                    ? "border-transparent text-white"
                    : "border-slate-200 text-slate-400 hover:text-slate-600"
                )}
                style={activeMetrics.has(m.key) ? { backgroundColor: m.color } : undefined}
              >
                {m.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowTrend(!showTrend)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors border",
              showTrend
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 text-slate-400 hover:text-slate-600"
            )}
          >
            Trend
          </button>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={mergedData} margin={{ top: 10, right: 10, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={fmtM} tick={{ fontSize: 10 }} width={50} />
            <Tooltip
              formatter={(value) => [fmtTooltip(Number(value))]}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
            />
            {METRIC_CONFIG.filter(m => activeMetrics.has(m.key)).map((m) => (
              <Line
                key={m.key}
                type="monotone"
                dataKey={m.dataKey}
                name={m.label}
                stroke={m.color}
                strokeWidth={2}
                dot={{ r: 3, fill: m.color, stroke: "white", strokeWidth: 1.5 }}
                activeDot={{ r: 5 }}
              />
            ))}
            {showTrend && METRIC_CONFIG.filter(m => activeMetrics.has(m.key)).map((m) => (
              <Line
                key={`${m.key}-trend`}
                type="linear"
                dataKey={`${m.dataKey}Trend`}
                name={`${m.label} Trend`}
                stroke={m.color}
                strokeWidth={1.5}
                strokeDasharray="6 4"
                strokeOpacity={0.4}
                dot={false}
                activeDot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
