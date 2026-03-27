"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const HEADLINES = [
  "Turn AI Into EBITDA",
  "AI That Shows Up on the P&L",
  "Deploy AI. Move the Multiple.",
  "More Margin. Same Headcount.",
  "Automate the Back Office. Accelerate the Top Line.",
]

interface RotatingHeadlineProps {
  className?: string
}

export function RotatingHeadline({ className }: RotatingHeadlineProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HEADLINES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <h1 className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="block"
        >
          {HEADLINES[index]}
        </motion.span>
      </AnimatePresence>
    </h1>
  )
}
