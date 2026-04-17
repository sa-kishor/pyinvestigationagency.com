import {
  Banknote,
  BriefcaseBusiness,
  Building2,
  Scale,
  Shield,
  UserRound,
  Users,
  Warehouse,
} from 'lucide-react'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'

const industries = [
  { label: 'Corporate & Business', icon: Building2 },
  { label: 'Family & Matrimonial', icon: Users },
  { label: 'Legal & Judiciary', icon: Scale },
  { label: 'Real Estate & Property', icon: Warehouse },
  { label: 'HR & Recruitment', icon: BriefcaseBusiness },
  { label: 'Finance & Banking', icon: Banknote },
  { label: 'NGOs & Institutions', icon: Shield },
  { label: 'Private Individuals', icon: UserRound },
]

export default function ExpertiseGrid() {
  return (
    <section className="bg-brand-navy px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <SectionHeader
            title="Industries & Expertise"
            subtitle="We serve individuals, corporates, and legal entities with precision."
          />
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {industries.map((item, index) => {
            const Icon = item.icon
            return (
              <RevealOnScroll key={item.label} delay={index * 0.07}>
                <div className="group rounded-lg border border-brand-border bg-brand-black/35 p-6 text-center transition hover:border-brand-gold/50">
                  <Icon className="mx-auto h-8 w-8 text-brand-gold transition group-hover:scale-110" />
                  <p className="mt-4 text-sm font-medium text-brand-white group-hover:text-brand-gold">
                    {item.label}
                  </p>
                </div>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
