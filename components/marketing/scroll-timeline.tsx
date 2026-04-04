"use client"

import { useRef, useState, useEffect } from "react"

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
  const [progress, setProgress] = useState(0)
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const windowHeight = window.innerHeight

      // Calculate how far through the section we've scrolled
      const scrollStart = windowHeight * 0.6
      const scrollEnd = -sectionHeight + windowHeight * 0.4
      const total = scrollStart - scrollEnd
      const current = scrollStart - sectionTop
      const pct = Math.min(Math.max(current / total, 0), 1)

      setProgress(pct)
      setActivePhase(Math.min(Math.floor(pct * phases.length), phases.length - 1))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [phases.length])

  const borderColors = [
    "border-l-slate-300",
    "border-l-slate-400",
    "border-l-slate-500",
    "border-l-slate-700",
  ]

  return (
    <div ref={sectionRef}>
      {/* Sticky progress bar */}
      <div className="sticky top-16 z-20 bg-slate-50 pb-4 pt-2">
        <div className="mx-auto max-w-4xl px-6">
          {/* Phase labels */}
          <div className="mb-2 flex justify-between">
            {phases.map((phase, i) => {
              const label = phase.title.split(":")[0]
              return (
                <span
                  key={phase.number}
                  className={`text-xs font-semibold transition-colors duration-300 ${
                    i <= activePhase ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              )
            })}
          </div>
          {/* Track */}
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-150 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          {/* Dots on track */}
          <div className="relative -mt-[9px] flex justify-between px-0">
            {phases.map((phase, i) => {
              const dotPos = ((i + 0.5) / phases.length) * 100
              const isActive = i <= activePhase
              return (
                <div
                  key={phase.number}
                  className="flex justify-center"
                  style={{ width: `${100 / phases.length}%` }}
                >
                  <div
                    className={`h-3 w-3 rounded-full border-2 transition-colors duration-300 ${
                      isActive
                        ? "border-primary bg-primary"
                        : "border-slate-300 bg-white"
                    }`}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Phase cards */}
      <div className="mx-auto max-w-4xl px-6 pt-4">
        {phases.map((phase, i) => (
          <div
            key={phase.number}
            className={`border-l-4 ${borderColors[i]} mb-6 py-4 pl-5 transition-opacity duration-300 ${
              i <= activePhase ? "opacity-100" : "opacity-40"
            }`}
          >
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              {phase.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {phase.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
