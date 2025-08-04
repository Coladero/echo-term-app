// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  const protectedPaths = ['/dashboard', '/upload', '/notes'];

  if (protectedPaths.some(path => req.nextUrl.pathname.startsWith(path)) && !session) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/upload/:path*', '/notes/:path*'],
};
