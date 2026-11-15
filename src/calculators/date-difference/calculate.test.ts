import { describe, it, expect } from 'vitest';
import { calculateDateDifference, calendarDifference, getHijriParts, parseDateInput } from './calculate';

const sec = (res: ReturnType<typeof calculateDateDifference>, id: string) => res.secondary?.find((s) => s.id === id)?.value;

describe('Date Difference Engine', () => {
  it('2026-01-01 → 2026-03-01 = 59 days (31 + 28), 8 weeks and 3 days, 2 months', () => {
    const res = calculateDateDifference({ startDate: '2026-01-01', endDate: '2026-03-01' });
    expect(res.error).toBeUndefined();
    expect(res.primary.value).toBe(59);
    expect(sec(res, 'weeks')).toBe('8 أسابيع و3 أيام');
    expect(sec(res, 'ymd')).toBe('شهران');
  });

  it('including the end day adds one day (60)', () => {
    const res = calculateDateDifference({ startDate: '2026-01-01', endDate: '2026-03-01', includeEndDay: 'yes' });
    expect(res.primary.value).toBe(60);
  });

  it('working days with Fri–Sat weekend: 8 full weeks × 5 + Thu 26 Feb = 41', () => {
    // 1 Jan 2026 is a Thursday; the 3 leftover days are Thu 26, Fri 27, Sat 28 Feb.
    const res = calculateDateDifference({ startDate: '2026-01-01', endDate: '2026-03-01', weekend: 'fri-sat' });
    expect(sec(res, 'workingDays')).toBe(41);
    expect(sec(res, 'weekendDays')).toBe(18);
  });

  it('working days with Sat–Sun weekend: 40 + Thu + Fri = 42', () => {
    const res = calculateDateDifference({ startDate: '2026-01-01', endDate: '2026-03-01', weekend: 'sat-sun' });
    expect(sec(res, 'workingDays')).toBe(42);
  });

  it('leap year: 2024-01-01 → 2025-01-01 = 366 days = 1 year', () => {
    const res = calculateDateDifference({ startDate: '2024-01-01', endDate: '2025-01-01' });
    expect(res.primary.value).toBe(366);
    expect(sec(res, 'ymd')).toBe('سنة');
  });

  it('swaps reversed dates and warns', () => {
    const res = calculateDateDifference({ startDate: '2026-03-01', endDate: '2026-01-01' });
    expect(res.primary.value).toBe(59);
    expect(res.warnings?.length).toBe(1);
  });

  it('month-end clamping: 31 Jan → 1 Mar 2026 = 1 month and 1 day (29 days)', () => {
    const d = calendarDifference({ y: 2026, m: 1, d: 31 }, Date.UTC(2026, 2, 1));
    expect(d).toEqual({ years: 0, months: 1, days: 1 });
  });

  it('shows the Hijri equivalent (1 Jan 2026 falls in Rajab 1447)', () => {
    const h = getHijriParts({ y: 2026, m: 1, d: 1 });
    expect(h.year).toBe(1447);
    expect(h.month).toBe(7);
    const res = calculateDateDifference({ startDate: '2026-01-01', endDate: '2026-03-01' });
    expect(String(res.details?.[0].value)).toContain('1447 هـ');
  });

  it('parses DD/MM/YYYY and rejects invalid dates', () => {
    expect(parseDateInput('01/03/2026')).toEqual({ y: 2026, m: 3, d: 1 });
    expect(parseDateInput('2026-02-30')).toBeNull();
    expect(calculateDateDifference({ startDate: 'abc', endDate: '2026-01-01' }).error).toBeDefined();
  });
});
