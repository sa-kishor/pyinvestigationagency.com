import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Hardcoded admin credentials - CHANGE THESE IN PRODUCTION!
// In production, use environment variables and store hashed passwords
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'pyinvestigationagency@gmail.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Parthi@1992..'

// Generate a simple JWT-like token (you can upgrade to real JWT)
function generateToken(email: string): string {
  const payload = {
    email,
    timestamp: Date.now(),
    random: crypto.randomBytes(16).toString('hex'),
  }
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

function verifyToken(token: string): { email: string } | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
    // Verify token is not too old (24 hours)
    if (Date.now() - decoded.timestamp > 24 * 60 * 60 * 1000) {
      return null
    }
    return { email: decoded.email }
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = generateToken(email)
      
      // Create response with Set-Cookie header
      const response = NextResponse.json(
        {
          success: true,
          message: 'Login successful',
          token,
          email,
        },
        { status: 200 }
      )
      
      // Set secure cookie (24 hours)
      response.cookies.set({
        name: 'adminToken',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/',
      })
      
      return response
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Token is valid',
        email: payload.email,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
