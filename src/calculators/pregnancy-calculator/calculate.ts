import { CalculationResult } from '../../types/calculator';
import { gregorianToJulianDay, julianDayToHijri, HIJRI_MONTHS, GREGORIAN_MONTHS, WEEKDAYS } from '../hijri-converter/calculate';
import { parseDateInput, weeksDaysText } from '../date-difference/calculate';

const DAY_MS = 86_400_000;

export type PregnancyMethod = 'lmp' | 'conception' | 'ivf3' | 'ivf5';

export interface PregnancyInputs {
  method?: PregnancyMethod | string;
  startDate: string;
  cycleLength?: number | string;
  asOfDate?: string;
}

/**
 * Days from the entered date back to the "LMP-equivalent" day 0 of pregnancy, and from the entered
 * date forward to the due date (ACOG Committee Opinion 700):
 * - LMP: due date = LMP + 280 days (Naegele's rule), shifted by (cycle length − 28) days.
 * - Conception: ovulation/conception is day 14, so due date = conception + 266 days.
 * - IVF: a 3-day embryo was conceived 3 days before transfer (due = transfer + 263),
 *   a 5-day blastocyst 5 days before (due = transfer + 261).
 */
const METHOD_OFFSET: Record<Exclude<PregnancyMethod, 'lmp'>, number> = {
  conception: 14,
  ivf3: 17,
  ivf5: 19,
};

export const GESTATION_DAYS = 280;

/** Pregnancy month (1–9) for a pregnancy week (1-based), using the common 9-month table. */
export function pregnancyMonthForWeek(week: number): number {
  if (week <= 4) return 1;
  if (week <= 8) return 2;
  if (week <= 13) return 3;
  if (week <= 17) return 4;
  if (week <= 22) return 5;
  if (week <= 27) return 6;
  if (week <= 31) return 7;
  if (week <= 35) return 8;
  return 9;
}

/** Trimester by completed weeks: 1st through 13w6d, 2nd 14w0d–27w6d, 3rd from 28w0d. */
export function trimesterForWeeks(completedWeeks: number): 1 | 2 | 3 {
  if (completedWeeks < 14) return 1;
  if (completedWeeks < 28) return 2;
  return 3;
}

const TRIMESTER_AR = ['', 'الثلث الأول', 'الثلث الثاني', 'الثلث الثالث'];
const MONTH_ORDINAL_AR = ['', 'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع'];

const toIso = (ms: number) => new Date(ms).toISOString().slice(0, 10);

function describe(ms: number): { gregorian: string; hijri: string; weekday: string; full: string } {
  const t = new Date(ms);
  const y = t.getUTCFullYear();
  const m = t.getUTCMonth() + 1;
  const d = t.getUTCDate();
  const h = julianDayToHijri(gregorianToJulianDay(y, m, d));
  const gregorian = `${d} ${GREGORIAN_MONTHS[m - 1]} ${y} م`;
  const hijri = `${h.day} ${HIJRI_MONTHS[h.month - 1]} ${h.year} هـ`;
  const weekday = WEEKDAYS[t.getUTCDay()];
  return { gregorian, hijri, weekday, full: `${weekday} ${gregorian}` };
}

function todayUtc(): number {
  const now = new Date();
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
}

const METHOD_LABEL: Record<PregnancyMethod, string> = {
  lmp: 'أول يوم من آخر دورة شهرية',
  conception: 'تاريخ الإخصاب (الجماع المسبب للحمل)',
  ivf3: 'تاريخ إرجاع الأجنة (عمر 3 أيام)',
  ivf5: 'تاريخ إرجاع الأجنة (عمر 5 أيام)',
};

export function calculatePregnancy(inputs: PregnancyInputs): CalculationResult {
  const method: PregnancyMethod = (['lmp', 'conception', 'ivf3', 'ivf5'] as const).includes(inputs.method as any)
    ? (inputs.method as PregnancyMethod)
    : 'lmp';
  const start = parseDateInput(inputs.startDate);
  if (!start) {
    return {
      primary: { id: 'dueDate', label: 'موعد الولادة المتوقع', value: '-', formattedValue: '-' },
      error: 'أدخل تاريخاً ميلادياً صحيحاً بصيغة سنة-شهر-يوم (مثل 2026-03-01).',
    };
  }

  const cycle = Number(inputs.cycleLength ?? 28);
  const cycleLength = method === 'lmp' && Number.isFinite(cycle) && cycle > 0 ? Math.round(cycle) : 28;
  if (method === 'lmp' && (cycleLength < 20 || cycleLength > 45)) {
    return {
      primary: { id: 'dueDate', label: 'موعد الولادة المتوقع', value: '-', formattedValue: '-' },
      error: 'طول الدورة الشهرية يجب أن يكون بين 20 و 45 يوماً.',
    };
  }

  const enteredMs = Date.UTC(start.y, start.m - 1, start.d);
  // Day 0 of the pregnancy on the LMP scale (an LMP adjusted to a 28-day cycle).
  const day0 = method === 'lmp' ? enteredMs + (cycleLength - 28) * DAY_MS : enteredMs - METHOD_OFFSET[method] * DAY_MS;
  const dueMs = day0 + GESTATION_DAYS * DAY_MS;
  const conceptionMs = day0 + 14 * DAY_MS;

  const asOf = parseDateInput(inputs.asOfDate);
  const asOfMs = asOf ? Date.UTC(asOf.y, asOf.m - 1, asOf.d) : todayUtc();
  const gaDays = Math.round((asOfMs - day0) / DAY_MS);
  const remainingDays = Math.round((dueMs - asOfMs) / DAY_MS);

  const warnings: string[] = [];
  const due = describe(dueMs);
  const asOfInfo = describe(asOfMs);

  const secondary: CalculationResult['secondary'] = [];
  let directAnswer: string;
  let badge: string | undefined;

  if (gaDays < 0) {
    warnings.push(
      `التاريخ المُدخل بعد تاريخ الحساب (${asOfInfo.gregorian})، فلم يبدأ الحمل بعد في ذلك اليوم. تأكد من التاريخ أو غيّر تاريخ الحساب.`
    );
    directAnswer = `موعد الولادة المتوقع ${due.full} (يوافق ${due.hijri}) إذا حدث الحمل في هذه الدورة.`;
  } else {
    const weeks = Math.floor(gaDays / 7);
    const days = gaDays % 7;
    const week = weeks + 1;
    const month = pregnancyMonthForWeek(week);
    const trimester = trimesterForWeeks(weeks);
    const gaText = weeksDaysText(weeks, days);
    badge = `${gaText} • الشهر ${MONTH_ORDINAL_AR[month]}`;

    secondary.push(
      { id: 'gestationalAge', label: `عمر الحمل في ${asOfInfo.gregorian}`, value: gaText },
      { id: 'currentWeek', label: 'أنتِ في الأسبوع', value: week, unit: 'من 40' },
      { id: 'month', label: 'شهر الحمل', value: `الشهر ${MONTH_ORDINAL_AR[month]}` },
      { id: 'trimester', label: 'مرحلة الحمل', value: TRIMESTER_AR[trimester] },
      {
        id: 'remainingDays',
        label: remainingDays >= 0 ? 'الأيام المتبقية على الموعد' : 'تجاوز الموعد المتوقع بـ',
        value: Math.abs(remainingDays),
        unit: 'يوم',
        helpText: remainingDays >= 0 ? `أي ${weeksDaysText(Math.floor(remainingDays / 7), remainingDays % 7)}` : undefined,
      },
      { id: 'progress', label: 'نسبة ما مضى من الحمل', value: Math.min(100, Math.round((gaDays / GESTATION_DAYS) * 100)), unit: '%' }
    );

    if (weeks >= 42) {
      warnings.push('تجاوز عمر الحمل المحسوب 42 أسبوعاً؛ تحقق من التاريخ المُدخل، وإن كان صحيحاً فراجعي الطبيبة فوراً.');
    } else if (remainingDays < 0) {
      warnings.push('تجاوزتِ موعد الولادة المتوقع؛ الولادة حتى 41 أسبوعاً طبيعية، ويقرر الطبيب المتابعة أو التحريض بعدها.');
    }

    directAnswer = `موعد الولادة المتوقع ${due.full} (يوافق ${due.hijri})، وعمر الحمل في ${asOfInfo.gregorian} هو ${gaText}، أي الأسبوع ${week} في الشهر ${MONTH_ORDINAL_AR[month]} (${TRIMESTER_AR[trimester]})${remainingDays > 0 ? `، والمتبقي ${remainingDays} يوماً` : ''}.`;
  }

  const milestone = (d: number) => describe(day0 + d * DAY_MS).gregorian;

  return {
    primary: {
      id: 'dueDate',
      label: 'موعد الولادة المتوقع',
      value: toIso(dueMs),
      formattedValue: due.full,
      badge,
      highlight: true,
      helpText: `يوافق ${due.hijri}`,
    },
    directAnswer,
    secondary,
    details: [
      { label: 'التاريخ المُدخل', value: `${METHOD_LABEL[method]}: ${describe(enteredMs).gregorian}` },
      { label: 'موعد الولادة بالهجري', value: due.hijri },
      { label: 'التاريخ التقريبي للإخصاب', value: describe(conceptionMs).gregorian },
      { label: 'نهاية الثلث الأول (13 أسبوعاً و6 أيام)', value: milestone(97) },
      { label: 'فحص السونار التفصيلي (الأسبوع 18–22)', value: `${milestone(126)} – ${milestone(154)}` },
      { label: 'بداية الثلث الثالث (28 أسبوعاً)', value: milestone(196) },
      { label: 'اكتمال الحمل (37 أسبوعاً)', value: milestone(259) },
      { label: 'نهاية الحمل المكتمل (41 أسبوعاً و6 أيام)', value: milestone(293) },
    ],
    calculationSteps: [
      method === 'lmp'
        ? `موعد الولادة = أول يوم من آخر دورة + 280 يوماً${cycleLength !== 28 ? ` + (${cycleLength} − 28) = ${cycleLength - 28 > 0 ? '+' : ''}${cycleLength - 28} يوم لطول الدورة` : ''} = ${due.gregorian}`
        : method === 'conception'
          ? `موعد الولادة = تاريخ الإخصاب + 266 يوماً = ${due.gregorian}`
          : `موعد الولادة = تاريخ الإرجاع + ${280 - METHOD_OFFSET[method]} يوماً = ${due.gregorian}`,
      gaDays >= 0
        ? `عمر الحمل = ${gaDays} يوماً منذ بداية الحمل ÷ 7 = ${weeksDaysText(Math.floor(gaDays / 7), gaDays % 7)}`
        : 'لم يبدأ الحمل في تاريخ الحساب المختار.',
    ],
    warnings: warnings.length ? warnings : undefined,
    assumptions: [
      'يُحسب عمر الحمل طبياً من أول يوم في آخر دورة شهرية، أي قبل الإخصاب بنحو أسبوعين.',
      'نحو 4% فقط من الولادات تحدث في الموعد المتوقع بالضبط، ومعظمها بين الأسبوع 37 و 42.',
      'إذا اختلف عمر الحمل في سونار الثلث الأول عن الحساب بالدورة، يعتمد الطبيب تاريخ السونار.',
    ],
  };
}
