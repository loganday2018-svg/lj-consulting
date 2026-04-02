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
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="hidden rounded-lg bg-slate-100 p-2 sm:block">
          <Icon className="h-4 w-4 text-slate-600" />
        </div>
        <span className="text-xs font-medium text-slate-500 sm:text-sm">{title}</span>
      </div>
      <div className="mt-1 text-xl font-bold text-slate-900 sm:mt-2 sm:text-2xl">{value}</div>
      <div className="mt-0.5 flex items-center gap-1 sm:mt-1 sm:gap-1.5">
        {isPositive ? (
          <TrendingUp className="h-3 w-3 text-slate-700 sm:h-3.5 sm:w-3.5" />
        ) : (
          <TrendingDown className="h-3 w-3 text-slate-400 sm:h-3.5 sm:w-3.5" />
        )}
        <span className={`text-xs font-medium sm:text-sm ${isPositive ? "text-slate-700" : "text-slate-400"}`}>
          {isPositive ? "+" : ""}
          {change}%
        </span>
        <span className="text-xs text-slate-400 sm:text-sm">{changeLabel}</span>
      </div>
    </div>
  )
}
