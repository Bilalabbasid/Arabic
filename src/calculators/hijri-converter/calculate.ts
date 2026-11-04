import { CalculationResult } from '../../types/calculator';

export interface HijriConverterInputs {
  year: number;
  month: number;
  day: number;
  conversionMode?: 'gregorian_to_hijri' | 'hijri_to_gregorian';
}

const HIJRI_MONTHS = [
  'محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر',
  'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
  'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة',
];

const GREGORIAN_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل',
  'مايو', 'يونيو', 'يوليو', 'أغسطس',
  'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

const WEEKDAYS = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

// Algorithmic Kuwaiti/Umm al-Qura Julian Day conversion
export function gregorianToJulianDay(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

function julianDayToGregorian(jd: number): { year: number; month: number; day: number; weekday: string } {
  const z = Math.floor(jd + 0.5);
  const a = Math.floor((z - 1867216.25) / 36524.25);
  const aa = z + 1 + a - Math.floor(a / 4);
  const b = aa + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((b - d) / 30.6001);
  const day = b - d - Math.floor(30.6001 * e);
  const month = e < 14 ? e - 1 : e - 13;
  const year = month > 2 ? c - 4716 : c - 4715;
  const dayOfWeekIndex = Math.floor(jd + 1.5) % 7;
  return { year, month, day, weekday: WEEKDAYS[dayOfWeekIndex] };
}

function julianDayToHijri(jd: number): { year: number; month: number; day: number; weekday: string } {
  const l = Math.floor(jd - 1948440 + 10632);
  const n = Math.floor((l - 1) / 10631);
  const l1 = l - 10631 * n + 354;
  const j = (Math.floor((10985 - l1) / 5316)) * (Math.floor((50 * l1) / 17719)) + (Math.floor(l1 / 5670)) * (Math.floor((43 * l1) / 15238));
  const l2 = l1 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  const month = Math.floor((24 * l2) / 709);
  const day = l2 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  const dayOfWeekIndex = Math.floor(jd + 1.5) % 7;
  return { year, month, day, weekday: WEEKDAYS[dayOfWeekIndex] };
}

export function hijriToJulianDay(year: number, month: number, day: number): number {
  return Math.floor((11 * year + 3) / 30) + 354 * year + 30 * month - Math.floor((month - 1) / 2) + day + 1948440 - 385;
}

export function calculateHijriConverter(inputs: HijriConverterInputs): CalculationResult {
  const y = Number(inputs.year) || 2026;
  const m = Number(inputs.month) || 11;
  const d = Number(inputs.day) || 2;
  const mode = inputs.conversionMode || 'gregorian_to_hijri';

  let resultTitle = '';
  let formattedResult = '';
  let dayName = '';

  if (mode === 'gregorian_to_hijri') {
    const jd = gregorianToJulianDay(y, m, d);
    const h = julianDayToHijri(jd);
    dayName = h.weekday;
    const hMonthName = HIJRI_MONTHS[h.month - 1] || `شهر ${h.month}`;
    resultTitle = 'التاريخ الهجري المقابل';
    formattedResult = `${dayName}، ${h.day} ${hMonthName} ${h.year} هـ`;
  } else {
    const jd = hijriToJulianDay(y, m, d);
    const g = julianDayToGregorian(jd);
    dayName = g.weekday;
    const gMonthName = GREGORIAN_MONTHS[g.month - 1] || `شهر ${g.month}`;
    resultTitle = 'التاريخ الميلادي المقابل';
    formattedResult = `${dayName}، ${g.day} ${gMonthName} ${g.year} م`;
  }

  return {
    primary: {
      label: resultTitle,
      value: formattedResult,
      formattedValue: formattedResult,
      badge: dayName,
    },
    secondary: [
      {
        label: 'يوم الأسبوع',
        value: dayName,
      },
      {
        label: 'التقويم المعتمد',
        value: 'تقويم أم القرى الفلكي والحساب المعياري',
      },
    ],
    details: [
      { label: 'التاريخ المدخل', value: `${d}/${m}/${y}` },
      { label: 'اتجاه التحويل', value: mode === 'gregorian_to_hijri' ? 'من ميلادي إلى هجري' : 'من هجري إلى ميلادي' },
      { label: 'مرجع الحساب', value: 'خوارزمية الحساب الفلكي المعتمدة لتقويم أم القرى' },
    ],
    calculationSteps: [
      `التاريخ المدخل: ${d}-${m}-${y}`,
      `النتيجة المحولة: ${formattedResult}`,
      'بدايات الأشهر القمرية الفعلية ترتبط بالرؤية الشرعية للهلال.',
    ],
  };
}
