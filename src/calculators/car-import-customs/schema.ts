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
];
