"use client"

import { useRef, useState, useEffect, Children, cloneElement, isValidElement } from "react"
import { motion } from "framer-motion"

interface AnimatedServicesGridProps {
  children: React.ReactNode[]
}

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])
  return isTouch
}

export function AnimatedServicesGrid({ children }: AnimatedServicesGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)
  const isTouch = useIsTouchDevice()

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

  // Mobile: horizontal scroll carousel
  if (isTouch) {
    return (
      <div ref={ref} className="w-full">
        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-none"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        >
          {Children.map(children, (child, i) => (
            <motion.div
              key={i}
              className="w-[85vw] max-w-[340px] flex-shrink-0 snap-center"
              initial={false}
              animate={triggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
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
      </div>
    )
  }

  // Desktop: 2-column grid with stagger
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
