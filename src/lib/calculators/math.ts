import { CalculationResult } from '@/types/calculator';
import { formatNumber, formatPercent } from '@/lib/formatters';

/**
 * Calculates various percentage operations:
 * 1. What is X% of Y?
 * 2. X is what percent of Y?
 * 3. Percentage increase or decrease from X to Y.
 */
export function calculatePercentage(inputs: Record<string, any>): CalculationResult {
  const mode = String(inputs.mode || 'percent_of'); // 'percent_of', 'is_what_percent', 'change'
  const valueA = Number(inputs.valueA);
  const valueB = Number(inputs.valueB);

  if (isNaN(valueA) || isNaN(valueB)) {
    return {
      primary: { label: 'النتيجة', value: 0, formattedValue: '-' },
      error: 'يرجى إدخال قيم عددية صالحة.',
    };
  }

  if (mode === 'percent_of') {
    // What is valueA% of valueB?
    const result = (valueA / 100) * valueB;
    return {
      primary: {
        id: 'result',
        label: `الناتج (${formatPercent(valueA)} من ${formatNumber(valueB)})`,
        value: result,
        formattedValue: formatNumber(result, { decimals: 2 }),
        highlight: true,
      },
      secondary: [
        {
          id: 'totalAfterAdd',
          label: 'المبلغ بعد إضافة هذه النسبة',
          value: valueB + result,
          formattedValue: formatNumber(valueB + result, { decimals: 2 }),
        },
        {
          id: 'totalAfterSubtract',
          label: 'المبلغ بعد خصم هذه النسبة',
          value: valueB - result,
          formattedValue: formatNumber(valueB - result, { decimals: 2 }),
        },
      ],
      details: [
        { label: 'النسبة المئوية', value: formatPercent(valueA) },
        { label: 'العدد الكلي', value: formatNumber(valueB) },
      ],
      calculationSteps: [
        `المعادلة: (${formatNumber(valueA)} ÷ 100) × ${formatNumber(valueB)}`,
        `حساب الناتج المباشر: ${formatNumber(result, { decimals: 2 })}`,
      ],
      directAnswer: `${formatPercent(valueA)} من العدد ${formatNumber(valueB)} يساوي ${formatNumber(result, { decimals: 2 })}.`,
    };
  } else if (mode === 'is_what_percent') {
    // valueA is what percent of valueB?
    if (valueB === 0) {
      return {
        primary: { label: 'النسبة المئوية', value: 0, formattedValue: '-' },
        error: 'لا يمكن القسمة على صفر في المقام.',
      };
    }
    const percent = (valueA / valueB) * 100;
    return {
      primary: {
        id: 'percent',
        label: `نسبة ${formatNumber(valueA)} من ${formatNumber(valueB)}`,
        value: percent,
        formattedValue: formatPercent(percent, 2),
        highlight: true,
      },
      secondary: [
        {
          id: 'ratio',
          label: 'الكسر المكافئ',
          value: `${formatNumber(valueA)} / ${formatNumber(valueB)}`,
          formattedValue: `${formatNumber(valueA)} / ${formatNumber(valueB)}`,
        },
      ],
      details: [
        { label: 'الجزء (البسط)', value: formatNumber(valueA) },
        { label: 'الكل (المقام)', value: formatNumber(valueB) },
      ],
      calculationSteps: [
        `المعادلة: (${formatNumber(valueA)} ÷ ${formatNumber(valueB)}) × 100`,
        `النتيجة المئوية: ${formatPercent(percent, 2)}`,
      ],
      directAnswer: `العدد ${formatNumber(valueA)} يمثل ${formatPercent(percent, 2)} من العدد ${formatNumber(valueB)}.`,
    };
  } else {
    // Percentage change from valueA to valueB
    if (valueA === 0) {
      return {
        primary: { label: 'نسبة التغير', value: 0, formattedValue: '-' },
        error: 'لا يمكن حساب نسبة التغير عندما تكون القيمة الابتدائية صفراً.',
      };
    }
    const diff = valueB - valueA;
    const changePercent = (diff / Math.abs(valueA)) * 100;
    const isIncrease = diff >= 0;

    return {
      primary: {
        id: 'changePercent',
        label: isIncrease ? 'نسبة الزيادة المئوية' : 'نسبة النقصان المئوية',
        value: changePercent,
        formattedValue: `${isIncrease ? '+' : ''}${formatPercent(changePercent, 2)}`,
        highlight: true,
        badge: isIncrease ? 'زيادة' : 'انخفاض',
      },
      secondary: [
        {
          id: 'absoluteDiff',
          label: 'الفارق العددي المطلق',
          value: diff,
          formattedValue: `${isIncrease ? '+' : ''}${formatNumber(diff, { decimals: 2 })}`,
        },
        {
          id: 'multiplier',
          label: 'معامل التغير',
          value: valueB / valueA,
          formattedValue: `× ${formatNumber(valueB / valueA, { decimals: 3 })}`,
        },
      ],
      details: [
        { label: 'القيمة الابتدائية', value: formatNumber(valueA) },
        { label: 'القيمة النهائية', value: formatNumber(valueB) },
      ],
      calculationSteps: [
        `حساب الفارق: ${formatNumber(valueB)} - ${formatNumber(valueA)} = ${formatNumber(diff, { decimals: 2 })}`,
        `قسمة الفارق على القيمة الأصلية: (${formatNumber(diff, { decimals: 2 })} ÷ ${formatNumber(Math.abs(valueA))}) × 100 = ${formatPercent(changePercent, 2)}`,
      ],
      directAnswer: `التغير من ${formatNumber(valueA)} إلى ${formatNumber(valueB)} يمثل ${isIncrease ? 'زيادة' : 'انخفاضاً'} بنسبة ${formatPercent(Math.abs(changePercent), 2)}.`,
    };
  }
}
