import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Clear the admin token cookie
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { status: 200 }
  )

  // Delete the cookie
  response.cookies.set({
    name: 'adminToken',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Immediately expire
    path: '/',
  })

  return response
}
