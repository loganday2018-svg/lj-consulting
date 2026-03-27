"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const HEADLINES = [
  "Turn AI Into EBITDA",
  "Put AI on the P&L",
  "Deploy AI and Move the Multiple",
  "Get More Margin With the Same Headcount",
  "Automate the Back Office and Accelerate the Top Line",
]

const INTERVAL = 4500

interface RotatingHeadlineProps {
  className?: string
}

export function RotatingHeadline({ className }: RotatingHeadlineProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const startTime = useRef(Date.now())
  const rafRef = useRef<number>(0)

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % HEADLINES.length)
    setProgress(0)
    startTime.current = Date.now()
  }, [])

  useEffect(() => {
    if (paused) {
      cancelAnimationFrame(rafRef.current)
      return
    }

    // Reset start time when unpausing to account for elapsed progress
    const remaining = INTERVAL * (1 - progress)
    const resumeStart = Date.now() - (INTERVAL - remaining)
    startTime.current = resumeStart

    function tick() {
      const elapsed = Date.now() - startTime.current
      const pct = Math.min(elapsed / INTERVAL, 1)
      setProgress(pct)

      if (pct >= 1) {
        advance()
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [paused, advance, progress])

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h1 className={className}>
        <span className="block text-lg font-semibold tracking-wide text-slate-400 md:text-2xl">
          We Help You
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="block bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
          >
            {HEADLINES[index]}
          </motion.span>
        </AnimatePresence>
      </h1>

      {/* Progress bar */}
      <div className="mt-6 h-0.5 w-full max-w-md overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-white/60 to-white/30 rounded-full"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  )
}
