export const BRAND = {
  name: 'Day Horrigan',
  tagline: 'AI Implementation for PE Portfolio Companies',
  description:
    'We help PE-backed portfolio companies deploy AI tools fast -- training, setup, and ongoing support that drives measurable operating leverage.',
  email: 'contact@ljconsulting.com',
  domain: 'ljconsulting.com',
} as const

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Demo', href: '/demo' },
  { label: 'ROI Calculator', href: '/calculator' },
  { label: 'Our Playbook', href: '/batten' },
  { label: 'About', href: '/about' },
] as const

export const CTA = {
  primary: {
    label: 'Book a Free Portfolio Analysis',
    // TODO: Replace with real Cal.com link once account is created
    href: 'https://cal.com/lj-consulting/discovery',
  },
} as const
