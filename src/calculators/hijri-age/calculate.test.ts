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

  it('shows difference between lunar and solar years', () => {
    const result = calculateHijriAge({ birthYear: 1990, birthMonth: 1, birthDay: 1 });
    expect(result.secondary?.[1].value).toContain('أكبر');
  });
});
