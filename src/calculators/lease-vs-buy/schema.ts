import { CalculatorInput } from '../../types/calculator';

export const leaseVsBuySchema: CalculatorInput[] = [
  {
    id: 'carPrice',
    label: 'سعر شراء السيارة',
    type: 'currency',
    defaultValue: 100000,
    min: 10000,
    required: true,
    exampleValue: 100000,
  },
  {
    id: 'downPayment',
    label: 'الدفعة الأولى للشراء',
    type: 'currency',
    defaultValue: 10000,
    min: 0,
  },
  {
    id: 'monthlyLeasePayment',
    label: 'قسط الإيجار / التأجير الشهري',
    type: 'currency',
    defaultValue: 1800,
    min: 100,
    required: true,
    exampleValue: 1800,
  },
  {
    id: 'expectedResaleValueAfter5Years',
    label: 'قيمة بيع السيارة المتوقعة بعد 5 سنوات (اختياري)',
    type: 'currency',
    defaultValue: '',
    helpText: 'اتركه فارغاً لاعتماد التقدير القياسي (45% من سعر الشراء).',
  },
];
