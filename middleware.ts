import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('sb-access-token')?.value
  const url = req.nextUrl.clone()

  if (!token && url.pathname.startsWith('/dashboard')) {
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
