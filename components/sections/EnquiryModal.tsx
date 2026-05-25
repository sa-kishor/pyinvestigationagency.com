'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { investigationTypes } from '@/lib/data/services'

interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    type: '',
    message: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const validPhone = /^[+]?\d{10,14}$/.test(form.phone.trim())

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

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

    try {
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

      setSuccess('Thank you! We received your inquiry. Check your email for confirmation.')
      setForm({ name: '', phone: '', email: '', type: '', message: '' })
      
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (err) {
      console.error('Submit error:', err)
      setError('Error processing request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-brand-navy p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-brand-muted hover:text-brand-gold"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-brand-white">Confidential Enquiry</h2>
        <p className="mt-2 text-sm text-brand-muted">
          100% Private & Secure. We'll contact you shortly.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="rounded-md bg-red-900/30 p-3 text-sm text-red-400">
              {error}
            </div>
          )}
          
          {success && (
            <div className="rounded-md bg-green-900/30 p-3 text-sm text-green-400">
              {success}
            </div>
          )}

          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-md border border-brand-border bg-brand-black px-4 py-2 text-brand-white placeholder-brand-muted focus:border-brand-gold focus:outline-none disabled:opacity-50"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={form.phone}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-md border border-brand-border bg-brand-black px-4 py-2 text-brand-white placeholder-brand-muted focus:border-brand-gold focus:outline-none disabled:opacity-50"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address (optional)"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-md border border-brand-border bg-brand-black px-4 py-2 text-brand-white placeholder-brand-muted focus:border-brand-gold focus:outline-none disabled:opacity-50"
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-md border border-brand-border bg-brand-black px-4 py-2 text-brand-white focus:border-brand-gold focus:outline-none disabled:opacity-50"
          >
            <option value="">Select Service Type</option>
            {investigationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <textarea
            name="message"
            placeholder="Your Message (optional)"
            value={form.message}
            onChange={handleChange}
            disabled={loading}
            rows={4}
            className="w-full rounded-md border border-brand-border bg-brand-black px-4 py-2 text-brand-white placeholder-brand-muted focus:border-brand-gold focus:outline-none disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm border border-brand-gold bg-brand-gold px-4 py-3 font-semibold text-brand-black transition hover:bg-brand-gold-hover disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Send Confidential Enquiry'}
          </button>
        </form>

        <p className="mt-4 text-xs text-brand-muted">
          ✓ Your information is 100% confidential and secure.
        </p>
      </div>
    </div>
  )
}
