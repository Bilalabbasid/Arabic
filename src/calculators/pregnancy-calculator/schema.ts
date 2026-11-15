import { CalculatorInput } from '../../types/calculator';

export const pregnancySchema: CalculatorInput[] = [
  {
    id: 'method',
    label: 'طريقة الحساب',
    type: 'select',
    defaultValue: 'lmp',
    helpText: 'اختاري آخر دورة إن لم تعرفي تاريخ الإخصاب؛ وفي أطفال الأنابيب اختاري عمر الأجنة يوم الإرجاع.',
    options: [
      { value: 'lmp', label: 'أول يوم من آخر دورة شهرية (الأكثر استخداماً)' },
      { value: 'conception', label: 'تاريخ الإخصاب أو التبويض' },
      { value: 'ivf5', label: 'أطفال الأنابيب: إرجاع أجنة عمر 5 أيام' },
      { value: 'ivf3', label: 'أطفال الأنابيب: إرجاع أجنة عمر 3 أيام' },
    ],
  },
  {
    id: 'startDate',
    label: 'أول يوم من آخر دورة شهرية',
    type: 'date',
    defaultValue: '2026-06-01',
    required: true,
    placeholder: '2026-06-01',
    helpText: 'اختاري التاريخ من التقويم أو اكتبيه بصيغة سنة-شهر-يوم.',
    conditionalLabels: [
      { condition: { field: 'method', value: 'conception' }, label: 'تاريخ الإخصاب أو التبويض' },
      { condition: { field: 'method', value: 'ivf5' }, label: 'تاريخ إرجاع الأجنة' },
      { condition: { field: 'method', value: 'ivf3' }, label: 'تاريخ إرجاع الأجنة' },
    ],
  },
  {
    id: 'cycleLength',
    label: 'متوسط طول الدورة الشهرية',
    type: 'number',
    defaultValue: 28,
    min: 20,
    max: 45,
    step: 1,
    unit: 'يوم',
    helpText: 'عدد الأيام من أول يوم في دورة إلى أول يوم في الدورة التالية؛ اتركيه 28 إن لم تعرفيه.',
    dependsOn: { field: 'method', value: 'lmp' },
  },
  {
    id: 'asOfDate',
    label: 'حساب عمر الحمل بتاريخ (اختياري)',
    type: 'date',
    defaultValue: '',
    required: false,
    helpText: 'اتركيه فارغاً لحساب عمر الحمل اليوم، أو اختاري تاريخاً لمعرفة عمر الحمل فيه.',
  },
];
