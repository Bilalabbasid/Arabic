import { describe, it, expect } from 'vitest';
import { calculateOvulation, dateRangeText } from './calculate';
import { GREGORIAN_MONTHS } from '../hijri-converter/calculate';

const sec = (res: ReturnType<typeof calculateOvulation>, id: string) => res.secondary?.find((s) => s.id === id)?.value;
const JAN = GREGORIAN_MONTHS[0];
const FEB = GREGORIAN_MONTHS[1];
const OCT = GREGORIAN_MONTHS[9];

describe('Ovulation Engine', () => {
  it('28-day cycle from 2026-01-01: ovulation 15 Jan (cycle day 15), fertile 10–16 Jan', () => {
    const res = calculateOvulation({ lmpDate: '2026-01-01', cycleLength: 28 });
    expect(res.error).toBeUndefined();
    expect(res.primary.value).toBe('2026-01-15');
    expect(sec(res, 'cycleDay')).toBe(15);
    expect(sec(res, 'fertileWindow')).toBe(`10–16 ${JAN} 2026`);
    expect(sec(res, 'peakDays')).toBe(`13–15 ${JAN} 2026`);
    expect(String(sec(res, 'nextPeriod'))).toContain(`29 ${JAN} 2026`);
    expect(String(sec(res, 'dueIfConceived'))).toContain(`8 ${OCT} 2026`); // LMP + 280
    expect(res.warnings).toBeUndefined();
  });

  it('35-day cycle: ovulation is 21 days after LMP (22 Jan), next period 5 Feb', () => {
    const res = calculateOvulation({ lmpDate: '2026-01-01', cycleLength: 35 });
    expect(res.primary.value).toBe('2026-01-22');
    expect(sec(res, 'cycleDay')).toBe(22);
    expect(sec(res, 'fertileWindow')).toBe(`17–23 ${JAN} 2026`);
    expect(String(sec(res, 'nextPeriod'))).toContain(`5 ${FEB} 2026`);
    expect(String(sec(res, 'dueIfConceived'))).toContain(`15 ${OCT} 2026`); // LMP + 287
  });

  it('fertile window spanning two months', () => {
    const res = calculateOvulation({ lmpDate: '2026-01-20', cycleLength: 28 });
    expect(res.primary.value).toBe('2026-02-03');
    expect(sec(res, 'fertileWindow')).toBe(`29 ${JAN} – 4 ${FEB} 2026`);
  });

  it('crosses the year boundary', () => {
    const res = calculateOvulation({ lmpDate: '2026-12-25', cycleLength: 28 });
    expect(res.primary.value).toBe('2027-01-08');
    expect(dateRangeText(Date.UTC(2026, 11, 30), Date.UTC(2027, 0, 2))).toContain('2026 – 2');
  });

  it('upcoming cycles table repeats every cycle length', () => {
    const res = calculateOvulation({ lmpDate: '2026-01-01', cycleLength: 28, cyclesToShow: 3 });
    const rows = res.breakdown!.rows;
    expect(rows).toHaveLength(3);
    expect(rows[1].values.periodStart).toBe(`29 ${JAN}`);
    expect(rows[1].values.ovulation).toBe(`12 ${FEB}`);
    expect(rows[2].values.periodStart).toBe(`26 ${FEB}`);
  });

  it('warns on cycles outside 21–35 days and rejects invalid input', () => {
    expect(calculateOvulation({ lmpDate: '2026-01-01', cycleLength: 40 }).warnings?.length).toBe(1);
    expect(calculateOvulation({ lmpDate: '2026-01-01', cycleLength: 50 }).error).toBeDefined();
    expect(calculateOvulation({ lmpDate: 'not a date', cycleLength: 28 }).error).toBeDefined();
  });
});
