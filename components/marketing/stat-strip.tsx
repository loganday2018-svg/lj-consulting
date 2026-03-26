"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { AnimatedCounter } from "@/components/marketing/animated-counter"

export function StatStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section className="bg-slate-800 py-10" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-slate-600">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0 }}
            className="px-8 text-center"
          >
            <p className="text-2xl font-bold text-white md:text-4xl">World&apos;s Largest Retailer</p>
            <p className="mt-2 text-sm text-slate-400">Where we built our operator experience</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="px-8 text-center"
          >
            <p className="text-2xl font-bold text-white md:text-4xl">
              <AnimatedCounter value={2} />
            </p>
            <p className="mt-2 text-sm text-slate-400">Top-10 MBA programs</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="px-8 text-center"
          >
            <p className="text-2xl font-bold text-white md:text-4xl">
              <AnimatedCounter value={2} />
            </p>
            <p className="mt-2 text-sm text-slate-400">Portfolio companies onboarded</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
