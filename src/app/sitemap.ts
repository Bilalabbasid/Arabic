import { MetadataRoute } from 'next';
import { ALL_CALCULATORS } from '@/data/calculators';
import { CATEGORIES } from '@/data/categories';
import { COUNTRIES } from '@/data/countries';
import { GUIDES } from '@/data/guides';
import { constructCanonicalUrl, isCountryCalculatorValid } from '@/lib/seo/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-10-31T00:00:00.000Z');

  // Static core pages (strictly matching canonical tags)
  const staticPages: MetadataRoute.Sitemap = [
    { url: constructCanonicalUrl('/'), lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: constructCanonicalUrl('/calculators'), lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: constructCanonicalUrl('/categories'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: constructCanonicalUrl('/guides'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: constructCanonicalUrl('/methodology'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: constructCanonicalUrl('/sources'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: constructCanonicalUrl('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: constructCanonicalUrl('/contact'), lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: constructCanonicalUrl('/privacy'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: constructCanonicalUrl('/terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: constructCanonicalUrl(`/categories/${cat.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Universal calculator pages
  const calculatorPages: MetadataRoute.Sitemap = ALL_CALCULATORS.map((calc) => ({
    url: constructCanonicalUrl(`/calculators/${calc.slug}`),
    lastModified: calc.lastReviewedAt ? new Date(calc.lastReviewedAt) : now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Country hub pages
  const countryHubPages: MetadataRoute.Sitemap = COUNTRIES.map((c) => ({
    url: constructCanonicalUrl(`/${c.countryCode.toLowerCase()}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
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
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }
  }

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: constructCanonicalUrl(`/guides/${g.slug}`),
    lastModified: new Date(g.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
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
