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

// TEMP: Cal.com account isn't live yet, so the primary CTA falls back to a
// pre-filled mailto. Replace `href` with the real Cal.com URL once it exists.
const MAILTO_FALLBACK =
  'mailto:logan.day2018@gmail.com' +
  '?subject=Free%20Portfolio%20Analysis%20-%20Rubicon' +
  '&body=Hi%20Logan%2C%0A%0AI%27d%20like%20to%20book%20a%20free%20portfolio%20analysis.%20Here%27s%20a%20quick%20rundown%3A%0A%0A-%20Portfolio%20company%3A%20%0A-%20Industry%3A%20%0A-%20What%20we%27d%20want%20to%20focus%20on%3A%20%0A%0AThanks%2C%0A'

export const CTA = {
  primary: {
    label: 'Book a Free Portfolio Analysis',
    href: MAILTO_FALLBACK,
  },
} as const
