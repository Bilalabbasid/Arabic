import { describe, it, expect } from 'vitest';
import {
  calculateLengthConverter,
  calculateTimeConverter,
  breakDownDuration,
  formatConverterNumber,
  LENGTH_UNITS,
  TIME_UNITS,
} from '@/lib/calculators/converters';

describe('Universal Length Converter Engine', () => {
  it('should verify exact international constants relative to metres', () => {
    expect(LENGTH_UNITS.in.factorToBase).toBe(0.0254);
    expect(LENGTH_UNITS.ft.factorToBase).toBe(0.3048);
    expect(LENGTH_UNITS.yd.factorToBase).toBe(0.9144);
    expect(LENGTH_UNITS.mi.factorToBase).toBe(1609.344);
    expect(LENGTH_UNITS.km.factorToBase).toBe(1000);
    expect(LENGTH_UNITS.cm.factorToBase).toBe(0.01);
    expect(LENGTH_UNITS.mm.factorToBase).toBe(0.001);
    expect(LENGTH_UNITS.m.factorToBase).toBe(1);
  });

  it('should accurately convert 1 inch to 2.54 cm', () => {
    const res = calculateLengthConverter({ value: 1, fromUnit: 'in', toUnit: 'cm', precision: 4 });
    expect(res.primary.value).toBe(2.54);
    expect(res.primary.formattedValue).toBe('2.54');
    expect(res.primary.unit).toBe('سم');
  });

  it('should accurately convert 10 inches to 25.4 cm', () => {
    const res = calculateLengthConverter({ value: 10, fromUnit: 'in', toUnit: 'cm', precision: 4 });
    expect(res.primary.value).toBe(25.4);
    expect(res.primary.formattedValue).toBe('25.4');
  });

  it('should accurately convert 2.54 cm to 1 inch', () => {
    const res = calculateLengthConverter({ value: 2.54, fromUnit: 'cm', toUnit: 'in', precision: 4 });
    expect(res.primary.value).toBeCloseTo(1, 10);
    expect(res.primary.formattedValue).toBe('1');
  });

  it('should accurately convert 100 cm to inches (approx 39.370079)', () => {
    const res = calculateLengthConverter({ value: 100, fromUnit: 'cm', toUnit: 'in', precision: 6 });
    expect(res.primary.value).toBeCloseTo(39.37007874, 5);
    expect(res.primary.formattedValue).toBe('39.370079');
  });

  it('should accurately convert 1 mile to 1.609344 km', () => {
    const res = calculateLengthConverter({ value: 1, fromUnit: 'mi', toUnit: 'km', precision: 6 });
    expect(res.primary.value).toBe(1.609344);
    expect(res.primary.formattedValue).toBe('1.609344');
  });

  it('should accurately convert 10 miles to 16.09344 km', () => {
    const res = calculateLengthConverter({ value: 10, fromUnit: 'mi', toUnit: 'km', precision: 6 });
    expect(res.primary.value).toBe(16.09344);
    expect(res.primary.formattedValue).toBe('16.09344');
  });

  it('should accurately convert 1 km to miles (approx 0.621371)', () => {
    const res = calculateLengthConverter({ value: 1, fromUnit: 'km', toUnit: 'mi', precision: 6 });
    expect(res.primary.value).toBeCloseTo(0.62137119, 5);
    expect(res.primary.formattedValue).toBe('0.621371');
  });

  it('should accurately convert 1 km to inches (approx 39,370.079)', () => {
    const res = calculateLengthConverter({ value: 1, fromUnit: 'km', toUnit: 'in', precision: 3 });
    expect(res.primary.value).toBeCloseTo(39370.0787, 2);
    expect(res.primary.formattedValue).toBe('39,370.079');
  });

  it('should accurately convert 1 metre to feet (approx 3.28084)', () => {
    const res = calculateLengthConverter({ value: 1, fromUnit: 'm', toUnit: 'ft', precision: 5 });
    expect(res.primary.value).toBeCloseTo(3.2808398, 4);
    expect(res.primary.formattedValue).toBe('3.28084');
  });

  it('should accurately convert 1 yard to metres (0.9144 m)', () => {
    const res = calculateLengthConverter({ value: 1, fromUnit: 'yd', toUnit: 'm', precision: 4 });
    expect(res.primary.value).toBe(0.9144);
    expect(res.primary.formattedValue).toBe('0.9144');
  });

  it('should verify round-trip consistency across all length pairs', () => {
    const units = Object.keys(LENGTH_UNITS);
    const testValue = 42.5;

    for (const u1 of units) {
      for (const u2 of units) {
        const step1 = calculateLengthConverter({ value: testValue, fromUnit: u1, toUnit: u2 });
        const step2 = calculateLengthConverter({ value: step1.primary.value, fromUnit: u2, toUnit: u1 });
        expect(Number(step2.primary.value)).toBeCloseTo(testValue, 5);
      }
    }
  });

  it('should handle zero gracefully', () => {
    const res = calculateLengthConverter({ value: 0, fromUnit: 'm', toUnit: 'km' });
    expect(res.primary.value).toBe(0);
    expect(res.primary.formattedValue).toBe('0');
    expect(res.error).toBeUndefined();
  });

  it('should handle invalid/NaN input gracefully', () => {
    const res = calculateLengthConverter({ value: 'invalid_number', fromUnit: 'm', toUnit: 'km' });
    expect(res.error).toBeDefined();
    expect(res.primary.formattedValue).toBe('-');
  });

  it('should include full secondary conversions table for all other units', () => {
    const res = calculateLengthConverter({ value: 10, fromUnit: 'in', toUnit: 'cm' });
    expect(res.secondary).toBeDefined();
    expect(res.secondary?.length).toBe(7); // 8 total units minus toUnit (cm)
  });
});

describe('Universal Time Converter Engine', () => {
  it('should accurately convert 60 seconds to 1 minute', () => {
    const res = calculateTimeConverter({ value: 60, fromUnit: 's', toUnit: 'min' });
    expect(res.primary.value).toBe(1);
    expect(res.primary.formattedValue).toBe('1');
    expect(res.primary.unit).toBe('د');
  });

  it('should accurately convert 3600 seconds to 1 hour', () => {
    const res = calculateTimeConverter({ value: 3600, fromUnit: 's', toUnit: 'hr' });
    expect(res.primary.value).toBe(1);
    expect(res.primary.formattedValue).toBe('1');
  });

  it('should accurately convert 86400 seconds to 1 day', () => {
    const res = calculateTimeConverter({ value: 86400, fromUnit: 's', toUnit: 'day' });
    expect(res.primary.value).toBe(1);
    expect(res.primary.formattedValue).toBe('1');
  });

  it('should accurately convert 604800 seconds to 1 week', () => {
    const res = calculateTimeConverter({ value: 604800, fromUnit: 's', toUnit: 'week' });
    expect(res.primary.value).toBe(1);
    expect(res.primary.formattedValue).toBe('1');
  });

  it('should accurately convert 90 minutes to 1.5 hours', () => {
    const res = calculateTimeConverter({ value: 90, fromUnit: 'min', toUnit: 'hr', precision: 2 });
    expect(res.primary.value).toBe(1.5);
    expect(res.primary.formattedValue).toBe('1.5');
  });

  it('should accurately convert 48 hours to 2 days', () => {
    const res = calculateTimeConverter({ value: 48, fromUnit: 'hr', toUnit: 'day', precision: 2 });
    expect(res.primary.value).toBe(2);
    expect(res.primary.formattedValue).toBe('2');
  });

  it('should support year conventions accurately', () => {
    // Common year (365 days)
    const commonRes = calculateTimeConverter({
      value: 1,
      fromUnit: 'year',
      toUnit: 'day',
      yearConvention: 'common',
    });
    expect(commonRes.primary.value).toBe(365);

    // Julian year (365.25 days)
    const julianRes = calculateTimeConverter({
      value: 1,
      fromUnit: 'year',
      toUnit: 'day',
      yearConvention: 'julian',
    });
    expect(julianRes.primary.value).toBe(365.25);

    // Leap year (366 days)
    const leapRes = calculateTimeConverter({
      value: 1,
      fromUnit: 'year',
      toUnit: 'day',
      yearConvention: 'leap',
    });
    expect(leapRes.primary.value).toBe(366);
  });

  it('should calculate compound duration breakdown for 90061 seconds', () => {
    const bd = breakDownDuration(90061);
    expect(bd.days).toBe(1);
    expect(bd.hours).toBe(1);
    expect(bd.minutes).toBe(1);
    expect(bd.seconds).toBe(1);
    expect(bd.formattedArabic).toBe('1 يوم و 1 ساعة و 1 دقيقة و 1 ثانية');
  });

  it('should calculate compound duration breakdown for 3661 seconds', () => {
    const bd = breakDownDuration(3661);
    expect(bd.days).toBe(0);
    expect(bd.hours).toBe(1);
    expect(bd.minutes).toBe(1);
    expect(bd.seconds).toBe(1);
    expect(bd.formattedArabic).toBe('1 ساعة و 1 دقيقة و 1 ثانية');
  });

  it('should handle zero in duration breakdown', () => {
    const bd = breakDownDuration(0);
    expect(bd.days).toBe(0);
    expect(bd.hours).toBe(0);
    expect(bd.minutes).toBe(0);
    expect(bd.seconds).toBe(0);
    expect(bd.formattedArabic).toBe('0 ثانية');
  });

  it('should verify round-trip consistency across time units', () => {
    const units = ['ms', 's', 'min', 'hr', 'day', 'week'];
    const testValue = 120;

    for (const u1 of units) {
      for (const u2 of units) {
        const step1 = calculateTimeConverter({ value: testValue, fromUnit: u1, toUnit: u2 });
        const step2 = calculateTimeConverter({ value: step1.primary.value, fromUnit: u2, toUnit: u1 });
        expect(Number(step2.primary.value)).toBeCloseTo(testValue, 4);
      }
    }
  });

  it('should handle invalid/NaN input gracefully in time converter', () => {
    const res = calculateTimeConverter({ value: 'invalid_time', fromUnit: 'min', toUnit: 'hr' });
    expect(res.error).toBeDefined();
    expect(res.primary.formattedValue).toBe('-');
  });
});

