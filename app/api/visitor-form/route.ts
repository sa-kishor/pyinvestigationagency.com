import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { sendWhatsAppNotification } from '@/lib/services/notifications'

const VISITORS_FILE = path.join(process.cwd(), 'data', 'visitors.json')

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read existing visitors
function getVisitors(): any[] {
  try {
    if (fs.existsSync(VISITORS_FILE)) {
      const data = fs.readFileSync(VISITORS_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading visitors file:', error)
  }
  return []
}

// Save visitor
function saveVisitor(visitorData: any) {
  try {
    ensureDataDir()
    const visitors = getVisitors()
    const newVisitor = {
      id: Date.now(),
      ...visitorData,
      submittedAt: new Date().toISOString(),
    }
    visitors.push(newVisitor)
    fs.writeFileSync(VISITORS_FILE, JSON.stringify(visitors, null, 2))
    return newVisitor
  } catch (error) {
    console.error('Error saving visitor:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, phoneNumber, whatsappNumber, email } = body

    // Validate required fields
    if (!fullName || !phoneNumber || !email) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to database
    const savedVisitor = saveVisitor({
      fullName,
      phoneNumber,
      whatsappNumber,
      email,
    })

    // Send WhatsApp notifications to both owner numbers
    const ownerNumbers = ['+919487979832', '+917200841992']
    const notificationMessage = `
🔔 New Website Visitor!

Name: ${fullName}
Phone: ${phoneNumber}
WhatsApp: ${whatsappNumber || 'Not provided'}
Email: ${email}

Time: ${new Date().toLocaleString()}
    `.trim()

    // Send WhatsApp to both owner numbers
    for (const number of ownerNumbers) {
      try {
        await sendWhatsAppNotification(number, notificationMessage)
      } catch (error) {
        console.error(`Failed to send WhatsApp to ${number}:`, error)
      }
    }

    // Send WhatsApp confirmation to customer
    if (whatsappNumber) {
      try {
        const customerMessage = `Hi ${fullName}! 👋\n\nThank you for contacting Py Investigation Agency. We've received your information and will reach out to you shortly.\n\nBest regards,\nPy Investigation Agency Team`
        await sendWhatsAppNotification(whatsappNumber, customerMessage)
      } catch (error) {
        console.error('Failed to send WhatsApp notification to customer:', error)
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Form submitted successfully',
        visitorId: savedVisitor.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const visitors = getVisitors()
    return NextResponse.json({
      success: true,
      count: visitors.length,
      data: visitors,
    })
  } catch (error) {
    console.error('Error fetching visitors:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch visitors' },
      { status: 500 }
    )
  }
}
