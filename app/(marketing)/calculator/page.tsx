import type { Metadata } from "next"
import { PageHeader } from "@/components/marketing/page-header"
import { EbitdaCalculator } from "@/components/marketing/ebitda-calculator"

export const metadata: Metadata = {
  title: "AI Impact Calculator",
  description:
    "See how AI implementation could improve your portfolio company's EBITDA and enterprise value. Input your financials, get scenario-based projections.",
}

export default function CalculatorPage() {
  return (
    <>
      <PageHeader
        title="AI Impact on EBITDA"
        description="Plug in your portfolio company's financials. See what AI implementation could mean for margins and enterprise value."
      />

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <EbitdaCalculator />
        </div>
      </section>
    </>
  )
}
