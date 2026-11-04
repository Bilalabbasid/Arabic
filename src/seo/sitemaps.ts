import { ALL_CALCULATORS, getCalculatorBySlug } from '@/data/calculators';
import { CATEGORIES } from '@/data/categories';
import { COUNTRIES, getCountryData } from '@/data/countries';
import { GUIDES } from '@/data/guides';
import { INDEXABLE_CATEGORIES, constructCanonicalUrl, SITE_URL, isCountryHubIndexable } from '@/lib/seo/metadata';
import { isIndexable, isCountryHubGatedIndexable } from '@/lib/seo/gating';

export interface SitemapUrlEntry {
  url: string;
  lastmod: string; // YYYY-MM-DD
}

export function getCalculatorsSitemap(): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [
    {
      url: constructCanonicalUrl('/calculators'),
      lastmod: '2026-10-20',
    },
  ];

  for (const calc of ALL_CALCULATORS) {
    if (calc.publicationStatus === 'PUBLISHED' && calc.slug !== 'car-fuel-cost') {
      entries.push({
        url: constructCanonicalUrl(`/calculators/${calc.slug}`),
        lastmod: calc.lastReviewedAt || '2026-10-20',
      });
    }
  }

  return entries;
}

export function getCountriesSitemap(): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [];

  // Indexable country hubs (SA, AE, EG only)
  for (const c of COUNTRIES) {
    const cCode = c.countryCode.toLowerCase();
    if (isCountryHubIndexable(cCode)) {
      const cData = getCountryData(cCode);
      const hubLastmod = cData?.fuel?.checkedAt || cData?.vat?.checkedAt || '2026-10-15';

      entries.push({
        url: constructCanonicalUrl(`/${cCode}`),
        lastmod: hubLastmod,
      });

      // Fuel hub
      if (cData?.fuel && (cData.fuel.status === 'verified' || cData.fuel.status === 'not_applicable')) {
        entries.push({
          url: constructCanonicalUrl(`/${cCode}/fuel-prices`),
          lastmod: cData.fuel.checkedAt || '2026-11-01',
        });
      }

      // Intercity trip routes
      if (cData?.routes && cData.fuel?.status === 'verified') {
        for (const route of cData.routes.slice(0, 5)) {
          entries.push({
            url: constructCanonicalUrl(`/${cCode}/trip-cost/${route.id}`),
            lastmod: cData.fuel.checkedAt || '2026-11-01',
          });
        }
      }
    }
  }

  // Indexable country calculators (excluding 301 redirects like car-fuel-cost)
  for (const c of COUNTRIES) {
    const cCode = c.countryCode.toLowerCase();
    const cData = getCountryData(cCode);

    for (const calc of ALL_CALCULATORS) {
      if (calc.slug === 'car-fuel-cost') continue;
      if (isIndexable({ countryCode: cCode, calculatorSlug: calc.slug })) {
        let calcDate = calc.lastReviewedAt || '2026-10-20';
        if (cData) {
          if (calc.slug === 'car-fuel-cost' || calc.slug === 'fuel-cost' || calc.slug === 'fuel-prices' || calc.slug === 'trip-cost') {
            calcDate = cData.fuel?.checkedAt || calcDate;
          } else if (calc.slug === 'vat-calculator') {
            calcDate = cData.vat?.checkedAt || calcDate;
          } else if (calc.slug === 'end-of-service-reward') {
            calcDate = cData.endOfService?.checkedAt || calcDate;
          } else if (calc.slug === 'electricity-bill') {
            calcDate = cData.electricity?.checkedAt || calcDate;
          }
        }

        entries.push({
          url: constructCanonicalUrl(`/${cCode}/${calc.slug}`),
          lastmod: calcDate,
        });
      }
    }
  }

  return entries;
}

export function getGuidesSitemap(): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [
    {
      url: constructCanonicalUrl('/guides'),
      lastmod: '2026-10-22',
    },
  ];

  for (const guide of GUIDES) {
    entries.push({
      url: constructCanonicalUrl(`/guides/${guide.slug}`),
      lastmod: guide.updatedAt,
    });
  }

  return entries;
}

export function getStaticSitemap(): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [
    { url: constructCanonicalUrl('/'), lastmod: '2026-11-02' },
    { url: constructCanonicalUrl('/about'), lastmod: '2026-10-29' },
    { url: constructCanonicalUrl('/methodology'), lastmod: '2026-10-29' },
    { url: constructCanonicalUrl('/sources'), lastmod: '2026-10-29' },
    { url: constructCanonicalUrl('/changelog'), lastmod: '2026-11-02' },
    { url: constructCanonicalUrl('/contact'), lastmod: '2026-10-29' },
    { url: constructCanonicalUrl('/privacy'), lastmod: '2026-10-29' },
    { url: constructCanonicalUrl('/terms'), lastmod: '2026-10-29' },
  ];

  // Indexable category hubs
  for (const cat of CATEGORIES) {
    if (INDEXABLE_CATEGORIES.includes(cat.id)) {
      entries.push({
        url: constructCanonicalUrl(`/categories/${cat.slug}`),
        lastmod: '2026-10-20',
      });
    }
  }

  return entries;
}

export function getAllSitemapEntries(): Array<{ url: string; lastModified: Date }> {
  const all: SitemapUrlEntry[] = [
    ...getStaticSitemap(),
    ...getCalculatorsSitemap(),
    ...getCountriesSitemap(),
    ...getGuidesSitemap(),
  ];

  return all.map((entry) => ({
    url: entry.url,
    lastModified: new Date(entry.lastmod),
  }));
}

export function buildXmlUrlSet(entries: SitemapUrlEntry[]): string {
  const xmlUrls = entries
    .map(
      (e) => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}

export function buildXmlSitemapIndex(
  sitemaps: Array<{ loc: string; lastmod: string }>
): string {
  const xmlSitemaps = sitemaps
    .map(
      (s) => `  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlSitemaps}
</sitemapindex>`;
}

