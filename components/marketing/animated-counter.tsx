"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, motion } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  suffix?: string
  className?: string
}

export function AnimatedCounter({ value, suffix = "", className }: AnimatedCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 1200
    const steps = 40
    const increment = value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      // Ease-out: fast start, slow finish
      const progress = 1 - Math.pow(1 - step / steps, 3)
      current = Math.round(value * progress)
      setDisplay(current)

      if (step >= steps) {
        setDisplay(value)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {display}{suffix}
    </motion.span>
  )
}
