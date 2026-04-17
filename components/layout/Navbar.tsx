'use client'

import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { CONTACT, NAV_LOCATIONS } from '@/lib/constants'
import LogoImage from '@/Images/logo.png'

const serviceLinks = [
  { label: 'Pre-Matrimonial', href: '/services/pre-matrimonial' },
  { label: 'Post-Matrimonial', href: '/services/post-matrimonial' },
  { label: 'Corporate Investigation', href: '/services/corporate-investigation' },
  { label: 'Employee Verification', href: '/services/employee-verification' },
  { label: 'Forensic Investigation', href: '/services/forensic-investigation' },
  { label: 'Asset Tracing', href: '/services/asset-tracing' },
  { label: 'Cyber Crime & Forensics', href: '/services/cyber-crime' },
]

const primaryLinks = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

function DesktopDropdown({
  label,
  links,
}: {
  label: string
  links: Array<{ label: string; href: string }>
}) {
  return (
    <div className="group relative">
      <button className="inline-flex items-center gap-1 text-sm font-medium text-brand-white transition hover:text-brand-gold">
        {label}
        <ChevronDown className="h-4 w-4" />
      </button>
      <div className="pointer-events-none absolute left-0 top-full z-40 min-w-64 rounded-md border border-brand-border bg-brand-black p-2 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded px-3 py-2 text-sm text-brand-muted transition hover:bg-brand-navy hover:text-brand-gold"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false)

  const locationLinks = useMemo(
    () => NAV_LOCATIONS.map((city) => ({ label: city, href: '/locations' })),
    []
  )

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-[rgba(11,15,25,0.95)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-4">
          <Image
            src={LogoImage}
            alt="Py Investigation Agency Logo"
            className="h-12 w-auto object-contain"
            priority
          />
          <span>
            <span className="block text-xs font-bold tracking-[0.2em] text-brand-white sm:text-sm">
              PY INTELLIGENCE
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.3em] text-brand-gold sm:text-xs">
              AGENCY
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <DesktopDropdown label="Services" links={serviceLinks} />
          <DesktopDropdown label="Locations" links={locationLinks} />
          {primaryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-brand-white transition hover:text-brand-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="btn-gold inline-flex rounded-sm border border-brand-gold bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-black transition hover:border-brand-gold-hover hover:bg-brand-gold-hover"
          >
            Confidential Enquiry
          </Link>
        </div>

        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="h-6 w-6 text-brand-gold" /> : <Menu className="h-6 w-6 text-brand-gold" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-20 z-40 overflow-y-auto bg-brand-black p-6 md:hidden"
          >
            <div className="space-y-4">
              <button
                className="flex w-full items-center justify-between border-b border-brand-border py-3 text-left text-lg text-brand-white"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
              >
                Services
                <ChevronDown
                  className={`h-5 w-5 text-brand-gold transition ${mobileServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileServicesOpen ? (
                <div className="space-y-2 rounded border border-brand-border bg-brand-navy/60 p-3">
                  {serviceLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 text-sm text-brand-muted"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}

              <button
                className="flex w-full items-center justify-between border-b border-brand-border py-3 text-left text-lg text-brand-white"
                onClick={() => setMobileLocationsOpen((prev) => !prev)}
              >
                Locations
                <ChevronDown
                  className={`h-5 w-5 text-brand-gold transition ${mobileLocationsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileLocationsOpen ? (
                <div className="grid grid-cols-2 gap-2 rounded border border-brand-border bg-brand-navy/60 p-3">
                  {locationLinks.map((item, idx) => (
                    <Link
                      key={`${item.label}-${idx}`}
                      href={item.href}
                      className="py-2 text-sm text-brand-muted"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}

              {primaryLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-b border-brand-border py-3 text-lg text-brand-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/contact"
                className="btn-gold mt-4 inline-flex w-full items-center justify-center rounded-sm border border-brand-gold bg-brand-gold px-4 py-3 text-sm font-semibold text-brand-black"
                onClick={() => setMobileOpen(false)}
              >
                Confidential Enquiry
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-brand-border pt-6">
              <a
                href={`tel:${CONTACT.phone}`}
                className="inline-flex items-center gap-2 text-sm text-brand-gold"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                className="rounded border border-brand-gold px-4 py-2 text-sm text-brand-gold"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
