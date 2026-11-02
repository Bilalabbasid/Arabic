import { describe, it, expect } from 'vitest';
import { calculateFuelPrices } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';
import { COUNTRY_DATA_AE } from '../../data/countries/ae';

describe('Fuel Prices Calculator Engine', () => {
  it('calculates full tank cost for 50L in Saudi Arabia (91 octane @ 2.18 SAR)', () => {
    const result = calculateFuelPrices({ tankSizeLiters: 50, fuelGrade: 'octane91' }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBeCloseTo(109, 1);
    expect(result.secondary?.[1].value).toBeCloseTo(54.5, 1);
  });

  it('provides complete fuel grades breakdown table', () => {
    const result = calculateFuelPrices({ tankSizeLiters: 60 }, COUNTRY_DATA_SA);
    expect(result.breakdown?.rows.length).toBeGreaterThanOrEqual(3);
  });

  it('calculates tank fill cost in UAE accurately', () => {
    const result = calculateFuelPrices({ tankSizeLiters: 60, fuelGrade: 'special95' }, COUNTRY_DATA_AE);
    expect(result.primary.value).toBeGreaterThan(150);
  });
});
