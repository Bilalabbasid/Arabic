import type { IntercityRoute } from '@/data/countries/types';

/**
 * Routes to link from a route page: ones sharing the destination city first, then the origin
 * city, then the rest. Ties are broken by circular distance from the current route in the list,
 * so every route receives inlinks from its neighbours instead of only the first few routes
 * collecting all the links.
 */
export function getRelatedRoutes(
  routes: IntercityRoute[],
  route: IntercityRoute,
  limit = 12
): IntercityRoute[] {
  const n = routes.length;
  const self = routes.findIndex((r) => r.id === route.id);
  return routes
    .map((r, i) => ({
      r,
      score:
        ([r.fromCityAr, r.toCityAr].includes(route.fromCityAr) ? 2 : 0) +
        ([r.fromCityAr, r.toCityAr].includes(route.toCityAr) ? 3 : 0),
      dist: self >= 0 ? (i - self + n) % n : i,
    }))
    .filter((x) => x.r.id !== route.id)
    .sort((a, b) => b.score - a.score || a.dist - b.dist)
    .slice(0, limit)
    .map((x) => x.r);
}
