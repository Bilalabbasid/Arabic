import { CalculationResult } from '../../types/calculator';

export interface PercentageInputs {
  percentage: number;
  totalNumber: number;
  calculationType?: 'percent_of' | 'is_what_percent_of' | 'percent_change';
  secondaryNumber?: number;
}

export function calculatePercentage(inputs: PercentageInputs): CalculationResult {
  const p = Number(inputs.percentage) || 0;
  const total = Number(inputs.totalNumber) || 0;
  const type = inputs.calculationType || 'percent_of';
  const sec = Number(inputs.secondaryNumber) || 0;

  let resultVal = 0;
  let label = '';
  let steps: string[] = [];

  if (type === 'percent_of') {
    resultVal = (p / 100) * total;
    label = `قيمة (${p}%) من العدد (${total})`;
    steps = [`العملية الحسابية: (${p} ÷ 100) × ${total} = ${resultVal.toFixed(2)}`];
  } else if (type === 'is_what_percent_of') {
    resultVal = total !== 0 ? (p / total) * 100 : 0;
    label = `النسبة المئوية لـ (${p}) من (${total})`;
    steps = [`العملية الحسابية: (${p} ÷ ${total}) × 100 = ${resultVal.toFixed(2)}%`];
  } else {
    // Percentage change from total to sec
    const change = sec - total;
    resultVal = total !== 0 ? (change / total) * 100 : 0;
    label = `نسبة التغير من (${total}) إلى (${sec})`;
    steps = [`فارق القيمة = ${sec} - ${total} = ${change}`, `نسبة التغير = (${change} ÷ ${total}) × 100 = ${resultVal.toFixed(2)}%`];
  }

  return {
    primary: {
      label,
      value: resultVal,
      formattedValue: type === 'percent_of' ? resultVal.toFixed(2) : `${resultVal.toFixed(2)}%`,
      badge: type === 'percent_of' ? 'قيمة مادية' : 'نسبة مئوية',
    },
    secondary: [
      {
        label: 'طريقة الحساب',
        value: type === 'percent_of' ? 'ضرب النسبة في الإجمالي' : 'القسمة واستخراج النسبة المئوية',
      },
    ],
    details: [
      { label: 'المدخل الأول', value: String(p) },
      { label: 'المدخل الثاني', value: String(total) },
    ],
    calculationSteps: steps,
  };
}
