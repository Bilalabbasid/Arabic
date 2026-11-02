import { describe, it, expect } from 'vitest';
import { calculateRamadanCountdown } from './calculate';

describe('Ramadan Countdown Engine', () => {
  it('calculates countdown days to Ramadan 1448 AH correctly', () => {
    const result = calculateRamadanCountdown({ targetHijriYear: 1448 });
    expect(result.primary.value).toBeGreaterThan(50);
    expect(result.secondary?.[0].value).toContain('2027');
  });

  it('calculates countdown to Ramadan 1449 AH correctly', () => {
    const result = calculateRamadanCountdown({ targetHijriYear: 1449 });
    expect(result.primary.value).toBeGreaterThan(350);
    expect(result.secondary?.[0].value).toContain('2028');
  });

  it('provides expected Eid al-Fitr date', () => {
    const result = calculateRamadanCountdown({ targetHijriYear: 1448 });
    expect(result.secondary?.[1].value).toBeDefined();
  });
});
