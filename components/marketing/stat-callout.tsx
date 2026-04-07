"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useBlogTheme } from "./blog-shell"

function parseLeadingNumber(s: string) {
  const match = s.match(/^([~<>]?)(\d+(?:\.\d+)?)\s*(.*)$/)
  if (!match) return null
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] }
}

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = 1000
    const steps = 40
    const interval = duration / steps
    let step = 0

    const id = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (step >= steps) clearInterval(id)
    }, interval)

    return () => clearInterval(id)
  }, [target, active])

  return value
}

function AnimatedValue({
  text,
  isInView,
  color,
}: {
  text: string
  isInView: boolean
  color?: string
}) {
  const parsed = parseLeadingNumber(text)
  const countedValue = useCountUp(parsed?.num ?? 0, isInView && !!parsed)

  if (!parsed) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-2xl font-bold md:text-3xl"
        style={color ? { color } : undefined}
      >
        {text}
      </motion.span>
    )
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-2xl font-bold md:text-3xl"
      style={color ? { color } : undefined}
    >
      {parsed.prefix}
      {isInView ? countedValue : 0}
      {parsed.suffix ? ` ${parsed.suffix}` : ""}
    </motion.span>
  )
}

export function StatCallout({
  before,
  after,
  label,
  beforeLabel = "Before",
  afterLabel = "With Claude",
}: {
  before: string
  after: string
  label: string
  beforeLabel?: string
  afterLabel?: string
}) {
  const { accent, light, mid } = useBlogTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="my-6 rounded-lg border p-8"
      style={{ borderColor: mid, backgroundColor: light }}
    >
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {beforeLabel}
          </p>
          <div className="mt-2 line-through decoration-slate-300">
            <AnimatedValue text={before} isInView={isInView} color="#94a3b8" />
          </div>
        </div>

        <ArrowRight size={20} className="mx-auto hidden text-slate-300 sm:block" />

        <div className="text-center">
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: accent }}
          >
            {afterLabel}
          </p>
          <motion.div
            className="mt-2"
            initial={{ scale: 0.95 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <AnimatedValue text={after} isInView={isInView} color={accent} />
          </motion.div>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-slate-500">{label}</p>
    </motion.div>
  )
}
