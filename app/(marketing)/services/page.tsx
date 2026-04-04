import type { Metadata } from "next"
import { GraduationCap, Compass, Headphones, Workflow } from "lucide-react"
import { ServiceCard } from "@/components/marketing/service-card"
import { CTASection } from "@/components/marketing/cta-section"
import { PageHeader } from "@/components/marketing/page-header"
import { AnimatedServicesGrid } from "@/components/marketing/animated-services-grid"
import { AnimatedSteps } from "@/components/marketing/animated-steps"

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI training, tool selection, retainer support, and workflow acceleration for PE-backed portfolio companies.",
}

const services = [
  {
    icon: <GraduationCap size={32} />,
    title: "AI Training Programs",
    description:
      "We build working tools with your data. After that, your team finds new uses on its own.",
    scope: [
      "Hands-on sessions, not slides or lectures",
      "Live build session using your team's actual unstructured data",
      "Custom prompts and workflows tailored to their day-to-day",
      "Recorded walkthroughs for new hire onboarding",
    ],
    timeline: "1-2 weeks per program",
    price: "From $5,000",
  },
  {
    icon: <Compass size={32} />,
    title: "AI Tool Selection & Setup",
    description:
      "Claude Code, Codex, Gemini, Copilot, Cursor. We pick the right one and set up your team.",
    scope: [
      "Guidance on which AI tool fits your team's needs",
      "Hands-on setup and walkthrough for every team member",
      "Team onboarding and best practices docs",
      "Ongoing check-ins to make sure adoption sticks",
    ],
    timeline: "2-4 weeks",
    price: "From $8,000",
  },
  {
    icon: <Headphones size={32} />,
    title: "Ongoing Retainer",
    description:
      "AI tools change fast. We track updates so your team doesn't have to.",
    scope: [
      "Dedicated Slack/Teams channel with your team",
      "We track the AI landscape so your team doesn't have to",
      "Quick-start calls available for new hires at a flat fee",
      "Troubleshooting when updates break existing workflows",
    ],
    timeline: "Ongoing monthly",
    price: "From $2,500/mo",
  },
  {
    icon: <Workflow size={32} />,
    title: "AI-Powered Acceleration",
    description:
      "We find where your team spends the most manual hours and automate it.",
    scope: [
      "Audit of where your team spends the most manual time",
      "AI-powered workflows for reports, research, and analysis",
      "Works with your existing tools: Excel, Salesforce, ERP, whatever you use",
      "Before-and-after time benchmarks so you can see the difference",
    ],
    timeline: "4-8 weeks per engagement",
    price: "From $15,000",
  },
]

const steps = [
  {
    number: 1,
    title: "Free Portfolio Analysis",
    description:
      "Pick a portfolio company. We analyze it live on the call.",
  },
  {
    number: 2,
    title: "Scoped Proposal",
    description:
      "Clear scope, timeline, price. No 50-page deck.",
  },
  {
    number: 3,
    title: "We Show Up and Set It Up",
    description:
      "Hands-on deployment with your teams. We stay until it's working.",
  },
]

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="What We Do"
        description="Every engagement is scoped, priced, and built to get your teams using AI."
      />

      {/* Services Grid */}
      <section className="py-12">
        <AnimatedServicesGrid>
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </AnimatedServicesGrid>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-center text-3xl font-semibold">
            How It Works
          </h2>
          <AnimatedSteps steps={steps} />
        </div>
      </section>

      <CTASection
        heading="Not Sure Which Service Fits?"
        description="Tell us where your team is spending too many hours. We'll show you how to collapse that timeline."
        secondaryLabel="See the EBITDA impact →"
        secondaryHref="/calculator"
      />
    </>
  )
}
