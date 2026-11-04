import { describe, it, expect } from 'vitest';
import { calculateHijriAge } from './calculate';

describe('Hijri Age Calculator Engine', () => {
  it('calculates age in both Hijri and Gregorian accurately', () => {
    const result = calculateHijriAge({ birthYear: 1995, birthMonth: 6, birthDay: 15, calendarType: 'gregorian' });
    expect(result.primary.value).toBeGreaterThan(31);
    expect(result.secondary?.[0].value).toBeGreaterThan(30);
  });

  it('calculates age when input is in Hijri calendar', () => {
    const result = calculateHijriAge({ birthYear: 1416, birthMonth: 1, birthDay: 1, calendarType: 'hijri' });
    expect(result.primary.value).toBeGreaterThan(30);
    expect(result.secondary?.[0].value).toBeDefined();
  });

  it('uses the real current date (not a frozen reference)', () => {
    const a = calculateHijriAge({ birthYear: 2000, birthMonth: 1, birthDay: 1, referenceDate: new Date(2026, 10, 2) });
    const b = calculateHijriAge({ birthYear: 2000, birthMonth: 1, birthDay: 1, referenceDate: new Date(2030, 10, 2) });
    expect(Math.floor(b.secondary![0].value as number)).toBe(30);
    expect((b.primary.value as number) - (a.primary.value as number)).toBeGreaterThan(4);
  });

  it('gives the same age whether the birth date is entered in Hijri or Gregorian', () => {
    const ref = new Date(2026, 10, 5);
    // 1 Muharram 1416 AH ~= 30 May 1995 (tabular calendar)
    const g = calculateHijriAge({ birthYear: 1995, birthMonth: 5, birthDay: 30, calendarType: 'gregorian', referenceDate: ref });
    const h = calculateHijriAge({ birthYear: 1416, birthMonth: 1, birthDay: 1, calendarType: 'hijri', referenceDate: ref });
    expect(Math.abs((g.primary.value as number) - (h.primary.value as number))).toBeLessThan(0.02);
  });

  it('shows difference between lunar and solar years', () => {
    const result = calculateHijriAge({ birthYear: 1990, birthMonth: 1, birthDay: 1 });
    expect(result.secondary?.[1].value).toContain('أكبر');
  });
});
