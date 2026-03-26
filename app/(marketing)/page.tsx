import type { Metadata } from "next"
import { GraduationCap, Wrench, Headphones } from "lucide-react"
import { HeroSection } from "@/components/marketing/hero"
import { CTASection } from "@/components/marketing/cta-section"
import { StatStrip } from "@/components/marketing/stat-strip"
import { LogoTicker } from "@/components/marketing/logo-ticker"
import { ValueProps } from "@/components/marketing/value-props"

export const metadata: Metadata = {
  title: "AI Implementation for PE Portfolio Companies",
  description:
    "Logan & James help PE-backed teams deploy Claude, Codex, and Copilot across their portfolio companies. Training, setup, and ongoing support — then we stick around to make sure they actually use them.",
}

const VALUE_PROPS = [
  {
    icon: "GraduationCap" as const,
    title: "AI Training Programs",
    description:
      "Hands-on training for operators and teams. From prompt engineering to building custom workflows — we get your people productive with AI in days, not months.",
  },
  {
    icon: "Wrench" as const,
    title: "Tool Setup & Integration",
    description:
      "Claude Code, GitHub Copilot, Cursor, Codex — we configure and deploy the right AI tools for each portfolio company's tech stack and workflows.",
  },
  {
    icon: "Headphones" as const,
    title: "Retainer Support",
    description:
      "Stuck on a prompt? Tool acting weird? New hire needs onboarding? That's what we're here for — a dedicated AI partner your teams can actually reach.",
  },
] as const

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <StatStrip />

      {/* Value Propositions */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              How We Create Value
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-700">
              Three ways we help portfolio companies capture AI-driven operating
              leverage.
            </p>
          </div>

          <ValueProps items={VALUE_PROPS} />
        </div>
      </section>

      <LogoTicker />

      <CTASection heading="Ready to Accelerate Your Portfolio's AI Adoption?" />
    </>
  )
}
