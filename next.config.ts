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
        source: '/pages/faq',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/collections/:path*',
        destination: '/calculators',
        permanent: true,
      },
      {
        source: '/collections',
        destination: '/calculators',
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
    ];
  },
};

export default nextConfig;
