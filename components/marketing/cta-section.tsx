import { Button } from "@/components/ui/button"
import { CTA } from "@/lib/constants"
import Link from "next/link"

interface CTASectionProps {
  heading?: string
  description?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function CTASection({
  heading = "Free Portfolio Analysis. Live on the Call.",
  description = "Pick a portfolio company. We'll show you where AI moves the needle.",
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="bg-primary py-16 text-center md:py-24">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl font-semibold text-primary-foreground md:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 text-lg text-slate-300">{description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          <Button size="lg" variant="secondary" render={<a href={CTA.primary.href} />}>
            {CTA.primary.label}
          </Button>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="text-sm text-slate-300 underline-offset-4 hover:text-white hover:underline"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
