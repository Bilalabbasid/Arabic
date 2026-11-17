/**
 * Title test on Saudi route pages (started 2026-11-17, read the result after 14 days).
 *
 * Why: route pages rank around position 8 for "كم تبعد X عن Y" but get no clicks. Google's own
 * answer box already gives distance and time, and so did our title. Group B leads with the fuel
 * cost, which Google's box does not show; group A keeps the distance-and-time title as the control.
 *
 * Routes added after the split (27 Saudi routes on 2026-11-18) are outside the test: leave them out
 * of both groups when comparing.
 *
 * Groups were split on 24-hour impressions (A 552, B 548) from the Search Console export of
 * 2026-11-17. Compare clicks and CTR per group in Search Console with a page filter
 * (regex on the ids below) over the same dates. Remove this file and the branch in the route
 * page once a winner is chosen.
 */
export const ROUTE_TITLE_TEST_START = '2026-11-17';

export const COST_FIRST_TITLE_ROUTES = new Set([
  'riyadh-aflaj', 'riyadh-hail', 'hail-qassim', 'tabuk-tayma', 'hail-tabuk', 'riyadh-abha',
  'riyadh-hafar-albatin', 'riyadh-tabuk', 'riyadh-rumah', 'jeddah-rabigh', 'riyadh-muzahmiyah',
  'riyadh-huraymila', 'riyadh-afif', 'taif-baha', 'riyadh-shaqra', 'riyadh-makkah', 'dammam-ahsa',
  'makkah-madinah', 'jeddah-madinah', 'riyadh-quwayiyah', 'dammam-khafji', 'dammam-nairyah', 'makkah-taif',
]);

/** Group B title: fuel cost first, then distance and time. Falls back to a shorter form past 65 characters. */
export function costFirstRouteTitle(
  from: string,
  to: string,
  km: number,
  duration: string,
  costOneWay: number,
  currencyWord: string
): string {
  const cost = Math.round(costOneWay).toLocaleString('en-US');
  const full = `${from} – ${to}: بنزين ${cost} ${currencyWord}، ${km} كم و${duration} بالسيارة`;
  if (full.length <= 65) return full;
  const short = `${from} – ${to}: بنزين ${cost} ${currencyWord}، ${km} كم و${duration}`;
  return short.length <= 65 ? short : `${from} – ${to}: بنزين ${cost} ${currencyWord}، المسافة ${km} كم`;
}
