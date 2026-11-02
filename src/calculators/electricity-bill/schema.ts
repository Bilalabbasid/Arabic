import { CalculatorInput } from '../../types/calculator';

export const electricitySchema: CalculatorInput[] = [
  {
    id: 'consumptionKwh',
    label: 'كمية الاستهلاك الشهري (كيلوواط ساعي / kWh)',
    type: 'number',
    defaultValue: 2500,
    min: 1,
    max: 100000,
    required: true,
    helpText: 'كمية الاستهلاك المسجلة على فاتورة الكهرباء السابقة أو قراءة العداد بالكيلوواط ساعي.',
    exampleValue: 2500,
  },
  {
    id: 'meterServiceFee',
    label: 'رسم خدمة العداد الشهري (اختياري)',
    type: 'currency',
    defaultValue: '',
    helpText: 'اتركه فارغاً لاعتماد الرسم الافتراضي المعتمد في دولتك.',
  },
];
