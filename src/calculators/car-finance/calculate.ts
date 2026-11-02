import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface CarFinanceInputs {
  carPrice: number;
  downPaymentPercent?: number;
  annualInterestRate: number;
  financeTermYears: number;
  balloonPaymentPercent?: number; // دفعة أخيرة
  monthlySalary?: number;
}

export function calculateCarFinance(inputs: CarFinanceInputs, country?: CountryData): CalculationResult {
  const price = Number(inputs.carPrice) || 0;
  const downPaymentRate = Number(inputs.downPaymentPercent) || 0;
  const annualRate = Number(inputs.annualInterestRate) || 0;
  const termYears = Number(inputs.financeTermYears) || 5;
  const balloonRate = Number(inputs.balloonPaymentPercent) || 0;
  const salary = Number(inputs.monthlySalary) || 0;

  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;
  const totalMonths = termYears * 12;

  const downPaymentAmount = price * (downPaymentRate / 100);
  const balloonPaymentAmount = price * (balloonRate / 100);
  const financedPrincipal = Math.max(0, price - downPaymentAmount);

  // Installment with balloon payment:
  // PV = financedPrincipal
  // Balloon PV = balloonPaymentAmount / (1 + r)^n
  // Amortized amount = financedPrincipal - Balloon PV
  const r = (annualRate / 100) / 12;
  let monthlyInstallment = 0;

  if (totalMonths > 0) {
    if (r > 0) {
      const discountFactor = Math.pow(1 + r, totalMonths);
      const balloonPV = balloonPaymentAmount / discountFactor;
      const principalToAmortize = financedPrincipal - balloonPV;
      monthlyInstallment = (principalToAmortize * r * discountFactor) / (discountFactor - 1);
    } else {
      monthlyInstallment = (financedPrincipal - balloonPaymentAmount) / totalMonths;
    }
  }

  const totalMonthlyPayments = monthlyInstallment * totalMonths;
  const totalPaid = downPaymentAmount + totalMonthlyPayments + balloonPaymentAmount;
  const totalFinanceCost = totalPaid - price;

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  const warnings: string[] = [];
  if (salary > 0) {
    const dbr = (monthlyInstallment / salary) * 100;
    const maxDbr = country?.consumerFinance.value?.dbrCapPercent || 33.33;
    if (dbr > maxDbr) {
      warnings.push(
        `تنبيه: قسط تمويل السيارة يمثل ${dbr.toFixed(1)}% من راتبك ويتجاوز سقف الاستقطاع المسموح به في ${country?.basics.nameAr || 'الدولة'} (${maxDbr}%).`
      );
    }
  }

  const maxTenor = country?.consumerFinance.value?.maxAutoFinanceTenorYears || 5;
  if (termYears > maxTenor) {
    warnings.push(`تنبيه: مدة التمويل المدخلة (${termYears} سنوات) تتجاوز الحد الأقصى المعتاد لتمويل السيارات بالأنظمة (${maxTenor} سنوات).`);
  }

  return {
    primary: {
      label: 'القسط الشهري لتمويل السيارة',
      value: monthlyInstallment,
      formattedValue: `${fmt(monthlyInstallment)} ${currencySymbol}`,
      unit: currencySymbol,
      isCurrency: true,
      badge: `${termYears} سنوات`,
    },
    secondary: [
      {
        label: 'إجمالي تكلفة الشراء بالتمويل',
        value: totalPaid,
        formattedValue: `${fmt(totalPaid)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
      {
        label: 'إجمالي أرباح التمويل (الفائدة)',
        value: totalFinanceCost,
        formattedValue: `${fmt(totalFinanceCost)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
    ],
    details: [
      { label: 'سعر السيارة الأصلي', value: `${fmt(price)} ${currencySymbol}` },
      { label: 'الدفعة الأولى المقدمة', value: `${fmt(downPaymentAmount)} ${currencySymbol} (${downPaymentRate}%)` },
      { label: 'المبلغ الممول', value: `${fmt(financedPrincipal)} ${currencySymbol}` },
      ...(balloonPaymentAmount > 0 ? [{ label: 'الدفعة الأخيرة (التملك)', value: `${fmt(balloonPaymentAmount)} ${currencySymbol} (${balloonRate}%)` }] : []),
      { label: 'معدل الفائدة السنوي', value: `${annualRate}%` },
    ],
    calculationSteps: [
      `سعر السيارة: ${fmt(price)} ${currencySymbol} - الدفعة الأولى (${fmt(downPaymentAmount)}): المتبقي للتمويل ${fmt(financedPrincipal)} ${currencySymbol}`,
      `القسط الشهري على مدى ${totalMonths} شهراً بمعدل ${annualRate}% = ${fmt(monthlyInstallment)} ${currencySymbol}`,
      balloonPaymentAmount > 0 ? `الدفعة الأخيرة في نهاية العقد = ${fmt(balloonPaymentAmount)} ${currencySymbol}` : 'بدون دفعة أخيرة',
      `إجمالي المبلغ المسدد = ${fmt(totalPaid)} ${currencySymbol}`,
    ],
    warnings: warnings.length > 0 ? warnings : undefined,
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
