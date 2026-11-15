import { describe, it, expect } from 'vitest';
import { calculatePregnancy, pregnancyMonthForWeek, trimesterForWeeks } from './calculate';

const sec = (res: ReturnType<typeof calculatePregnancy>, id: string) => res.secondary?.find((s) => s.id === id)?.value;

describe('Pregnancy Engine', () => {
  it("Naegele's rule: LMP 1 Jan 2026 → due 8 Oct 2026 (+7 days, −3 months, +1 year)", () => {
    const res = calculatePregnancy({ method: 'lmp', startDate: '2026-01-01', cycleLength: 28, asOfDate: '2026-05-01' });
    expect(res.error).toBeUndefined();
    expect(res.primary.value).toBe('2026-10-08');
  });

  it('gestational age on 1 May 2026 = 120 days = 17 weeks and 1 day, week 18, month 5, 2nd trimester', () => {
    const res = calculatePregnancy({ method: 'lmp', startDate: '2026-01-01', asOfDate: '2026-05-01' });
    expect(sec(res, 'gestationalAge')).toBe('17 أسبوعاً ويوم واحد');
    expect(sec(res, 'currentWeek')).toBe(18);
    expect(sec(res, 'month')).toBe('الشهر الخامس');
    expect(sec(res, 'trimester')).toBe('الثلث الثاني');
    expect(sec(res, 'remainingDays')).toBe(160);
  });

  it('a 35-day cycle moves the due date 7 days later', () => {
    const res = calculatePregnancy({ method: 'lmp', startDate: '2026-01-01', cycleLength: 35, asOfDate: '2026-05-01' });
    expect(res.primary.value).toBe('2026-10-15');
  });

  it('conception and IVF dates give the same due date as the matching LMP', () => {
    const asOfDate = '2026-05-01';
    expect(calculatePregnancy({ method: 'conception', startDate: '2026-01-15', asOfDate }).primary.value).toBe('2026-10-08');
    expect(calculatePregnancy({ method: 'ivf3', startDate: '2026-01-18', asOfDate }).primary.value).toBe('2026-10-08');
    expect(calculatePregnancy({ method: 'ivf5', startDate: '2026-01-20', asOfDate }).primary.value).toBe('2026-10-08');
  });

  it('cycle length is ignored for non-LMP methods', () => {
    const res = calculatePregnancy({ method: 'conception', startDate: '2026-01-15', cycleLength: 40, asOfDate: '2026-05-01' });
    expect(res.primary.value).toBe('2026-10-08');
  });

  it('a date after the calculation date warns and still gives the due date', () => {
    const res = calculatePregnancy({ method: 'lmp', startDate: '2026-06-01', asOfDate: '2026-05-01' });
    expect(res.primary.value).toBe('2027-03-08');
    expect(res.warnings?.length).toBe(1);
    expect(res.secondary?.length).toBe(0);
  });

  it('warns past 42 weeks', () => {
    const res = calculatePregnancy({ method: 'lmp', startDate: '2026-01-01', asOfDate: '2026-11-01' });
    expect(res.warnings?.[0]).toContain('42');
  });

  it('rejects invalid dates and cycle lengths', () => {
    expect(calculatePregnancy({ startDate: '2026-02-30' }).error).toBeDefined();
    expect(calculatePregnancy({ startDate: '2026-01-01', cycleLength: 60 }).error).toBeDefined();
  });

  it('week-to-month and trimester tables', () => {
    expect([4, 5, 13, 14, 22, 23, 27, 28, 31, 32, 35, 36, 40].map(pregnancyMonthForWeek)).toEqual([1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9]);
    expect([13, 14, 27, 28].map(trimesterForWeeks)).toEqual([1, 2, 2, 3]);
  });

  it('shows the Hijri due date', () => {
    const res = calculatePregnancy({ method: 'lmp', startDate: '2026-01-01', asOfDate: '2026-05-01' });
    expect(String(res.primary.helpText)).toContain('هـ');
  });
});
