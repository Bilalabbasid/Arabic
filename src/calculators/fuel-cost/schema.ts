import { CalculatorInput } from '../../types/calculator';

export const fuelCostSchema: CalculatorInput[] = [
  {
    id: 'distanceKm',
    label: 'المسافة المقطوعة (كم)',
    type: 'number',
    defaultValue: 250,
    min: 1,
    max: 50000,
    required: true,
    helpText: 'المسافة الإجمالية لرحلتك أو مشوارك بالكيلومتر ذهاباً فقط.',
    exampleValue: 250,
  },
  {
    id: 'fuelConsumption',
    label: 'معدل استهلاك السيارة (لتر / 100 كم)',
    type: 'decimal',
    defaultValue: 8.5,
    min: 2,
    max: 40,
    step: 0.1,
    required: true,
    helpText: 'متوسط استهلاك سيارتك المسجل على شاشة العداد أو كتيب السيارة (عادة 7-10 لتر للسيارات الصغيرة والمتوسطة).',
    exampleValue: 8.5,
  },
  {
    id: 'fuelGrade',
    label: 'نوع الوقود',
    type: 'select',
    defaultValue: 'octane91',
    options: [
      { value: 'octane91', label: 'بنزين عادي (91 أو أقرب نوع)' },
      { value: 'octane95', label: 'بنزين 95 أو أعلى' },
      { value: 'diesel', label: 'ديزل / سولار' },
    ],
  },
  {
    id: 'customFuelPrice',
    label: 'سعر لتر الوقود اليوم (اختياري)',
    type: 'currency',
    defaultValue: '',
    min: 0,
    helpText: 'اتركه فارغاً لاستخدام السعر الرسمي المسجل لدولتك، أو أدخل سعر المحطة اليوم إذا تغير.',
  },
];
