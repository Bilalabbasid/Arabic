import { CalculatorInput } from '../../types/calculator';

export const trafficFinesSchema: CalculatorInput[] = [
  {
    id: 'violationIndex',
    label: 'نوع المخالفة المرورية',
    type: 'select',
    defaultValue: '0',
    options: [
      { value: '0', label: 'تجاوز السرعة بأكثر من 10 إلى 20 كم/س' },
      { value: '1', label: 'تجاوز السرعة بأكثر من 20 إلى 30 كم/س' },
      { value: '2', label: 'تجاوز إشارة الضوء الأحمر' },
      { value: '3', label: 'عدم ربط حزام الأمان' },
      { value: '4', label: 'استخدام الهاتف المحمول باليد أثناء القيادة' },
    ],
  },
  {
    id: 'discountPercent',
    label: 'نسبة تخفيض المخالفات الرسمية (إن وُجدت مبادرة تخفيض)',
    type: 'select',
    defaultValue: '0',
    options: [
      { value: '0', label: 'بدون تخفيض (القيمة الكاملة)' },
      { value: '25', label: 'تخفيض 25% (السداد المبكر)' },
      { value: '50', label: 'تخفيض 50% (المبادرات الوطنية)' },
    ],
  },
];
