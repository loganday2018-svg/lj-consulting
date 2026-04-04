import type { Metadata } from "next"
import { HeroSection } from "@/components/marketing/hero"
import { CTASection } from "@/components/marketing/cta-section"
import { LogoTicker } from "@/components/marketing/logo-ticker"
import { ValueProps } from "@/components/marketing/value-props"
import { EbitdaCalculator } from "@/components/marketing/ebitda-calculator"
import { AdoptionCurve } from "@/components/marketing/adoption-curve"

export const metadata: Metadata = {
  title: "AI Implementation for PE Portfolio Companies",
  description:
    "Logan & Matt help PE-backed teams deploy Claude, Codex, and Copilot across their portfolio companies. Training, setup, and ongoing support. Then we stick around to make sure they actually use them.",
}

const VALUE_PROPS = [
  {
    icon: "TrendingUp" as const,
    title: "Your Sales Team Closes Faster",
    description:
      "AI handles the grunt work so your team spends time selling, not researching.",
    useCases: [
      "Prospect research pulled in seconds, not hours",
      "First-draft proposals generated from your CRM data",
      "Territory mapping and account planning done in minutes",
    ],
  },
  {
    icon: "Clock" as const,
    title: "Your Finance Team Does in Hours What Took Days",
    description:
      "DCFs, board decks, variance reports. AI builds the first draft so your team focuses on the analysis.",
    useCases: [
      "DCF models and scenario analysis built in minutes",
      "Month-end close accelerated. Reconciliations, commentary, journal entries",
      "Ad hoc analysis requests turned around same-day instead of next-week",
    ],
  },
  {
    icon: "Cog" as const,
    title: "Your Ops Team Stops Drowning in Manual Work",
    description:
      "Contract reviews, compliance checks, inventory. AI handles the repetitive stuff so your team can focus.",
    useCases: [
      "Vendor contracts analyzed and renegotiation opportunities flagged",
      "Transform raw, messy data into clear options your operators can act on immediately",
      "Benchmark every cost line against industry data without hiring a consultant",
    ],
  },
  {
    icon: "Handshake" as const,
    title: "M&A, Procurement, and Contracts. Done Faster.",
    description:
      "Target acquisitions, find portfolio-wide synergies, and review every contract at AI speed.",
    useCases: [
      "Target potential acquisitions in minutes. Screening, comps, and preliminary valuation before the first call.",
      "Cross-portfolio procurement synergies identified automatically. Same vendor, different prices, flagged instantly.",
      "AI reads every contract in your portfolio and extracts key terms, renewal dates, and risk clauses in seconds",
    ],
  },
] as const

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Value Propositions */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              What Changes When AI Actually Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-700">
              Not theory. These are the workflows we set up at real portfolio
              companies.
            </p>
          </div>

          <ValueProps items={VALUE_PROPS} />
        </div>
      </section>

      {/* Adoption Curve */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              Months of Fumbling vs. Weeks to Full Adoption
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-700">
              Most teams watch a few demos, then adoption stalls. We compress the curve — weeks, not quarters.
            </p>
          </div>
          <div className="mt-12">
            <AdoptionCurve />
          </div>
        </div>
      </section>

      {/* EBITDA Calculator */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              See the Impact on Your EBITDA
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-700">
              Plug in your portfolio company&apos;s financials. See what AI could mean
              for margins and enterprise value.
            </p>
          </div>
          <div className="mt-12">
            <EbitdaCalculator />
          </div>
        </div>
      </section>

      <LogoTicker />

      <CTASection
        secondaryLabel="See how we work →"
        secondaryHref="/services"
      />
    </>
  )
}
