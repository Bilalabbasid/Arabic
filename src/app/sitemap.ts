import { MetadataRoute } from 'next';
import { ALL_CALCULATORS } from '@/data/calculators';
import { CATEGORIES } from '@/data/categories';
import { COUNTRIES } from '@/data/countries';
import { GUIDES } from '@/data/guides';
import { SITE_DOMAIN } from '@/lib/seo/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_DOMAIN;
  const now = new Date('2026-10-29T00:00:00.000Z');

  // Static core pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/calculators/`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/categories/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/guides/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/methodology/`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/sources/`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact/`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/privacy/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Universal calculator pages
  const calculatorPages: MetadataRoute.Sitemap = ALL_CALCULATORS.map((calc) => ({
    url: `${baseUrl}/calculators/${calc.slug}/`,
    lastModified: calc.lastReviewedAt ? new Date(calc.lastReviewedAt) : now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Country hub pages
  const countryHubPages: MetadataRoute.Sitemap = COUNTRIES.map((c) => ({
    url: `${baseUrl}/${c.countryCode.toLowerCase()}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Country calculator pages
  const countryCalculatorPages: MetadataRoute.Sitemap = [];
  for (const country of COUNTRIES) {
    const cCode = country.countryCode.toLowerCase();
    for (const calc of ALL_CALCULATORS) {
      const isSupported =
        calc.supportedCountries.includes('*') ||
        calc.supportedCountries.map((c) => c.toUpperCase()).includes(country.countryCode.toUpperCase());

      if (isSupported) {
        countryCalculatorPages.push({
          url: `${baseUrl}/${cCode}/${calc.slug}/`,
          lastModified: calc.lastReviewedAt ? new Date(calc.lastReviewedAt) : now,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }
  }

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}/`,
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
