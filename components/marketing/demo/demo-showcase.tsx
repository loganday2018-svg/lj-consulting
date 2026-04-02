"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileSpreadsheet, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { COMPANY_NAME, FISCAL_YEAR } from "@/lib/demo-data"
import { BeforePnLTable } from "./before-pnl-table"
import { AfterDashboard } from "./after-dashboard"

export function DemoShowcase() {
  const [view, setView] = useState<"before" | "after">("after")

  return (
    <div className="space-y-8">
      {/* Company label */}
      <p className="text-center text-sm text-slate-500">
        Sample: {COMPANY_NAME} &middot; {FISCAL_YEAR}
      </p>

      {/* Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-0.5 rounded-lg bg-slate-100 p-1">
          <button
            onClick={() => setView("after")}
            className={cn(
              "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              view === "after"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            The Dashboard
          </button>
          <button
            onClick={() => setView("before")}
            className={cn(
              "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              view === "before"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <FileSpreadsheet className="h-4 w-4" />
            The Spreadsheet
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {view === "before" ? (
          <motion.div
            key="before"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
          >
            <BeforePnLTable />
          </motion.div>
        ) : (
          <motion.div
            key="after"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
          >
            <AfterDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
