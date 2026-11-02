import { describe, it, expect } from 'vitest';
import { calculateCarFinance } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';
import { COUNTRY_DATA_AE } from '../../data/countries/ae';

describe('Car Finance Calculator Engine', () => {
  it('calculates car finance with down payment and balloon payment accurately', () => {
    const result = calculateCarFinance({
      carPrice: 100000,
      downPaymentPercent: 10,
      annualInterestRate: 5,
      financeTermYears: 5,
      balloonPaymentPercent: 20,
    }, COUNTRY_DATA_SA);

    expect(result.primary.value).toBeGreaterThan(1300);
    expect(result.primary.value).toBeLessThan(1700);
    expect(result.secondary?.[0].value).toBeGreaterThan(100000);
  });

  it('handles zero balloon payment cleanly', () => {
    const result = calculateCarFinance({
      carPrice: 100000,
      downPaymentPercent: 0,
      annualInterestRate: 5,
      financeTermYears: 5,
      balloonPaymentPercent: 0,
    }, COUNTRY_DATA_SA);

    expect(result.primary.value).toBeCloseTo(1887.12, 1);
  });

  it('triggers DBR warning when monthly installment exceeds salary cap in UAE', () => {
    // 200k car financed at 5% over 5 years (~3774 AED/mo) with salary 5000 AED (DBR > 75%, exceeding UAE 50% cap)
    const result = calculateCarFinance({
      carPrice: 200000,
      downPaymentPercent: 0,
      annualInterestRate: 5,
      financeTermYears: 5,
      monthlySalary: 5000,
    }, COUNTRY_DATA_AE);

    expect(result.warnings).toBeDefined();
    expect(result.warnings?.[0]).toContain('سقف الاستقطاع');
  });

  it('triggers tenor warning when financing duration exceeds 5 years', () => {
    const result = calculateCarFinance({
      carPrice: 100000,
      annualInterestRate: 5,
      financeTermYears: 7,
    }, COUNTRY_DATA_SA);

    expect(result.warnings).toBeDefined();
    expect(result.warnings?.[0]).toContain('مدة التمويل');
  });
});
