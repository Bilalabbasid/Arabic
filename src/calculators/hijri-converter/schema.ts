import { CalculatorInput } from '../../types/calculator';

export const hijriConverterSchema: CalculatorInput[] = [
  {
    id: 'conversionMode',
    label: 'نوع التحويل',
    type: 'select',
    defaultValue: 'gregorian_to_hijri',
    options: [
      { value: 'gregorian_to_hijri', label: 'تحويل من ميلادي إلى هجري' },
      { value: 'hijri_to_gregorian', label: 'تحويل من هجري إلى ميلادي' },
    ],
  },
  {
    id: 'day',
    label: 'اليوم (1 - 31)',
    type: 'number',
    defaultValue: 2,
    min: 1,
    max: 31,
    required: true,
  },
  {
    id: 'month',
    label: 'الشهر (1 - 12)',
    type: 'number',
    defaultValue: 11,
    min: 1,
    max: 12,
    required: true,
  },
  {
    id: 'year',
    label: 'السنة',
    type: 'number',
    defaultValue: 2026,
    min: 1300,
    max: 2100,
    required: true,
  },
];
