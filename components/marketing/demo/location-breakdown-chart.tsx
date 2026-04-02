"use client"

import { useState } from "react"
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
import { LOCATION_DATA, COLORS } from "@/lib/demo-data"
import { cn } from "@/lib/utils"

type SortBy = "revenue" | "margin"

const sortOptions: { key: SortBy; label: string }[] = [
  { key: "revenue", label: "Revenue" },
  { key: "margin", label: "Margin" },
]

function fmtM(value: number): string {
  return `$${(value / 1_000_000).toFixed(1)}M`
}

function fmtTooltip(value: number): string {
  return `$${value.toLocaleString("en-US")}`
}

export function LocationBreakdownChart() {
  const [sortBy, setSortBy] = useState<SortBy>("revenue")

  const chartData = LOCATION_DATA.map((loc) => ({
    name: loc.name,
    shortName: loc.name.split(" ").slice(0, 2).join(" "),
    revenue: loc.revenue,
    margin: loc.margin,
  })).sort((a, b) =>
    sortBy === "revenue" ? b.revenue - a.revenue : b.margin - a.margin
  )

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 sm:mb-4">
        <h3 className="text-sm font-semibold text-slate-700">Revenue by Location</h3>
        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-400 mr-1">Sort:</span>
          <div className="flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5">
            {sortOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSortBy(opt.key)}
                className={cn(
                  "rounded-md px-2 py-1 text-xs font-medium transition-colors",
                  sortBy === opt.key
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
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
              return item ? `${item.name} (${item.margin}% margin)` : String(label)
            }}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
          />
          <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS.locations[i % COLORS.locations.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
