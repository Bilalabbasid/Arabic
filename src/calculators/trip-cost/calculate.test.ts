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
    expect(result.secondary?.[1].value).toBeCloseTo(21.8, 1);
  });

  it('calculates Cairo to Alexandria trip cost in Egypt', () => {
    const result = calculateTripCost({ routeId: 'cairo-alexandria', fuelConsumption: 8 }, COUNTRY_DATA_EG);
    expect(result.primary.value).toBeGreaterThan(0);
    expect(result.secondary?.[0].value).toBe(Number(result.primary.value) * 2);
  });

  it('uses the price the visitor typed instead of the stored one', () => {
    // 950 km × 10 L/100km = 95 L × 3.00 = 285
    const result = calculateTripCost({ routeId: 'riyadh-jeddah', fuelConsumption: 10, customFuelPrice: 3 }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBeCloseTo(285, 6);
  });

  it('a typed distance overrides the selected route', () => {
    // 100 km × 10 L/100km = 10 L × 2.00 = 20
    const result = calculateTripCost({ routeId: 'riyadh-jeddah', customDistanceKm: 100, fuelConsumption: 10, customFuelPrice: 2 }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBeCloseTo(20, 6);
  });

  it('honours the diesel choice in Egypt (solar)', () => {
    const solar = COUNTRY_DATA_EG.fuel.value!.grades.solar.pricePerLiter;
    const result = calculateTripCost({ customDistanceKm: 100, fuelConsumption: 10, fuelGrade: 'diesel' }, COUNTRY_DATA_EG);
    expect(result.primary.value).toBeCloseTo(10 * solar, 6);
  });
});
