import { CalculationResult } from '../../types/calculator';

export interface HijriAgeInputs {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  calendarType?: 'gregorian' | 'hijri';
}

export function calculateHijriAge(inputs: HijriAgeInputs): CalculationResult {
  const by = Number(inputs.birthYear) || 1995;
  const bm = Number(inputs.birthMonth) || 1;
  const bd = Number(inputs.birthDay) || 1;
  const calType = inputs.calendarType || 'gregorian';

  // Current reference date: 2026-11-02 (approx 1448-05-22 AH)
  const today = new Date(2026, 10, 2); // Month is 0-indexed in JS (10=November)

  let ageGregorianYears = 0;
  let ageHijriYears = 0;

  if (calType === 'gregorian') {
    const birthDate = new Date(by, bm - 1, bd);
    const diffMs = today.getTime() - birthDate.getTime();
    const days = Math.max(0, diffMs / (1000 * 60 * 60 * 24));
    ageGregorianYears = days / 365.2425;
    // Lunar year is approx 354.367 days
    ageHijriYears = days / 354.36707;
  } else {
    // Birth year was entered in Hijri
    ageHijriYears = Math.max(0, 1448 - by + ((5 - bm) / 12) + ((22 - bd) / 354));
    ageGregorianYears = ageHijriYears * (354.36707 / 365.2425);
  }

  const gYearsInt = Math.floor(ageGregorianYears);
  const gMonthsInt = Math.floor((ageGregorianYears - gYearsInt) * 12);

  const hYearsInt = Math.floor(ageHijriYears);
  const hMonthsInt = Math.floor((ageHijriYears - hYearsInt) * 12);

  const diffYears = ageHijriYears - ageGregorianYears;

  return {
    primary: {
      label: 'عمرك الدقيق بالسنوات الهجرية',
      value: ageHijriYears,
      formattedValue: `${hYearsInt} سنة و ${hMonthsInt} شهر (هجري)`,
      badge: `${hYearsInt} عاماً`,
    },
    secondary: [
      {
        label: 'عمرك بالسنوات الميلادية',
        value: ageGregorianYears,
        formattedValue: `${gYearsInt} سنة و ${gMonthsInt} شهر (ميلادي)`,
      },
      {
        label: 'الفارق الزمني بين التقويمين',
        value: `عمرك الهجري أكبر بنحو ${diffYears.toFixed(1)} سنة`,
      },
    ],
    details: [
      { label: 'تاريخ الميلاد المدخل', value: `${bd}/${bm}/${by} (${calType === 'gregorian' ? 'ميلادي' : 'هجري'})` },
      { label: 'العمر التقريبي بالأيام', value: `نحو ${Math.floor(ageGregorianYears * 365.25)} يوماً` },
      { label: 'العمر التقريبي بالأسابيع', value: `نحو ${Math.floor((ageGregorianYears * 365.25) / 7)} أسبوعاً` },
    ],
    calculationSteps: [
      `العمر الميلادي: ${gYearsInt} سنة و ${gMonthsInt} شهراً (سنة شمسية 365.25 يوم)`,
      `العمر الهجري: ${hYearsInt} سنة و ${hMonthsInt} شهراً (سنة قمرية 354.37 يوم)`,
      `يزيد العمر الهجري بمعدل سنة واحدة كل 33 عاماً شمسياً تقريباً.`,
    ],
  };
}
