import { CalculatorInput } from '../../types/calculator';

export const tripCostSchema: CalculatorInput[] = [
  {
    id: 'routeId',
    label: 'اختر المسار بين المدن',
    type: 'select',
    defaultValue: 'riyadh-jeddah',
    options: [
      { value: 'riyadh-jeddah', label: 'الرياض ↔ جدة (950 كم)' },
      { value: 'riyadh-dammam', label: 'الرياض ↔ الدمام (400 كم)' },
      { value: 'jeddah-madinah', label: 'جدة ↔ المدينة المنورة (420 كم)' },
      { value: 'dubai-abudhabi', label: 'دبي ↔ أبوظبي (140 كم)' },
      { value: 'cairo-alexandria', label: 'القاهرة ↔ الإسكندرية (215 كم)' },
    ],
  },
  {
    id: 'customDistanceKm',
    label: 'أو أدخل مسافة مخصصة بالكيلومتر (اختياري)',
    type: 'number',
    defaultValue: '',
    min: 1,
    max: 10000,
  },
  {
    id: 'fuelConsumption',
    label: 'معدل استهلاك السيارة للوقود (لتر / 100 كم)',
    type: 'decimal',
    defaultValue: 8.5,
  },
  {
    id: 'tollFees',
    label: 'رسوم بوابات العبور أو الطرق السريعة (اختياري)',
    type: 'currency',
    defaultValue: 0,
  },
  {
    id: 'passengersCount',
    label: 'عدد الركاب لتقاسم التكلفة',
    type: 'number',
    defaultValue: 1,
    min: 1,
    max: 8,
  },
];
