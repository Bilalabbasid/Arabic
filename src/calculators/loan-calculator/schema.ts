import { CalculatorInput } from '../../types/calculator';

export const loanSchema: CalculatorInput[] = [
  {
    id: 'loanAmount',
    label: 'مبلغ القرض / التمويل',
    type: 'currency',
    defaultValue: 100000,
    min: 1000,
    required: true,
    helpText: 'المبلغ الإجمالي المراد اقتراضه أو تمويله.',
    exampleValue: 100000,
  },
  {
    id: 'annualInterestRate',
    label: 'نسبة الفائدة / الربح السنوية (%)',
    type: 'percentage',
    defaultValue: 4.5,
    min: 0.1,
    max: 50,
    step: 0.1,
    required: true,
    helpText: 'النسبة السنوية المعلنة من البنك أو شركة التمويل.',
    exampleValue: 4.5,
  },
  {
    id: 'loanTermYears',
    label: 'مدة التمويل (بالسنوات)',
    type: 'number',
    defaultValue: 5,
    min: 1,
    max: 30,
    required: true,
    helpText: 'عدد سنوات سداد القرض (تمويل السيارات عادة من 3 إلى 5 سنوات).',
    exampleValue: 5,
  },
  {
    id: 'interestType',
    label: 'نوع الفائدة',
    type: 'select',
    defaultValue: 'reducing',
    options: [
      { value: 'reducing', label: 'فائدة متناقصة (شائعة بالبنوك)' },
      { value: 'flat', label: 'فائدة ثابتة (شائعة بشركات السيارات)' },
    ],
  },
  {
    id: 'monthlySalary',
    label: 'الراتب الشهري (اختياري للتحقق من عبء الدين)',
    type: 'currency',
    defaultValue: '',
    helpText: 'للتحقق من نسبة الاستقطاع القصوى المسموحة وفق تعليمات البنك المركزي.',
  },
];
