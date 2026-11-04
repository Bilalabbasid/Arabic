import { describe, it, expect } from 'vitest';
import { calculateCarImportCustoms } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';
import { COUNTRY_DATA_DZ } from '../../data/countries/dz';
import { COUNTRY_DATA_EG } from '../../data/countries/eg';

describe('Car Import Customs Engine', () => {
  it('calculates Saudi import customs accurately (5% duty + 15% VAT on CIF + duty)', () => {
    const result = calculateCarImportCustoms({ carValueFob: 80000, shippingAndInsurance: 10000, carAgeYears: 2 }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBe(18675);
    expect(result.secondary?.[1].value).toBe(4500);
  });

  it('triggers legal warning if car age exceeds national limit in Algeria (3 years max)', () => {
    const result = calculateCarImportCustoms({ carValueFob: 100000, carAgeYears: 5 }, COUNTRY_DATA_DZ);
    expect(result.warnings).toBeDefined();
    expect(result.warnings?.[0]).toContain('يتجاوز الحد الأقصى');
  });

  it('applies the Egyptian chain for a 1600cc non-EU car (40% duty, 1% schedule, 14% VAT, 5% development)', () => {
    const r = calculateCarImportCustoms({ carValueFob: 200000, shippingAndInsurance: 20000, carAgeYears: 0, engineCc: 1600 }, COUNTRY_DATA_EG);
    // CIF 220,000 -> duty 88,000 -> schedule 3,080 -> VAT 43,551.20 -> development 17,731.56
    expect(r.secondary?.[1].value).toBe(88000);
    expect(r.primary.value).toBeCloseTo(152362.76, 2);
    expect(r.warnings).toBeUndefined();
  });

  it('uses the 3% development fee below 1600cc', () => {
    const r = calculateCarImportCustoms({ carValueFob: 200000, shippingAndInsurance: 20000, engineCc: 1500 }, COUNTRY_DATA_EG);
    expect(r.primary.value).toBeCloseTo(145270.14, 2);
  });

  it('applies 135% duty, 15% schedule and 8.5% development for a 2000cc car', () => {
    const r = calculateCarImportCustoms({ carValueFob: 200000, shippingAndInsurance: 20000, engineCc: 2000 }, COUNTRY_DATA_EG);
    // duty 297,000 -> schedule 77,550 -> VAT 83,237 -> development 57,611.895
    expect(r.secondary?.[1].value).toBe(297000);
    expect(r.primary.value).toBeCloseTo(515398.9, 1);
  });

  it('applies 30% schedule tax above 2000cc', () => {
    const r = calculateCarImportCustoms({ carValueFob: 100000, engineCc: 2500 }, COUNTRY_DATA_EG);
    // duty 135,000 -> schedule 70,500 -> VAT 42,770 -> development 29,602.95
    expect(r.primary.value).toBeCloseTo(277872.95, 2);
  });

  it('exempts EU-origin cars from customs duty only', () => {
    const r = calculateCarImportCustoms({ carValueFob: 200000, shippingAndInsurance: 20000, engineCc: 1600, originPreferential: 'eu' }, COUNTRY_DATA_EG);
    // duty 0 -> schedule 2,200 -> VAT 31,108 -> development 12,665.40
    expect(r.secondary?.[1].value).toBe(0);
    expect(r.primary.value).toBeCloseTo(45973.4, 2);
  });

  it('warns that used passenger cars cannot be imported into Egypt', () => {
    const r = calculateCarImportCustoms({ carValueFob: 200000, carAgeYears: 2, engineCc: 1600 }, COUNTRY_DATA_EG);
    expect(r.warnings?.[0]).toContain('المستعملة');
  });

  it('keeps the flat GCC model for Saudi Arabia regardless of engine size', () => {
    const r = calculateCarImportCustoms({ carValueFob: 80000, shippingAndInsurance: 10000, carAgeYears: 2, engineCc: 3500 }, COUNTRY_DATA_SA);
    expect(r.primary.value).toBe(18675);
  });
});
