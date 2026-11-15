import type { CountryData, IntercityRoute } from '@/data/countries/types';
import { resolveFuelGrade } from '@/calculators/fuel-cost/grades';

/**
 * Route-specific numbers for /{cc}/trip-cost/{route} pages, so each page carries its own facts
 * (cost by car size, speed and AC effects, fuel stops, breaks, EV cost, nearby routes)
 * instead of generic advice repeated on every route.
 */

export const CAR_CLASSES = [
  { id: 'economy', nameAr: 'سيارة صغيرة اقتصادية', l100: 6.5 },
  { id: 'sedan', nameAr: 'سيدان متوسطة', l100: 8 },
  { id: 'suv', nameAr: 'SUV عائلية', l100: 10.5 },
  { id: 'large', nameAr: 'دفع رباعي كبير أو بيك أب', l100: 13.5 },
] as const;

export const SEDAN_L100 = 8;
export const TANK_LITERS = 60;
/** Share of the tank used before refuelling (keeps a reserve). */
export const USABLE_TANK_SHARE = 0.85;
/** Extra fuel at 120 km/h compared with 100 km/h. */
export const SPEED_120_EXTRA = 0.2;
export const AC_EXTRA_MIN = 0.05;
export const AC_EXTRA_MAX = 0.12;
/** Road-safety guidance: a short break about every two hours of driving. */
export const BREAK_EVERY_MIN = 120;
export const BREAK_LENGTH_MIN = 15;
export const EV_KWH_PER_100 = 18;
/** Typical real highway range of a mid-size EV, using ~80% of the battery between charges. */
export const EV_USABLE_RANGE_KM = 320;

export interface RouteInsights {
  liters: number;
  price?: { nameAr: string; perLiter: number };
  costOneWay?: number;
  byCar: Array<{ id: string; nameAr: string; l100: number; liters: number; costOneWay?: number; costRound?: number }>;
  economyVsLargeLiters: number;
  speed: { extraLiters: number; extraCost?: number; minutesSaved: number };
  ac: { minLiters: number; maxLiters: number; minCost?: number; maxCost?: number };
  tank: { shareOneWay: number; refuelsOneWay: number; refuelsRound: number; halfwayKm: number };
  breaks: { count: number; totalMinutes: number };
  perPassenger: Array<{ people: number; cost: number }>;
  ev?: { kwh: number; rate: number; cost: number; chargingStops: number; savingVsSedan?: number };
  nearby: Array<{ route: IntercityRoute; diffKm: number; costOneWay?: number }>;
}

const r1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;

export function computeRouteInsights(
  route: IntercityRoute,
  driveMinutes: number,
  country: CountryData,
  related: IntercityRoute[]
): RouteInsights {
  const d = route.distanceKm;
  const liters = (d * SEDAN_L100) / 100;

  const fuelVerified = country.fuel?.status === 'verified';
  const resolved = fuelVerified && country.fuel.value?.grades ? resolveFuelGrade(country.fuel.value.grades, 'octane91') : null;
  const perLiter = resolved?.grade.pricePerLiter;
  const price = resolved && perLiter ? { nameAr: resolved.grade.nameAr, perLiter } : undefined;
  const cost = (l: number) => (perLiter ? r2(l * perLiter) : undefined);

  const byCar = CAR_CLASSES.map((c) => {
    const l = (d * c.l100) / 100;
    return { id: c.id, nameAr: c.nameAr, l100: c.l100, liters: r1(l), costOneWay: cost(l), costRound: cost(2 * l) };
  });

  const usable = TANK_LITERS * USABLE_TANK_SHARE;
  const refuels = (l: number) => Math.max(0, Math.ceil(l / usable) - 1);

  const breakCount = Math.max(0, Math.ceil(driveMinutes / BREAK_EVERY_MIN) - 1);

  let ev: RouteInsights['ev'];
  const tier = country.electricity?.status === 'verified' ? country.electricity.value?.residentialTiers?.[0] : undefined;
  if (tier && tier.ratePerKwh > 0 && (!perLiter || tier.ratePerKwh < perLiter * 2)) {
    const kwh = (d * EV_KWH_PER_100) / 100;
    const evCost = r2(kwh * tier.ratePerKwh);
    ev = {
      kwh: r1(kwh),
      rate: tier.ratePerKwh,
      cost: evCost,
      chargingStops: Math.max(0, Math.ceil(d / EV_USABLE_RANGE_KM) - 1),
      savingVsSedan: perLiter ? r2(liters * perLiter - evCost) : undefined,
    };
  }

  return {
    liters: r1(liters),
    price,
    costOneWay: cost(liters),
    byCar,
    economyVsLargeLiters: r1(byCar[3].liters - byCar[0].liters),
    speed: {
      extraLiters: r1(liters * SPEED_120_EXTRA),
      extraCost: cost(liters * SPEED_120_EXTRA),
      minutesSaved: Math.round((d / 100 - d / 120) * 60),
    },
    ac: {
      minLiters: r1(liters * AC_EXTRA_MIN),
      maxLiters: r1(liters * AC_EXTRA_MAX),
      minCost: cost(liters * AC_EXTRA_MIN),
      maxCost: cost(liters * AC_EXTRA_MAX),
    },
    tank: {
      shareOneWay: Math.round((liters / TANK_LITERS) * 100),
      refuelsOneWay: refuels(liters),
      refuelsRound: refuels(2 * liters),
      halfwayKm: Math.round(d / 2),
    },
    breaks: { count: breakCount, totalMinutes: driveMinutes + breakCount * BREAK_LENGTH_MIN },
    perPassenger: perLiter ? [2, 3, 4].map((people) => ({ people, cost: r2((liters * perLiter) / people) })) : [],
    ev,
    nearby: related.slice(0, 3).map((r) => ({
      route: r,
      diffKm: r.distanceKm - d,
      costOneWay: cost((r.distanceKm * SEDAN_L100) / 100),
    })),
  };
}
