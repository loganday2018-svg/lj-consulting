"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts"
import { type MonthlyPnL, COLORS } from "@/lib/demo-data"

interface AreaThresholdProps {
  data: MonthlyPnL[]
}

export function Chart6AreaThreshold({ data }: AreaThresholdProps) {
  const chartData = data.map((d) => ({
    month: d.month,
    margin: Number(((d.ebitda / d.revenue) * 100).toFixed(1)),
  }))

  const target = 15

  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">#6 — EBITDA Margin with Target Zone</h3>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="marginGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.ebitda} stopOpacity={0.2} />
                <stop offset="95%" stopColor={COLORS.ebitda} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            {/* Target zone */}
            <ReferenceArea y1={target} y2={25} fill={COLORS.profit} fillOpacity={0.06} />
            <ReferenceArea y1={0} y2={10} fill={COLORS.cost} fillOpacity={0.04} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10 }} width={40} domain={[0, 25]} />
            <Tooltip
              formatter={(value) => [`${value}%`, "EBITDA Margin"]}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
            />
            <ReferenceLine y={target} stroke={COLORS.profit} strokeDasharray="8 4" strokeWidth={1.5} label={{ value: `${target}% target`, position: "insideTopRight", fontSize: 10, fill: COLORS.profit }} />
            <ReferenceLine y={10} stroke={COLORS.cost} strokeDasharray="4 4" strokeWidth={1} label={{ value: "10% floor", position: "insideBottomRight", fontSize: 9, fill: COLORS.cost }} />
            <Area
              type="monotone"
              dataKey="margin"
              stroke={COLORS.ebitda}
              strokeWidth={2.5}
              fill="url(#marginGrad)"
              dot={{ r: 4, fill: COLORS.ebitda, stroke: "white", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
