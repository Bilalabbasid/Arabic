import { CalculationResult } from '../../types/calculator';
import {
  gregorianToJulianDay,
  julianDayToHijri,
  HIJRI_MONTHS,
  GREGORIAN_MONTHS,
  WEEKDAYS,
} from '../hijri-converter/calculate';

const DAY_MS = 86_400_000;

export type WeekendPattern = 'fri-sat' | 'sat-sun';

/** UTC weekday indexes (0 = Sunday) treated as the weekend. Saudi default: Friday + Saturday. */
const WEEKEND_DAYS: Record<WeekendPattern, number[]> = {
  'fri-sat': [5, 6],
  'sat-sun': [6, 0],
};

export interface DateDifferenceInputs {
  startDate: string;
  endDate: string;
  includeEndDay?: 'yes' | 'no' | string | boolean;
  weekend?: WeekendPattern | string;
}

interface Ymd {
  y: number;
  m: number;
  d: number;
}

/** Parses YYYY-MM-DD (also accepts YYYY/MM/DD and DD/MM/YYYY). Returns null for invalid dates. */
export function parseDateInput(raw: unknown): Ymd | null {
  const s = String(raw ?? '').trim().replace(/[٠-٩]/g, (c) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(c)));
  let y: number, m: number, d: number;
  let match = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  if (match) {
    [y, m, d] = [Number(match[1]), Number(match[2]), Number(match[3])];
  } else {
    match = s.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
    if (!match) return null;
    [d, m, y] = [Number(match[1]), Number(match[2]), Number(match[3])];
  }
  if (y < 1900 || y > 2100) return null;
  const t = new Date(Date.UTC(y, m - 1, d));
  if (t.getUTCFullYear() !== y || t.getUTCMonth() !== m - 1 || t.getUTCDate() !== d) return null;
  return { y, m, d };
}

const toUtc = (p: Ymd) => Date.UTC(p.y, p.m - 1, p.d);
const fromUtc = (ms: number): Ymd => {
  const t = new Date(ms);
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
};
const daysInMonth = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();

/** Adds whole months to a date, clamping the day to the target month's length (31 Jan + 1 month = 28/29 Feb). */
function addMonths(p: Ymd, months: number): number {
  const total = p.m - 1 + months;
  const y = p.y + Math.floor(total / 12);
  const m = (((total % 12) + 12) % 12) + 1;
  return Date.UTC(y, m - 1, Math.min(p.d, daysInMonth(y, m)));
}

/** Calendar difference in years, months and days between start and an exclusive end. */
export function calendarDifference(start: Ymd, endMs: number): { years: number; months: number; days: number } {
  const end = fromUtc(endMs);
  let totalMonths = (end.y - start.y) * 12 + (end.m - start.m);
  if (addMonths(start, totalMonths) > endMs) totalMonths -= 1;
  const anchor = addMonths(start, totalMonths);
  const days = Math.round((endMs - anchor) / DAY_MS);
  return { years: Math.floor(totalMonths / 12), months: totalMonths % 12, days };
}

/** Counts working days in [startMs, startMs + totalDays) excluding the given weekend days. */
export function countWorkingDays(startMs: number, totalDays: number, weekend: number[]): number {
  const startDow = new Date(startMs).getUTCDay();
  const fullWeeks = Math.floor(totalDays / 7);
  let count = fullWeeks * (7 - weekend.length);
  for (let i = fullWeeks * 7; i < totalDays; i++) {
    if (!weekend.includes((startDow + i) % 7)) count++;
  }
  return count;
}

function describeDate(p: Ymd): { gregorian: string; hijri: string; weekday: string } {
  const h = julianDayToHijri(gregorianToJulianDay(p.y, p.m, p.d));
  const weekday = WEEKDAYS[new Date(toUtc(p)).getUTCDay()];
  return {
    gregorian: `${p.d} ${GREGORIAN_MONTHS[p.m - 1]} ${p.y} م`,
    hijri: `${h.day} ${HIJRI_MONTHS[h.month - 1]} ${h.year} هـ`,
    weekday,
  };
}

export function getHijriParts(p: Ymd): { year: number; month: number; day: number } {
  const h = julianDayToHijri(gregorianToJulianDay(p.y, p.m, p.d));
  return { year: h.year, month: h.month, day: h.day };
}

const plural = (n: number, one: string, two: string, few: string, many: string) => {
  if (n === 1) return one;
  if (n === 2) return two;
  if (n >= 3 && n <= 10) return `${n} ${few}`;
  return `${n} ${many}`;
};

export function weeksDaysText(weeks: number, days: number): string {
  const w = weeks === 0 ? '' : plural(weeks, 'أسبوع واحد', 'أسبوعان', 'أسابيع', 'أسبوعاً');
  const d = days === 0 ? '' : plural(days, 'يوم واحد', 'يومان', 'أيام', 'يوماً');
  if (!w && !d) return '0 يوم';
  return w && d ? `${w} و${d}` : w || d;
}

function ymdText(years: number, months: number, days: number): string {
  const parts: string[] = [];
  if (years) parts.push(plural(years, 'سنة', 'سنتان', 'سنوات', 'سنة'));
  if (months) parts.push(plural(months, 'شهر', 'شهران', 'أشهر', 'شهراً'));
  if (days || parts.length === 0) parts.push(days === 0 ? '0 يوم' : plural(days, 'يوم', 'يومان', 'أيام', 'يوماً'));
  return parts.join(' و');
}

export function calculateDateDifference(inputs: DateDifferenceInputs): CalculationResult {
  const a = parseDateInput(inputs.startDate);
  const b = parseDateInput(inputs.endDate);
  if (!a || !b) {
    return {
      primary: { label: 'عدد الأيام بين التاريخين', value: 0, formattedValue: '-' },
      error: 'أدخل تاريخين ميلاديين صحيحين بصيغة سنة-شهر-يوم (مثل 2026-01-01) بين عامي 1900 و 2100.',
    };
  }

  const warnings: string[] = [];
  let start = a;
  let end = b;
  if (toUtc(b) < toUtc(a)) {
    start = b;
    end = a;
    warnings.push('تاريخ النهاية يسبق تاريخ البداية، فتم تبديلهما وحساب الفرق بينهما.');
  }

  const includeEnd = inputs.includeEndDay === true || String(inputs.includeEndDay) === 'yes';
  const weekendKey: WeekendPattern = String(inputs.weekend) === 'sat-sun' ? 'sat-sun' : 'fri-sat';
  const startMs = toUtc(start);
  const endExclusiveMs = toUtc(end) + (includeEnd ? DAY_MS : 0);

  const totalDays = Math.round((endExclusiveMs - startMs) / DAY_MS);
  const weeks = Math.floor(totalDays / 7);
  const remDays = totalDays % 7;
  const ymd = calendarDifference(start, endExclusiveMs);
  const workingDays = countWorkingDays(startMs, totalDays, WEEKEND_DAYS[weekendKey]);
  const weekendDays = totalDays - workingDays;

  const sInfo = describeDate(start);
  const eInfo = describeDate(end);
  const weekendLabel = weekendKey === 'fri-sat' ? 'الجمعة والسبت' : 'السبت والأحد';

  return {
    primary: {
      id: 'totalDays',
      label: includeEnd ? 'عدد الأيام بين التاريخين (مع احتساب يوم النهاية)' : 'عدد الأيام بين التاريخين',
      value: totalDays,
      formattedValue: `${totalDays.toLocaleString('en-US')} يوم`,
      badge: weeksDaysText(weeks, remDays),
      highlight: true,
    },
    directAnswer: `بين ${sInfo.gregorian} و ${eInfo.gregorian} ${totalDays.toLocaleString('en-US')} يوماً، أي ${ymdText(ymd.years, ymd.months, ymd.days)}، منها ${workingDays} يوم عمل (عطلة ${weekendLabel}).`,
    secondary: [
      { id: 'weeks', label: 'بالأسابيع والأيام', value: weeksDaysText(weeks, remDays) },
      { id: 'ymd', label: 'بالسنوات والأشهر والأيام', value: ymdText(ymd.years, ymd.months, ymd.days) },
      { id: 'workingDays', label: `أيام العمل (العطلة: ${weekendLabel})`, value: workingDays, unit: 'يوم' },
      { id: 'weekendDays', label: 'أيام عطلة نهاية الأسبوع', value: weekendDays, unit: 'يوم' },
      { id: 'hours', label: 'بالساعات', value: totalDays * 24, formattedValue: (totalDays * 24).toLocaleString('en-US'), unit: 'ساعة' },
    ],
    details: [
      { label: 'تاريخ البداية', value: `${sInfo.weekday} ${sInfo.gregorian} — يوافق ${sInfo.hijri}` },
      { label: 'تاريخ النهاية', value: `${eInfo.weekday} ${eInfo.gregorian} — يوافق ${eInfo.hijri}` },
      { label: 'احتساب يوم النهاية', value: includeEnd ? 'نعم (يُعد اليومان الأول والأخير)' : 'لا (الفرق الصافي بين التاريخين)' },
    ],
    calculationSteps: [
      `عدد الأيام = تاريخ النهاية − تاريخ البداية${includeEnd ? ' + 1 (لاحتساب يوم النهاية)' : ''} = ${totalDays} يوم`,
      `الأسابيع = ${totalDays} ÷ 7 = ${weeks} أسبوع والباقي ${remDays} يوم`,
      `أيام العمل = ${weeks} أسبوع × 5 أيام + أيام العمل في الـ ${remDays} يوم المتبقية = ${workingDays} يوم`,
    ],
    warnings: warnings.length ? warnings : undefined,
    assumptions: [
      'أيام العمل لا تستثني الإجازات الرسمية والأعياد، فاطرحها يدوياً إن وقعت ضمن الفترة.',
      'التاريخ الهجري المقابل محسوب فلكياً وقد يختلف يوماً واحداً عن تقويم أم القرى أو الرؤية.',
    ],
  };
}
