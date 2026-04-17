import { MapPin } from 'lucide-react'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import { coveredCities, locationIntro } from '@/lib/data/locations'

export default function LocationsGrid() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <SectionHeader
            title="Investigation Services Across Tamil Nadu"
            subtitle="We operate across all major cities and districts with experienced field investigators."
          />
        </RevealOnScroll>

        <div className="mx-auto mt-10 max-w-4xl space-y-5 text-base leading-8 text-brand-muted">
          {locationIntro.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>

        <RevealOnScroll delay={0.15}>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {coveredCities.map((city) => (
              <div key={city} className="rounded border border-brand-border bg-brand-navy/60 px-4 py-3">
                <span className="inline-flex items-center gap-2 text-sm text-brand-white">
                  <MapPin className="h-4 w-4 text-brand-gold" />
                  {city}
                </span>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
