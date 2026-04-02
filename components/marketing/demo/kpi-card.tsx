"use client"

import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

interface KPICardProps {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: LucideIcon
}

export function KPICard({ title, value, change, changeLabel, icon: Icon }: KPICardProps) {
  const isPositive = change >= 0

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-slate-100 p-2">
          <Icon className="h-4 w-4 text-slate-600" />
        </div>
        <span className="text-sm font-medium text-slate-500">{title}</span>
      </div>
      <div className="mt-2 text-2xl font-bold text-slate-900">{value}</div>
      <div className="mt-1 flex items-center gap-1.5">
        {isPositive ? (
          <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5 text-red-500" />
        )}
        <span className={`text-sm font-medium ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
          {isPositive ? "+" : ""}
          {change}%
        </span>
        <span className="text-sm text-slate-400">{changeLabel}</span>
      </div>
    </div>
  )
}
