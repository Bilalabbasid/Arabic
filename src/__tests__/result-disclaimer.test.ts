import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { ALL_CALCULATORS } from '@/data/calculators';
import { getDisclaimerForCalculator } from '@/components/calculator/ResultDisclaimer';

describe('Phase 7: Result Disclaimers and Copy Safeguards', () => {
  it('every calculator must have a dynamic disclaimer with text, authority, url, and checked date', () => {
    for (const calc of ALL_CALCULATORS) {
      const saDisclaimer = getDisclaimerForCalculator(calc.slug, 'SA');
      expect(saDisclaimer.disclaimerText).toBeTruthy();
      expect(saDisclaimer.authority).toBeTruthy();
      expect(saDisclaimer.sourceUrl).toMatch(/^https?:\/\//);
      expect(saDisclaimer.lastChecked).toBeTruthy();
      expect(saDisclaimer.disclaimerType).toBeTruthy();
    }
  });

  it('VAT disclaimer dynamically reflects country authority and rate', () => {
    const saVat = getDisclaimerForCalculator('vat-calculator', 'SA');
    expect(saVat.disclaimerText).toContain('ZATCA');
    expect(saVat.disclaimerText).toContain('15%');

    const aeVat = getDisclaimerForCalculator('vat-calculator', 'AE');
    expect(aeVat.disclaimerText).toContain('5%');
    expect(aeVat.sourceUrl).toContain('tax.gov.ae');

    const kwVat = getDisclaimerForCalculator('vat-calculator', 'KW');
    expect(kwVat.disclaimerText).toContain('لا تطبق ضريبة القيمة المضافة');
  });

  it('Labour (EOS) disclaimer reflects labor laws', () => {
    const saEos = getDisclaimerForCalculator('end-of-service-reward', 'SA');
    expect(saEos.disclaimerText).toContain('نظام العمل السعودي');

    const aeEos = getDisclaimerForCalculator('end-of-service-reward', 'AE');
    expect(aeEos.disclaimerText).toContain('33');
    expect(aeEos.authority).toContain('MOHRE');
  });

  it('BMI disclaimer includes WHO and medical non-binding notice', () => {
    const bmi = getDisclaimerForCalculator('bmi-calculator', 'SA');
    expect(bmi.disclaimerType).toBe('health');
    expect(bmi.disclaimerText).toContain('الاستشارة الطبية');
    expect(bmi.authority).toContain('منظمة الصحة العالمية');
  });

  it('Copy result text includes mandatory non-binding attribution', () => {
    const displayCode = fs.readFileSync(path.join(process.cwd(), 'src/components/calculator/ResultDisplay.tsx'), 'utf8');
    expect(displayCode).toContain('— تم الحساب عبر منصة لِسيارتك lsayartk.com – نتائج استرشادية غير ملزمة رسمياً.');
  });

  it('Footer disclaimer is simplified to one line matching the standard', () => {
    const footerCode = fs.readFileSync(path.join(process.cwd(), 'src/components/layout/Footer.tsx'), 'utf8');
    expect(footerCode).toContain('نتائج كافة الحاسبات استرشادية تعليمية غير ملزمة رسمياً');
    // Ensure the old verbose paragraph is not present
    expect(footerCode).not.toContain('المنصة لا تقدم استشارات قانونية أو ضريبية ملزمة، ويُنصح دائماً بمراجعة الجهات الرسمية');
  });

  it('disclaimer-mapping.csv exists and has 10 rows', () => {
    const csvPath = path.join(process.cwd(), 'seo-audit/disclaimer-mapping.csv');
    expect(fs.existsSync(csvPath)).toBe(true);
    const content = fs.readFileSync(csvPath, 'utf8');
    const lines = content.trim().split('\n');
    expect(lines.length).toBe(11); // 1 header + 10 calculators
  });
});
