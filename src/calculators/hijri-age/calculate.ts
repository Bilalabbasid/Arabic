import { CalculationResult } from '../../types/calculator';
import { gregorianToJulianDay, hijriToJulianDay } from '../hijri-converter/calculate';

export interface HijriAgeInputs {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  calendarType?: 'gregorian' | 'hijri';
  /** Optional reference "today" (for tests). Defaults to the user's current date. */
  referenceDate?: Date | string;
}

const SOLAR_YEAR_DAYS = 365.2425;
const LUNAR_YEAR_DAYS = 354.36707;

export function calculateHijriAge(inputs: HijriAgeInputs): CalculationResult {
  const by = Number(inputs.birthYear) || 1995;
  const bm = Number(inputs.birthMonth) || 1;
  const bd = Number(inputs.birthDay) || 1;
  const calType = inputs.calendarType || 'gregorian';

  const ref = inputs.referenceDate ? new Date(inputs.referenceDate) : new Date();
  const today = isNaN(ref.getTime()) ? new Date() : ref;
  const todayJd = gregorianToJulianDay(today.getFullYear(), today.getMonth() + 1, today.getDate());

  // Convert the birth date (in whichever calendar it was entered) to a Julian Day,
  // then measure the elapsed days against today's real date.
  const birthJd = calType === 'gregorian' ? gregorianToJulianDay(by, bm, bd) : hijriToJulianDay(by, bm, bd);
  const days = Math.max(0, todayJd - birthJd);

  const ageGregorianYears = days / SOLAR_YEAR_DAYS;
  const ageHijriYears = days / LUNAR_YEAR_DAYS;

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
      { label: 'العمر التقريبي بالأيام', value: `نحو ${Math.floor(days)} يوماً` },
      { label: 'العمر التقريبي بالأسابيع', value: `نحو ${Math.floor(days / 7)} أسبوعاً` },
    ],
    calculationSteps: [
      `العمر الميلادي: ${gYearsInt} سنة و ${gMonthsInt} شهراً (سنة شمسية 365.25 يوم)`,
      `العمر الهجري: ${hYearsInt} سنة و ${hMonthsInt} شهراً (سنة قمرية 354.37 يوم)`,
      `يزيد العمر الهجري بمعدل سنة واحدة كل 33 عاماً شمسياً تقريباً.`,
    ],
  };
}
