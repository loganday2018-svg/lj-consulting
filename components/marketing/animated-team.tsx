"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedTeamProps {
  children: React.ReactNode[]
}

export function AnimatedTeam({ children }: AnimatedTeamProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div ref={ref} className="space-y-12">
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: i * 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
