"use client"

import { TrendingUp, Clock, Cog } from "lucide-react"
import { StaggeredCards } from "@/components/marketing/staggered-cards"

const ICONS = {
  TrendingUp,
  Clock,
  Cog,
} as const

interface ValuePropsProps {
  items: readonly {
    icon: keyof typeof ICONS
    title: string
    description: string
    useCases: readonly string[]
  }[]
}

export function ValueProps({ items }: ValuePropsProps) {
  return (
    <StaggeredCards className="mt-12 grid gap-8 md:grid-cols-3">
      {items.map((prop) => {
        const Icon = ICONS[prop.icon]
        return (
          <div
            key={prop.title}
            className="rounded-lg border border-slate-200 bg-white p-8 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5"
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
  )
}
