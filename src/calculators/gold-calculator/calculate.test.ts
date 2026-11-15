import { describe, it, expect } from 'vitest';
import { calculateGold, defaultGoldVat } from './calculate';
import { pricePerGram24, referencePricePerGram24, convertGoldWeight } from '../../data/gold-prices';

const sec = (res: ReturnType<typeof calculateGold>, id: string) => res.secondary?.find((s) => s.id === id)?.value;

describe('Gold Engine', () => {
  it('buy 10 g of 21K at 480/g 24K with 20/g making in Saudi Arabia: 4,200 + 200 + 15% VAT = 5,060', () => {
    const res = calculateGold({ mode: 'buy', weightGrams: 10, karat: 21, goldPrice24: 480, makingChargePerGram: 20 }, { countryCode: 'sa' });
    expect(res.error).toBeUndefined();
    expect(sec(res, 'perGram')).toBe(420); // 480 × 21 ÷ 24
    expect(sec(res, 'goldValue')).toBe(4200);
    expect(sec(res, 'making')).toBe(200);
    expect(sec(res, 'vat')).toBe(660); // 4,400 × 15%
    expect(res.primary.value).toBe(5060);
    expect(sec(res, 'pureGrams')).toBe(8.75);
  });

  it('VAT defaults by country: UAE 5%, Egypt 0%, typed value wins', () => {
    const base = { mode: 'buy', weightGrams: 10, karat: 21, goldPrice24: 480, makingChargePerGram: 20 };
    expect(calculateGold(base, { countryCode: 'ae' }).primary.value).toBe(4620);
    expect(calculateGold(base, { countryCode: 'eg' }).primary.value).toBe(4400);
    expect(calculateGold({ ...base, vatPercent: 0 }, { countryCode: 'sa' }).primary.value).toBe(4400);
    expect(calculateGold({ ...base, vatPercent: 10 }, { countryCode: 'eg' }).primary.value).toBe(4840);
  });

  it('24K investment gold carries no VAT by default', () => {
    expect(defaultGoldVat('sa', 24)).toBe(0);
    const res = calculateGold({ mode: 'buy', weightGrams: 10, karat: 24, goldPrice24: 480 }, { countryCode: 'sa' });
    expect(res.primary.value).toBe(4800);
  });

  it('sell 10 g of 21K with a 2% shop discount = 4,200 × 0.98 = 4,116', () => {
    const res = calculateGold({ mode: 'sell', weightGrams: 10, karat: 21, goldPrice24: 480, sellDiscountPercent: 2 }, { countryCode: 'sa' });
    expect(res.primary.value).toBe(4116);
    expect(sec(res, 'vat')).toBeUndefined();
  });

  it('karat table: 22K 440, 18K 360, 14K 280 per gram at 480 for 24K', () => {
    const res = calculateGold({ weightGrams: 1, karat: 21, goldPrice24: 480 }, { countryCode: 'sa' });
    const rows = Object.fromEntries(res.breakdown!.rows.map((r) => [r.period, r.values.perGram]));
    expect(rows['عيار 22']).toContain('440.00');
    expect(rows['عيار 18']).toContain('360.00');
    expect(rows['عيار 14']).toContain('280.00');
  });

  it('falls back to the reference price when no price is entered, and warns', () => {
    // 3,887.6 USD/oz ÷ 31.1034768 g × 3.75 SAR = 468.71 SAR/g
    expect(pricePerGram24(3887.6, 3.75)).toBeCloseTo(468.71, 2);
    const res = calculateGold({ weightGrams: 10, karat: 24, goldPrice24: '' }, { countryCode: 'sa' });
    expect(sec(res, 'price24')).toBe(468.71);
    expect(res.warnings?.some((w) => w.includes('السعر المرجعي'))).toBe(true);
  });

  it('uses the country currency and its decimals (Kuwait, 3 decimals)', () => {
    const res = calculateGold({ mode: 'sell', weightGrams: 1, karat: 21, goldPrice24: 40 }, { countryCode: 'kw' });
    expect(res.primary.formattedValue).toBe('35.000 د.ك');
    expect(referencePricePerGram24('kw')).toBeCloseTo((3887.6 / 31.1034768) * 0.31116, 6);
  });

  it('rejects bad input', () => {
    expect(calculateGold({ weightGrams: 0, karat: 21 }).error).toBeDefined();
    expect(calculateGold({ weightGrams: 10, karat: 20 }).error).toBeDefined();
    expect(calculateGold({ weightGrams: 10, karat: 21, goldPrice24: -5 }).error).toBeDefined();
  });

  it('accepts weight in tolas and ounces', () => {
    // 1 tola = 11.6638038 g × 420 (21K) = 4,898.80; 1 oz = 31.1034768 g × 480 = 14,929.67
    const tola = calculateGold({ mode: 'sell', weightGrams: 1, weightUnit: 'tola', karat: 21, goldPrice24: 480 }, { countryCode: 'sa' });
    expect(tola.primary.value).toBe(4898.8);
    const oz = calculateGold({ mode: 'sell', weightGrams: 1, weightUnit: 'ounce', karat: 24, goldPrice24: 480 }, { countryCode: 'sa' });
    expect(oz.primary.value).toBe(14929.67);
  });

  it('converts between gram, tola and ounce both ways', () => {
    expect(convertGoldWeight(1, 'tola', 'gram')).toBeCloseTo(11.6638038, 7);
    expect(convertGoldWeight(100, 'gram', 'tola')).toBeCloseTo(8.5735, 4);
    expect(convertGoldWeight(1, 'ounce', 'tola')).toBeCloseTo(2.6667, 4);
    expect(convertGoldWeight(convertGoldWeight(50, 'gram', 'ounce'), 'ounce', 'gram')).toBeCloseTo(50, 9);
  });
});
