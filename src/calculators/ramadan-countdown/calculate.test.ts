import { describe, it, expect } from 'vitest';
import { calculateRamadanCountdown } from './calculate';

const REF = new Date(2026, 10, 2); // 2 Nov 2026 (local time)

describe('Ramadan Countdown Engine', () => {
  it('calculates countdown days to Ramadan 1448 AH correctly', () => {
    const result = calculateRamadanCountdown({ targetHijriYear: 1448, referenceDate: REF });
    // 2026-11-02 -> 2027-02-08 = 98 days
    expect(result.primary.value).toBe(98);
    expect(result.secondary?.[0].value).toBe('2027-02-08');
  });

  it('calculates countdown to Ramadan 1449 AH correctly', () => {
    const result = calculateRamadanCountdown({ targetHijriYear: 1449, referenceDate: REF });
    expect(result.primary.value).toBeGreaterThan(350);
    expect(result.secondary?.[0].value).toBe('2028-01-28');
  });

  it('uses the real current date, not a frozen one', () => {
    const later = calculateRamadanCountdown({ targetHijriYear: 1448, referenceDate: new Date(2026, 11, 2) });
    expect(later.primary.value).toBe(68);
  });

  it('never returns negative days after Ramadan has started', () => {
    const after = calculateRamadanCountdown({ targetHijriYear: 1448, referenceDate: new Date(2027, 2, 1) });
    expect(after.primary.value).toBe(0);
  });

  it('provides expected Eid al-Fitr date', () => {
    const result = calculateRamadanCountdown({ targetHijriYear: 1448, referenceDate: REF });
    expect(result.secondary?.[1].value).toBe('2027-03-10');
  });
});
