import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { ALL_COUNTRY_LEGAL_RULES, ZAKAT_RULES } from '@/data/rules';
import { COUNTRY_VAT_RATES } from '@/lib/calculators/tax';
import { VERIFIED_COUNTRY_FUEL_PRICES } from '@/lib/calculators/cars';

describe('Phase 6: Single Source of Truth for Legal Rules & Tax/Fuel Rates', () => {
  it('all country rules must have valid authorities, deep links, and checked dates', () => {
    for (const [code, rule] of Object.entries(ALL_COUNTRY_LEGAL_RULES)) {
      expect(rule.countryCode).toBe(code);
      expect(rule.countryNameAr).toBeTruthy();
      expect(rule.currency).toBeTruthy();

      if (rule.hasVat && rule.vatStandardRate) {
        expect(rule.vatStandardRate.value).toBeGreaterThan(0);
        expect(rule.vatStandardRate.sourceUrl).toMatch(/^https?:\/\//);
        expect(rule.vatStandardRate.checkedAt).toBeTruthy();
      }

      if (rule.fuelPrices) {
        expect(rule.fuelPrices.value.octane91).toBeGreaterThan(0);
        expect(rule.fuelPrices.value.octane95).toBeGreaterThan(0);
        expect(rule.fuelPrices.value.diesel).toBeGreaterThan(0);
        expect(rule.fuelPrices.sourceUrl).toMatch(/^https?:\/\//);
        expect(rule.fuelPrices.checkedAt).toBeTruthy();
      }

      if (rule.electricityTariff) {
        expect(rule.electricityTariff.value.residentialTiers.length).toBeGreaterThan(0);
        expect(rule.electricityTariff.sourceUrl).toMatch(/^https?:\/\//);
      }

      if (rule.endOfService) {
        expect(rule.endOfService.sourceUrl).toMatch(/^https?:\/\//);
        expect(rule.endOfService.value.articles).toBeTruthy();
      }
    }
  });

  it('COUNTRY_VAT_RATES in tax.ts must match ALL_COUNTRY_LEGAL_RULES exactly', () => {
    for (const [code, rule] of Object.entries(ALL_COUNTRY_LEGAL_RULES)) {
      const taxEntry = COUNTRY_VAT_RATES[code];
      expect(taxEntry).toBeDefined();
      if (rule.hasVat && rule.vatStandardRate) {
        expect(taxEntry.rate).toBe(rule.vatStandardRate.value);
      } else {
        expect(taxEntry.rate).toBe(0);
      }
      expect(taxEntry.currency).toBe(rule.currency);
    }
  });

  it('VERIFIED_COUNTRY_FUEL_PRICES in cars.ts must match fuel prices in rules exactly', () => {
    for (const [code, rule] of Object.entries(ALL_COUNTRY_LEGAL_RULES)) {
      if (rule.fuelPrices) {
        const fuelEntry = VERIFIED_COUNTRY_FUEL_PRICES[code];
        expect(fuelEntry).toBeDefined();
        expect(fuelEntry.octane91).toBe(rule.fuelPrices.value.octane91);
        expect(fuelEntry.octane95).toBe(rule.fuelPrices.value.octane95);
        expect(fuelEntry.diesel).toBe(rule.fuelPrices.value.diesel);
        expect(fuelEntry.currency).toBe(rule.currency);
      }
    }
  });

  it('Zakat rules must be verified with gold nisab of 85 grams', () => {
    expect(ZAKAT_RULES.nisabGoldGrams).toBe(85);
    expect(ZAKAT_RULES.lunarRatePercent).toBe(2.5);
    expect(ZAKAT_RULES.verified).toBe(true);
  });

  it('no calculator implementation file should hardcode fuel rates or country VAT tables directly', () => {
    // Check that tax.ts and cars.ts import ALL_COUNTRY_LEGAL_RULES rather than hardcoding tables
    const taxContent = fs.readFileSync(path.join(process.cwd(), 'src/lib/calculators/tax.ts'), 'utf8');
    const carsContent = fs.readFileSync(path.join(process.cwd(), 'src/lib/calculators/cars.ts'), 'utf8');

    expect(taxContent).toContain("import { ALL_COUNTRY_LEGAL_RULES } from '@/data/rules'");
    expect(carsContent).toContain("import { ALL_COUNTRY_LEGAL_RULES } from '@/data/rules'");
  });
});
