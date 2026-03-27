"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CTA } from "@/lib/constants"

function formatDollars(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000
    return m % 1 === 0 ? `$${m.toFixed(0)}M` : `$${m.toFixed(1)}M`
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

const PRESETS = [
  { label: "Small Portco", revenue: 25_000_000, cogs: 15_000_000, sga: 6_000_000, saas: 200_000 },
  { label: "Mid-Market", revenue: 100_000_000, cogs: 60_000_000, sga: 24_000_000, saas: 800_000 },
  { label: "Large Portco", revenue: 500_000_000, cogs: 300_000_000, sga: 120_000_000, saas: 4_000_000 },
] as const

const PE_MULTIPLE = 10

type View = "combined" | "cost" | "revenue"

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className="text-sm font-semibold text-foreground">{formatDollars(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer accent-primary"
      />
      <div className="mt-1 flex justify-between text-xs text-slate-400">
        <span>{formatDollars(min)}</span>
        <span>{formatDollars(max)}</span>
      </div>
    </div>
  )
}

export function EbitdaCalculator() {
  const [revenue, setRevenue] = useState(100_000_000)
  const [cogs, setCogs] = useState(60_000_000)
  const [sga, setSga] = useState(24_000_000)
  const [saas, setSaas] = useState(800_000)
  const [showSaas, setShowSaas] = useState(false)
  const [view, setView] = useState<View>("combined")
  const [activePreset, setActivePreset] = useState<number>(1)

  function applyPreset(index: number) {
    const p = PRESETS[index]
    setRevenue(p.revenue)
    setCogs(p.cogs)
    setSga(p.sga)
    setSaas(p.saas)
    setActivePreset(index)
  }

  const isValid = revenue > 0 && cogs > 0 && sga > 0 && revenue > cogs + sga

  const results = useMemo(() => {
    if (!isValid) return null

    const saasNum = showSaas ? saas : 0
    const currentEbitda = revenue - cogs - sga
    const currentMargin = (currentEbitda / revenue) * 100

    return SCENARIOS.map((scenario) => {
      const sgaSavings = sga * scenario.sgaReduction
      const cogsSavings = cogs * scenario.cogsReduction
      const saasSavings = saasNum * scenario.saasReplacement
      const costSavings = sgaSavings + cogsSavings + saasSavings

      const revenueGain = revenue * scenario.revenueLift
      const grossMarginPct = (revenue - cogs) / revenue
      const revenueEbitdaImpact = revenueGain * grossMarginPct

      const totalImpact = view === "cost" ? costSavings
        : view === "revenue" ? revenueEbitdaImpact
        : costSavings + revenueEbitdaImpact

      const newEbitda = currentEbitda + totalImpact
      const newRevenue = view === "cost" ? revenue : revenue + revenueGain
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
  }, [isValid, revenue, cogs, sga, saas, showSaas, view])

  return (
    <div>
      {/* Disclaimer */}
      <p className="mb-6 text-center text-xs text-slate-400">
        Projections are illustrative estimates based on industry benchmarks, not
        guarantees of specific results. Actual impact varies by company, industry,
        and implementation scope.
      </p>

      {/* Presets */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => applyPreset(i)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
              activePreset === i
                ? "border-primary bg-primary text-primary-foreground"
                : "border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {p.label}
            <span className="ml-1.5 text-xs opacity-70">{formatDollars(p.revenue)}</span>
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="mx-auto max-w-lg space-y-6">
        <Slider
          label="Annual Revenue"
          value={revenue}
          onChange={(v) => { setRevenue(v); setActivePreset(-1) }}
          min={5_000_000}
          max={1_000_000_000}
          step={5_000_000}
        />
        <Slider
          label="Cost of Goods Sold"
          value={cogs}
          onChange={(v) => { setCogs(v); setActivePreset(-1) }}
          min={1_000_000}
          max={revenue * 0.9}
          step={1_000_000}
        />
        <Slider
          label="SG&A Expenses"
          value={sga}
          onChange={(v) => { setSga(v); setActivePreset(-1) }}
          min={500_000}
          max={Math.max(revenue - cogs - 1_000_000, 1_000_000)}
          step={500_000}
        />

        {/* SaaS toggle */}
        {!showSaas ? (
          <button
            onClick={() => setShowSaas(true)}
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            + Add SaaS spend
          </button>
        ) : (
          <Slider
            label="Annual SaaS Spend"
            value={saas}
            onChange={(v) => { setSaas(v); setActivePreset(-1) }}
            min={0}
            max={Math.min(sga * 0.5, 10_000_000)}
            step={50_000}
          />
        )}
      </div>

      {/* Results — always visible */}
      {results && (
        <div className="mt-12">
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
              {formatPercent(results[0].currentMargin)} margin on {formatDollars(revenue)} revenue
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
        </div>
      )}
    </div>
  )
}
