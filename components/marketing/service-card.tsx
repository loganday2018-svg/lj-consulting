"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  scope: string[]
  timeline?: string
  price?: string
  animateIcon?: boolean
}

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])
  return isTouch
}

function DesktopCard({ icon, title, description, scope, timeline, price }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rY = ((x - rect.width / 2) / (rect.width / 2)) * 4
    const rX = ((rect.height / 2 - y) / (rect.height / 2)) * 4
    setRotateX(rX)
    setRotateY(rY)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setRotateX(0); setRotateY(0) }}
      animate={{ rotateX, rotateY, translateY: isHovered ? -2 : 0 }}
      transition={{
        rotateX: { type: "spring", stiffness: 200, damping: 20 },
        rotateY: { type: "spring", stiffness: 200, damping: 20 },
        translateY: { duration: 0.2 },
      }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      className="rounded-lg border border-slate-200 bg-white p-8 transition-colors duration-200 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="mb-4 text-primary">
        <motion.div
          animate={isHovered ? { scale: [1, 1.15, 1], rotate: [0, -6, 6, 0] } : { scale: 1, rotate: 0 }}
          transition={isHovered ? { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } : { duration: 0.3 }}
        >
          {icon}
        </motion.div>
      </div>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="mb-6 leading-relaxed text-slate-700">{description}</p>
      <CardScope scope={scope} />
      <CardBadges price={price} timeline={timeline} />
    </motion.div>
  )
}

function MobileCard({ icon, title, description, scope, timeline, price }: ServiceCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-8">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="mb-6 leading-relaxed text-slate-700">{description}</p>
      <CardScope scope={scope} />
      <CardBadges price={price} timeline={timeline} />
    </div>
  )
}

function CardScope({ scope }: { scope: string[] }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-800">What&apos;s included:</p>
      <ul className="space-y-2">
        {scope.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
            <Check size={16} className="mt-0.5 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CardBadges({ price, timeline }: { price?: string; timeline?: string }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {price && (
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {price}
        </span>
      )}
      {timeline && (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
          {timeline}
        </span>
      )}
    </div>
  )
}

export function ServiceCard(props: ServiceCardProps) {
  const isTouch = useIsTouchDevice()
  return isTouch ? <MobileCard {...props} /> : <DesktopCard {...props} />
}
