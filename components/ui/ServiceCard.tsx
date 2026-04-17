import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  Fingerprint,
  Heart,
  Laptop,
  Search,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import type { ServiceItem } from '@/lib/data/services'

const iconMap = {
  Heart,
  UserCheck,
  Building2,
  ShieldCheck,
  Fingerprint,
  Search,
  Laptop,
}

type ServiceCardProps = {
  service: ServiceItem
  compact?: boolean
}

export default function ServiceCard({ service, compact = true }: ServiceCardProps) {
  const Icon = iconMap[service.icon]

  return (
    <Link href={service.slug} className="block h-full" aria-label={`Open ${service.title}`}>
      <GlassCard className="service-card h-full">
        <div className="mb-5 inline-flex rounded-md border border-brand-border bg-brand-black/40 p-3">
          <Icon className="h-6 w-6 text-brand-gold" />
        </div>
        <h3 className="text-lg font-semibold text-brand-white">{service.title}</h3>
        <p className="mt-3 text-sm leading-6 text-brand-muted">
          {compact ? service.shortDesc : service.fullDesc}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold transition hover:underline">
          Learn More <ArrowRight className="h-4 w-4" />
        </span>
      </GlassCard>
    </Link>
  )
}
