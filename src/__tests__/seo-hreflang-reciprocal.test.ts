import { describe, it, expect } from 'vitest';
import { ALL_CALCULATORS, getCalculatorBySlug } from '@/data/calculators';
import { COUNTRIES } from '@/data/countries';
import { generateHreflangAlternates } from '@/lib/seo/metadata';
import { isIndexable } from '@/lib/seo/gating';

describe('SEO Reciprocal Hreflang Clusters', () => {
  it('Every calculator hreflang cluster has an authoritative x-default pointing to universal route (test)', () => {
    for (const calc of ALL_CALCULATORS) {
      const alternates = generateHreflangAlternates(calc);
      expect(alternates['x-default']).toBeDefined();
      expect(alternates['x-default']).toContain(`/calculators/${calc.slug}`);
    }
  });

  it('Zero non-indexable members: every hreflang target MUST be strictly indexable (test)', () => {
    for (const calc of ALL_CALCULATORS) {
      const alternates = generateHreflangAlternates(calc);

      for (const [langTag, url] of Object.entries(alternates)) {
        if (langTag === 'ar' || langTag === 'x-default') continue;

        // Extract country code from url e.g. https://www.lsayartk.com/sa/vat-calculator
        const match = url.match(/\/([a-z]{2})\/([a-z0-9-]+)$/);
        expect(match, `Invalid alternate URL structure: ${url}`).not.toBeNull();

        const [, countryCode, slug] = match!;
        const indexable = isIndexable({ countryCode, calculatorSlug: slug });
        expect(
          indexable,
          `Hreflang cluster includes non-indexable / unverified country page: ${url}`
        ).toBe(true);
      }
    }
  });

  it('Reciprocal clusters: every indexable country variant generates the identical cluster (test)', () => {
    for (const calc of ALL_CALCULATORS) {
      const genericAlternates = generateHreflangAlternates(calc);

      // Check for every country that is in this cluster
      for (const [langTag, url] of Object.entries(genericAlternates)) {
        if (langTag === 'ar' || langTag === 'x-default') continue;

        // Country page generates the same alternates
        const countryAlternates = generateHreflangAlternates(calc);
        expect(countryAlternates).toEqual(genericAlternates);
      }
    }
  });

  it('Universal calculators have fallback canonical ar and x-default only', () => {
    const universalCalcs = ALL_CALCULATORS.filter((c) => c.countryMode === 'UNIVERSAL');
    for (const calc of universalCalcs) {
      const alternates = generateHreflangAlternates(calc);
      expect(alternates['ar']).toBeDefined();
      expect(alternates['x-default']).toBe(alternates['ar']);
      expect(Object.keys(alternates)).toEqual(['ar', 'x-default']);
    }
  });
});

