import { describe, it, expect } from 'vitest';
import { calculateCarFuelCost } from '@/lib/calculators/cars';
import { calculateVat, calculateZakatWealth } from '@/lib/calculators/tax';
import { calculateLoan } from '@/lib/calculators/finance';
import { calculateEndOfService } from '@/lib/calculators/salary';
import { calculateElectricityBill } from '@/lib/calculators/electricity';
import { calculateBmi } from '@/lib/calculators/health';
import { calculatePercentage } from '@/lib/calculators/math';
import { COUNTRIES, getCountryByCode } from '@/data/countries';
import { CATEGORIES } from '@/data/categories';
import { formatNumber, formatCurrency, formatPercent } from '@/lib/formatters';

describe('Country Architecture & Registry', () => {
  it('should register exactly 22 Arabic countries and territories', () => {
    expect(COUNTRIES.length).toBe(22);
  });

  it('should find key countries by code case-insensitively', () => {
    const sa = getCountryByCode('sa');
    const eg = getCountryByCode('EG');
    const ae = getCountryByCode('Ae');

    expect(sa?.nameAr).toBe('المملكة العربية السعودية');
    expect(sa?.currencyCode).toBe('SAR');
    expect(eg?.currencyCode).toBe('EGP');
    expect(ae?.currencyCode).toBe('AED');
  });
});

describe('Category Architecture', () => {
  it('should contain all 18 specified categories', () => {
    expect(CATEGORIES.length).toBe(18);
    const categorySlugs = CATEGORIES.map((c) => c.slug);
    expect(categorySlugs).toContain('cars-transportation');
    expect(categorySlugs).toContain('taxation');
    expect(categorySlugs).toContain('loans-installments');
    expect(categorySlugs).toContain('salary-employment');
    expect(categorySlugs).toContain('electricity-energy');
    expect(categorySlugs).toContain('mathematics-percentages');
    expect(categorySlugs).toContain('health-fitness');
    expect(categorySlugs).toContain('dates-time');
  });
});

describe('Arabic Formatters', () => {
  it('should format numbers with proper decimals and thousand separators', () => {
    expect(formatNumber(12500)).toBe('12,500');
    expect(formatNumber(12500.5, { decimals: 2 })).toBe('12,500.50');
  });

  it('should format currency with proper Arabic symbols', () => {
    expect(formatCurrency(1000, 'SAR')).toContain('ر.س');
    expect(formatCurrency(1000, 'AED')).toContain('د.إ');
    expect(formatCurrency(1000, 'EGP')).toContain('ج.م');
  });

  it('should format percent cleanly', () => {
    expect(formatPercent(15)).toBe('%15');
    expect(formatPercent(4.5, 1)).toBe('%4.5');
  });
});

describe('Calculation Engine: Car Fuel Cost', () => {
  it('should calculate fuel consumption and cost correctly for Saudi Arabia', () => {
    const res = calculateCarFuelCost({
      distanceKm: 200,
      fuelConsumption: 8.0, // 8 liters per 100 km => 16 liters
      fuelType: 'octane91',
      country: 'SA',
    });

    expect(res.error).toBeUndefined();
    // 16 liters * 2.18 SAR = 34.88 SAR
    expect(res.primary.value).toBeCloseTo(34.88, 1);
    expect(res.secondary?.[0].value).toBe(16);
  });

  it('should reject invalid zero distance with explicit error', () => {
    const res = calculateCarFuelCost({ distanceKm: 0, fuelConsumption: 8.0 });
    expect(res.error).toBeDefined();
  });
});

describe('Calculation Engine: VAT Calculator', () => {
  it('should calculate addition of 15% VAT in Saudi Arabia', () => {
    const res = calculateVat({
      amount: 1000,
      calculationType: 'add',
      country: 'SA',
    });

    expect(res.primary.value).toBe(150); // tax
    expect(res.secondary?.[0].value).toBe(1150); // gross
  });

  it('should extract 15% VAT from gross amount in Saudi Arabia', () => {
    const res = calculateVat({
      amount: 1150,
      calculationType: 'extract',
      country: 'SA',
    });

    expect(res.secondary?.[1].value).toBeCloseTo(1000, 2); // net
    expect(res.primary.value).toBeCloseTo(150, 2); // tax
  });

  it('should calculate 5% VAT in UAE', () => {
    const res = calculateVat({
      amount: 1000,
      calculationType: 'add',
      country: 'AE',
    });

    expect(res.primary.value).toBe(50);
    expect(res.secondary?.[0].value).toBe(1050);
  });
});

describe('Calculation Engine: Loan Calculator', () => {
  it('should calculate standard reducing annuity installment', () => {
    const res = calculateLoan({
      loanAmount: 100000,
      annualRate: 5.0,
      termYears: 5,
      rateType: 'reducing',
    });

    expect(res.error).toBeUndefined();
    // 100,000 at 5% for 60 months => ~1,887.12 SAR per month
    expect(Number(res.primary.value)).toBeGreaterThan(1880);
    expect(Number(res.primary.value)).toBeLessThan(1895);
    expect(res.breakdown?.rows.length).toBe(12);
  });
});

describe('Calculation Engine: End of Service Gratuity', () => {
  it('should calculate Saudi Labor Law Art 84 (employer termination) for 6 years service', () => {
    const res = calculateEndOfService({
      salary: 10000,
      years: 6,
      terminationReason: 'employer_end',
      country: 'SA',
    });

    // 5 years * (10000 / 2) = 25,000 + 1 year * 10000 = 10,000 => 35,000 SAR
    expect(res.primary.value).toBe(35000);
  });

  it('should calculate Saudi Labor Law Art 85 resignation reduction for 6 years service (2/3)', () => {
    const res = calculateEndOfService({
      salary: 10000,
      years: 6,
      terminationReason: 'resignation',
      country: 'SA',
    });

    // 35,000 * 2/3 = 23,333.33 SAR
    expect(res.primary.value).toBeCloseTo(23333.33, 1);
  });

  it('should give 0 gratuity on resignation under 2 years service in Saudi Arabia', () => {
    const res = calculateEndOfService({
      salary: 10000,
      years: 1,
      terminationReason: 'resignation',
      country: 'SA',
    });

    expect(res.primary.value).toBe(0);
  });
});

describe('Calculation Engine: Electricity Bill', () => {
  it('should calculate Saudi residential bill within Tier 1 (18 halalas)', () => {
    const res = calculateElectricityBill({
      kwh: 5000,
      tariffCategory: 'residential',
      meterBreakerAmps: 60,
      country: 'SA',
    });

    // Energy: 5000 * 0.18 = 900 SAR + 15 SAR meter = 915 SAR + 15% VAT (137.25) = 1,052.25 SAR
    expect(res.primary.value).toBeCloseTo(1052.25, 2);
  });

  it('should calculate across Tier 1 and Tier 2 (30 halalas for units > 6000)', () => {
    const res = calculateElectricityBill({
      kwh: 7000,
      tariffCategory: 'residential',
      meterBreakerAmps: 60,
      country: 'SA',
    });

    // Tier 1: 6000 * 0.18 = 1080 SAR
    // Tier 2: 1000 * 0.30 = 300 SAR
    // Energy: 1380 + 15 meter = 1395 + 15% VAT (209.25) = 1,604.25 SAR
    expect(res.primary.value).toBeCloseTo(1604.25, 2);
  });
});

describe('Calculation Engine: BMI', () => {
  it('should classify normal weight correctly', () => {
    const res = calculateBmi({ weightKg: 70, heightCm: 175 });
    expect(res.primary.badge).toBe('وزن طبيعي وصحي');
    expect(Number(res.primary.value)).toBeCloseTo(22.86, 1);
  });

  it('should classify overweight correctly', () => {
    const res = calculateBmi({ weightKg: 85, heightCm: 170 });
    expect(res.primary.badge).toBe('زيادة في الوزن');
  });
});

describe('Calculation Engine: Percentage', () => {
  it('should compute percent of number', () => {
    const res = calculatePercentage({ mode: 'percent_of', valueA: 15, valueB: 500 });
    expect(res.primary.value).toBe(75);
  });

  it('should compute is what percent', () => {
    const res = calculatePercentage({ mode: 'is_what_percent', valueA: 50, valueB: 200 });
    expect(res.primary.value).toBe(25);
  });
});
