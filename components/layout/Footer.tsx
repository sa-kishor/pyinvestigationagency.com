import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT } from '@/lib/constants'
import LogoImage from '@/Images/logo.png'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Reviews', href: '/reviews' },
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
              <span className="block text-sm font-bold tracking-[0.2em] text-brand-white">PY INVESTIGATION</span>
              <span className="block text-xs font-semibold tracking-[0.25em] text-brand-gold">AGENCY</span>
            </span>
          </Link>
          <p className="mt-5 text-sm leading-7 text-brand-muted">
            India&apos;s most trusted private investigation agency offering confidential and
            result-oriented detective services.
          </p>
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
              <div className="space-y-1">
                <a href={`tel:${CONTACT.phone}`} className="block transition hover:text-brand-gold">
                  {CONTACT.phone}
                </a>
                <a href={`tel:${CONTACT.phone2}`} className="block transition hover:text-brand-gold">
                  {CONTACT.phone2}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-brand-gold" />
              <a href={`mailto:${CONTACT.email}`} className="transition hover:text-brand-gold">
                {CONTACT.email}
              </a>
            </li>
          </ul>

          <div className="mt-6 flex gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=61590361357500"
              className="rounded border border-brand-border p-2 text-brand-muted transition hover:text-brand-gold"
              aria-label="Facebook"
              title="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="rounded border border-brand-border p-2 text-brand-muted transition hover:text-brand-gold"
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.justdial.com/Pondicherry/PY-Investigation-Agency-Opposite-To-Police-Station-Mudaliarpet/0413PX413-X413-240909161629-L2I5_BZDET#google_vignette"
              className="rounded border border-brand-border p-2 transition hover:opacity-80"
              aria-label="Just Dial"
              title="Just Dial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/justdial.svg"
                alt="Just Dial"
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
              />
            </a>
          </div>
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
