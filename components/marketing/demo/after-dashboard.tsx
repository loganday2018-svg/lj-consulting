"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { DollarSign, TrendingUp, BarChart3, Percent } from "lucide-react"
import {
  MONTHLY_DATA,
  COLORS,
  filterByDateRange,
  computeTotals,
  computeMetrics,
  type DateRange,
} from "@/lib/demo-data"
import { cn } from "@/lib/utils"
import { KPICard } from "./kpi-card"
import { WaterfallChart } from "./waterfall-chart"
import { RevenueTrendChart } from "./revenue-trend-chart"
import { LocationBreakdownChart } from "./location-breakdown-chart"

const dateRanges: { key: DateRange; label: string }[] = [
  { key: "full", label: "Full Year" },
  { key: "Q1", label: "Q1" },
  { key: "Q2", label: "Q2" },
  { key: "Q3", label: "Q3" },
  { key: "Q4", label: "Q4" },
]

export function AfterDashboard() {
  const [range, setRange] = useState<DateRange>("full")

  const filteredData = useMemo(() => filterByDateRange(MONTHLY_DATA, range), [range])
  const totals = useMemo(() => computeTotals(filteredData), [filteredData])
  const metrics = useMemo(() => computeMetrics(totals), [totals])

  const isQuarter = range !== "full"
  const periodLabel = isQuarter ? range : "FY"

  return (
    <div className="rounded-2xl bg-slate-50 p-3 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Date range filter */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-slate-700">
            {isQuarter ? `${range} 2025` : "Full Year 2025"}
          </h3>
          <div className="flex items-center gap-0.5 rounded-lg bg-white p-0.5 shadow-sm border border-slate-200">
            {dateRanges.map((dr) => (
              <button
                key={dr.key}
                onClick={() => setRange(dr.key)}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                  range === dr.key
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {dr.label}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
          {[
            {
              title: "Revenue",
              value: `$${(totals.revenue / 1_000_000).toFixed(1)}M`,
              change: 6.2,
              changeLabel: `YoY (${periodLabel})`,
              icon: DollarSign,
            },
            {
              title: "Gross Margin",
              value: `${metrics.grossMarginPct.toFixed(1)}%`,
              change: 1.4,
              changeLabel: `pp YoY`,
              icon: TrendingUp,
            },
            {
              title: "EBITDA",
              value: `$${(totals.ebitda / 1_000_000).toFixed(1)}M`,
              change: 12.3,
              changeLabel: `YoY (${periodLabel})`,
              icon: BarChart3,
            },
            {
              title: "EBITDA Margin",
              value: `${metrics.ebitdaMarginPct.toFixed(1)}%`,
              change: 0.7,
              changeLabel: `pp YoY`,
              icon: Percent,
            },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <KPICard {...kpi} />
            </motion.div>
          ))}
        </div>

        {/* Charts row 1 */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <WaterfallChart totals={totals} />
          <RevenueTrendChart data={filteredData} />
        </motion.div>

        {/* Location breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <LocationBreakdownChart />
        </motion.div>
      </div>
    </div>
  )
}
