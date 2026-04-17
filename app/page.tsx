import BlogGrid from '@/components/sections/BlogGrid'
import CTABanner from '@/components/sections/CTABanner'
import CoreServices from '@/components/sections/CoreServices'
import ExpertiseGrid from '@/components/sections/ExpertiseGrid'
import HeroSection from '@/components/sections/HeroSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import WhyChooseUs from '@/components/sections/WhyChooseUs'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CoreServices />
      <WhyChooseUs />
      <ExpertiseGrid />
      <TestimonialsSection />
      <CTABanner />
      <BlogGrid />
    </>
  )
}
