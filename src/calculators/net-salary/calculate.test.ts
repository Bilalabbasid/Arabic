import { describe, it, expect } from 'vitest';
import { calculateNetSalary } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';
import { COUNTRY_DATA_EG } from '../../data/countries/eg';
import { COUNTRY_DATA_KW } from '../../data/countries/kw';
import { COUNTRY_DATA_AE } from '../../data/countries/ae';

describe('Net Salary Calculator Engine', () => {
  it('calculates Saudi national net salary correctly (9.75% GOSI deduction, 0 income tax)', () => {
    const result = calculateNetSalary({ grossSalary: 10000, isNational: true }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBe(9025);
    expect(result.secondary?.[0].value).toBe(975);
  });

  it('calculates Egyptian net salary correctly with social insurance & income tax brackets', () => {
    const result = calculateNetSalary({ grossSalary: 15000, isNational: true }, COUNTRY_DATA_EG);
    expect(result.primary.value).toBeLessThan(15000);
    expect(result.primary.value).toBeGreaterThan(10000);
  });

  it('calculates Kuwait national salary with PIFSS rate (10.5%)', () => {
    const result = calculateNetSalary({ grossSalary: 1000, isNational: true }, COUNTRY_DATA_KW);
    // 1000 - 105 = 895 KWD
    expect(result.primary.value).toBe(895);
  });

  it('treats the string "false" from the select input as an expatriate (no national pension)', () => {
    const result = calculateNetSalary({ grossSalary: 10000, isNational: 'false' }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBe(10000);
    // employer pays 2% occupational hazards only
    expect(result.secondary?.[1].value).toBe(10200);
  });

  it('applies the new Saudi GOSI rates (10.75%) for first-time registrants after July 2024', () => {
    const result = calculateNetSalary({ grossSalary: 10000, isNational: 'true', insuranceSystem: 'new' }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBeCloseTo(8925, 2);
  });

  it('applies UAE Decree-Law 57/2023: 11% employee, 12.5% employer under AED 20,000, 15% above', () => {
    const low = calculateNetSalary({ grossSalary: 15000, isNational: 'true', insuranceSystem: 'new' }, COUNTRY_DATA_AE);
    expect(low.primary.value).toBeCloseTo(13350, 2);
    expect(low.secondary?.[1].value).toBeCloseTo(15000 + 1875, 2);
    const high = calculateNetSalary({ grossSalary: 25000, isNational: 'true', insuranceSystem: 'new' }, COUNTRY_DATA_AE);
    expect(high.secondary?.[1].value).toBeCloseTo(25000 + 3750, 2);
    const legacy = calculateNetSalary({ grossSalary: 15000, isNational: 'true' }, COUNTRY_DATA_AE);
    expect(legacy.primary.value).toBeCloseTo(14250, 2);
  });

  it('computes Egyptian salary tax with the 20,000 exemption and 2026 insurable cap (15,000/month)', () => {
    // SI 11% of 15,000 = 1,650; taxable = (13,350 x 12) - 20,000 = 140,200
    // tax = 1,500 + 2,250 + 14,040 = 17,790 / yr = 1,482.50 / month
    const result = calculateNetSalary({ grossSalary: 15000, isNational: 'true' }, COUNTRY_DATA_EG);
    expect(result.primary.value).toBeCloseTo(11867.5, 2);
  });

  it('removes the 0% band for Egyptian taxable income above 600,000 (Law 7/2024)', () => {
    // SI capped at 16,700 x 11% = 1,837; taxable = 58,163 x 12 - 20,000 = 677,956 -> 677,950
    // tax = 5,500 + 2,250 + 26,000 + 45,000 + 69,487.5 = 148,237.5 / yr
    const result = calculateNetSalary({ grossSalary: 60000, isNational: 'true' }, COUNTRY_DATA_EG);
    expect(result.primary.value).toBeCloseTo(60000 - 1837 - 148237.5 / 12, 2);
  });
});
