'use client'

import Link from 'next/link'
import { MessageCircle, Phone } from 'lucide-react'
import { CONTACT } from '@/lib/constants'

function FloatingActionButton({
  href,
  label,
  colorClass,
  shadowClass,
  icon,
}: {
  href: string
  label: string
  colorClass: string
  shadowClass: string
  icon: React.ReactNode
}) {
  return (
    <Link href={href} aria-label={label} className="group relative block">
      <span
        className={`absolute inset-0 rounded-full ${colorClass} opacity-40 blur-md transition group-hover:opacity-60`}
      />
      <span
        className={`absolute inset-0 rounded-full border border-white/40 ${colorClass} animate-pulse-ring`}
        aria-hidden="true"
      />
      <span
        className={`relative flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] sm:h-14 sm:w-14 ${colorClass} ${shadowClass} transition duration-300 group-hover:scale-110`}
      >
        {icon}
      </span>
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded bg-brand-black px-3 py-1.5 text-xs text-brand-white opacity-0 transition group-hover:opacity-100 sm:block">
        {label}
      </span>
    </Link>
  )
}

export default function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <FloatingActionButton
        href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
        label="Chat on WhatsApp"
        colorClass="bg-[#25D366]"
        shadowClass="shadow-[0_4px_20px_rgba(37,211,102,0.4)]"
        icon={<MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />}
      />
      <FloatingActionButton
        href={`tel:${CONTACT.phone}`}
        label="Call Us Now"
        colorClass="bg-brand-gold"
        shadowClass="shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
        icon={<Phone className="h-5 w-5 sm:h-6 sm:w-6" />}
      />
    </div>
  )
}
