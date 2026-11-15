import { CalculatorInput } from '../../types/calculator';

export const ovulationSchema: CalculatorInput[] = [
  {
    id: 'lmpDate',
    label: 'أول يوم من آخر دورة شهرية',
    type: 'date',
    defaultValue: '2026-11-01',
    required: true,
    placeholder: '2026-11-01',
    helpText: 'اليوم الأول الذي بدأ فيه نزول الدم، من التقويم أو بصيغة سنة-شهر-يوم.',
  },
  {
    id: 'cycleLength',
    label: 'متوسط طول الدورة الشهرية',
    type: 'number',
    defaultValue: 28,
    min: 20,
    max: 45,
    step: 1,
    unit: 'يوم',
    required: true,
    helpText: 'عدد الأيام من أول يوم في دورة إلى أول يوم في التالية؛ احسبي متوسط آخر 3 دورات، أو اتركيه 28.',
  },
  {
    id: 'cyclesToShow',
    label: 'عدد الدورات القادمة في الجدول',
    type: 'number',
    defaultValue: 3,
    min: 1,
    max: 12,
    step: 1,
    unit: 'دورة',
    helpText: 'لعرض مواعيد التبويض وأيام الخصوبة لعدة أشهر قادمة.',
  },
];
