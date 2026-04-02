"use client"

import { LOCATION_DATA, COLORS } from "@/lib/demo-data"

function fmtM(n: number): string {
  return `$${(n / 1_000_000).toFixed(1)}M`
}

// Simple treemap layout — squarified-ish algorithm
function layoutTreemap(items: typeof LOCATION_DATA, width: number, height: number) {
  const total = items.reduce((s, i) => s + i.revenue, 0)
  const sorted = [...items].sort((a, b) => b.revenue - a.revenue)
  const rects: { x: number; y: number; w: number; h: number; item: typeof items[0]; color: string }[] = []

  let x = 0, y = 0, remainW = width, remainH = height
  let remaining = [...sorted]
  let horizontal = true

  while (remaining.length > 0) {
    const slice = remaining.splice(0, 2)
    const sliceTotal = slice.reduce((s, i) => s + i.revenue, 0)
    const sliceFrac = sliceTotal / total

    if (horizontal) {
      const sliceH = remainH * sliceFrac
      let cx = x
      for (const item of slice) {
        const frac = item.revenue / sliceTotal
        const w = remainW * frac
        rects.push({ x: cx, y, w, h: sliceH, item, color: COLORS.locations[rects.length % COLORS.locations.length] })
        cx += w
      }
      y += sliceH
      remainH -= sliceH
    } else {
      const sliceW = remainW * sliceFrac
      let cy = y
      for (const item of slice) {
        const frac = item.revenue / sliceTotal
        const h = remainH * frac
        rects.push({ x, y: cy, w: sliceW, h, item, color: COLORS.locations[rects.length % COLORS.locations.length] })
        cy += h
      }
      x += sliceW
      remainW -= sliceW
    }
    horizontal = !horizontal
  }

  return rects
}

export function Chart2Treemap() {
  const width = 600
  const height = 300
  const rects = layoutTreemap(LOCATION_DATA, width, height)

  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">#2 — Location Treemap (size = revenue, label = margin)</h3>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="xMidYMid meet">
          {rects.map((r, i) => (
            <g key={i}>
              <rect x={r.x + 1} y={r.y + 1} width={Math.max(r.w - 2, 0)} height={Math.max(r.h - 2, 0)} rx={4} fill={r.color} opacity={0.85} />
              {r.w > 60 && r.h > 40 && (
                <>
                  <text x={r.x + r.w / 2} y={r.y + r.h / 2 - 8} textAnchor="middle" fontSize={11} fontWeight={600} fill="white">
                    {r.item.name.split(" ").slice(0, 2).join(" ")}
                  </text>
                  <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 8} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.8)">
                    {fmtM(r.item.revenue)} · {r.item.margin}%
                  </text>
                </>
              )}
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
