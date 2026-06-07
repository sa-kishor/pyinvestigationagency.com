import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { sendWhatsAppNotification } from '@/lib/services/notifications'

// Use /tmp on Vercel (writable), or local data dir on localhost
const VISITORS_FILE = process.env.VERCEL
  ? path.join('/tmp', 'visitors.json')
  : path.join(process.cwd(), 'data', 'visitors.json')

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(VISITORS_FILE)
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

// Send email via Resend
async function sendEmail(to: string, subject: string, html: string) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.log('⚠️ RESEND_API_KEY not configured - email not sent')
      return false
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: to,
        subject: subject,
        html: html,
      }),
    })

    if (response.ok) {
      console.log('✓ Email sent to', to)
    } else {
      console.error('Email send failed:', await response.text())
    }
    return response.ok
  } catch (error) {
    console.error('Email send error:', error)
    return false
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

    // Send notification email to ADMIN ONLY
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d4af37;">🔔 New Website Visitor</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Phone:</strong> ${phoneNumber}</p>
          ${whatsappNumber ? `<p><strong>WhatsApp:</strong> ${whatsappNumber}</p>` : ''}
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <p>Please follow up with this visitor at your earliest convenience.</p>
      </div>
    `

    // Send email to admin only
    await sendEmail('pyinvestigationagency@gmail.com', 'New Website Visitor Form Submission', adminEmailHtml)

    // Send WhatsApp notifications to both owner numbers ONLY
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
