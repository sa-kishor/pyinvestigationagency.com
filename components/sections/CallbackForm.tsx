'use client'

import { useMemo, useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import { investigationTypes } from '@/lib/data/services'

type CallbackFormProps = {
  title?: string
  ctaLabel?: string
  prefilledType?: string
}

type FormState = {
  name: string
  phone: string
  email: string
  type: string
  message: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function CallbackForm({
  title = 'Request Callback',
  ctaLabel = 'Get Free Consultation',
  prefilledType = '',
}: CallbackFormProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    type: prefilledType,
    message: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const validPhone = useMemo(() => /^[+]?\d{10,14}$/.test(form.phone.trim()), [form.phone])

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError('')
    setSuccess('')
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.name.trim() || !form.phone.trim()) {
      setError('Full Name and Phone Number are required.')
      return
    }
    if (!validPhone) {
      setError('Enter a valid phone number with 10 to 14 digits.')
      return
    }
    if (form.email.trim() && !emailRegex.test(form.email.trim())) {
      setError('Enter a valid email address.')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      setLoading(true)
      setError('')
      setSuccess('')

      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim() || 'noemail@provided.com',
          phone: form.phone.trim(),
          serviceType: form.type || 'General Inquiry',
          message: form.message.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to submit: ${response.statusText}`)
      }

      const data = await response.json()
      setSuccess('Thank you! We received your inquiry. Check your email for confirmation.')
      setForm({ name: '', phone: '', email: '', type: prefilledType, message: '' })
      setLoading(false)
    } catch (err) {
      console.error('Submit error:', err)
      setError('Error processing request. Please try again.')
      setLoading(false)
    }
  }

  return (
    <GlassCard>
      <h3 className="text-2xl font-semibold text-brand-white">{title}</h3>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Full Name *"
          value={form.name}
          onChange={(event) => onChange('name', event.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number *"
          value={form.phone}
          onChange={(event) => onChange('phone', event.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(event) => onChange('email', event.target.value)}
        />
        <select value={form.type} onChange={(event) => onChange('type', event.target.value)}>
          <option value="">Select Investigation Type</option>
          {investigationTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <textarea
          rows={4}
          placeholder="Message / Brief Description"
          value={form.message}
          onChange={(event) => onChange('message', event.target.value)}
        />

        {error ? <p className="rounded-md p-3 text-sm bg-red-900/30 text-red-400">{error}</p> : null}
        {success ? <p className="rounded-md p-3 text-sm bg-green-900/30 text-green-400">{success}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full rounded-sm border border-brand-gold bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-black transition hover:border-brand-gold-hover hover:bg-brand-gold-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : ctaLabel}
        </button>
      </form>
    </GlassCard>
  )
}
