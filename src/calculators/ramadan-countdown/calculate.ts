import { CalculationResult } from '../../types/calculator';

export interface RamadanCountdownInputs {
  targetHijriYear?: number;
  /** Optional reference "today" (for tests). Defaults to the user's current date. */
  referenceDate?: Date | string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

// Approximate (astronomical / Umm al-Qura) start dates of Ramadan, stored as UTC calendar days
// so that toISOString() never shifts the date for users east of UTC (e.g. the Gulf, UTC+3/+4).
const RAMADAN_START_UTC: Record<number, number> = {
  1448: Date.UTC(2027, 1, 8), // 2027-02-08
  1449: Date.UTC(2028, 0, 28), // 2028-01-28
};

function toUtcDay(d: Date): number {
  return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
}

export function calculateRamadanCountdown(inputs: RamadanCountdownInputs): CalculationResult {
  const targetYear = RAMADAN_START_UTC[Number(inputs.targetHijriYear)] ? Number(inputs.targetHijriYear) : 1448;

  const ref = inputs.referenceDate ? new Date(inputs.referenceDate) : new Date();
  const todayUtc = toUtcDay(isNaN(ref.getTime()) ? new Date() : ref);
  const ramadanUtc = RAMADAN_START_UTC[targetYear];
  // Shawwal 1 is 29 or 30 days later depending on the crescent sighting; 30 is the conservative estimate
  const eidUtc = ramadanUtc + 30 * DAY_MS;

  const daysRemaining = Math.max(0, Math.round((ramadanUtc - todayUtc) / DAY_MS));
  const monthsRemaining = Math.floor(daysRemaining / 30);
  const leftoverDays = daysRemaining % 30;
  const todayIso = new Date(todayUtc).toISOString().split('T')[0];
  const ramadanIso = new Date(ramadanUtc).toISOString().split('T')[0];
  const eidIso = new Date(eidUtc).toISOString().split('T')[0];

  return {
    primary: {
      label: `كم باقي على رمضان ${targetYear} هـ`,
      value: daysRemaining,
      formattedValue: `${daysRemaining} يوماً (${monthsRemaining} أشهر و ${leftoverDays} يوماً)`,
      unit: 'يوم',
      badge: `رمضان ${targetYear} هـ`,
    },
    secondary: [
      {
        label: 'التاريخ الميلادي المتوقع لبداية رمضان',
        value: ramadanIso,
      },
      {
        label: 'التاريخ المتوقع لعيد الفطر المبارك (1 شوال)',
        value: eidIso,
      },
    ],
    details: [
      { label: 'السنة الهجرية المستهدفة', value: `${targetYear} هـ` },
      { label: 'متوسط ساعات الصيام المتوقعة', value: 'نحو 13 إلى 14 ساعة يومياً (فصل الشتاء)' },
      { label: 'حالة التحقق الشرعي', value: 'حساب فلكي تقريبي – البداية الرسمية معلقة على الرؤية الشرعية للهلال' },
    ],
    calculationSteps: [
      `التاريخ الحالي المرجعي: ${todayIso} م`,
      `تاريخ غرة رمضان المتوقع: ${ramadanIso} م`,
      `الفارق الزمني المتبقي: ${daysRemaining} يوماً.`,
    ],
  };
}
