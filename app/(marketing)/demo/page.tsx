import type { Metadata } from "next"
import { PageHeader } from "@/components/marketing/page-header"
import { CTASection } from "@/components/marketing/cta-section"
import { DemoShowcase } from "@/components/marketing/demo/demo-showcase"

export const metadata: Metadata = {
  title: "Before & After: AI-Powered Financial Reporting",
  description:
    "See how we transform static Excel P&Ls into interactive dashboards. Real output from a real engagement.",
}

export default function DemoPage() {
  return (
    <>
      <PageHeader
        title="Same Data. Completely Different Insight."
        description="This is what happens when you stop emailing spreadsheets and start building dashboards. Toggle between the before and after."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-24">
        <DemoShowcase />
      </section>

      <CTASection
        heading="Want Us to Build This for Your Portfolio?"
        description="Pick a portfolio company. We'll analyze it live on the call and show you what's possible."
        secondaryLabel="See our services →"
        secondaryHref="/services"
      />
    </>
  )
}
