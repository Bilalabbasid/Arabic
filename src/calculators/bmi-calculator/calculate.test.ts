import { describe, it, expect } from 'vitest';
import { calculateBmi } from './calculate';

describe('BMI Calculator Engine', () => {
  it('calculates BMI correctly (75kg, 175cm = 24.5)', () => {
    const result = calculateBmi({ weightKg: 75, heightCm: 175 });
    expect(result.primary.value).toBeCloseTo(24.49, 1);
    expect(result.secondary?.[0].value).toContain('طبيعي');
  });

  it('detects overweight accurately (>25)', () => {
    const result = calculateBmi({ weightKg: 85, heightCm: 175 });
    expect(result.primary.value).toBeGreaterThan(25);
    expect(result.secondary?.[0].value).toContain('زيادة');
  });

  it('detects underweight (<18.5)', () => {
    const result = calculateBmi({ weightKg: 50, heightCm: 175 });
    expect(result.primary.value).toBeLessThan(18.5);
    expect(result.secondary?.[0].value).toContain('نقص');
  });
});
