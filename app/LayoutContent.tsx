'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import MandatoryPopup from '@/components/sections/MandatoryPopup'

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith('/admin')

  useEffect(() => {
    // Track visitor on page load (only on non-admin pages)
    if (!isAdminPage) {
      const trackVisitor = async () => {
        try {
          await fetch('/api/track-visitor', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
        } catch (error) {
          console.error('Failed to track visitor:', error)
        }
      }

      trackVisitor()
    }
  }, [isAdminPage])

  return (
    <>
      {/* Show popup only on non-admin pages */}
      {!isAdminPage && <MandatoryPopup />}
      {children}
    </>
  )
}
