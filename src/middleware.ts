import { NextResponse, type NextRequest } from 'next/server';
import { SITE_URL, PRIMARY_HOST } from '@/lib/config';

export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').toLowerCase().split(':')[0];
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  const isLocal = host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');
  const isVercelPreview = host.endsWith('.vercel.app');

  // Safety net: redirect any non-primary host to SITE_URL with 308 (except localhost/preview)
  if (!isLocal && !isVercelPreview && host && host !== PRIMARY_HOST) {
    const targetUrl = new URL(pathname + search, SITE_URL);
    return NextResponse.redirect(targetUrl, 308);
  }

  const response = NextResponse.next();

  // On *.vercel.app preview deployments, protect from indexing
  if (isVercelPreview) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.svg).*)',
  ],
};
