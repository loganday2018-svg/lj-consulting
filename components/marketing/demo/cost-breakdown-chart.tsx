"use client"

import { useState } from "react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { COLORS } from "@/lib/demo-data"
import { cn } from "@/lib/utils"

type View = "cogs" | "opex" | "all"

interface CostBreakdownChartProps {
  totals: {
    providerComp: number
    medicalSupplies: number
    facilityCosts: number
    adminStaff: number
    billingIT: number
    marketing: number
    totalCogs: number
    totalOpex: number
  }
}

const views: { key: View; label: string }[] = [
  { key: "all", label: "All Costs" },
  { key: "cogs", label: "COGS" },
  { key: "opex", label: "OpEx" },
]

function fmtK(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  return `$${(value / 1_000).toFixed(0)}K`
}

function pct(value: number, total: number): string {
  return `${((value / total) * 100).toFixed(1)}%`
}

export function CostBreakdownChart({ totals }: CostBreakdownChartProps) {
  const [view, setView] = useState<View>("all")

  const cogsItems = [
    { name: "Provider Comp", value: totals.providerComp, color: COLORS.providerComp },
    { name: "Medical Supplies", value: totals.medicalSupplies, color: COLORS.medicalSupplies },
    { name: "Facility Costs", value: totals.facilityCosts, color: COLORS.facilityCosts },
  ]

  const opexItems = [
    { name: "Admin Staff", value: totals.adminStaff, color: COLORS.adminStaff },
    { name: "Billing & IT", value: totals.billingIT, color: COLORS.billingIT },
    { name: "Marketing", value: totals.marketing, color: COLORS.marketing },
  ]

  const data = view === "cogs" ? cogsItems : view === "opex" ? opexItems : [...cogsItems, ...opexItems]
  const totalCost = data.reduce((acc, d) => acc + d.value, 0)

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 sm:mb-4">
        <h3 className="text-sm font-semibold text-slate-700">Cost Breakdown</h3>
        <div className="flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5">
          {views.map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium transition-colors",
                view === v.key
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        {/* Donut */}
        <div className="w-full sm:w-1/2">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [fmtK(Number(value))]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend with values */}
        <div className="w-full space-y-2 sm:w-1/2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="truncate text-xs text-slate-600">{item.name}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-medium text-slate-900 tabular-nums">{fmtK(item.value)}</span>
                <span className="text-xs text-slate-400 tabular-nums w-10 text-right">{pct(item.value, totalCost)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
