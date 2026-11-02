import { CalculatorInput } from '../../types/calculator';

export const vatSchema: CalculatorInput[] = [
  {
    id: 'amount',
    label: 'المبلغ المالي',
    type: 'currency',
    defaultValue: 1000,
    min: 0,
    required: true,
    helpText: 'أدخل المبلغ المراد احتساب الضريبة له بالعملة المحلية.',
    exampleValue: 1000,
  },
  {
    id: 'isVatInclusive',
    label: 'المبلغ شامل الضريبة؟',
    type: 'boolean',
    defaultValue: false,
    helpText: 'اختر نعم إذا كان المبلغ المدخل أعلاه يحتوي بالفعل على قيمة الضريبة وتريد استخراجها.',
  },
  {
    id: 'customRate',
    label: 'نسبة ضريبة مخصصة (%)',
    type: 'percentage',
    defaultValue: '',
    min: 0,
    max: 100,
    helpText: 'اتركه فارغاً لاعتماد النسبة الرسمية للدولة المحددة، أو أدخل نسبة مخصصة للاختبار.',
  },
];
