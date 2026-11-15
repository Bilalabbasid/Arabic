import { CalculationResult } from '../../types/calculator';

export type GpaScale = '5' | '4';
export type LetterGrade = 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D+' | 'D' | 'F';

export const MAX_GPA_COURSES = 8;

export const LETTER_GRADES: LetterGrade[] = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];

/** Grade points per letter on the Saudi 5-point and 4-point university scales. */
export const GRADE_POINTS: Record<GpaScale, Record<LetterGrade, number>> = {
  '5': { 'A+': 5, A: 4.75, 'B+': 4.5, B: 4, 'C+': 3.5, C: 3, 'D+': 2.5, D: 2, F: 1 },
  '4': { 'A+': 4, A: 3.75, 'B+': 3.5, B: 3, 'C+': 2.5, C: 2, 'D+': 1.5, D: 1, F: 0 },
};

/** Arabic grade name (التقدير) for each letter grade. */
export const GRADE_LABELS_AR: Record<LetterGrade, string> = {
  'A+': 'ممتاز مرتفع',
  A: 'ممتاز',
  'B+': 'جيد جداً مرتفع',
  B: 'جيد جداً',
  'C+': 'جيد مرتفع',
  C: 'جيد',
  'D+': 'مقبول مرتفع',
  D: 'مقبول',
  F: 'راسب',
};

/**
 * General rating band (التقدير العام) for a cumulative GPA, using the thresholds
 * of the unified Saudi undergraduate study regulation:
 * 5-scale: ممتاز ≥ 4.50، جيد جداً ≥ 3.75، جيد ≥ 2.75، مقبول ≥ 2.00
 * 4-scale: ممتاز ≥ 3.50، جيد جداً ≥ 2.75، جيد ≥ 1.75، مقبول ≥ 1.00
 */
export function getGpaRating(gpa: number, scale: GpaScale): string {
  const t = scale === '5' ? [4.5, 3.75, 2.75, 2.0] : [3.5, 2.75, 1.75, 1.0];
  if (gpa >= t[0]) return 'ممتاز';
  if (gpa >= t[1]) return 'جيد جداً';
  if (gpa >= t[2]) return 'جيد';
  if (gpa >= t[3]) return 'مقبول';
  return 'أقل من الحد الأدنى للنجاح (إنذار أكاديمي محتمل)';
}

/** Closest letter grade for a GPA value (used to describe the average). */
function nearestLetterForGpa(gpa: number, scale: GpaScale): LetterGrade {
  const points = GRADE_POINTS[scale];
  for (const letter of LETTER_GRADES) {
    if (gpa >= points[letter]) return letter;
  }
  return 'F';
}

export interface GpaCourse {
  hours: number;
  grade: LetterGrade;
}

export interface GpaInputs {
  scale?: GpaScale | string;
  coursesCount?: number | string;
  courses?: GpaCourse[];
  includePrevious?: 'yes' | 'no' | string;
  previousGpa?: number | string;
  previousHours?: number | string;
  [key: string]: any;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Reads course rows either from an explicit `courses` array or from course{n}Hours / course{n}Grade fields. */
function collectCourses(inputs: GpaInputs): GpaCourse[] {
  if (Array.isArray(inputs.courses)) {
    return inputs.courses
      .map((c) => ({ hours: Number(c.hours) || 0, grade: c.grade }))
      .filter((c) => c.hours > 0 && LETTER_GRADES.includes(c.grade));
  }
  const count = Math.min(MAX_GPA_COURSES, Math.max(1, Number(inputs.coursesCount) || MAX_GPA_COURSES));
  const rows: GpaCourse[] = [];
  for (let i = 1; i <= count; i++) {
    const hours = Number(inputs[`course${i}Hours`]) || 0;
    const grade = String(inputs[`course${i}Grade`] || '') as LetterGrade;
    if (hours > 0 && LETTER_GRADES.includes(grade)) {
      rows.push({ hours, grade });
    }
  }
  return rows;
}

export function calculateGpa(inputs: GpaInputs): CalculationResult {
  const scale: GpaScale = String(inputs.scale) === '4' ? '4' : '5';
  const maxPoints = scale === '5' ? 5 : 4;
  const points = GRADE_POINTS[scale];
  const courses = collectCourses(inputs);

  if (courses.some((c) => c.hours < 0) || courses.length === 0) {
    return {
      primary: { label: 'المعدل الفصلي', value: 0, formattedValue: '-' },
      error: 'أدخل عدد ساعات أكبر من صفر لمادة واحدة على الأقل مع اختيار التقدير.',
    };
  }

  let semesterHours = 0;
  let semesterPoints = 0;
  const steps: string[] = [];
  const rows = courses.map((c, idx) => {
    const p = points[c.grade];
    const weighted = p * c.hours;
    semesterHours += c.hours;
    semesterPoints += weighted;
    steps.push(`المادة ${idx + 1}: ${c.hours} ساعات × ${p} (${c.grade} – ${GRADE_LABELS_AR[c.grade]}) = ${round2(weighted)} نقطة`);
    return {
      period: idx + 1,
      values: {
        hours: c.hours,
        grade: `${c.grade} (${GRADE_LABELS_AR[c.grade]})`,
        points: p,
        weighted: round2(weighted),
      },
    };
  });

  const semesterGpa = semesterPoints / semesterHours;
  steps.push(`المعدل الفصلي = ${round2(semesterPoints)} ÷ ${semesterHours} ساعة = ${semesterGpa.toFixed(2)} من ${maxPoints}`);

  const usePrevious = String(inputs.includePrevious) === 'yes';
  const prevGpa = Number(inputs.previousGpa) || 0;
  const prevHours = Number(inputs.previousHours) || 0;
  const warnings: string[] = [];

  let cumulativeGpa = semesterGpa;
  let totalHours = semesterHours;
  let hasPrevious = false;

  if (usePrevious && prevHours > 0) {
    if (prevGpa < 0 || prevGpa > maxPoints) {
      return {
        primary: { label: 'المعدل التراكمي', value: 0, formattedValue: '-' },
        error: `المعدل التراكمي السابق يجب أن يكون بين 0 و ${maxPoints} في نظام ${maxPoints} نقاط.`,
      };
    }
    hasPrevious = true;
    const prevPoints = prevGpa * prevHours;
    totalHours = prevHours + semesterHours;
    cumulativeGpa = (prevPoints + semesterPoints) / totalHours;
    steps.push(`نقاط الفصول السابقة = ${prevGpa} × ${prevHours} ساعة = ${round2(prevPoints)} نقطة`);
    steps.push(
      `المعدل التراكمي الجديد = (${round2(prevPoints)} + ${round2(semesterPoints)}) ÷ (${prevHours} + ${semesterHours}) = ${cumulativeGpa.toFixed(2)}`
    );
  } else if (usePrevious) {
    warnings.push('لم تُدخل عدد الساعات السابقة، لذلك حُسب المعدل من مواد هذا الفصل فقط.');
  }

  const rating = getGpaRating(cumulativeGpa, scale);
  const nearest = nearestLetterForGpa(cumulativeGpa, scale);
  const label = hasPrevious ? 'معدلك التراكمي الجديد' : 'معدلك الفصلي (التراكمي لهذه المواد)';

  return {
    primary: {
      id: 'gpa',
      label,
      value: round2(cumulativeGpa),
      formattedValue: `${cumulativeGpa.toFixed(2)} من ${maxPoints}`,
      badge: `التقدير العام: ${rating}`,
      highlight: true,
    },
    directAnswer: `معدلك ${cumulativeGpa.toFixed(2)} من ${maxPoints} بتقدير عام "${rating}" (أقرب رمز: ${nearest} – ${GRADE_LABELS_AR[nearest]}).`,
    secondary: [
      { id: 'semesterGpa', label: 'المعدل الفصلي لهذه المواد', value: round2(semesterGpa), formattedValue: semesterGpa.toFixed(2) },
      { id: 'rating', label: 'التقدير العام', value: rating },
      { id: 'semesterHours', label: 'ساعات هذا الفصل', value: semesterHours, unit: 'ساعة' },
      { id: 'totalHours', label: 'إجمالي الساعات المحتسبة', value: totalHours, unit: 'ساعة' },
      { id: 'semesterPoints', label: 'مجموع نقاط هذا الفصل', value: round2(semesterPoints), formattedValue: String(round2(semesterPoints)) },
    ],
    details: [
      { label: 'نظام المعدل', value: scale === '5' ? 'من 5 نقاط' : 'من 4 نقاط' },
      { label: 'عدد المواد المحتسبة', value: courses.length },
      { label: 'المعدل كنسبة من الحد الأعلى', value: `${((cumulativeGpa / maxPoints) * 100).toFixed(1)}%` },
    ],
    breakdown: {
      periodLabel: 'المادة',
      columns: [
        { key: 'hours', label: 'الساعات' },
        { key: 'grade', label: 'التقدير' },
        { key: 'points', label: 'النقاط' },
        { key: 'weighted', label: 'النقاط × الساعات' },
      ],
      rows,
    },
    calculationSteps: steps,
    warnings: warnings.length ? warnings : undefined,
    assumptions: [
      scale === '5'
        ? 'سلم النقاط من 5: A+ = 5، A = 4.75، B+ = 4.5، B = 4، C+ = 3.5، C = 3، D+ = 2.5، D = 2، F = 1.'
        : 'سلم النقاط من 4: A+ = 4، A = 3.75، B+ = 3.5، B = 3، C+ = 2.5، C = 2، D+ = 1.5، D = 1، F = 0.',
      'حدود التقدير العام وفق اللائحة الموحدة للدراسة الجامعية؛ تحقق من لائحة جامعتك لأي استثناءات (مثل استبدال المادة المعادة).',
    ],
  };
}
