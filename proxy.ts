import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Protect /admin route (but allow /admin/login)
  if (pathname === '/admin' || pathname.startsWith('/admin')) {
    // Allow login page
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    // For other admin pages, check for token
    const token = request.cookies.get('adminToken')?.value

    if (!token) {
      // NO TOKEN - REDIRECT TO LOGIN
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Token exists - allow access
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
