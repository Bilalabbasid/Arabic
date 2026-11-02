import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface CarAffordabilityInputs {
  monthlySalary: number;
  existingDebtsMonthly?: number;
  downPaymentAvailable?: number;
  annualInterestRate?: number;
  financeTermYears?: number;
}

export function calculateCarAffordability(inputs: CarAffordabilityInputs, country?: CountryData): CalculationResult {
  const salary = Number(inputs.monthlySalary) || 0;
  const existingDebts = Number(inputs.existingDebtsMonthly) || 0;
  const downPayment = Number(inputs.downPaymentAvailable) || 0;
  const annualRate = Number(inputs.annualInterestRate) || 5.0;
  const termYears = Number(inputs.financeTermYears) || 5;

  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;
  const totalMonths = termYears * 12;

  // Max DBR from country rules
  const dbrCap = country?.consumerFinance.value?.dbrCapPercent || 33.33;
  const maxTotalAllowedCommitment = salary * (dbrCap / 100);
  const maxAffordableMonthlyPayment = Math.max(0, maxTotalAllowedCommitment - existingDebts);

  // Present Value (Loan Capacity) from Max Monthly Installment:
  // PV = PMT * [1 - (1+r)^(-n)] / r
  const r = (annualRate / 100) / 12;
  let maxAffordableLoan = 0;
  if (r > 0 && totalMonths > 0) {
    maxAffordableLoan = maxAffordableMonthlyPayment * (1 - Math.pow(1 + r, -totalMonths)) / r;
  } else if (totalMonths > 0) {
    maxAffordableLoan = maxAffordableMonthlyPayment * totalMonths;
  }

  const maxAffordableCarPrice = maxAffordableLoan + downPayment;

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  const warnings: string[] = [];
  if (maxAffordableMonthlyPayment <= 0) {
    warnings.push(
      `التزاماتك الحالية (${fmt(existingDebts)} ${currencySymbol}) تبلغ أو تتجاوز سقف الاستقطاع النظامي (${dbrCap}% من الراتب)، ولا يمكنك الحصول على تمويل إضافي حالياً.`
    );
  }

  return {
    primary: {
      label: 'أقصى سعر سيارة يمكنك شراؤها',
      value: maxAffordableCarPrice,
      formattedValue: `${fmt(maxAffordableCarPrice)} ${currencySymbol}`,
      unit: currencySymbol,
      isCurrency: true,
      badge: `قسط حتى ${fmt(maxAffordableMonthlyPayment)} ${currencySymbol}`,
    },
    secondary: [
      {
        label: 'الحد الأقصى لمبلغ التمويل المقبول',
        value: maxAffordableLoan,
        formattedValue: `${fmt(maxAffordableLoan)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
      {
        label: 'أقصى قسط شهري مسموح نظاماً',
        value: maxAffordableMonthlyPayment,
        formattedValue: `${fmt(maxAffordableMonthlyPayment)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
    ],
    details: [
      { label: 'الراتب الشهري المدخل', value: `${fmt(salary)} ${currencySymbol}` },
      { label: 'سقف الاستقطاع المعتمد (DBR)', value: `${dbrCap}%` },
      { label: 'الالتزامات والأقساط القائمة', value: `${fmt(existingDebts)} ${currencySymbol}` },
      { label: 'الدفعة الأولى المدخرة', value: `${fmt(downPayment)} ${currencySymbol}` },
      { label: 'مدة التمويل المفترضة', value: `${termYears} سنوات بمعدل ${annualRate}%` },
    ],
    calculationSteps: [
      `سقف الاستقطاع النظامي: ${fmt(salary)} × ${dbrCap}% = ${fmt(maxTotalAllowedCommitment)} ${currencySymbol}`,
      `القسط المتاح للسيارة = ${fmt(maxTotalAllowedCommitment)} - الالتزامات (${fmt(existingDebts)}) = ${fmt(maxAffordableMonthlyPayment)} ${currencySymbol}`,
      `القدرة التمويلية المقابلة للقسط على مدى ${termYears} سنوات = ${fmt(maxAffordableLoan)} ${currencySymbol}`,
      `سعر السيارة الأقصى = القرض (${fmt(maxAffordableLoan)}) + الدفعة الأولى (${fmt(downPayment)}) = ${fmt(maxAffordableCarPrice)} ${currencySymbol}`,
    ],
    warnings: warnings.length > 0 ? warnings : undefined,
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
