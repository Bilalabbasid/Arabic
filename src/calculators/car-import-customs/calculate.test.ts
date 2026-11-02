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

  it('calculates Egyptian import customs with 40% duty rate', () => {
    const result = calculateCarImportCustoms({ carValueFob: 200000, shippingAndInsurance: 20000, carAgeYears: 1 }, COUNTRY_DATA_EG);
    // CIF = 220,000, 40% duty = 88,000
    expect(result.secondary?.[1].value).toBe(88000);
  });
});
