import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const VISITORS_FILE = path.join(process.cwd(), 'data', 'visitors.json')

// Simple API key check (update this in production)
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'admin-secret-key-change-this'

export async function GET(request: NextRequest) {
  try {
    // Check API key
    const apiKey = request.headers.get('X-API-Key')
    if (apiKey !== ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!fs.existsSync(VISITORS_FILE)) {
      return NextResponse.json({
        success: true,
        count: 0,
        data: [],
        message: 'No visitors yet',
      })
    }

    const data = fs.readFileSync(VISITORS_FILE, 'utf-8')
    const visitors = JSON.parse(data)

    // Add statistics
    const stats = {
      totalVisitors: visitors.length,
      uniquePhoneNumbers: new Set(visitors.map((v: any) => v.phoneNumber)).size,
      uniqueEmails: new Set(visitors.map((v: any) => v.email)).size,
      firstVisit: visitors.length > 0 ? visitors[0].submittedAt : null,
      lastVisit: visitors.length > 0 ? visitors[visitors.length - 1].submittedAt : null,
    }

    return NextResponse.json({
      success: true,
      count: visitors.length,
      stats,
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

export async function DELETE(request: NextRequest) {
  try {
    // Check API key
    const apiKey = request.headers.get('X-API-Key')
    if (apiKey !== ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { visitorId } = body

    if (!visitorId) {
      return NextResponse.json(
        { success: false, message: 'visitorId is required' },
        { status: 400 }
      )
    }

    if (!fs.existsSync(VISITORS_FILE)) {
      return NextResponse.json(
        { success: false, message: 'No visitors found' },
        { status: 404 }
      )
    }

    const data = fs.readFileSync(VISITORS_FILE, 'utf-8')
    let visitors = JSON.parse(data)
    const initialCount = visitors.length

    visitors = visitors.filter((v: any) => v.id !== visitorId)

    if (visitors.length === initialCount) {
      return NextResponse.json(
        { success: false, message: 'Visitor not found' },
        { status: 404 }
      )
    }

    fs.writeFileSync(VISITORS_FILE, JSON.stringify(visitors, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Visitor deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting visitor:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete visitor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check API key
    const apiKey = request.headers.get('X-API-Key')
    if (apiKey !== ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { action } = body

    if (action === 'clear') {
      // Clear all visitors
      const dataDir = path.join(process.cwd(), 'data')
      if (fs.existsSync(VISITORS_FILE)) {
        fs.writeFileSync(VISITORS_FILE, JSON.stringify([], null, 2))
      }

      return NextResponse.json({
        success: true,
        message: 'All visitors cleared',
      })
    }

    return NextResponse.json(
      { success: false, message: 'Unknown action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process request' },
      { status: 500 }
    )
  }
}
