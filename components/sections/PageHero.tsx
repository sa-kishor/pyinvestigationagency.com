import Link from 'next/link'

type PageHeroProps = {
  title: string
  subtitle: string
  current: string
}

export default function PageHero({ title, subtitle, current }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-brand-border px-4 py-20 sm:px-6 lg:px-8">
      <div className="animated-bg" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="text-sm text-brand-muted">
          <Link href="/" className="transition hover:text-brand-gold">
            Home
          </Link>{' '}
          {'>'} {current}
        </p>
        <h1 className="mt-5 text-4xl font-bold text-brand-white sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-brand-muted">{subtitle}</p>
      </div>
    </section>
  )
}
