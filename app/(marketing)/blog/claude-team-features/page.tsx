import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { CTASection } from "@/components/marketing/cta-section"
import { getRelatedPosts } from "@/lib/blog"
import { StatCallout } from "@/components/marketing/stat-callout"
import {
  BlogShell,
  BlogDivider,
  BlogHeading,
  PullQuote,
  AccentPill,
  AccentBox,
  AccentDot,
  AccentCode,
  TldrCard,
} from "@/components/marketing/blog-shell"

export const metadata: Metadata = {
  title: "3 Claude Features That 10x Your Team's Output",
  description:
    "Skills, mobile Dispatch, and multi-agent workflows: the features that fundamentally change how PE-backed teams operate.",
}

export default function BlogPost() {
  const related = getRelatedPosts("claude-team-features")

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
                <time className="text-slate-500">March 20, 2026</time>
                <span className="text-slate-400">|</span>
                <span className="text-slate-500">7 min read</span>
              </div>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                3 Claude Features That 10x Your Team&apos;s Output
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-700">
                If you&apos;re still copy-pasting text into Claude and hoping
                for the best, this one&apos;s for you. There are three features
                most people don&apos;t know exist, and they completely
                change what&apos;s possible with your current headcount.
              </p>
            </div>

            <TldrCard
              items={[
                "Skills let you build a prompt once and reuse it forever -- branded decks in 2 minutes, not 2 hours.",
                "Dispatch syncs Claude to your phone so work never stalls waiting for you to get back to your desk.",
                "Multi-agent workflows run tasks in parallel -- 45 minutes of serial work in 10 minutes flat.",
              ]}
            />

            <BlogDivider />

            {/* Skills */}
            <section className="space-y-4">
              <BlogHeading>
                Skills: Build It Once, Use It Forever
              </BlogHeading>
              <p className="leading-relaxed text-slate-700">
                A Skill is a reusable recipe. You teach Claude exactly how to
                produce a specific output (branded slides, formatted reports,
                data analysis), and then anyone on the team can use it. No
                prompt engineering. No &quot;can you make it look like last
                time?&quot; It just works.
              </p>

              <AccentBox label="Real-world example">
                <p className="leading-relaxed text-slate-700">
                  We built a Skill that generates branded PowerPoint decks.
                  Correct logo, accent colors, bullet formatting, footer, page
                  numbers, all automatic. Feed it raw data, get a polished deck
                  back.
                </p>
              </AccentBox>

              <StatCallout
                before="2-4 hours"
                after="~2 minutes"
                label="Time to create an 8-slide branded deck"
                beforeLabel="PowerPoint"
                afterLabel="With Claude"
              />

              <div className="space-y-3">
                <p className="font-semibold text-foreground">
                  Creating a Skill takes about 5 minutes:
                </p>
                <ol className="list-decimal space-y-2 pl-6 text-slate-700">
                  <li>
                    Run{" "}
                    <AccentCode>
                      /skill-creator
                    </AccentCode>
                  </li>
                  <li>
                    Describe what you want: format, style, content structure
                  </li>
                  <li>
                    Claude builds it through conversation. Tweak until
                    it&apos;s exactly right.
                  </li>
                </ol>
              </div>

              <PullQuote>
                Every portfolio company has deliverables that take hours of
                formatting for minutes of actual thinking. Skills kill that
                ratio. Across 8 portcos, we&apos;re talking hundreds of hours
                per quarter back to real work.
              </PullQuote>
            </section>

            <BlogDivider />

            {/* Dispatch */}
            <section className="space-y-4">
              <BlogHeading>
                Dispatch: Your AI Doesn&apos;t Clock Out When You Leave
              </BlogHeading>
              <p className="leading-relaxed text-slate-700">
                Claude Cowork runs on your desktop. Dispatch syncs it to your
                phone. Start a task at your desk, walk away, and keep
                interacting from anywhere. One continuous conversation across
                both devices.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-5">
                  <p className="font-semibold text-foreground">
                    From the road
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Kick off a report from your phone while commuting. Review
                    AI-generated deliverables before you even get to the office.
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-5">
                  <p className="font-semibold text-foreground">
                    Never block the workflow
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Claude has a question? Answer it from your phone. Work
                    keeps moving instead of stalling until you get back to your
                    desk.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-foreground">
                  Setup takes about 2 minutes:
                </p>
                <ol className="list-decimal space-y-2 pl-6 text-slate-700">
                  <li>
                    Make sure Claude Desktop and the mobile app are both
                    up to date
                  </li>
                  <li>
                    In Claude Desktop: Cowork tab &rarr; Dispatch &rarr;
                    &quot;Get started&quot;
                  </li>
                  <li>Toggle on file access and wake settings</li>
                  <li>
                    Open the mobile app — Dispatch shows up automatically
                  </li>
                </ol>
              </div>

              <p className="text-sm text-slate-500">
                One catch: your desktop needs to be awake with Claude open.
                Both apps need to be on the latest version.
              </p>

              <PullQuote>
                For PE operators who spend half their life between portfolio
                companies: start an analysis before a board meeting, review the
                results in the car. Your AI keeps working when you can&apos;t.
              </PullQuote>
            </section>

            <BlogDivider />

            {/* Multi-Agent */}
            <section className="space-y-4">
              <BlogHeading>
                Multi-Agent Workflows: A Team of Analysts, Not Just One
              </BlogHeading>
              <p className="leading-relaxed text-slate-700">
                This is the highest-leverage feature of the three. Instead of
                Claude working through tasks one at a time, multi-agent
                workflows spin up multiple agents in parallel. Each one tackles
                a different piece simultaneously. Think one person doing five
                things sequentially vs. five people doing five things at once.
              </p>

              <AccentBox label="How it actually works">
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <AccentDot />
                    Research + build + QA happening at the same time
                  </li>
                  <li className="flex items-start gap-2">
                    <AccentDot />
                    One agent pulls data while another formats the output
                  </li>
                  <li className="flex items-start gap-2">
                    <AccentDot />
                    A QA agent inspects results with completely fresh eyes
                  </li>
                  <li className="flex items-start gap-2">
                    <AccentDot />
                    Multiple searches and file reads run concurrently
                  </li>
                </ul>
              </AccentBox>

              <AccentBox label="Real example">
                <p className="leading-relaxed text-slate-700">
                  Ask Claude for 5 improvements to a dashboard. It gives you 5
                  recommendations, then launches sub-agents to attack each one
                  simultaneously.
                </p>
              </AccentBox>

              <StatCallout
                before="45 minutes"
                after="10 minutes"
                label="Dashboard improvement workflow"
                beforeLabel="Serial"
                afterLabel="Parallel"
              />

              <PullQuote>
                Due diligence, portfolio reviews, market research. They all
                involve parallel workstreams. Multi-agent workflows let one
                analyst produce the output of a team.
              </PullQuote>
            </section>

            <BlogDivider />

            <section className="space-y-4">
              <BlogHeading>The Bottom Line</BlogHeading>
              <p className="leading-relaxed text-slate-700">
                These aren&apos;t experimental features or things that
                &quot;might be useful someday.&quot; We deploy them at PE
                portfolio companies every week. Skills kill the formatting
                tax. Dispatch means your AI doesn&apos;t stop when you leave
                your desk. Multi-agent workflows compress serial work into
                parallel execution.
              </p>
              <p className="leading-relaxed text-slate-700">
                The teams that adopt these first don&apos;t just save time.
                They get more done with the people they already have. In PE,
                that shows up directly on the P&L.
              </p>
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
        heading="Want Us to Deploy These for Your Team?"
        description="We set up Skills, Dispatch, and multi-agent workflows for PE portfolio companies — then train your teams to actually use them."
      />
    </>
  )
}
