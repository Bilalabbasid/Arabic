import { CalculatorInput } from '../../types/calculator';

export const evVsPetrolSchema: CalculatorInput[] = [
  {
    id: 'annualKm',
    label: 'المسافة المقطوعة سنوياً (كم)',
    type: 'number',
    defaultValue: 20000,
    min: 1000,
    max: 150000,
    required: true,
    helpText: 'متوسط ممشى السيارة في العام (المتوسط الطبيعي بين 15 ألف إلى 25 ألف كم).',
    exampleValue: 20000,
  },
  {
    id: 'petrolConsumptionL100km',
    label: 'استهلاك سيارة البنزين (لتر / 100 كم)',
    type: 'decimal',
    defaultValue: 8.5,
    min: 3,
    max: 25,
  },
  {
    id: 'evEfficiencyKwh100km',
    label: 'استهلاك السيارة الكهربائية (كيلوواط ساعي / 100 كم)',
    type: 'decimal',
    defaultValue: 18.0,
    min: 10,
    max: 35,
    helpText: 'المعدل الشائع لمعظم السيارات الكهربائية مثل تسلا وباي دي يبلغ 15 إلى 20 ك.و.س لكل 100 كم.',
  },
];
