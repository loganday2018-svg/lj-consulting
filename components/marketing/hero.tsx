"use client"

import { Button } from "@/components/ui/button"
import { CTA } from "@/lib/constants"
import { RotatingHeadline } from "@/components/marketing/rotating-headline"
import { motion } from "framer-motion"
import Link from "next/link"

export function HeroSection() {
  return (
    <section
      className="bg-primary py-24 md:py-32 lg:py-40"
      style={{
        backgroundImage:
          "radial-gradient(circle, oklch(1 0 0 / 0.07) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400"
          >
            AI Implementation for PE Portfolio Companies
          </motion.p>
          <RotatingHeadline
            className="font-display text-3xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl"
          >
            We&apos;re Logan & Matt. We help PE-backed teams deploy Claude,
            Codex, and Copilot. Then we stick around to make sure they actually
            use them.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <Button size="lg" variant="secondary" render={<a href={CTA.primary.href} />}>
              {CTA.primary.label}
            </Button>
            <Link
              href="/calculator"
              className="text-sm text-slate-300 underline-offset-4 hover:text-white hover:underline"
            >
              See Your EBITDA Impact →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
