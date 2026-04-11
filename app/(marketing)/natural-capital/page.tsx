import type { Metadata } from "next"
import Link from "next/link"
import { Download } from "lucide-react"

export const metadata: Metadata = {
  title: "Rubicon × Natural Capital",
  description:
    "Turning AI into EBITDA for Natural Capital's portfolio companies.",
}

export default function NaturalCapitalPage() {
  return (
    <div className="bg-[#F5F0E8] text-[#2c2c2c]">
      {/* HERO */}
      <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-16 py-20">
        <div className="max-w-4xl">
          <div className="bg-[#2c2c2c] rounded-xl p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Turn AI into EBITDA.
            </h1>
            <p className="mt-4 text-[#8A9E8A] text-lg">
              For Natural Capital&apos;s portfolio.
            </p>
          </div>
        </div>
      </section>

      {/* THE PITCH */}
      <section className="px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="text-2xl md:text-3xl leading-relaxed text-[#2c2c2c]">
            Your portcos are using chat. They&apos;re missing most of the opportunity.
          </p>
          <p className="mt-6 text-xl font-semibold text-[#5A6E5A]">
            We fix that. Weeks, not quarters.
          </p>
        </div>
      </section>

      {/* YOUR PORTFOLIO */}
      <section className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Your portfolio. Some questions.
          </h2>
          <p className="text-[#444] text-lg mb-10">
            We looked at your operating companies. These are the patterns
            we see in companies at this stage.
          </p>
          <div className="space-y-4">

            <div className="bg-[#2c2c2c] rounded-xl p-8">
              <h3 className="text-white text-xl font-bold">Dispatch</h3>
              <p className="text-[#8A9E8A] text-sm mt-1 mb-4">
                AI-powered last-mile delivery &bull; Minneapolis
              </p>
              <p className="text-[#bbb] text-sm leading-relaxed">
                How much of driver-to-route matching still involves manual
                decisions? Are customer delivery updates and exception
                handling eating ops bandwidth? Is anyone building internal
                dashboards and alerts, or is the team still living in
                spreadsheets?
              </p>
            </div>

            <div className="bg-[#2c2c2c] rounded-xl p-8">
              <h3 className="text-white text-xl font-bold">Vision Integrated Partners</h3>
              <p className="text-[#8A9E8A] text-sm mt-1 mb-4">
                23 ophthalmology practices &bull; 56 locations &bull; 12 surgery centers
              </p>
              <p className="text-[#bbb] text-sm leading-relaxed">
                How many hours per week do staff spend on insurance verification
                and prior auth across 56 locations? Is cross-location financial
                reporting still a manual consolidation exercise? Could clinical
                note summarization and patient follow-up be handled faster?
              </p>
            </div>

            <div className="bg-[#2c2c2c] rounded-xl p-8">
              <h3 className="text-white text-xl font-bold">The Harvest Group</h3>
              <p className="text-[#8A9E8A] text-sm mt-1 mb-4">
                Omni-channel retail marketing &bull; Rogers, AR
              </p>
              <p className="text-[#bbb] text-sm leading-relaxed">
                How long does it take to pull, format, and deliver campaign
                reports to clients? Are creative briefs still written from
                scratch, or could performance data generate the first draft?
                What if client-facing dashboards took hours instead of weeks?
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* BRIDGE */}
      <section className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            We&apos;ve done this before.
          </h2>
          <p className="text-lg text-[#444] leading-relaxed">
            We started with Heartland operators who were curious but
            hadn&apos;t had someone show them what&apos;s possible.
          </p>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="px-6 md:px-16 py-8 md:py-12">
        <div className="max-w-4xl">
          <div className="bg-[#2c2c2c] rounded-xl p-8 md:p-10">
            <h3 className="text-white text-2xl font-bold">
              Randy&apos;s Worldwide
            </h3>
            <p className="text-[#8A9E8A] text-sm mt-1 mb-8">
              Consumer products &bull; Multi-department rollout
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-3">
                {[
                  "KPI dashboard from raw financials",
                  "AI deployed across C-suite — COO, CFO, VP Procurement",
                  "Automated P&L analysis with exec summaries",
                  "Adoption spread organically to HR, Product Dev, Finance",
                ].map((item) => (
                  <li key={item} className="text-[#bbb] text-sm">
                    <span className="text-[#5A6E5A] mr-2">&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div>
                <p className="text-white text-3xl font-bold">&lt; 3 months</p>
                <p className="text-[#6b6b6b] text-sm mt-1">
                  Skeptical to self-sufficient
                </p>
                <p className="mt-6 text-[#8A9E8A] italic">
                  &ldquo;I am really excited about what I just whipped
                  together&rdquo;
                </p>
                <p className="text-[#6b6b6b] text-sm mt-1">&mdash; COO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">
            Who we are
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#2c2c2c] rounded-xl p-8">
              <h3 className="text-white text-xl font-bold">Logan Day</h3>
              <p className="text-[#8A9E8A] text-sm mt-1 mb-4">
                Darden MBA &bull; U.S. Army Captain
              </p>
              <p className="text-[#bbb] text-sm leading-relaxed">
                Finance at Walmart, where I build AI tools for executive
                teams. Built the dashboards and workflows at Randy&apos;s
                Worldwide. We do this because we&apos;re good at it and the
                demand found us.
              </p>
            </div>
            <div className="bg-[#2c2c2c] rounded-xl p-8">
              <h3 className="text-white text-xl font-bold">Matt Horrigan</h3>
              <p className="text-[#8A9E8A] text-sm mt-1 mb-4">
                Darden MBA &bull; Strategy &amp; Finance
              </p>
              <p className="text-[#bbb] text-sm leading-relaxed">
                Strategy and finance at WEX, with corporate strategy
                experience at Comcast. Brings the strategic lens &mdash;
                he sees the portco P&amp;L the way your partners do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">
            How we engage
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Training", detail: "From $5K", sub: "1\u20132 weeks" },
              { name: "Implementation", detail: "From $8K", sub: "2\u20134 weeks" },
              { name: "Retainer", detail: "From $2.5K/mo", sub: "Ongoing" },
              { name: "Workflow Build", detail: "From $15K", sub: "4\u20138 weeks" },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-[#2c2c2c] rounded-xl p-6 text-center"
              >
                <h4 className="text-white font-semibold text-lg">{t.name}</h4>
                <p className="text-[#8A9E8A] text-lg font-bold mt-3">
                  {t.detail}
                </p>
                <p className="text-[#6b6b6b] text-xs mt-1">{t.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2c2c2c] px-6 md:px-16 py-20 md:py-28 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            30 minutes.
          </h2>
          <p className="text-[#6b6b6b] text-lg mt-3">
            That&apos;s all it takes to find the quick wins.
          </p>
          <p className="mt-8">
            <a
              href="mailto:logan.day2018@gmail.com"
              className="text-white text-lg font-semibold border-b-2 border-[#5A6E5A] pb-1 hover:text-[#8A9E8A] transition-colors"
            >
              logan.day2018@gmail.com
            </a>
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="text-[#8A9E8A] text-sm hover:text-white transition-colors"
            >
              rubiconaiconsulting.com
            </Link>
            <a
              href="/Rubicon_x_Natural_Capital.pptx"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-[#5A6E5A] px-5 py-2.5 text-white text-sm font-medium hover:bg-[#4a5e4a] transition-colors"
            >
              <Download className="h-4 w-4" />
              PowerPoint
            </a>
          </div>
          <p className="text-[#6b6b6b] mt-8 text-sm">
            Logan Day &nbsp;&bull;&nbsp; Matt Horrigan
          </p>
        </div>
      </section>
    </div>
  )
}
