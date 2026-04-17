import CTABanner from '@/components/sections/CTABanner'
import PageHero from '@/components/sections/PageHero'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import ServiceCard from '@/components/ui/ServiceCard'
import { services } from '@/lib/data/services'

const values = [
  'Integrity: We operate with complete honesty and transparency.',
  'Confidentiality: Client privacy is our top priority.',
  'Accuracy: We deal in facts, not assumptions.',
  'Professionalism: Our team handles sensitive situations carefully.',
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Py Investigation Agency"
        subtitle="The premier intelligence agency in Pondicherry and Tamil Nadu."
        current="About"
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <RevealOnScroll>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-brand-white">Our Mission</h2>
                <p className="mt-4 text-base leading-8 text-brand-muted">
                  To provide accurate, confidential, and timely intelligence to our clients,
                  enabling them to make informed decisions in their personal and professional lives.
                  We uphold the highest standards of ethics and integrity in every investigation.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-brand-white">Why We Started?</h2>
                <p className="mt-4 text-base leading-8 text-brand-muted">
                  Py Investigation Agency was founded to bring truth to light in situations defined
                  by uncertainty. We identified a strong need for reliable, discreet, and ethically
                  grounded investigative support for individuals, businesses, and institutions.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="rounded-xl border border-brand-border bg-brand-card-bg p-8">
              <h3 className="text-2xl font-semibold text-brand-white">Core Values</h3>
              <ul className="mt-6 space-y-4">
                {values.map((value) => (
                  <li key={value} className="flex items-start gap-3 text-sm leading-7 text-brand-muted">
                    <span className="mt-3 h-1.5 w-1.5 rounded-full bg-brand-gold" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <RevealOnScroll>
            <SectionHeader title="Our Expertise" />
          </RevealOnScroll>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service, index) => (
              <RevealOnScroll key={service.id} delay={index * 0.08}>
                <ServiceCard service={service} compact={false} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
