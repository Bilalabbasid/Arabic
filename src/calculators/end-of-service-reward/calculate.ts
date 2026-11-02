import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface EosInputs {
  lastSalary: number;
  serviceYears: number;
  serviceMonths?: number;
  separationReason?: 'termination' | 'resignation' | 'contract_end';
  contractType?: 'fixed' | 'indefinite';
}

export function calculateEndOfService(inputs: EosInputs, country?: CountryData): CalculationResult {
  const salary = Number(inputs.lastSalary) || 0;
  const years = Number(inputs.serviceYears) || 0;
  const months = Number(inputs.serviceMonths) || 0;
  const reason = inputs.separationReason || 'termination';
  const totalYears = years + (months / 12);

  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;

  const eosRule = country?.endOfService.value;
  const firstTierYears = eosRule?.firstTierYears ?? 5;
  const firstTierFraction = eosRule?.firstTierFraction ?? 0.5;
  const secondTierFraction = eosRule?.secondTierFraction ?? 1.0;

  // 1. Calculate unreduced base award
  let baseAward = 0;
  const firstTierService = Math.min(totalYears, firstTierYears);
  const secondTierService = Math.max(0, totalYears - firstTierYears);

  baseAward = (firstTierService * firstTierFraction * salary) + (secondTierService * secondTierFraction * salary);

  // 2. Apply resignation scale if voluntary resignation
  let resignationFraction = 1.0;
  if (reason === 'resignation' && eosRule?.resignationScale) {
    resignationFraction = 0;
    for (const tier of eosRule.resignationScale) {
      if (totalYears >= tier.minYears) {
        if (tier.maxYears === undefined || totalYears < tier.maxYears) {
          resignationFraction = tier.fractionOfAward;
          break;
        }
      }
    }
  }

  const finalAward = baseAward * resignationFraction;

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  const warnings: string[] = [];
  if (reason === 'resignation' && resignationFraction < 1.0) {
    warnings.push(
      `بسبب الاستقالة ومدة الخدمة (${totalYears.toFixed(1)} سنة)، ينص نظام العمل على استحقاق ${(resignationFraction * 100).toFixed(0)}% من المكافأة الكاملة.`
    );
  }

  return {
    primary: {
      label: 'مكافأة نهاية الخدمة المستحقة',
      value: finalAward,
      formattedValue: `${fmt(finalAward)} ${currencySymbol}`,
      unit: currencySymbol,
      isCurrency: true,
      badge: `${totalYears.toFixed(1)} سنة خدمة`,
    },
    secondary: [
      {
        label: 'المكافأة الكاملة قبل أي خصم استقالة',
        value: baseAward,
        formattedValue: `${fmt(baseAward)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
      {
        label: 'نسبة الاستحقاق المطبقة',
        value: `${(resignationFraction * 100).toFixed(0)}%`,
      },
    ],
    details: [
      { label: 'الراتب المعتمد للحساب', value: `${fmt(salary)} ${currencySymbol}` },
      { label: 'أساس احتساب الراتب', value: eosRule?.wageBasis === 'basic_only' ? 'الراتب الأساسي فقط' : 'الراتب الإجمالي مع البدلات الثابتة' },
      { label: 'السند القانوني المعتمد', value: eosRule?.articles || country?.endOfService.law || 'نظام العمل' },
      { label: 'سبب انتهاء العلاقة', value: reason === 'resignation' ? 'استقالة اختيارية' : reason === 'contract_end' ? 'انتهاء مدة العقد' : 'إنهاء عقد من صاحب العمل' },
    ],
    calculationSteps: [
      `السنوات الخمس الأولى (${firstTierService.toFixed(2)} سنة): ${fmt(firstTierService * firstTierFraction * salary)} ${currencySymbol}`,
      ...(secondTierService > 0 ? [`السنوات التالية (${secondTierService.toFixed(2)} سنة): ${fmt(secondTierService * secondTierFraction * salary)} ${currencySymbol}`] : []),
      `المكافأة النظامية الصافية المستحقة = ${fmt(finalAward)} ${currencySymbol}`,
    ],
    warnings: warnings.length > 0 ? warnings : undefined,
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
