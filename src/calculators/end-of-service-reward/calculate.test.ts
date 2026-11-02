import { describe, it, expect } from 'vitest';
import { calculateEndOfService } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';
import { COUNTRY_DATA_AE } from '../../data/countries/ae';
import { COUNTRY_DATA_KW } from '../../data/countries/kw';

describe('End of Service Reward Engine', () => {
  it('calculates Saudi EOS for termination correctly (5 yrs half month, 1 yr full month)', () => {
    // 6 years at 10,000 salary: (5 * 0.5 * 10000) + (1 * 1.0 * 10000) = 25,000 + 10,000 = 35,000
    const result = calculateEndOfService({ lastSalary: 10000, serviceYears: 6, separationReason: 'termination' }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBe(35000);
  });

  it('calculates Saudi EOS for resignation (5 to 10 years gets 2/3 award)', () => {
    // Base 35,000 * 2/3 = 23,333.33
    const result = calculateEndOfService({ lastSalary: 10000, serviceYears: 6, separationReason: 'resignation' }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBeCloseTo(23333.33, 1);
    expect(result.warnings).toBeDefined();
  });

  it('calculates UAE EOS per 2021 labor law (21 days first 5 yrs, 30 days thereafter, no resignation cut)', () => {
    const result = calculateEndOfService({ lastSalary: 10000, serviceYears: 5, separationReason: 'resignation' }, COUNTRY_DATA_AE);
    // 5 * (21/30) * 10000 = 35,000
    expect(result.primary.value).toBeCloseTo(35000, 0);
  });
});
