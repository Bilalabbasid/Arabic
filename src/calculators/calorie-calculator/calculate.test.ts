import { describe, it, expect } from 'vitest';
import { calculateCalories, mifflinStJeor, katchMcArdle, dailyAdjustment } from './calculate';

const sec = (res: ReturnType<typeof calculateCalories>, id: string) => res.secondary?.find((s) => s.id === id)?.value;

describe('Calorie Engine', () => {
  it('Mifflin-St Jeor male 30y 175 cm 80 kg = 800 + 1093.75 − 150 + 5 = 1748.75', () => {
    expect(mifflinStJeor('male', 80, 175, 30)).toBeCloseTo(1748.75, 6);
  });

  it('Mifflin-St Jeor female 30y 165 cm 65 kg = 650 + 1031.25 − 150 − 161 = 1370.25', () => {
    expect(mifflinStJeor('female', 65, 165, 30)).toBeCloseTo(1370.25, 6);
  });

  it('half a kilo a week = 0.5 × 7700 ÷ 7 = 550 kcal/day deficit', () => {
    expect(dailyAdjustment('lose05')).toBeCloseTo(-550, 6);
    expect(dailyAdjustment('lose1')).toBeCloseTo(-1100, 6);
    expect(dailyAdjustment('gain025')).toBeCloseTo(275, 6);
    expect(dailyAdjustment('maintain')).toBe(0);
  });

  it('male moderate, lose 0.5 kg/week: TDEE 2711, target 2161, macros 135/243/72', () => {
    const res = calculateCalories({ sex: 'male', age: 30, heightCm: 175, weightKg: 80, activity: 'moderate', goal: 'lose05' });
    expect(res.error).toBeUndefined();
    expect(sec(res, 'bmr')).toBe(1749);
    expect(sec(res, 'tdee')).toBe(2711); // 1748.75 × 1.55 = 2710.56
    expect(res.primary.value).toBe(2161); // 2710.56 − 550
    expect(sec(res, 'protein')).toBe(135); // 2160.56 × 0.25 ÷ 4 = 135.04
    expect(sec(res, 'carbs')).toBe(243); // 2160.56 × 0.45 ÷ 4 = 243.06
    expect(sec(res, 'fat')).toBe(72); // 2160.56 × 0.30 ÷ 9 = 72.02
    expect(sec(res, 'gain05')).toBe(3261);
    expect(res.warnings).toBeUndefined();
  });

  it('female light activity, maintain: 1370.25 × 1.375 = 1884', () => {
    const res = calculateCalories({ sex: 'female', age: 30, heightCm: 165, weightKg: 65, activity: 'light', goal: 'maintain' });
    expect(res.primary.value).toBe(1884);
    expect(sec(res, 'tdee')).toBe(1884);
  });

  it('never goes below the 1200 kcal floor for women, and warns', () => {
    // BMR 1182.75 × 1.2 = 1419.3; − 1100 = 319.3 → raised to 1200
    const res = calculateCalories({ sex: 'female', age: 25, heightCm: 155, weightKg: 50, activity: 'sedentary', goal: 'lose1' });
    expect(res.primary.value).toBe(1200);
    expect(res.warnings?.some((w) => w.includes('الحد الأدنى'))).toBe(true);
    expect(sec(res, 'lose1')).toBe(1200);
  });

  it('uses Katch-McArdle when body fat is given: 370 + 21.6 × 68 = 1838.8', () => {
    expect(katchMcArdle(80, 15)).toBeCloseTo(1838.8, 6);
    const res = calculateCalories({ sex: 'male', age: 30, heightCm: 175, weightKg: 80, activity: 'sedentary', goal: 'maintain', bodyFatPercent: 15 });
    expect(sec(res, 'bmr')).toBe(1839);
    expect(res.primary.value).toBe(2207); // 1838.8 × 1.2 = 2206.56
  });

  it('rejects out-of-range inputs', () => {
    expect(calculateCalories({ age: 10, heightCm: 175, weightKg: 80 }).error).toBeDefined();
    expect(calculateCalories({ age: 30, heightCm: 90, weightKg: 80 }).error).toBeDefined();
    expect(calculateCalories({ age: 30, heightCm: 175, weightKg: 10 }).error).toBeDefined();
    expect(calculateCalories({ age: 30, heightCm: 175, weightKg: 80, bodyFatPercent: 80 }).error).toBeDefined();
  });

  it('warns teenagers', () => {
    const res = calculateCalories({ sex: 'male', age: 16, heightCm: 170, weightKg: 60, activity: 'moderate', goal: 'maintain' });
    expect(res.warnings?.some((w) => w.includes('المراهقين'))).toBe(true);
  });
});
