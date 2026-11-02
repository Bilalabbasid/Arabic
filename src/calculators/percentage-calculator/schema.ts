import { CalculatorInput } from '../../types/calculator';

export const percentageSchema: CalculatorInput[] = [
  {
    id: 'calculationType',
    label: 'نوع العملية المئوية',
    type: 'select',
    defaultValue: 'percent_of',
    options: [
      { value: 'percent_of', label: 'حساب نسبة X% من العدد Y (مثال: ما هي 15% من 200؟)' },
      { value: 'is_what_percent_of', label: 'معرفة كم تمثل نسبة العدد X من Y (مثال: كم نسبة 30 من 120؟)' },
      { value: 'percent_change', label: 'حساب نسبة الزيادة أو النقصان بين رقمين' },
    ],
  },
  {
    id: 'percentage',
    label: 'الرقم الأول / النسبة المئوية',
    type: 'decimal',
    defaultValue: 15,
    required: true,
    exampleValue: 15,
  },
  {
    id: 'totalNumber',
    label: 'الرقم الثاني / الإجمالي',
    type: 'decimal',
    defaultValue: 200,
    required: true,
    exampleValue: 200,
  },
];
