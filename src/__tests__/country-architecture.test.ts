import { describe, it, expect } from 'vitest';
import { ALL_CALCULATORS, getCalculatorBySlug } from '@/data/calculators';
import { COUNTRIES } from '@/data/countries';
import {
  isCountryCalculatorValid,
  isCountryHubIndexable,
  generateHreflangAlternates,
} from '@/lib/seo/metadata';
import { calculateVat } from '@/lib/calculators/tax';
import { getCountryCalculatorContent } from '@/data/country-content';

describe('Phase 3: Country Architecture & Localized Calculators', () => {
  it('strictly limits country pages to genuinely localized calculators', () => {
    const vat = getCalculatorBySlug('vat-calculator')!;
    const eos = getCalculatorBySlug('end-of-service-reward')!;
    const elec = getCalculatorBySlug('electricity-bill')!;
    const fuel = getCalculatorBySlug('car-fuel-cost')!;
    const loan = getCalculatorBySlug('loan-calculator')!;
    const zakat = getCalculatorBySlug('zakat-wealth')!;
    const bmi = getCalculatorBySlug('bmi-calculator')!;

    // VAT
    const validVatCountries = COUNTRIES.filter((c) => isCountryCalculatorValid(vat, c.countryCode)).map((c) => c.countryCode);
    expect(validVatCountries.sort()).toEqual(
      ['SA', 'AE', 'BH', 'OM', 'EG', 'JO', 'MA', 'DZ', 'TN', 'LB', 'KW', 'QA'].sort()
    );

    // End of service
    const validEosCountries = COUNTRIES.filter((c) => isCountryCalculatorValid(eos, c.countryCode)).map((c) => c.countryCode);
    expect(validEosCountries.sort()).toEqual(['SA', 'AE', 'EG'].sort());

    // Electricity
    const validElecCountries = COUNTRIES.filter((c) => isCountryCalculatorValid(elec, c.countryCode)).map((c) => c.countryCode);
    expect(validElecCountries.sort()).toEqual(['SA', 'AE', 'EG'].sort());

    // Car fuel cost
    const validFuelCountries = COUNTRIES.filter((c) => isCountryCalculatorValid(fuel, c.countryCode)).map((c) => c.countryCode);
    expect(validFuelCountries.sort()).toEqual(['SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'EG'].sort());

    // Loan & Zakat & Universal: NO country pages allowed
    for (const c of COUNTRIES) {
      expect(isCountryCalculatorValid(loan, c.countryCode)).toBe(false);
      expect(isCountryCalculatorValid(zakat, c.countryCode)).toBe(false);
      expect(isCountryCalculatorValid(bmi, c.countryCode)).toBe(false);
    }
  });

  it('determines country hub indexability based on >= 3 localized calculators', () => {
    // Only SA, AE, EG have >= 3 localized calculators
    expect(isCountryHubIndexable('SA')).toBe(true);
    expect(isCountryHubIndexable('AE')).toBe(true);
    expect(isCountryHubIndexable('EG')).toBe(true);

    // Countries with <= 2 localized calculators are non-indexable
    expect(isCountryHubIndexable('BH')).toBe(false);
    expect(isCountryHubIndexable('OM')).toBe(false);
    expect(isCountryHubIndexable('KW')).toBe(false);
    expect(isCountryHubIndexable('QA')).toBe(false);
    expect(isCountryHubIndexable('JO')).toBe(false);
    expect(isCountryHubIndexable('MA')).toBe(false);
    expect(isCountryHubIndexable('DZ')).toBe(false);
    expect(isCountryHubIndexable('TN')).toBe(false);
    expect(isCountryHubIndexable('LB')).toBe(false);
    expect(isCountryHubIndexable('YE')).toBe(false);
  });

  it('preselects official country VAT rate on initial calculation (never 0% for SA/AE/EG)', () => {
    // Saudi Arabia initial calculation with default customRate=0
    const saResult = calculateVat({ amount: 1000, calculationType: 'add', country: 'SA', customRate: 0 });
    const saRate = saResult.secondary?.find((s) => s.id === 'vatRate')?.value;
    expect(saRate).toBe(15);
    expect(saResult.primary.value).toBe(150);

    // UAE
    const aeResult = calculateVat({ amount: 1000, calculationType: 'add', country: 'AE', customRate: 0 });
    const aeRate = aeResult.secondary?.find((s) => s.id === 'vatRate')?.value;
    expect(aeRate).toBe(5);
    expect(aeResult.primary.value).toBe(50);

    // Egypt
    const egResult = calculateVat({ amount: 1000, calculationType: 'add', country: 'EG', customRate: 0 });
    const egRate = egResult.secondary?.find((s) => s.id === 'vatRate')?.value;
    expect(egRate).toBe(14);
    expect(egResult.primary.value).toBe(140);
  });

  it('verifies honest disclaimer and content for Kuwait and Qatar VAT pages', () => {
    const kwContent = getCountryCalculatorContent('vat-calculator', 'KW')!;
    expect(kwContent).toBeDefined();
    expect(kwContent.h1).toContain('هل تطبق ضريبة القيمة المضافة في الكويت');
    expect(kwContent.intro).toContain('لا تطبق دولة الكويت ضريبة القيمة المضافة حتى الآن');
    expect(kwContent.workedExamples[0].steps.some((s) => s.includes('0%'))).toBe(true);

    const qaContent = getCountryCalculatorContent('vat-calculator', 'QA')!;
    expect(qaContent).toBeDefined();
    expect(qaContent.h1).toContain('هل تطبق ضريبة القيمة المضافة في قطر');
    expect(qaContent.intro).toContain('لا تفرض دولة قطر ضريبة القيمة المضافة حالياً');
  });

  it('ensures reciprocal hreflang links include all valid variants and x-default', () => {
    const vat = getCalculatorBySlug('vat-calculator')!;
    const alternates = generateHreflangAlternates(vat);

    expect(alternates['x-default']).toBe('https://www.lsayartk.com/calculators/vat-calculator');
    expect(alternates['ar-SA']).toBe('https://www.lsayartk.com/sa/vat-calculator');
    expect(alternates['ar-AE']).toBe('https://www.lsayartk.com/ae/vat-calculator');
    expect(alternates['ar-EG']).toBe('https://www.lsayartk.com/eg/vat-calculator');
    expect(alternates['ar-KW']).toBe('https://www.lsayartk.com/kw/vat-calculator');
    expect(alternates['ar-QA']).toBe('https://www.lsayartk.com/qa/vat-calculator');
  });
});
