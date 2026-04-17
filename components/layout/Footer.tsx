import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import { CONTACT } from '@/lib/constants'
import LogoImage from '@/Images/logo.png'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Locations', href: '/locations' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
]

const serviceLinks = [
  { label: 'Corporate Investigation', href: '/services/corporate-investigation' },
  { label: 'Pre-Matrimonial Check', href: '/services/pre-matrimonial' },
  { label: 'Employee Verification', href: '/services/employee-verification' },
  { label: 'Post-Matrimonial', href: '/services/post-matrimonial' },
  { label: 'Cyber Crime', href: '/services/cyber-crime' },
  { label: 'Asset Tracing', href: '/services/asset-tracing' },
]

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-4">
            <Image
              src={LogoImage}
              alt="Py Investigation Agency Logo"
              className="h-12 w-auto object-contain"
            />
            <span>
              <span className="block text-sm font-bold tracking-[0.2em] text-brand-white">PY INTELLIGENCE</span>
              <span className="block text-xs font-semibold tracking-[0.25em] text-brand-gold">AGENCY</span>
            </span>
          </Link>
          <p className="mt-5 text-sm leading-7 text-brand-muted">
            India&apos;s most trusted private investigation agency offering confidential and
            result-oriented detective services.
          </p>
          <div className="mt-5 flex gap-3">
            {[Twitter, Facebook, Instagram].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                aria-label="Social link"
                className="rounded-md border border-brand-border p-2 text-brand-muted transition hover:text-brand-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">Quick Links</h3>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-brand-muted transition hover:text-brand-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">Services</h3>
          <ul className="mt-4 space-y-3">
            {serviceLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-brand-muted transition hover:text-brand-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">Contact Info</h3>
          <ul className="mt-4 space-y-4 text-sm text-brand-muted">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-brand-gold" />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-brand-gold" />
              <a href={`tel:${CONTACT.phone}`} className="transition hover:text-brand-gold">
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-brand-gold" />
              <a href={`mailto:${CONTACT.email}`} className="transition hover:text-brand-gold">
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-brand-muted sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>Copyright 2025 Py Investigation Agency. All rights reserved.</p>
          <p>Privacy Policy · Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}
