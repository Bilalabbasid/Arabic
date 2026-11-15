import { describe, it, expect } from 'vitest';
import { calculateDiscount } from './calculate';

const sec = (res: ReturnType<typeof calculateDiscount>, id: string) => res.secondary?.find((s) => s.id === id)?.value;

describe('Discount Calculator Engine', () => {
  it('200 at 25% = 150 (saves 50)', () => {
    const res = calculateDiscount({ mode: 'percent', originalPrice: 200, discountPercent: 25 });
    expect(res.primary.value).toBe(150);
    expect(sec(res, 'saved')).toBe(50);
  });

  it('30% off 450 = 315 (saves 135)', () => {
    const res = calculateDiscount({ mode: 'percent', originalPrice: 450, discountPercent: 30 });
    expect(res.primary.value).toBe(315);
    expect(sec(res, 'saved')).toBe(135);
  });

  it('stacked 20% then 10% on 1000 = 720, effective 28% (not 30%)', () => {
    const res = calculateDiscount({ mode: 'percent', originalPrice: 1000, discountPercent: 20, secondDiscountPercent: 10 });
    expect(res.primary.value).toBe(720);
    expect(sec(res, 'afterFirst')).toBe(800);
    expect(sec(res, 'effectivePercent')).toBe(28);
  });

  it('adds 15% VAT after the discount: 200 at 25% = 150 + 22.5 = 172.5', () => {
    const res = calculateDiscount({ mode: 'percent', originalPrice: 200, discountPercent: 25, vat: 'add' });
    expect(sec(res, 'vat')).toBe(22.5);
    expect(res.primary.value).toBe(172.5);
    expect(sec(res, 'saved')).toBe(50);
  });

  it('reverse mode: 400 → 300 = 25% discount', () => {
    const res = calculateDiscount({ mode: 'reverse', originalPrice: 400, salePrice: 300 });
    expect(res.primary.value).toBe(25);
    expect(sec(res, 'saved')).toBe(100);
  });

  it('rejects invalid inputs', () => {
    expect(calculateDiscount({ originalPrice: 0, discountPercent: 10 }).error).toBeDefined();
    expect(calculateDiscount({ originalPrice: 100, discountPercent: 120 }).error).toBeDefined();
    expect(calculateDiscount({ mode: 'reverse', originalPrice: 100, salePrice: 150 }).error).toBeDefined();
  });
});
