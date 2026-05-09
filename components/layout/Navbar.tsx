'use client'

import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { useState } from 'react'
import { CONTACT } from '@/lib/constants'
import LogoImage from '@/Images/logo.png'

const primaryLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

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
              PY INVESTIGATION
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.3em] text-brand-gold sm:text-xs">
              AGENCY
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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
