import type { Metadata } from "next"
import { GraduationCap, Terminal, Headphones, Workflow } from "lucide-react"
import { ServiceCard } from "@/components/marketing/service-card"
import { CTASection } from "@/components/marketing/cta-section"

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI training, tool setup, retainer support, and custom automation for PE-backed portfolio companies.",
}

const services = [
  {
    icon: <GraduationCap size={32} />,
    title: "AI Training Programs",
    description:
      "Hands-on training that gets your teams productive with AI tools in days. We teach real workflows, not theory -- from prompt engineering to building custom automations.",
    scope: [
      "Team-wide prompt engineering workshops",
      "Tool-specific training (Claude, Codex, Copilot, Cursor)",
      "Custom workflow development sessions",
      "Recorded sessions for onboarding new hires",
    ],
    timeline: "1-2 weeks per program",
  },
  {
    icon: <Terminal size={32} />,
    title: "Claude Code & Codex Setup",
    description:
      "We configure and deploy AI coding assistants across your engineering teams. Proper setup means 2-3x faster development from day one.",
    scope: [
      "Environment configuration and API key management",
      "Custom instruction files and coding standards integration",
      "Team onboarding and best practices documentation",
      "IDE and workflow integration (VS Code, Cursor)",
    ],
    timeline: "2-4 weeks",
  },
  {
    icon: <Headphones size={32} />,
    title: "Ongoing Retainer Support",
    description:
      "A dedicated AI implementation partner on call. We handle troubleshooting, new tool rollouts, and continuous optimization so your teams stay productive.",
    scope: [
      "Dedicated Slack/Teams channel for AI support",
      "Monthly tool audits and optimization reviews",
      "New feature rollout planning and execution",
      "Priority response for production issues",
    ],
    timeline: "Ongoing monthly",
  },
  {
    icon: <Workflow size={32} />,
    title: "Custom AI Automation",
    description:
      "We build AI-powered automations that eliminate manual work across your portfolio companies. From document processing to reporting pipelines.",
    scope: [
      "Workflow analysis and automation opportunity mapping",
      "Custom Claude/GPT-powered automation builds",
      "Integration with existing tools (Excel, Salesforce, ERP)",
      "Monitoring, maintenance, and iteration",
    ],
    timeline: "4-8 weeks per automation",
  },
]

const steps = [
  {
    number: 1,
    title: "Discovery Call",
    description:
      "30-minute call to understand your portfolio companies' needs and identify quick wins.",
  },
  {
    number: 2,
    title: "Scoped Proposal",
    description:
      "Detailed proposal with timeline, deliverables, and investment. No surprises.",
  },
  {
    number: 3,
    title: "Implementation",
    description:
      "Hands-on deployment with your teams. We stay until it's working.",
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="py-16 text-center md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-4xl font-bold md:text-5xl">Our Services</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-700">
            Practical AI implementation tailored to PE-backed portfolio
            companies. Every engagement is scoped to deliver measurable
            operating leverage.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      {/* How We Engage */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-center text-3xl font-semibold">
            How We Engage
          </h2>
          <div className="grid gap-8 text-center md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number}>
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {step.number}
                </div>
                <h3 className="mb-2 font-semibold">{step.title}</h3>
                <p className="text-sm text-slate-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  )
}
