'use client'

import { useEffect, useState } from 'react'
import { Mail, Phone, X } from 'lucide-react'
import { CONTACT } from '@/lib/constants'

type FormData = {
  fullName: string
  phoneNumber: string
  whatsappNumber: string
  email: string
}

type FormErrors = {
  fullName?: string
  phoneNumber?: string
  email?: string
}

export default function MandatoryPopup() {
  const [isOpen, setIsOpen] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    whatsappNumber: '',
    email: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  // Prevent scroll when popup is open
  useEffect(() => {
    if (isOpen && !submitSuccess) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, submitSuccess])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required'
    }

    // Validate phone number (10-14 digits)
    const phoneRegex = /^[+]?\d{10,14}$/
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required'
    } else if (!phoneRegex.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Enter a valid phone number (10-14 digits)'
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email ID is required'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/visitor-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          whatsappNumber: formData.whatsappNumber.trim() || null,
          email: formData.email.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      const data = await response.json()
      setSubmitSuccess(true)
      
      // Close popup after 2 seconds
      setTimeout(() => {
        setIsOpen(false)
      }, 2000)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitError('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Don't render if popup is closed and form was successfully submitted
  if (!isOpen) {
    return null
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm" />

      {/* Popup Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md transform rounded-2xl border border-brand-gold/30 bg-gradient-to-br from-brand-black to-brand-black/95 p-8 shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-brand-white">Quick Access Form</h2>
            <p className="mt-2 text-sm text-brand-muted">
              Please provide your details to proceed. We'll contact you shortly.
            </p>
          </div>

          {/* Success Message */}
          {submitSuccess ? (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                  <svg
                    className="h-8 w-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-brand-white">
                Thank you! We've received your information and will contact you shortly.
              </p>
              <p className="text-xs text-brand-muted">Redirecting to website...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-brand-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-brand-border bg-brand-card-bg px-4 py-3 text-brand-white placeholder-brand-muted/50 transition focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/20"
                  disabled={isSubmitting}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-brand-white mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+91 XXXXXXXXXX"
                  className="w-full rounded-lg border border-brand-border bg-brand-card-bg px-4 py-3 text-brand-white placeholder-brand-muted/50 transition focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/20"
                  disabled={isSubmitting}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>
                )}
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-sm font-medium text-brand-white mb-2">
                  WhatsApp Number (Optional)
                </label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  placeholder="+91 XXXXXXXXXX"
                  className="w-full rounded-lg border border-brand-border bg-brand-card-bg px-4 py-3 text-brand-white placeholder-brand-muted/50 transition focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/20"
                  disabled={isSubmitting}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-brand-white mb-2">
                  Email ID *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-brand-border bg-brand-card-bg px-4 py-3 text-brand-white placeholder-brand-muted/50 transition focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/20"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                  <p className="text-sm text-red-500">{submitError}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-brand-gold py-3 text-sm font-semibold text-brand-black transition hover:bg-brand-gold-hover disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isSubmitting ? 'Submitting...' : 'Proceed to Website'}
              </button>

              <p className="text-center text-xs text-brand-muted">
                By proceeding, you agree to our terms and privacy policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
