import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface CarDepreciationInputs {
  purchasePrice: number;
  vehicleAgeYears: number;
  brandTier?: 'mainstream' | 'luxury' | 'economy';
}

export function calculateCarDepreciation(inputs: CarDepreciationInputs, country?: CountryData): CalculationResult {
  const price = Number(inputs.purchasePrice) || 100000;
  const age = Number(inputs.vehicleAgeYears) || 3;
  const tier = inputs.brandTier || 'mainstream';

  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;

  // Annual depreciation rates:
  // Year 1: ~18% (mainstream), ~22% (luxury), ~15% (economy)
  // Year 2: ~12%
  // Year 3: ~10%
  // Year 4+: ~8% per year
  const rates = tier === 'luxury'
    ? [0.22, 0.15, 0.12, 0.10, 0.08, 0.07, 0.06]
    : tier === 'economy'
    ? [0.15, 0.10, 0.09, 0.08, 0.07, 0.06, 0.05]
    : [0.18, 0.12, 0.10, 0.09, 0.08, 0.07, 0.06];

  let currentVal = price;
  const rows = [];
  for (let y = 1; y <= 7; y++) {
    const rate = rates[y - 1] || 0.06;
    const lossThisYear = currentVal * rate;
    currentVal = Math.max(0, currentVal - lossThisYear);
    const cumulativeLoss = price - currentVal;
    rows.push({
      period: `السنة ${y}`,
      values: {
        value: `${new Intl.NumberFormat('en-US', { minimumFractionDigits: minorUnits, maximumFractionDigits: minorUnits }).format(currentVal)} ${currencySymbol}`,
        lossYear: `${new Intl.NumberFormat('en-US', { minimumFractionDigits: minorUnits, maximumFractionDigits: minorUnits }).format(lossThisYear)} ${currencySymbol}`,
        retention: `${((currentVal / price) * 100).toFixed(0)}%`,
      },
    });
  }

  // Calculate specific value at requested age
  let valueAtAge = price;
  for (let i = 0; i < Math.min(age, rates.length); i++) {
    valueAtAge *= (1 - rates[i]);
  }
  const totalDepreciationLost = price - valueAtAge;
  const retentionPercent = (valueAtAge / price) * 100;

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  return {
    primary: {
      label: `القيمة السوقية التقديرية الحالية (بعد ${age} سنوات)`,
      value: valueAtAge,
      formattedValue: `${fmt(valueAtAge)} ${currencySymbol}`,
      unit: currencySymbol,
      isCurrency: true,
      badge: `احتفاظ بالقيمة: ${retentionPercent.toFixed(0)}%`,
    },
    secondary: [
      {
        label: 'إجمالي قيمة الإهلاك المفقودة',
        value: totalDepreciationLost,
        formattedValue: `${fmt(totalDepreciationLost)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
      {
        label: 'سعر الشراء الأصلي',
        value: price,
        formattedValue: `${fmt(price)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
    ],
    details: [
      { label: 'فئة العلامة التجارية', value: tier === 'luxury' ? 'سيارات فاخرة (إهلاك أسرع)' : tier === 'economy' ? 'سيارات اقتصادية (احتفاظ أفضل بالقيمة)' : 'سيارات متوسطة واستهلاكية' },
      { label: 'عمر السيارة المحسوب', value: `${age} سنوات` },
      { label: 'متوسط الفقد السنوي', value: `${fmt(totalDepreciationLost / age)} ${currencySymbol} / سنة` },
    ],
    breakdown: {
      columns: [
        { key: 'value', label: 'القيمة المتبقية' },
        { key: 'lossYear', label: 'إهلاك السنة' },
        { key: 'retention', label: 'نسبة الاحتفاظ' },
      ],
      rows,
    },
    calculationSteps: [
      `السعر الأصلي: ${fmt(price)} ${currencySymbol}`,
      `القيمة التقديرية بعد ${age} سنوات = ${fmt(valueAtAge)} ${currencySymbol}`,
      `إجمالي خسارة الإهلاك = ${fmt(totalDepreciationLost)} ${currencySymbol} (${(100 - retentionPercent).toFixed(1)}%)`,
    ],
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
