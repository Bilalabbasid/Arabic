import { describe, it, expect } from 'vitest';
import { calculateEvVsPetrol } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';
import { COUNTRY_DATA_EG } from '../../data/countries/eg';

describe('EV vs Petrol Running Cost Engine', () => {
  it('calculates annual fuel vs EV savings in Saudi Arabia correctly', () => {
    const result = calculateEvVsPetrol({ annualKm: 20000 }, COUNTRY_DATA_SA);
    expect(result.secondary?.[0].value).toBeCloseTo(3706, 0);
    expect(result.secondary?.[1].value).toBeCloseTo(648, 0);
    expect(result.primary.value).toBeCloseTo(3058, 0);
  });

  it('scales savings proportionally with annual mileage', () => {
    const result = calculateEvVsPetrol({ annualKm: 40000 }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBeCloseTo(6116, 0);
  });

  it('calculates savings in Egypt using local tariffs', () => {
    const result = calculateEvVsPetrol({ annualKm: 15000 }, COUNTRY_DATA_EG);
    expect(result.primary.value).toBeGreaterThan(0);
  });
});
