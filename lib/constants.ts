export const BRAND = {
  name: 'L&J AI Consulting',
  tagline: 'AI Implementation for PE Portfolio Companies',
  description:
    'We help PE-backed portfolio companies deploy AI tools fast -- training, setup, and ongoing support that drives measurable operating leverage.',
  email: 'contact@ljconsulting.com',
  domain: 'ljconsulting.com',
} as const

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
] as const

export const CTA = {
  primary: {
    label: 'Book a Discovery Call',
    href: `mailto:${BRAND.email}?subject=Discovery Call Request`,
  },
} as const
