"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Maximize, Pause, Play } from "lucide-react"

const DEMOS = [
  {
    id: "pnl",
    tab: "P&L Dashboard",
    src: "/demo.mp4",
    poster: "/demo-poster.jpg",
    eyebrow: "See it in action",
    heading: "9 Minutes from Raw Data to Dashboard",
    description:
      "Watch a P&L dashboard get built from scratch using Claude Code. 9 minutes and 30 seconds of real time, not a mockup.",
  },
  {
    id: "orgchart",
    tab: "Org Chart",
    src: "/demo-orgchart.mp4",
    poster: "",
    eyebrow: "See it in action",
    heading: "Rosters to Interactive Dashboards in 4 Minutes",
    description:
      "A raw employee roster becomes a fully interactive org chart. 4 minutes of real work, no templates or drag-and-drop.",
  },
  {
    id: "crm",
    tab: "CRM Insights",
    src: "/demo-crm.mp4",
    poster: "",
    eyebrow: "See it in action",
    heading: "CRM Data to Actionable Insights in 7 Minutes",
    description:
      "Watch a messy CRM export get turned into pipeline insights your sales team can act on. 7 minutes from raw file to clear direction.",
  },
] as const

function VideoPlayer({
  src,
  poster,
  isActive,
}: {
  src: string
  poster: string
  isActive: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scheduleHide = useCallback(() => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current)
    setShowControls(true)
    if (isPlaying) {
      hideTimeout.current = setTimeout(() => setShowControls(false), 2500)
    }
  }, [isPlaying])

  useEffect(() => {
    if (!isPlaying && hasStarted) {
      setShowControls(true)
      if (hideTimeout.current) clearTimeout(hideTimeout.current)
    } else if (isPlaying) {
      scheduleHide()
    }
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current)
    }
  }, [isPlaying, hasStarted, scheduleHide])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onTime = () => {
      if (video.duration) setProgress((video.currentTime / video.duration) * 100)
    }
    video.addEventListener("timeupdate", onTime)
    return () => video.removeEventListener("timeupdate", onTime)
  }, [])

  // Pause when tab switches away
  useEffect(() => {
    if (!isActive && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause()
    }
  }, [isActive])

  function togglePlay() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setHasStarted(true)
    } else {
      video.pause()
    }
  }

  function handleFullscreen() {
    const video = videoRef.current
    if (!video) return
    if (video.requestFullscreen) {
      video.requestFullscreen()
    } else if (
      (video as HTMLVideoElement & { webkitEnterFullscreen?: () => void })
        .webkitEnterFullscreen
    ) {
      ;(
        video as HTMLVideoElement & { webkitEnterFullscreen: () => void }
      ).webkitEnterFullscreen()
    }
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const video = videoRef.current
    if (!video || !video.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    video.currentTime = ratio * video.duration
    setProgress(ratio * 100)
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-slate-950"
      style={{
        boxShadow:
          "0 0 0 1px oklch(0.208 0.042 265 / 0.1), 0 8px 40px -8px oklch(0.208 0.042 265 / 0.35), 0 0 80px -20px oklch(0.488 0.243 264 / 0.15)",
      }}
      onMouseMove={() => hasStarted && scheduleHide()}
      onMouseLeave={() => {
        if (isPlaying) setShowControls(false)
      }}
    >
      <video
        ref={videoRef}
        className="w-full"
        poster={poster || undefined}
        muted
        playsInline
        preload="metadata"
        onClick={() => hasStarted && togglePlay()}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Initial play overlay */}
      {!hasStarted && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-slate-950/30 transition-colors hover:bg-slate-950/20"
          aria-label="Play demo video"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg md:h-20 md:w-20">
            <Play
              className="ml-1 h-7 w-7 text-slate-900 md:h-8 md:w-8"
              fill="currentColor"
            />
          </div>
        </button>
      )}

      {/* Slim controls bar */}
      {hasStarted && (
        <div
          className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-4 pb-3 pt-8 transition-opacity duration-300"
          style={{
            background: "linear-gradient(transparent, oklch(0 0 0 / 0.6))",
            opacity: showControls ? 1 : 0,
            pointerEvents: showControls ? "auto" : "none",
          }}
        >
          <button
            onClick={togglePlay}
            className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-white/90 transition-colors hover:text-white"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" fill="currentColor" />
            ) : (
              <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
            )}
          </button>

          <div
            className="group relative h-1 flex-1 cursor-pointer rounded-full bg-white/20"
            onClick={handleSeek}
          >
            <div
              className="h-full rounded-full bg-white/80 transition-colors group-hover:bg-white"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover:opacity-100"
              style={{ left: `${progress}%`, marginLeft: "-6px" }}
            />
          </div>

          <button
            onClick={handleFullscreen}
            className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-white/90 transition-colors hover:text-white"
            aria-label="Full screen"
          >
            <Maximize className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export function VideoDemo() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = DEMOS[activeIndex]

  return (
    <section className="border-t border-slate-200 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Tabs */}
        <div className="mx-auto mb-8 flex max-w-md gap-1 rounded-full border border-slate-200 bg-slate-100 p-1">
          {DEMOS.map((demo, i) => (
            <button
              key={demo.id}
              onClick={() => setActiveIndex(i)}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                i === activeIndex
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {demo.tab}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 text-center shadow-sm md:px-10 md:py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            {active.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
            {active.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-700">
            {active.description}
          </p>
        </div>

        {/* Video players — render both, show active */}
        <div className="mt-12">
          {DEMOS.map((demo, i) => (
            <div
              key={demo.id}
              className={i === activeIndex ? "block" : "hidden"}
            >
              <VideoPlayer
                src={demo.src}
                poster={demo.poster}
                isActive={i === activeIndex}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
