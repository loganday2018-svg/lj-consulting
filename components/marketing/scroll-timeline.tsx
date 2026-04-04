"use client"

import { useRef, useState, useEffect, useCallback } from "react"

interface Phase {
  number: number
  title: string
  description: string
}

interface ScrollTimelineProps {
  phases: Phase[]
}

export function ScrollTimeline({ phases }: ScrollTimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number>(0)

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const scrollStart = windowHeight * 0.6
      const scrollEnd = -rect.height + windowHeight * 0.4
      const total = scrollStart - scrollEnd
      const current = scrollStart - rect.top
      const pct = Math.min(Math.max(current / total, 0), 1)

      setProgress(pct)
    })
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [handleScroll])

  const borderColors = [
    "border-l-slate-300",
    "border-l-slate-400",
    "border-l-slate-500",
    "border-l-slate-700",
  ]

  // Continuous phase progress (0 to phases.length)
  const phaseProgress = progress * phases.length

  return (
    <div ref={sectionRef}>
      {/* Sticky progress bar */}
      <div className="sticky top-16 z-20 bg-slate-50 pb-4 pt-2">
        <div className="mx-auto max-w-4xl px-6">
          {/* Phase labels */}
          <div className="mb-2 flex justify-between">
            {phases.map((phase, i) => {
              const label = phase.title.split(":")[0]
              const labelOpacity = phaseProgress >= i ? 1 : 0.35
              return (
                <span
                  key={phase.number}
                  style={{
                    opacity: labelOpacity,
                    transition: "opacity 0.4s ease",
                  }}
                  className="text-xs font-semibold text-slate-900"
                >
                  {label}
                </span>
              )
            })}
          </div>
          {/* Track */}
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-primary"
              style={{
                width: `${progress * 100}%`,
                transition: "width 0.08s linear",
              }}
            />
          </div>
          {/* Dots on track */}
          <div className="relative -mt-[9px] flex justify-between">
            {phases.map((phase, i) => {
              const isActive = phaseProgress >= i + 0.3
              return (
                <div
                  key={phase.number}
                  className="flex justify-center"
                  style={{ width: `${100 / phases.length}%` }}
                >
                  <div
                    className="h-3 w-3 rounded-full border-2"
                    style={{
                      borderColor: isActive
                        ? "var(--color-primary)"
                        : "#cbd5e1",
                      backgroundColor: isActive
                        ? "var(--color-primary)"
                        : "white",
                      transition:
                        "border-color 0.4s ease, background-color 0.4s ease",
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Phase cards */}
      <div className="mx-auto max-w-4xl px-6 pt-4">
        {phases.map((phase, i) => {
          // Smooth opacity: ramp from 0.3 to 1 as the phase becomes active
          const cardOpacity = Math.min(
            Math.max((phaseProgress - i + 0.5) * 1.4, 0.3),
            1
          )
          return (
            <div
              key={phase.number}
              ref={(el) => { cardsRef.current[i] = el }}
              className={`border-l-4 ${borderColors[i]} mb-6 py-4 pl-5`}
              style={{
                opacity: cardOpacity,
                transition: "opacity 0.3s ease",
              }}
            >
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                {phase.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {phase.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
