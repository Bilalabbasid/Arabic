import { CalculatorInput } from '../../types/calculator';

export const vehicleFeesSchema: CalculatorInput[] = [
  {
    id: 'renewalYears',
    label: 'مدة التجديد (بالسنوات)',
    type: 'select',
    defaultValue: '3',
    options: [
      { value: '1', label: 'سنة واحدة' },
      { value: '2', label: 'سنتان' },
      { value: '3', label: '3 سنوات (المدة القياسية)' },
    ],
  },
  {
    id: 'includeInspection',
    label: 'إضافة رسوم الفحص الدوري للمركبة؟',
    type: 'boolean',
    defaultValue: true,
    helpText: 'الفحص الفني الدوري إلزامي لتجديد رخصة السير لمعظم المركبات التي مضى على صنعها أكثر من 3 سنوات.',
  },
];
