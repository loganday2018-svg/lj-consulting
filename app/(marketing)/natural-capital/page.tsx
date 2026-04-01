import type { Metadata } from "next"
import Link from "next/link"
import { Download } from "lucide-react"

export const metadata: Metadata = {
  title: "L&J AI Consulting × Natural Capital",
  description:
    "Turning AI into EBITDA for Natural Capital's portfolio companies.",
}

const SERVICES = [
  {
    title: "Sales",
    items: [
      "Prospect research automation",
      "Proposal generation",
      "Territory mapping & CRM optimization",
    ],
  },
  {
    title: "Finance",
    items: [
      "Variance analysis & DCF modeling",
      "Month-end close acceleration",
      "Automated reporting & dashboards",
    ],
  },
  {
    title: "Operations",
    items: [
      "Contract review & extraction",
      "Data transformation pipelines",
      "Cost benchmarking",
    ],
  },
  {
    title: "M&A / Procurement",
    items: [
      "Target screening & diligence",
      "Portfolio-wide synergy ID",
      "Contract analysis at scale",
    ],
  },
]

const TIERS = [
  {
    label: "Conservative",
    savings: "$600K",
    ev: "$10M",
    desc: "Basic workflow automation across 2\u20133 functions",
  },
  {
    label: "Moderate",
    savings: "$2.5M",
    ev: "$33M",
    desc: "Cross-functional deployment with process redesign",
  },
  {
    label: "Aggressive",
    savings: "$4.8M",
    ev: "$62M",
    desc: "Full-scale AI integration across the organization",
  },
]

export default function NaturalCapitalPage() {
  return (
    <div className="bg-[#F5F0E8] text-[#2c2c2c]">
      {/* SLIDE 1: HERO */}
      <section className="min-h-[80vh] flex flex-col justify-center px-6 md:px-16 py-20">
        <div className="max-w-5xl">
          <div className="bg-[#2c2c2c] rounded-xl p-8 md:p-12 mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              L&J AI Consulting
            </h1>
            <p className="mt-3 text-lg md:text-xl text-[#8A9E8A] font-light">
              Turning AI into EBITDA for Portfolio Companies
            </p>
          </div>
          <div className="w-16 h-[3px] bg-[#5A6E5A] mb-6" />
          <p className="text-xl text-[#2c2c2c]">Prepared for Natural Capital</p>
          <p className="text-base text-[#6b6b6b] mt-1">
            AI Implementation & Automation for the Heartland
          </p>
        </div>
      </section>

      {/* SLIDE 2: THE OPPORTUNITY */}
      <section className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-5xl">
          <div className="bg-[#2c2c2c] rounded-xl px-8 py-5 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              The Opportunity
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <h3 className="text-xl font-semibold mb-4">The Problem</h3>
              <div className="space-y-4 text-[#444] leading-relaxed">
                <p>
                  AI tools are evolving faster than most companies can keep up.
                </p>
                <p>
                  Portfolio companies want to adopt AI &mdash; but lack the
                  bandwidth, expertise, and structure to do it effectively.
                </p>
                <p>
                  Most AI initiatives stall at the pilot stage. Tools get
                  purchased but never embedded into daily workflows.
                </p>
                <p>
                  The result: wasted spend, frustrated teams, and missed margin
                  improvement.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#5A6E5A] mb-4">
                Our Solution
              </h3>
              <div className="space-y-4 text-[#444] leading-relaxed">
                <p>
                  We deploy AI tools directly into portfolio company workflows
                  &mdash; and stick around to make sure they actually get used.
                </p>
                <p className="font-semibold text-[#2c2c2c] text-lg">
                  Implementation in weeks, not quarters.
                </p>
                <p>
                  We reduce the typical 9&ndash;12 month adoption curve to weeks
                  through structured implementation, hands-on training, and
                  post-launch support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 3: WHAT WE DO */}
      <section className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-5xl">
          <div className="bg-[#2c2c2c] rounded-xl px-8 py-5 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              What We Do
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-[#2c2c2c] rounded-xl p-6 min-h-[240px]"
              >
                <h4 className="text-white font-semibold text-lg mb-3">
                  {s.title}
                </h4>
                <div className="w-10 h-[2px] bg-[#5A6E5A] mb-4" />
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="text-[#bbb] text-sm leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE 4: CASE STUDY */}
      <section className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-5xl">
          <div className="bg-[#2c2c2c] rounded-xl px-8 py-5 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              In Practice: A Real-World Example
            </h2>
          </div>
          <div className="bg-[#2c2c2c] rounded-xl p-8 md:p-10 grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-white text-2xl font-bold">
                Randy&apos;s Worldwide
              </h3>
              <p className="text-[#8A9E8A] text-sm mt-1 mb-6">
                Mid-market consumer products company
              </p>
              <h4 className="text-white font-semibold mb-3">What we did:</h4>
              <ul className="space-y-2">
                {[
                  "Built an executive KPI dashboard from raw financial data",
                  "Deployed Claude across leadership for weekly AI-powered updates",
                  "Trained C-suite (COO, CFO, VP Procurement) on hands-on AI usage",
                  "Created automated P&L analysis with exec summaries",
                  "Surfaced insights from unstructured internal data",
                ].map((item) => (
                  <li key={item} className="text-[#bbb] text-sm leading-relaxed">
                    <span className="text-[#5A6E5A] mr-2">&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white text-2xl font-bold mb-6">Results</h3>
              <ul className="space-y-4">
                {[
                  "COO independently building AI-powered financial analyses within weeks",
                  "AI adoption spread organically across departments \u2014 HR, Finance, Product Dev",
                  "Leadership went from skeptical to self-sufficient in under 3 months",
                ].map((item) => (
                  <li key={item} className="text-[#bbb] text-sm leading-relaxed">
                    <span className="text-[#5A6E5A] mr-2">&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[#8A9E8A] italic font-medium text-base">
                &ldquo;I am really excited about what I just whipped
                together&rdquo; &mdash; COO
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 5: EBITDA IMPACT */}
      <section className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-5xl">
          <div className="bg-[#2c2c2c] rounded-xl px-8 py-5 mb-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Potential EBITDA Impact
            </h2>
          </div>
          <p className="text-[#6b6b6b] text-sm mb-8">
            Illustrative impact for a $100M revenue portfolio company
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {TIERS.map((t) => (
              <div
                key={t.label}
                className="bg-[#2c2c2c] rounded-xl p-8 text-center"
              >
                <h4 className="text-[#8A9E8A] font-semibold text-lg mb-3">
                  {t.label}
                </h4>
                <div className="w-[60%] h-[2px] bg-[#5A6E5A] mx-auto mb-6" />
                <p className="text-[#6b6b6b] text-xs uppercase tracking-widest">
                  Annual Cost Savings
                </p>
                <p className="text-white text-3xl font-bold mt-1 mb-5">
                  {t.savings}
                </p>
                <p className="text-[#6b6b6b] text-xs uppercase tracking-widest">
                  Enterprise Value Impact
                </p>
                <p className="text-white text-3xl font-bold mt-1 mb-4">
                  {t.ev}
                </p>
                <p className="text-[#bbb] text-sm">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE 6: CTA */}
      <section className="bg-[#2c2c2c] px-6 md:px-16 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Let&apos;s Talk
          </h2>
          <div className="w-16 h-[3px] bg-[#5A6E5A] mx-auto mb-8" />
          <p className="text-[#bbb] text-lg leading-relaxed">
            We&apos;d love to explore how AI can drive real value across your
            portfolio.
          </p>
          <p className="text-[#bbb] text-lg leading-relaxed mt-1">
            A 30-minute discovery call is all it takes to identify quick wins.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="text-white text-lg font-semibold border-b-2 border-[#5A6E5A] pb-1 hover:text-[#8A9E8A] transition-colors"
            >
              lj-consulting.vercel.app
            </Link>
            <a
              href="/LJ_Consulting_x_Natural_Capital.pptx"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-[#5A6E5A] px-5 py-2.5 text-white text-sm font-medium hover:bg-[#4a5e4a] transition-colors"
            >
              <Download className="h-4 w-4" />
              Download PowerPoint
            </a>
          </div>
          <p className="text-[#6b6b6b] mt-8">
            Logan Day &nbsp;&bull;&nbsp; James McManus
          </p>
        </div>
      </section>
    </div>
  )
}
