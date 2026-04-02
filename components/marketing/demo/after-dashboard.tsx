"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  MONTHLY_DATA,
  filterByDateRange,
  computeTotals,
  computeMetrics,
  type DateRange,
} from "@/lib/demo-data"
import { cn } from "@/lib/utils"

// All chart variations
import { Chart1SparklineKPIs } from "./chart-1-sparkline-kpis"
import { Chart2Treemap } from "./chart-2-treemap"
import { Chart3Scatter } from "./chart-3-scatter"
import { Chart4Heatmap } from "./chart-4-heatmap"
import { Chart5Sankey } from "./chart-5-sankey"
import { Chart6AreaThreshold } from "./chart-6-area-threshold"
import { Chart7RankedCards } from "./chart-7-ranked-cards"
import { Chart8StackedBar } from "./chart-8-stacked-bar"

// Existing charts (kept for comparison)
import { WaterfallChart } from "./waterfall-chart"
import { RevenueTrendChart } from "./revenue-trend-chart"
import { MarginTrendChart } from "./margin-trend-chart"
import { LocationBreakdownChart } from "./location-breakdown-chart"
import { KPICard } from "./kpi-card"
import { DollarSign, TrendingUp, BarChart3, Percent } from "lucide-react"

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
      <div className="space-y-8">
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

        {/* ===== NEW CHARTS (numbered for review) ===== */}

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Chart1SparklineKPIs data={filteredData} totals={totals} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Chart5Sankey totals={totals} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
          <Chart8StackedBar totals={totals} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <Chart6AreaThreshold data={filteredData} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
          <Chart4Heatmap />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <Chart2Treemap />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}>
          <Chart3Scatter />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
          <Chart7RankedCards />
        </motion.div>

        {/* ===== ORIGINAL CHARTS (for comparison) ===== */}

        <hr className="border-slate-300" />
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Original charts (for comparison)</p>

        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
          {[
            { title: "Revenue", value: `$${(totals.revenue / 1_000_000).toFixed(1)}M`, change: 6.2, changeLabel: `YoY (${periodLabel})`, icon: DollarSign },
            { title: "Gross Margin", value: `${metrics.grossMarginPct.toFixed(1)}%`, change: 1.4, changeLabel: `pp YoY`, icon: TrendingUp },
            { title: "EBITDA", value: `$${(totals.ebitda / 1_000_000).toFixed(1)}M`, change: 12.3, changeLabel: `YoY (${periodLabel})`, icon: BarChart3 },
            { title: "EBITDA Margin", value: `${metrics.ebitdaMarginPct.toFixed(1)}%`, change: 0.7, changeLabel: `pp YoY`, icon: Percent },
          ].map((kpi) => (
            <KPICard key={kpi.title} {...kpi} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <WaterfallChart totals={totals} />
          <RevenueTrendChart data={filteredData} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <MarginTrendChart data={filteredData} />
          <LocationBreakdownChart />
        </div>
      </div>
    </div>
  )
}
