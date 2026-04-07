"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { useBlogTheme } from "./blog-shell"

export function ReadingProgress({
  target,
}: {
  target: React.RefObject<HTMLElement | null>
}) {
  const { accent } = useBlogTheme()
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 z-[45] h-[3px] origin-left"
      style={{ scaleX, backgroundColor: accent }}
    />
  )
}
