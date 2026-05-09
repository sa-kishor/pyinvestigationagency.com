'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'

interface Review {
  id: string
  name: string
  rating: number
  text: string
  createdAt: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState('recent')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchReviews()
  }, [selectedRating, sortBy])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      // Frontend only - show mock reviews
      const mockReviews: Review[] = [
        {
          id: '1',
          name: 'Rajesh Kumar',
          rating: 5,
          text: 'Excellent investigation service. The team was professional and delivered results on time.',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Priya Singh',
          rating: 5,
          text: 'Highly recommend their corporate investigation services. Very discreet and thorough.',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ]

      // Apply filters and sorting
      let filtered = mockReviews
      if (selectedRating) {
        filtered = filtered.filter((r) => r.rating === selectedRating)
      }
      if (sortBy === 'highest') {
        filtered = filtered.sort((a, b) => b.rating - a.rating)
      } else {
        filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      }

      setReviews(filtered)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHero title="Customer Reviews" subtitle="See what our clients say about our investigation services" current="Reviews" />

      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Filters and Sort */}
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-gold">
                  Filter by Rating:
                </label>
                <select
                  value={selectedRating || ''}
                  onChange={(e) => setSelectedRating(e.target.value ? parseInt(e.target.value) : null)}
                  className="rounded-md border border-brand-border bg-brand-navy px-4 py-2 text-brand-white transition focus:border-brand-gold focus:outline-none"
                >
                  <option value="">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-gold">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-md border border-brand-border bg-brand-navy px-4 py-2 text-brand-white transition focus:border-brand-gold focus:outline-none"
                >
                  <option value="recent">Most Recent</option>
                  <option value="highest">Highest Rated</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center justify-center rounded-sm border border-brand-gold bg-brand-gold px-6 py-2 text-sm font-semibold text-brand-black transition duration-300 hover:border-brand-gold-hover hover:bg-brand-gold-hover"
            >
              {showForm ? 'Hide Form' : 'Write a Review'}
            </button>
          </div>

          {/* Review Form */}
          {showForm && <ReviewForm onSubmit={() => setShowForm(false)} onSuccess={fetchReviews} />}

          {/* Reviews List */}
          {loading ? (
            <div className="py-12 text-center text-brand-muted">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="py-12 text-center text-brand-muted">No reviews found. Be the first to review!</div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="rounded-lg border border-brand-border bg-brand-navy p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-brand-white">{review.name}</h3>
          <p className="text-sm text-brand-muted">{date}</p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" />
          ))}
          {Array.from({ length: 5 - review.rating }).map((_, i) => (
            <Star key={`empty-${i}`} className="h-5 w-5 text-brand-border" />
          ))}
        </div>
      </div>
      <p className="leading-relaxed text-brand-white">{review.text}</p>
    </div>
  )
}

function ReviewForm({
  onSubmit,
  onSuccess,
}: {
  onSubmit: () => void
  onSuccess: () => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    text: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    // Frontend only - show local success message
    setTimeout(() => {
      setMessage('Review submitted! Thank you for your feedback. (Frontend demo - not saved)')
      setFormData({ name: '', email: '', rating: 5, text: '' })
      setTimeout(() => {
        onSubmit()
      }, 1500)
      setLoading(false)
    }, 500)
  }

  return (
    <div className="mb-12 rounded-lg border border-brand-border bg-brand-navy p-8">
      <h2 className="mb-6 text-2xl font-bold text-brand-white">Share Your Experience</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-gold">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-md border border-brand-border bg-brand-black px-4 py-2 text-brand-white placeholder-brand-muted transition focus:border-brand-gold focus:outline-none"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-gold">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-md border border-brand-border bg-brand-black px-4 py-2 text-brand-white placeholder-brand-muted transition focus:border-brand-gold focus:outline-none"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-gold">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className="transition hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= formData.rating
                      ? 'fill-brand-gold text-brand-gold'
                      : 'text-brand-border'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-gold">Your Review</label>
          <textarea
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            className="w-full rounded-md border border-brand-border bg-brand-black px-4 py-2 text-brand-white placeholder-brand-muted transition focus:border-brand-gold focus:outline-none"
            placeholder="Share your experience with our services..."
            rows={5}
            required
          />
        </div>

        {message && (
          <div
            className={`rounded-md p-3 text-sm ${
              message.includes('success') || message.includes('submitted')
                ? 'bg-green-900/30 text-green-400'
                : 'bg-red-900/30 text-red-400'
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md border border-brand-gold bg-brand-gold px-4 py-2 font-semibold text-brand-black transition hover:bg-brand-gold-hover disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  )
}
