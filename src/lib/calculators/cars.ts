import { CalculationResult } from '@/types/calculator';
import { formatCurrency, formatNumber } from '@/lib/formatters';

/**
 * Fuel price presets per liter (approximate standard rates in national currencies)
 */
export const COUNTRY_FUEL_PRICES: Record<string, { octane91: number; octane95: number; diesel: number; currency: string }> = {
  SA: { octane91: 2.18, octane95: 2.33, diesel: 1.15, currency: 'SAR' },
  AE: { octane91: 2.75, octane95: 2.87, diesel: 2.95, currency: 'AED' },
  KW: { octane91: 0.085, octane95: 0.105, diesel: 0.115, currency: 'KWD' },
  QA: { octane91: 1.90, octane95: 2.10, diesel: 2.05, currency: 'QAR' },
  BH: { octane91: 0.140, octane95: 0.200, diesel: 0.160, currency: 'BHD' },
  OM: { octane91: 0.229, octane95: 0.239, diesel: 0.258, currency: 'OMR' },
  EG: { octane91: 12.25, octane95: 15.00, diesel: 11.50, currency: 'EGP' },
  JO: { octane91: 0.885, octane95: 1.125, diesel: 0.700, currency: 'JOD' },
  MA: { octane91: 13.50, octane95: 14.80, diesel: 12.60, currency: 'MAD' },
  DZ: { octane91: 43.0, octane95: 45.0, diesel: 29.0, currency: 'DZD' },
  TN: { octane91: 2.40, octane95: 2.52, diesel: 2.20, currency: 'TND' },
};

/**
 * Calculates total trip fuel cost, consumption in liters, cost per km, and monthly projection.
 */
export function calculateCarFuelCost(
  inputs: Record<string, any>,
  context?: { countryCode?: string; currencyCode?: string }
): CalculationResult {
  const distanceKm = Number(inputs.distanceKm);
  const fuelConsumptionPer100Km = Number(inputs.fuelConsumption);
  const fuelType = String(inputs.fuelType || 'octane91');
  const country = (context?.countryCode || String(inputs.country || 'SA')).toUpperCase();
  const currency = context?.currencyCode || inputs.currency || COUNTRY_FUEL_PRICES[country]?.currency || 'SAR';

  // Manual price override if provided, otherwise default for country
  let pricePerLiter = Number(inputs.customPricePerLiter);
  if (!pricePerLiter || isNaN(pricePerLiter) || pricePerLiter <= 0) {
    const countryPrices = COUNTRY_FUEL_PRICES[country] || COUNTRY_FUEL_PRICES.SA;
    pricePerLiter = countryPrices[fuelType as keyof typeof countryPrices] as number || countryPrices.octane91;
  }

  // Validation
  if (isNaN(distanceKm) || distanceKm <= 0) {
    return {
      primary: { label: 'تكلفة الوقود', value: 0, formattedValue: '-' },
      error: 'يرجى إدخال مسافة صالحة أكبر من الصفر.',
    };
  }

  if (isNaN(fuelConsumptionPer100Km) || fuelConsumptionPer100Km <= 0) {
    return {
      primary: { label: 'تكلفة الوقود', value: 0, formattedValue: '-' },
      error: 'يرجى إدخال معدل استهلاك صحيح (لتر / 100 كم).',
    };
  }

  const litersNeeded = (distanceKm * fuelConsumptionPer100Km) / 100;
  const totalCost = litersNeeded * pricePerLiter;
  const costPerKm = totalCost / distanceKm;
  const monthlyCostEstimate = totalCost * 22; // 22 work days commute
  const yearlyCostEstimate = monthlyCostEstimate * 12;

  return {
    primary: {
      id: 'totalCost',
      label: 'إجمالي تكلفة الوقود للرحلة',
      value: totalCost,
      formattedValue: formatCurrency(totalCost, currency),
      unit: currency,
      highlight: true,
      isCurrency: true,
    },
    secondary: [
      {
        id: 'litersNeeded',
        label: 'كمية الوقود المطلوبة',
        value: litersNeeded,
        formattedValue: `${formatNumber(litersNeeded, { decimals: 2 })} لتر`,
        unit: 'لتر',
      },
      {
        id: 'costPerKm',
        label: 'التكلفة لكل كيلومتر',
        value: costPerKm,
        formattedValue: formatCurrency(costPerKm, currency, { decimals: 3 }),
        unit: currency,
      },
      {
        id: 'monthlyEstimate',
        label: 'التقدير الشهري (مشوار عمل 22 يوم ذهاب وعودة)',
        value: monthlyCostEstimate * 2,
        formattedValue: formatCurrency(monthlyCostEstimate * 2, currency),
        unit: currency,
      },
    ],
    details: [
      { label: 'المسافة المقطوعة', value: `${formatNumber(distanceKm)} كم` },
      { label: 'معدل الاستهلاك', value: `${formatNumber(fuelConsumptionPer100Km)} لتر / 100 كم` },
      { label: 'سعر اللتر المعتمد في الحساب', value: formatCurrency(pricePerLiter, currency, { decimals: 3 }) },
      { label: 'التقدير السنوي التراكمي (ذهاب وعودة)', value: formatCurrency(yearlyCostEstimate * 2, currency) },
    ],
    calculationSteps: [
      `حساب اللترات المطلوبة: (${formatNumber(distanceKm)} كم × ${formatNumber(fuelConsumptionPer100Km)} لتر) ÷ 100 = ${formatNumber(litersNeeded, { decimals: 2 })} لتر`,
      `حساب التكلفة الإجمالية: ${formatNumber(litersNeeded, { decimals: 2 })} لتر × ${formatNumber(pricePerLiter, { decimals: 3 })} ${currency} = ${formatCurrency(totalCost, currency)}`,
      `حساب تكلفة الكيلومتر الواحد: ${formatCurrency(totalCost, currency)} ÷ ${formatNumber(distanceKm)} كم = ${formatCurrency(costPerKm, currency, { decimals: 3 })} لكل كم`,
    ],
    directAnswer: `تكلفة الوقود لقطع مسافة ${formatNumber(distanceKm)} كم تبلغ حوالي ${formatCurrency(totalCost, currency)} وتتطلب ${formatNumber(litersNeeded, { decimals: 2 })} لتراً من الوقود.`,
    assumptions: [
      'الاستهلاك الفعلي يتأثر بظروف القيادة (الازدحام المروري، استخدام التكييف، حمولة السيارة).',
      'الأسعار المعتمدة تقريبية وفق تسعيرة الوقود الرسمية المعلنة في الدولة المحددة ويمكن تعديل سعر اللتر يدوياً بدقة.',
    ],
    qualifications: [
      'تختلف كفاءة استهلاك الوقود على الطرق السريعة عنها داخل المدينة بمعدل يتراوح بين 15% إلى 30%.',
    ],
    currency,
    country,
  };
}
