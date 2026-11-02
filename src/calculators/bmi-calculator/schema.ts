import { CalculatorInput } from '../../types/calculator';

export const bmiSchema: CalculatorInput[] = [
  {
    id: 'weightKg',
    label: 'الوزن بالكيلوغرام (كجم)',
    type: 'number',
    defaultValue: 75,
    min: 20,
    max: 300,
    required: true,
    exampleValue: 75,
  },
  {
    id: 'heightCm',
    label: 'الطول بالسنتيمتر (سم)',
    type: 'number',
    defaultValue: 175,
    min: 80,
    max: 250,
    required: true,
    exampleValue: 175,
  },
];
