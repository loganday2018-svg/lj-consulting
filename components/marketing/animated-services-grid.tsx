"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedServicesGridProps {
  children: React.ReactNode[]
}

export function AnimatedServicesGrid({ children }: AnimatedServicesGridProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div ref={ref} className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * 0.12,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
