import { NextResponse, type NextRequest } from 'next/server';
import { SITE_URL, PRIMARY_HOST } from '@/lib/config';

const GONE_EXACT_PATHS = new Set([
  '/cart',
  '/account',
  '/checkouts',
  '/policies',
  '/products',
  '/collections',
  '/pages/faq',
  '/pages/shipping',
  '/pages/returns',
  '/pages/warranty',
  '/pages/track-order',
  '/pages/data-sharing-opt-out',
  '/sitemap_products_1.xml',
  '/sitemap_collections_1.xml',
  '/sitemap_pages_1.xml',
  '/sitemap_blogs_1.xml',
]);

const GONE_PREFIX_PATHS = [
  '/products/',
  '/collections/',
  '/cart/',
  '/account/',
  '/checkouts/',
  '/policies/',
];

export function isGonePath(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (GONE_EXACT_PATHS.has(normalized)) return true;
  return GONE_PREFIX_PATHS.some((prefix) => pathname.startsWith(prefix));
}

const GONE_HTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>الصفحة لم تعد متوفرة (410)</title>
  <meta name="robots" content="noindex, nofollow">
</head>
<body style="font-family: system-ui, -apple-system, sans-serif; text-align: center; padding: 48px 16px; direction: rtl;">
  <h1 style="font-size: 24px; color: #0f172a; margin-bottom: 12px;">هذه الصفحة لم تعد متوفرة (410 Gone)</h1>
  <p style="font-size: 16px; color: #475569; margin-bottom: 24px;">تم إيقاف هذا القسم نهائياً. يمكنك الانتقال إلى <a href="/calculators" style="color: #059669; font-weight: bold; text-decoration: underline;">دليل كافة الحاسبات</a>.</p>
</body>
</html>`;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Return 410 Gone for retired Shopify and legacy store paths
  if (isGonePath(pathname)) {
    return new NextResponse(GONE_HTML, {
      status: 410,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  }

  const host = (request.headers.get('host') || '').toLowerCase().split(':')[0];
  const search = request.nextUrl.search;

  const isLocal = host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');
  const isVercelPreview = host.endsWith('.vercel.app');

  // 2. Safety net: redirect any non-primary host to SITE_URL with 308 (except localhost/preview)
  if (!isLocal && !isVercelPreview && host && host !== PRIMARY_HOST) {
    const targetUrl = new URL(pathname + search, SITE_URL);
    return NextResponse.redirect(targetUrl, 308);
  }

  const response = NextResponse.next();

  // 3. On *.vercel.app preview deployments, protect from indexing
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
