import CTABanner from '@/components/sections/CTABanner'
import LocationsGrid from '@/components/sections/LocationsGrid'
import PageHero from '@/components/sections/PageHero'

const availableServices = [
  'Corporate Investigation',
  'Pre-Matrimonial Check',
  'Employee Verification',
  'Post-Matrimonial Investigation',
  'Cyber Crime Investigation',
  'Forensic Investigation',
  'Asset Tracing',
  'Digital Forensics',
]

export default function LocationsPage() {
  return (
    <>
      <PageHero
        title="Investigation Services Across Tamil Nadu"
        subtitle="We operate across all major cities and districts with experienced field investigators."
        current="Locations"
      />

      <section className="px-4 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-semibold text-brand-white">Investigation Services Available</h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {availableServices.map((service) => (
              <li key={service} className="rounded border border-brand-border bg-brand-navy/70 px-4 py-3 text-sm text-brand-muted">
                {service}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <LocationsGrid />
      <CTABanner title="Need Investigation Support Anywhere in Tamil Nadu?" subtitle="Our regional teams are ready to begin discreet on-ground and digital investigations immediately." />
    </>
  )
}
