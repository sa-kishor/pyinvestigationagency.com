import BlogGrid from '@/components/sections/BlogGrid'
import CTABanner from '@/components/sections/CTABanner'
import PageHero from '@/components/sections/PageHero'

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Investigation Insights"
        subtitle="Expert knowledge on security, truth, and evidence."
        current="Blog"
      />
      <BlogGrid />
      <CTABanner />
    </>
  )
}
