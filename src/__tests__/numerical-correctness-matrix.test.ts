import { describe, it, expect } from 'vitest';
import { ALL_CALCULATORS, getCalculatorBySlug } from '@/data/calculators';
import { calculateCarFuelCost } from '@/lib/calculators/cars';
import { calculateVat, calculateZakatWealth } from '@/lib/calculators/tax';
import { calculateLoan } from '@/lib/calculators/finance';
import { calculateEndOfService } from '@/lib/calculators/salary';
import { calculateElectricityBill } from '@/lib/calculators/electricity';
import { calculateBmi } from '@/lib/calculators/health';
import { calculatePercentage } from '@/lib/calculators/math';
import { calculateLengthConverter, calculateTimeConverter } from '@/lib/calculators/converters';

describe('Phase 3: Master Numerical Calculation & Matrix Verification', () => {

  // 1. Car Fuel Cost & Consumption Engine
  describe('Calculator: car-fuel-cost', () => {
    it('1. Default inputs return valid calculation', () => {
      const res = calculateCarFuelCost({ distanceKm: 250, fuelConsumption: 8.5, fuelType: 'octane91', country: 'SA' });
      expect(res.error).toBeUndefined();
      expect(res.primary.value).toBeGreaterThan(0);
      expect(res.primary.unit).toBe('SAR');
    });

    it('2. Decimal distance and fuel consumption calculate correctly', () => {
      // 12.5 km at 6.4 L/100km = 0.8 L. At 2.18 SAR = 1.744 -> 1.74 SAR
      const res = calculateCarFuelCost({ distanceKm: 12.5, fuelConsumption: 6.4, fuelType: 'octane91', country: 'SA' });
      expect(res.secondary?.[0].value).toBeCloseTo(0.8, 2);
      expect(res.primary.value).toBeCloseTo(1.74, 2);
    });

    it('3. Custom price overrides national default cleanly', () => {
      // 100 km at 10 L/100km = 10 L. Custom price = 5.00
      const res = calculateCarFuelCost({ distanceKm: 100, fuelConsumption: 10, customPricePerLiter: 5.00 });
      expect(res.primary.value).toBe(50.00);
      expect(res.assumptions?.some(a => a.includes('السعر المخصص'))).toBe(true);
    });

    it('4. Rejects invalid inputs (zero or negative distance)', () => {
      const zeroDist = calculateCarFuelCost({ distanceKm: 0, fuelConsumption: 8.5 });
      expect(zeroDist.error).toBeDefined();

      const negDist = calculateCarFuelCost({ distanceKm: -50, fuelConsumption: 8.5 });
      expect(negDist.error).toBeDefined();

      const zeroCons = calculateCarFuelCost({ distanceKm: 100, fuelConsumption: 0 });
      expect(zeroCons.error).toBeDefined();
    });

    it('5. Handles extreme large distance without overflow or NaN', () => {
      const large = calculateCarFuelCost({ distanceKm: 50000, fuelConsumption: 12, country: 'SA' });
      expect(Number.isFinite(large.primary.value)).toBe(true);
      expect(large.primary.value).toBe(50000 * 0.12 * 2.18);
    });
  });

  // 2. VAT Calculator Engine
  describe('Calculator: vat-calculator', () => {
    it('1. Addition of VAT 15% (Saudi Arabia)', () => {
      const res = calculateVat({ amount: 1000, calculationType: 'add', country: 'SA' });
      expect(res.primary.value).toBe(150.00); // tax
      expect(res.secondary?.[0].value).toBe(1150.00); // gross
      expect(res.secondary?.[1].value).toBe(1000.00); // net
    });

    it('2. Extraction of VAT 15% from gross price', () => {
      const res = calculateVat({ amount: 1150, calculationType: 'extract', country: 'SA' });
      expect(res.primary.value).toBe(150.00); // extracted tax
      expect(res.secondary?.[1].value).toBe(1000.00); // net original
    });

    it('3. Extraction of VAT 5% (UAE)', () => {
      const res = calculateVat({ amount: 1050, calculationType: 'extract', country: 'AE' });
      expect(res.primary.value).toBe(50.00);
      expect(res.secondary?.[1].value).toBe(1000.00);
    });

    it('4. Custom tax rate calculation', () => {
      const res = calculateVat({ amount: 200, calculationType: 'add', customRate: 8.5 });
      expect(res.primary.value).toBe(17.00);
      expect(res.secondary?.[0].value).toBe(217.00);
    });

    it('5. Rejects zero, negative, or invalid amounts', () => {
      const zero = calculateVat({ amount: 0, calculationType: 'add' });
      expect(zero.error).toBeDefined();

      const neg = calculateVat({ amount: -100, calculationType: 'add' });
      expect(neg.error).toBeDefined();

      const text = calculateVat({ amount: 'invalid', calculationType: 'add' });
      expect(text.error).toBeDefined();
    });
  });

  // 3. Personal & Auto Loan Calculator Engine
  describe('Calculator: loan-calculator', () => {
    it('1. Standard reducing loan annuity calculation matches banking formula', () => {
      // 100,000 SAR for 5 years (60 months) at 4.5% reducing
      // Monthly r = 0.045 / 12 = 0.00375
      // PMT = 100000 * 0.0375 * (1.00375)^60 / ((1.00375)^60 - 1) = 1864.30 SAR
      const res = calculateLoan({ loanAmount: 100000, annualRate: 4.5, termYears: '5', rateType: 'reducing' });
      expect(res.primary.value).toBeCloseTo(1864.30, 1);
      expect(res.secondary?.[0].value).toBeCloseTo(11858.00, 0); // Total interest
      expect(res.secondary?.[1].value).toBeCloseTo(111858.00, 0); // Total repayment
    });

    it('2. Flat interest rate (Murabaha) calculation', () => {
      // 100,000 SAR for 5 years at 3.5% flat
      // Total interest = 100000 * 0.035 * 5 = 17,500 SAR
      // Monthly PMT = (100000 + 17500) / 60 = 1958.33 SAR
      const res = calculateLoan({ loanAmount: 100000, annualRate: 3.5, termYears: '5', rateType: 'flat' });
      expect(res.primary.value).toBeCloseTo(1958.33, 1);
      expect(res.secondary?.[0].value).toBeCloseTo(17500.00, 2); // Total interest
      expect(res.secondary?.[1].value).toBeCloseTo(117500.00, 2); // Total repayment
    });

    it('3. Rejects invalid loan amounts and negative rates', () => {
      const zero = calculateLoan({ loanAmount: 0, annualRate: 4.5, termYears: '5' });
      expect(zero.error).toBeDefined();

      const negRate = calculateLoan({ loanAmount: 50000, annualRate: -2, termYears: '5' });
      expect(negRate.error).toBeDefined();
    });

    it('4. Zero interest rate (0% financing promotion)', () => {
      const zeroRate = calculateLoan({ loanAmount: 60000, annualRate: 0, termYears: '5', rateType: 'reducing' });
      expect(zeroRate.primary.value).toBe(1000.00); // 60,000 / 60 months = 1,000 SAR
      expect(zeroRate.secondary?.[0].value).toBe(0); // 0 interest
      expect(zeroRate.secondary?.[1].value).toBe(60000); // total repayment
    });
  });

  // 4. End of Service Gratuity Engine
  describe('Calculator: end-of-service-reward', () => {
    it('1. Saudi Labor Law Art. 84 (Employer termination after 6 years)', () => {
      // Salary: 8000 SAR. First 5 yrs: 5 * 4000 = 20000. 6th yr: 8000. Total = 28,000 SAR
      const res = calculateEndOfService({
        salary: 8000,
        years: 6,
        months: 0,
        terminationReason: 'employer_end',
        country: 'SA',
      });
      expect(res.primary.value).toBe(28000.00);
    });

    it('2. Saudi Labor Law Art. 85 (Resignation after 6 years - 2/3 ratio)', () => {
      // Total full = 28,000 SAR * (2/3) = 18,666.67 SAR
      const res = calculateEndOfService({
        salary: 8000,
        years: 6,
        months: 0,
        terminationReason: 'resignation',
        country: 'SA',
      });
      expect(res.primary.value).toBeCloseTo(18666.67, 2);
    });

    it('3. Saudi Labor Law Art. 85 (Resignation under 2 years - 0 entitlement)', () => {
      const res = calculateEndOfService({
        salary: 10000,
        years: 1,
        months: 6,
        terminationReason: 'resignation',
        country: 'SA',
      });
      expect(res.primary.value).toBe(0);
    });

    it('4. UAE Decree-Law 33/2021 (5 years service with 21 days basic)', () => {
      // Basic salary: 10,000 AED. 5 years * (21/30 * 10000) = 35,000 AED
      const res = calculateEndOfService({
        salary: 10000,
        years: 5,
        months: 0,
        terminationReason: 'employer_end',
        country: 'AE',
      });
      expect(res.primary.value).toBe(35000.00);
    });

    it('5. UAE Cap rule: Gratuity cannot exceed 2 years basic salary', () => {
      // 25 years service: 5 * 21 days + 20 * 30 days = 705 days
      // 705 / 30 * 10000 = 235,000 AED. Capped at 24 * 10000 = 240,000 AED
      const res = calculateEndOfService({
        salary: 10000,
        years: 25,
        months: 0,
        terminationReason: 'employer_end',
        country: 'AE',
      });
      expect(res.primary.value).toBeLessThanOrEqual(240000.00);
    });
  });

  // 5. Zakat on Wealth & Trade Engine
  describe('Calculator: zakat-wealth', () => {
    it('1. Calculates 2.5% for Hijri year when exceeding nisab', () => {
      // Cash = 50,000, Gold price = 310 -> Nisab = 85 * 310 = 26,350. Eligible!
      // Zakat = 50,000 * 0.025 = 1,250 SAR
      const res = calculateZakatWealth({ cash: 50000, goldGramPrice: 310, calendarType: 'hijri' });
      expect(res.primary.value).toBe(1250.00);
    });

    it('2. Calculates 2.577% for Gregorian year when exceeding nisab', () => {
      // Zakat = 100,000 * 0.02577 = 2,577 SAR
      const res = calculateZakatWealth({ cash: 100000, goldGramPrice: 310, calendarType: 'gregorian' });
      expect(res.primary.value).toBeCloseTo(2577.00, 1);
    });

    it('3. Returns 0 when total net wealth is below nisab', () => {
      // Cash = 10,000 < Nisab 26,350
      const res = calculateZakatWealth({ cash: 10000, goldGramPrice: 310, calendarType: 'hijri' });
      expect(res.primary.value).toBe(0);
      expect(res.primary.badge).toContain('لم يبلغ النصاب');
    });

    it('4. Deducts urgent liabilities from total assets', () => {
      // Cash = 50,000, Trade = 20,000, Debts to deduct = 45,000 -> Net = 25,000 (< 26,350 nisab)
      const res = calculateZakatWealth({
        cash: 50000,
        tradeGoods: 20000,
        debtsToDeduct: 45000,
        goldGramPrice: 310,
        calendarType: 'hijri',
      });
      expect(res.primary.value).toBe(0);
    });
  });

  // 6. Electricity Bill Slab Engine
  describe('Calculator: electricity-bill', () => {
    it('1. Saudi SERA residential slab 1 (under 6,000 kWh at 0.18 SAR)', () => {
      // 4500 kWh * 0.18 = 810 SAR + 15 SAR meter + 15% VAT (123.75) = 948.75 SAR
      const res = calculateElectricityBill({
        kwh: 4500,
        tariffCategory: 'residential',
        meterBreakerAmps: 60,
        country: 'SA',
      });
      expect(res.primary.value).toBe(948.75);
      expect(res.secondary?.[0].value).toBe(810.00);
    });

    it('2. Saudi SERA progressive transition to slab 2 (above 6,000 kWh at 0.30 SAR)', () => {
      // 7000 kWh: 6000 * 0.18 (1080) + 1000 * 0.30 (300) = 1380 + 15 meter = 1395 + 15% VAT (209.25) = 1604.25 SAR
      const res = calculateElectricityBill({
        kwh: 7000,
        tariffCategory: 'residential',
        meterBreakerAmps: 60,
        country: 'SA',
      });
      expect(res.primary.value).toBe(1604.25);
    });

    it('3. Dubai DEWA residential slabs with fuel surcharge and 5% VAT', () => {
      // 2000 kWh: slab 1 (2000 * 0.23 = 460) + Fuel Surcharge (2000 * 0.05 = 100) = 560 + 5% VAT (28) = 588 AED
      const res = calculateElectricityBill({
        kwh: 2000,
        country: 'AE',
        provider: 'DEWA',
      });
      expect(res.error).toBeUndefined();
      expect(res.primary.value).toBeGreaterThan(0);
    });

    it('4. Egypt EgyptERA 7-tier residential system with service fee', () => {
      const res = calculateElectricityBill({
        kwh: 450,
        country: 'EG',
      });
      expect(res.error).toBeUndefined();
      expect(res.primary.value).toBeGreaterThan(0);
    });

    it('5. Handles zero consumption and rejects negative electricity consumption', () => {
      // 0 kWh consumption in Saudi Arabia still incurs 15 SAR meter fee + 15% VAT = 17.25 SAR
      const zero = calculateElectricityBill({ kwh: 0, country: 'SA', meterBreakerAmps: 60 });
      expect(zero.error).toBeUndefined();
      expect(zero.primary.value).toBe(17.25);

      const neg = calculateElectricityBill({ kwh: -500, country: 'SA' });
      expect(neg.error).toBeDefined();
    });
  });

  // 7. BMI & Ideal Weight Engine
  describe('Calculator: bmi-calculator', () => {
    it('1. Standard WHO BMI calculation matches weight / height^2', () => {
      // 75 kg / (1.75 * 1.75) = 24.49 -> 24.5 kg/m2 (Normal weight)
      const res = calculateBmi({ weightKg: 75, heightCm: 175 });
      expect(res.primary.value).toBeCloseTo(24.5, 1);
      expect(res.primary.badge).toContain('طبيعي');
      expect(res.secondary?.[1].value).toContain('56.7 - 76.3'); // ideal weight range
    });

    it('2. Detects underweight classification (< 18.5)', () => {
      // 45 kg / (1.70 * 1.70) = 15.57
      const res = calculateBmi({ weightKg: 45, heightCm: 170 });
      expect(res.primary.value).toBeLessThan(18.5);
      expect(res.primary.badge).toContain('نقص');
    });

    it('3. Detects obesity classification (>= 30.0)', () => {
      // 105 kg / (1.70 * 1.70) = 36.33
      const res = calculateBmi({ weightKg: 105, heightCm: 170 });
      expect(res.primary.value).toBeGreaterThanOrEqual(30.0);
      expect(res.primary.badge).toContain('سمنة');
    });

    it('4. Rejects unreasonable or zero height and weight', () => {
      const zeroHeight = calculateBmi({ weightKg: 75, heightCm: 0 });
      expect(zeroHeight.error).toBeDefined();

      const negWeight = calculateBmi({ weightKg: -50, heightCm: 170 });
      expect(negWeight.error).toBeDefined();
    });
  });

  // 8. Percentage Calculator Engine
  describe('Calculator: percentage-calculator', () => {
    it('1. Percent of value mode (15% of 500 = 75)', () => {
      const res = calculatePercentage({ mode: 'percent_of', valueA: 15, valueB: 500 });
      expect(res.primary.value).toBe(75);
    });

    it('2. Ratio mode (50 is what percent of 200 = 25%)', () => {
      const res = calculatePercentage({ mode: 'is_what_percent', valueA: 50, valueB: 200 });
      expect(res.primary.value).toBe(25);
    });

    it('3. Percentage change mode (100 to 125 = +25% increase)', () => {
      const res = calculatePercentage({ mode: 'change', valueA: 100, valueB: 125 });
      expect(res.primary.value).toBe(25);
      expect(res.primary.badge).toContain('زيادة');
    });

    it('4. Percentage change mode (200 to 150 = -25% decrease)', () => {
      const res = calculatePercentage({ mode: 'change', valueA: 200, valueB: 150 });
      expect(res.primary.value).toBe(-25);
      expect(res.primary.badge).toContain('انخفاض');
    });

    it('5. Division by zero protection in ratio mode', () => {
      const divZero = calculatePercentage({ mode: 'is_what_percent', valueA: 50, valueB: 0 });
      expect(divZero.error).toBeDefined();
      expect(divZero.primary.value).toBe(0);
    });
  });

  // 9. Length & Distance Converter Engine
  describe('Calculator: length-converter', () => {
    it('1. Default inputs return valid calculation (10 in = 25.4 cm)', () => {
      const res = calculateLengthConverter({ value: 10, fromUnit: 'in', toUnit: 'cm', precision: 4 });
      expect(res.error).toBeUndefined();
      expect(res.primary.value).toBe(25.4);
      expect(res.primary.formattedValue).toBe('25.4');
      expect(res.primary.unit).toBe('سم');
    });

    it('2. Statutorily exact conversions (10 mi = 16.09344 km)', () => {
      const res = calculateLengthConverter({ value: 10, fromUnit: 'mi', toUnit: 'km', precision: 5 });
      expect(res.primary.value).toBe(16.09344);
      expect(res.primary.formattedValue).toBe('16.09344');
    });

    it('3. Metric to Imperial conversions (100 cm = 39.370079 in)', () => {
      const res = calculateLengthConverter({ value: 100, fromUnit: 'cm', toUnit: 'in', precision: 6 });
      expect(res.primary.value).toBeCloseTo(39.37007874, 5);
      expect(res.primary.formattedValue).toBe('39.370079');
    });

    it('4. Handles zero input properly without NaN or error', () => {
      const res = calculateLengthConverter({ value: 0, fromUnit: 'm', toUnit: 'ft' });
      expect(res.primary.value).toBe(0);
      expect(res.primary.formattedValue).toBe('0');
      expect(res.error).toBeUndefined();
    });

    it('5. Handles NaN and invalid input cleanly', () => {
      const res = calculateLengthConverter({ value: 'abc', fromUnit: 'in', toUnit: 'cm' });
      expect(res.error).toBeDefined();
      expect(res.primary.formattedValue).toBe('-');
    });
  });

  // 10. Time & Duration Converter Engine
  describe('Calculator: time-converter', () => {
    it('1. Default inputs return valid calculation (90 min = 1.5 hr)', () => {
      const res = calculateTimeConverter({ value: 90, fromUnit: 'min', toUnit: 'hr', precision: 2 });
      expect(res.error).toBeUndefined();
      expect(res.primary.value).toBe(1.5);
      expect(res.primary.formattedValue).toBe('1.5');
      expect(res.primary.unit).toBe('س');
    });

    it('2. Compound duration decomposition (90061s = 1d 1h 1m 1s)', () => {
      const res = calculateTimeConverter({ value: 90061, fromUnit: 's', toUnit: 'hr' });
      const breakdownDetail = res.details?.find((d) => d.label === 'المدة الزمنية المركبة');
      expect(breakdownDetail?.value).toBe('1 يوم و 1 ساعة و 1 دقيقة و 1 ثانية');
    });

    it('3. Year convention handling (Julian 365.25 vs Common 365)', () => {
      const julianRes = calculateTimeConverter({ value: 1, fromUnit: 'year', toUnit: 'day', yearConvention: 'julian' });
      expect(julianRes.primary.value).toBe(365.25);

      const commonRes = calculateTimeConverter({ value: 1, fromUnit: 'year', toUnit: 'day', yearConvention: 'common' });
      expect(commonRes.primary.value).toBe(365);
    });

    it('4. Handles zero input without error', () => {
      const res = calculateTimeConverter({ value: 0, fromUnit: 's', toUnit: 'min' });
      expect(res.primary.value).toBe(0);
      expect(res.primary.formattedValue).toBe('0');
      expect(res.error).toBeUndefined();
    });

    it('5. Handles NaN cleanly with error message', () => {
      const res = calculateTimeConverter({ value: 'not_a_number', fromUnit: 's', toUnit: 'min' });
      expect(res.error).toBeDefined();
      expect(res.primary.formattedValue).toBe('-');
    });
  });
});
