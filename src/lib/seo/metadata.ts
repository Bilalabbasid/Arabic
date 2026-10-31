import { Metadata } from 'next';
import { CalculatorDefinition } from '@/types/calculator';
import { CountryDefinition } from '@/types/country';
import { COUNTRIES, getCountryByCode } from '@/data/countries';
import { ALL_COUNTRY_RULES } from '@/lib/rules/rule-resolver';

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
  // Ensure consistent no-trailing-slash or trailing-slash. Standardizing on no-trailing-slash except root
  if (cleanPath === '/' || cleanPath === '') {
    return `${SITE_DOMAIN}/`;
  }
  const trimmed = cleanPath.replace(/\/+$/, '');
  return `${SITE_DOMAIN}${trimmed}`;
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

/**
 * Determines whether a calculator is legally or configurationally valid for a specific country.
 * Universal calculators return false because they have a single canonical /calculators/[slug] route
 * and MUST NOT produce thin/duplicate regional pages.
 */
export function isCountryCalculatorValid(calc: CalculatorDefinition, countryCode: string): boolean {
  if (calc.countryMode === 'UNIVERSAL') {
    return false;
  }
  const upperCode = countryCode.toUpperCase();
  if (calc.countryMode === 'COUNTRY_REGULATED') {
    return ALL_COUNTRY_RULES.some(
      (r) => r.calculatorId === calc.id && r.countryCode.toUpperCase() === upperCode && r.verificationStatus === 'APPROVED'
    );
  }
  if (calc.countryMode === 'COUNTRY_CONFIGURABLE') {
    if (calc.supportedCountries.includes('*')) {
      return ['SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'EG', 'JO', 'MA', 'DZ', 'TN'].includes(upperCode);
    }
    return calc.supportedCountries.map((c) => c.toUpperCase()).includes(upperCode);
  }
  return false;
}

/**
 * Generates reciprocal hreflang links conforming strictly to Google Search Central guidelines:
 * - Generates hreflang ONLY for actually published, verified equivalent pages.
 * - Adds x-default pointing to the global universal calculator route.
 * - Prevents duplicate regional links for universal calculators.
 */
export function generateHreflangAlternates(calc: CalculatorDefinition): Record<string, string> {
  const languages: Record<string, string> = {};

  // For universal calculators, there is one authoritative canonical global Arabic URL
  if (calc.countryMode === 'UNIVERSAL') {
    const universalUrl = constructCanonicalUrl(`/calculators/${calc.slug}`);
    languages['ar'] = universalUrl;
    languages['x-default'] = universalUrl;
    return languages;
  }

  // For country-regulated or country-configurable calculators:
  // Populate hreflang ONLY for verified published countries
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

  // Specialized search-intent titles per calculator & market
  if (calc.slug === 'electricity-bill') {
    if (country.countryCode === 'SA') {
      return formatMetaTitle('حاسبة فاتورة الكهرباء السعودية | حساب الاستهلاك والشرائح وتكلفة العداد');
    }
    if (country.countryCode === 'AE') {
      return formatMetaTitle('حاسبة فاتورة الكهرباء الإمارات | حسب الإمارة والتعرفة (ديوا وأدك)');
    }
    if (country.countryCode === 'EG') {
      return formatMetaTitle('حاسبة فاتورة الكهرباء مصر | حساب الشرائح والاستهلاك المنزلي');
    }
    return formatMetaTitle(`حاسبة فاتورة الكهرباء في ${country.nameAr} | حساب الاستهلاك الشهري`);
  }

  if (calc.slug === 'end-of-service-reward') {
    if (country.countryCode === 'SA') {
      return formatMetaTitle('حاسبة مكافأة نهاية الخدمة في السعودية | وفق المادتين 84 و 85 نظام العمل');
    }
    if (country.countryCode === 'AE') {
      return formatMetaTitle('حاسبة مكافأة نهاية الخدمة في الإمارات | وفق المرسوم بقانون 33 لسنة 2021');
    }
    if (country.countryCode === 'EG') {
      return formatMetaTitle('حاسبة مكافأة نهاية الخدمة في مصر | وفق قانون العمل رقم 12 لسنة 2003');
    }
    return formatMetaTitle(`حاسبة مكافأة نهاية الخدمة في ${country.nameAr} | حساب مستحقات العمل`);
  }

  if (calc.slug === 'vat-calculator') {
    if (country.countryCode === 'SA') {
      return formatMetaTitle('حاسبة ضريبة القيمة المضافة 15% السعودية | حساب واستخراج الضريبة');
    }
    if (country.countryCode === 'AE') {
      return formatMetaTitle('حاسبة ضريبة القيمة المضافة 5% الإمارات | إضافة واستخراج الضريبة');
    }
    if (country.countryCode === 'EG') {
      return formatMetaTitle('حاسبة ضريبة القيمة المضافة 14% مصر | حساب الضريبة والمبلغ الصافي');
    }
    return formatMetaTitle(`حاسبة ضريبة القيمة المضافة في ${country.nameAr} | إضافة واستخراج الضريبة`);
  }

  if (calc.slug === 'car-fuel-cost') {
    return formatMetaTitle(`حاسبة تكلفة البنزين والوقود في ${country.nameAr} | حساب سعر المشوار والرحلات`);
  }

  if (calc.slug === 'loan-calculator') {
    return formatMetaTitle(`حاسبة القروض والتمويل في ${country.nameAr} (${country.currencySymbolAr}) | حساب القسط الشهري`);
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

  if (calc.slug === 'electricity-bill') {
    if (country.countryCode === 'SA') {
      return 'احسب فاتورة الكهرباء في السعودية بدقة وفق شرائح هيئة تنظيم المياه والكهرباء (18 هللة للشريحة الأولى و30 هللة للثانية) شاملة رسوم العداد وضريبة 15%.';
    }
    if (country.countryCode === 'AE') {
      return 'احسب فاتورة الكهرباء في الإمارات وفق شرائح ديوا دبي (23-38 فلساً) أو أدك أبوظبي شاملة رسم الوقود الإضافي وضريبة القيمة المضافة 5%.';
    }
    if (country.countryCode === 'EG') {
      return 'احسب فاتورة الكهرباء في مصر وفق الشرائح المنزلية السبعة لجهاز تنظيم مرفق الكهرباء (EgyptERA) لعام 2024/2026 مع مقابل خدمة العملاء.';
    }
  }

  if (calc.slug === 'end-of-service-reward') {
    if (country.countryCode === 'SA') {
      return 'احسب مكافأة نهاية الخدمة في السعودية بدقة متناهية وفق المادتين 84 و 85 من نظام العمل لإنهاء العقد أو الاستقالة مع حساب كسور السنة والبدلات.';
    }
    if (country.countryCode === 'AE') {
      return 'احسب مكافأة نهاية الخدمة في الإمارات وفق المادة 51 من المرسوم بقانون رقم 33 لسنة 2021 (أجر 21 يوماً للسنوات الخمس الأولى و30 يوماً للتالية بسقف أجر سنتين).';
    }
  }

  if (calc.slug === 'car-fuel-cost') {
    return `احسب تكلفة مشوارك واستهلاك بنزين سيارتك في ${country.nameAr} بالعملة الرسمية (${country.currencySymbolAr}) استناداً إلى تسعيرة الوقود الرسمية المعتمدة.`;
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
    url: SITE_DOMAIN,
    inLanguage: 'ar',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_DOMAIN}/calculators/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
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
      url: SITE_DOMAIN,
    },
    publisher: {
      '@type': 'Organization',
      name: 'لِسيارتك',
      url: SITE_DOMAIN,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_DOMAIN}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': constructCanonicalUrl(`/guides/${guide.slug}`),
    },
  };
}
