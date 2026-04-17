import Link from 'next/link'
import CallbackForm from '@/components/sections/CallbackForm'
import CTABanner from '@/components/sections/CTABanner'
import PageHero from '@/components/sections/PageHero'
import type { ServiceItem } from '@/lib/data/services'

type ServiceDetailLayoutProps = {
  service: ServiceItem
  relatedServices: ServiceItem[]
}

const serviceTypeMap: Record<string, string> = {
  'pre-matrimonial': 'Pre-Matrimonial',
  'post-matrimonial': 'Post-Matrimonial',
  'corporate-investigation': 'Corporate',
  'employee-verification': 'Employee Verification',
  'forensic-investigation': 'Forensic',
  'asset-tracing': 'Asset Tracing',
  'cyber-crime': 'Cyber Crime',
}

export default function ServiceDetailLayout({
  service,
  relatedServices,
}: ServiceDetailLayoutProps) {
  return (
    <>
      <PageHero title={service.title} subtitle={service.fullDesc} current={service.title} />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-5">
          <div className="space-y-10 lg:col-span-3">
            <div>
              <h2 className="text-2xl font-semibold text-brand-white">What is {service.title}?</h2>
              <p className="mt-4 text-base leading-8 text-brand-muted">{service.whatIs}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-brand-white">What We Investigate</h3>
              <ul className="mt-4 space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-brand-muted">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-gold" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-brand-white">Our Process</h3>
              <ol className="mt-4 space-y-4">
                {service.process.map((step) => (
                  <li key={step.step} className="rounded-lg border border-brand-border bg-brand-navy/70 p-4">
                    <p className="text-sm font-semibold text-brand-gold">Step {step.step}</p>
                    <p className="mt-1 text-base font-semibold text-brand-white">{step.title}</p>
                    <p className="mt-1 text-sm leading-7 text-brand-muted">{step.desc}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-brand-white">Why Choose Us for This Service</h3>
              <p className="mt-4 text-base leading-8 text-brand-muted">{service.whyChoose}</p>
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-2">
            <CallbackForm prefilledType={serviceTypeMap[service.id] ?? ''} />
            <div className="rounded-xl border border-brand-border bg-brand-card-bg p-6">
              <h3 className="text-lg font-semibold text-brand-white">Related Services</h3>
              <ul className="mt-4 space-y-3">
                {relatedServices.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.slug}
                      className="text-sm text-brand-muted transition hover:text-brand-gold"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
