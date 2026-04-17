import Link from 'next/link'

type GoldButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'solid' | 'outline'
  className?: string
}

export default function GoldButton({
  href,
  children,
  variant = 'solid',
  className = '',
}: GoldButtonProps) {
  const base =
    'btn-gold inline-flex items-center justify-center rounded-sm border px-6 py-3 text-sm font-semibold transition duration-300'

  const style =
    variant === 'solid'
      ? 'border-brand-gold bg-brand-gold text-brand-black hover:border-brand-gold-hover hover:bg-brand-gold-hover'
      : 'border-brand-gold bg-transparent text-brand-gold hover:bg-brand-gold hover:text-brand-black'

  return (
    <Link href={href} className={`${base} ${style} ${className}`}>
      {children}
    </Link>
  )
}
