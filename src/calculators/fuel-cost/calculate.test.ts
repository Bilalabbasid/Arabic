import { describe, it, expect } from 'vitest';
import { calculateFuelCost } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';
import { COUNTRY_DATA_AE } from '../../data/countries/ae';

describe('Fuel Cost Calculator Engine', () => {
  it('calculates fuel trip cost correctly for Saudi Arabia (91 octane @ 2.18 SAR)', () => {
    // 100 km at 10 L/100km = 10 liters * 2.18 SAR = 21.8 SAR
    const result = calculateFuelCost({ distanceKm: 100, fuelConsumption: 10, fuelGrade: 'octane91' }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBeCloseTo(21.8, 1);
    expect(result.secondary?.[0].value).toBeCloseTo(43.6, 1);
    expect(result.secondary?.[1].value).toBe(10);
  });

  it('calculates round trip accurately', () => {
    const result = calculateFuelCost({ distanceKm: 500, fuelConsumption: 8 }, COUNTRY_DATA_SA);
    // 500 km at 8 L/100km = 40 L * 2.18 = 87.2; return = 174.4
    expect(result.primary.value).toBeCloseTo(87.2, 1);
    expect(result.secondary?.[0].value).toBeCloseTo(174.4, 1);
  });

  it('uses custom fuel price override when specified', () => {
    const result = calculateFuelCost({ distanceKm: 100, fuelConsumption: 10, customFuelPrice: 3.5 }, COUNTRY_DATA_AE);
    expect(result.primary.value).toBe(35);
  });
});
