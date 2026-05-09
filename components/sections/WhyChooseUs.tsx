import { CheckCheck, ShieldCheck } from 'lucide-react'
import CallbackForm from '@/components/sections/CallbackForm'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const points = [
  {
    title: '100% Confidentiality',
    desc: 'Every case is handled with complete discretion. Client identity, case details, and evidence remain protected under strict protocols.',
  },
  {
    title: 'Proven Results',
    desc: 'With over 15 years of field experience, we manage complex investigations with systematic methods and documented reporting.',
  },
  {
    title: 'Strong Presence Across Tamil Nadu, Puducherry & Bengaluru',
    desc: 'Our local investigators navigate cities and districts efficiently for quick response and discreet ground-level investigation.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-5">
        <RevealOnScroll delay={0.1} className="lg:col-span-3">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="h-10 w-1 bg-brand-gold" />
              <h2 className="text-3xl font-bold text-brand-white lg:text-4xl">Why Trust Py Investigation?</h2>
            </div>
            <div className="space-y-6">
              {points.map((point) => (
                <div key={point.title} className="flex items-start gap-4 rounded-lg border border-brand-border p-5">
                  <div className="rounded-md border border-brand-border bg-brand-navy p-2">
                    {point.title === '100% Confidentiality' ? (
                      <ShieldCheck className="h-5 w-5 text-brand-gold" />
                    ) : (
                      <CheckCheck className="h-5 w-5 text-brand-gold" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-brand-white">{point.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-brand-muted">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.25} className="lg:col-span-2">
          <div>
            <CallbackForm />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
