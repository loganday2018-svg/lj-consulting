import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { CTASection } from "@/components/marketing/cta-section"
import { getRelatedPosts } from "@/lib/blog"
import {
  BlogShell,
  BlogDivider,
  BlogHeading,
  PullQuote,
  AccentPill,
  AccentBox,
  AccentCode,
  TldrCard,
} from "@/components/marketing/blog-shell"

export const metadata: Metadata = {
  title: "Claude Power-User Tips: Plugins, Auto Mode & Scheduled Tasks",
  description:
    "Three features that turn Claude from a chatbot into a workflow engine for PE-backed portfolio companies.",
}

export default function BlogPost() {
  const related = getRelatedPosts("claude-power-user-tips")

  return (
    <>
      <BlogShell>
        <article className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
            >
              <ArrowLeft size={14} />
              Back to Blog
            </Link>

            <div className="mt-8">
              <div className="flex items-center gap-3 text-sm">
                <AccentPill>AI Tips</AccentPill>
                <span className="text-slate-400">|</span>
                <time className="text-slate-500">March 30, 2026</time>
                <span className="text-slate-400">|</span>
                <span className="text-slate-500">6 min read</span>
              </div>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Claude Power-User Tips: Plugins, Auto Mode & Scheduled Tasks
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-700">
                Most teams use Claude like a search engine with better grammar.
                Ask a question, get an answer, repeat. That&apos;s fine for
                starters, but you&apos;re leaving about 90% of the tool on the
                table. Here are three features that turn Claude from
                &quot;helpful chatbot&quot; into &quot;how did we work without
                this?&quot;
              </p>
            </div>

            <TldrCard
              items={[
                "Plugins give your team domain-specific slash commands -- finance, ops, marketing -- zero prompt engineering needed.",
                "Auto Mode lets Claude run multi-step tasks end-to-end instead of asking permission at every click.",
                "Scheduled Tasks automate the stuff you forget -- morning inbox reviews, daily KPI summaries, follow-up nudges.",
              ]}
            />

            <BlogDivider />

            {/* Plugins */}
            <section className="space-y-4">
              <BlogHeading>
                Plugins: Instant Domain Expertise
              </BlogHeading>
              <p className="leading-relaxed text-slate-700">
                Here&apos;s the thing about plugins: they&apos;re basically
                cheat codes. Type{" "}
                <AccentCode>
                  /
                </AccentCode>{" "}
                in Claude Cowork and you get role-specific commands that
                already know how your function works. No setup. No prompt
                engineering. Just go.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-5">
                  <p className="font-semibold text-foreground">Finance</p>
                  <p className="mt-1 text-sm text-slate-600">
                    SOX testing, close management, reconciliations, journal
                    entries. Your accounting team gets compliance-grade AI
                    support without anyone writing a single prompt from scratch.
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-5">
                  <p className="font-semibold text-foreground">Operations</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Process automation for warehouse and distribution. If your
                    portcos move physical product, this is where you&apos;ll
                    feel it first.
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-5">
                  <p className="font-semibold text-foreground">Marketing</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Campaign planning, content drafting, calendar management.
                    Your brand team stops staring at blank pages.
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-5">
                  <p className="font-semibold text-foreground">Productivity</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Task tracking and memory across sessions. Claude actually
                    remembers what you were working on yesterday.
                  </p>
                </div>
              </div>

              <p className="leading-relaxed text-slate-700">
                <strong>To install:</strong>{" "}Sidebar &rarr; Customize &rarr;
                Browse Plugins. One click. Done.
              </p>

              <PullQuote>
                Your teams don&apos;t need prompt engineering skills. They type
                / and get structured, domain-specific output. That&apos;s the
                whole ballgame.
              </PullQuote>
            </section>

            <BlogDivider />

            {/* Auto Mode */}
            <section className="space-y-4">
              <BlogHeading>
                Auto Mode: Stop Clicking &quot;Approve&quot; Every 30 Seconds
              </BlogHeading>
              <p className="leading-relaxed text-slate-700">
                By default, Claude asks permission at every single step. Which
                is great for trust-building, but terrible for getting things
                done. Auto Mode fixes this. Multi-step tasks run end-to-end. If
                Claude hits something risky, it&apos;ll stop and ask — but for
                the safe stuff, it just goes.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <AccentBox label="Auto-approved">
                  <ul className="mt-1 space-y-1 text-sm text-slate-700">
                    <li>File edits in your workspace</li>
                    <li>Web searches (read-only)</li>
                    <li>Reading uploaded documents</li>
                    <li>Installing dependencies</li>
                    <li>Generating reports and presentations</li>
                  </ul>
                </AccentBox>
                <div className="rounded-lg border border-slate-200 bg-white p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                    Always blocked
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-slate-700">
                    <li>External scripts</li>
                    <li>Sending data to outside endpoints</li>
                    <li>Production deployments</li>
                    <li>Mass deletions</li>
                    <li>Permission changes</li>
                  </ul>
                </div>
              </div>

              <PullQuote>
                Picture your finance team&apos;s month-end close. Claude builds
                the variance report, pulls supporting data, and formats the
                commentary while you grab coffee.
              </PullQuote>

              <p className="leading-relaxed text-slate-700">
                <strong>How to turn it on:</strong>{" "}Click the mode selector next
                to Send &rarr; choose Auto. Your admin needs to enable it for
                the team first, so bug them about it.
              </p>
            </section>

            <BlogDivider />

            {/* Scheduled Tasks */}
            <section className="space-y-4">
              <BlogHeading>
                Scheduled Tasks: Set It and (Actually) Forget It
              </BlogHeading>
              <p className="leading-relaxed text-slate-700">
                You know those things you tell yourself you&apos;ll do every
                morning? Check the inbox, summarize the KPIs, send the
                follow-up? Claude can just... do those. Automatically. On a
                schedule.
              </p>

              <div className="space-y-3">
                <AccentBox>
                  <p className="font-semibold text-foreground">
                    Morning Inbox Review
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    &quot;Every weekday at 9am, summarize anything that needs my
                    attention.&quot;
                  </p>
                </AccentBox>
                <AccentBox>
                  <p className="font-semibold text-foreground">
                    Daily KPI Summary
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    &quot;End of each day, pull KPIs from these reports and flag
                    anything off-track.&quot;
                  </p>
                </AccentBox>
                <AccentBox>
                  <p className="font-semibold text-foreground">
                    Follow-Up Nudge
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    &quot;Friday at 2pm, remind me to follow up on the Q2
                    contract.&quot;
                  </p>
                </AccentBox>
              </div>

              <p className="leading-relaxed text-slate-700">
                You can run tasks hourly, daily, weekly, weekdays, or on-demand.
                If your laptop was asleep and a task got skipped, it
                auto-runs when you come back. Available on all paid plans.
              </p>
              <p className="leading-relaxed text-slate-700">
                <strong>To set up:</strong>{" "}Sidebar &rarr; Scheduled &rarr; +
                New task. Or just type{" "}
                <AccentCode>
                  /schedule
                </AccentCode>{" "}
                in chat.
              </p>

              <PullQuote>
                Imagine every portfolio company GM getting an automated daily
                KPI summary with exceptions flagged. No dashboard build. No
                analyst hire.
              </PullQuote>
            </section>

            <BlogDivider />

            <section className="space-y-4">
              <BlogHeading>Quick Reference</BlogHeading>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left">
                      <th className="pb-3 pr-4 font-semibold text-foreground">
                        What You Want
                      </th>
                      <th className="pb-3 pr-4 font-semibold text-foreground">
                        How to Do It
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600">
                    <tr className="border-b border-slate-100">
                      <td className="py-3 pr-4">Install a plugin</td>
                      <td className="py-3 pr-4">
                        Sidebar &rarr; Customize &rarr; Browse Plugins
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 pr-4">Use a plugin</td>
                      <td className="py-3 pr-4">
                        Type / in chat or just ask naturally
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 pr-4">Turn on Auto Mode</td>
                      <td className="py-3 pr-4">
                        Mode selector next to Send &rarr; Auto
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 pr-4">Schedule a task</td>
                      <td className="py-3 pr-4">
                        Sidebar &rarr; Scheduled &rarr; + New task
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Set a one-time reminder</td>
                      <td className="py-3 pr-4">
                        &quot;Remind me at 3pm to send the report&quot;
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Author */}
            <div className="mt-12 flex items-center gap-4 border-t border-slate-200 pt-8">
              <Image
                src="/images/logan.jpg"
                alt="Logan Day"
                width={48}
                height={48}
                className="rounded-full object-cover object-top"
              />
              <div>
                <p className="font-semibold text-foreground">Logan Day</p>
                <p className="text-sm text-slate-500">
                  Co-founder, Rubicon. MBA from UVA Darden.
                </p>
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="mt-12 border-t border-slate-200 pt-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Keep Reading
                </p>
                {related.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group mt-4 block rounded-lg border border-slate-200 p-6 transition-all hover:border-primary/40 hover:shadow-md"
                  >
                    <p className="font-semibold text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {post.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read more
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </article>
      </BlogShell>

      <CTASection
        heading="Want Us to Set This Up for Your Team?"
        description="We deploy these tools across PE portfolio companies and train teams to actually use them."
      />
    </>
  )
}
