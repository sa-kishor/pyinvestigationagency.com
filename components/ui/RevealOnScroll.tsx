'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type RevealOnScrollProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function RevealOnScroll({ children, delay = 0, className = '' }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      className={className}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
