import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface LoanInputs {
  loanAmount: number;
  annualInterestRate: number;
  loanTermYears: number;
  interestType?: 'reducing' | 'flat';
  monthlySalary?: number;
  adminFeePercent?: number;
}

export function calculateLoan(inputs: LoanInputs, country?: CountryData): CalculationResult {
  const amount = Number(inputs.loanAmount) || 0;
  const annualRate = Number(inputs.annualInterestRate) || 0;
  const termYears = Number(inputs.loanTermYears) || 1;
  const interestType = inputs.interestType || country?.consumerFinance.value?.quoteConvention || 'reducing';
  const salary = Number(inputs.monthlySalary) || 0;
  const adminFeeRate = Number(inputs.adminFeePercent) || 0;

  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;
  const totalMonths = termYears * 12;

  let monthlyInstallment = 0;
  let totalInterest = 0;
  let totalPaid = 0;
  let apr = annualRate;

  if (interestType === 'flat') {
    totalInterest = amount * (annualRate / 100) * termYears;
    totalPaid = amount + totalInterest;
    monthlyInstallment = totalMonths > 0 ? totalPaid / totalMonths : 0;
    // Approximate reducing APR from flat rate
    apr = termYears > 0 ? (annualRate * 2 * totalMonths) / (totalMonths + 1) : annualRate;
  } else {
    // Reducing interest rate
    const r = (annualRate / 100) / 12;
    if (r > 0 && totalMonths > 0) {
      monthlyInstallment = amount * (r * Math.pow(1 + r, totalMonths)) / (Math.pow(1 + r, totalMonths) - 1);
    } else {
      monthlyInstallment = totalMonths > 0 ? amount / totalMonths : 0;
    }
    totalPaid = monthlyInstallment * totalMonths;
    totalInterest = totalPaid - amount;
    apr = annualRate;
  }

  const adminFeeAmount = amount * (adminFeeRate / 100);

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  const warnings: string[] = [];
  let dbrPercent = 0;
  if (salary > 0) {
    dbrPercent = (monthlyInstallment / salary) * 100;
    const maxDbr = country?.consumerFinance.value?.dbrCapPercent || 33.33;
    if (dbrPercent > maxDbr) {
      warnings.push(
        `تنبيه: القسط الشهري يمثل ${dbrPercent.toFixed(1)}% من راتبك ويتجاوز سقف الاستقطاع النظامي المعتمد في ${country?.basics.nameAr || 'الدولة'} (${maxDbr}%).`
      );
    }
  }

  // Generate sample amortization breakdown (first 12 months)
  const rows = [];
  let balance = amount;
  const r = (annualRate / 100) / 12;
  for (let m = 1; m <= Math.min(12, totalMonths); m++) {
    const interestPart = interestType === 'flat' ? totalInterest / totalMonths : balance * r;
    const principalPart = monthlyInstallment - interestPart;
    balance = Math.max(0, balance - principalPart);
    rows.push({
      period: `الشهر ${m}`,
      values: {
        payment: `${fmt(monthlyInstallment)} ${currencySymbol}`,
        principal: `${fmt(principalPart)} ${currencySymbol}`,
        interest: `${fmt(interestPart)} ${currencySymbol}`,
        balance: `${fmt(balance)} ${currencySymbol}`,
      },
    });
  }

  return {
    primary: {
      label: 'القسط الشهري المتوقع',
      value: monthlyInstallment,
      formattedValue: `${fmt(monthlyInstallment)} ${currencySymbol}`,
      unit: currencySymbol,
      isCurrency: true,
      badge: `${termYears} سنوات`,
    },
    secondary: [
      {
        label: 'إجمالي المبلغ المسدد',
        value: totalPaid,
        formattedValue: `${fmt(totalPaid)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
      {
        label: 'إجمالي الفائدة / أرباح التمويل',
        value: totalInterest,
        formattedValue: `${fmt(totalInterest)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
    ],
    details: [
      { label: 'مبلغ التمويل الأصلي', value: `${fmt(amount)} ${currencySymbol}` },
      { label: 'طريقة احتساب الفائدة', value: interestType === 'flat' ? 'فائدة ثابتة (Flat Rate)' : 'فائدة متناقصة (Reducing APR)' },
      { label: 'معدل النسبة السنوي التقريبي (APR)', value: `${apr.toFixed(2)}%` },
      ...(adminFeeAmount > 0 ? [{ label: 'الرسوم الإدارية المقدرة', value: `${fmt(adminFeeAmount)} ${currencySymbol}` }] : []),
      ...(salary > 0 ? [{ label: 'نسبة الاستقطاع من الراتب (DBR)', value: `${dbrPercent.toFixed(1)}%` }] : []),
    ],
    breakdown: {
      columns: [
        { key: 'payment', label: 'القسط' },
        { key: 'principal', label: 'أصل الدين' },
        { key: 'interest', label: 'الربح/الفائدة' },
        { key: 'balance', label: 'المتبقي' },
      ],
      rows,
    },
    calculationSteps: [
      `أصل التمويل: ${fmt(amount)} ${currencySymbol} على مدى ${totalMonths} شهراً بمعدل ${annualRate}%`,
      `إجمالي أرباح التمويل: ${fmt(totalInterest)} ${currencySymbol}`,
      `القسط الشهري المحسوب: ${fmt(monthlyInstallment)} ${currencySymbol}`,
    ],
    warnings: warnings.length > 0 ? warnings : undefined,
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
