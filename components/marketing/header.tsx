import Link from "next/link"
import { BRAND, NAV_LINKS, CTA } from "@/lib/constants"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-foreground">
          {BRAND.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button size="sm" render={<a href={CTA.primary.href} />}>
            {CTA.primary.label}
          </Button>
        </nav>

        {/* Simplified mobile: just the CTA button */}
        <div className="md:hidden">
          <Button size="sm" render={<a href={CTA.primary.href} />}>
            {CTA.primary.label}
          </Button>
        </div>
      </div>
    </header>
  )
}
