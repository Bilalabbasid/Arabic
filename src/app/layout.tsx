import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SITE_DOMAIN, DEFAULT_META_DESCRIPTION, SITE_NAME } from '@/lib/seo/metadata';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_DOMAIN),
  title: {
    default: `${SITE_NAME} | منصة الحاسبات العربية المتكاملة لجميع الدول`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_META_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_DOMAIN }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_DOMAIN,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_AR',
    url: SITE_DOMAIN,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | منصة الحاسبات العربية الموثوقة`,
    description: DEFAULT_META_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: DEFAULT_META_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="flex flex-col min-h-screen antialiased bg-slate-50 text-slate-900 overflow-x-clip">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
