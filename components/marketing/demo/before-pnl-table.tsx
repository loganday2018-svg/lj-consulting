"use client"

import { MONTHLY_DATA, ANNUAL_TOTALS, COMPANY_NAME, FISCAL_YEAR, type MonthlyPnL } from "@/lib/demo-data"

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
  annualKey?: keyof typeof ANNUAL_TOTALS
  type: RowType
  indent?: boolean
  // For margin rows
  numKey?: keyof MonthlyPnL
  denKey?: keyof MonthlyPnL
}

const rows: Row[] = [
  // Revenue
  { label: "Revenue", type: "section" },
  { label: "Patient Services", key: "patientServices", annualKey: "patientServices", type: "normal", indent: true },
  { label: "Ancillary Revenue", key: "ancillaryRevenue", annualKey: "ancillaryRevenue", type: "normal", indent: true },
  { label: "Other Income", key: "otherIncome", annualKey: "otherIncome", type: "normal", indent: true },
  { label: "Total Revenue", key: "revenue", annualKey: "revenue", type: "bold" },

  // COGS
  { label: "Cost of Goods Sold", type: "section" },
  { label: "Provider Compensation", key: "providerComp", annualKey: "providerComp", type: "normal", indent: true },
  { label: "Nursing Staff", key: "nursingStaff", annualKey: "nursingStaff", type: "normal", indent: true },
  { label: "Medical Supplies", key: "medicalSupplies", annualKey: "medicalSupplies", type: "normal", indent: true },
  { label: "Lab & Diagnostic", key: "labDiagnostic", annualKey: "labDiagnostic", type: "normal", indent: true },
  { label: "Pharmacy", key: "pharmacy", annualKey: "pharmacy", type: "normal", indent: true },
  { label: "Facility Costs", key: "facilityCosts", annualKey: "facilityCosts", type: "normal", indent: true },
  { label: "Equipment Lease", key: "equipmentLease", annualKey: "equipmentLease", type: "normal", indent: true },
  { label: "Total COGS", key: "totalCogs", annualKey: "totalCogs", type: "subtotal" },

  // Gross Profit
  { label: "Gross Profit", key: "grossProfit", annualKey: "grossProfit", type: "highlight" },
  { label: "Gross Margin %", type: "margin", numKey: "grossProfit", denKey: "revenue" },

  // OpEx
  { label: "Operating Expenses", type: "section" },
  { label: "Administrative Staff", key: "adminStaff", annualKey: "adminStaff", type: "normal", indent: true },
  { label: "Billing & Collections", key: "billingCollections", annualKey: "billingCollections", type: "normal", indent: true },
  { label: "IT Systems", key: "itSystems", annualKey: "itSystems", type: "normal", indent: true },
  { label: "Malpractice Insurance", key: "malpracticeInsurance", annualKey: "malpracticeInsurance", type: "normal", indent: true },
  { label: "General Insurance", key: "generalInsurance", annualKey: "generalInsurance", type: "normal", indent: true },
  { label: "Marketing", key: "marketing", annualKey: "marketing", type: "normal", indent: true },
  { label: "Utilities", key: "utilities", annualKey: "utilities", type: "normal", indent: true },
  { label: "Depreciation", key: "depreciation", annualKey: "depreciation", type: "normal", indent: true },
  { label: "Professional Fees", key: "professionalFees", annualKey: "professionalFees", type: "normal", indent: true },
  { label: "Office Supplies", key: "officeSupplies", annualKey: "officeSupplies", type: "normal", indent: true },
  { label: "Staff Training", key: "staffTraining", annualKey: "staffTraining", type: "normal", indent: true },
  { label: "Total OpEx", key: "totalOpex", annualKey: "totalOpex", type: "subtotal" },

  // EBITDA
  { label: "EBITDA", key: "ebitda", annualKey: "ebitda", type: "highlight" },
  { label: "EBITDA Margin %", type: "margin", numKey: "ebitda", denKey: "revenue" },
]

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

export function BeforePnLTable() {
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
                {COMPANY_NAME} — {FISCAL_YEAR}
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
                      {pct(ANNUAL_TOTALS[row.numKey! as keyof typeof ANNUAL_TOTALS] as number, ANNUAL_TOTALS[row.denKey! as keyof typeof ANNUAL_TOTALS] as number)}
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
                    {fmt(ANNUAL_TOTALS[row.annualKey!] as number)}
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
