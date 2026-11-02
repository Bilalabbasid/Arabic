import { CalculatorInput } from '../../types/calculator';

export const carDepreciationSchema: CalculatorInput[] = [
  {
    id: 'purchasePrice',
    label: 'سعر شراء السيارة الأصلي (جديدة)',
    type: 'currency',
    defaultValue: 100000,
    min: 10000,
    required: true,
    exampleValue: 100000,
  },
  {
    id: 'vehicleAgeYears',
    label: 'عمر السيارة (بالسنوات)',
    type: 'number',
    defaultValue: 3,
    min: 1,
    max: 15,
    required: true,
    exampleValue: 3,
  },
  {
    id: 'brandTier',
    label: 'فئة ونوع السيارة',
    type: 'select',
    defaultValue: 'mainstream',
    options: [
      { value: 'mainstream', label: 'سيارات عائلية وشائعة (تويوتا، هيونداي، نيسان...)' },
      { value: 'luxury', label: 'سيارات فاخرة (مرسيدس، بي إم دبليو، أودي...)' },
      { value: 'economy', label: 'سيارات صغيرة واقتصادية' },
    ],
  },
];
