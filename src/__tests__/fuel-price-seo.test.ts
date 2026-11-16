import { describe, it, expect } from 'vitest';
import { getFuelPriceSeo, isFuelPriceFresh } from '@/lib/seo/fuel-price-seo';
import { COUNTRY_DATA_BH } from '@/data/countries/bh';

const inWindow = new Date('2026-11-16T00:00:00Z');

describe('fuel price titles', () => {
  it('puts the regular-grade price and month in the title while the price is fresh', () => {
    expect(getFuelPriceSeo('fuel-cost', 'BH', inWindow)!.title).toBe('سعر البنزين في البحرين اليوم: 91 بـ 235 فلساً (نوفمبر 2026)');
    expect(getFuelPriceSeo('fuel-cost', 'KW', inWindow)!.title).toBe('سعر البنزين في الكويت اليوم: 91 بـ 85 فلساً (نوفمبر 2026)');
    expect(getFuelPriceSeo('fuel-cost', 'SA', inWindow)!.title).toBe('سعر البنزين في السعودية اليوم: 91 بـ 2.18 ريال (نوفمبر 2026)');
    expect(getFuelPriceSeo('fuel-cost', 'AE', inWindow)!.title).toBe('سعر البنزين في الإمارات اليوم: 91 بـ 3.97 درهم (نوفمبر 2026)');
    expect(getFuelPriceSeo('fuel-cost', 'EG', inWindow)!.title).toContain('92 بـ 22.25 جنيه');
    expect(getFuelPriceSeo('fuel-cost', 'OM', inWindow)!.title).toBe('سعر البنزين في سلطنة عمان اليوم: 91 بـ 229 بيسة (نوفمبر 2026)');
    expect(getFuelPriceSeo('fuel-cost', 'OM', inWindow)!.answerFirst).not.toContain('فلس');
  });

  it('drops price and month from the title once the price passes its re-check date', () => {
    const checked = COUNTRY_DATA_BH.fuel.checkedAt!;
    const late = new Date(new Date(checked).getTime() + 36 * 86_400_000);
    const seo = getFuelPriceSeo('fuel-cost', 'BH', late)!;
    expect(seo.fresh).toBe(false);
    expect(seo.title).toBe('سعر البنزين في البحرين اليوم للتر');
  });

  it('freshness window', () => {
    expect(isFuelPriceFresh('2026-11-01', 35, new Date('2026-12-06T00:00:00Z'))).toBe(true);
    expect(isFuelPriceFresh('2026-11-01', 35, new Date('2026-12-07T00:00:00Z'))).toBe(false);
    expect(isFuelPriceFresh(undefined, 35, inWindow)).toBe(false);
  });
});
