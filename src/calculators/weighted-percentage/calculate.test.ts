import { describe, it, expect } from 'vitest';
import { calculateWeightedPercentage } from './calculate';

describe('Weighted Percentage (النسبة الموزونة) Engine', () => {
  it('90 / 80 / 85 at 30/30/40 = 27 + 24 + 34 = 85', () => {
    const res = calculateWeightedPercentage({ preset: '30-30-40', highSchool: 90, qudurat: 80, tahsili: 85 });
    expect(res.error).toBeUndefined();
    expect(res.primary.value).toBe(85);
    expect(res.secondary?.map((s) => s.value)).toEqual([27, 24, 34]);
  });

  it('95 / 78 / 82 at 40/30/30 = 38 + 23.4 + 24.6 = 86', () => {
    const res = calculateWeightedPercentage({ preset: '40-30-30', highSchool: 95, qudurat: 78, tahsili: 82 });
    expect(res.primary.value).toBe(86);
  });

  it('50/50 school + Qudurat ignores Tahsili: 92 and 80 = 46 + 40 = 86', () => {
    const res = calculateWeightedPercentage({ preset: '50-50-0', highSchool: 92, qudurat: 80, tahsili: 10 });
    expect(res.primary.value).toBe(86);
    expect(res.secondary).toHaveLength(2);
  });

  it('custom weights must sum to 100', () => {
    const bad = calculateWeightedPercentage({
      preset: 'custom', highSchool: 90, qudurat: 80, tahsili: 85,
      weightHighSchool: 30, weightQudurat: 30, weightTahsili: 30,
    });
    expect(bad.error).toContain('100');

    const ok = calculateWeightedPercentage({
      preset: 'custom', highSchool: 90, qudurat: 80, tahsili: 70,
      weightHighSchool: 20, weightQudurat: 30, weightTahsili: 50,
    });
    // 18 + 24 + 35 = 77
    expect(ok.primary.value).toBe(77);
  });

  it('rejects scores outside 0..100', () => {
    const res = calculateWeightedPercentage({ preset: '30-30-40', highSchool: 101, qudurat: 80, tahsili: 85 });
    expect(res.error).toBeDefined();
  });

  it('computes the Tahsili score needed for a target: (90 − 27 − 24) / 40% = 97.5', () => {
    const res = calculateWeightedPercentage({ preset: '30-30-40', highSchool: 90, qudurat: 80, tahsili: 85, targetPercent: 90 });
    expect(res.secondary?.find((s) => s.id === 'tahsiliNeeded')?.value).toBe(97.5);
  });
});
