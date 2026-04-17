import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import Navbar from '@/components/layout/Navbar'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Py Investigation Agency',
  description:
    'Premium private investigation services across Tamil Nadu and Pondicherry with strict confidentiality and evidence-backed reporting.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-brand-black">
      <body className={`${poppins.className} min-h-screen bg-brand-black text-brand-white antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingActions />
        </div>
      </body>
    </html>
  )
}
