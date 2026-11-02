import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface NetSalaryInputs {
  grossSalary: number;
  isNational?: boolean;
  fixedAllowances?: number;
  otherDeductions?: number;
}

export function calculateNetSalary(inputs: NetSalaryInputs, country?: CountryData): CalculationResult {
  const gross = Number(inputs.grossSalary) || 0;
  const isNational = inputs.isNational !== false;
  const allowances = Number(inputs.fixedAllowances) || 0;
  const otherDeductions = Number(inputs.otherDeductions) || 0;

  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;

  // 1. Social Insurance
  const siData = country?.socialInsurance.value;
  const employeeRate = isNational ? (siData?.nationalEmployeeRate || 0) : (siData?.expatEmployeeRate || 0);
  const employerRate = isNational ? (siData?.nationalEmployerRate || 0) : (siData?.expatEmployerRate || 0);
  const wageCap = siData?.maxMonthlyWageCap || Infinity;

  const insuranceBaseWage = Math.min(gross, wageCap);
  const employeeSiDeduction = insuranceBaseWage * (employeeRate / 100);
  const employerSiContribution = insuranceBaseWage * (employerRate / 100);

  // 2. Income Tax
  let incomeTaxDeduction = 0;
  const itData = country?.incomeTax.value;
  if (itData?.hasPersonalIncomeTax && itData.brackets) {
    const annualGross = (gross - employeeSiDeduction) * 12;
    const deduction = itData.standardDeduction || 0;
    let taxableAnnualIncome = Math.max(0, annualGross - deduction);

    let annualTax = 0;
    let previousThreshold = 0;
    for (const b of itData.brackets) {
      if (taxableAnnualIncome <= 0) break;
      const bracketRange = b.thresholdUpTo ? b.thresholdUpTo - previousThreshold : Infinity;
      const taxableInBracket = Math.min(taxableAnnualIncome, bracketRange);
      annualTax += taxableInBracket * (b.rate / 100);
      taxableAnnualIncome -= taxableInBracket;
      if (b.thresholdUpTo) previousThreshold = b.thresholdUpTo;
    }
    incomeTaxDeduction = annualTax / 12;
  }

  // 3. Net Take-Home Salary
  const totalDeductions = employeeSiDeduction + incomeTaxDeduction + otherDeductions;
  const netSalary = Math.max(0, gross + allowances - totalDeductions);
  const totalEmployerCost = gross + allowances + employerSiContribution;

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  return {
    primary: {
      label: 'صافي الراتب الشهري المستلم',
      value: netSalary,
      formattedValue: `${fmt(netSalary)} ${currencySymbol}`,
      unit: currencySymbol,
      isCurrency: true,
      badge: isNational ? 'مواطن' : 'مقيم',
    },
    secondary: [
      {
        label: 'إجمالي الاستقطاعات الشهرية',
        value: totalDeductions,
        formattedValue: `${fmt(totalDeductions)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
      {
        label: 'التكلفة الإجمالية على صاحب العمل',
        value: totalEmployerCost,
        formattedValue: `${fmt(totalEmployerCost)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
    ],
    details: [
      { label: 'الراتب الإجمالي الأساسي', value: `${fmt(gross)} ${currencySymbol}` },
      { label: `استقطاع التأمينات (${employeeRate}%)`, value: `${fmt(employeeSiDeduction)} ${currencySymbol} (${siData?.agencyAcronym || 'التأمينات'})` },
      { label: 'ضريبة الدخل الشخصي المستقطعة', value: incomeTaxDeduction > 0 ? `${fmt(incomeTaxDeduction)} ${currencySymbol}/شهر` : 'معفى (لا توجد ضريبة دخل)' },
      { label: `مساهمة صاحب العمل بالتأمينات (${employerRate}%)`, value: `${fmt(employerSiContribution)} ${currencySymbol}` },
      ...(allowances > 0 ? [{ label: 'البدلات الإضافية المضافة', value: `${fmt(allowances)} ${currencySymbol}` }] : []),
    ],
    calculationSteps: [
      `الراتب الإجمالي: ${fmt(gross)} ${currencySymbol}`,
      `استقطاع التأمينات الاجتماعية (${employeeRate}%): -${fmt(employeeSiDeduction)} ${currencySymbol}`,
      incomeTaxDeduction > 0 ? `استقطاع ضريبة الدخل: -${fmt(incomeTaxDeduction)} ${currencySymbol}` : 'ضريبة الدخل: 0 (غير خاضع)',
      `صافي الراتب = ${fmt(netSalary)} ${currencySymbol}`,
    ],
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
