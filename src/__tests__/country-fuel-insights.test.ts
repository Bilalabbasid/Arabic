import { describe, it, expect } from 'vitest';
import { getCountryFuelInsights, countryFuelFaqs } from '@/lib/country-fuel-insights';
import { COUNTRY_DATA_BH } from '@/data/countries/bh';
import { COUNTRY_DATA_SA } from '@/data/countries/sa';

describe('country fuel insights', () => {
  it('Bahrain: regular 91, tank costs, SAR comparison against the peg', () => {
    const ins = getCountryFuelInsights('bh')!;
    const p = COUNTRY_DATA_BH.fuel.value!.grades.jayyid91.pricePerLiter;
    expect(ins.regular.price).toBe(p);
    expect(ins.per100).toBeCloseTo(8 * p, 2);
    const self = ins.peers!.find((x) => x.self)!;
    expect(self.sar).toBeCloseTo((p / 0.376) * 3.75, 2);
    expect(ins.peers!.some((x) => x.code === 'sa')).toBe(true);
    expect(ins.rank!.position).toBeGreaterThanOrEqual(1);
    expect(ins.rank!.position).toBeLessThanOrEqual(ins.rank!.of);
  });

  it('Saudi Arabia compares with its Gulf neighbours and records an unchanged price', () => {
    const ins = getCountryFuelInsights('sa')!;
    expect(ins.regular.price).toBe(COUNTRY_DATA_SA.fuel.value!.grades.octane91.pricePerLiter);
    expect(ins.peers!.map((x) => x.code)).toEqual(expect.arrayContaining(['ae', 'kw', 'qa', 'bh', 'om']));
    expect(ins.history).toBeDefined();
  });

  it('skips the comparison for parallel-market currencies but keeps the rest', () => {
    const ins = getCountryFuelInsights('lb');
    if (ins) {
      expect(ins.peers).toBeUndefined();
      expect(ins.tanks).toHaveLength(3);
    }
  });

  it('FAQs quote the regular-grade tank cost', () => {
    const ins = getCountryFuelInsights('kw')!;
    const faqs = countryFuelFaqs(ins);
    expect(faqs[0].answer).toContain(String(Math.round(60 * ins.regular.price * 100) / 100));
    expect(faqs.length).toBe(3);
  });
});
