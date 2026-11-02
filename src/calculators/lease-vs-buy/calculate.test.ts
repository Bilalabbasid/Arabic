import { describe, it, expect } from 'vitest';
import { calculateLeaseVsBuy } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';

describe('Lease vs Buy Calculator Engine', () => {
  it('correctly compares buying vs leasing cash outflows', () => {
    const result = calculateLeaseVsBuy({
      carPrice: 100000,
      downPayment: 10000,
      monthlyLeasePayment: 2000,
      expectedResaleValueAfter5Years: 45000,
    }, COUNTRY_DATA_SA);

    expect(result.primary.value).toBeGreaterThan(0);
    expect(result.secondary?.[0].value).toBeDefined();
    expect(result.secondary?.[1].value).toBe(120000);
  });

  it('favors buying when resale value is high', () => {
    const result = calculateLeaseVsBuy({
      carPrice: 100000,
      downPayment: 10000,
      monthlyLeasePayment: 2500,
      expectedResaleValueAfter5Years: 60000,
    }, COUNTRY_DATA_SA);

    expect(result.primary.label).toContain('شراء');
  });

  it('favors leasing when monthly lease is heavily subsidized', () => {
    const result = calculateLeaseVsBuy({
      carPrice: 150000,
      downPayment: 20000,
      monthlyLeasePayment: 1000,
      expectedResaleValueAfter5Years: 40000,
    }, COUNTRY_DATA_SA);

    expect(result.primary.label).toContain('تأجير');
  });
});
