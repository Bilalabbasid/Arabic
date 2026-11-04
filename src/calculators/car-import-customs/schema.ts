import { CalculatorInput } from '../../types/calculator';

export const carImportSchema: CalculatorInput[] = [
  {
    id: 'carValueFob',
    label: 'سعر شراء السيارة في بلد المنشأ (FOB)',
    type: 'currency',
    defaultValue: 80000,
    min: 1000,
    required: true,
    helpText: 'سعر شراء السيارة من المعرض أو المزاد الخارجي بالعملة المحلية.',
    exampleValue: 80000,
  },
  {
    id: 'shippingAndInsurance',
    label: 'تكلفة الشحن البحري والتأمين (Freight & Insurance)',
    type: 'currency',
    defaultValue: 7000,
    min: 0,
    helpText: 'تكلفة شحن الحاوية أو السفينة والتأمين حتى وصولها للميناء المحلي.',
    exampleValue: 7000,
  },
  {
    id: 'carAgeYears',
    label: 'عمر السيارة من تاريخ الصنع (بالسنوات)',
    type: 'number',
    defaultValue: 2,
    min: 0,
    max: 30,
    helpText: 'للتحقق من شرط سنة الموديل (تمنع أغلب الدول العربية استيراد سيارات الركوب الأقدم من 3 إلى 5 سنوات).',
  },
  {
    id: 'engineCc',
    label: 'سعة المحرك (سم³)',
    type: 'number',
    defaultValue: 1600,
    min: 600,
    max: 8000,
    helpText: 'تؤثر في حساب مصر فقط: الجمارك 40% حتى 1600 سم³ و135% لما يزيد، مع ضريبة جدول ورسم تنمية حسب السعة.',
    exampleValue: 1600,
  },
  {
    id: 'originPreferential',
    label: 'منشأ السيارة',
    type: 'select',
    defaultValue: 'other',
    options: [
      { value: 'other', label: 'منشأ عادي (آسيا، أمريكا، الخليج...)' },
      { value: 'eu', label: 'منشأ أوروبي بشهادة EUR.1 (إعفاء جمركي في مصر)' },
    ],
    helpText: 'في مصر تُعفى السيارات ذات المنشأ الأوروبي من الضريبة الجمركية فقط وفق اتفاقية الشراكة، وتبقى بقية الضرائب.',
  },
];
