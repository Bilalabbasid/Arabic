import { describe, it, expect } from 'vitest';
import { calculateCarAffordability } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';
import { COUNTRY_DATA_AE } from '../../data/countries/ae';

describe('Car Affordability Calculator Engine', () => {
  it('calculates affordable car price accurately under Saudi DBR cap (33.33%)', () => {
    const result = calculateCarAffordability({
      monthlySalary: 12000,
      existingDebtsMonthly: 1500,
      downPaymentAvailable: 20000,
      annualInterestRate: 5,
      financeTermYears: 5,
    }, COUNTRY_DATA_SA);

    expect(result.secondary?.[1].value).toBeCloseTo(2500, 0);
    expect(result.primary.value).toBeGreaterThan(140000);
  });

  it('triggers warning when existing debts consume full DBR allowance', () => {
    const result = calculateCarAffordability({
      monthlySalary: 10000,
      existingDebtsMonthly: 3500,
    }, COUNTRY_DATA_SA);

    expect(result.warnings).toBeDefined();
    expect(result.primary.value).toBe(0);
  });

  it('calculates affordable car price under UAE 50% cap', () => {
    const result = calculateCarAffordability({
      monthlySalary: 20000,
      existingDebtsMonthly: 2000,
      downPaymentAvailable: 30000,
      annualInterestRate: 4.5,
      financeTermYears: 5,
    }, COUNTRY_DATA_AE);

    expect(result.secondary?.[1].value).toBe(8000); // 50% of 20k = 10k - 2k debts = 8k
    expect(result.primary.value).toBeGreaterThan(400000);
  });
});
