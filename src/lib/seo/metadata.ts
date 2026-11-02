import { Metadata } from 'next';
import { CalculatorDefinition } from '@/types/calculator';
import { CountryDefinition } from '@/types/country';
import { COUNTRIES, getCountryByCode } from '@/data/countries';
import { ALL_COUNTRY_RULES } from '@/lib/rules/rule-resolver';
import { SITE_URL, SITE_DOMAIN, PRIMARY_HOST } from '@/lib/config';

export { SITE_URL, SITE_DOMAIN, PRIMARY_HOST };

export const SITE_NAME = 'لِسيارتك';
export const DEFAULT_META_DESCRIPTION =
  'منصة لِسيارتك (lsayartk.com) – حاسبات عربية دقيقة ومجانية: حاسبات السيارات وتكلفة الوقود، القروض والتمويل، ضريبة القيمة المضافة، مكافأة نهاية الخدمة، وفاتورة الكهرباء لعدة دول عربية.';

export function formatMetaTitle(pageTitle: string): string {
  if (!pageTitle) return SITE_NAME;
  if (pageTitle.includes(SITE_NAME)) return pageTitle;
  return `${pageTitle} | ${SITE_NAME}`;
}

export function constructCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/' || cleanPath === '') {
    return `${SITE_URL}`;
  }
  const trimmed = cleanPath.replace(/\/+$/, '');
  return `${SITE_URL}${trimmed}`;
}

/**
 * Valid BCP-47 Arabic Language-Region codes mapping for all 22 Arab countries
 */
export const ARABIC_LOCALE_CODES: Record<string, string> = {
  SA: 'ar-SA',
  AE: 'ar-AE',
  KW: 'ar-KW',
  QA: 'ar-QA',
  BH: 'ar-BH',
  OM: 'ar-OM',
  EG: 'ar-EG',
  JO: 'ar-JO',
  MA: 'ar-MA',
  DZ: 'ar-DZ',
  TN: 'ar-TN',
  IQ: 'ar-IQ',
  LB: 'ar-LB',
  LY: 'ar-LY',
  SD: 'ar-SD',
  YE: 'ar-YE',
  SY: 'ar-SY',
  PS: 'ar-PS',
  MR: 'ar-MR',
  SO: 'ar-SO',
  DJ: 'ar-DJ',
  KM: 'ar-KM',
};

import { getCountryCalculatorContent } from '@/data/country-content';

export const VALID_COUNTRY_CALCULATORS: Record<string, string[]> = {
  'vat-calculator': ['SA', 'AE', 'BH', 'OM', 'EG', 'JO', 'MA', 'DZ', 'TN', 'LB', 'KW', 'QA'],
  'end-of-service-reward': ['SA', 'AE', 'EG'],
  'electricity-bill': ['SA', 'AE', 'EG'],
  'car-fuel-cost': ['SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'EG'],
};

/**
 * Determines whether a calculator is legally or configurationally valid for a specific country.
 * Genuinely country-specific rules or data only; currency alone is never a reason.
 */
export function isCountryCalculatorValid(calc: CalculatorDefinition, countryCode: string): boolean {
  const allowed = VALID_COUNTRY_CALCULATORS[calc.slug];
  if (!allowed) return false;
  return allowed.includes(countryCode.toUpperCase());
}

/**
 * Country hub is indexable only if it lists >= 3 live country-specific calculators.
 */
export function isCountryHubIndexable(countryCode: string): boolean {
  const upperCode = countryCode.toUpperCase();
  let count = 0;
  for (const [, countries] of Object.entries(VALID_COUNTRY_CALCULATORS)) {
    if (countries.includes(upperCode)) {
      count++;
    }
  }
  return count >= 3;
}

export const INDEXABLE_CATEGORIES = [
  'cars-transportation',
  'dates-time',
  'finance-savings',
  'loans-installments',
  'mathematics-percentages',
  'taxation',
  'unit-conversion',
];

/**
 * A category is indexable ONLY if it lists >= 3 live calculators.
 */
export function isCategoryIndexable(categorySlug: string): boolean {
  return INDEXABLE_CATEGORIES.includes(categorySlug);
}

/**
 * Generates reciprocal hreflang links conforming strictly to Google Search Central guidelines:
 * - Generates hreflang ONLY for actually published, verified equivalent pages.
 * - Adds x-default pointing to the global universal calculator route.
 * - Prevents duplicate regional links for universal calculators.
 */
export function generateHreflangAlternates(calc: CalculatorDefinition): Record<string, string> {
  const languages: Record<string, string> = {};

  // For universal calculators or calculators with no country pages, there is one authoritative canonical global Arabic URL
  const validForAnyCountry = Object.keys(VALID_COUNTRY_CALCULATORS).includes(calc.slug);
  if (!validForAnyCountry || calc.countryMode === 'UNIVERSAL') {
    const universalUrl = constructCanonicalUrl(`/calculators/${calc.slug}`);
    languages['ar'] = universalUrl;
    languages['x-default'] = universalUrl;
    return languages;
  }

  // Populate hreflang for verified published countries
  for (const country of COUNTRIES) {
    if (isCountryCalculatorValid(calc, country.countryCode)) {
      const localeTag = ARABIC_LOCALE_CODES[country.countryCode];
      if (localeTag) {
        languages[localeTag] = constructCanonicalUrl(`/${country.countryCode.toLowerCase()}/${calc.slug}`);
      }
    }
  }

  // x-default points to the universal fallback calculator
  languages['x-default'] = constructCanonicalUrl(`/calculators/${calc.slug}`);

  return languages;
}

/**
 * Produces intent-targeted localized title based on country context
 */
export function generateLocalizedCalculatorTitle(calc: CalculatorDefinition, country?: CountryDefinition): string {
  if (!country) {
    return formatMetaTitle(calc.metaTitle);
  }

  const customContent = getCountryCalculatorContent(calc.slug, country.countryCode);
  if (customContent?.metaTitle) {
    return formatMetaTitle(customContent.metaTitle);
  }

  return formatMetaTitle(`${calc.nameAr} في ${country.nameAr} (${country.currencySymbolAr})`);
}

/**
 * Produces intent-targeted localized meta description
 */
export function generateLocalizedCalculatorDescription(calc: CalculatorDefinition, country?: CountryDefinition): string {
  if (!country) {
    return calc.metaDescription;
  }

  const customContent = getCountryCalculatorContent(calc.slug, country.countryCode);
  if (customContent?.metaDescription) {
    return customContent.metaDescription;
  }

  return `${calc.nameAr} مخصصة لـ ${country.nameAr}: احسب بالعملة المحلية (${country.currencyNameAr} ${country.currencySymbolAr}) وفق المعايير واللوائح المعتمدة محلياً.`;
}

export function generateCalculatorSchema(options: {
  nameAr: string;
  descriptionAr: string;
  slug: string;
  countryCode?: string;
}) {
  const path = options.countryCode ? `/${options.countryCode.toLowerCase()}/${options.slug}` : `/calculators/${options.slug}`;
  const financeSlugs = ['vat-calculator', 'loan-calculator', 'zakat-wealth', 'end-of-service-reward'];
  const applicationCategory = financeSlugs.includes(options.slug) ? 'FinanceApplication' : 'UtilitiesApplication';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: options.nameAr,
    description: options.descriptionAr,
    url: constructCanonicalUrl(path),
    applicationCategory,
    operatingSystem: 'All',
    browserRequirements: 'يتطلب متصفح حديث مع تفعيل جافاسكريبت',
    inLanguage: 'ar',
    isAccessibleForFree: true,
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length < 3) return null;
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

/**
 * WebSite structured data schema conforming to Google Search Site Names & Sitelinks guidelines
 * See: https://developers.google.com/search/docs/appearance/site-names
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'لِسيارتك',
    alternateName: ['Lsayartk', 'lsayartk.com', 'منصة لِسيارتك', 'حاسبات لِسيارتك'],
    url: SITE_URL,
    inLanguage: 'ar',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/calculators/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Organization structured data schema conforming to Google publisher & transparency guidelines
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'لِسيارتك',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    email: '[FILL: contact email]',
    sameAs: [],
    publishingPrinciples: `${SITE_URL}/methodology`,
  };
}

/**
 * Article structured data schema conforming to Google Search Article & Byline Dates guidelines
 * See: https://developers.google.com/search/docs/appearance/structured-data/article
 */
export function generateArticleSchema(guide: {
  slug: string;
  titleAr: string;
  summaryAr: string;
  updatedAt: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: guide.titleAr,
    description: guide.summaryAr,
    inLanguage: 'ar',
    url: constructCanonicalUrl(`/guides/${guide.slug}`),
    datePublished: guide.updatedAt,
    dateModified: guide.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'لِسيارتك',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'لِسيارتك',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': constructCanonicalUrl(`/guides/${guide.slug}`),
    },
  };
}
