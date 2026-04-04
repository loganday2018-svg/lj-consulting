import type { Metadata } from "next"
import { GraduationCap, Compass, Headphones, Workflow, Check } from "lucide-react"
import { ServiceCard } from "@/components/marketing/service-card"
import { CTASection } from "@/components/marketing/cta-section"
import { PageHeader } from "@/components/marketing/page-header"
import { AnimatedSection } from "@/components/marketing/animated-section"
import { AnimatedSteps } from "@/components/marketing/animated-steps"
import { AnimatedServicesGrid } from "@/components/marketing/animated-services-grid"

export const metadata: Metadata = {
  title: "Day Horrigan × Batten Institute",
  description:
    "How Day Horrigan works with Darden-connected startups to deploy AI tools across their teams.",
}

const services = [
  {
    icon: <GraduationCap size={32} />,
    title: "AI Training",
    description:
      "A 4-level curriculum built from real deployments. Your team builds something real on day one with their own data.",
    scope: [
      "Beginner: first project in the first session. Dashboards, reports, slides from raw data",
      "Intermediate: version control, test-driven design, custom agents",
      "Advanced: API integrations, agentic workflows, automation pipelines",
      "Leadership: 60-minute overview for execs. Where the value is, where the risk is, what to budget",
    ],
    timeline: "1-2 weeks",
  },
  {
    icon: <Compass size={32} />,
    title: "Tool Selection & Setup",
    description:
      "Claude, Codex, Copilot, Cursor, Gemini. There are a lot of options. We help you pick the right one and get everyone running.",
    scope: [
      "Recommendation based on your team's workflows and stack",
      "Model selection strategy so you're not overspending on tokens",
      "Hands-on setup for every team member",
    ],
    timeline: "2-4 weeks",
  },
  {
    icon: <Headphones size={32} />,
    title: "Ongoing Support",
    description:
      "AI tools change fast. We stay plugged in so your team doesn't fall behind.",
    scope: [
      "Dedicated Slack or Teams channel",
      "Quick-start calls for new hires",
      "Troubleshooting when updates break existing workflows",
    ],
    timeline: "Monthly",
  },
  {
    icon: <Workflow size={32} />,
    title: "Workflow Acceleration",
    description:
      "We audit where your team spends the most manual time and show them how to collapse it with AI.",
    scope: [
      "Audit of your team's most repetitive work",
      "AI-powered workflows for reports, research, analysis, data pulls",
      "Before-and-after time benchmarks on key tasks",
    ],
    timeline: "4-8 weeks",
  },
]

const steps = [
  {
    number: 1,
    title: "Discovery Call",
    description:
      "30 minutes. We learn how your team works, where the bottlenecks are, and which AI tools make sense.",
  },
  {
    number: 2,
    title: "Tool Setup & Training",
    description:
      "We pick the right tools, set them up, and run hands-on sessions with your team using their real data.",
  },
  {
    number: 3,
    title: "Support & Iteration",
    description:
      "We stick around. Check-ins, troubleshooting, and new workflows as your team finds more uses on their own.",
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
        title="Day Horrigan × Batten Institute"
        description="A playbook for deploying AI tools at Darden-connected startups."
      />

      {/* Darden Connection */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <div className="border-l-4 border-primary pl-8">
              <h2 className="mb-6 text-3xl font-semibold">Why Batten?</h2>
              <p className="mb-4 leading-relaxed text-slate-700">
                We&apos;re both Darden MBAs. We built this practice because we
                adopted AI tools early and saw the impact firsthand. Now we want
                to bring that to the Darden startup community.
              </p>
              <p className="leading-relaxed text-slate-700">
                We&apos;re looking to work with Batten-connected startups to
                help their teams get up and running with AI. In exchange, we get
                reps and real case studies. The startups get a team that actually
                knows how to deploy this stuff.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <h2 className="mb-6 text-center text-3xl font-semibold">
              The Problem
            </h2>
            <p className="mx-auto max-w-2xl text-center leading-relaxed text-slate-700">
              Most startups know AI matters. But the team is already stretched
              thin, and nobody has time to evaluate tools, figure out
              integrations, and train everyone. So people try ChatGPT a few
              times and move on. The real productivity gains never happen.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <h2 className="mb-4 text-center text-3xl font-semibold">
              What We Do
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-slate-700">
              Four services. Each one scoped and priced for where your team is
              right now.
            </p>
          </AnimatedSection>
          <AnimatedServicesGrid>
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </AnimatedServicesGrid>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-center text-3xl font-semibold">
            How an Engagement Works
          </h2>
          <AnimatedSteps steps={steps} />
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <h2 className="mb-8 text-center text-3xl font-semibold">
              What Your Startup Gets
            </h2>
            <div className="mx-auto max-w-2xl">
              <ul className="space-y-4">
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
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <h2 className="mb-8 text-center text-3xl font-semibold">
              Who We Are
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold">Logan Day</h3>
                <p className="mt-1 text-sm text-primary">
                  Darden MBA &bull; U.S. Army Captain &bull; Walmart FLDP
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Finance at Walmart, where he builds AI tools and automation
                  for executive teams. Duke undergrad. Started using Claude Code
                  and AI tooling before anyone asked him to, saw the productivity
                  impact, and hasn&apos;t stopped since.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold">Matt Horrigan</h3>
                <p className="mt-1 text-sm text-primary">
                  Darden MBA &bull; Strategy &amp; Finance &bull; WEX
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Strategy and finance at WEX, with corporate strategy
                  experience at Comcast. Concentrations in Strategy Consulting,
                  Corporate Finance, Asset Management, and Business Analytics.
                  Sees the business case before the technology.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <div className="rounded-lg border border-primary/20 bg-primary/[0.03] p-8 text-center">
              <h2 className="text-2xl font-semibold">Flexible Pricing</h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-700">
                We&apos;re building this practice and want to work with
                early-stage teams. If your startup is connected to Batten,
                let&apos;s talk about what fits your budget.
              </p>
            </div>
          </AnimatedSection>
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
