"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { BRAND, NAV_LINKS, CTA } from "@/lib/constants"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur border-b border-slate-200"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          {/* Monogram logo mark */}
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold transition-colors duration-300 ${
              scrolled
                ? "bg-primary text-primary-foreground"
                : "bg-white/15 text-white"
            }`}
          >
            L&J
          </div>
          <span
            className={`text-lg font-bold transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            {BRAND.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-slate-700 hover:text-foreground"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button render={<a href={CTA.primary.href} />}>
            {CTA.primary.label}
          </Button>
        </nav>

        {/* Mobile: hamburger toggle */}
        <button
          className={`rounded-md p-2 transition-colors md:hidden ${
            scrolled
              ? "text-slate-700 hover:text-foreground"
              : "text-white hover:text-slate-200"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu — animated */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className={`overflow-hidden md:hidden ${
              scrolled
                ? "border-t border-slate-200 bg-background"
                : "border-t border-white/10 bg-primary"
            }`}
          >
            <nav className="flex flex-col gap-4 px-6 pb-6 pt-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    scrolled
                      ? "text-slate-700 hover:text-foreground"
                      : "text-slate-300 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button
                  className="w-full"
                  render={<a href={CTA.primary.href} />}
                >
                  {CTA.primary.label}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
