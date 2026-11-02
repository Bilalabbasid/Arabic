import { describe, it, expect } from 'vitest';
import { calculateLoan } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';
import { COUNTRY_DATA_AE } from '../../data/countries/ae';

describe('Loan Calculator Engine', () => {
  it('calculates reducing loan installment accurately', () => {
    // 100,000 at 5% for 5 years reducing: monthly ~1887.12
    const result = calculateLoan({ loanAmount: 100000, annualInterestRate: 5, loanTermYears: 5, interestType: 'reducing' }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBeCloseTo(1887.12, 1);
    expect(result.secondary?.[0].value).toBeCloseTo(113227.4, 0);
  });

  it('calculates flat interest accurately', () => {
    // 100,000 at 5% flat for 5 years: total interest = 25,000, monthly = 125,000 / 60 = 2083.33
    const result = calculateLoan({ loanAmount: 100000, annualInterestRate: 5, loanTermYears: 5, interestType: 'flat' }, COUNTRY_DATA_AE);
    expect(result.primary.value).toBeCloseTo(2083.33, 1);
    expect(result.secondary?.[1].value).toBe(25000);
  });

  it('triggers DBR limit warning when installment exceeds country cap', () => {
    // 100k loan installment ~1887; with 3000 salary DBR is ~62.9% which exceeds SA 33.33% cap
    const result = calculateLoan({ loanAmount: 100000, annualInterestRate: 5, loanTermYears: 5, monthlySalary: 3000 }, COUNTRY_DATA_SA);
    expect(result.warnings).toBeDefined();
    expect(result.warnings?.[0]).toContain('سقف الاستقطاع');
  });
});
