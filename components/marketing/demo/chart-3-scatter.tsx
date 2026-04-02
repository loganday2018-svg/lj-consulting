"use client"

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from "recharts"
import { LOCATION_DATA, COLORS } from "@/lib/demo-data"

const scatterData = LOCATION_DATA.map((loc) => ({
  name: loc.name,
  shortName: loc.name.split(" ").slice(0, 2).join(" "),
  revenue: loc.revenue / 1_000_000,
  margin: loc.margin,
  headcount: loc.headcount,
  revenuePerHead: Math.round(loc.revenue / loc.headcount),
}))

export function Chart3Scatter() {
  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">#3 — Efficiency Scatter (X=Revenue, Y=Margin, Bubble=Headcount)</h3>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              type="number"
              dataKey="revenue"
              name="Revenue"
              unit="M"
              tick={{ fontSize: 10 }}
              tickFormatter={(v) => `$${v}M`}
            />
            <YAxis
              type="number"
              dataKey="margin"
              name="Margin"
              unit="%"
              tick={{ fontSize: 10 }}
              tickFormatter={(v) => `${v}%`}
            />
            <ZAxis type="number" dataKey="headcount" range={[200, 800]} name="Headcount" />
            <Tooltip
              content={({ payload }) => {
                if (!payload?.length) return null
                const d = payload[0].payload
                return (
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-md">
                    <p className="font-semibold text-slate-900">{d.name}</p>
                    <p className="text-slate-500">${d.revenue.toFixed(1)}M revenue · {d.margin}% margin</p>
                    <p className="text-slate-500">{d.headcount} staff · ${(d.revenuePerHead / 1000).toFixed(0)}K/head</p>
                  </div>
                )
              }}
            />
            <Scatter data={scatterData} fill={COLORS.revenue} fillOpacity={0.7} stroke={COLORS.ebitda} strokeWidth={1.5} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
