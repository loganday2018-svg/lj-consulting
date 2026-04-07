"use client"

import { createContext, useContext, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ReadingProgress } from "./reading-progress"

interface BlogTheme {
  accent: string
  light: string
  mid: string
}

const THEMES: { name: string; swatch: string; theme: BlogTheme }[] = [
  {
    name: "Navy",
    swatch: "#1e293b",
    theme: {
      accent: "#1e293b",
      light: "rgba(30,41,59,0.07)",
      mid: "rgba(30,41,59,0.15)",
    },
  },
  {
    name: "Teal",
    swatch: "#0d9488",
    theme: {
      accent: "#0d9488",
      light: "rgba(13,148,136,0.07)",
      mid: "rgba(13,148,136,0.15)",
    },
  },
  {
    name: "Coral",
    swatch: "#e05a47",
    theme: {
      accent: "#e05a47",
      light: "rgba(224,90,71,0.07)",
      mid: "rgba(224,90,71,0.15)",
    },
  },
  {
    name: "Violet",
    swatch: "#7c3aed",
    theme: {
      accent: "#7c3aed",
      light: "rgba(124,58,237,0.07)",
      mid: "rgba(124,58,237,0.15)",
    },
  },
  {
    name: "Emerald",
    swatch: "#059669",
    theme: {
      accent: "#059669",
      light: "rgba(5,150,105,0.07)",
      mid: "rgba(5,150,105,0.15)",
    },
  },
]

const ThemeCtx = createContext<BlogTheme>(THEMES[0].theme)

export function useBlogTheme() {
  return useContext(ThemeCtx)
}

export function BlogShell({ children }: { children: React.ReactNode }) {
  const [idx, setIdx] = useState(0)
  const articleRef = useRef<HTMLDivElement>(null)

  return (
    <ThemeCtx.Provider value={THEMES[idx].theme}>
      <ReadingProgress target={articleRef} />
      <div className="sticky top-16 z-40 flex items-center justify-center gap-2 border-b border-slate-100 bg-background/95 backdrop-blur py-3">
        <span className="mr-1 text-xs text-slate-400">Color:</span>
        {THEMES.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setIdx(i)}
            className={`h-5 w-5 rounded-full transition-all ${
              i === idx
                ? "ring-2 ring-slate-900 ring-offset-2 scale-110"
                : "hover:scale-110"
            }`}
            style={{ background: t.swatch }}
            title={t.name}
          />
        ))}
      </div>
      <div ref={articleRef}>{children}</div>
    </ThemeCtx.Provider>
  )
}

export function BlogDivider() {
  const { accent, mid } = useBlogTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: `linear-gradient(to right, ${accent}, ${mid}, transparent)`,
        transformOrigin: "left",
      }}
      className="my-10 h-0.5 rounded-full"
    />
  )
}

export function PullQuote({ children }: { children: React.ReactNode }) {
  const { accent } = useBlogTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.blockquote
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative my-8 py-6 pl-12 text-lg font-medium leading-relaxed text-slate-800"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 font-display text-6xl leading-none select-none"
        style={{ color: accent }}
      >
        &ldquo;
      </span>
      {children}
    </motion.blockquote>
  )
}

export function AccentPill({ children }: { children: React.ReactNode }) {
  const { accent, light } = useBlogTheme()
  return (
    <span
      className="rounded-full px-3 py-0.5 text-xs font-medium"
      style={{ backgroundColor: light, color: accent }}
    >
      {children}
    </span>
  )
}

export function AccentBox({
  label,
  children,
}: {
  label?: string
  children: React.ReactNode
}) {
  const { accent, light, mid } = useBlogTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{
        y: -2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: { duration: 0.2 },
      }}
      className="rounded border p-6"
      style={{ borderColor: mid, backgroundColor: light }}
    >
      {label && (
        <p
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ color: accent }}
        >
          {label}
        </p>
      )}
      <div className={label ? "mt-2" : ""}>{children}</div>
    </motion.div>
  )
}

export function AccentDot() {
  const { accent } = useBlogTheme()
  return (
    <span
      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
      style={{ backgroundColor: accent }}
    />
  )
}

export function AccentCode({ children }: { children: React.ReactNode }) {
  const { accent, light } = useBlogTheme()
  return (
    <code
      className="rounded px-1.5 py-0.5 text-sm font-mono"
      style={{ backgroundColor: light, color: accent }}
    >
      {children}
    </code>
  )
}

export function TldrCard({ items }: { items: string[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const { accent, mid } = useBlogTheme()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: -0.75 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="my-8 rounded-md border-2 border-dashed p-6"
      style={{ borderColor: accent, backgroundColor: mid }}
    >
      <p
        className="text-xs font-bold uppercase tracking-widest font-mono"
        style={{ color: accent }}
      >
        TL;DR
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm leading-relaxed text-slate-800"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 shrink-0 font-mono font-bold text-sm"
              style={{ color: accent }}
            >
              &rarr;
            </span>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export function BlogHeading({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-2xl font-semibold text-foreground"
    >
      {children}
    </motion.h2>
  )
}
