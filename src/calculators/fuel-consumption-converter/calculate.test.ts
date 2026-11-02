import { describe, it, expect } from 'vitest';
import { calculateFuelConsumptionConverter } from './calculate';

describe('Fuel Consumption Converter Engine', () => {
  it('converts km/L to L/100km accurately (10 km/L = 10 L/100km)', () => {
    const result = calculateFuelConsumptionConverter({ value: 10, fromUnit: 'km_l' });
    expect(result.primary.value).toBe(10);
    expect(result.secondary?.[0].value).toBe(10);
  });

  it('converts 25 MPG US to L/100km (~9.41 L/100km)', () => {
    const result = calculateFuelConsumptionConverter({ value: 25, fromUnit: 'mpg_us' });
    expect(result.primary.value).toBeCloseTo(9.41, 1);
  });

  it('rates high-efficiency vehicles (>= 16 km/L) as excellent', () => {
    const result = calculateFuelConsumptionConverter({ value: 18, fromUnit: 'km_l' });
    expect(result.primary.badge).toContain('ممتاز');
  });
});
