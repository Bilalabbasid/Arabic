import { CalculatorInput } from '../../types/calculator';

export const netSalarySchema: CalculatorInput[] = [
  {
    id: 'grossSalary',
    label: 'الراتب الإجمالي الأساسي',
    type: 'currency',
    defaultValue: 10000,
    min: 500,
    required: true,
    helpText: 'الراتب الكامل المتفق عليه في عقد العمل قبل أي خصم.',
    exampleValue: 10000,
  },
  {
    id: 'isNational',
    label: 'الصفة الوظيفية للموظف',
    type: 'select',
    defaultValue: 'true',
    options: [
      { value: 'true', label: 'مواطن (يخضع لنسب التأمينات والتقاعد الوطنية كاملة)' },
      { value: 'false', label: 'مقيم / وافد (يخضع لنسب الأخطار المهنية أو بدون تأمينات)' },
    ],
  },
  {
    id: 'fixedAllowances',
    label: 'بدلات إضافية غير خاضعة للتأمينات (اختياري)',
    type: 'currency',
    defaultValue: 0,
    helpText: 'أي بدلات تضاف مباشرة إلى صافي الراتب ولا يخصم منها تأمين.',
  },
];
