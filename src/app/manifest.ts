import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'لِسيارتك | منصة الحاسبات العربية المتكاملة',
    short_name: 'لِسيارتك',
    description: 'المنصة العربية الموثوقة للحاسبات المجانية: حاسبات السيارات وتكلفة الوقود، القروض والتمويل، ضريبة القيمة المضافة، مكافأة نهاية الخدمة، وفاتورة الكهرباء.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#059669',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}

