export type Testimonial = {
  id: number
  quote: string
  name: string
  date: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'Parthiban sir is very kind and professional. Trustworthy service, quick response, and clear guidance. Highly recommended!',
    name: 'Divyadharshini',
    date: '12 Jan 2025',
  },
  {
    id: 2,
    quote:
      'This agency truly exceeded my expectations. Their investigators are highly experienced, professional, and extremely committed to delivering accurate information. I greatly appreciate their thorough approach and prompt results. I would wholeheartedly recommend them to anyone in need of reliable and trustworthy investigation support.',
    name: 'Gayathri.V',
    date: '05 Dec 2025',
  },
  {
    id: 3,
    quote:
      'Very good work done. Highly recommended. I used them for gathering evidence against my cheating spouse.',
    name: 'Sudha Sudha',
    date: '26 Apr 2025',
  },
]

export const trustBadges = [
  { label: 'Years Experience', value: '3+', icon: 'ShieldCheck' },
  { label: 'Cases Resolved', value: '300+', icon: 'BriefcaseBusiness' },
  { label: 'Confidentiality', value: '100%', icon: 'Lock' },
] as const
