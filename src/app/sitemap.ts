import { MetadataRoute } from 'next';
import { ALL_CALCULATORS } from '@/data/calculators';
import { CATEGORIES } from '@/data/categories';
import { COUNTRIES } from '@/data/countries';
import { GUIDES } from '@/data/guides';
import {
  constructCanonicalUrl,
  isCountryCalculatorValid,
  isCountryHubIndexable,
} from '@/lib/seo/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-11-01T00:00:00.000Z');

  // Static core pages (strictly matching canonical tags)
  const staticPages: MetadataRoute.Sitemap = [
    { url: constructCanonicalUrl('/'), lastModified: now },
    { url: constructCanonicalUrl('/calculators'), lastModified: now },
    { url: constructCanonicalUrl('/categories'), lastModified: now },
    { url: constructCanonicalUrl('/guides'), lastModified: now },
    { url: constructCanonicalUrl('/methodology'), lastModified: now },
    { url: constructCanonicalUrl('/sources'), lastModified: now },
    { url: constructCanonicalUrl('/about'), lastModified: now },
    { url: constructCanonicalUrl('/contact'), lastModified: now },
    { url: constructCanonicalUrl('/privacy'), lastModified: now },
    { url: constructCanonicalUrl('/terms'), lastModified: now },
  ];

  // Category pages - only indexable categories with live calculators
  const indexableCategorySlugs = new Set(['mathematics-percentages', 'taxation', 'unit-conversion', 'loans-installments', 'cars-transportation', 'salary-employment', 'electricity-energy', 'health-fitness']);
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES
    .filter((cat) => (cat.calculatorCount ?? 0) >= 3 || indexableCategorySlugs.has(cat.id))
    .map((cat) => ({
      url: constructCanonicalUrl(`/categories/${cat.slug}`),
      lastModified: now,
    }));

  // Universal calculator pages
  const calculatorPages: MetadataRoute.Sitemap = ALL_CALCULATORS.map((calc) => ({
    url: constructCanonicalUrl(`/calculators/${calc.slug}`),
    lastModified: calc.lastReviewedAt ? new Date(calc.lastReviewedAt) : now,
  }));

  // Country hub pages (strictly only indexable hubs with >= 3 localized calculators)
  const countryHubPages: MetadataRoute.Sitemap = COUNTRIES
    .filter((c) => isCountryHubIndexable(c.countryCode))
    .map((c) => ({
      url: constructCanonicalUrl(`/${c.countryCode.toLowerCase()}`),
      lastModified: now,
    }));

  // Verified Country calculator pages (strictly avoiding thin/duplicate universal calculators)
  const countryCalculatorPages: MetadataRoute.Sitemap = [];
  for (const country of COUNTRIES) {
    const cCode = country.countryCode.toLowerCase();
    for (const calc of ALL_CALCULATORS) {
      if (calc.publicationStatus === 'PUBLISHED' && isCountryCalculatorValid(calc, country.countryCode)) {
        countryCalculatorPages.push({
          url: constructCanonicalUrl(`/${cCode}/${calc.slug}`),
          lastModified: calc.lastReviewedAt ? new Date(calc.lastReviewedAt) : now,
        });
      }
    }
  }

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: constructCanonicalUrl(`/guides/${g.slug}`),
    lastModified: new Date(g.updatedAt),
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...calculatorPages,
    ...countryHubPages,
    ...countryCalculatorPages,
    ...guidePages,
  ];
}
