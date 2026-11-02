import { describe, it, expect } from 'vitest';
import { ALL_COUNTRIES_DATA, ALL_COUNTRY_CODES, getCountryData, formatCountryCurrency } from '../data/countries';

describe('22-Country Data Layer Suite', () => {
  it('covers all 22 Arab League countries', () => {
    expect(ALL_COUNTRY_CODES.length).toBe(22);
    expect(Object.keys(ALL_COUNTRIES_DATA).length).toBe(22);
    const expected = [
      'sa', 'ae', 'kw', 'qa', 'bh', 'om',
      'eg', 'jo', 'lb', 'sy', 'iq', 'ye', 'ps', 'sd',
      'ma', 'dz', 'tn', 'ly', 'mr',
      'so', 'dj', 'km',
    ];
    for (const code of expected) {
      expect(ALL_COUNTRY_CODES).toContain(code);
      expect(getCountryData(code)).toBeDefined();
    }
  });

  it('adheres to ISO 4217 minor units (3 for KWD, BHD, OMR, JOD, TND, LYD; 2 for others)', () => {
    const threeDecimalCurrencies = ['kw', 'bh', 'om', 'jo', 'tn', 'ly'];
    for (const code of ALL_COUNTRY_CODES) {
      const country = getCountryData(code)!;
      if (threeDecimalCurrencies.includes(code)) {
        expect(country.basics.currency.minorUnits).toBe(3);
      } else {
        expect(country.basics.currency.minorUnits).toBe(2);
      }
    }
  });

  it('formats currency using Western digits and proper decimals', () => {
    const kwdFormatted = formatCountryCurrency(12.3456, 'kw');
    expect(kwdFormatted).toContain('12.346');
    expect(kwdFormatted).toContain('د.ك');

    const sarFormatted = formatCountryCurrency(100.5, 'sa');
    expect(sarFormatted).toContain('100.50');
    expect(sarFormatted).toContain('ر.س');
  });

  it('has valid status and required metadata on all core rules', () => {
    const validStatuses = ['verified', 'not_applicable', 'no_official_source', 'unverified'];

    for (const code of ALL_COUNTRY_CODES) {
      const c = getCountryData(code)!;

      // Basics
      expect(c.basics.nameAr.length).toBeGreaterThan(3);
      expect(c.basics.currency.code.length).toBe(3);
      expect(c.basics.weekendDays.length).toBeGreaterThanOrEqual(1);

      // Local Terminology
      expect(c.basics.localTerms.vehicleRegistration).toBeDefined();
      expect(c.basics.localTerms.diesel).toBeDefined();
      expect(c.basics.localTerms.periodicInspection).toBeDefined();
      expect(c.basics.localTerms.drivingLicence).toBeDefined();

      // Rule Statuses
      expect(validStatuses).toContain(c.vat.status);
      expect(validStatuses).toContain(c.incomeTax.status);
      expect(validStatuses).toContain(c.socialInsurance.status);
      expect(validStatuses).toContain(c.endOfService.status);
      expect(validStatuses).toContain(c.consumerFinance.status);
      expect(validStatuses).toContain(c.fuel.status);
      expect(validStatuses).toContain(c.electricity.status);
      expect(validStatuses).toContain(c.vehicle.status);
      expect(validStatuses).toContain(c.zakat.status);

      // If verified, checkedAt must be defined
      if (c.vat.status === 'verified') {
        expect(c.vat.checkedAt).toBeDefined();
        expect(c.vat.value?.standardRate).toBeGreaterThanOrEqual(0);
      }
      if (c.vat.status === 'not_applicable') {
        expect(c.vat.note).toBeDefined();
      }
      if (c.fuel.status === 'no_official_source') {
        expect(c.fuel.note).toBeDefined();
      }
      if (c.incomeTax.status === 'not_applicable') {
        expect(c.incomeTax.note).toBeDefined();
      }

      // Routes
      expect(c.routes.length).toBeGreaterThanOrEqual(4);
      for (const route of c.routes) {
        expect(route.distanceKm).toBeGreaterThan(0);
        expect(route.fromCityAr.length).toBeGreaterThan(1);
        expect(route.toCityAr.length).toBeGreaterThan(1);
      }
    }
  });

  it('correctly handles specific country nuances', () => {
    // Kuwait & Qatar have no VAT
    expect(getCountryData('kw')!.vat.status).toBe('not_applicable');
    expect(getCountryData('qa')!.vat.status).toBe('not_applicable');

    // Morocco fuel is liberalized (no official source)
    expect(getCountryData('ma')!.fuel.status).toBe('no_official_source');

    // Saudi VAT is 15% verified
    expect(getCountryData('sa')!.vat.status).toBe('verified');
    expect(getCountryData('sa')!.vat.value?.standardRate).toBe(15);

    // Bahrain VAT is 10% verified
    expect(getCountryData('bh')!.vat.status).toBe('verified');
    expect(getCountryData('bh')!.vat.value?.standardRate).toBe(10);

    // UAE VAT is 5% verified
    expect(getCountryData('ae')!.vat.status).toBe('verified');
    expect(getCountryData('ae')!.vat.value?.standardRate).toBe(5);

    // Egypt VAT is 14% verified
    expect(getCountryData('eg')!.vat.status).toBe('verified');
    expect(getCountryData('eg')!.vat.value?.standardRate).toBe(14);
  });
});
