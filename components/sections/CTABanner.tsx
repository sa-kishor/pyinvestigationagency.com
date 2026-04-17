import GoldButton from '@/components/ui/GoldButton'

type CTABannerProps = {
  title?: string
  subtitle?: string
}

export default function CTABanner({
  title = 'Need a Confidential Investigation?',
  subtitle = 'Our team is available 24/7. All inquiries are handled with the highest discretion.',
}: CTABannerProps) {
  return (
    <section className="bg-brand-navy px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto h-[2px] w-20 bg-brand-gold" />
        <h2 className="mt-6 text-3xl font-bold text-brand-white lg:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-brand-muted">{subtitle}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <GoldButton href="/contact">Start Investigation →</GoldButton>
          <GoldButton href="/contact" variant="outline">
            Contact Us
          </GoldButton>
        </div>
        <div className="mx-auto mt-8 h-[2px] w-20 bg-brand-gold" />
      </div>
    </section>
  )
}
