import { describe, it, expect } from 'vitest';
import { resolveApplicableRule } from '@/lib/rules/rule-resolver';
import { calculateElectricityBill } from '@/lib/calculators/electricity';
import { calculateEndOfService } from '@/lib/calculators/salary';
import { calculateVat } from '@/lib/calculators/tax';
import { calculateCarFuelCost } from '@/lib/calculators/cars';
import { ALL_CALCULATORS, getCalculatorBySlug } from '@/data/calculators';
import { isCountryCalculatorValid, generateHreflangAlternates } from '@/lib/seo/metadata';

describe('Phase 16: Multi-Country Regression & Isolation Suite (SA, AE, EG, KW, QA, BH, OM, JO, MA)', () => {

  // 1. VAT & Tax Regression Across Arab States
  describe('VAT Across Arab Jurisdictions', () => {
    it('correctly calculates Saudi VAT at 15% with ZATCA metadata', () => {
      const res = calculateVat({ amount: 1000, calculationType: 'add', country: 'SA' });
      expect(res.primary.value).toBe(150); // tax amount
      expect(res.secondary?.[0].value).toBe(1150); // gross total
      expect(res.details?.some((d) => d.value.includes('15%'))).toBe(true);
    });

    it('correctly calculates UAE VAT at 5% with FTA metadata', () => {
      const res = calculateVat({ amount: 1000, calculationType: 'add', country: 'AE' });
      expect(res.primary.value).toBe(50); // tax amount
      expect(res.secondary?.[0].value).toBe(1050); // gross total
      expect(res.details?.some((d) => d.value.includes('5%'))).toBe(true);
    });

    it('correctly calculates Egypt VAT at 14% with ETA metadata', () => {
      const res = calculateVat({ amount: 1000, calculationType: 'add', country: 'EG' });
      expect(res.primary.value).toBe(140); // tax amount
      expect(res.secondary?.[0].value).toBe(1140); // gross total
      expect(res.details?.some((d) => d.value.includes('14%'))).toBe(true);
    });

    it('correctly calculates Bahrain VAT at 10%', () => {
      const res = calculateVat({ amount: 1000, calculationType: 'add', country: 'BH' });
      expect(res.primary.value).toBe(100);
      expect(res.secondary?.[0].value).toBe(1100);
    });

    it('correctly calculates Oman VAT at 5%', () => {
      const res = calculateVat({ amount: 1000, calculationType: 'add', country: 'OM' });
      expect(res.primary.value).toBe(50);
      expect(res.secondary?.[0].value).toBe(1050);
    });

    it('correctly handles non-VAT countries (KW, QA) with 0% standard or custom override', () => {
      const resKw = calculateVat({ amount: 1000, calculationType: 'add', country: 'KW' });
      expect(resKw.primary.value).toBe(0);
      expect(resKw.secondary?.[0].value).toBe(1000);

      const resQa = calculateVat({ amount: 1000, calculationType: 'add', country: 'QA' });
      expect(resQa.primary.value).toBe(0);
      expect(resQa.secondary?.[0].value).toBe(1000);
    });

    it('correctly extracts original amount from inclusive price across countries', () => {
      // 1150 SAR in SA -> 1000 original + 150 VAT
      const extractSa = calculateVat({ amount: 1150, calculationType: 'extract', country: 'SA' });
      expect(extractSa.primary.value).toBe(150); // tax amount
      expect(extractSa.secondary?.[1].value).toBe(1000); // net original

      // 1050 AED in UAE -> 1000 original + 50 VAT
      const extractAe = calculateVat({ amount: 1050, calculationType: 'extract', country: 'AE' });
      expect(extractAe.primary.value).toBe(50);
      expect(extractAe.secondary?.[1].value).toBe(1000);
    });
  });

  // 2. Fuel Cost Pricing & Universal Physics Across GCC & Levant & North Africa
  describe('Fuel Consumption & Prices (SA, AE, KW, QA, BH, OM, EG, JO, MA)', () => {
    it('applies Saudi official gasoline 91 pricing (2.18 SAR)', () => {
      const res = calculateCarFuelCost({
        distanceKm: 500,
        fuelConsumption: 10, // 50 liters total
        country: 'SA',
        fuelType: 'octane91',
      });
      // 50 L * 2.18 = 109 SAR
      expect(res.primary.value).toBeCloseTo(109, 2);
      expect(res.secondary?.[0].value).toBe(50); // liters needed
    });

    it('applies Kuwait subsidized gasoline 91 pricing (0.085 KWD)', () => {
      const res = calculateCarFuelCost({
        distanceKm: 1000,
        fuelConsumption: 10, // 100 liters
        country: 'KW',
        fuelType: 'octane91',
      });
      // 100 L * 0.085 = 8.5 KWD
      expect(res.primary.value).toBeCloseTo(8.5, 3);
    });

    it('applies Qatar official gasoline 91 pricing (1.90 QAR)', () => {
      const res = calculateCarFuelCost({
        distanceKm: 200,
        fuelConsumption: 10, // 20 liters
        country: 'QA',
        fuelType: 'octane91',
      });
      // 20 L * 1.90 = 38 QAR
      expect(res.primary.value).toBeCloseTo(38, 2);
    });

    it('enables custom price entry for countries without official fixed price feeds (e.g. Jordan, Morocco)', () => {
      // 300 km at 8 L/100km = 24 L. User enters 1.15 JOD / liter in Jordan
      const resJo = calculateCarFuelCost({
        distanceKm: 300,
        fuelConsumption: 8,
        country: 'JO',
        customPricePerLiter: 1.15,
      });
      // 24 * 1.15 = 27.6 JOD
      expect(resJo.primary.value).toBeCloseTo(27.6, 2);

      // Morocco: 14.20 MAD / liter, 500 km at 6.5 L/100km = 32.5 L
      const resMa = calculateCarFuelCost({
        distanceKm: 500,
        fuelConsumption: 6.5,
        country: 'MA',
        customPricePerLiter: 14.20,
      });
      // 32.5 * 14.20 = 461.5 MAD
      expect(resMa.primary.value).toBeCloseTo(461.5, 2);
    });
  });

  // 3. Country Isolation & Explicit Unavailability Handling
  describe('Country Regulation Isolation & Explicit Unavailability', () => {
    it('returns explicit unavailable response for country without verified electricity rule (e.g. Morocco)', () => {
      const res = resolveApplicableRule({
        calculatorId: 'electricity-bill',
        countryCode: 'MA',
      });
      expect(res.isAvailable).toBe(false);
      expect(res.unavailableReason).toBeDefined();
      expect(res.unavailableReason).toContain('لا توجد لوائح نظامية معتمدة');
    });

    it('electricity engine gracefully falls back to generic average rate with explicit disclaimer for unverified countries', () => {
      const res = calculateElectricityBill({
        kwh: 500,
        country: 'MA', // Morocco not in verified progressive slabs
        category: 'residential',
        meterRating: 0,
        provider: 'general',
      });

      expect(res.error).toBeUndefined();
      expect(res.primary.value).toBeGreaterThan(0);
      expect(res.assumptions).toBeDefined();
      expect(res.assumptions?.some((q) => q.includes('حساب استرشادي') || q.includes('MA'))).toBe(true);
    });

    it('end of service engine alerts user when attempting to calculate for countries without codified rules', () => {
      const res = calculateEndOfService({
        salary: 5000,
        years: 4,
        months: 0,
        terminationReason: 'resignation',
        country: 'JO', // Jordan Labor Law not yet approved in system
      });

      expect(res.primary.value).toBe(0);
      expect(res.error).toContain('JO');
    });
  });

  // 4. SEO & URL Architecture Invariants
  describe('SEO Country Route & Invariant Verification', () => {
    it('strictly forbids universal calculators from generating country-specific routes', () => {
      const universalSlugs = ['percentage-calculator', 'bmi-calculator', 'zakat-wealth'];
      for (const slug of universalSlugs) {
        const calc = getCalculatorBySlug(slug);
        expect(calc).toBeDefined();
        if (calc) {
          expect(calc.countryMode).toBe('UNIVERSAL');
          // For all Arab country codes, must return false
          ['SA', 'AE', 'EG', 'KW', 'QA', 'BH', 'OM', 'JO', 'MA', 'DZ'].forEach((cCode) => {
            expect(isCountryCalculatorValid(calc, cCode)).toBe(false);
          });
        }
      }
    });

    it('allows verified country-regulated calculators to generate routes only for verified countries', () => {
      const elec = getCalculatorBySlug('electricity-bill');
      expect(elec).toBeDefined();
      if (elec) {
        expect(elec.countryMode).toBe('COUNTRY_REGULATED');
        // Approved countries: SA, AE, EG
        expect(isCountryCalculatorValid(elec, 'SA')).toBe(true);
        expect(isCountryCalculatorValid(elec, 'AE')).toBe(true);
        expect(isCountryCalculatorValid(elec, 'EG')).toBe(true);
        // Unapproved countries: MA, JO, DZ must be false
        expect(isCountryCalculatorValid(elec, 'MA')).toBe(false);
        expect(isCountryCalculatorValid(elec, 'JO')).toBe(false);
        expect(isCountryCalculatorValid(elec, 'DZ')).toBe(false);
      }
    });

    it('generates reciprocal hreflangs exclusively for published countries', () => {
      const elec = getCalculatorBySlug('electricity-bill')!;
      const alternates = generateHreflangAlternates(elec);

      expect(alternates['ar-SA']).toBe('https://lsayartk.com/sa/electricity-bill');
      expect(alternates['ar-AE']).toBe('https://lsayartk.com/ae/electricity-bill');
      expect(alternates['ar-EG']).toBe('https://lsayartk.com/eg/electricity-bill');
      expect(alternates['x-default']).toBe('https://lsayartk.com/calculators/electricity-bill');

      // Unverified countries must NOT be in hreflang
      expect(alternates['ar-MA']).toBeUndefined();
      expect(alternates['ar-JO']).toBeUndefined();
    });
  });
});
