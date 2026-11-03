import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import {
  generateWebSiteSchema,
  generateOrganizationSchema,
  generateCalculatorSchema,
  generateFaqSchema,
  generateArticleSchema,
  formatMetaTitle,
  SITE_URL,
} from '@/lib/seo/metadata';

describe('Phase 9: Technical SEO Verification', () => {
  it('formatMetaTitle appends | لِسيارتك exactly once without duplication', () => {
    const title = formatMetaTitle('حاسبة القروض والتمويل');
    expect(title).toBe('حاسبة القروض والتمويل | لِسيارتك');

    // Should not duplicate if suffix is already present
    const alreadyFormatted = formatMetaTitle('حاسبة القروض والتمويل | لِسيارتك');
    expect(alreadyFormatted).toBe('حاسبة القروض والتمويل | لِسيارتك');
  });

  it('robots.txt points to SITE_URL/sitemap.xml and disallows /api/', () => {
    const rob = robots();
    expect(rob.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(rob.rules).toEqual({
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    });
  });

  it('sitemap contains only valid canonical URLs with real lastmod and no changefreq/priority', () => {
    const entries = sitemap();
    expect(entries.length).toBeGreaterThan(0);

    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/www\.lsayartk\.com/);
      expect(entry.url).toContain('www.lsayartk.com');
      expect(entry.url).not.toMatch(/\/$/); // no trailing slash (except apex)
      expect(entry.lastModified).toBeInstanceOf(Date);
      // Ensure Google-ignored priority and changefreq are omitted
      expect((entry as any).priority).toBeUndefined();
      expect((entry as any).changefreq).toBeUndefined();
    }
  });

  it('generateWebSiteSchema conforms to Google SearchAction standard', () => {
    const schema = generateWebSiteSchema();
    expect(schema['@type']).toBe('WebSite');
    expect(schema.url).toBe(SITE_URL);
    expect(schema.potentialAction['@type']).toBe('SearchAction');
    expect(schema.potentialAction.target.urlTemplate).toContain(SITE_URL);
  });

  it('generateOrganizationSchema conforms to publisher guidelines', () => {
    const schema = generateOrganizationSchema();
    expect(schema['@type']).toBe('Organization');
    expect(schema.name).toBe('لِسيارتك');
    expect(schema.url).toBe(SITE_URL);
    expect(schema.logo).toBe(`${SITE_URL}/icon.svg`);
    expect(schema.sameAs).toEqual([]);
    expect(schema.publishingPrinciples).toBe(`${SITE_URL}/methodology`);
  });

  it('generateCalculatorSchema assigns FinanceApplication or UtilitiesApplication', () => {
    const vatSchema = generateCalculatorSchema({
      nameAr: 'حاسبة ضريبة القيمة المضافة',
      descriptionAr: 'حساب ضريبة القيمة المضافة',
      slug: 'vat-calculator',
    });
    expect(vatSchema.applicationCategory).toBe('FinanceApplication');
    expect(vatSchema.operatingSystem).toBe('All');

    const fuelSchema = generateCalculatorSchema({
      nameAr: 'حاسبة استهلاك الوقود',
      descriptionAr: 'حساب استهلاك الوقود',
      slug: 'car-fuel-cost',
    });
    expect(fuelSchema.applicationCategory).toBe('UtilitiesApplication');
    expect(fuelSchema.operatingSystem).toBe('All');
  });

  it('generateFaqSchema returns null when fewer than 3 FAQs are present', () => {
    const emptySchema = generateFaqSchema([]);
    expect(emptySchema).toBeNull();

    const shortSchema = generateFaqSchema([
      { question: 'س1', answer: 'ج1' },
      { question: 'س2', answer: 'ج2' },
    ]);
    expect(shortSchema).toBeNull();

    const validSchema = generateFaqSchema([
      { question: 'س1', answer: 'ج1' },
      { question: 'س2', answer: 'ج2' },
      { question: 'س3', answer: 'ج3' },
    ]);
    expect(validSchema).not.toBeNull();
    expect(validSchema?.['@type']).toBe('FAQPage');
    expect(validSchema?.mainEntity).toHaveLength(3);
  });

  it('generateArticleSchema uses SITE_URL and valid dates', () => {
    const article = generateArticleSchema({
      slug: 'trip-fuel-cost-guide',
      titleAr: 'دليل حساب تكلفة السفر بالسيارة',
      summaryAr: 'شرح كيفية حساب تكلفة الوقود',
      updatedAt: '2026-10-15',
    });
    expect(article['@type']).toBe('TechArticle');
    expect(article.author.url).toBe(SITE_URL);
    expect(article.publisher.url).toBe(SITE_URL);
    expect(article.publisher.logo.url).toBe(`${SITE_URL}/icon.svg`);
    expect(article.datePublished).toBe('2026-10-15');
  });

  it('ads.txt exists and specifies correct publisher template', () => {
    const adsTxtPath = path.join(process.cwd(), 'public/ads.txt');
    expect(fs.existsSync(adsTxtPath)).toBe(true);
    const content = fs.readFileSync(adsTxtPath, 'utf8');
    expect(content.trim()).toBe('google.com, [FILL: pub-XXXXXXXXXXXXXXXX], DIRECT, f08c47fec0942fa0');
  });

  it('AdSlot component renders nothing when NEXT_PUBLIC_ADS_ENABLED is not true', () => {
    const adSlotCode = fs.readFileSync(path.join(process.cwd(), 'src/components/layout/AdSlot.tsx'), 'utf8');
    expect(adSlotCode).toContain("process.env.NEXT_PUBLIC_ADS_ENABLED !== 'true'");
    expect(adSlotCode).toContain('return null');
    // Ensure the old visible gray placeholder string is removed
    expect(adSlotCode).not.toContain('Google AdSense Slot');
  });
});

