import { Metadata } from 'next';

export const SITE_NAME = 'لِسيارتك';
export const SITE_DOMAIN = 'https://lsayartk.com';
export const DEFAULT_META_DESCRIPTION =
  'منصة لِسيارتك (lsayartk.com) – المنصة العربية الموثوقة للحاسبات المجانية: حاسبات السيارات وتكلفة الوقود، القروض والتمويل، ضريبة القيمة المضافة، مكافأة نهاية الخدمة، وفاتورة الكهرباء لمختلف الدول العربية.';

export function formatMetaTitle(pageTitle: string): string {
  if (!pageTitle) return SITE_NAME;
  if (pageTitle.includes(SITE_NAME)) return pageTitle;
  return `${pageTitle} | ${SITE_NAME}`;
}

export function constructCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_DOMAIN}${cleanPath}`;
}

export function generateCalculatorSchema(options: {
  nameAr: string;
  descriptionAr: string;
  slug: string;
  countryCode?: string;
}) {
  const path = options.countryCode ? `/${options.countryCode.toLowerCase()}/${options.slug}/` : `/calculators/${options.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: options.nameAr,
    description: options.descriptionAr,
    url: constructCanonicalUrl(path),
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'All',
    browserRequirements: 'يتطلب متصفح حديث مع تفعيل جافاسكريبت',
    inLanguage: 'ar',
    isAccessibleForFree: true,
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: constructCanonicalUrl(item.url),
    })),
  };
}
