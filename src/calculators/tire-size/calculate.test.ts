import { describe, it, expect } from 'vitest';
import { calculateTireSize } from './calculate';

describe('Tire Size Comparison Engine', () => {
  it('calculates 205/55R16 vs 225/45R17 tire change accurately', () => {
    const result = calculateTireSize({
      width1: 205, aspectRatio1: 55, rim1: 16,
      width2: 225, aspectRatio2: 45, rim2: 17,
    });
    expect(result.primary.value).toBeCloseTo(2.4, 1);
    expect(result.secondary?.[0].value).toBeCloseTo(100.38, 1);
  });

  it('calculates ground clearance increase when upsizing', () => {
    const result = calculateTireSize({
      width1: 215, aspectRatio1: 60, rim1: 16,
      width2: 235, aspectRatio2: 65, rim2: 17,
    });
    expect(result.secondary?.[1].value).toBeGreaterThan(0);
  });

  it('triggers safety warning when diameter difference exceeds 3%', () => {
    const result = calculateTireSize({
      width1: 195, aspectRatio1: 50, rim1: 15,
      width2: 245, aspectRatio2: 50, rim2: 19,
    });
    expect(result.warnings).toBeDefined();
    expect(result.warnings?.[0]).toContain('يتجاوز النسبة الموصى بها');
  });
});
