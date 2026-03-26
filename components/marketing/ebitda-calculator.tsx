"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CTA } from "@/lib/constants"

function formatDollars(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`
  }
  return `$${value.toFixed(0)}`
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

const SCENARIOS = [
  {
    label: "Conservative",
    costDescription: "Automate reporting, data entry, and document processing.",
    revenueDescription: "Faster proposals and analysis — win deals you were too slow for.",
    sgaReduction: 0.025,
    cogsReduction: 0,
    revenueLift: 0.01,
    saasReplacement: 0.15,
  },
  {
    label: "Moderate",
    costDescription: "AI across ops, procurement, and supply chain workflows.",
    revenueDescription: "AI-powered lead scoring, competitive analysis, and sales productivity.",
    sgaReduction: 0.065,
    cogsReduction: 0.015,
    revenueLift: 0.02,
    saasReplacement: 0.30,
  },
  {
    label: "Aggressive",
    costDescription: "Full AI integration — custom automations and team-wide adoption.",
    revenueDescription: "New revenue streams from AI-enabled services, market insights, and speed to market.",
    sgaReduction: 0.10,
    cogsReduction: 0.04,
    revenueLift: 0.035,
    saasReplacement: 0.50,
  },
] as const

const PE_MULTIPLE = 10

type View = "combined" | "cost" | "revenue"

export function EbitdaCalculator() {
  const [revenue, setRevenue] = useState<string>("")
  const [cogs, setCogs] = useState<string>("")
  const [sga, setSga] = useState<string>("")
  const [saasSpend, setSaasSpend] = useState<string>("")
  const [submitted, setSubmitted] = useState(false)
  const [view, setView] = useState<View>("combined")

  const revNum = parseFloat(revenue.replace(/,/g, "")) || 0
  const cogsNum = parseFloat(cogs.replace(/,/g, "")) || 0
  const sgaNum = parseFloat(sga.replace(/,/g, "")) || 0
  const saasNum = parseFloat(saasSpend.replace(/,/g, "")) || 0

  const isValid = revNum > 0 && cogsNum > 0 && sgaNum > 0 && revNum > cogsNum + sgaNum

  const results = useMemo(() => {
    if (!isValid) return null

    const currentEbitda = revNum - cogsNum - sgaNum
    const currentMargin = (currentEbitda / revNum) * 100

    return SCENARIOS.map((scenario) => {
      // Cost savings
      const sgaSavings = sgaNum * scenario.sgaReduction
      const cogsSavings = cogsNum * scenario.cogsReduction
      const saasSavings = saasNum * scenario.saasReplacement
      const costSavings = sgaSavings + cogsSavings + saasSavings

      // Revenue acceleration
      const revenueGain = revNum * scenario.revenueLift
      // New revenue flows through at current gross margin
      const grossMarginPct = (revNum - cogsNum) / revNum
      const revenueEbitdaImpact = revenueGain * grossMarginPct

      // Combined
      const totalImpact = view === "cost" ? costSavings
        : view === "revenue" ? revenueEbitdaImpact
        : costSavings + revenueEbitdaImpact

      const newEbitda = currentEbitda + totalImpact
      const newRevenue = view === "cost" ? revNum : revNum + revenueGain
      const newMargin = (newEbitda / newRevenue) * 100
      const marginImprovement = newMargin - currentMargin
      const evImpact = totalImpact * PE_MULTIPLE

      return {
        ...scenario,
        sgaSavings,
        cogsSavings,
        saasSavings,
        costSavings,
        revenueGain,
        revenueEbitdaImpact,
        totalImpact,
        newEbitda,
        newRevenue,
        newMargin,
        marginImprovement,
        evImpact,
        currentEbitda,
        currentMargin,
      }
    })
  }, [isValid, revNum, cogsNum, sgaNum, saasNum, view])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isValid) setSubmitted(true)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
        <div className="space-y-6">
          <div>
            <label htmlFor="revenue" className="mb-2 block text-sm font-medium text-slate-700">
              Annual Revenue ($)
            </label>
            <input
              id="revenue"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 50,000,000"
              value={revenue}
              onChange={(e) => {
                setRevenue(e.target.value)
                setSubmitted(false)
              }}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-lg transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="cogs" className="mb-2 block text-sm font-medium text-slate-700">
              Cost of Goods Sold ($)
            </label>
            <input
              id="cogs"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 30,000,000"
              value={cogs}
              onChange={(e) => {
                setCogs(e.target.value)
                setSubmitted(false)
              }}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-lg transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="sga" className="mb-2 block text-sm font-medium text-slate-700">
              SG&A Expenses ($)
            </label>
            <input
              id="sga"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 12,000,000"
              value={sga}
              onChange={(e) => {
                setSga(e.target.value)
                setSubmitted(false)
              }}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-lg transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="saas" className="mb-2 block text-sm font-medium text-slate-700">
              Annual SaaS Spend ($)
              <span className="ml-2 font-normal text-slate-400">optional</span>
            </label>
            <input
              id="saas"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 500,000"
              value={saasSpend}
              onChange={(e) => {
                setSaasSpend(e.target.value)
                setSubmitted(false)
              }}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-lg transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="mt-1 text-xs text-slate-400">
              AI tools can replace or consolidate existing software subscriptions.
            </p>
          </div>
        </div>

        {revNum > 0 && cogsNum > 0 && sgaNum > 0 && !isValid && (
          <p className="mt-3 text-sm text-red-600">
            COGS + SG&A must be less than revenue.
          </p>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className="mt-8 w-full rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Calculate EBITDA Impact
        </button>
      </form>

      {submitted && results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          {/* View Toggle */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-lg bg-slate-100 p-1">
              {(
                [
                  { key: "combined", label: "Combined" },
                  { key: "cost", label: "Cost Savings" },
                  { key: "revenue", label: "Revenue Growth" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setView(tab.key)}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                    view === tab.key
                      ? "bg-white text-foreground shadow-sm"
                      : "text-slate-500 hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Current state */}
          <div className="mb-8 rounded-lg bg-slate-100 p-6 text-center">
            <p className="text-sm font-medium text-slate-500">Current EBITDA</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {formatDollars(results[0].currentEbitda)}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {formatPercent(results[0].currentMargin)} margin on {formatDollars(revNum)} revenue
            </p>
          </div>

          {/* Scenarios */}
          <div className="grid gap-6 md:grid-cols-3">
            {results.map((r, i) => (
              <motion.div
                key={`${r.label}-${view}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.15 }}
                className={`rounded-lg border p-6 ${
                  i === 1
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-slate-200 bg-white"
                }`}
              >
                {i === 1 && (
                  <span className="mb-3 inline-block rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                    Most Common
                  </span>
                )}
                <h3 className="text-lg font-semibold text-foreground">{r.label}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {view === "revenue" ? r.revenueDescription
                    : view === "cost" ? r.costDescription
                    : r.costDescription}
                </p>

                <div className="mt-6 space-y-4">
                  {/* Cost Savings — show in cost and combined views */}
                  {view !== "revenue" && (
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Cost Savings
                      </p>
                      <p className="mt-1 text-2xl font-bold text-foreground">
                        {formatDollars(r.costSavings)}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
                        {r.sgaSavings > 0 && <span>SG&A: {formatDollars(r.sgaSavings)}</span>}
                        {r.cogsSavings > 0 && <span>COGS: {formatDollars(r.cogsSavings)}</span>}
                        {r.saasSavings > 0 && <span>SaaS: {formatDollars(r.saasSavings)}</span>}
                      </div>
                    </div>
                  )}

                  {/* Revenue Growth — show in revenue and combined views */}
                  {view !== "cost" && (
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Revenue Acceleration
                      </p>
                      <p className="mt-1 text-2xl font-bold text-foreground">
                        +{formatDollars(r.revenueGain)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {formatPercent(r.revenueLift * 100)} lift — EBITDA impact: {formatDollars(r.revenueEbitdaImpact)}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      New EBITDA Margin
                    </p>
                    <p className="mt-1 text-2xl font-bold text-foreground">
                      {formatPercent(r.newMargin)}
                    </p>
                    <p className="mt-1 text-xs text-green-600">
                      +{formatPercent(r.marginImprovement)} improvement
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Enterprise Value Impact
                    </p>
                    <p className="mt-1 text-2xl font-bold text-primary">
                      {formatDollars(r.evImpact)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      at {PE_MULTIPLE}x EBITDA multiple
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer + CTA */}
          <div className="mt-10 text-center">
            <p className="mx-auto max-w-xl text-xs text-slate-400">
              Estimates based on industry benchmarks for AI implementation across
              PE-backed portfolio companies. Revenue lift assumes new revenue flows
              through at current gross margin. Actual results vary by company size,
              industry, and implementation scope.
            </p>
            <div className="mt-6">
              <Button size="lg" render={<a href={CTA.primary.href} />}>
                Talk to Us About Your Portfolio
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
