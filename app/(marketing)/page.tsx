import type { Metadata } from "next"
import { GraduationCap, Wrench, Headphones } from "lucide-react"
import { HeroSection } from "@/components/marketing/hero"
import { CTASection } from "@/components/marketing/cta-section"

export const metadata: Metadata = {
  title: "AI Implementation for PE Portfolio Companies",
  description:
    "Logan & James help PE-backed teams deploy Claude, Codex, and Copilot across their portfolio companies. Training, setup, and ongoing support — then we stick around to make sure they actually use them.",
}

const VALUE_PROPS = [
  {
    icon: GraduationCap,
    title: "AI Training Programs",
    description:
      "Hands-on training for operators and teams. From prompt engineering to building custom workflows — we get your people productive with AI in days, not months.",
  },
  {
    icon: Wrench,
    title: "Tool Setup & Integration",
    description:
      "Claude Code, GitHub Copilot, Cursor, Codex — we configure and deploy the right AI tools for each portfolio company's tech stack and workflows.",
  },
  {
    icon: Headphones,
    title: "Retainer Support",
    description:
      "Stuck on a prompt? Tool acting weird? New hire needs onboarding? That's what we're here for — a dedicated AI partner your teams can actually reach.",
  },
] as const

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Stat Strip */}
      <section className="bg-slate-800 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-3 divide-x divide-slate-600">
            <div className="px-8 text-center">
              <p className="text-3xl font-bold text-white md:text-4xl">World&apos;s Largest Retailer</p>
              <p className="mt-2 text-sm text-slate-400">Where we built our operator experience</p>
            </div>
            <div className="px-8 text-center">
              <p className="text-3xl font-bold text-white md:text-4xl">2</p>
              <p className="mt-2 text-sm text-slate-400">Top-10 MBA programs</p>
            </div>
            <div className="px-8 text-center">
              <p className="text-3xl font-bold text-white md:text-4xl">2</p>
              <p className="mt-2 text-sm text-slate-400">Portfolio companies onboarded</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="bg-slate-50 py-16 md:py-24">
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

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {VALUE_PROPS.map((prop) => (
              <div
                key={prop.title}
                className="rounded-lg border border-slate-200 bg-white p-8 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5"
              >
                <prop.icon className="mb-4 size-8 text-primary md:size-10" />
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {prop.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-700 md:text-base">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Ready to Accelerate Your Portfolio's AI Adoption?" />
    </>
  )
}
