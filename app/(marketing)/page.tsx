import type { Metadata } from "next"
import { GraduationCap, Wrench, Headphones } from "lucide-react"
import { HeroSection } from "@/components/marketing/hero"
import { CTASection } from "@/components/marketing/cta-section"

export const metadata: Metadata = {
  title: "AI Implementation for PE Portfolio Companies",
  description:
    "We help PE-backed operators deploy Claude, Codex, and Copilot across their portfolio companies. Training, setup, and ongoing support that drives measurable value creation.",
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
      "Dedicated AI implementation partner on call. We handle troubleshooting, new tool rollouts, and continuous optimization so your teams stay ahead.",
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
              <p className="text-3xl font-bold text-white md:text-4xl">Fortune 1</p>
              <p className="mt-2 text-sm text-slate-400">Operator experience</p>
            </div>
            <div className="px-8 text-center">
              <p className="text-3xl font-bold text-white md:text-4xl">2</p>
              <p className="mt-2 text-sm text-slate-400">Top-10 MBA programs</p>
            </div>
            <div className="px-8 text-center">
              <p className="text-3xl font-bold text-white md:text-4xl">3+</p>
              <p className="mt-2 text-sm text-slate-400">AI platforms deployed</p>
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
                className="rounded-lg border border-slate-200 bg-white p-8"
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

      {/* Credibility Signal */}
      <section className="py-12">
        <p className="mx-auto max-w-2xl px-6 text-center text-slate-500 italic">
          Built by operators with MBA credentials and PE operating experience
          who use AI tools every day.
        </p>
      </section>

      <CTASection heading="Ready to Accelerate Your Portfolio's AI Adoption?" />
    </>
  )
}
