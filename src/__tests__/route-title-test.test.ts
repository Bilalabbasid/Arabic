import { describe, it, expect } from 'vitest';
import { COST_FIRST_TITLE_ROUTES, costFirstRouteTitle } from '@/lib/seo/route-title-test';
import { COUNTRY_DATA_SA } from '@/data/countries/sa';

describe('route title test', () => {
  it('test group is half of the Saudi routes and every id exists', () => {
    const ids = new Set(COUNTRY_DATA_SA.routes.map((r) => r.id));
    expect(COST_FIRST_TITLE_ROUTES.size).toBe(23);
    expect(ids.size).toBe(46);
    for (const id of COST_FIRST_TITLE_ROUTES) expect(ids.has(id), id).toBe(true);
  });

  it('cost-first title leads with the fuel cost and stays within 65 characters', () => {
    const t = costFirstRouteTitle('الرياض', 'الأفلاج', 293, '3 ساعات و35 دقيقة', 51.1, 'ريال');
    expect(t).toBe('الرياض – الأفلاج: بنزين 51 ريال، 293 كم و3 ساعات و35 دقيقة');
    expect(t.length).toBeLessThanOrEqual(65);
    const long = costFirstRouteTitle('الرياض', 'حفر الباطن', 490, '5 ساعات و10 دقائق', 85.4, 'ريال');
    expect(long.length).toBeLessThanOrEqual(65);
    expect(long.startsWith('الرياض – حفر الباطن: بنزين 85 ريال')).toBe(true);
  });
});
