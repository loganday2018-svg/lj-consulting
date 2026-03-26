import Link from "next/link"
import { BRAND, NAV_LINKS } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-700">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Brand info */}
          <div className="space-y-2">
            <p className="text-lg font-bold text-foreground">{BRAND.name}</p>
            <p className="text-sm text-slate-500">{BRAND.tagline}</p>
          </div>

          {/* Navigation and contact */}
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-700 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <a
              href={`mailto:${BRAND.email}`}
              className="text-slate-500 transition-colors hover:text-foreground"
            >
              {BRAND.email}
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          &copy; 2026 {BRAND.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
