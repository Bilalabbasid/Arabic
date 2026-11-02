import { CalculatorInput } from '../../types/calculator';

export const hijriAgeSchema: CalculatorInput[] = [
  {
    id: 'calendarType',
    label: 'نوع تقويم تاريخ الميلاد',
    type: 'select',
    defaultValue: 'gregorian',
    options: [
      { value: 'gregorian', label: 'تاريخ ميلادي (شمسي)' },
      { value: 'hijri', label: 'تاريخ هجري (قمري)' },
    ],
  },
  {
    id: 'birthDay',
    label: 'يوم الميلاد (1-31)',
    type: 'number',
    defaultValue: 15,
    min: 1,
    max: 31,
    required: true,
  },
  {
    id: 'birthMonth',
    label: 'شهر الميلاد (1-12)',
    type: 'number',
    defaultValue: 6,
    min: 1,
    max: 12,
    required: true,
  },
  {
    id: 'birthYear',
    label: 'سنة الميلاد',
    type: 'number',
    defaultValue: 1995,
    min: 1900,
    max: 2026,
    required: true,
  },
];
