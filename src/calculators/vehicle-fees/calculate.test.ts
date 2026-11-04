import { describe, it, expect } from 'vitest';
import { calculateVehicleFees } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';
import { COUNTRY_DATA_KW } from '../../data/countries/kw';

describe('Vehicle Fees Engine', () => {
  it('calculates Saudi registration and inspection fees for 3 years accurately', () => {
    const result = calculateVehicleFees({ renewalYears: 3, includeInspection: true }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBe(415);
    expect(result.secondary?.[0].value).toBe(300);
    expect(result.secondary?.[1].value).toBe(115);
  });

  it('calculates 1 year renewal without inspection', () => {
    const result = calculateVehicleFees({ renewalYears: 1, includeInspection: false }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBe(100);
    expect(result.secondary?.[1].value).toBe(0);
  });

  it('calculates Kuwait vehicle registration fees accurately', () => {
    const result = calculateVehicleFees({ renewalYears: 2, includeInspection: true }, COUNTRY_DATA_KW);
    // 10 KWD * 2 + 10 inspection = 30 KWD
    expect(result.primary.value).toBe(30);
  });
});
