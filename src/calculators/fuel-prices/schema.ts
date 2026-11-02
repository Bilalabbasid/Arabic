import { CalculatorInput } from '../../types/calculator';

export const fuelPricesSchema: CalculatorInput[] = [
  {
    id: 'tankSizeLiters',
    label: 'سعة خزان وقود السيارة (لتر)',
    type: 'number',
    defaultValue: 50,
    min: 20,
    max: 200,
    required: true,
    helpText: 'سعة خزان الوقود لسيارتك باللتر (السيارات المدمجة 45-50 لتر، الجيب وسيارات الدفع الرباعي 70-100 لتر).',
    exampleValue: 50,
  },
  {
    id: 'fuelGrade',
    label: 'فئة الوقود',
    type: 'select',
    defaultValue: 'octane91',
    options: [
      { value: 'octane91', label: 'بنزين 91 ممتاز' },
      { value: 'octane95', label: 'بنزين 95 سوبر' },
      { value: 'diesel', label: 'ديزل' },
    ],
  },
];
