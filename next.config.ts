import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/pages/contact',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/pages/privacy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/pages/terms',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/pages/about',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/calculators/car-fuel-cost',
        destination: '/calculators/fuel-cost',
        permanent: true,
      },
      {
        source: '/:country/car-fuel-cost',
        destination: '/:country/fuel-cost',
        permanent: true,
      },
      // Somali routes removed 2026-11-18: no official fuel prices, so the pages could not show
      // costs and stayed thin. Old links go to the Somalia hub.
      ...['mogadishu-afgooye', 'mogadishu-merca', 'mogadishu-jowhar', 'hargeisa-berbera'].map((route) => ({
        source: `/so/trip-cost/${route}`,
        destination: '/so',
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
