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
      "30-minute call. We map your team's workflows, find the tasks eating the most hours, and identify where agentic tools will hit hardest. You leave with a deployment plan, not a sales pitch.",
  },
  {
    number: 2,
    title: "Week 1: Setup & First Builds",
    description:
      "We deploy Claude Code and Cowork across your team and run a live build session. Your people bring real data and walk out with a working tool they built themselves: a dashboard, a report pipeline, an automated workflow. Not a chatbot demo. Something they can use tomorrow.",
  },
  {
    number: 3,
    title: "Weeks 2-3: Deep Training",
    description:
      "Role-specific sessions where each team builds the tools they actually need. Finance builds automated variance reports. Ops builds vendor analysis pipelines. Sales builds prospect research agents. Custom AI agents that run multi-step tasks autonomously, not one-question-one-answer prompts.",
  },
  {
    number: 4,
    title: "Week 4+: Support & Expansion",
    description:
      "Dedicated Slack channel. Weekly check-ins as your team discovers new use cases. Troubleshooting when tools update. We stay until your team is building on their own, not just using what we set up.",
  },
]

const deliverables = [
  "Every team member building with agentic tools independently",
  "Custom AI agents for your team's highest-volume recurring tasks",
  "Automated pipelines: raw data in, finished deliverables out",
  "Internal tools your team built themselves, not vendor software",
  "Recorded walkthroughs for onboarding future hires",
  "Before-and-after time benchmarks on key workflows",
  "Dedicated support channel with ongoing access to our team",
]

export default function BattenPage() {
  return (
    <>
      <PageHeader
        title="Our Playbook"
        description="We don't teach your team to use a chatbot. We train them to build with agentic AI tools that do real work."
      />

      {/* The Problem */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
              Chatbots answer questions. Agentic tools do the work.
            </h2>
            <p className="text-lg leading-relaxed text-slate-700">
              Most &quot;AI adoption&quot; stops at asking ChatGPT a question and
              copy-pasting the answer. That&apos;s a search engine with better
              grammar. Agentic coding tools are a fundamentally different
              category: they read your data, write code, build tools, and
              execute multi-step workflows autonomously. Your team gives
              instructions. The AI builds dashboards, generates reports,
              analyzes contracts, and automates pipelines. No coding
              required. No copy-paste. No back-and-forth.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              This is the difference between asking &quot;what were our top
              expenses last quarter?&quot; and saying &quot;build me a
              dashboard that tracks expenses by category, flags anomalies,
              and updates automatically from our accounting data.&quot; One
              is a chatbot. The other is a tool your team built in 10
              minutes.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* The Gap */}
      <section className="border-t border-slate-200 bg-slate-50 py-10">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
              Almost nobody has used these tools yet.
            </h2>
            <p className="text-lg leading-relaxed text-slate-700">
              Right now, less than 1% of business teams have touched an
              agentic coding tool. Not because they&apos;re not ready. Because
              they don&apos;t know these tools exist. Most people&apos;s
              mental model of AI is still &quot;type a question, get a
              paragraph back.&quot; They have no idea that the same
              technology can build a full financial dashboard from a
              spreadsheet, write and run code, create internal tools, and
              execute complex workflows end to end.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              That gap is the opportunity. The teams that get trained now
              aren&apos;t just early adopters. They&apos;re operating with
              capabilities their competitors don&apos;t even know are
              possible. By the time everyone else catches on, your team has
              months of compounding experience.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Callout */}
      <section className="bg-primary py-12">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <p className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">
              The companies that figure this out first don&apos;t just
              save time.
              <br />
              They operate at a level their competitors can&apos;t match.
            </p>
            <p className="mt-4 text-lg font-semibold text-slate-300">
              We get your team there in weeks, not quarters.
            </p>
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

      {/* Divider */}
      <div className="flex justify-center bg-white py-6">
        <div className="h-px w-16 bg-primary" />
      </div>

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
