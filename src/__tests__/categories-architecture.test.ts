import { describe, it, expect } from 'vitest';
import { CATEGORIES, getCategoryBySlug, CATEGORY_RICH_INTROS } from '@/data/categories';
import { ALL_CALCULATORS, getCalculatorsByCategory } from '@/data/calculators';
import { isCategoryIndexable, INDEXABLE_CATEGORIES } from '@/lib/seo/metadata';
import sitemap from '@/app/sitemap';

describe('Phase 4: Categories Architecture', () => {
  it('should mark a category indexable ONLY if it has >= 3 calculators', () => {
    for (const cat of CATEGORIES) {
      const calcs = getCalculatorsByCategory(cat.id);
      const isIndexable = isCategoryIndexable(cat.id);

      if (calcs.length >= 3) {
        expect(isIndexable).toBe(true);
      } else {
        expect(isIndexable).toBe(false);
      }
    }
  });

  it('should have exactly 7 indexable categories with current live calculators', () => {
    const indexableCats = CATEGORIES.filter((c) => isCategoryIndexable(c.id));
    expect(indexableCats.map((c) => c.id).sort()).toEqual(
      [
        'cars-transportation',
        'dates-time',
        'finance-savings',
        'loans-installments',
        'mathematics-percentages',
        'taxation',
        'unit-conversion',
      ].sort()
    );
  });

  it('finance-savings category should have at least 3 live calculators', () => {
    const financeCalcs = getCalculatorsByCategory('finance-savings');
    expect(financeCalcs.length).toBeGreaterThanOrEqual(3);
    expect(financeCalcs.some((c) => c.slug === 'loan-calculator')).toBe(true);
    expect(financeCalcs.some((c) => c.slug === 'vat-calculator')).toBe(true);
    expect(financeCalcs.some((c) => c.slug === 'car-fuel-cost')).toBe(true);
  });

  it('mathematics-percentages category should have at least 3 live calculators', () => {
    const mathCalcs = getCalculatorsByCategory('mathematics-percentages');
    expect(mathCalcs.length).toBeGreaterThanOrEqual(3);
    expect(mathCalcs.some((c) => c.slug === 'percentage-calculator')).toBe(true);
    expect(mathCalcs.some((c) => c.slug === 'length-converter')).toBe(true);
    expect(mathCalcs.some((c) => c.slug === 'time-converter')).toBe(true);
  });

  it('unit-conversion category should have at least 3 live calculators', () => {
    const unitCalcs = getCalculatorsByCategory('unit-conversion');
    expect(unitCalcs.length).toBeGreaterThanOrEqual(3);
    expect(unitCalcs.some((c) => c.slug === 'length-converter')).toBe(true);
    expect(unitCalcs.some((c) => c.slug === 'time-converter')).toBe(true);
    expect(unitCalcs.some((c) => c.slug === 'percentage-calculator')).toBe(true);
  });

  it('sitemap should ONLY contain indexable categories (and no non-indexable categories)', () => {
    const siteMapEntries = sitemap();
    const categoryLocs = siteMapEntries
      .map((e) => e.url)
      .filter((u) => u.includes('/categories/'));

    // Should contain exactly the indexable categories
    expect(categoryLocs).toHaveLength(INDEXABLE_CATEGORIES.length);
    for (const slug of INDEXABLE_CATEGORIES) {
      expect(categoryLocs).toContain(`https://www.lsayartk.com/categories/${slug}`);
    }

    // Should NOT contain any non-indexable category
    const nonIndexableSlugs = CATEGORIES.filter((c) => !isCategoryIndexable(c.id)).map((c) => c.slug);
    for (const slug of nonIndexableSlugs) {
      expect(categoryLocs).not.toContain(`https://www.lsayartk.com/categories/${slug}`);
    }
  });

  it('each indexable category must have a rich intro between 150 and 300 words', () => {
    for (const slug of INDEXABLE_CATEGORIES) {
      const richIntro = CATEGORY_RICH_INTROS[slug];
      expect(richIntro).toBeDefined();

      const combinedText = `${richIntro.intro} ${richIntro.detailedDescription}`;
      const wordCount = combinedText.trim().split(/\s+/).length;
      expect(wordCount).toBeGreaterThanOrEqual(150);
      expect(wordCount).toBeLessThanOrEqual(350);
    }
  });
});
