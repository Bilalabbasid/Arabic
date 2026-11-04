import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface NetSalaryInputs {
  grossSalary: number;
  isNational?: boolean | string;
  /** 'legacy' (registered before the newer pension law) or 'new' (first registered after it) */
  insuranceSystem?: 'legacy' | 'new' | string;
  fixedAllowances?: number;
  otherDeductions?: number;
}

type Bracket = { thresholdUpTo?: number; rate: number };

function applyBrackets(taxable: number, brackets: Bracket[]): number {
  let remaining = taxable;
  let tax = 0;
  let previous = 0;
  for (const b of brackets) {
    if (remaining <= 0) break;
    const width = b.thresholdUpTo !== undefined ? b.thresholdUpTo - previous : Infinity;
    const portion = Math.min(remaining, width);
    tax += portion * (b.rate / 100);
    remaining -= portion;
    if (b.thresholdUpTo !== undefined) previous = b.thresholdUpTo;
  }
  return tax;
}

export function calculateNetSalary(inputs: NetSalaryInputs, country?: CountryData): CalculationResult {
  const gross = Number(inputs.grossSalary) || 0;
  // Select inputs arrive as strings ('true' / 'false'); only an explicit false means expatriate.
  const isNational = String(inputs.isNational) !== 'false';
  const allowances = Number(inputs.fixedAllowances) || 0;
  const otherDeductions = Number(inputs.otherDeductions) || 0;

  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;

  // 1. Social Insurance
  const siData = country?.socialInsurance.value;
  const useNewSystem = isNational && inputs.insuranceSystem === 'new' && !!siData?.newSystem;
  const scheme = useNewSystem ? siData!.newSystem! : undefined;

  const wageCap = (scheme?.maxMonthlyWageCap ?? siData?.maxMonthlyWageCap) || Infinity;
  const insuranceBaseWage = Math.min(gross, wageCap);

  const employeeRate = isNational
    ? (scheme?.nationalEmployeeRate ?? siData?.nationalEmployeeRate ?? 0)
    : (siData?.expatEmployeeRate ?? 0);
  let employerRate = isNational
    ? (scheme?.nationalEmployerRate ?? siData?.nationalEmployerRate ?? 0)
    : (siData?.expatEmployerRate ?? 0);
  if (
    scheme?.reducedEmployerRate !== undefined &&
    scheme.reducedEmployerRateBelowWage !== undefined &&
    insuranceBaseWage < scheme.reducedEmployerRateBelowWage
  ) {
    employerRate = scheme.reducedEmployerRate;
  }

  const employeeSiDeduction = insuranceBaseWage * (employeeRate / 100);
  const employerSiContribution = insuranceBaseWage * (employerRate / 100);
  const schemeLabel = siData?.newSystem
    ? (useNewSystem ? siData.newSystem.labelAr : siData.legacySystemLabelAr || 'النظام السابق')
    : undefined;

  // 2. Income Tax
  let incomeTaxDeduction = 0;
  const itData = country?.incomeTax.value;
  if (itData?.hasPersonalIncomeTax && (itData.brackets || itData.schedules)) {
    const annualNet = (gross - employeeSiDeduction) * 12;
    let taxableAnnualIncome = Math.max(0, annualNet - (itData.standardDeduction || 0));
    if (itData.roundDownTo) {
      taxableAnnualIncome = Math.floor(taxableAnnualIncome / itData.roundDownTo) * itData.roundDownTo;
    }
    const schedule = itData.schedules?.find((sc) => sc.maxTaxable === undefined || taxableAnnualIncome <= sc.maxTaxable);
    const brackets = schedule?.brackets ?? itData.brackets ?? [];
    incomeTaxDeduction = applyBrackets(taxableAnnualIncome, brackets) / 12;
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
      ...(schemeLabel && isNational ? [{ label: 'نظام التأمينات المطبق', value: schemeLabel }] : []),
      ...(insuranceBaseWage < gross ? [{ label: 'سقف الأجر الخاضع للاشتراك', value: `${fmt(insuranceBaseWage)} ${currencySymbol}` }] : []),
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
