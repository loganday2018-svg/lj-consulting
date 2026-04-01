"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Step {
  number: number
  title: string
  description: string
}

interface AnimatedStepsProps {
  steps: Step[]
}

export function AnimatedSteps({ steps }: AnimatedStepsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (!ref.current || triggered) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { rootMargin: "-60px 0px" }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [triggered])

  return (
    <div ref={ref}>
      {/* Desktop: horizontal 3-col */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-8">
        {/* Connecting line behind the circles */}
        <div className="pointer-events-none absolute left-0 right-0" style={{ gridColumn: "1 / -1" }}>
        </div>
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            className="text-center"
            initial={false}
            animate={triggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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

      {/* Mobile: vertical timeline with connecting line */}
      <div className="relative md:hidden">
        {/* Vertical connecting line */}
        <motion.div
          className="absolute left-5 top-5 bottom-5 w-px bg-slate-200"
          initial={false}
          animate={triggered ? { scaleY: 1 } : { scaleY: 0 }}
          style={{ originY: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        />

        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative flex gap-5"
              initial={false}
              animate={triggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {step.number}
              </div>
              <div className="pt-1.5">
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-slate-700">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
