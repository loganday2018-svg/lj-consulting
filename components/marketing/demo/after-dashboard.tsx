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

import { Chart1SparklineKPIs } from "./chart-1-sparkline-kpis"
import { Chart3Scatter } from "./chart-3-scatter"
import { Chart5Sankey } from "./chart-5-sankey"
import { Chart6AreaThreshold } from "./chart-6-area-threshold"
import { Chart7RankedCards } from "./chart-7-ranked-cards"
import { Chart8StackedBar } from "./chart-8-stacked-bar"

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

  return (
    <div className="rounded-2xl bg-slate-50 p-3 sm:p-6">
      <div className="space-y-8">
        {/* Date range filter */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-slate-700">
            {range !== "full" ? `${range} 2025` : "Full Year 2025"}
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

        {/* #1 — Sparkline KPIs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Chart1SparklineKPIs data={filteredData} totals={totals} />
        </motion.div>

        {/* #8 — Revenue Decomposition */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Chart8StackedBar totals={totals} />
        </motion.div>

        {/* #5 — Full P&L Sankey */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
          <Chart5Sankey totals={totals} />
        </motion.div>

        {/* #6 — EBITDA Margin with Target */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <Chart6AreaThreshold data={filteredData} />
        </motion.div>

        {/* #3 — Efficiency Scatter */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
          <Chart3Scatter />
        </motion.div>

        {/* #7 — Location Rankings */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <Chart7RankedCards />
        </motion.div>
      </div>
    </div>
  )
}
