"use client"

const TOOLS = [
  { name: "Claude", icon: "/logos/claude.svg" },
  { name: "GitHub Copilot", icon: "/logos/copilot.svg" },
  { name: "Cursor", icon: "/logos/cursor.svg" },
  { name: "Codex", icon: "/logos/codex.svg" },
  { name: "ChatGPT", icon: "/logos/chatgpt.svg" },
]

// Duplicate for seamless loop
const TICKER_ITEMS = [...TOOLS, ...TOOLS]

export function LogoTicker() {
  return (
    <section className="overflow-hidden bg-slate-900 py-6">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
        Tools we deploy
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-900" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-900" />

        <div className="flex animate-ticker gap-16">
          {TICKER_ITEMS.map((tool, i) => (
            <div
              key={`${tool.name}-${i}`}
              className="flex shrink-0 items-center gap-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tool.icon}
                alt={tool.name}
                className="size-8 opacity-60"
              />
              <span className="whitespace-nowrap text-sm font-medium text-slate-400">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
