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
import { WaterfallChart } from "./waterfall-chart"
import { Chart6AreaThreshold } from "./chart-6-area-threshold"
import { Chart3Scatter } from "./chart-3-scatter"
import { Chart4Heatmap } from "./chart-4-heatmap"

const dateRanges: { key: DateRange; label: string }[] = [
  { key: "full", label: "Full Year" },
  { key: "Q1", label: "Q1" },
  { key: "Q2", label: "Q2" },
  { key: "Q3", label: "Q3" },
  { key: "Q4", label: "Q4" },
]

function SectionTitle({ title }: { title: string }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
      {title}
    </p>
  )
}

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

        {/* #1 — The Headlines */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-3">
          <SectionTitle title="The Headlines" />
          <Chart1SparklineKPIs data={filteredData} totals={totals} />
        </motion.div>

        {/* #2 — Where the Money Goes */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }} className="space-y-3">
          <SectionTitle title="Where the Money Goes" />
          <WaterfallChart totals={totals} />
        </motion.div>

        {/* #3 — Are We Hitting Our Targets? */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.16 }} className="space-y-3">
          <SectionTitle title="Are We Hitting Our Targets?" />
          <Chart6AreaThreshold data={filteredData} />
        </motion.div>

        {/* #5 — Who's Pulling Their Weight? */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.24 }} className="space-y-3">
          <SectionTitle title="Who's Pulling Their Weight?" />
          <Chart3Scatter />
        </motion.div>

        {/* #6 — Spot the Patterns */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.32 }} className="space-y-3">
          <SectionTitle title="Spot the Patterns" />
          <Chart4Heatmap />
        </motion.div>
      </div>
    </div>
  )
}
