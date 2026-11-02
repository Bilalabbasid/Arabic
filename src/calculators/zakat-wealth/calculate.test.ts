import { describe, it, expect } from 'vitest';
import { calculateZakatWealth } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';

describe('Zakat on Wealth Engine', () => {
  it('calculates Zakat correctly when above nisab (2.5% Hijri)', () => {
    // 100,000 cash at 300 SAR/g gold (nisab = 25,500) -> Zakat = 2,500
    const result = calculateZakatWealth({ cashAmount: 100000, goldPricePerGram: 300, yearType: 'hijri' }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBe(2500);
    expect(result.secondary?.[0].value).toBe(100000);
  });

  it('returns zero zakat when wealth is below nisab', () => {
    // 10,000 cash at 300 SAR/g gold (nisab = 25,500) -> Below nisab
    const result = calculateZakatWealth({ cashAmount: 10000, goldPricePerGram: 300 }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBe(0);
    expect(result.warnings).toBeDefined();
    expect(result.warnings?.[0]).toContain('لم يبلغ حد النصاب');
  });

  it('calculates Gregorian solar year rate (2.577%) accurately', () => {
    const result = calculateZakatWealth({ cashAmount: 100000, goldPricePerGram: 300, yearType: 'gregorian' }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBeCloseTo(2577, 0);
  });
});
