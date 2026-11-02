import { describe, it, expect } from 'vitest';
import { ALL_CALCULATORS } from '@/data/calculators';
import { COUNTRY_CALCULATOR_CONTENT } from '@/data/country-content';
import { GUIDES } from '@/data/guides';

describe('Phase 10: Content Quality on Kept Pages', () => {
  it('all 10 calculators have a direct, non-empty answer-first explanation (1-2 sentences)', () => {
    expect(ALL_CALCULATORS.length).toBe(10);

    for (const calc of ALL_CALCULATORS) {
      expect(calc.answerFirstAr, `Calculator ${calc.slug} must have answerFirstAr`).toBeDefined();
      expect(calc.answerFirstAr!.length, `Calculator ${calc.slug} answerFirstAr is too short`).toBeGreaterThan(30);
      // Ensure it contains core Arabic explanatory phrases
      expect(calc.answerFirstAr).toMatch(/[\u0600-\u06FF]/);
    }
  });

  it('all 10 calculators have at least 2 worked examples with complete steps and summaries', () => {
    for (const calc of ALL_CALCULATORS) {
      expect(calc.workedExamples.length, `Calculator ${calc.slug} should have >= 2 worked examples`).toBeGreaterThanOrEqual(2);

      for (const example of calc.workedExamples) {
        expect(example.title.length).toBeGreaterThan(5);
        expect(example.steps.length).toBeGreaterThanOrEqual(2);
        expect(example.resultSummary.length).toBeGreaterThan(5);
      }
    }
  });

  it('all 10 calculators have at least 3 realistic common mistakes with mistake, correction, and explanation', () => {
    for (const calc of ALL_CALCULATORS) {
      expect(calc.commonMistakes, `Calculator ${calc.slug} must define commonMistakes`).toBeDefined();
      expect(calc.commonMistakes!.length, `Calculator ${calc.slug} should have >= 3 common mistakes`).toBeGreaterThanOrEqual(3);

      for (const cm of calc.commonMistakes!) {
        expect(cm.mistake.length).toBeGreaterThan(10);
        expect(cm.correction.length).toBeGreaterThan(10);
        expect(cm.explanation.length).toBeGreaterThan(15);
      }
    }
  });

  it('all 10 calculators have at least 3 answered FAQs with non-empty questions and answers', () => {
    for (const calc of ALL_CALCULATORS) {
      expect(calc.faqs.length, `Calculator ${calc.slug} should have >= 3 FAQs`).toBeGreaterThanOrEqual(3);

      for (const faq of calc.faqs) {
        expect(faq.question.trim().length, `FAQ question in ${calc.slug} cannot be empty`).toBeGreaterThan(5);
        expect(faq.answer.trim().length, `FAQ answer for "${faq.question}" in ${calc.slug} cannot be empty`).toBeGreaterThan(15);
        expect(faq.answer).not.toContain('[FILL');
      }
    }
  });

  it('all 25 verified country calculators have at least 2 worked examples and complete FAQs', () => {
    let countryPageCount = 0;

    for (const [calcSlug, countries] of Object.entries(COUNTRY_CALCULATOR_CONTENT)) {
      for (const [countryCode, content] of Object.entries(countries)) {
        countryPageCount++;
        expect(content.workedExamples.length, `${countryCode}/${calcSlug} should have >= 2 worked examples`).toBeGreaterThanOrEqual(2);
        expect(content.faqs.length, `${countryCode}/${calcSlug} should have >= 3 FAQs`).toBeGreaterThanOrEqual(3);

        for (const faq of content.faqs) {
          expect(faq.question.trim().length).toBeGreaterThan(5);
          expect(faq.answer.trim().length).toBeGreaterThan(15);
        }
      }
    }

    expect(countryPageCount).toBe(25);
  });

  it('every guide article embeds 2-4 contextual markdown links to calculators', () => {
    expect(GUIDES.length).toBeGreaterThanOrEqual(8);

    for (const guide of GUIDES) {
      const fullGuideText = `${guide.content.intro} ${guide.content.sections.map(s => s.body).join(' ')} ${guide.content.conclusion}`;
      const calculatorLinks = fullGuideText.match(/\[[^\]]+\]\(\/calculators\/[a-z\-]+\)/g) || [];

      expect(
        calculatorLinks.length,
        `Guide ${guide.slug} should embed at least 2 calculator links, found ${calculatorLinks.length}`
      ).toBeGreaterThanOrEqual(2);
    }
  });

  it('no identical 8-word phrase appears across more than 5 pages (boilerplate free)', () => {
    function extractShingles(text: string, size = 8): string[] {
      const words = text
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()؟،؛"'\n\r\t]/g, ' ')
        .split(/\s+/)
        .map(w => w.trim().toLowerCase())
        .filter(w => w.length > 1);

      const shingles: string[] = [];
      for (let i = 0; i <= words.length - size; i++) {
        shingles.push(words.slice(i, i + size).join(' '));
      }
      return shingles;
    }

    const shingleMap = new Map<string, Set<string>>();

    for (const calc of ALL_CALCULATORS) {
      const text = `${calc.descriptionAr} ${calc.formulaExplanation} ${calc.workedExamples.map(e => e.title + ' ' + (e.steps || []).join(' ')).join(' ')}`;
      const shingles = extractShingles(text);
      for (const s of shingles) {
        if (!shingleMap.has(s)) shingleMap.set(s, new Set());
        shingleMap.get(s)!.add(calc.slug);
      }
    }

    for (const [calcSlug, countries] of Object.entries(COUNTRY_CALCULATOR_CONTENT)) {
      for (const [cCode, content] of Object.entries(countries)) {
        const text = `${content.intro} ${content.currentRateOrRule} ${content.detailedAnalysis || ''}`;
        const shingles = extractShingles(text);
        for (const s of shingles) {
          if (!shingleMap.has(s)) shingleMap.set(s, new Set());
          shingleMap.get(s)!.add(`${cCode}:${calcSlug}`);
        }
      }
    }

    for (const [shingle, pageSet] of shingleMap.entries()) {
      expect(pageSet.size, `Phrase "${shingle}" appeared across ${pageSet.size} pages (> 5)`).toBeLessThanOrEqual(5);
    }
  });
});
