import { CalculationResult, CalculationBreakdownRow } from '@/types/calculator';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatters';

/**
 * Calculates loan installments, total financing cost, and amortization schedule.
 */
export function calculateLoan(
  inputs: Record<string, any>,
  context?: { currencyCode?: string; countryCode?: string }
): CalculationResult {
  const loanAmount = Number(inputs.loanAmount);
  const annualRate = Number(inputs.annualRate); // e.g. 4.5%
  const termMonths = Number(inputs.termMonths || (Number(inputs.termYears || 5) * 12));
  const rateType = String(inputs.rateType || 'reducing'); // 'reducing' (متناقصة - البنوك) or 'flat' (مرابحة ثابتة)
  const currency = context?.currencyCode || inputs.currency || 'SAR';

  if (isNaN(loanAmount) || loanAmount <= 0) {
    return {
      primary: { label: 'القسط الشهري', value: 0, formattedValue: '-' },
      error: 'يرجى إدخال مبلغ تمويل صحيح أكبر من الصفر.',
    };
  }

  if (isNaN(termMonths) || termMonths <= 0) {
    return {
      primary: { label: 'القسط الشهري', value: 0, formattedValue: '-' },
      error: 'يرجى تحديد مدة سداد صالحة بالأشهر.',
    };
  }

  let monthlyPayment = 0;
  let totalInterest = 0;
  let totalRepayment = 0;
  const breakdownRows: CalculationBreakdownRow[] = [];

  if (isNaN(annualRate) || annualRate < 0) {
    return {
      primary: { label: 'القسط الشهري', value: 0, formattedValue: '-' },
      error: 'يرجى إدخال نسبة فائدة أو ربح سنوي صالحة (صفر أو أكثر).',
    };
  }

  if (annualRate === 0) {
    // Zero interest loan
    monthlyPayment = loanAmount / termMonths;
    totalInterest = 0;
    totalRepayment = loanAmount;
  } else if (rateType === 'flat') {
    // Flat rate (مرابحة على كامل الأصل)
    const years = termMonths / 12;
    totalInterest = Math.round(loanAmount * (annualRate / 100) * years * 100) / 100;
    totalRepayment = Math.round((loanAmount + totalInterest) * 100) / 100;
    monthlyPayment = totalRepayment / termMonths;

    let balance = loanAmount;
    const monthlyPrincipal = loanAmount / termMonths;
    const monthlyProfit = totalInterest / termMonths;

    const displayPeriods = Math.min(termMonths, 12);
    for (let i = 1; i <= displayPeriods; i++) {
      balance -= monthlyPrincipal;
      breakdownRows.push({
        period: `الشهر ${i}`,
        values: {
          installment: formatCurrency(monthlyPayment, currency),
          principal: formatCurrency(monthlyPrincipal, currency),
          interest: formatCurrency(monthlyProfit, currency),
          balance: formatCurrency(Math.max(0, balance), currency),
        },
      });
    }
  } else {
    // Reducing rate (standard annuity formula used by Central Banks: SAMA, UAE Central Bank, CBE)
    const monthlyRate = annualRate / 100 / 12;
    monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);

    totalRepayment = monthlyPayment * termMonths;
    totalInterest = totalRepayment - loanAmount;

    let balance = loanAmount;
    const displayPeriods = Math.min(termMonths, 12);
    for (let i = 1; i <= displayPeriods; i++) {
      const interestPart = balance * monthlyRate;
      const principalPart = monthlyPayment - interestPart;
      balance -= principalPart;

      breakdownRows.push({
        period: `الشهر ${i}`,
        values: {
          installment: formatCurrency(monthlyPayment, currency),
          principal: formatCurrency(principalPart, currency),
          interest: formatCurrency(interestPart, currency),
          balance: formatCurrency(Math.max(0, balance), currency),
        },
      });
    }
  }

  return {
    primary: {
      id: 'monthlyPayment',
      label: 'القسط الشهري المستحق',
      value: monthlyPayment,
      formattedValue: formatCurrency(monthlyPayment, currency),
      unit: currency,
      highlight: true,
      isCurrency: true,
    },
    secondary: [
      {
        id: 'totalInterest',
        label: 'إجمالي الفوائد / أرباح التمويل',
        value: totalInterest,
        formattedValue: formatCurrency(totalInterest, currency),
        unit: currency,
      },
      {
        id: 'totalRepayment',
        label: 'إجمالي المبلغ المسدد بالكامل',
        value: totalRepayment,
        formattedValue: formatCurrency(totalRepayment, currency),
        unit: currency,
      },
      {
        id: 'termMonths',
        label: 'مدة التمويل',
        value: termMonths,
        formattedValue: `${termMonths} شهراً (${formatNumber(termMonths / 12, { decimals: 1 })} سنة)`,
      },
    ],
    details: [
      { label: 'أصل مبلغ القرض', value: formatCurrency(loanAmount, currency) },
      { label: 'معدل النسبة السنوي (APR)', value: formatPercent(annualRate) },
      { label: 'طريقة احتساب الفائدة', value: rateType === 'flat' ? 'نسبة ثابتة (Flat Rate)' : 'فائدة متناقصة بنكية (Reducing Rate)' },
    ],
    breakdown: {
      columns: [
        { key: 'installment', label: 'القسط الشهري' },
        { key: 'principal', label: 'أصل الدين المسدد' },
        { key: 'interest', label: 'الفائدة / الربح' },
        { key: 'balance', label: 'الرصيد المتبقي' },
      ],
      rows: breakdownRows,
    },
    calculationSteps: [
      `تحديد مدة السداد بالأشهر: ${termMonths} شهر`,
      rateType === 'reducing'
        ? `حساب القسط الشهري وفق معادلة القسط المتساوي الثابت (Annuity Formula): ${formatCurrency(monthlyPayment, currency)}`
        : `حساب الأرباح الثابتة: ${formatCurrency(loanAmount, currency)} × ${formatPercent(annualRate)} × ${termMonths / 12} سنة = ${formatCurrency(totalInterest, currency)}`,
      `إجمالي السداد: ${formatCurrency(monthlyPayment, currency)} × ${termMonths} شهر = ${formatCurrency(totalRepayment, currency)}`,
    ],
    directAnswer: `القسط الشهري لقرض بقيمة ${formatCurrency(loanAmount, currency)} على مدار ${termMonths} شهراً هو ${formatCurrency(monthlyPayment, currency)}، وإجمالي الأرباح المستحقة للجهة الممولة ${formatCurrency(totalInterest, currency)}.`,
    assumptions: [
      'تعتمد البنوك الرسمية نسبة الفائدة المتناقصة (Reducing Balance)، بينما تطبق بعض شركات التمويل المرابحة الثابتة.',
      'الحسابات لا تشمل الرسوم الإدارية أو رسوم التأمين التكافلي التي تفرضها بعض جهات التمويل (غالباً 1% كحد أقصى بموجب لوائح البنوك المركزية).',
    ],
    currency,
  };
}
