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
        heading="Ready to See This Live on Your Data?"
        description="Book a call and pick the format that works — a quick intro, a deep dive, or a full live demo."
        secondaryLabel="See our services →"
        secondaryHref="/services"
      />
    </>
  )
}
