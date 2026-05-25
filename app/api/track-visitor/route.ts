import { NextRequest, NextResponse } from 'next/server'
import { sendVisitorTrackingNotification } from '@/lib/services/notifications'

export async function POST(request: NextRequest) {
  try {
    // Send tracking notification asynchronously
    sendVisitorTrackingNotification().catch((error) => {
      console.error('Error sending visitor tracking notification:', error)
    })

    return NextResponse.json({
      success: true,
      message: 'Visitor tracked',
    })
  } catch (error) {
    console.error('Visitor tracking error:', error)
    return NextResponse.json(
      { success: false, message: 'Tracking failed' },
      { status: 500 }
    )
  }
}
