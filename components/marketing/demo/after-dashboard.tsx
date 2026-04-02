"use client"

import { motion } from "framer-motion"
import { DollarSign, TrendingUp, BarChart3, Percent } from "lucide-react"
import { ANNUAL_TOTALS, ANNUAL_METRICS } from "@/lib/demo-data"
import { KPICard } from "./kpi-card"
import { WaterfallChart } from "./waterfall-chart"
import { RevenueTrendChart } from "./revenue-trend-chart"
import { LocationBreakdownChart } from "./location-breakdown-chart"

const kpis = [
  {
    title: "Revenue",
    value: `$${(ANNUAL_TOTALS.revenue / 1_000_000).toFixed(1)}M`,
    change: 6.2,
    changeLabel: "YoY",
    icon: DollarSign,
  },
  {
    title: "Gross Margin",
    value: `${ANNUAL_METRICS.grossMarginPct.toFixed(1)}%`,
    change: 1.4,
    changeLabel: "pp YoY",
    icon: TrendingUp,
  },
  {
    title: "EBITDA",
    value: `$${(ANNUAL_TOTALS.ebitda / 1_000_000).toFixed(1)}M`,
    change: 12.3,
    changeLabel: "YoY",
    icon: BarChart3,
  },
  {
    title: "EBITDA Margin",
    value: `${ANNUAL_METRICS.ebitdaMarginPct.toFixed(1)}%`,
    change: 0.7,
    changeLabel: "pp YoY",
    icon: Percent,
  },
]

export function AfterDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
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
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <WaterfallChart />
        <RevenueTrendChart />
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
  )
}
