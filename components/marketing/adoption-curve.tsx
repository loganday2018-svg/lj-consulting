"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, animate, useMotionValue } from "framer-motion"

// Without consulting: slow S-curve, takes ~12 months to reach meaningful adoption
const WITHOUT = [0, 2, 5, 9, 14, 22, 32, 43, 54, 64, 72, 78, 82]

// With Rubicon: steep ramp, reaches high adoption in weeks
const WITH_LJ = [0, 28, 58, 80, 90, 94, 96, 97, 97, 98, 98, 98, 98]

const CHART_WIDTH = 700
const CHART_HEIGHT = 360
const PAD = { top: 30, right: 30, bottom: 44, left: 54 }
const PLOT_W = CHART_WIDTH - PAD.left - PAD.right
const PLOT_H = CHART_HEIGHT - PAD.top - PAD.bottom

function toX(i: number) {
  return PAD.left + (i / 12) * PLOT_W
}
function toY(v: number) {
  return PAD.top + PLOT_H - (v / 100) * PLOT_H
}

// Catmull-Rom to cubic bezier conversion for buttery smooth curves
function catmullRomToBezier(
  points: { x: number; y: number }[],
  tension = 0.5
): string {
  if (points.length < 2) return ""

  let d = `M ${points[0].x} ${points[0].y}`

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(i + 2, points.length - 1)]

    const cp1x = p1.x + (p2.x - p0.x) / (6 / tension)
    const cp1y = p1.y + (p2.y - p0.y) / (6 / tension)
    const cp2x = p2.x - (p3.x - p1.x) / (6 / tension)
    const cp2y = p2.y - (p3.y - p1.y) / (6 / tension)

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
  }
  return d
}

function buildSmoothPath(data: number[]) {
  const points = data.map((v, i) => ({ x: toX(i), y: toY(v) }))
  return catmullRomToBezier(points, 0.5)
}

function buildAreaPath(data: number[]) {
  const points = data.map((v, i) => ({ x: toX(i), y: toY(v) }))
  const curvePart = catmullRomToBezier(points, 0.5)
  const lastPt = points[points.length - 1]
  const firstPt = points[0]
  return `${curvePart} L ${lastPt.x} ${toY(0)} L ${firstPt.x} ${toY(0)} Z`
}

// Build the closed path between two curves (the "gap" area)
function buildGapPath(upper: number[], lower: number[]) {
  const upperPoints = upper.map((v, i) => ({ x: toX(i), y: toY(v) }))
  const lowerPoints = lower.map((v, i) => ({ x: toX(i), y: toY(v) }))

  // Upper curve forward
  const upperCurve = catmullRomToBezier(upperPoints, 0.5)

  // Lower curve backward
  const lowerReversed = [...lowerPoints].reverse()
  const lowerCurve = catmullRomToBezier(lowerReversed, 0.5)

  // Connect: upper curve → line to last lower point → lower curve reversed → close
  const lastUpper = upperPoints[upperPoints.length - 1]
  const firstLower = lowerReversed[0]

  return `${upperCurve} L ${firstLower.x} ${firstLower.y} ${lowerCurve.replace(/^M [^ ]+ [^ ]+/, "")} Z`
}

function lerpData(a: number[], b: number[], t: number): number[] {
  return a.map((v, i) => v + (b[i] - v) * t)
}

function AnimatedValue({
  from,
  to,
  suffix,
  isInView,
  delay,
}: {
  from: number
  to: number
  suffix: string
  isInView: boolean
  delay: number
}) {
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!isInView) return
    const timeout = setTimeout(() => {
      const controls = animate(from, to, {
        duration: 1.4,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate: (v) => setValue(Math.round(v)),
      })
      return () => controls.stop()
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [isInView, from, to, delay])

  return (
    <span>
      {value}
      {suffix}
    </span>
  )
}

// Draw-in animation using strokeDasharray/strokeDashoffset (works reliably everywhere)
function DrawPath({
  d,
  stroke,
  strokeWidth,
  isInView,
  delay,
  duration,
  dashed,
}: {
  d: string
  stroke: string
  strokeWidth: number
  isInView: boolean
  delay: number
  duration: number
  dashed?: boolean
}) {
  const pathRef = useRef<SVGPathElement>(null)
  const [length, setLength] = useState(0)
  const [offset, setOffset] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (pathRef.current) {
      const l = pathRef.current.getTotalLength()
      setLength(l)
      setOffset(l)
      setReady(true)
    }
  }, [d])

  useEffect(() => {
    if (!isInView || !ready || length === 0) return
    const timeout = setTimeout(() => {
      const controls = animate(length, 0, {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate: (v) => setOffset(v),
      })
      return () => controls.stop()
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [isInView, ready, length, delay, duration])

  return (
    <path
      ref={pathRef}
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? `6 6` : `${length}`}
      strokeDashoffset={dashed ? 0 : offset}
      style={{ opacity: ready ? 1 : 0 }}
    />
  )
}

function MorphingChart({ isInView }: { isInView: boolean }) {
  const progress = useMotionValue(0)
  const [currentData, setCurrentData] = useState(WITHOUT)
  const [hasMorphed, setHasMorphed] = useState(false)
  const [drawComplete, setDrawComplete] = useState(false)

  useEffect(() => {
    if (!isInView) return

    // Mark draw as complete after the draw-in finishes
    const drawDone = setTimeout(() => setDrawComplete(true), 1800)

    // Then morph
    const morphStart = setTimeout(() => {
      setHasMorphed(true)
      animate(0, 1, {
        duration: 1.8,
        ease: [0.4, 0, 0.2, 1],
        onUpdate: (t) => {
          progress.set(t)
          setCurrentData(lerpData(WITHOUT, WITH_LJ, t))
        },
      })
    }, 2400)

    return () => {
      clearTimeout(drawDone)
      clearTimeout(morphStart)
    }
  }, [isInView, progress])

  const curvePath = buildSmoothPath(currentData)
  const areaPath = buildAreaPath(currentData)
  const gapPath = hasMorphed ? buildGapPath(WITH_LJ, WITHOUT) : null

  const yLabels = [0, 25, 50, 75, 100]
  const xLabels = [0, 3, 6, 9, 12]

  const dotY = toY(currentData[3])

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="areaGradientMuted" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.08} />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.01} />
        </linearGradient>
        <linearGradient id="areaGradientAccent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" stopOpacity={0.14} />
          <stop offset="100%" stopColor="#1e293b" stopOpacity={0.02} />
        </linearGradient>
        <linearGradient id="gapGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity={0.18} />
          <stop offset="50%" stopColor="#f87171" stopOpacity={0.12} />
          <stop offset="100%" stopColor="#fca5a5" stopOpacity={0.06} />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {yLabels.map((v) => (
        <line
          key={v}
          x1={PAD.left}
          y1={toY(v)}
          x2={CHART_WIDTH - PAD.right}
          y2={toY(v)}
          stroke="#e2e8f0"
          strokeWidth={1}
          strokeDasharray={v === 0 ? "0" : "4 4"}
        />
      ))}

      {/* Y-axis labels */}
      {yLabels.map((v) => (
        <text
          key={v}
          x={PAD.left - 10}
          y={toY(v) + 4}
          textAnchor="end"
          className="fill-slate-400 text-[11px]"
        >
          {v}%
        </text>
      ))}

      {/* X-axis labels */}
      {xLabels.map((m) => (
        <text
          key={m}
          x={toX(m)}
          y={CHART_HEIGHT - 8}
          textAnchor="middle"
          className="fill-slate-400 text-[11px]"
        >
          {m === 0 ? "Start" : `${m}mo`}
        </text>
      ))}

      {/* Y-axis title */}
      <text
        x={14}
        y={PAD.top + PLOT_H / 2}
        textAnchor="middle"
        transform={`rotate(-90, 14, ${PAD.top + PLOT_H / 2})`}
        className="fill-slate-500 text-[11px] font-medium"
      >
        Team Adoption
      </text>

      {/* Gradient fill under curve */}
      <motion.path
        d={areaPath}
        fill={hasMorphed ? "url(#areaGradientAccent)" : "url(#areaGradientMuted)"}
        initial={false}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />

      {/* Gap between curves — the "lost value" area */}
      {hasMorphed && gapPath && (
        <motion.path
          d={gapPath}
          fill="url(#gapGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.3 }}
        />
      )}

      {/* Ghost of the original slow curve (fades in after morph) */}
      {hasMorphed && (
        <motion.path
          d={buildSmoothPath(WITHOUT)}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="6 6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8 }}
        />
      )}

      {/* The main curve — draw-in when not morphed, then direct update during morph */}
      {!drawComplete ? (
        <DrawPath
          d={curvePath}
          stroke="#94a3b8"
          strokeWidth={2.5}
          isInView={isInView}
          delay={0.4}
          duration={1.4}
        />
      ) : (
        <path
          d={curvePath}
          fill="none"
          stroke={hasMorphed ? "#1e293b" : "#94a3b8"}
          strokeWidth={hasMorphed ? 3 : 2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: "stroke 0.6s ease, stroke-width 0.3s ease",
          }}
        />
      )}

      {/* Tracking dot at the 3-month mark */}
      <motion.circle
        cx={toX(3)}
        cy={dotY}
        r={5}
        fill={hasMorphed ? "#1e293b" : "#94a3b8"}
        initial={false}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 1.6, duration: 0.3, ease: "backOut" }}
      />

      {/* Pulsing ring on dot after morph */}
      {hasMorphed && (
        <motion.circle
          cx={toX(3)}
          cy={dotY}
          r={5}
          fill="none"
          stroke="#1e293b"
          strokeWidth={2}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 3 }}
          transition={{
            duration: 1.2,
            repeat: 2,
            ease: "easeOut",
          }}
        />
      )}

      {/* Annotation: 3-month comparison labels (appear after morph) */}
      {hasMorphed && (
        <motion.g
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <rect
            x={toX(3) + 10}
            y={toY(80) - 14}
            width={82}
            height={26}
            rx={5}
            fill="#1e293b"
          />
          <text
            x={toX(3) + 51}
            y={toY(80) + 3}
            textAnchor="middle"
            className="fill-white text-[11px] font-semibold"
          >
            80% at 3mo
          </text>

          {/* Ghost dot + label for the without scenario */}
          <circle cx={toX(3)} cy={toY(9)} r={4} fill="#cbd5e1" />
          <rect
            x={toX(3) + 10}
            y={toY(9) - 14}
            width={72}
            height={26}
            rx={5}
            fill="#cbd5e1"
          />
          <text
            x={toX(3) + 46}
            y={toY(9) + 3}
            textAnchor="middle"
            className="fill-slate-700 text-[11px] font-medium"
          >
            9% at 3mo
          </text>

          {/* Connecting line between the two dots */}
          <line
            x1={toX(3)}
            y1={toY(80) + 6}
            x2={toX(3)}
            y2={toY(9) - 6}
            stroke="#fca5a5"
            strokeWidth={1.5}
            strokeDasharray="3 3"
          />
        </motion.g>
      )}

      {/* Legend */}
      <motion.g
        initial={false}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      >
        {!hasMorphed ? (
          <g transform={`translate(${CHART_WIDTH - PAD.right - 155}, ${PAD.top + 8})`}>
            <line x1={0} y1={0} x2={18} y2={0} stroke="#94a3b8" strokeWidth={2.5} strokeLinecap="round" />
            <text x={24} y={4} className="fill-slate-400 text-[11px]">
              Self-guided rollout
            </text>
          </g>
        ) : (
          <>
            <motion.g
              transform={`translate(${CHART_WIDTH - PAD.right - 170}, ${PAD.top + 8})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <line x1={0} y1={0} x2={18} y2={0} stroke="#1e293b" strokeWidth={3} strokeLinecap="round" />
              <text x={24} y={4} className="fill-slate-700 text-[11px] font-medium">
                With Rubicon
              </text>
            </motion.g>
            <motion.g
              transform={`translate(${CHART_WIDTH - PAD.right - 170}, ${PAD.top + 26})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <line x1={0} y1={0} x2={18} y2={0} stroke="#cbd5e1" strokeWidth={2} strokeLinecap="round" strokeDasharray="4 4" />
              <text x={24} y={4} className="fill-slate-400 text-[11px]">
                Self-guided rollout
              </text>
            </motion.g>
          </>
        )}
      </motion.g>
    </svg>
  )
}

export function AdoptionCurve() {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [triggered, setTriggered] = useState(false)
  const [phase, setPhase] = useState<"before" | "after">("before")

  // Wait for client mount before enabling any animation logic
  useEffect(() => {
    setMounted(true)
  }, [])

  // Manual IntersectionObserver — only starts observing after mount,
  // so hydration can never accidentally trigger animations
  useEffect(() => {
    if (!mounted || triggered || !ref.current) return
    const el = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { rootMargin: "-60px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [mounted, triggered])

  useEffect(() => {
    if (!triggered) return
    const timeout = setTimeout(() => setPhase("after"), 2400)
    return () => clearTimeout(timeout)
  }, [triggered])

  // Render placeholder with correct dimensions before trigger
  const isInView = triggered

  return (
    <div ref={ref}>
      {/* Comparison stats */}
      <motion.div
        className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
        initial={false}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="rounded-lg border border-slate-200 bg-white p-5 text-center">
          <p className="text-sm font-medium tracking-wide text-slate-500 uppercase">
            Without consulting
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-400">
            <AnimatedValue from={0} to={12} suffix="+ months" isInView={isInView} delay={0.4} />
          </p>
          <p className="mt-0.5 text-xs text-slate-400">to meaningful adoption</p>
        </div>
        <div className="rounded-lg border border-primary/20 bg-primary/[0.03] p-5 text-center">
          <p className="text-sm font-medium tracking-wide text-primary/70 uppercase">
            With Rubicon
          </p>
          <p className="mt-1 text-2xl font-semibold text-primary">
            {phase === "after" ? (
              <AnimatedValue from={12} to={3} suffix=" weeks" isInView={phase === "after"} delay={0} />
            ) : (
              <AnimatedValue from={0} to={12} suffix=" months" isInView={isInView} delay={0.4} />
            )}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">to meaningful adoption</p>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-5 text-center">
          <p className="text-sm font-medium tracking-wide text-emerald-600 uppercase">
            Time saved
          </p>
          <p className="mt-1 text-2xl font-semibold text-emerald-600">
            {phase === "after" ? (
              <AnimatedValue from={0} to={85} suffix="%" isInView={phase === "after"} delay={0.2} />
            ) : (
              <span className="text-slate-300">&mdash;</span>
            )}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">faster time-to-value</p>
        </div>
      </motion.div>

      {/* Chart */}
      <motion.div
        className="rounded-lg border border-slate-200 bg-white p-4 sm:p-6"
        initial={false}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <MorphingChart isInView={isInView} />

        <p className="mt-3 text-center text-xs text-slate-400">
          Typical adoption curve for tools like Claude Code, Codex, and Copilot across a 50-person team
        </p>
      </motion.div>
    </div>
  )
}
