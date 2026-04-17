import Link from 'next/link'
import GlassCard from '@/components/ui/GlassCard'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'
import { blogPosts } from '@/lib/data/blog'

export default function BlogGrid() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <SectionHeader
            title="Investigation Insights"
            subtitle="Expert knowledge on security, truth, and evidence."
          />
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <RevealOnScroll key={post.id} delay={index * 0.08}>
              <GlassCard className="service-card h-full">
                <span className="inline-flex rounded-full border border-brand-border bg-brand-black px-3 py-1 text-xs font-medium text-brand-gold">
                  {post.category}
                </span>
                <h3 className="mt-5 text-xl font-semibold leading-8 text-brand-white transition hover:text-brand-gold">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-brand-muted">{post.excerpt}</p>
                <Link
                  href="/blog"
                  className="mt-5 inline-flex text-sm font-semibold text-brand-gold transition hover:underline"
                >
                  Read Post →
                </Link>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
