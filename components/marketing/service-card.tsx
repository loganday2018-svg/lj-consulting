"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
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

export function ServiceCard({
  icon,
  title,
  description,
  scope,
  timeline,
  price,
  animateIcon,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [iconPlayed, setIconPlayed] = useState(false)
  const isTouch = useIsTouchDevice()
  const prefersReduced = useReducedMotion()

  // On scroll-in (animateIcon prop), play the icon animation once
  useEffect(() => {
    if (animateIcon && !iconPlayed) {
      setIconPlayed(true)
    }
  }, [animateIcon, iconPlayed])

  const shouldAnimateIcon = isTouch ? iconPlayed : isHovered

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rY = ((x - centerX) / centerX) * 4
    const rX = ((centerY - y) / centerY) * 4

    setRotateX(rX)
    setRotateY(rY)
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }, [])

  // Desktop: cursor-tracking tilt. Mobile: tap spring.
  if (isTouch || prefersReduced) {
    return (
      <motion.div
        ref={cardRef}
        whileTap={{ scale: 0.98, rotateX: 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="rounded-lg border border-slate-200 bg-white p-8 transition-all duration-200 hover:border-primary/40 hover:shadow-lg"
      >
        <div className="mb-4 text-primary">
          <motion.div
            animate={shouldAnimateIcon ? {
              scale: [1, 1.2, 1],
              rotate: [0, -8, 8, 0],
            } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {icon}
          </motion.div>
        </div>
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
      </motion.div>
    )
  }

  // Desktop: full cursor-tracking tilt
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        translateY: isHovered ? -2 : 0,
      }}
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
          animate={isHovered ? {
            scale: [1, 1.15, 1],
            rotate: [0, -6, 6, 0],
          } : { scale: 1, rotate: 0 }}
          transition={isHovered ? {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          } : { duration: 0.3 }}
        >
          {icon}
        </motion.div>
      </div>
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
    </motion.div>
  )
}
