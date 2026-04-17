export type Testimonial = {
  id: number
  quote: string
  name: string
  city: string
  avatar: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'The team handled our case with absolute discretion. Their report was detailed, timely, and helped us take the right legal path.',
    name: 'Raghav S.',
    city: 'Chennai',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 2,
    quote:
      'We engaged Py Investigation for corporate due diligence. Their process was methodical and the findings were highly reliable.',
    name: 'Priya M.',
    city: 'Coimbatore',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 3,
    quote:
      'From first consultation to final report, everything was handled professionally. Their confidentiality standards are exceptional.',
    name: 'Arun K.',
    city: 'Pondicherry',
    avatar:
      'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=120&q=80',
  },
]

export const trustBadges = [
  { label: 'Years Experience', value: '15+', icon: 'ShieldCheck' },
  { label: 'Cases Resolved', value: '500+', icon: 'BriefcaseBusiness' },
  { label: 'Confidentiality', value: '100%', icon: 'Lock' },
] as const
