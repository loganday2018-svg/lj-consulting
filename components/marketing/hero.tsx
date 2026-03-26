import { Button } from "@/components/ui/button"
import { CTA } from "@/lib/constants"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="bg-primary py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
            AI Implementation for PE Portfolio Companies
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            AI Implementation That Drives Portfolio Company Value Creation
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
            We help PE-backed operators deploy Claude, Codex, and Copilot across
            their portfolio companies — turning AI from a buzzword into
            measurable operating leverage.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button size="lg" variant="secondary" render={<a href={CTA.primary.href} />}>
              {CTA.primary.label}
            </Button>
            <Link
              href="/services"
              className="text-sm text-slate-300 underline-offset-4 hover:text-white hover:underline"
            >
              View Our Services →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
