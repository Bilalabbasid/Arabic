import { describe, it, expect } from 'vitest';
import { calculateTripCost } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';
import { COUNTRY_DATA_EG } from '../../data/countries/eg';

describe('Trip Cost Calculator Engine', () => {
  it('calculates Riyadh to Jeddah trip cost accurately', () => {
    const result = calculateTripCost({ routeId: 'riyadh-jeddah', fuelConsumption: 10 }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBeCloseTo(207.1, 1);
  });

  it('splits trip cost per passenger evenly', () => {
    const result = calculateTripCost({ routeId: 'riyadh-dammam', fuelConsumption: 10, passengersCount: 4 }, COUNTRY_DATA_SA);
    expect(result.secondary?.[1].value).toBeCloseTo(21.53, 1);
  });

  it('calculates Cairo to Alexandria trip cost in Egypt', () => {
    const result = calculateTripCost({ routeId: 'cairo-alexandria', fuelConsumption: 8 }, COUNTRY_DATA_EG);
    expect(result.primary.value).toBeGreaterThan(0);
    expect(result.secondary?.[0].value).toBe(result.primary.value * 2);
  });
});
