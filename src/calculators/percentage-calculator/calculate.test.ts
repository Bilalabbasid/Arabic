import { describe, it, expect } from 'vitest';
import { calculatePercentage } from './calculate';

describe('Percentage Calculator Engine', () => {
  it('calculates 15% of 200 = 30 correctly', () => {
    const result = calculatePercentage({ percentage: 15, totalNumber: 200, calculationType: 'percent_of' });
    expect(result.primary.value).toBe(30);
  });

  it('calculates what percentage is 30 of 120 = 25%', () => {
    const result = calculatePercentage({ percentage: 30, totalNumber: 120, calculationType: 'is_what_percent_of' });
    expect(result.primary.value).toBe(25);
  });

  it('calculates percentage increase from 100 to 125 = +25%', () => {
    const result = calculatePercentage({ percentage: 0, totalNumber: 100, secondaryNumber: 125, calculationType: 'percent_change' });
    expect(result.primary.value).toBe(25);
  });
});
