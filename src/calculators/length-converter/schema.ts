import { CalculatorInput } from '../../types/calculator';

export const lengthSchema: CalculatorInput[] = [
  {
    id: 'value',
    label: 'القيمة العددية للطول أو المسافة',
    type: 'decimal',
    defaultValue: 10,
    min: 0,
    required: true,
    exampleValue: 10,
  },
  {
    id: 'fromUnit',
    label: 'الوحدة الحالية',
    type: 'select',
    defaultValue: 'kilometer',
    options: [
      { value: 'kilometer', label: 'كيلومتر (km)' },
      { value: 'meter', label: 'متر (m)' },
      { value: 'centimeter', label: 'سنتيمتر (cm)' },
      { value: 'millimeter', label: 'مليمتر (mm)' },
      { value: 'mile', label: 'ميل (Mile)' },
      { value: 'yard', label: 'ياردة (Yard)' },
      { value: 'foot', label: 'قدم (Foot)' },
      { value: 'inch', label: 'بوصة / إنش (Inch)' },
    ],
  },
];
