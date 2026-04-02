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
  Label,
} from "recharts"
import { LOCATION_DATA, COLORS } from "@/lib/demo-data"

const scatterData = LOCATION_DATA.map((loc) => ({
  name: loc.name,
  shortName: loc.name.split(" ").slice(0, 2).join(" "),
  type: loc.type,
  revenue: loc.revenue / 1_000_000,
  margin: loc.margin,
  headcount: loc.headcount,
  revenuePerHead: Math.round(loc.revenue / loc.headcount),
}))

// Custom dot that renders the label
function LabeledDot(props: Record<string, unknown>) {
  const { cx, cy, payload } = props as { cx: number; cy: number; payload: typeof scatterData[0] }
  const r = 6 + (payload.headcount / 8)
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={COLORS.revenue} fillOpacity={0.15} stroke={COLORS.ebitda} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={3} fill={COLORS.ebitda} />
      <text x={cx} y={cy - r - 5} textAnchor="middle" fontSize={9} fontWeight={600} fill="#334155">
        {payload.shortName}
      </text>
      <text x={cx} y={cy - r - 5 + 11} textAnchor="middle" fontSize={7} fill="#94a3b8">
        {payload.type} · {payload.headcount} staff
      </text>
    </g>
  )
}

export function Chart3Scatter() {
  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">#3 — Location Efficiency (Revenue vs Margin, size = headcount)</h3>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <ResponsiveContainer width="100%" height={340}>
          <ScatterChart margin={{ top: 30, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              type="number"
              dataKey="revenue"
              tick={{ fontSize: 10 }}
              tickFormatter={(v) => `$${v}M`}
              domain={["dataMin - 0.5", "dataMax + 0.5"]}
            >
              <Label value="Revenue ($M)" position="bottom" offset={0} fontSize={10} fill="#94a3b8" />
            </XAxis>
            <YAxis
              type="number"
              dataKey="margin"
              tick={{ fontSize: 10 }}
              tickFormatter={(v) => `${v}%`}
              domain={[4, 20]}
            >
              <Label value="EBITDA Margin %" angle={-90} position="insideLeft" offset={10} fontSize={10} fill="#94a3b8" />
            </YAxis>
            <ZAxis type="number" dataKey="headcount" range={[300, 1000]} />
            <Tooltip
              content={({ payload }) => {
                if (!payload?.length) return null
                const d = payload[0].payload
                return (
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-md">
                    <p className="font-semibold text-slate-900">{d.name}</p>
                    <p className="text-slate-500">${d.revenue.toFixed(1)}M rev · {d.margin}% margin</p>
                    <p className="text-slate-500">{d.headcount} staff · ${(d.revenuePerHead / 1000).toFixed(0)}K/head</p>
                  </div>
                )
              }}
            />
            <Scatter data={scatterData} shape={<LabeledDot />} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
