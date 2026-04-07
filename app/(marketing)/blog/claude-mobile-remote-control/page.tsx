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
  AccentDot,
  TldrCard,
} from "@/components/marketing/blog-shell"

export const metadata: Metadata = {
  title: "Claude Mobile & Remote Control: Start on Desktop, Finish From Your Phone",
  description:
    "Your AI doesn't clock out when you leave your desk. Here's how to run Claude from your phone and keep work moving from anywhere.",
}

export default function BlogPost() {
  const related = getRelatedPosts("claude-mobile-remote-control")

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
                <time className="text-slate-500">April 6, 2026</time>
                <span className="text-slate-400">|</span>
                <span className="text-slate-500">5 min read</span>
              </div>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Claude Mobile & Remote Control: Start on Desktop, Finish From
                Your Phone
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-700">
                Most people treat Claude like a desktop-only tool. Open the app,
                type a prompt, sit and wait. But your best ideas don&apos;t
                always happen at your desk, and neither should your AI. The
                Claude mobile app lets you pick up right where you left off,
                from anywhere.
              </p>
            </div>

            <TldrCard
              items={[
                "The Claude mobile app syncs conversations across desktop and phone -- no copy-pasting, no lost context.",
                "Dispatch lets you start a task on your computer and monitor or redirect it from your phone.",
                "Voice input, photo uploads, and file attachments work natively -- snap a whiteboard photo and Claude reads it.",
              ]}
            />

            <BlogDivider />

            {/* Mobile App */}
            <section className="space-y-4">
              <BlogHeading>
                The Claude Mobile App: Your AI in Your Pocket
              </BlogHeading>
              <p className="leading-relaxed text-slate-700">
                If you&apos;ve been running Claude from your desk only,
                you&apos;re missing half the picture. The mobile app gives you
                Chat, Code, and Dispatch (Cowork) right from your phone. Same
                account, same conversations, same context.
              </p>

              <div className="space-y-3">
                <p className="font-semibold text-foreground">
                  Getting set up takes about 60 seconds:
                </p>
                <ol className="list-decimal space-y-2 pl-6 text-slate-700">
                  <li>
                    Download the Claude app from the App Store (iOS) or Google
                    Play (Android)
                  </li>
                  <li>Sign in with your existing account</li>
                  <li>
                    Your conversations, projects, and sessions are already there
                  </li>
                </ol>
              </div>

              <PullQuote>
                Your chats sync across devices. Start a draft at your desk,
                refine it on the train. No screenshots, no copy-paste, no
                &quot;where was I?&quot;
              </PullQuote>
            </section>

            <BlogDivider />

            {/* What You Can Do */}
            <section className="space-y-4">
              <BlogHeading>
                What You Can Actually Do From Your Phone
              </BlogHeading>
              <p className="leading-relaxed text-slate-700">
                The mobile app isn&apos;t a watered-down version. It handles
                real work. Here&apos;s what makes it useful beyond just reading
                old chats:
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-5">
                  <p className="font-semibold text-foreground">
                    Synced Conversations
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Pick up any desktop conversation on your phone. The full
                    thread is there, not a summary.
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-5">
                  <p className="font-semibold text-foreground">
                    Photos & Files
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Snap a photo of a whiteboard, a form, or handwritten notes.
                    Claude reads it, extracts text, and answers questions about
                    it.
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-5">
                  <p className="font-semibold text-foreground">
                    Voice Dictation
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Tap the mic icon to dictate instead of typing. Great for
                    longer prompts when you&apos;re on the move.
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-5">
                  <p className="font-semibold text-foreground">
                    Live Voice Mode
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Tap the waveform icon for a real-time voice conversation.
                    Like a phone call with Claude for brainstorming or quick
                    questions.
                  </p>
                </div>
              </div>

              <AccentBox label="Photo use cases that actually save time">
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <AccentDot />
                    Confusing forms or legal language: snap it, ask Claude to
                    explain in plain English
                  </li>
                  <li className="flex items-start gap-2">
                    <AccentDot />
                    Meeting whiteboards: photograph and have Claude pull out
                    action items
                  </li>
                  <li className="flex items-start gap-2">
                    <AccentDot />
                    Handwritten notes: instant transcription and organization
                  </li>
                  <li className="flex items-start gap-2">
                    <AccentDot />
                    Business cards: snap and extract contact info
                  </li>
                  <li className="flex items-start gap-2">
                    <AccentDot />
                    PDFs and screenshots: upload and ask questions about the
                    content
                  </li>
                </ul>
              </AccentBox>
            </section>

            <BlogDivider />

            {/* Dispatch / Remote Control */}
            <section className="space-y-4">
              <BlogHeading>
                Remote Control: Start on Desktop, Steer From Anywhere
              </BlogHeading>
              <p className="leading-relaxed text-slate-700">
                This is the feature that changes the game for anyone who
                doesn&apos;t sit at a desk all day. Dispatch connects your
                desktop Claude session to your phone. Start a complex task on
                your computer, walk away, and keep directing it from your
                pocket.
              </p>

              <AccentBox label="How it works">
                <ol className="list-decimal space-y-2 pl-5 text-slate-700">
                  <li>
                    Start a conversation on your desktop (terminal or app)
                  </li>
                  <li>
                    Give Claude a task: draft a report, analyze data, build
                    something
                  </li>
                  <li>Walk away. Seriously. Go grab coffee.</li>
                  <li>
                    Open the Claude app on your phone. Your active session is
                    right there.
                  </li>
                  <li>
                    Check progress, give feedback, redirect. Claude keeps
                    working the whole time.
                  </li>
                </ol>
              </AccentBox>

              <PullQuote>
                For operators who spend half their day between meetings and
                portfolio companies: start an analysis before a board meeting,
                review the results in the car. Your AI keeps working when you
                can&apos;t sit at your desk.
              </PullQuote>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
                <p className="text-sm font-semibold text-amber-800">
                  One thing to remember
                </p>
                <p className="mt-1 text-sm text-amber-700">
                  Your computer needs to stay on with the terminal or Claude
                  Desktop open. Don&apos;t close the lid or let it sleep, or the
                  session will pause until you&apos;re back.
                </p>
              </div>
            </section>

            <BlogDivider />

            {/* Use Cases */}
            <section className="space-y-4">
              <BlogHeading>Real Use Cases</BlogHeading>
              <p className="leading-relaxed text-slate-700">
                These aren&apos;t hypothetical. These are the workflows we see
                teams actually using once they connect mobile:
              </p>

              <div className="space-y-3">
                <AccentBox>
                  <p className="font-semibold text-foreground">
                    Data Analysis
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Start an analysis at your desk. Review charts and findings
                    from your phone during a meeting.
                  </p>
                </AccentBox>
                <AccentBox>
                  <p className="font-semibold text-foreground">
                    Email & Writing
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Start drafting a long email or document. Review and polish
                    from your phone before sending.
                  </p>
                </AccentBox>
                <AccentBox>
                  <p className="font-semibold text-foreground">
                    Report Generation
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Ask Claude to build a report. Check in from your phone to
                    refine and request changes along the way.
                  </p>
                </AccentBox>
                <AccentBox>
                  <p className="font-semibold text-foreground">
                    Research
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Have Claude research a topic and summarize findings, then
                    review and redirect from mobile.
                  </p>
                </AccentBox>
                <AccentBox>
                  <p className="font-semibold text-foreground">
                    Long-Running Tasks
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Start a complex, multi-step task. Monitor progress and give
                    direction from anywhere.
                  </p>
                </AccentBox>
              </div>
            </section>

            <BlogDivider />

            <section className="space-y-4">
              <BlogHeading>Get Started in 3 Steps</BlogHeading>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-slate-50 p-5 text-center">
                  <p className="text-2xl font-bold text-foreground">1</p>
                  <p className="mt-2 font-semibold text-foreground">
                    Get Claude Mobile
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Download from the App Store or Google Play. Sign in with
                    your existing account.
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-5 text-center">
                  <p className="text-2xl font-bold text-foreground">2</p>
                  <p className="mt-2 font-semibold text-foreground">
                    Start a Task on Desktop
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Open your terminal or Claude Desktop and start a session as
                    you normally would.
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-5 text-center">
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="mt-2 font-semibold text-foreground">
                    Connect From Your Phone
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Open the Claude app. Your active session appears
                    automatically. Tap to connect.
                  </p>
                </div>
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
        description="We deploy Claude across PE portfolio companies and train teams to actually use it -- mobile, desktop, and everything in between."
      />
    </>
  )
}
