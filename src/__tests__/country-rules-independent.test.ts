import { describe, it, expect } from 'vitest';
import { resolveApplicableRule } from '@/lib/rules/rule-resolver';
import { calculateElectricityBill } from '@/lib/calculators/electricity';
import { calculateEndOfService } from '@/lib/calculators/salary';
import { calculateVat } from '@/lib/calculators/tax';
import { calculateCarFuelCost } from '@/lib/calculators/cars';

describe('Phase F: Country Rule Resolution Integrity', () => {
  it('correctly resolves Saudi Arabia electricity residential rule (SERA)', () => {
    const res = resolveApplicableRule<any>({
      calculatorId: 'electricity-bill',
      countryCode: 'SA',
      customerCategory: 'residential',
    });

    expect(res.isAvailable).toBe(true);
    expect(res.rule?.jurisdiction).toBe('SERA');
    expect(res.rule?.parameters.slabs.residential[0].rate).toBe(0.18);
    expect(res.rule?.parameters.slabs.residential[1].rate).toBe(0.30);
    expect(res.rule?.parameters.vatRate).toBe(15);
  });

  it('correctly resolves Dubai (DEWA) electricity rule vs Abu Dhabi (ADDC)', () => {
    const dewa = resolveApplicableRule<any>({
      calculatorId: 'electricity-bill',
      countryCode: 'AE',
      provider: 'DEWA',
    });
    expect(dewa.isAvailable).toBe(true);
    expect(dewa.rule?.jurisdiction).toBe('DEWA');
    expect(dewa.rule?.parameters.slabs.length).toBe(4);

    const addc = resolveApplicableRule<any>({
      calculatorId: 'electricity-bill',
      countryCode: 'AE',
      provider: 'ADDC',
      customerCategory: 'residential_expatriate',
    });
    expect(addc.isAvailable).toBe(true);
    expect(addc.rule?.jurisdiction).toBe('ADDC');
    expect(addc.rule?.parameters.slabs[0].rate).toBe(0.268);
  });

  it('strictly rejects cross-country rule contamination (Saudi rules never used for UAE)', () => {
    const query = {
      calculatorId: 'electricity-bill',
      countryCode: 'AE',
      jurisdiction: 'SERA', // SERA does not exist in UAE
    };
    const res = resolveApplicableRule(query);
    expect(res.isAvailable).toBe(false);
    expect(res.unavailableReason).toContain('غير مسجلة لدولة AE');
  });

  it('correctly handles historical rule version matching by effective date', () => {
    // Saudi VAT was 5% on 2019-05-01
    const historical = resolveApplicableRule<any>({
      calculatorId: 'vat-calculator',
      countryCode: 'SA',
      effectiveDate: '2019-05-01',
    });

    expect(historical.isAvailable).toBe(true);
    expect(historical.rule?.ruleId).toBe('sa-tax-vat-5-historical');
    expect(historical.rule?.parameters.rate).toBe(5);

    // Saudi VAT is 15% on 2026-10-01
    const current = resolveApplicableRule<any>({
      calculatorId: 'vat-calculator',
      countryCode: 'SA',
      effectiveDate: '2026-10-01',
    });

    expect(current.isAvailable).toBe(true);
    expect(current.rule?.ruleId).toBe('sa-tax-vat-15-current');
    expect(current.rule?.parameters.rate).toBe(15);
  });

  it('gracefully reports unavailable country without throwing', () => {
    const res = resolveApplicableRule({
      calculatorId: 'end-of-service-reward',
      countryCode: 'XX', // Non-existent country
    });
    expect(res.isAvailable).toBe(false);
    expect(res.unavailableReason).toContain('لا توجد لوائح نظامية معتمدة');
  });
});

describe('Phase G: Electricity Independent Benchmark Tests', () => {
  it('benchmark: Saudi residential 5000 kWh with 60A meter', () => {
    // 5000 kWh * 0.18 SAR = 900.00 SAR
    // Meter fee 60A = 15.00 SAR
    // Subtotal = 915.00 SAR
    // VAT 15% = 137.25 SAR
    // Total = 1,052.25 SAR
    const result = calculateElectricityBill({
      kwh: 5000,
      tariffCategory: 'residential',
      meterBreakerAmps: 60,
      country: 'SA',
    });

    expect(result.primary.value).toBe(1052.25);
    expect(result.secondary?.[0].value).toBe(900.0);
    expect(result.secondary?.[1].value).toBe(15.0);
    expect(result.secondary?.[2].value).toBe(137.25);
  });

  it('benchmark: Saudi residential 7000 kWh crossing into Tier 2 (30 halalas)', () => {
    // Tier 1: 6000 * 0.18 = 1080.00 SAR
    // Tier 2: 1000 * 0.30 = 300.00 SAR
    // Energy total = 1380.00 SAR
    // Meter fee 60A = 15.00 SAR
    // Subtotal = 1395.00 SAR
    // VAT 15% = 209.25 SAR
    // Total = 1,604.25 SAR
    const result = calculateElectricityBill({
      kwh: 7000,
      tariffCategory: 'residential',
      meterBreakerAmps: 60,
      country: 'SA',
    });

    expect(result.primary.value).toBe(1604.25);
    expect(result.secondary?.[0].value).toBe(1380.0);
  });

  it('benchmark: Dubai DEWA residential 3000 kWh with fuel surcharge & 5% VAT', () => {
    // Slab 1: 2000 * 0.23 = 460.00 AED
    // Slab 2: 1000 * 0.28 = 280.00 AED
    // Energy cost = 740.00 AED
    // Fuel surcharge: 3000 * 0.05 = 150.00 AED
    // Subtotal = 890.00 AED
    // VAT 5% = 44.50 AED
    // Total = 934.50 AED
    const result = calculateElectricityBill({
      kwh: 3000,
      tariffCategory: 'residential',
      country: 'AE',
      provider: 'DEWA',
    });

    expect(result.primary.value).toBe(934.5);
    expect(result.secondary?.[0].value).toBe(740.0);
  });

  it('benchmark: Egypt 1200 kWh exceeding 1000 kWh threshold (Non-subsidized full recalculation)', () => {
    // 1200 kWh * 2.23 EGP = 2,676.00 EGP
    // Service fee slab 7 = 40.00 EGP
    // Total = 2,716.00 EGP
    const result = calculateElectricityBill({
      kwh: 1200,
      tariffCategory: 'residential',
      country: 'EG',
    });

    expect(result.primary.value).toBe(2716.0);
    expect(result.secondary?.[0].value).toBe(2676.0);
  });
});

describe('Phase H: Employment & End of Service Independent Tests', () => {
  it('benchmark: Saudi Labor Law Art 84 (employer termination) for 7 years at 12,000 SAR', () => {
    // 5 years * (12000 / 2) = 30,000 SAR
    // 2 years * 12000 = 24,000 SAR
    // Total = 54,000 SAR
    const res = calculateEndOfService({
      salary: 12000,
      years: 7,
      terminationReason: 'employer_end',
      country: 'SA',
    });

    expect(res.primary.value).toBe(54000);
    expect(res.secondary?.[2].value).toBe(100); // 100% entitlement
  });

  it('benchmark: Saudi Labor Law Art 85 resignation reduction tiers', () => {
    // Under 2 years: 0%
    const res1 = calculateEndOfService({ salary: 10000, years: 1.5, terminationReason: 'resignation', country: 'SA' });
    expect(res1.primary.value).toBe(0);

    // 2-5 years: 1/3
    // 3 years * 5000 = 15,000 full. 15,000 * (1/3) = 5,000 SAR
    const res2 = calculateEndOfService({ salary: 10000, years: 3, terminationReason: 'resignation', country: 'SA' });
    expect(res2.primary.value).toBeCloseTo(5000, 2);

    // 5-10 years: 2/3
    // 6 years: (5 * 5000 + 1 * 10000) = 35,000 full. 35,000 * (2/3) = 23,333.33 SAR
    const res3 = calculateEndOfService({ salary: 10000, years: 6, terminationReason: 'resignation', country: 'SA' });
    expect(res3.primary.value).toBeCloseTo(23333.33, 2);

    // 10+ years: 100%
    // 10 years: (5 * 5000 + 5 * 10000) = 75,000 full. 100% = 75,000 SAR
    const res4 = calculateEndOfService({ salary: 10000, years: 10, terminationReason: 'resignation', country: 'SA' });
    expect(res4.primary.value).toBe(75000);
  });

  it('benchmark: UAE Federal Decree Law 33/2021 (Art 51) 6 years at 15,000 AED basic', () => {
    // Daily wage = 15000 / 30 = 500 AED
    // First 5 years: 5 * (21 * 500) = 52,500 AED
    // 6th year: 1 * (30 * 500) = 15,000 AED
    // Total = 67,500 AED
    const res = calculateEndOfService({
      salary: 15000,
      years: 6,
      country: 'AE',
    });

    expect(res.primary.value).toBe(67500);
  });

  it('benchmark: UAE statutory cap (maximum 2 years basic salary)', () => {
    // At 20 years with 20,000 basic:
    // First 5 yrs = 5 * 21 * (20000/30) = 70,000 AED
    // Next 15 yrs = 15 * 30 * (20000/30) = 300,000 AED
    // Sum = 370,000 AED
    // Max cap = 20,000 * 24 months = 480,000 AED (not capped here)
    // Now test extreme tenure: 30 years with 20,000 basic:
    // 70,000 + 25 * 20,000 = 570,000 AED -> capped at 480,000 AED!
    const res = calculateEndOfService({
      salary: 20000,
      years: 30,
      country: 'AE',
    });

    expect(res.primary.value).toBe(480000);
  });
});

describe('Phase I: Vehicle & Fuel Distinctions', () => {
  it('distinguishes universal volume physics from country price', () => {
    // 500 km at 8.0 L/100km is always exactly 40.0 Liters anywhere in the world
    const saRun = calculateCarFuelCost({ distanceKm: 500, fuelConsumption: 8.0, country: 'SA' });
    const aeRun = calculateCarFuelCost({ distanceKm: 500, fuelConsumption: 8.0, country: 'AE' });

    expect(saRun.secondary?.[0].value).toBe(40.0);
    expect(aeRun.secondary?.[0].value).toBe(40.0);

    // But costs differ: SA (40 * 2.18 = 87.20 SAR) vs AE (40 * 2.75 = 110.00 AED)
    expect(saRun.primary.value).toBeCloseTo(87.2, 2);
    expect(aeRun.primary.value).toBeCloseTo(110.0, 2);
  });

  it('correctly badges manual price entries and uses user assumptions', () => {
    const customRun = calculateCarFuelCost({
      distanceKm: 100,
      fuelConsumption: 10.0, // 10 liters
      customPricePerLiter: 3.50, // User supplied
    });

    expect(customRun.primary.badge).toBe('سعر مدخل يدوياً');
    expect(customRun.primary.value).toBe(35.0);
  });
});

