import { describe, it, expect } from 'vitest';
import { calculateVat } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';
import { COUNTRY_DATA_KW } from '../../data/countries/kw';
import { COUNTRY_DATA_AE } from '../../data/countries/ae';

describe('VAT Calculator Engine', () => {
  it('calculates exclusive VAT correctly for Saudi Arabia (15%)', () => {
    const result = calculateVat({ amount: 1000, isVatInclusive: false }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBe(150);
    expect(result.secondary?.[0].value).toBe(1150);
    expect(result.secondary?.[1].value).toBe(1000);
  });

  it('calculates inclusive VAT correctly for UAE (5%)', () => {
    // 1050 inclusive at 5% -> net 1000, vat 50
    const result = calculateVat({ amount: 1050, isVatInclusive: true }, COUNTRY_DATA_AE);
    expect(result.primary.value).toBe(50);
    expect(result.secondary?.[0].value).toBe(1050);
    expect(result.secondary?.[1].value).toBe(1000);
  });

  it('honestly handles zero VAT in Kuwait with explicit warning', () => {
    const result = calculateVat({ amount: 500 }, COUNTRY_DATA_KW);
    expect(result.primary.value).toBe(0);
    expect(result.secondary?.[0].value).toBe(500);
    expect(result.warnings).toBeDefined();
    expect(result.warnings?.[0]).toContain('الكويت');
  });

  it('allows custom rate override when provided', () => {
    const result = calculateVat({ amount: 1000, customRate: 20 }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBe(200);
    expect(result.secondary?.[0].value).toBe(1200);
  });
});
