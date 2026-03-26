import { Check } from "lucide-react"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  scope: string[]
  timeline?: string
}

export function ServiceCard({
  icon,
  title,
  description,
  scope,
  timeline,
}: ServiceCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-8 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="mb-6 leading-relaxed text-slate-700">{description}</p>

      <div>
        <p className="mb-2 text-sm font-semibold text-slate-800">
          What&apos;s included:
        </p>
        <ul className="space-y-2">
          {scope.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
              <Check size={16} className="mt-0.5 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {timeline && (
        <span className="mt-4 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
          {timeline}
        </span>
      )}
    </div>
  )
}
