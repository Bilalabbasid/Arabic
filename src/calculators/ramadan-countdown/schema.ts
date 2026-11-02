import { CalculatorInput } from '../../types/calculator';

export const ramadanCountdownSchema: CalculatorInput[] = [
  {
    id: 'targetHijriYear',
    label: 'عام شهر رمضان المبارك',
    type: 'select',
    defaultValue: '1448',
    options: [
      { value: '1448', label: 'رمضان 1448 هـ (الموافق 2027 م)' },
      { value: '1449', label: 'رمضان 1449 هـ (الموافق 2028 م)' },
    ],
  },
];
