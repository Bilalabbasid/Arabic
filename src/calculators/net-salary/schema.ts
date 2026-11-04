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
    id: 'insuranceSystem',
    label: 'نظام التأمينات للمواطن',
    type: 'select',
    defaultValue: 'legacy',
    options: [
      { value: 'legacy', label: 'مسجل قبل صدور النظام الجديد' },
      { value: 'new', label: 'أول تسجيل بعد صدور النظام الجديد' },
    ],
    helpText:
      'السعودية: النظام الجديد يطبق على من سُجل لأول مرة بعد 3 يوليو 2024. الإمارات: على من سُجل لأول مرة بعد 31 أكتوبر 2023. لا يؤثر في بقية الدول ولا على المقيمين.',
  },
  {
    id: 'fixedAllowances',
    label: 'بدلات إضافية غير خاضعة للتأمينات (اختياري)',
    type: 'currency',
    defaultValue: 0,
    helpText: 'أي بدلات تضاف مباشرة إلى صافي الراتب ولا يخصم منها تأمين.',
  },
];
