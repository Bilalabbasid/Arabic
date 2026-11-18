import { describe, it, expect } from 'vitest';
import { computeRouteInsights } from '@/lib/route-insights';
import { COUNTRY_DATA_SA } from '@/data/countries/sa';
import { COUNTRY_DATA_MA } from '@/data/countries/ma';

const riyadhJeddah = COUNTRY_DATA_SA.routes.find((r) => r.id === 'riyadh-jeddah')!;

describe('route insights', () => {
  const p91 = COUNTRY_DATA_SA.fuel.value!.grades.octane91.pricePerLiter;
  const ins = computeRouteInsights(riyadhJeddah, 570, COUNTRY_DATA_SA, COUNTRY_DATA_SA.routes.slice(1, 4));

  it('uses regular 91 petrol and 8 L/100 km for the headline cost', () => {
    // 950 km × 8 / 100 = 76 L
    expect(ins.liters).toBe(76);
    expect(ins.costOneWay).toBeCloseTo(76 * p91, 2);
  });

  it('cost by car size: 6.5 / 8 / 10.5 / 13.5 L per 100 km', () => {
    expect(ins.byCar.map((c) => c.liters)).toEqual([61.8, 76, 99.8, 128.3]);
    expect(ins.economyVsLargeLiters).toBe(66.5);
  });

  it('120 km/h adds 20% fuel and saves d × 0.1 minutes', () => {
    expect(ins.speed.extraLiters).toBe(15.2);
    expect(ins.speed.minutesSaved).toBe(95); // 950/100 − 950/120 hours = 1.583 h
  });

  it('fuel stops with a 60 L tank used to 85% (51 L)', () => {
    expect(ins.tank.shareOneWay).toBe(127);
    expect(ins.tank.refuelsOneWay).toBe(1); // 76 L → 2 tanks of 51 L
    expect(ins.tank.refuelsRound).toBe(2); // 152 L → 3 tanks
  });

  it('a 15-minute break every 2 hours of driving', () => {
    // 570 min → ceil(4.75) − 1 = 4 breaks → 630 min
    expect(ins.breaks).toEqual({ count: 4, totalMinutes: 630 });
  });

  it('per-passenger split for 2, 3 and 4 people', () => {
    expect(ins.perPassenger.map((p) => p.people)).toEqual([2, 3, 4]);
    expect(ins.perPassenger[1].cost).toBeCloseTo((76 * p91) / 3, 2);
  });

  it('no prices where fuel prices are not official (Morocco), litres still computed', () => {
    const r = COUNTRY_DATA_MA.routes[0];
    const so = computeRouteInsights(r, 60, COUNTRY_DATA_MA, []);
    expect(so.price).toBeUndefined();
    expect(so.costOneWay).toBeUndefined();
    expect(so.perPassenger).toEqual([]);
    expect(so.liters).toBeGreaterThan(0);
  });
});
