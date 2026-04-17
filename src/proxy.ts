import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.ADMIN_SECRET || "default_secret");

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  // Paths that require authentication
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Redirect to dashboard if logged in and trying to access login page
  if (request.nextUrl.pathname.startsWith('/admin/login') && token) {
    try {
      await jwtVerify(token, SECRET);
      return NextResponse.redirect(new URL('/admin', request.url));
    } catch (e) {
      // Token invalid, allow access to login page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
