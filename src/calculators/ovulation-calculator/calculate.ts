import { CalculationResult } from '../../types/calculator';
import { parseDateInput } from '../date-difference/calculate';
import { GREGORIAN_MONTHS } from '../hijri-converter/calculate';
import { describeDate, GESTATION_DAYS } from '../pregnancy-calculator/calculate';

const DAY_MS = 86_400_000;

/**
 * Ovulation timing (ACOG / Wilcox et al. 1995):
 * - The luteal phase (ovulation → next period) is fairly constant at ~14 days, so
 *   ovulation ≈ LMP + (cycle length − 14) days, i.e. cycle day (cycle − 13).
 * - Sperm survive up to 5 days and the egg ~24 hours, so the fertile window runs from
 *   5 days before ovulation to 1 day after; the 3 days ending on ovulation day are the most fertile.
 */
export const LUTEAL_PHASE_DAYS = 14;
export const FERTILE_DAYS_BEFORE = 5;
export const FERTILE_DAYS_AFTER = 1;

export interface OvulationInputs {
  lmpDate: string;
  cycleLength?: number | string;
  cyclesToShow?: number | string;
}

export interface CycleDates {
  periodStart: number;
  ovulation: number;
  fertileStart: number;
  fertileEnd: number;
  peakStart: number;
  nextPeriod: number;
}

const toIso = (ms: number) => new Date(ms).toISOString().slice(0, 10);

export function cycleDates(periodStartMs: number, cycleLength: number): CycleDates {
  const ovulation = periodStartMs + (cycleLength - LUTEAL_PHASE_DAYS) * DAY_MS;
  return {
    periodStart: periodStartMs,
    ovulation,
    fertileStart: ovulation - FERTILE_DAYS_BEFORE * DAY_MS,
    fertileEnd: ovulation + FERTILE_DAYS_AFTER * DAY_MS,
    peakStart: ovulation - 2 * DAY_MS,
    nextPeriod: periodStartMs + cycleLength * DAY_MS,
  };
}

/** "10–16 يناير 2026" or "29 يناير – 2 فبراير 2026". */
export function dateRangeText(aMs: number, bMs: number): string {
  const a = new Date(aMs);
  const b = new Date(bMs);
  const [ad, am, ay] = [a.getUTCDate(), a.getUTCMonth(), a.getUTCFullYear()];
  const [bd, bm, by] = [b.getUTCDate(), b.getUTCMonth(), b.getUTCFullYear()];
  if (ay === by && am === bm) return `${ad}–${bd} ${GREGORIAN_MONTHS[bm]} ${by}`;
  if (ay === by) return `${ad} ${GREGORIAN_MONTHS[am]} – ${bd} ${GREGORIAN_MONTHS[bm]} ${by}`;
  return `${ad} ${GREGORIAN_MONTHS[am]} ${ay} – ${bd} ${GREGORIAN_MONTHS[bm]} ${by}`;
}

const dayMonth = (ms: number) => {
  const t = new Date(ms);
  return `${t.getUTCDate()} ${GREGORIAN_MONTHS[t.getUTCMonth()]}`;
};

export function calculateOvulation(inputs: OvulationInputs): CalculationResult {
  const fail = (error: string): CalculationResult => ({
    primary: { id: 'ovulation', label: 'يوم التبويض المتوقع', value: '-', formattedValue: '-' },
    error,
  });

  const start = parseDateInput(inputs.lmpDate);
  if (!start) return fail('أدخلي تاريخاً ميلادياً صحيحاً بصيغة سنة-شهر-يوم (مثل 2026-11-01).');

  const cycle = Math.round(Number(inputs.cycleLength ?? 28));
  if (!Number.isFinite(cycle) || cycle < 20 || cycle > 45) return fail('طول الدورة الشهرية يجب أن يكون بين 20 و 45 يوماً.');

  const shown = Math.min(12, Math.max(1, Math.round(Number(inputs.cyclesToShow ?? 3)) || 3));

  const lmpMs = Date.UTC(start.y, start.m - 1, start.d);
  const first = cycleDates(lmpMs, cycle);
  const ov = describeDate(first.ovulation);
  const cycleDay = cycle - LUTEAL_PHASE_DAYS + 1;
  const fertileText = dateRangeText(first.fertileStart, first.fertileEnd);
  const peakText = dateRangeText(first.peakStart, first.ovulation);
  const next = describeDate(first.nextPeriod);
  const dueMs = lmpMs + (GESTATION_DAYS + cycle - 28) * DAY_MS;

  const rows = [];
  for (let i = 0; i < shown; i++) {
    const c = cycleDates(lmpMs + i * cycle * DAY_MS, cycle);
    rows.push({
      period: `الدورة ${i + 1}`,
      values: {
        periodStart: dayMonth(c.periodStart),
        fertile: dateRangeText(c.fertileStart, c.fertileEnd),
        ovulation: dayMonth(c.ovulation),
        nextPeriod: dayMonth(c.nextPeriod),
      },
    });
  }

  const warnings: string[] = [];
  if (cycle < 21 || cycle > 35) {
    warnings.push(
      'طول دورتك خارج المدى المعتاد (21–35 يوماً)، فقد تكون الدورة غير منتظمة أو بلا تبويض أحياناً؛ يفيد هنا تتبع التبويض بشرائط الاختبار أو مراجعة الطبيبة.'
    );
  }

  return {
    primary: {
      id: 'ovulation',
      label: 'يوم التبويض المتوقع',
      value: toIso(first.ovulation),
      formattedValue: ov.full,
      badge: `أيام الخصوبة ${fertileText}`,
      highlight: true,
      helpText: `اليوم ${cycleDay} من الدورة • يوافق ${ov.hijri}`,
    },
    directAnswer: `إذا بدأت آخر دورة في ${describeDate(lmpMs).gregorian} وطول دورتك ${cycle} يوماً، فالتبويض المتوقع ${ov.full} (اليوم ${cycleDay} من الدورة)، وأيام الخصوبة من ${fertileText}، وأعلى فرصة للحمل ${peakText}، والدورة التالية ${next.gregorian}.`,
    secondary: [
      { id: 'fertileWindow', label: 'أيام الخصوبة (نافذة الحمل)', value: fertileText, helpText: '5 أيام قبل التبويض ويوم بعده' },
      { id: 'peakDays', label: 'أعلى فرصة للحمل', value: peakText, helpText: 'اليومان قبل التبويض ويوم التبويض' },
      { id: 'cycleDay', label: 'يوم التبويض في دورتك', value: cycleDay, unit: `من ${cycle}` },
      { id: 'nextPeriod', label: 'موعد الدورة القادمة', value: next.full },
      { id: 'testDate', label: 'أبكر موعد دقيق لاختبار الحمل المنزلي', value: next.gregorian, helpText: 'يوم تأخر الدورة' },
      { id: 'dueIfConceived', label: 'موعد الولادة إن حدث الحمل في هذه الدورة', value: describeDate(dueMs).gregorian },
    ],
    breakdown: {
      title: 'مواعيد التبويض للدورات القادمة',
      periodLabel: 'الدورة',
      columns: [
        { key: 'periodStart', label: 'بداية الدورة' },
        { key: 'fertile', label: 'أيام الخصوبة' },
        { key: 'ovulation', label: 'التبويض' },
        { key: 'nextPeriod', label: 'الدورة التالية' },
      ],
      rows,
    },
    calculationSteps: [
      `يوم التبويض = أول يوم من آخر دورة + (${cycle} − 14) = + ${cycle - LUTEAL_PHASE_DAYS} يوماً = ${ov.gregorian}`,
      `أيام الخصوبة = من 5 أيام قبل التبويض إلى يوم بعده = ${fertileText}`,
      `الدورة القادمة = أول يوم من آخر دورة + ${cycle} يوماً = ${next.gregorian}`,
    ],
    warnings: warnings.length ? warnings : undefined,
    assumptions: [
      'تفترض الحاسبة أن المرحلة بين التبويض والدورة التالية 14 يوماً، وهي تختلف بين 10 و16 يوماً عند بعض النساء، فقد يتقدم التبويض أو يتأخر يومين.',
      'الحاسبة لا تصلح وسيلةً لمنع الحمل؛ فالتبويض قد يتغير من دورة لأخرى بسبب التوتر أو المرض أو السفر.',
    ],
  };
}
