import CTABanner from '@/components/sections/CTABanner'
import PageHero from '@/components/sections/PageHero'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import ServiceCard from '@/components/ui/ServiceCard'
import { services } from '@/lib/data/services'

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Investigation Services"
        subtitle="Comprehensive, confidential, and result-oriented detective services."
        current="Services"
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
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
