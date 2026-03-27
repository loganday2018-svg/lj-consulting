import type { Metadata } from "next"
import { HeroSection } from "@/components/marketing/hero"
import { CTASection } from "@/components/marketing/cta-section"
import { LogoTicker } from "@/components/marketing/logo-ticker"
import { ValueProps } from "@/components/marketing/value-props"
import { EbitdaCalculator } from "@/components/marketing/ebitda-calculator"

export const metadata: Metadata = {
  title: "AI Implementation for PE Portfolio Companies",
  description:
    "Logan & James help PE-backed teams deploy Claude, Codex, and Copilot across their portfolio companies. Training, setup, and ongoing support — then we stick around to make sure they actually use them.",
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
      "DCFs, board decks, variance reports — AI builds the first draft so your team focuses on the analysis.",
    useCases: [
      "DCF models and scenario analysis built in minutes",
      "Month-end close accelerated — reconciliations, commentary, journal entries",
      "Ad hoc analysis requests turned around same-day instead of next-week",
    ],
  },
  {
    icon: "Cog" as const,
    title: "Your Ops Team Stops Drowning in Manual Work",
    description:
      "Contract reviews, compliance checks, inventory — AI handles the repetitive stuff so your operators can operate.",
    useCases: [
      "Vendor contracts analyzed and renegotiation opportunities flagged",
      "Turn messy operational data into dashboards your team actually uses — same day",
      "Benchmark every cost line against industry data without hiring a consultant",
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
        heading="Ready to Accelerate Your Portfolio's AI Adoption?"
        description="30-minute call. We'll map out where AI fits in your portfolio companies and what to do first."
      />
    </>
  )
}
