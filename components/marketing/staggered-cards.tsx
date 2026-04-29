"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface StaggeredCardsProps {
  children: React.ReactNode[]
  className?: string
}

export function StaggeredCards({ children, className }: StaggeredCardsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          className="h-full"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
