import { describe, it, expect } from 'vitest';
import { ALL_CALCULATORS, getCalculatorBySlug } from '@/data/calculators';
import { CATEGORIES } from '@/data/categories';
import { GUIDES } from '@/data/guides';
import { COUNTRIES } from '@/data/countries';
import {
  formatMetaTitle,
  generateWebSiteSchema,
  generateOrganizationSchema,
  generateCalculatorSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateFaqSchema,
  SITE_NAME,
} from '@/lib/seo/metadata';
import { KEYWORDS_REGISTRY, getKeywordMetadata } from '@/seo/keywords';

describe('SEO On-Page & Schema.org Validation', () => {
  it('Title tags: every calculator has a title with single | لِسيارتك suffix (test)', () => {
    const titles = new Set<string>();

    for (const calc of ALL_CALCULATORS) {
      const title = formatMetaTitle(calc.metaTitle);

      // Check single suffix
      const occurrences = (title.match(new RegExp(SITE_NAME, 'g')) || []).length;
      expect(occurrences, `Title "${title}" has ${occurrences} occurrences of site name`).toBe(1);

      // Unique titles
      expect(titles.has(title), `Duplicate title found: ${title}`).toBe(false);
      titles.add(title);
    }
  });

  it('Answer-first: every calculator has direct answer copy (test)', () => {
    for (const calc of ALL_CALCULATORS) {
      expect(calc.answerFirstAr, `Calculator ${calc.slug} is missing answerFirstAr`).toBeDefined();
      expect(calc.answerFirstAr!.length).toBeGreaterThan(15);
    }
  });

  it('Meta descriptions: sensible length and present for all calculators (test)', () => {
    for (const calc of ALL_CALCULATORS) {
      expect(calc.metaDescription).toBeDefined();
      expect(calc.metaDescription.length).toBeGreaterThanOrEqual(70);
      expect(calc.metaDescription.length).toBeLessThanOrEqual(200);
    }
  });

  it('Schema.org WebSite: includes valid SearchAction (test)', () => {
    const website = generateWebSiteSchema();
    expect(website['@type']).toBe('WebSite');
    expect(website.name).toBe('لِسيارتك');
    expect(website.potentialAction['@type']).toBe('SearchAction');
    expect(website.potentialAction.target.urlTemplate).toContain('{search_term_string}');
  });

  it('Schema.org Organization: includes required transparency properties (test)', () => {
    const org = generateOrganizationSchema();
    expect(org['@type']).toBe('Organization');
    expect(org.name).toBe('لِسيارتك');
    expect(org.url).toBeDefined();
    expect(org.logo).toBeDefined();
    expect(org.publishingPrinciples).toContain('/methodology');
  });

  it('Schema.org WebApplication: valid for all calculators without aggregateRating (test)', () => {
    for (const calc of ALL_CALCULATORS) {
      const schema = generateCalculatorSchema({
        nameAr: calc.nameAr,
        descriptionAr: calc.descriptionAr,
        slug: calc.slug,
      });

      expect(schema['@type']).toBe('WebApplication');
      expect(schema.name).toBe(calc.nameAr);
      expect(schema.url).toContain(`/calculators/${calc.slug}`);
      expect(schema.isAccessibleForFree).toBe(true);

      // HARD CONSTRAINT: No fabricated aggregateRating schema!
      expect((schema as any).aggregateRating).toBeUndefined();
    }
  });

  it('Schema.org BreadcrumbList: correctly numbered and formatted (test)', () => {
    const crumbs = [
      { name: 'الرئيسية', url: '/' },
      { name: 'حاسبات السيارات', url: '/categories/cars-transportation' },
      { name: 'حاسبة الوقود', url: '/calculators/fuel-cost' },
    ];
    const schema = generateBreadcrumbSchema(crumbs);

    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
    expect(schema.itemListElement[2].position).toBe(3);
    expect(schema.itemListElement[2].item).toContain('/calculators/fuel-cost');
  });

  it('Schema.org Article: valid for all 10 guides (test)', () => {
    for (const guide of GUIDES) {
      const schema = generateArticleSchema(guide);
      expect(['Article', 'TechArticle']).toContain(schema['@type']);
      expect(schema.headline).toBe(guide.titleAr);
      expect(schema.datePublished).toBe(guide.updatedAt);
      expect(schema.author.name).toBe('لِسيارتك');
    }
  });

  it('Schema.org FAQPage: generates FAQ schema only when >= 3 FAQs exist (test)', () => {
    const validFaqs = [
      { question: 'سؤال 1', answer: 'جواب 1' },
      { question: 'سؤال 2', answer: 'جواب 2' },
      { question: 'سؤال 3', answer: 'جواب 3' },
    ];
    const schema = generateFaqSchema(validFaqs);
    expect(schema).not.toBeNull();
    expect(schema!['@type']).toBe('FAQPage');
    expect(schema!.mainEntity).toHaveLength(3);

    const thinFaqs = [{ question: 'سؤال 1', answer: 'جواب 1' }];
    expect(generateFaqSchema(thinFaqs)).toBeNull();
  });

  it('Keywords matrix: defines targeted queries and dialect terms for all calculators (test)', () => {
    for (const calc of ALL_CALCULATORS) {
      const entry = getKeywordMetadata(calc.slug);
      expect(entry, `Missing keywords matrix entry for ${calc.slug}`).toBeDefined();
      expect(entry!.mainQuery).toBeDefined();
      expect(entry!.variants.length).toBeGreaterThanOrEqual(1);
      expect(entry!.benefit).toBeDefined();
    }
  });
});
