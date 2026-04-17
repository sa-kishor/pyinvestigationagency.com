type GlassCardProps = {
  children: React.ReactNode
  className?: string
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`rounded-xl border border-brand-border bg-brand-card-bg p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  )
}
