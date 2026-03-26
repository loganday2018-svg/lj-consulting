import { Button } from "@/components/ui/button"
import { CTA } from "@/lib/constants"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="bg-background py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          AI Implementation That Drives Portfolio Company Value Creation
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-700 md:text-xl">
          We help PE-backed operators deploy Claude, Codex, and Copilot across
          their portfolio companies — turning AI from a buzzword into measurable
          operating leverage.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <Button size="lg" render={<a href={CTA.primary.href} />}>
            {CTA.primary.label}
          </Button>
          <Link
            href="/services"
            className="text-sm text-slate-500 underline-offset-4 hover:text-foreground hover:underline"
          >
            View Our Services
          </Link>
        </div>
      </div>
    </section>
  )
}
