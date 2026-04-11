export const BRAND = {
  name: 'Rubicon',
  tagline: 'AI Implementation for PE Portfolio Companies',
  description:
    'We help PE-backed portfolio companies deploy AI tools fast -- training, setup, and ongoing support that drives measurable operating leverage.',
  email: 'logan.day2018@gmail.com',
  domain: 'rubiconaiconsulting.com',
} as const

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Demo', href: '/demo' },
  { label: 'ROI Calculator', href: '/calculator' },
  { label: 'Our Playbook', href: '/batten' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
] as const

export const CTA = {
  primary: {
    label: 'Book a 15-Min Intro',
    href: 'https://cal.com/logan-rubicon/15min',
  },
  demo: {
    label: 'Book a Live Demo',
    href: 'https://cal.com/logan-rubicon/60min',
  },
} as const
