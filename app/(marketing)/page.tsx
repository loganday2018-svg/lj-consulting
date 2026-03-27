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
      "Custom proposals drafted from templates and CRM data",
      "Cold outreach personalized at scale",
      "CRM cleanup and deal scoring on autopilot",
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
      "Board deck narratives drafted from raw data",
      "Audit prep and workpaper organization automated",
    ],
  },
  {
    icon: "Cog" as const,
    title: "Your Ops Team Stops Drowning in Manual Work",
    description:
      "Contract reviews, compliance checks, inventory — AI handles the repetitive stuff so your operators can operate.",
    useCases: [
      "Vendor contracts analyzed and renegotiation opportunities flagged",
      "Quality and compliance monitoring in real-time",
      "HR docs, job postings, and onboarding materials generated instantly",
      "Support ticket triage and auto-response",
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
