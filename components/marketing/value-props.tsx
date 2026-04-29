"use client"

import { useState } from "react"
import { TrendingUp, Clock, Cog, Handshake, ChevronDown } from "lucide-react"
import { StaggeredCards } from "@/components/marketing/staggered-cards"

const ICONS = {
  TrendingUp,
  Clock,
  Cog,
  Handshake,
} as const

interface ValuePropsProps {
  items: readonly {
    icon: keyof typeof ICONS
    title: string
    description: string
    useCases: readonly string[]
  }[]
}

function MobileCard({
  icon,
  title,
  description,
  useCases,
}: {
  icon: keyof typeof ICONS
  title: string
  description: string
  useCases: readonly string[]
}) {
  const [open, setOpen] = useState(false)
  const Icon = ICONS[icon]

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full rounded-lg border border-slate-200 bg-white px-5 py-4 text-left transition-all duration-200 hover:border-primary/40"
    >
      <div className="flex items-center gap-3">
        <Icon className="size-6 shrink-0 text-primary" />
        <h3 className="flex-1 text-base font-semibold text-foreground">
          {title}
        </h3>
        <ChevronDown
          className={`size-4 shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>
      {open && (
        <div className="mt-3 pl-9">
          <p className="text-sm leading-relaxed text-slate-700">
            {description}
          </p>
          <ul className="mt-3 space-y-2">
            {useCases.map((useCase) => (
              <li key={useCase} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                {useCase}
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  )
}

export function ValueProps({ items }: ValuePropsProps) {
  return (
    <>
      {/* Mobile: compact accordion */}
      <div className="mt-8 flex flex-col gap-3 md:hidden">
        {items.map((prop) => (
          <MobileCard key={prop.title} {...prop} />
        ))}
      </div>

      {/* Desktop: full cards */}
      <StaggeredCards className="mt-12 hidden gap-8 md:grid md:grid-cols-2">
        {items.map((prop) => {
          const Icon = ICONS[prop.icon]
          return (
            <div
              key={prop.title}
              className="h-full rounded-lg border border-slate-200 bg-white p-8 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5"
            >
              <Icon className="mb-4 size-8 text-primary md:size-10" />
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {prop.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-slate-700 md:text-base">
                {prop.description}
              </p>
              <ul className="space-y-2">
                {prop.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </StaggeredCards>
    </>
  )
}
