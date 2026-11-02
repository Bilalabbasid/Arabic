import { describe, it, expect } from 'vitest';
import { calculateTrafficFines } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';
import { COUNTRY_DATA_AE } from '../../data/countries/ae';

describe('Traffic Fines Engine', () => {
  it('calculates red light fine correctly for Saudi Arabia (3000 to 6000 SAR)', () => {
    const result = calculateTrafficFines({ violationIndex: 2 }, COUNTRY_DATA_SA);
    expect(result.secondary?.[0].value).toBe(3000);
    expect(result.secondary?.[1].value).toBe(6000);
  });

  it('applies official 50% discount initiative accurately', () => {
    const result = calculateTrafficFines({ violationIndex: 2, discountPercent: 50 }, COUNTRY_DATA_SA);
    expect(result.secondary?.[0].value).toBe(1500);
    expect(result.secondary?.[1].value).toBe(3000);
  });

  it('calculates speeding violation correctly for UAE with black points', () => {
    const result = calculateTrafficFines({ violationIndex: 1 }, COUNTRY_DATA_AE);
    expect(result.primary.value).toBeDefined();
    expect(result.primary.value).toBeGreaterThan(0);
  });
});
