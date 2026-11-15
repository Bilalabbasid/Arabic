import { CalculatorInput } from '../../types/calculator';

export const dateDifferenceSchema: CalculatorInput[] = [
  {
    id: 'startDate',
    label: 'تاريخ البداية (ميلادي)',
    type: 'date',
    defaultValue: '2026-01-01',
    required: true,
    placeholder: '2026-01-01',
    helpText: 'اختر التاريخ من التقويم أو اكتبه بصيغة سنة-شهر-يوم.',
  },
  {
    id: 'endDate',
    label: 'تاريخ النهاية (ميلادي)',
    type: 'date',
    defaultValue: '2026-03-01',
    required: true,
    placeholder: '2026-03-01',
  },
  {
    id: 'includeEndDay',
    label: 'احتساب يوم النهاية ضمن المدة',
    type: 'select',
    defaultValue: 'no',
    options: [
      { value: 'no', label: 'لا – الفرق الصافي بين التاريخين' },
      { value: 'yes', label: 'نعم – عدّ يوم البداية ويوم النهاية معاً (+1 يوم)' },
    ],
    helpText: 'اختر "نعم" لحساب مدة إجازة أو عقد يشمل اليوم الأخير.',
  },
  {
    id: 'weekend',
    label: 'عطلة نهاية الأسبوع لحساب أيام العمل',
    type: 'select',
    defaultValue: 'fri-sat',
    options: [
      { value: 'fri-sat', label: 'الجمعة والسبت (المعتمدة في السعودية ومعظم دول الخليج)' },
      { value: 'sat-sun', label: 'السبت والأحد' },
    ],
  },
];
