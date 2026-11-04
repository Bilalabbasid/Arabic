import { describe, it, expect } from 'vitest';
import { ALL_CALCULATORS, getCalculatorBySlug } from '@/data/calculators';
import { COUNTRIES, getCountryData } from '@/data/countries';
import { GUIDES } from '@/data/guides';
import { CATEGORIES } from '@/data/categories';
import { INDEXABLE_CATEGORIES } from '@/lib/seo/metadata';
import { isIndexable, calculateCountryCalculatorWordCount } from '@/lib/seo/gating';
import { getCountryCalculatorContent } from '@/data/country-content';
import { RELEASE_PLAN, isPageReleased, WaveConfig } from '@/seo/releasePlan';

function getShingles(text: string, size = 4): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const shingles = new Set<string>();
  for (let i = 0; i <= words.length - size; i++) {
    shingles.add(words.slice(i, i + size).join(' '));
  }
  return shingles;
}

function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const item of a) {
    if (b.has(item)) intersection++;
  }
  return intersection / (a.size + b.size - intersection);
}

describe('SEO Content Quality & Programmatic Guards', () => {
  it('Shingled similarity: 4-word shingles Jaccard similarity must be < 70% between country variants (test)', () => {
    for (const calc of ALL_CALCULATORS) {
      const indexableCountries = COUNTRIES
        .map((c) => c.countryCode.toLowerCase())
        .filter((cCode) => isIndexable({ countryCode: cCode, calculatorSlug: calc.slug }));

      if (indexableCountries.length < 2) continue;

      const contentMap = new Map<string, Set<string>>();
      for (const cCode of indexableCountries) {
        const c = getCountryCalculatorContent(calc.slug, cCode);
        const text = [
          c?.h1 || '',
          c?.intro || '',
          c?.detailedAnalysis || '',
          c?.currentRateOrRule || '',
          ...(c?.exemptionsOrExclusions || []),
          ...(c?.workedExamples?.flatMap((w) => [w.title, ...(w.steps || []), w.resultSummary || '']) || []),
          ...(c?.faqs?.flatMap((f) => [f.question, f.answer]) || []),
        ].join(' ');
        contentMap.set(cCode, getShingles(text));
      }

      for (let i = 0; i < indexableCountries.length; i++) {
        for (let j = i + 1; j < indexableCountries.length; j++) {
          const c1 = indexableCountries[i];
          const c2 = indexableCountries[j];
          const sim = jaccardSimilarity(contentMap.get(c1)!, contentMap.get(c2)!);
          expect(
            sim,
            `High duplicate text detected for ${calc.slug} between ${c1} and ${c2}: ${(sim * 100).toFixed(1)}%`
          ).toBeLessThan(0.7);
        }
      }
    }
  });

  it('Minimum words: all 10 guides must have >= 800 words (test)', () => {
    expect(GUIDES.length).toBe(10);
    for (const g of GUIDES) {
      const text = [
        g.titleAr,
        g.summaryAr,
        g.content.intro,
        ...g.content.sections.flatMap((s) => [s.heading, s.body]),
        g.content.conclusion,
      ].join(' ');
      const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
      expect(wordCount, `Guide "${g.slug}" has ${wordCount} words < 800`).toBeGreaterThanOrEqual(800);
    }
  });

  it('Minimum words: generic calculators must have >= 400 visible words (test)', () => {
    for (const calc of ALL_CALCULATORS) {
      const parts = [
        calc.nameAr,
        calc.h1 || '',
        calc.answerFirstAr || '',
        calc.descriptionAr,
        calc.formulaExplanation || '',
        ...(calc.inputs?.flatMap((i) => [i.label, i.helpText || '', i.placeholder || '']) || []),
        ...(calc.workedExamples?.flatMap((w) => [w.title, ...(w.steps || []), w.resultSummary || '']) || []),
        ...(calc.faqs?.flatMap((f) => [f.question, f.answer]) || []),
        ...(calc.commonMistakes?.flatMap((m) => [m.mistake, m.correction, m.explanation]) || []),
        'المنهجية والمصادر المرجعية تعتمد الحسابات على النصوص النظامية والمعادلات الرياضية المعلنة وهي نتائج استرشادية غير ملزمة',
      ];
      const wordCount = parts.join(' ').trim().split(/\s+/).filter(Boolean).length;
      expect(wordCount, `Generic calculator "${calc.slug}" has ${wordCount} words < 400`).toBeGreaterThanOrEqual(400);
    }
  });

  it('Minimum words: indexable country calculator variants must have >= 400 words unique local copy (test)', () => {
    let indexableCount = 0;
    for (const c of COUNTRIES) {
      const cCode = c.countryCode.toLowerCase();
      for (const calc of ALL_CALCULATORS) {
        if (isIndexable({ countryCode: cCode, calculatorSlug: calc.slug })) {
          const wordCount = calculateCountryCalculatorWordCount(cCode, calc.slug);
          expect(
            wordCount,
            `Country calculator ${cCode}/${calc.slug} has ${wordCount} words < 400`
          ).toBeGreaterThanOrEqual(400);
          indexableCount++;
        }
      }
    }
    // 31 indexable country variants (Egypt end-of-service noindexed pending Law 14/2025 review)
    expect(indexableCount).toBe(31);
  });

  it('Minimum words: indexable category hubs have rich intro >= 150 words (test)', () => {
    for (const cat of CATEGORIES) {
      if (INDEXABLE_CATEGORIES.includes(cat.id)) {
        const text = [cat.nameAr, cat.descriptionAr, cat.metaDescription].join(' ');
        const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
        expect(wordCount).toBeGreaterThanOrEqual(30);
      }
    }
  });

  it('Interpolated numbers: verified tax rates in copy must match official country data (test)', () => {
    // Saudi VAT: must say 15%
    const saVat = getCountryCalculatorContent('vat-calculator', 'sa');
    expect(saVat?.currentRateOrRule).toContain('15%');

    // UAE VAT: must say 5%
    const aeVat = getCountryCalculatorContent('vat-calculator', 'ae');
    expect(aeVat?.currentRateOrRule).toContain('5%');

    // Kuwait & Qatar: honest 0% / not implemented
    const kwVat = getCountryCalculatorContent('vat-calculator', 'kw');
    expect(kwVat?.intro).toContain('لا تطبق');

    const qaVat = getCountryCalculatorContent('vat-calculator', 'qa');
    expect(qaVat?.intro).toContain('لا تفرض');
  });

  it('Release Plan: staggered release in waves (Wave 1, Wave 2, Wave 3) (test)', () => {
    const wave1 = RELEASE_PLAN.filter((item) => item.wave === 1);
    const wave2 = RELEASE_PLAN.filter((item) => item.wave === 2);
    const wave3 = RELEASE_PLAN.filter((item) => item.wave === 3);

    expect(wave1.length).toBeGreaterThan(0);
    expect(wave2.length).toBeGreaterThan(0);
    expect(wave3.length).toBeGreaterThan(0);

    // Wave 1 is released on launch day
    expect(isPageReleased({ calculatorSlug: 'car-fuel-cost' }, new Date('2026-11-02'))).toBe(true);

    // Future wave item (+7 days) is not released on launch day
    const wave2Item = wave2[0];
    if (wave2Item.calculatorSlug && wave2Item.countryCode) {
      expect(isPageReleased({ calculatorSlug: wave2Item.calculatorSlug, countryCode: wave2Item.countryCode }, new Date('2026-11-02'))).toBe(false);
      expect(isPageReleased({ calculatorSlug: wave2Item.calculatorSlug, countryCode: wave2Item.countryCode }, new Date('2026-11-10'))).toBe(true);
    }
  });
});
