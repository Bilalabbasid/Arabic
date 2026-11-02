import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { generateOrganizationSchema } from '@/lib/seo/metadata';

describe('Phase 8: Trust & Transparency Pages (/about, /contact, /methodology, /sources)', () => {
  it('/about page explains team background, real 10-calculator scale, and funding model', () => {
    const aboutContent = fs.readFileSync(path.join(process.cwd(), 'src/app/about/page.tsx'), 'utf8');
    expect(aboutContent).toContain('[FILL: real name or company + 2–3 sentences of real background]');
    expect(aboutContent).not.toContain('200–400+');
    expect(aboutContent).not.toContain('200-400+');
    expect(aboutContent).toContain('10 حاسبات متخصصة');
    expect(aboutContent).toContain('نموذج التمويل');
    expect(aboutContent).toContain('/contact');
    expect(aboutContent).toContain('/methodology');
  });

  it('/contact page provides contact email placeholder, response time, and jurisdiction', () => {
    const contactContent = fs.readFileSync(path.join(process.cwd(), 'src/app/contact/page.tsx'), 'utf8');
    expect(contactContent).toContain('[FILL: contact email]');
    expect(contactContent).toContain('48 ساعة عمل');
    expect(contactContent).toContain('[FILL: legal entity, country/city]');
  });

  it('/methodology page includes update frequency schedule, rounding standards, and real changelog', () => {
    const methContent = fs.readFileSync(path.join(process.cwd(), 'src/app/methodology/page.tsx'), 'utf8');
    expect(methContent).toContain('جدول مواعيد ودورات تحديث البيانات');
    expect(methContent).toContain('معايير التقريب والحدود المحاسبية');
    expect(methContent).toContain('سجل التعديلات والتحديثات الفعلي (Changelog)');
    expect(methContent).toContain('الإبلاغ عن خطأ أو تعديل في اللوائح');
    expect(methContent).toContain('2026-11-02');
  });

  it('/sources page contains official sources table with verified deep links and checked dates', () => {
    const sourcesContent = fs.readFileSync(path.join(process.cwd(), 'src/app/sources/page.tsx'), 'utf8');
    expect(sourcesContent).toContain('جدول المصادر واللوائح الرسمية المعتمدة');
    expect(sourcesContent).toContain('zatca.gov.sa');
    expect(sourcesContent).toContain('tax.gov.ae');
    expect(sourcesContent).toContain('aramco.com');
  });

  it('generateOrganizationSchema produces valid JSON-LD schema matching standards', () => {
    const schema = generateOrganizationSchema();
    expect(schema['@type']).toBe('Organization');
    expect(schema.name).toBe('لِسيارتك');
    expect(schema.url).toMatch(/^https?:\/\//);
    expect(schema.logo).toMatch(/\/icon\.svg$/);
    expect(schema.email).toContain('[FILL: contact email]');
    expect(schema.publishingPrinciples).toMatch(/\/methodology$/);
  });
});
