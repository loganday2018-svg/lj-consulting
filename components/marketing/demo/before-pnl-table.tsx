"use client"

import { MONTHLY_DATA, ANNUAL_TOTALS, COMPANY_NAME, FISCAL_YEAR } from "@/lib/demo-data"

function fmt(n: number): string {
  if (n < 0) return `(${Math.abs(n).toLocaleString("en-US")})`
  return n.toLocaleString("en-US")
}

function pct(numerator: number, denominator: number): string {
  return `${((numerator / denominator) * 100).toFixed(1)}%`
}

interface RowProps {
  label: string
  values: number[]
  total: number
  bold?: boolean
  indent?: boolean
  highlight?: boolean
  pctRow?: { values: number[]; totals: number[] }
}

function PnLRow({ label, values, total, bold, indent, highlight }: RowProps) {
  return (
    <tr className={`${highlight ? "bg-yellow-50" : ""} ${bold ? "font-bold" : ""}`}>
      <td
        className={`sticky left-0 z-10 border border-slate-300 px-3 py-1.5 text-left ${
          highlight ? "bg-yellow-50" : "bg-white"
        } ${indent ? "pl-6" : ""} ${bold ? "font-bold" : ""}`}
      >
        {label}
      </td>
      {values.map((v, i) => (
        <td
          key={i}
          className={`border border-slate-300 px-3 py-1.5 text-right tabular-nums ${
            v < 0 ? "text-red-600" : ""
          }`}
        >
          {fmt(v)}
        </td>
      ))}
      <td
        className={`border border-slate-300 px-3 py-1.5 text-right tabular-nums font-semibold ${
          total < 0 ? "text-red-600" : ""
        }`}
      >
        {fmt(total)}
      </td>
    </tr>
  )
}

function MarginRow({ label, revenues, values }: { label: string; revenues: number[]; values: number[] }) {
  const totalRevenue = revenues.reduce((a, b) => a + b, 0)
  const totalValue = values.reduce((a, b) => a + b, 0)
  return (
    <tr className="bg-yellow-50 italic text-slate-500">
      <td className="sticky left-0 z-10 border border-slate-300 bg-yellow-50 px-3 py-1.5 text-left pl-6">
        {label}
      </td>
      {revenues.map((rev, i) => (
        <td key={i} className="border border-slate-300 px-3 py-1.5 text-right tabular-nums">
          {pct(values[i], rev)}
        </td>
      ))}
      <td className="border border-slate-300 px-3 py-1.5 text-right tabular-nums font-semibold">
        {pct(totalValue, totalRevenue)}
      </td>
    </tr>
  )
}

function SeparatorRow({ label, values, total }: { label: string; values: number[]; total: number }) {
  return (
    <tr className="bg-slate-100 font-bold border-t-2 border-slate-400">
      <td className="sticky left-0 z-10 bg-slate-100 border border-slate-300 px-3 py-1.5 text-left">
        {label}
      </td>
      {values.map((v, i) => (
        <td key={i} className="border border-slate-300 px-3 py-1.5 text-right tabular-nums">
          {fmt(v)}
        </td>
      ))}
      <td className="border border-slate-300 px-3 py-1.5 text-right tabular-nums">{fmt(total)}</td>
    </tr>
  )
}

export function BeforePnLTable() {
  const months = MONTHLY_DATA.map((d) => d.month)
  const get = (key: keyof typeof MONTHLY_DATA[0]) => MONTHLY_DATA.map((d) => d[key] as number)
  const annTotal = (key: keyof typeof ANNUAL_TOTALS) => ANNUAL_TOTALS[key]

  return (
    <div className="space-y-0">
      {/* Formula bar */}
      <div className="flex items-center gap-2 rounded-t-lg border border-b-0 border-slate-300 bg-slate-100 px-3 py-1.5 font-mono text-xs text-slate-500">
        <span className="rounded border border-slate-300 bg-white px-2 py-0.5 font-semibold text-slate-700">
          B16
        </span>
        <span className="italic">=B5-B11-B15</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-b-lg border border-slate-300 shadow-md">
        <table className="w-full border-collapse font-mono text-xs whitespace-nowrap">
          {/* Header */}
          <thead>
            <tr>
              <th className="sticky left-0 z-20 border border-slate-300 bg-[#217346] px-3 py-2 text-left text-white">
                {COMPANY_NAME} — {FISCAL_YEAR}
              </th>
              {months.map((m) => (
                <th key={m} className="border border-slate-300 bg-[#217346] px-3 py-2 text-right text-white">
                  {m}
                </th>
              ))}
              <th className="border border-slate-300 bg-[#185c37] px-3 py-2 text-right text-white">
                Full Year
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Revenue */}
            <PnLRow label="Revenue" values={get("revenue")} total={annTotal("revenue")} bold />

            {/* COGS */}
            <tr>
              <td
                colSpan={14}
                className="sticky left-0 z-10 border border-slate-300 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400"
              >
                Cost of Goods Sold
              </td>
            </tr>
            <PnLRow label="Provider Compensation" values={get("providerComp")} total={annTotal("providerComp")} indent />
            <PnLRow label="Medical Supplies" values={get("medicalSupplies")} total={annTotal("medicalSupplies")} indent />
            <PnLRow label="Facility Costs" values={get("facilityCosts")} total={annTotal("facilityCosts")} indent />
            <SeparatorRow label="Total COGS" values={get("totalCogs")} total={annTotal("totalCogs")} />

            {/* Gross Profit */}
            <PnLRow label="Gross Profit" values={get("grossProfit")} total={annTotal("grossProfit")} bold highlight />
            <MarginRow label="Gross Margin %" revenues={get("revenue")} values={get("grossProfit")} />

            {/* OpEx */}
            <tr>
              <td
                colSpan={14}
                className="sticky left-0 z-10 border border-slate-300 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400"
              >
                Operating Expenses
              </td>
            </tr>
            <PnLRow label="Administrative Staff" values={get("adminStaff")} total={annTotal("adminStaff")} indent />
            <PnLRow label="Billing & IT" values={get("billingIT")} total={annTotal("billingIT")} indent />
            <PnLRow label="Marketing" values={get("marketing")} total={annTotal("marketing")} indent />
            <SeparatorRow label="Total OpEx" values={get("totalOpex")} total={annTotal("totalOpex")} />

            {/* EBITDA */}
            <PnLRow label="EBITDA" values={get("ebitda")} total={annTotal("ebitda")} bold highlight />
            <MarginRow label="EBITDA Margin %" revenues={get("revenue")} values={get("ebitda")} />
          </tbody>
        </table>
      </div>
    </div>
  )
}
