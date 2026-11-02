import { CalculatorInput } from '../../types/calculator';

export const timeSchema: CalculatorInput[] = [
  {
    id: 'value',
    label: 'القيمة الزمنية',
    type: 'number',
    defaultValue: 24,
    min: 0,
    required: true,
    exampleValue: 24,
  },
  {
    id: 'fromUnit',
    label: 'الوحدة الزمنية الحالية',
    type: 'select',
    defaultValue: 'hours',
    options: [
      { value: 'seconds', label: 'ثانية (s)' },
      { value: 'minutes', label: 'دقيقة (min)' },
      { value: 'hours', label: 'ساعة (h)' },
      { value: 'days', label: 'يوم (d)' },
      { value: 'weeks', label: 'أسبوع (wk)' },
      { value: 'months', label: 'شهر (mo)' },
      { value: 'years', label: 'سنة (yr)' },
    ],
  },
];
