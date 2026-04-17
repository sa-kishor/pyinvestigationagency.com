import GoldButton from '@/components/ui/GoldButton'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import ServiceCard from '@/components/ui/ServiceCard'
import { services } from '@/lib/data/services'

export default function CoreServices() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <SectionHeader
            title="Our Core Investigation Areas"
            subtitle="Comprehensive detective solutions tailored to your specific needs."
          />
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service, index) => (
            <RevealOnScroll key={service.id} delay={index * 0.08}>
              <ServiceCard service={service} />
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-10 text-center">
          <GoldButton href="/services" variant="outline">
            View All Services →
          </GoldButton>
        </div>
      </div>
    </section>
  )
}
