import { CalculatorInput } from '../../types/calculator';

export const fuelConsumptionSchema: CalculatorInput[] = [
  {
    id: 'value',
    label: 'القيمة المراد تحويلها',
    type: 'decimal',
    defaultValue: 8.5,
    min: 0.1,
    max: 100,
    required: true,
    exampleValue: 8.5,
  },
  {
    id: 'fromUnit',
    label: 'الوحدة المدخلة',
    type: 'select',
    defaultValue: 'l_100km',
    options: [
      { value: 'l_100km', label: 'لتر لكل 100 كم (L/100km - النظام المتري الشائع)' },
      { value: 'km_l', label: 'كيلومتر لكل لتر (km/L - بطاقة كفاءة الطاقة)' },
      { value: 'mpg_us', label: 'ميل لكل جالون أمريكي (MPG US)' },
      { value: 'mpg_uk', label: 'ميل لكل جالون بريطاني (MPG UK)' },
    ],
  },
];
