import Link from "next/link"
import { BRAND, NAV_LINKS } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <p className="text-lg font-bold text-white">{BRAND.name}</p>
            <p className="text-sm leading-relaxed text-slate-400">
              AI deployment &amp; adoption for PE portfolio companies.
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-block text-sm text-slate-400 transition-colors hover:text-white"
            >
              {BRAND.email}
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Navigation
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Connect
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="https://linkedin.com/in/loganday1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-white"
              >
                Logan on LinkedIn
              </a>
              <a
                href="https://linkedin.com/in/matthew-horrigan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-white"
              >
                Matt on LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-600">
          &copy; 2026 {BRAND.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
