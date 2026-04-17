import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0B0F19',
          navy: '#111827',
          gold: '#D4AF37',
          'gold-hover': '#FACC15',
          white: '#FFFFFF',
          muted: '#9CA3AF',
          border: 'rgba(212,175,55,0.2)',
          'card-bg': 'rgba(17,24,39,0.8)',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'grid-pan': 'gridPan 12s linear infinite',
        'glow-pulse': 'glow 8s ease-in-out infinite alternate',
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
      },
      keyframes: {
        gridPan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        glow: {
          '0%': { opacity: '0.5', transform: 'translate(-50%, -50%) scale(1)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1.2)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
