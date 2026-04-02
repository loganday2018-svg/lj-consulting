"use client"

import { useState } from "react"
import { COLORS } from "@/lib/demo-data"
import { cn } from "@/lib/utils"

interface SankeyProps {
  totals: {
    revenue: number
    patientServices: number
    ancillaryRevenue: number
    otherIncome: number
    providerComp: number
    nursingStaff: number
    medicalSupplies: number
    labDiagnostic: number
    pharmacy: number
    facilityCosts: number
    equipmentLease: number
    totalCogs: number
    grossProfit: number
    adminStaff: number
    billingCollections: number
    itSystems: number
    malpracticeInsurance: number
    generalInsurance: number
    marketing: number
    utilities: number
    depreciation: number
    professionalFees: number
    officeSupplies: number
    staffTraining: number
    totalOpex: number
    ebitda: number
  }
}

function fmtM(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  return `$${(n / 1_000).toFixed(0)}K`
}

function pct(n: number, total: number): string {
  return `${((n / total) * 100).toFixed(0)}%`
}

type View = "overview" | "cogs" | "opex"

interface LineItem {
  label: string
  value: number
  color: string
}

function FlowBar({ items, total, label }: { items: LineItem[]; total: number; label: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-xs font-semibold text-slate-700">{label}</span>
        <span className="text-xs font-bold text-slate-900 tabular-nums">{fmtM(total)}</span>
      </div>
      <div className="flex h-6 overflow-hidden rounded-md sm:h-8">
        {items.map((item) => {
          const widthPct = (item.value / total) * 100
          return (
            <div
              key={item.label}
              className="relative group"
              style={{ width: `${widthPct}%`, backgroundColor: item.color }}
            >
              {/* Tooltip on hover */}
              <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10">
                <div className="rounded bg-slate-800 px-2 py-1 text-[10px] text-white whitespace-nowrap shadow">
                  {item.label}: {fmtM(item.value)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {/* Legend */}
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
        {items.filter(i => (i.value / total) > 0.04).map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-[10px] text-slate-500">{item.label}</span>
            <span className="text-[10px] font-medium text-slate-700 tabular-nums">{pct(item.value, total)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Chart5Sankey({ totals }: SankeyProps) {
  const [view, setView] = useState<View>("overview")

  const views: { key: View; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "cogs", label: "COGS Detail" },
    { key: "opex", label: "OpEx Detail" },
  ]

  // Color scales — navy gradient for COGS, teal gradient for OpEx
  const cogsItems: LineItem[] = [
    { label: "Provider Comp", value: totals.providerComp, color: "#0c2340" },
    { label: "Nursing", value: totals.nursingStaff, color: "#1e3a5f" },
    { label: "Med Supplies", value: totals.medicalSupplies, color: "#2a5580" },
    { label: "Lab/Diagnostic", value: totals.labDiagnostic, color: "#3670a1" },
    { label: "Pharmacy", value: totals.pharmacy, color: "#4a8bc2" },
    { label: "Facility", value: totals.facilityCosts, color: "#6ba3d6" },
    { label: "Equip Lease", value: totals.equipmentLease, color: "#94bee6" },
  ]

  const opexItems: LineItem[] = [
    { label: "Admin Staff", value: totals.adminStaff, color: "#064e3b" },
    { label: "Billing", value: totals.billingCollections, color: "#065f46" },
    { label: "IT Systems", value: totals.itSystems, color: "#047857" },
    { label: "Malpractice", value: totals.malpracticeInsurance, color: "#059669" },
    { label: "Insurance", value: totals.generalInsurance, color: "#0d9488" },
    { label: "Marketing", value: totals.marketing, color: "#14b8a6" },
    { label: "Utilities", value: totals.utilities, color: "#2dd4bf" },
    { label: "Depreciation", value: totals.depreciation, color: "#5eead4" },
    { label: "Prof Fees", value: totals.professionalFees, color: "#99f6e4" },
  ].filter(i => i.value > 10_000)

  const overviewItems: LineItem[] = [
    { label: "COGS", value: totals.totalCogs, color: COLORS.cost },
    { label: "OpEx", value: totals.totalOpex, color: COLORS.neutral },
    { label: "EBITDA", value: totals.ebitda, color: COLORS.ebitda },
  ]

  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">#5 — Revenue Flow</h3>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        {/* View toggle */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-700">Where the money goes</span>
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

        <div className="space-y-5">
          {/* Revenue bar (always shown) */}
          <FlowBar
            items={[
              { label: "Patient Services", value: totals.patientServices, color: COLORS.revenue },
              { label: "Ancillary", value: totals.ancillaryRevenue, color: "#2a5580" },
              { label: "Other", value: totals.otherIncome, color: "#6ba3d6" },
            ]}
            total={totals.revenue}
            label="Revenue"
          />

          {/* Connector arrow */}
          <div className="flex justify-center">
            <svg width="20" height="16" viewBox="0 0 20 16" className="text-slate-300">
              <path d="M10 0 L10 10 M4 6 L10 12 L16 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {view === "overview" && (
            <FlowBar items={overviewItems} total={totals.revenue} label="Revenue Breakdown" />
          )}

          {view === "cogs" && (
            <>
              <FlowBar items={cogsItems} total={totals.totalCogs} label="Cost of Goods Sold" />
              <div className="flex justify-center">
                <svg width="20" height="16" viewBox="0 0 20 16" className="text-slate-300">
                  <path d="M10 0 L10 10 M4 6 L10 12 L16 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex items-baseline justify-between rounded-lg border-2 border-dashed border-teal-200 bg-teal-50/50 px-3 py-2">
                <span className="text-xs font-semibold" style={{ color: COLORS.profit }}>Gross Profit</span>
                <span className="text-sm font-bold" style={{ color: COLORS.profit }}>{fmtM(totals.grossProfit)} ({pct(totals.grossProfit, totals.revenue)} margin)</span>
              </div>
            </>
          )}

          {view === "opex" && (
            <>
              <div className="flex items-baseline justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span className="text-xs font-semibold text-slate-500">Gross Profit</span>
                <span className="text-sm font-bold text-slate-700">{fmtM(totals.grossProfit)}</span>
              </div>
              <div className="flex justify-center">
                <svg width="20" height="16" viewBox="0 0 20 16" className="text-slate-300">
                  <path d="M10 0 L10 10 M4 6 L10 12 L16 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <FlowBar items={opexItems} total={totals.totalOpex} label="Operating Expenses" />
              <div className="flex justify-center">
                <svg width="20" height="16" viewBox="0 0 20 16" className="text-slate-300">
                  <path d="M10 0 L10 10 M4 6 L10 12 L16 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex items-baseline justify-between rounded-lg border-2 border-dashed border-teal-200 bg-teal-50/50 px-3 py-2">
                <span className="text-xs font-semibold" style={{ color: COLORS.ebitda }}>EBITDA</span>
                <span className="text-sm font-bold" style={{ color: COLORS.ebitda }}>{fmtM(totals.ebitda)} ({pct(totals.ebitda, totals.revenue)} margin)</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
