import { describe, it, expect } from 'vitest';
import { calculateTimeConverter } from './calculate';

describe('Time Converter Engine', () => {
  it('converts 24 hours to 86400 seconds accurately', () => {
    const result = calculateTimeConverter({ value: 24, fromUnit: 'hours' });
    expect(result.primary.value).toBe(86400);
    expect(result.secondary?.[1].value).toBe(1);
  });

  it('converts 7 days to 1 week', () => {
    const result = calculateTimeConverter({ value: 7, fromUnit: 'days' });
    expect(result.primary.value).toBe(604800);
  });

  it('converts 120 minutes to 2 hours', () => {
    const result = calculateTimeConverter({ value: 120, fromUnit: 'minutes' });
    expect(result.secondary?.[0].value).toBe(2);
  });
});
