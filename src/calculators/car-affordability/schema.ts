import { CalculatorInput } from '../../types/calculator';

export const carAffordabilitySchema: CalculatorInput[] = [
  {
    id: 'monthlySalary',
    label: 'صافي الراتب الشهري',
    type: 'currency',
    defaultValue: 12000,
    min: 1000,
    required: true,
    helpText: 'إجمالي الراتب الشهري المودع في الحساب بعد خصم التأمينات والتقاعد.',
    exampleValue: 12000,
  },
  {
    id: 'existingDebtsMonthly',
    label: 'مجموع الأقساط والالتزامات القائمة شهرياً',
    type: 'currency',
    defaultValue: 1500,
    min: 0,
    helpText: 'أي قروض شخصية، قروض عقارية، أو بطاقات ائتمانية تسددها شهرياً.',
    exampleValue: 1500,
  },
  {
    id: 'downPaymentAvailable',
    label: 'الدفعة الأولى المتوفرة لديك',
    type: 'currency',
    defaultValue: 20000,
    min: 0,
    helpText: 'المبلغ المدخر الجاهز للدفعة الأولى لزيادة قدرتك الشرائية.',
    exampleValue: 20000,
  },
  {
    id: 'annualInterestRate',
    label: 'نسبة الفائدة السنوية المتوقعة (%)',
    type: 'percentage',
    defaultValue: 5.0,
    min: 0.1,
    max: 20,
    step: 0.1,
  },
  {
    id: 'financeTermYears',
    label: 'مدة التمويل المفضلة (سنوات)',
    type: 'number',
    defaultValue: 5,
    min: 1,
    max: 7,
  },
];
