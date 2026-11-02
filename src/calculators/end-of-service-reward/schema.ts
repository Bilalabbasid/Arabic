import { CalculatorInput } from '../../types/calculator';

export const eosSchema: CalculatorInput[] = [
  {
    id: 'lastSalary',
    label: 'آخر راتب شهري',
    type: 'currency',
    defaultValue: 10000,
    min: 500,
    required: true,
    helpText: 'الأجر المعتمد لحساب المكافأة (الأساسي أو الإجمالي حسب نظام دولة العمل).',
    exampleValue: 10000,
  },
  {
    id: 'serviceYears',
    label: 'سنوات الخدمة الكاملة',
    type: 'number',
    defaultValue: 6,
    min: 0,
    max: 50,
    required: true,
    helpText: 'عدد السنوات التي قضيتها في العمل لدى نفس صاحب العمل.',
    exampleValue: 6,
  },
  {
    id: 'serviceMonths',
    label: 'الأشهر الإضافية',
    type: 'number',
    defaultValue: 0,
    min: 0,
    max: 11,
    helpText: 'الأشهر الزائدة عن السنوات الكاملة لاحتساب كسر السنة بدقة.',
  },
  {
    id: 'separationReason',
    label: 'سبب انتهاء العلاقة العمالية',
    type: 'select',
    defaultValue: 'termination',
    options: [
      { value: 'termination', label: 'إنهاء الخدمة من قِبل صاحب العمل (مكافأة كاملة)' },
      { value: 'contract_end', label: 'انتهاء مدة العقد المحدد (مكافأة كاملة)' },
      { value: 'resignation', label: 'استقالة العامل (تخضع لجدول الاستقالة النظامي)' },
    ],
  },
];
