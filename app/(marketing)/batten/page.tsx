import type { Metadata } from "next"
import { Check } from "lucide-react"
import { CTASection } from "@/components/marketing/cta-section"
import { PageHeader } from "@/components/marketing/page-header"
import { AnimatedSection } from "@/components/marketing/animated-section"
import { AnimatedSteps } from "@/components/marketing/animated-steps"

export const metadata: Metadata = {
  title: "Our Playbook",
  description:
    "How we deploy AI tools across small business teams. Training, setup, and ongoing support.",
}

const phases = [
  {
    number: 1,
    title: "Week 0: Discovery",
    description:
      "30-minute call. We learn how your team works, where the bottlenecks are, and which tools make sense. You walk away with a clear plan.",
  },
  {
    number: 2,
    title: "Week 1: Setup & First Wins",
    description:
      "We pick the right AI tools for your stack, set everyone up, and run the first hands-on session. Your team builds something real with their own data on day one.",
  },
  {
    number: 3,
    title: "Weeks 2-3: Training & Workflows",
    description:
      "Deeper sessions tailored to each role. Custom prompts, agents for recurring tasks, and AI-powered workflows for the manual work eating your team's time.",
  },
  {
    number: 4,
    title: "Week 4+: Support",
    description:
      "Dedicated Slack channel. Check-ins as your team finds new uses. Troubleshooting when tools update. We stick around until it's working.",
  },
]

const deliverables = [
  "Every team member trained and using AI tools independently",
  "Custom prompts and workflows built for your specific operations",
  "Custom agents built for your team's recurring tasks",
  "Recorded walkthroughs for onboarding future hires",
  "Written playbook documenting every workflow we set up",
  "Before-and-after time benchmarks on key tasks",
  "Dedicated support channel for ongoing questions",
]

export default function BattenPage() {
  return (
    <>
      <PageHeader
        title="Our Playbook"
        description="How we get your team up and running with AI."
      />

      {/* The Problem */}
      <section className="bg-slate-50 py-10">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <div className="border-l-4 border-primary pl-8">
              <p className="text-lg leading-relaxed text-slate-700">
                Your team is small. There&apos;s no dedicated IT person. The
                founder is doing sales, ops, and hiring at the same time. Nobody
                has 40 hours to evaluate AI tools, figure out which ones
                actually fit, and train the rest of the team.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-700">
                So people try ChatGPT a few times and move on. The real
                productivity gains never happen.
              </p>
              <p className="mt-4 text-lg font-semibold text-slate-900">
                That&apos;s what we fix.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Phased Timeline */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <h2 className="mb-4 text-center text-3xl font-semibold">
              How It Works
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-slate-700">
              One engagement. Four phases. Your team goes from &quot;we should
              probably use AI&quot; to actually using it.
            </p>
          </AnimatedSection>
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-3 top-6 bottom-6 w-px bg-slate-200" />

            <div className="space-y-0">
              {phases.map((phase, i) => {
                const borderColors = [
                  "border-l-slate-300",
                  "border-l-slate-400",
                  "border-l-slate-500",
                  "border-l-slate-700",
                ]
                return (
                  <AnimatedSection key={phase.number} delay={i * 0.1}>
                    <div className="relative flex items-start gap-5 py-5">
                      {/* Timeline dot */}
                      <div className="relative z-10 mt-1 h-[7px] w-[7px] shrink-0 rounded-full bg-slate-400" />
                      {/* Card */}
                      <div className={`border-l-4 ${borderColors[i]} pl-5`}>
                        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                          {phase.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-slate-50 py-10">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <h2 className="mb-6 text-center text-3xl font-semibold">
              What You Get
            </h2>
            <div className="mx-auto max-w-2xl">
              <ul className="space-y-3">
                {deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-slate-700"
                  >
                    <Check
                      size={20}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <h2 className="mb-6 text-center text-3xl font-semibold">
              Who We Are
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold">Logan Day</h3>
                <p className="mt-1 text-sm text-primary">Darden MBA</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Builds AI tools and automation daily. Wrote a 4-level training
                  curriculum from real deployments. Has trained teams from
                  skeptical to self-sufficient in under 3 months.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold">Matt Horrigan</h3>
                <p className="mt-1 text-sm text-primary">Darden MBA</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Strategy and finance background. Builds the business case for
                  AI adoption and identifies where automation delivers the most
                  leverage across your operations.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing anchor */}
      <section className="bg-slate-50 py-8">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-lg text-slate-700">
            Engagements start at <span className="font-semibold">$5,000</span>.
          </p>
        </div>
      </section>

      <CTASection
        heading="Let's Talk"
        description="30 minutes. We'll learn how your team works and show you where AI fits."
        secondaryLabel="See our full services page"
        secondaryHref="/services"
      />
    </>
  )
}
