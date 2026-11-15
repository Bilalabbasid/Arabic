import { describe, it, expect } from 'vitest';
import { calculateGpa, getGpaRating } from './calculate';
import { gpaSchema } from './schema';

describe('GPA Calculator Engine', () => {
  it('5-scale: 3h A+ and 3h B = (15 + 12) / 6 = 4.50 (ممتاز)', () => {
    const res = calculateGpa({
      scale: '5',
      courses: [
        { hours: 3, grade: 'A+' },
        { hours: 3, grade: 'B' },
      ],
    });
    expect(res.primary.value).toBe(4.5);
    expect(res.secondary?.find((s) => s.id === 'rating')?.value).toBe('ممتاز');
  });

  it('4-scale: 3h A, 3h B, 3h C+ = (11.25 + 9 + 7.5) / 9 = 3.08 (جيد جداً)', () => {
    const res = calculateGpa({
      scale: '4',
      courses: [
        { hours: 3, grade: 'A' },
        { hours: 3, grade: 'B' },
        { hours: 3, grade: 'C+' },
      ],
    });
    expect(res.primary.value).toBe(3.08);
    expect(res.secondary?.find((s) => s.id === 'rating')?.value).toBe('جيد جداً');
  });

  it('cumulative with previous record: prev 4.00 over 30h + 51.75 points over 12h = 171.75 / 42 = 4.09', () => {
    const res = calculateGpa({
      scale: '5',
      includePrevious: 'yes',
      previousGpa: 4,
      previousHours: 30,
      courses: [
        { hours: 3, grade: 'A' },
        { hours: 3, grade: 'B+' },
        { hours: 4, grade: 'C+' },
        { hours: 2, grade: 'A+' },
      ],
    });
    // semester: 14.25 + 13.5 + 14 + 10 = 51.75 / 12 = 4.3125
    expect(res.secondary?.find((s) => s.id === 'semesterGpa')?.value).toBe(4.31);
    expect(res.primary.value).toBe(4.09);
    expect(res.secondary?.find((s) => s.id === 'totalHours')?.value).toBe(42);
    expect(res.secondary?.find((s) => s.id === 'rating')?.value).toBe('جيد جداً');
  });

  it('F counts as 1 point on the 5-scale and 0 on the 4-scale', () => {
    const five = calculateGpa({ scale: '5', courses: [{ hours: 3, grade: 'F' }, { hours: 3, grade: 'A+' }] });
    expect(five.primary.value).toBe(3); // (3 + 15) / 6
    const four = calculateGpa({ scale: '4', courses: [{ hours: 3, grade: 'F' }, { hours: 3, grade: 'A+' }] });
    expect(four.primary.value).toBe(2); // (0 + 12) / 6
  });

  it('reads flat course{n} form fields, only up to coursesCount, skipping 0-hour rows', () => {
    const res = calculateGpa({
      scale: '5',
      coursesCount: '3',
      course1Hours: 3, course1Grade: 'A+',
      course2Hours: 0, course2Grade: 'F',
      course3Hours: 3, course3Grade: 'B',
      course4Hours: 3, course4Grade: 'F', // hidden row beyond coursesCount
    });
    expect(res.primary.value).toBe(4.5);
  });

  it('schema default inputs produce a valid result', () => {
    const defaults: Record<string, any> = {};
    for (const inp of gpaSchema) defaults[inp.id] = inp.defaultValue;
    const res = calculateGpa(defaults);
    expect(res.error).toBeUndefined();
    // 3h A+ (15) + 3h B (12) + 4h B+ (18) + 2h A (9.5) = 54.5 / 12 = 4.54
    expect(res.primary.value).toBe(4.54);
  });

  it('returns an error when no course has hours', () => {
    const res = calculateGpa({ scale: '5', courses: [] });
    expect(res.error).toBeDefined();
  });

  it('rating thresholds follow the unified Saudi regulation', () => {
    expect(getGpaRating(4.5, '5')).toBe('ممتاز');
    expect(getGpaRating(4.49, '5')).toBe('جيد جداً');
    expect(getGpaRating(3.75, '5')).toBe('جيد جداً');
    expect(getGpaRating(2.75, '5')).toBe('جيد');
    expect(getGpaRating(2.0, '5')).toBe('مقبول');
    expect(getGpaRating(3.5, '4')).toBe('ممتاز');
    expect(getGpaRating(1.75, '4')).toBe('جيد');
  });
});
