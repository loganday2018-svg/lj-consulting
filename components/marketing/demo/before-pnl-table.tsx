"use client"

import { type MonthlyPnL, computeTotals } from "@/lib/demo-data"
import { type CompanyConfig } from "@/lib/demo-companies"

function fmt(n: number): string {
  if (n === 0) return "—"
  if (n < 0) return `(${Math.abs(n).toLocaleString("en-US")})`
  return n.toLocaleString("en-US")
}

function pct(numerator: number, denominator: number): string {
  if (denominator === 0) return "—"
  return `${((numerator / denominator) * 100).toFixed(1)}%`
}

type RowType = "normal" | "bold" | "subtotal" | "highlight" | "section" | "margin"

interface Row {
  label: string
  key?: keyof MonthlyPnL
  annualKey?: string
  type: RowType
  indent?: boolean
  numKey?: keyof MonthlyPnL
  denKey?: keyof MonthlyPnL
}

function buildRows(company: CompanyConfig): Row[] {
  const rows: Row[] = []

  // Revenue
  rows.push({ label: "Revenue", type: "section" })
  for (const l of company.revenueLabels) {
    rows.push({ label: l.label, key: l.key, annualKey: l.key, type: "normal", indent: true })
  }
  rows.push({ label: "Total Revenue", key: "revenue", annualKey: "revenue", type: "bold" })

  // COGS
  rows.push({ label: "Cost of Goods Sold", type: "section" })
  for (const l of company.cogsLabels) {
    rows.push({ label: l.label, key: l.key, annualKey: l.key, type: "normal", indent: true })
  }
  rows.push({ label: "Total COGS", key: "totalCogs", annualKey: "totalCogs", type: "subtotal" })

  // Gross Profit
  rows.push({ label: "Gross Profit", key: "grossProfit", annualKey: "grossProfit", type: "highlight" })
  rows.push({ label: "Gross Margin %", type: "margin", numKey: "grossProfit", denKey: "revenue" })

  // OpEx
  rows.push({ label: "Operating Expenses", type: "section" })
  for (const l of company.opexLabels) {
    rows.push({ label: l.label, key: l.key, annualKey: l.key, type: "normal", indent: true })
  }
  rows.push({ label: "Total OpEx", key: "totalOpex", annualKey: "totalOpex", type: "subtotal" })

  // EBITDA
  rows.push({ label: "EBITDA", key: "ebitda", annualKey: "ebitda", type: "highlight" })
  rows.push({ label: "EBITDA Margin %", type: "margin", numKey: "ebitda", denKey: "revenue" })

  return rows
}

function getRowClasses(type: RowType): { tr: string; td: string; stickyTd: string } {
  switch (type) {
    case "section":
      return {
        tr: "",
        td: "bg-slate-50 text-[10px] font-semibold uppercase tracking-wider text-slate-400",
        stickyTd: "bg-slate-50",
      }
    case "bold":
      return { tr: "font-bold", td: "", stickyTd: "bg-white" }
    case "subtotal":
      return { tr: "font-bold border-t-2 border-slate-400", td: "bg-slate-100", stickyTd: "bg-slate-100" }
    case "highlight":
      return { tr: "font-bold", td: "bg-yellow-50", stickyTd: "bg-yellow-50" }
    case "margin":
      return { tr: "italic text-slate-500", td: "bg-yellow-50", stickyTd: "bg-yellow-50" }
    default:
      return { tr: "", td: "", stickyTd: "bg-white" }
  }
}

interface BeforePnLTableProps {
  company: CompanyConfig
}

export function BeforePnLTable({ company }: BeforePnLTableProps) {
  const MONTHLY_DATA = company.monthlyData
  const ANNUAL_TOTALS = computeTotals(MONTHLY_DATA) as Record<string, number>
  const rows = buildRows(company)
  const months = MONTHLY_DATA.map((d) => d.month)

  return (
    <div className="space-y-0">
      {/* Formula bar */}
      <div className="flex items-center gap-2 rounded-t-lg border border-b-0 border-slate-300 bg-slate-100 px-3 py-1.5 font-mono text-xs text-slate-500">
        <span className="rounded border border-slate-300 bg-white px-2 py-0.5 font-semibold text-slate-700">
          B32
        </span>
        <span className="italic">=B19-B29-B31</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-b-lg border border-slate-300 shadow-md">
        <table className="w-full border-collapse font-mono text-xs whitespace-nowrap">
          <thead>
            <tr>
              <th className="sticky left-0 z-20 border border-slate-300 bg-[#217346] px-3 py-2 text-left text-white min-w-[180px]">
                {company.name} — {company.fiscalYear}
              </th>
              {months.map((m) => (
                <th key={m} className="border border-slate-300 bg-[#217346] px-3 py-2 text-right text-white min-w-[80px]">
                  {m}
                </th>
              ))}
              <th className="border border-slate-300 bg-[#185c37] px-3 py-2 text-right text-white min-w-[90px]">
                Full Year
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => {
              const classes = getRowClasses(row.type)

              if (row.type === "section") {
                return (
                  <tr key={ri}>
                    <td
                      colSpan={14}
                      className={`sticky left-0 z-10 border border-slate-300 px-3 py-1 ${classes.td}`}
                    >
                      {row.label}
                    </td>
                  </tr>
                )
              }

              if (row.type === "margin") {
                return (
                  <tr key={ri} className={classes.tr}>
                    <td className={`sticky left-0 z-10 border border-slate-300 px-3 py-1.5 text-left pl-6 ${classes.stickyTd}`}>
                      {row.label}
                    </td>
                    {MONTHLY_DATA.map((d, i) => (
                      <td key={i} className={`border border-slate-300 px-3 py-1.5 text-right tabular-nums ${classes.td}`}>
                        {pct(d[row.numKey!] as number, d[row.denKey!] as number)}
                      </td>
                    ))}
                    <td className={`border border-slate-300 px-3 py-1.5 text-right tabular-nums font-semibold ${classes.td}`}>
                      {pct(ANNUAL_TOTALS[row.numKey!] as number, ANNUAL_TOTALS[row.denKey!] as number)}
                    </td>
                  </tr>
                )
              }

              return (
                <tr key={ri} className={classes.tr}>
                  <td className={`sticky left-0 z-10 border border-slate-300 px-3 py-1.5 text-left ${row.indent ? "pl-6" : ""} ${classes.stickyTd}`}>
                    {row.label}
                  </td>
                  {MONTHLY_DATA.map((d, i) => {
                    const val = d[row.key!] as number
                    return (
                      <td key={i} className={`border border-slate-300 px-3 py-1.5 text-right tabular-nums ${val < 0 ? "text-red-600" : ""} ${classes.td}`}>
                        {fmt(val)}
                      </td>
                    )
                  })}
                  <td className={`border border-slate-300 px-3 py-1.5 text-right tabular-nums font-semibold ${classes.td}`}>
                    {fmt(ANNUAL_TOTALS[row.annualKey!] as unknown as number)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
