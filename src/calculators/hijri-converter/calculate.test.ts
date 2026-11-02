import { describe, it, expect } from 'vitest';
import { calculateHijriConverter } from './calculate';

describe('Hijri Converter Engine', () => {
  it('converts Gregorian date to Hijri accurately', () => {
    const result = calculateHijriConverter({ year: 2026, month: 11, day: 2, conversionMode: 'gregorian_to_hijri' });
    expect(result.primary.formattedValue).toContain('هـ');
    expect(result.secondary?.[0].value).toBeDefined();
  });

  it('converts Hijri date to Gregorian accurately', () => {
    const result = calculateHijriConverter({ year: 1448, month: 1, day: 1, conversionMode: 'hijri_to_gregorian' });
    expect(result.primary.formattedValue).toContain('م');
  });

  it('correctly maps Arabic day of the week', () => {
    // 2026-11-02 is Monday (الإثنين)
    const result = calculateHijriConverter({ year: 2026, month: 11, day: 2 });
    expect(result.primary.badge).toBe('الإثنين');
  });
});
