import Image from 'next/image'
import { BriefcaseBusiness, Lock, ShieldCheck, Star } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import { testimonials, trustBadges } from '@/lib/data/testimonials'

const iconMap = {
  ShieldCheck,
  BriefcaseBusiness,
  Lock,
}

export default function TestimonialsSection() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <SectionHeader title="Trusted by Hundreds of Clients" />
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <RevealOnScroll key={item.id} delay={index * 0.08}>
              <GlassCard className="h-full">
                <div className="flex items-center gap-1 text-brand-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-brand-muted">&quot;{item.quote}&quot;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-11 w-11 overflow-hidden rounded-full border border-brand-border bg-brand-navy">
                    <Image
                      src={item.avatar}
                      alt={`${item.name} avatar`}
                      width={44}
                      height={44}
                      className="h-full w-full object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxJyBoZWlnaHQ9JzEnPjxyZWN0IHdpZHRoPScxJyBoZWlnaHQ9JzEnIGZpbGw9JyMxMTE4MjcnLz48L3N2Zz4="
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-white">{item.name}</p>
                    <p className="text-xs text-brand-muted">{item.city}</p>
                  </div>
                </div>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {trustBadges.map((badge, index) => {
            const Icon = iconMap[badge.icon]
            return (
              <RevealOnScroll key={badge.label} delay={index * 0.09}>
                <div className="rounded-lg border border-brand-border bg-brand-navy/70 px-5 py-6 text-center">
                  <Icon className="mx-auto h-7 w-7 text-brand-gold" />
                  <p className="mt-3 text-2xl font-bold text-brand-white">{badge.value}</p>
                  <p className="text-sm text-brand-muted">{badge.label}</p>
                </div>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
