"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, TrendingUp, DollarSign, Cog, Users, Scale, Headphones } from "lucide-react"

const FUNCTIONS = [
  {
    icon: TrendingUp,
    label: "Sales & BD",
    impact: "Revenue acceleration",
    useCases: [
      "AI-powered prospect research. Financials, news, org charts pulled before every call",
      "Custom proposals drafted in minutes from templates and CRM data",
      "Cold outreach personalized at scale. Not generic templates",
      "CRM enrichment and stale deal flagging on autopilot",
      "Competitive intelligence aggregated and summarized weekly",
    ],
  },
  {
    icon: DollarSign,
    label: "Finance & FP&A",
    impact: "SG&A reduction + speed",
    useCases: [
      "DCF models and scenario analysis built in a fraction of the time",
      "Month-end close acceleration. Reconciliations, journal entries, commentary",
      "Board deck narratives drafted from raw financial data",
      "Variance analysis automated. AI flags anomalies before you ask",
      "Audit prep. Supporting docs pulled and organized automatically",
    ],
  },
  {
    icon: Cog,
    label: "Operations",
    impact: "COGS + SG&A reduction",
    useCases: [
      "Vendor contract analysis. Read 200 contracts, flag renegotiation opportunities",
      "Quality and compliance monitoring with real-time anomaly detection",
      "Inventory optimization. Demand forecasting and reorder recommendations",
      "Process documentation generated from existing workflows",
      "Route and logistics optimization",
    ],
  },
  {
    icon: Users,
    label: "HR & People",
    impact: "SG&A reduction",
    useCases: [
      "Job descriptions, offer letters, and policy docs drafted instantly",
      "Resume screening and interview question generation",
      "Employee handbook Q&A bot. Reduces HR ticket volume by 40-60%",
      "Onboarding materials customized per role automatically",
      "Performance review drafts from manager notes and metrics",
    ],
  },
  {
    icon: Scale,
    label: "Legal & Risk",
    impact: "SG&A reduction + SaaS replacement",
    useCases: [
      "Contract redlining and clause extraction in minutes",
      "Regulatory change monitoring. AI flags what matters to your industry",
      "Due diligence document review during add-on acquisitions",
      "NDA and standard agreement generation from templates",
      "Replaces or reduces seats in contract management SaaS",
    ],
  },
  {
    icon: Headphones,
    label: "Customer Success",
    impact: "Revenue retention + SG&A reduction",
    useCases: [
      "Support ticket triage and auto-response for common issues",
      "Churn prediction from usage patterns and sentiment signals",
      "Upsell opportunity identification from customer data",
      "Customer onboarding emails and guides generated per product",
      "QBR decks drafted from usage metrics and support history",
    ],
  },
] as const

export function UseCaseBreakdown() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
          What Drives These Numbers
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
          Specific AI workflows mapped to the functions inside your portfolio
          companies. This is what we set up.
        </p>
      </div>

      <div className="mt-10 space-y-3">
        {FUNCTIONS.map((fn, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={fn.label}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-slate-50"
              >
                <fn.icon className="size-5 shrink-0 text-primary" />
                <div className="flex-1">
                  <span className="font-semibold text-foreground">{fn.label}</span>
                  <span className="ml-3 text-xs text-slate-400">{fn.impact}</span>
                </div>
                <ChevronDown
                  className={`size-4 shrink-0 text-slate-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ul className="space-y-2 border-t border-slate-100 px-6 py-4">
                      {fn.useCases.map((uc) => (
                        <li
                          key={uc}
                          className="flex items-start gap-2 text-sm text-slate-700"
                        >
                          <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                          {uc}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
