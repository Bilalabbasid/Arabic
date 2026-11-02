import { describe, it, expect } from 'vitest';
import { calculateNetSalary } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';
import { COUNTRY_DATA_EG } from '../../data/countries/eg';
import { COUNTRY_DATA_KW } from '../../data/countries/kw';

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
});
