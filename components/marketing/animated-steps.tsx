"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface Step {
  number: number
  title: string
  description: string
}

interface AnimatedStepsProps {
  steps: Step[]
}

export function AnimatedSteps({ steps }: AnimatedStepsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div ref={ref} className="grid gap-8 text-center md:grid-cols-3">
      {steps.map((step, i) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            {step.number}
          </div>
          <h3 className="mb-2 font-semibold">{step.title}</h3>
          <p className="text-sm text-slate-700">{step.description}</p>
        </motion.div>
      ))}
    </div>
  )
}
