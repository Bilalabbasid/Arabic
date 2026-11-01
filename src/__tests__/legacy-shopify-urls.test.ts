import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware, isGonePath } from '../middleware';
import nextConfig from '../../next.config';

describe('Legacy Shopify URLs and Middleware (Phase 2)', () => {
  const gonePaths = [
    '/products/touch-control-night-light',
    '/products/led-lamp',
    '/products',
    '/cart',
    '/cart/12345',
    '/account',
    '/account/login',
    '/account/register',
    '/checkouts/c1-987654321',
    '/policies/refund-policy',
    '/policies/shipping-policy',
    '/pages/shipping',
    '/pages/returns',
    '/pages/warranty',
    '/pages/track-order',
    '/pages/data-sharing-opt-out',
    '/sitemap_products_1.xml',
    '/sitemap_collections_1.xml',
    '/sitemap_pages_1.xml',
    '/sitemap_blogs_1.xml',
  ];

  for (const p of gonePaths) {
    it(`identifies ${p} as gone (410)`, () => {
      expect(isGonePath(p)).toBe(true);
      const req = new NextRequest(`https://lsayartk.com${p}`);
      const res = middleware(req);
      expect(res.status).toBe(410);
      expect(res.headers.get('x-robots-tag')).toContain('noindex');
    });
  }

  it('verifies next.config permanent redirects for legacy Shopify pages', async () => {
    const redirectsFn = nextConfig.redirects;
    expect(redirectsFn).toBeDefined();
    if (redirectsFn) {
      const redirects = await redirectsFn();
      const redirectMap: Record<string, { destination: string; permanent: boolean }> = {};
      for (const r of redirects) {
        redirectMap[r.source] = { destination: r.destination, permanent: !!r.permanent };
      }

      expect(redirectMap['/pages/contact']).toEqual({ destination: '/contact', permanent: true });
      expect(redirectMap['/pages/privacy']).toEqual({ destination: '/privacy', permanent: true });
      expect(redirectMap['/pages/terms']).toEqual({ destination: '/terms', permanent: true });
      expect(redirectMap['/pages/about']).toEqual({ destination: '/about', permanent: true });
      expect(redirectMap['/pages/faq']).toEqual({ destination: '/about', permanent: true });
      expect(redirectMap['/collections/:path*']).toEqual({ destination: '/calculators', permanent: true });
      expect(redirectMap['/collections']).toEqual({ destination: '/calculators', permanent: true });
    }
  });

  it('does not return 410 for legitimate calculator routes', () => {
    const validPaths = [
      '/',
      '/calculators',
      '/calculators/car-fuel-cost',
      '/sa',
      '/about',
      '/contact',
    ];
    for (const vp of validPaths) {
      expect(isGonePath(vp)).toBe(false);
      const req = new NextRequest(`https://lsayartk.com${vp}`);
      const res = middleware(req);
      expect(res.status).not.toBe(410);
    }
  });
});
