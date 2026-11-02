import { describe, it, expect } from 'vitest';
import { calculateLengthConverter } from './calculate';

describe('Length Converter Engine', () => {
  it('converts 10 km to 10,000 meters accurately', () => {
    const result = calculateLengthConverter({ value: 10, fromUnit: 'kilometer' });
    expect(result.primary.value).toBe(10000);
  });

  it('converts 1 mile to ~1609.34 meters', () => {
    const result = calculateLengthConverter({ value: 1, fromUnit: 'mile' });
    expect(result.primary.value).toBeCloseTo(1609.344, 2);
  });

  it('converts 100 inches to meters', () => {
    const result = calculateLengthConverter({ value: 100, fromUnit: 'inch' });
    expect(result.primary.value).toBeCloseTo(2.54, 2);
  });
});
