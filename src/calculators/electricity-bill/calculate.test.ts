import { describe, it, expect } from 'vitest';
import { calculateElectricityBill } from './calculate';
import { COUNTRY_DATA_SA } from '../../data/countries/sa';
import { COUNTRY_DATA_EG } from '../../data/countries/eg';

describe('Electricity Bill Calculator Engine', () => {
  it('calculates Saudi electricity bill in Tier 1 (1-6000 kWh at 0.18 SAR + 15 SAR meter + 15% VAT)', () => {
    // 2000 kWh: 2000 * 0.18 = 360 SAR energy + 15 SAR meter = 375 SAR subtotal * 1.15 = 431.25 SAR
    const result = calculateElectricityBill({ consumptionKwh: 2000 }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBeCloseTo(431.25, 2);
  });

  it('calculates Tier 2 transition in Saudi Arabia (>6000 kWh)', () => {
    // 7000 kWh: (6000 * 0.18 = 1080) + (1000 * 0.30 = 300) = 1380 energy + 15 = 1395 * 1.15 = 1604.25 SAR
    const result = calculateElectricityBill({ consumptionKwh: 7000 }, COUNTRY_DATA_SA);
    expect(result.primary.value).toBeCloseTo(1604.25, 2);
  });

  it('calculates Egyptian progressive tiered bill correctly', () => {
    const result = calculateElectricityBill({ consumptionKwh: 300 }, COUNTRY_DATA_EG);
    expect(result.primary.value).toBeGreaterThan(100);
  });
});
