"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileSpreadsheet, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { COMPANIES, DEFAULT_COMPANY, type CompanyConfig } from "@/lib/demo-companies"
import { BeforePnLTable } from "./before-pnl-table"
import { AfterDashboard } from "./after-dashboard"

export function DemoShowcase() {
  const [view, setView] = useState<"before" | "after">("after")
  const [company, setCompany] = useState<CompanyConfig>(DEFAULT_COMPANY)

  return (
    <div className="space-y-8">
      {/* Company selector */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-0.5 rounded-lg bg-slate-100 p-1">
          {COMPANIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCompany(c)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors sm:px-3 sm:py-1.5 sm:text-sm",
                company.id === c.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              {c.industry}
            </button>
          ))}
        </div>
      </div>

      {/* Company label */}
      <p className="text-center text-sm text-slate-500">
        Sample: {company.name} &middot; {company.fiscalYear}
      </p>

      {/* Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-0.5 rounded-lg bg-slate-100 p-1">
          <button
            onClick={() => setView("after")}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm",
              view === "after"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <LayoutDashboard className="hidden h-4 w-4 sm:block" />
            Dashboard
          </button>
          <button
            onClick={() => setView("before")}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm",
              view === "before"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <FileSpreadsheet className="hidden h-4 w-4 sm:block" />
            Spreadsheet
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {view === "before" ? (
          <motion.div
            key={`before-${company.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <BeforePnLTable company={company} />
          </motion.div>
        ) : (
          <motion.div
            key={`after-${company.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <AfterDashboard company={company} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
