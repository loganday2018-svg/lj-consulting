import type { Metadata } from "next"
import { GraduationCap, Terminal, Headphones, Workflow } from "lucide-react"
import { ServiceCard } from "@/components/marketing/service-card"
import { CTASection } from "@/components/marketing/cta-section"
import { PageHeader } from "@/components/marketing/page-header"
import { AnimatedServicesGrid } from "@/components/marketing/animated-services-grid"
import { AnimatedSteps } from "@/components/marketing/animated-steps"

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
      "We sit with your teams and teach them real workflows — prompt engineering, custom automations, the tools they'll actually use tomorrow. Not a lecture. Not a PDF.",
    scope: [
      "Team-wide prompt engineering workshops",
      "Tool-specific training (Claude, Codex, Copilot, Cursor)",
      "Custom workflow development sessions",
      "Recorded sessions for onboarding new hires",
    ],
    timeline: "1-2 weeks per program",
    price: "From $5,000",
  },
  {
    icon: <Terminal size={32} />,
    title: "Claude Code & Codex Setup",
    description:
      "We configure AI coding assistants for your engineering teams — proper API keys, custom instructions, IDE integration. Set up right means productive from day one.",
    scope: [
      "Environment configuration and API key management",
      "Custom instruction files and coding standards",
      "Team onboarding and best practices docs",
      "IDE and workflow integration (VS Code, Cursor)",
    ],
    timeline: "2-4 weeks",
    price: "From $8,000",
  },
  {
    icon: <Headphones size={32} />,
    title: "Ongoing Retainer",
    description:
      "Stuck on a prompt? New hire needs onboarding? Tool update broke something? We're a Slack message away. Think of us as your AI help desk.",
    scope: [
      "Dedicated Slack/Teams channel for AI support",
      "Monthly tool audits and optimization reviews",
      "New feature rollout planning and execution",
      "Priority response for production issues",
    ],
    timeline: "Ongoing monthly",
    price: "From $2,500/mo",
  },
  {
    icon: <Workflow size={32} />,
    title: "Custom AI Automation",
    description:
      "We find the manual work that's eating your team's time and build AI-powered automations to kill it. Document processing, reporting pipelines, data entry — the boring stuff.",
    scope: [
      "Workflow analysis and automation mapping",
      "Custom Claude/GPT-powered automation builds",
      "Integration with existing tools (Excel, Salesforce, ERP)",
      "Monitoring, maintenance, and iteration",
    ],
    timeline: "4-8 weeks per automation",
    price: "From $15,000",
  },
]

const steps = [
  {
    number: 1,
    title: "Discovery Call",
    description:
      "30 minutes. We learn what your teams do, where they're stuck, and where AI fits.",
  },
  {
    number: 2,
    title: "Scoped Proposal",
    description:
      "Clear deliverables, timeline, and price. No 50-page deck. No surprises.",
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
        description="Every engagement is scoped, priced, and built to get your teams using AI — not talking about it."
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
        heading="Not sure which service fits?"
        description="Tell us what your teams are doing manually. We'll tell you what AI can take off their plate."
      />
    </>
  )
}
