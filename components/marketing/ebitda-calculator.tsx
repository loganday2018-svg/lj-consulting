"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CTA } from "@/lib/constants"
import { cn } from "@/lib/utils"

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
    revenueDescription: "Faster proposals and analysis. Win deals you were too slow for.",
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
    costDescription: "Full AI integration. Custom automations and team-wide adoption.",
    revenueDescription: "New revenue streams from AI-enabled services, market insights, and speed to market.",
    sgaReduction: 0.10,
    cogsReduction: 0.04,
    revenueLift: 0.035,
    saasReplacement: 0.50,
  },
] as const

const PRESETS = [
  { label: "Healthcare", revenue: 31_000_000, cogs: 20_000_000, sga: 7_000_000, saas: 400_000 },
  { label: "Manufacturing", revenue: 72_000_000, cogs: 42_000_000, sga: 16_000_000, saas: 1_200_000 },
  { label: "HVAC", revenue: 42_000_000, cogs: 21_000_000, sga: 10_000_000, saas: 600_000 },
] as const

type View = "combined" | "cost" | "revenue"

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  suffix?: string
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className="text-sm font-semibold text-foreground">
          {suffix ? `${value}${suffix}` : formatDollars(value)}
        </span>
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
        <span>{suffix ? `${min}${suffix}` : formatDollars(min)}</span>
        <span>{suffix ? `${max}${suffix}` : formatDollars(max)}</span>
      </div>
    </div>
  )
}

// Mini before/after bar chart
function EbitdaComparisonChart({
  currentEbitda,
  scenarios,
  peMultiple,
}: {
  currentEbitda: number
  scenarios: { label: string; newEbitda: number; evImpact: number }[]
  peMultiple: number
}) {
  const allValues = [currentEbitda, ...scenarios.map(s => s.newEbitda)]
  const maxVal = Math.max(...allValues)

  function barWidth(val: number): number {
    return Math.max((val / maxVal) * 100, 2)
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
      <div className="space-y-3">
        {/* Current */}
        <div className="flex items-center gap-3">
          <span className="w-24 text-xs font-medium text-slate-500 flex-shrink-0 sm:w-28">Current</span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div
                className="h-6 rounded bg-slate-300 transition-all duration-500"
                style={{ width: `${barWidth(currentEbitda)}%` }}
              />
              <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">{formatDollars(currentEbitda)}</span>
            </div>
          </div>
        </div>

        {/* Scenarios */}
        {scenarios.map((s, i) => {
          const colors = ["bg-slate-500", "bg-primary", "bg-teal-500"]
          const isModerate = i === 1
          return (
            <div key={s.label} className="flex items-center gap-3">
              <span className={cn("w-24 text-xs font-medium flex-shrink-0 sm:w-28", isModerate ? "text-foreground font-semibold" : "text-slate-500")}>
                {s.label}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={cn("h-6 rounded transition-all duration-500", colors[i])}
                    style={{ width: `${barWidth(s.newEbitda)}%` }}
                  />
                  <span className={cn("text-xs font-semibold whitespace-nowrap", isModerate ? "text-foreground" : "text-slate-600")}>
                    {formatDollars(s.newEbitda)}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  EV: {formatDollars(s.evImpact)} at {peMultiple}x
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function EbitdaCalculator() {
  const [revenue, setRevenue] = useState(31_000_000)
  const [cogs, setCogs] = useState(20_000_000)
  const [sga, setSga] = useState(7_000_000)
  const [saas, setSaas] = useState(400_000)
  const [showSaas, setShowSaas] = useState(false)
  const [view, setView] = useState<View>("combined")
  const [activePreset, setActivePreset] = useState<number>(0)
  const [peMultiple, setPeMultiple] = useState(10)

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
      const evImpact = totalImpact * peMultiple

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
  }, [isValid, revenue, cogs, sga, saas, showSaas, view, peMultiple])

  return (
    <div>
      {/* Disclaimer */}
      <p className="mb-6 text-center text-xs text-slate-400">
        Illustrative estimates based on industry benchmarks. Actual impact varies by company and implementation scope.
      </p>

      {/* Industry Presets */}
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
            <span className="ml-1.5 text-xs opacity-70">{formatDollars(p.revenue)} rev</span>
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

        {/* PE Multiple */}
        <Slider
          label="EBITDA Multiple"
          value={peMultiple}
          onChange={setPeMultiple}
          min={6}
          max={18}
          step={1}
          suffix="x"
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

      {/* Results */}
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
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:py-2 sm:text-sm ${
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

          {/* Visual comparison chart */}
          <div className="mb-8">
            <EbitdaComparisonChart
              currentEbitda={results[0].currentEbitda}
              scenarios={results.map(r => ({ label: r.label, newEbitda: r.newEbitda, evImpact: r.evImpact }))}
              peMultiple={peMultiple}
            />
          </div>

          {/* Current state */}
          <div className="mb-8 rounded-lg bg-slate-100 p-4 text-center sm:p-6">
            <p className="text-sm font-medium text-slate-500">Current EBITDA</p>
            <p className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
              {formatDollars(results[0].currentEbitda)}
            </p>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              {formatPercent(results[0].currentMargin)} margin on {formatDollars(revenue)} revenue
            </p>
          </div>

          {/* Scenarios */}
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {results.map((r, i) => (
              <motion.div
                key={`${r.label}-${view}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.15 }}
                className={`rounded-lg border p-4 sm:p-6 ${
                  i === 1
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-slate-200 bg-white"
                }`}
              >
                <h3 className="text-lg font-semibold text-foreground">{r.label}</h3>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  {view === "revenue" ? r.revenueDescription
                    : view === "cost" ? r.costDescription
                    : r.costDescription}
                </p>

                <div className="mt-4 space-y-4 sm:mt-6">
                  {view !== "revenue" && (
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Cost Savings
                      </p>
                      <p className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                        {formatDollars(r.costSavings)}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-slate-500 sm:gap-3 sm:text-xs">
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
                      <p className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                        +{formatDollars(r.revenueGain)}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                        {formatPercent(r.revenueLift * 100)} lift. EBITDA impact: {formatDollars(r.revenueEbitdaImpact)}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      New EBITDA Margin
                    </p>
                    <p className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
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
                    <p className="mt-1 text-xl font-bold text-primary sm:text-2xl">
                      {formatDollars(r.evImpact)}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                      at {peMultiple}x EBITDA multiple
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button size="lg" render={<a href={CTA.primary.href} />}>
              Talk to Us About Your Portfolio
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
