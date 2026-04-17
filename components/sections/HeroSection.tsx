'use client'

import { motion } from 'framer-motion'
import GoldButton from '@/components/ui/GoldButton'
import { CONTACT } from '@/lib/constants'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden border-b border-brand-border">
      <div className="animated-bg" />
      <div className="hero-glow" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 text-center sm:px-6 lg:px-8">
        <motion.p
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold tracking-[0.28em] text-brand-muted"
        >
          TRUSTED INVESTIGATION AGENCY - INDIA
        </motion.p>
        <div className="mx-auto mt-4 h-[2px] w-20 bg-brand-gold" />

        <motion.h1
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-4xl font-extrabold leading-tight text-brand-white sm:text-5xl lg:text-7xl"
        >
          UNCOVER THE <span className="text-brand-gold">TRUTH</span>
          <br />
          WITH PRECISION
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-8 max-w-3xl text-base leading-8 text-brand-muted sm:text-lg"
        >
          Professional intelligence services with 100% confidentiality and evidence-based
          reporting. Serving Tamil Nadu and Pondicherry.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <GoldButton href="/contact" className="px-8 py-4">
            Start Investigation →
          </GoldButton>
          <GoldButton href={`tel:${CONTACT.phone}`} variant="outline" className="px-8 py-4">
            Call Now
          </GoldButton>
        </motion.div>
      </div>
    </section>
  )
}
