'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryImages } from '@/lib/data/gallery'

export default function InvestigationGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    setAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    setAutoPlay(false)
  }

  const currentImage = galleryImages[currentIndex]

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-brand-white">Our Investigation Gallery</h2>
          <p className="mt-4 text-lg text-brand-muted">
            A glimpse into our professional investigation work and processes
          </p>
        </div>

        {/* Slideshow Container */}
        <div className="relative overflow-hidden rounded-lg border border-brand-border bg-brand-card-bg">
          {/* Main Image */}
          <div className="relative aspect-video overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={currentImage.image}
                  alt={currentImage.title}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Image Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent p-6">
              <motion.div
                key={`text-${currentIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-brand-white">{currentImage.title}</h3>
                <p className="mt-2 text-brand-muted">{currentImage.description}</p>
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-brand-gold bg-brand-black/70 p-3 text-brand-gold transition hover:bg-brand-gold hover:text-brand-black"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={goToNext}
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-brand-gold bg-brand-black/70 p-3 text-brand-gold transition hover:bg-brand-gold hover:text-brand-black"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Indicator Dots */}
          <div className="flex items-center justify-center gap-2 bg-brand-black/50 p-4">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setAutoPlay(false)
                }}
                className={`h-2 rounded-full transition ${
                  index === currentIndex
                    ? 'w-8 bg-brand-gold'
                    : 'w-2 bg-brand-border hover:bg-brand-muted'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Slide Counter */}
        <div className="mt-6 text-center text-sm text-brand-muted">
          Image {currentIndex + 1} of {galleryImages.length}
        </div>
      </div>
    </section>
  )
}
