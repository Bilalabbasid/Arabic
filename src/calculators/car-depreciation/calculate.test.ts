import { describe, it, expect } from 'vitest';
import { calculateCarDepreciation } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';

describe('Car Depreciation Engine', () => {
  it('calculates 3-year depreciation for mainstream car accurately', () => {
    const result = calculateCarDepreciation({ purchasePrice: 100000, vehicleAgeYears: 3 }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBeCloseTo(64944, 0);
    expect(result.secondary?.[0].value).toBeCloseTo(35056, 0);
  });

  it('applies steeper depreciation for luxury tier', () => {
    const mainstream = calculateCarDepreciation({ purchasePrice: 200000, vehicleAgeYears: 3, brandTier: 'mainstream' }, COUNTRY_DATA_SA);
    const luxury = calculateCarDepreciation({ purchasePrice: 200000, vehicleAgeYears: 3, brandTier: 'luxury' }, COUNTRY_DATA_SA);
    expect(luxury.primary.value).toBeLessThan(mainstream.primary.value);
  });

  it('provides complete 7-year curve breakdown', () => {
    const result = calculateCarDepreciation({ purchasePrice: 100000, vehicleAgeYears: 5 }, COUNTRY_DATA_SA);
    expect(result.breakdown?.rows.length).toBe(7);
  });
});
