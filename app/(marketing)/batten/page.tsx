import type { Metadata } from "next"
import Image from "next/image"
import { Check } from "lucide-react"
import { CTASection } from "@/components/marketing/cta-section"
import { PageHeader } from "@/components/marketing/page-header"
import { AnimatedSection } from "@/components/marketing/animated-section"
import { AnimatedSteps } from "@/components/marketing/animated-steps"
import { ScrollTimeline } from "@/components/marketing/scroll-timeline"

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
      "We set up Claude Code, Cowork, or Codex for your team and run the first hands-on session. Your team builds something real with their own data on day one. Not a chatbot demo. An actual tool they built themselves.",
  },
  {
    number: 3,
    title: "Weeks 2-3: Training & Workflows",
    description:
      "Deeper sessions tailored to each role. Custom agents for recurring tasks, automated pipelines, and internal tools your team builds themselves. This is where people stop thinking of AI as a chatbot.",
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
      <section className="bg-white py-10">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <div className="border-l-4 border-primary pl-8">
              <p className="text-lg leading-relaxed text-slate-700">
                Asking ChatGPT a question is not AI adoption.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-700">
                Claude Code, Cowork, and Codex build things. Dashboards
                from raw data. Automated reports. Custom internal tools.
                Your team doesn&apos;t need to know how to code. They need
                someone to show them what&apos;s possible.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-700">
                You couldn&apos;t run your business without Excel. You
                won&apos;t be able to compete without AI.
              </p>
              <p className="mt-4 text-lg font-semibold text-slate-900">
                We get your team there.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Phased Timeline */}
      <section className="bg-slate-50 py-10">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <h2 className="mb-4 text-center text-3xl font-semibold">
              How It Works
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-slate-700">
              One engagement. Four phases. From zero to productive.
            </p>
          </AnimatedSection>
        </div>
        <ScrollTimeline phases={phases} />
      </section>

      {/* What You Get */}
      <section className="bg-white py-10">
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
      <section className="bg-slate-50 py-10">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <h2 className="mb-6 text-center text-3xl font-semibold">
              Who We Are
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-6 text-center">
                <Image
                  src="/images/logan.jpg"
                  alt="Logan Day"
                  width={120}
                  height={120}
                  className="mx-auto rounded-full object-cover"
                />
                <h3 className="mt-4 text-lg font-semibold">Logan Day</h3>
                <p className="mt-1 text-sm text-primary">Darden MBA</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Builds AI tools daily. Created a training curriculum from
                  real deployments. Gets teams productive in under 3 months.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-6 text-center">
                <Image
                  src="/images/matt.jpg"
                  alt="Matt Horrigan"
                  width={120}
                  height={120}
                  className="mx-auto rounded-full object-cover"
                />
                <h3 className="mt-4 text-lg font-semibold">Matt Horrigan</h3>
                <p className="mt-1 text-sm text-primary">Darden MBA</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Strategy and finance. Builds the business case for AI
                  adoption and finds where automation delivers the most leverage.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing anchor */}
      <section className="bg-white py-8">
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
