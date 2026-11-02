import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface TireSizeInputs {
  width1?: number;
  aspectRatio1?: number;
  rim1?: number;
  width2?: number;
  aspectRatio2?: number;
  rim2?: number;
}

export function calculateTireSize(inputs: TireSizeInputs, country?: CountryData): CalculationResult {
  const w1 = Number(inputs.width1) || 205;
  const ar1 = Number(inputs.aspectRatio1) || 55;
  const r1 = Number(inputs.rim1) || 16;

  const w2 = Number(inputs.width2) || 225;
  const ar2 = Number(inputs.aspectRatio2) || 45;
  const r2 = Number(inputs.rim2) || 17;

  // Sidewall height in mm
  const sidewall1 = w1 * (ar1 / 100);
  const sidewall2 = w2 * (ar2 / 100);

  // Total diameter in mm = rim * 25.4 + 2 * sidewall
  const diameter1 = (r1 * 25.4) + (2 * sidewall1);
  const diameter2 = (r2 * 25.4) + (2 * sidewall2);

  const diameterDiff = diameter2 - diameter1;
  const diameterDiffPercent = (diameterDiff / diameter1) * 100;

  // Circumference
  const circ1 = Math.PI * diameter1;
  const circ2 = Math.PI * diameter2;

  // Ground clearance change
  const clearanceChange = diameterDiff / 2;

  // Speedometer discrepancy at 100 km/h displayed
  const actualSpeedAt100 = 100 * (diameter2 / diameter1);

  const warnings: string[] = [];
  if (Math.abs(diameterDiffPercent) > 3.0) {
    warnings.push(
      `تنبيه أمان: الفارق في قطر الإطار (${diameterDiffPercent.toFixed(1)}%) يتجاوز النسبة الموصى بها عالمياً (±3%)، مما قد يؤثر على ثبات السيارة وقراءة عداد السرعة وأنظمة الفرامل ABS.`
    );
  }

  return {
    primary: {
      label: 'الفارق في القطر الكلي للإطار',
      value: diameterDiff,
      formattedValue: `${diameterDiff > 0 ? '+' : ''}${diameterDiff.toFixed(1)} مم (${diameterDiffPercent.toFixed(1)}%)`,
      unit: 'مم',
      badge: Math.abs(diameterDiffPercent) <= 3 ? 'فارق آمن ومقبول' : 'فارق غير موصى به',
    },
    secondary: [
      {
        label: 'السرعة الحقيقية عند قراءة العداد 100 كم/س',
        value: actualSpeedAt100,
        formattedValue: `${actualSpeedAt100.toFixed(1)} كم / س`,
        unit: 'كم / س',
      },
      {
        label: 'التغير في ارتفاع السيارة عن الأرض',
        value: clearanceChange,
        formattedValue: `${clearanceChange > 0 ? '+' : ''}${clearanceChange.toFixed(1)} مم`,
        unit: 'مم',
      },
    ],
    details: [
      { label: 'قطر الإطار الأصلي (المقاس 1)', value: `${diameter1.toFixed(1)} مم (${(diameter1 / 25.4).toFixed(1)} إنش)` },
      { label: 'قطر الإطار الجديد (المقاس 2)', value: `${diameter2.toFixed(1)} مم (${(diameter2 / 25.4).toFixed(1)} إنش)` },
      { label: 'محيط دوران الإطار الأصلي', value: `${circ1.toFixed(1)} مم` },
      { label: 'محيط دوران الإطار الجديد', value: `${circ2.toFixed(1)} مم` },
    ],
    calculationSteps: [
      `ارتفاع الجدار الجانبي 1 = ${w1} × ${ar1}% = ${sidewall1.toFixed(1)} مم` ,
      `ارتفاع الجدار الجانبي 2 = ${w2} × ${ar2}% = ${sidewall2.toFixed(1)} مم` ,
      `القطر الكلي 1 = ${diameter1.toFixed(1)} مم | القطر الكلي 2 = ${diameter2.toFixed(1)} مم` ,
      `الفارق النسبي في السرعة = ${diameterDiffPercent.toFixed(2)}%` ,
    ],
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}
