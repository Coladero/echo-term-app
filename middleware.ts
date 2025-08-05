// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Error fetching session in middleware:', error.message);
      return res;
    }

    const protectedPaths = ['/dashboard', '/upload', '/notes', '/profile'];
    const pathname = req.nextUrl.pathname;

    // Check if the current path is protected
    // and if the user is not authenticated
    const isProtected = protectedPaths.some((path) =>
      pathname.startsWith(path)
    );

    if (isProtected && !session) {
      console.log(`Unauthenticated access attempt to ${pathname}. Redirecting to /auth.`);
      const redirectUrl = new URL('/auth', req.url);
      return NextResponse.redirect(redirectUrl);
    }

    return res;
  } catch (err) {
    console.error('Unexpected error in middleware:', err);
    return res;
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/upload/:path*', '/notes/:path*'],
};
