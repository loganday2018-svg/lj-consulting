"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TypingHeadlineProps {
  text: string
  className?: string
}

export function TypingHeadline({ text, className }: TypingHeadlineProps) {
  const [displayedCount, setDisplayedCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const speed = 20 // ms per character
    let i = 0

    const timer = setInterval(() => {
      i++
      setDisplayedCount(i)
      if (i >= text.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text])

  return (
    <h1 className={className}>
      {text.slice(0, displayedCount)}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[3px] ml-1 h-[0.8em] bg-slate-300 align-middle"
        />
      )}
    </h1>
  )
}
