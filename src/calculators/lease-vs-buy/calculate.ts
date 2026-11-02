import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface LeaseVsBuyInputs {
  carPrice: number;
  downPayment: number;
  loanTermYears?: number;
  loanRatePercent?: number;
  monthlyLeasePayment: number;
  leaseTermYears?: number;
  expectedResaleValueAfter5Years?: number;
}

export function calculateLeaseVsBuy(inputs: LeaseVsBuyInputs, country?: CountryData): CalculationResult {
  const price = Number(inputs.carPrice) || 100000;
  const downPayment = Number(inputs.downPayment) || 10000;
  const loanYears = Number(inputs.loanTermYears) || 5;
  const loanRate = Number(inputs.loanRatePercent) || 5.0;
  const monthlyLease = Number(inputs.monthlyLeasePayment) || 1800;
  const leaseYears = Number(inputs.leaseTermYears) || 5;
  const resaleValue = inputs.expectedResaleValueAfter5Years !== undefined ? Number(inputs.expectedResaleValueAfter5Years) : price * 0.45;

  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;

  // 1. Buying/Financing path
  const loanPrincipal = Math.max(0, price - downPayment);
  const totalLoanMonths = loanYears * 12;
  const r = (loanRate / 100) / 12;
  let monthlyLoanPayment = 0;
  if (r > 0 && totalLoanMonths > 0) {
    monthlyLoanPayment = (loanPrincipal * r * Math.pow(1 + r, totalLoanMonths)) / (Math.pow(1 + r, totalLoanMonths) - 1);
  } else {
    monthlyLoanPayment = totalLoanMonths > 0 ? loanPrincipal / totalLoanMonths : 0;
  }
  const totalLoanPaid = downPayment + (monthlyLoanPayment * totalLoanMonths);
  const netBuyCost = totalLoanPaid - resaleValue;

  // 2. Leasing path
  const totalLeaseMonths = leaseYears * 12;
  const totalLeasePaid = monthlyLease * totalLeaseMonths;
  const netLeaseCost = totalLeasePaid;

  const costDifference = Math.abs(netBuyCost - netLeaseCost);
  const buyIsCheaper = netBuyCost < netLeaseCost;

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  return {
    primary: {
      label: buyIsCheaper ? 'شراء السيارة أفضل مالياً' : 'تأجير السيارة أفضل مالياً',
      value: costDifference,
      formattedValue: `فارق ${fmt(costDifference)} ${currencySymbol}`,
      unit: currencySymbol,
      isCurrency: true,
      badge: buyIsCheaper ? 'وفر بالشراء' : 'وفر بالتأجير',
    },
    secondary: [
      {
        label: 'صافي تكلفة الشراء والتمويل (بعد بيع السيارة)',
        value: netBuyCost,
        formattedValue: `${fmt(netBuyCost)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
      {
        label: 'إجمالي تكلفة التأجير طوال المدة',
        value: netLeaseCost,
        formattedValue: `${fmt(netLeaseCost)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
    ],
    details: [
      { label: 'سعر السيارة النقدي', value: `${fmt(price)} ${currencySymbol}` },
      { label: 'القسط الشهري للشراء', value: `${fmt(monthlyLoanPayment)} ${currencySymbol}` },
      { label: 'القيمة التقديرية للسيارة بعد 5 سنوات', value: `${fmt(resaleValue)} ${currencySymbol}` },
      { label: 'القسط الشهري للتأجير', value: `${fmt(monthlyLease)} ${currencySymbol}` },
    ],
    calculationSteps: [
      `مسار الشراء: دفعت ${fmt(totalLoanPaid)} ${currencySymbol} واسترجعت قيمة بيع ${fmt(resaleValue)} = الصافي ${fmt(netBuyCost)} ${currencySymbol}`,
      `مسار التأجير: دفعت ${totalLeaseMonths} قسطاً شهرياً بقيمة ${fmt(monthlyLease)} = الإجمالي ${fmt(netLeaseCost)} ${currencySymbol}`,
      `النتيجة: ${buyIsCheaper ? 'خيار الشراء يوفر' : 'خيار التأجير يوفر'} ${fmt(costDifference)} ${currencySymbol}`,
    ],
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
