"use client"

import { useRef, useState, useEffect, Children, cloneElement, isValidElement } from "react"
import { motion } from "framer-motion"

interface AnimatedServicesGridProps {
  children: React.ReactNode[]
}

export function AnimatedServicesGrid({ children }: AnimatedServicesGridProps) {
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
    <div ref={ref} className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
      {Children.map(children, (child, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={triggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.5,
            delay: i * 0.12,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {isValidElement(child)
            ? cloneElement(child as React.ReactElement<{ animateIcon?: boolean }>, {
                animateIcon: triggered,
              })
            : child}
        </motion.div>
      ))}
    </div>
  )
}
