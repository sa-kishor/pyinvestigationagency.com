'use client'

import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import { useMemo, useState } from 'react'
import PageHero from '@/components/sections/PageHero'
import { investigationTypes } from '@/lib/data/services'
import { CONTACT } from '@/lib/constants'

type ContactState = {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactPage() {
  const [form, setForm] = useState<ContactState>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const validPhone = useMemo(() => /^[+]?\d{10,14}$/.test(form.phone.trim()), [form.phone])

  function onChange<K extends keyof ContactState>(key: K, value: ContactState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError('')
    setSuccess('')
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Full Name, Email Address, and Phone Number are required.')
      return
    }
    if (!emailRegex.test(form.email.trim())) {
      setError('Enter a valid email address.')
      return
    }
    if (!validPhone) {
      setError('Enter a valid phone number with 10 to 14 digits.')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    // Frontend only - show local success message
    setTimeout(() => {
      setSuccess('Thank you for your inquiry! (Frontend demo - not submitted)')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
      setLoading(false)
    }, 500)
  }

  return (
    <>
      <PageHero
        title="Contact Py Investigation Agency"
        subtitle="Confidential consultation for personal and corporate investigation requirements."
        current="Contact"
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <h2 className="text-3xl font-bold text-brand-white">Get In Touch</h2>
            <div className="h-[2px] w-16 bg-brand-gold" />

            <div className="space-y-5 text-sm text-brand-muted">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-brand-gold" />
                <span>{CONTACT.address}</span>
              </p>
              <p className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-brand-gold" />
                <a href={`tel:${CONTACT.phone}`} className="transition hover:text-brand-gold">
                  {CONTACT.phone}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-brand-gold" />
                <a href={`mailto:${CONTACT.email}`} className="transition hover:text-brand-gold">
                  {CONTACT.email}
                </a>
              </p>
            </div>

            <div className="flex gap-3">
              {[Twitter, Facebook, Instagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="rounded border border-brand-border p-2 text-brand-muted transition hover:text-brand-gold"
                  aria-label="Social profile"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-brand-border bg-brand-card-bg p-7 lg:col-span-3">
            <form onSubmit={onSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={form.name}
                onChange={(event) => onChange('name', event.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={form.email}
                onChange={(event) => onChange('email', event.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={(event) => onChange('phone', event.target.value)}
                required
              />
              <select
                value={form.service}
                onChange={(event) => onChange('service', event.target.value)}
              >
                <option value="">Service Interested In</option>
                {investigationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <textarea
                rows={5}
                placeholder="Your Message"
                value={form.message}
                onChange={(event) => onChange('message', event.target.value)}
              />

              {error ? <p className="text-sm text-red-400">{error}</p> : null}
              {success ? <p className="text-sm text-brand-gold">{success}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full rounded-sm border border-brand-gold bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-black transition hover:border-brand-gold-hover hover:bg-brand-gold-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Send Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
