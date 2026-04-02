import type { Metadata } from "next"
import { BRAND } from "@/lib/constants"
import { TeamMember } from "@/components/marketing/team-member"
import { CTASection } from "@/components/marketing/cta-section"
import { PageHeader } from "@/components/marketing/page-header"
import { AnimatedSection } from "@/components/marketing/animated-section"
import { AnimatedTeam } from "@/components/marketing/animated-team"

export const metadata: Metadata = {
  title: "About",
  description: `Meet Logan & James. Two operators who got obsessed with AI tools and now help PE-backed portfolio companies do the same.`,
}

const team = [
  {
    name: "Logan Day",
    title: "Co-Founder",
    credentials: [
      "MBA - UVA Darden School of Business",
      "Walmart Finance Leadership Development Program",
      "U.S. Army Captain (Reserve)",
    ],
    bio: "Logan brings an operator's mindset to every AI engagement. Built through a career that spans the U.S. Army, Fortune 1 finance, and the Darden MBA program at UVA.\n\nAs a Company Commander in the Army Reserve, he learned to execute under pressure with limited resources. A skillset that translates directly to fast-moving portfolio company environments. At Walmart's Finance Leadership Development Program, he works at the intersection of large-scale operations and financial performance, exactly where AI automation delivers the most leverage.\n\nA Duke graduate, Logan adopted Claude Code and AI tooling before anyone told him to, and immediately saw the productivity impact firsthand. He co-founded L&J to give every PE-backed operator access to the same edge.",
    initials: "LD",
    imageSrc: "/images/logan.jpg",
    linkedIn: "https://linkedin.com/in/loganday1",
  },
  {
    name: "James McManus",
    title: "Co-Founder",
    credentials: [
      "MBA - Kellogg School of Management (Northwestern)",
      "Walmart, Finance & Operations",
      "AI Implementation Specialist",
    ],
    bio: "James brings a rare combination of Fortune 500 operational rigor and top-tier academic training to every engagement. An MBA graduate from Northwestern's Kellogg School of Management, where he graduated Summa Cum Laude and ranked in the top 10% of his class.\n\nAt Walmart, he works across finance and operations, giving him firsthand insight into the process inefficiencies that AI tools eliminate fastest.\n\nHe specializes in identifying high-leverage automation opportunities and building the business case that gets PE partners and portfolio operators aligned.",
    initials: "JM",
    imageSrc: "/images/james.jpg",
    linkedIn: "https://linkedin.com/in/james-mcmanus06",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        description="We're operators, not theorists. Every recommendation we make comes from tools we use ourselves, every day."
      />

      {/* Why We Exist — with left accent bar */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <div className="border-l-4 border-primary pl-8">
              <h2 className="mb-6 text-3xl font-semibold">Why We Exist</h2>
              <p className="mb-4 leading-relaxed text-slate-700">
                PE-backed portfolio companies are under constant pressure to do more
                with less. AI tools like Claude, Codex, and Copilot can deliver that
                leverage. But only if they&apos;re actually adopted by real teams
                doing real work. Most AI initiatives die in the pilot stage because
                they&apos;re led by people who&apos;ve never used the tools
                themselves.
              </p>
              <p className="mb-4 leading-relaxed text-slate-700">
                We started {BRAND.name} because we saw the gap firsthand. As
                operators at a Fortune 1 company, we adopted AI tools before anyone
                asked us to. And watched our own productivity transform. Now we
                help other portfolio companies do the same thing, without the
                six-month consulting engagement or the 50-slide deck that gathers
                dust.
              </p>
              <p className="leading-relaxed text-slate-700">
                Our approach is simple: we show up, we set up the tools, we train
                your teams, and we stay until it&apos;s working. No theory, no
                frameworks, no jargon. Just working AI tools in the hands of the
                people who need them.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-12 text-center text-3xl font-semibold">
            Meet the Team
          </h2>
          <AnimatedTeam>
            {team.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </AnimatedTeam>
        </div>
      </section>

      <CTASection
        heading="Want to Work With Us?"
        description="Pick a portfolio company. We'll analyze it live on the call and show you where AI moves the needle."
        secondaryLabel="See what we do →"
        secondaryHref="/services"
      />
    </>
  )
}
