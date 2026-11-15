import { describe, it, expect } from 'vitest';
import { calculateIdealWeight } from './calculate';

const sec = (res: ReturnType<typeof calculateIdealWeight>, id: string) => res.secondary?.find((s) => s.id === id)?.value;

describe('Ideal Weight Engine', () => {
  // 180 cm = 70.866 in → 10.866 in above 5 ft
  it('male 180 cm: Devine 50 + 2.3 × 10.866 = 75.0 kg', () => {
    const res = calculateIdealWeight({ heightCm: 180, sex: 'male' });
    expect(sec(res, 'devine')).toBe(75);
    expect(sec(res, 'robinson')).toBe(72.6); // 52 + 1.9 × 10.866 = 72.65
    expect(sec(res, 'miller')).toBe(71.5); // 56.2 + 1.41 × 10.866 = 71.52
    expect(sec(res, 'hamwi')).toBe(77.3); // 48 + 2.7 × 10.866 = 77.34
    expect(sec(res, 'bmiRange')).toBe('59.9 – 80.7'); // 18.5 × 3.24, 24.9 × 3.24
    expect(res.primary.value).toBe(74.1); // (74.99 + 72.65 + 71.52 + 77.34) / 4 = 74.12
  });

  it('female 165 cm: Devine 56.9, Robinson 57.4, Miller 59.8, Hamwi 56.4', () => {
    // 165 cm = 64.961 in → 4.961 in above 5 ft
    const res = calculateIdealWeight({ heightCm: 165, sex: 'female' });
    expect(sec(res, 'devine')).toBe(56.9);
    expect(sec(res, 'robinson')).toBe(57.4);
    expect(sec(res, 'miller')).toBe(59.8); // 53.1 + 1.36 × 4.961 = 59.85 (59.846)
    expect(sec(res, 'hamwi')).toBe(56.4);
    expect(sec(res, 'bmiRange')).toBe('50.4 – 67.8'); // 18.5 × 2.7225, 24.9 × 2.7225
  });

  it('Hamwi frame adjustment ±10%', () => {
    const small = calculateIdealWeight({ heightCm: 180, sex: 'male', frame: 'small' });
    const large = calculateIdealWeight({ heightCm: 180, sex: 'male', frame: 'large' });
    expect(sec(small, 'hamwi')).toBe(69.6); // 77.34 × 0.9
    expect(sec(large, 'hamwi')).toBe(85.1); // 77.34 × 1.1
  });

  it('compares current weight to the healthy range', () => {
    const res = calculateIdealWeight({ heightCm: 180, sex: 'male', currentWeightKg: 90 });
    expect(String(sec(res, 'currentStatus'))).toContain('أعلى');
  });

  it('warns for minors and rejects out-of-range height', () => {
    expect(calculateIdealWeight({ heightCm: 170, sex: 'male', age: 15 }).warnings?.length).toBe(1);
    expect(calculateIdealWeight({ heightCm: 80 }).error).toBeDefined();
  });
});
