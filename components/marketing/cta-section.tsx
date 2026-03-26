import { Button } from "@/components/ui/button"
import { CTA } from "@/lib/constants"

interface CTASectionProps {
  heading?: string
  description?: string
}

export function CTASection({
  heading = "Ready to bring AI to your portfolio?",
  description = "Book a discovery call to learn how we can help your portfolio companies.",
}: CTASectionProps) {
  return (
    <section className="bg-primary py-16 text-center md:py-24">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl font-semibold text-primary-foreground md:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 text-lg text-slate-300">{description}</p>
        <div className="mt-8">
          <Button size="lg" variant="secondary" render={<a href={CTA.primary.href} />}>
            {CTA.primary.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
