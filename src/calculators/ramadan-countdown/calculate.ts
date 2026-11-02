import { CalculationResult } from '../../types/calculator';

export interface RamadanCountdownInputs {
  targetHijriYear?: number;
}

export function calculateRamadanCountdown(inputs: RamadanCountdownInputs): CalculationResult {
  // Approximate Ramadan dates:
  // 1448 AH: Starts approx 2027-02-08
  // 1449 AH: Starts approx 2028-01-28
  const targetYear = Number(inputs.targetHijriYear) || 1448;

  const today = new Date(2026, 10, 2); // 2026-11-02
  const ramadanDate = targetYear === 1449 ? new Date(2028, 0, 28) : new Date(2027, 1, 8);
  const eidDate = new Date(ramadanDate.getTime() + (30 * 24 * 60 * 60 * 1000));

  const diffMs = ramadanDate.getTime() - today.getTime();
  const daysRemaining = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const monthsRemaining = Math.floor(daysRemaining / 30);
  const leftoverDays = daysRemaining % 30;

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
        value: ramadanDate.toISOString().split('T')[0],
      },
      {
        label: 'التاريخ المتوقع لعيد الفطر المبارك (1 شوال)',
        value: eidDate.toISOString().split('T')[0],
      },
    ],
    details: [
      { label: 'السنة الهجرية المستهدفة', value: `${targetYear} هـ` },
      { label: 'متوسط ساعات الصيام المتوقعة', value: 'نحو 13 إلى 14 ساعة يومياً (فصل الشتاء)' },
      { label: 'حالة التحقق الشرعي', value: 'حساب فلكي تقريبي – البداية الرسمية معلقة على الرؤية الشرعية للهلال' },
    ],
    calculationSteps: [
      `التاريخ الحالي المرجعي: 2026-11-02 م`,
      `تاريخ غرة رمضان المتوقع: ${ramadanDate.toISOString().split('T')[0]} م`,
      `الفارق الزمني المتبقي: ${daysRemaining} يوماً.`,
    ],
  };
}
