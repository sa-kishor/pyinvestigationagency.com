interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  goldWord?: string
}

function renderTitle(title: string, goldWord?: string) {
  if (!goldWord || !title.includes(goldWord)) {
    return title
  }

  const [before, after] = title.split(goldWord)
  return (
    <>
      {before}
      <span className="text-brand-gold">{goldWord}</span>
      {after}
    </>
  )
}

export default function SectionHeader({
  title,
  subtitle,
  align = 'center',
  goldWord,
}: SectionHeaderProps) {
  const isCenter = align === 'center'

  return (
    <div className={`${isCenter ? 'text-center' : 'text-left'} space-y-4`}>
      <div className={`h-[3px] w-10 bg-brand-gold ${isCenter ? 'mx-auto' : ''}`} />
      <h2 className="text-3xl font-bold text-brand-white lg:text-4xl">{renderTitle(title, goldWord)}</h2>
      {subtitle ? <p className="mx-auto max-w-3xl text-base text-brand-muted">{subtitle}</p> : null}
    </div>
  )
}
