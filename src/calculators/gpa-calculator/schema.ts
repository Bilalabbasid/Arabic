import { CalculatorInput } from '../../types/calculator';
import { GRADE_LABELS_AR, LETTER_GRADES, MAX_GPA_COURSES } from './calculate';

const GRADE_OPTIONS = LETTER_GRADES.map((g) => ({ value: g, label: `${g} – ${GRADE_LABELS_AR[g]}` }));

// Sample semester shown on first load: 4 courses filled in, the rest empty.
const DEFAULT_ROWS: Array<{ hours: number; grade: string }> = [
  { hours: 3, grade: 'A+' },
  { hours: 3, grade: 'B' },
  { hours: 4, grade: 'B+' },
  { hours: 2, grade: 'A' },
];

function visibleFrom(index: number): string[] {
  const values: string[] = [];
  for (let n = index; n <= MAX_GPA_COURSES; n++) values.push(String(n));
  return values;
}

const courseRows: CalculatorInput[] = [];
for (let i = 1; i <= MAX_GPA_COURSES; i++) {
  const def = DEFAULT_ROWS[i - 1];
  courseRows.push(
    {
      id: `course${i}Hours`,
      label: `ساعات المادة ${i}`,
      type: 'number',
      defaultValue: def ? def.hours : 0,
      min: 0,
      max: 12,
      step: 1,
      unit: 'ساعة',
      dependsOn: { field: 'coursesCount', value: visibleFrom(i) },
      helpText: i === 1 ? 'عدد الساعات المعتمدة للمادة كما في الجدول الدراسي، واتركها 0 لتجاهل المادة.' : undefined,
    },
    {
      id: `course${i}Grade`,
      label: `تقدير المادة ${i}`,
      type: 'select',
      defaultValue: def ? def.grade : 'A',
      options: GRADE_OPTIONS,
      dependsOn: { field: 'coursesCount', value: visibleFrom(i) },
    }
  );
}

export const gpaSchema: CalculatorInput[] = [
  {
    id: 'scale',
    label: 'نظام المعدل في جامعتك',
    type: 'select',
    defaultValue: '5',
    options: [
      { value: '5', label: 'من 5 نقاط (المعتمد في أغلب الجامعات السعودية)' },
      { value: '4', label: 'من 4 نقاط' },
    ],
    helpText: 'تجد النظام في السجل الأكاديمي أو نظام الخدمات الإلكترونية لجامعتك.',
  },
  {
    id: 'coursesCount',
    label: 'عدد مواد هذا الفصل',
    type: 'select',
    defaultValue: '4',
    options: Array.from({ length: MAX_GPA_COURSES }, (_, k) => ({ value: String(k + 1), label: `${k + 1} مواد` })),
  },
  ...courseRows,
  {
    id: 'includePrevious',
    label: 'هل تريد حساب المعدل التراكمي مع الفصول السابقة؟',
    type: 'select',
    defaultValue: 'no',
    options: [
      { value: 'no', label: 'لا، احسب معدل هذا الفصل فقط' },
      { value: 'yes', label: 'نعم، أضف معدلي التراكمي السابق وساعاته' },
    ],
  },
  {
    id: 'previousGpa',
    label: 'المعدل التراكمي السابق',
    type: 'decimal',
    defaultValue: 4,
    min: 0,
    max: 5,
    step: 0.01,
    dependsOn: { field: 'includePrevious', value: 'yes' },
    helpText: 'معدلك التراكمي قبل هذا الفصل كما يظهر في السجل الأكاديمي.',
  },
  {
    id: 'previousHours',
    label: 'مجموع الساعات المجتازة سابقاً',
    type: 'number',
    defaultValue: 30,
    min: 0,
    max: 300,
    unit: 'ساعة',
    dependsOn: { field: 'includePrevious', value: 'yes' },
    helpText: 'إجمالي الساعات المحتسبة في المعدل التراكمي حتى نهاية الفصل الماضي.',
  },
];
