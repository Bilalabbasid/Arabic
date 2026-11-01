import { CalculationResult } from '@/types/calculator';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { ALL_COUNTRY_LEGAL_RULES } from '@/data/rules';

export interface VerifiedFuelPrice {
  octane91: number;
  octane95: number;
  diesel: number;
  currency: string;
  lastUpdated: string;
  sourceId: string;
  sourceLabel: string;
  isGovernmentCapped?: boolean;
}

/**
 * Verified national retail fuel prices derived from centralized single source of truth in src/data/rules/
 */
export const VERIFIED_COUNTRY_FUEL_PRICES: Record<string, VerifiedFuelPrice> = Object.fromEntries(
  Object.entries(ALL_COUNTRY_LEGAL_RULES)
    .filter(([, rule]) => rule.fuelPrices !== undefined)
    .map(([code, rule]) => [
      code,
      {
        octane91: rule.fuelPrices!.value.octane91,
        octane95: rule.fuelPrices!.value.octane95,
        diesel: rule.fuelPrices!.value.diesel,
        currency: rule.currency,
        lastUpdated: rule.fuelPrices!.checkedAt,
        sourceId: `${code.toLowerCase()}-fuel-pricing`,
        sourceLabel: `${rule.fuelPrices!.authority} (${rule.fuelPrices!.value.pricingModel})`,
        isGovernmentCapped:
          rule.fuelPrices!.value.pricingModel.includes('سقف') ||
          rule.fuelPrices!.value.pricingModel.includes('مدعوم'),
      },
    ])
);

/**
 * Calculates vehicle trip fuel cost, consumption in liters, cost per km,
 * clearly distinguishing universal physics/math from country-specific or manual price assumptions.
 */
export function calculateCarFuelCost(
  inputs: Record<string, any>,
  context?: { countryCode?: string; currencyCode?: string }
): CalculationResult {
  const distanceKm = Number(inputs.distanceKm);
  const fuelConsumptionPer100Km = Number(inputs.fuelConsumption);
  const fuelType = String(inputs.fuelType || 'octane91');
  const country = (context?.countryCode || String(inputs.country || 'SA')).toUpperCase();

  // Explicit validation: never silently clamp invalid inputs
  if (isNaN(distanceKm) || distanceKm <= 0) {
    return {
      primary: { label: 'تكلفة الوقود', value: 0, formattedValue: '-' },
      error: 'يرجى إدخال مسافة صالحة أكبر من الصفر.',
    };
  }

  if (isNaN(fuelConsumptionPer100Km) || fuelConsumptionPer100Km <= 0) {
    return {
      primary: { label: 'تكلفة الوقود', value: 0, formattedValue: '-' },
      error: 'يرجى إدخال معدل استهلاك صحيح للوقود لكل 100 كم (أكبر من الصفر).',
    };
  }

  // 1. Universal mathematical engine (Distance & Fuel consumption volume)
  const litersNeeded = (distanceKm * fuelConsumptionPer100Km) / 100;

  // 2. Price resolution
  let pricePerLiter = Number(inputs.customPricePerLiter);
  let isCustomPrice = false;
  let priceSourceText = '';
  let sourceIdsList: string[] = [];
  let currency = context?.currencyCode || inputs.currency || 'SAR';

  if (pricePerLiter && !isNaN(pricePerLiter) && pricePerLiter > 0) {
    isCustomPrice = true;
    priceSourceText = `سعر مخصص مدخل يدوياً (${formatNumber(pricePerLiter, { decimals: 3 })} ${currency}/لتر)`;
  } else {
    const verifiedData = VERIFIED_COUNTRY_FUEL_PRICES[country] || VERIFIED_COUNTRY_FUEL_PRICES.SA;
    currency = context?.currencyCode || inputs.currency || verifiedData.currency;
    pricePerLiter = verifiedData[fuelType as keyof Pick<VerifiedFuelPrice, 'octane91' | 'octane95' | 'diesel'>] || verifiedData.octane91;
    priceSourceText = `${verifiedData.sourceLabel} (تحديث ${verifiedData.lastUpdated})`;
    if (verifiedData.sourceId) sourceIdsList.push(verifiedData.sourceId);
  }

  const totalCost = litersNeeded * pricePerLiter;
  const costPerKm = totalCost / distanceKm;
  const monthlyCostEstimate = totalCost * 22; // 22 workdays commute (one-way)
  const yearlyCostEstimate = monthlyCostEstimate * 12;

  return {
    primary: {
      id: 'totalCost',
      label: 'إجمالي تكلفة الوقود للرحلة',
      value: totalCost,
      formattedValue: formatCurrency(totalCost, currency),
      unit: currency,
      highlight: true,
      badge: isCustomPrice ? 'سعر مدخل يدوياً' : `تسعيرة رسمية معتمدة (${country})`,
      isCurrency: true,
    },
    secondary: [
      {
        id: 'litersNeeded',
        label: 'كمية الوقود المطلوبة (حساب كوني)',
        value: litersNeeded,
        formattedValue: `${formatNumber(litersNeeded, { decimals: 2 })} لتر`,
        unit: 'لتر',
      },
      {
        id: 'costPerKm',
        label: 'التكلفة لكل كيلومتر واحد',
        value: costPerKm,
        formattedValue: formatCurrency(costPerKm, currency, { decimals: 3 }),
        unit: currency,
      },
      {
        id: 'monthlyEstimate',
        label: 'التقدير الشهري لمشوار عمل ذهاباً وإياباً (22 يوم)',
        value: monthlyCostEstimate * 2,
        formattedValue: formatCurrency(monthlyCostEstimate * 2, currency),
        unit: currency,
      },
    ],
    details: [
      { label: 'المسافة المقطوعة', value: `${formatNumber(distanceKm)} كم` },
      { label: 'معدل الاستهلاك المعتمد', value: `${formatNumber(fuelConsumptionPer100Km)} لتر / 100 كم` },
      { label: 'سعر اللتر في الحساب', value: formatCurrency(pricePerLiter, currency, { decimals: 3 }) },
      { label: 'مصدر تسعيرة الوقود', value: priceSourceText },
      { label: 'التقدير السنوي التراكمي (ذهاب وعودة)', value: formatCurrency(yearlyCostEstimate * 2, currency) },
    ],
    calculationSteps: [
      `1. حساب حجم الوقود الكوني: (${formatNumber(distanceKm)} كم × ${formatNumber(fuelConsumptionPer100Km)} لتر) ÷ 100 = ${formatNumber(litersNeeded, { decimals: 2 })} لتر`,
      `2. تطبيق تسعيرة اللتر المعتمدة: ${formatNumber(litersNeeded, { decimals: 2 })} لتر × ${formatNumber(pricePerLiter, { decimals: 3 })} ${currency} = ${formatCurrency(totalCost, currency)}`,
      `3. حساب تكلفة الكيلومتر الواحد: ${formatCurrency(totalCost, currency)} ÷ ${formatNumber(distanceKm)} كم = ${formatCurrency(costPerKm, currency, { decimals: 3 })} لكل كم`,
    ],
    directAnswer: `تكلفة استهلاك الوقود لقطع ${formatNumber(distanceKm)} كم هي ${formatCurrency(totalCost, currency)} وتتطلب ${formatNumber(litersNeeded, { decimals: 2 })} لتراً من الوقود استناداً إلى: ${priceSourceText}.`,
    assumptions: [
      'كمية استهلاك الوقود باللتر هي عملية حسابية كونية دقيقة تعتمد على كفاءة محرك سيارتك.',
      isCustomPrice
        ? 'تم احتساب التكلفة بناءً على السعر المخصص الذي قمت بإدخاله يدوياً.'
        : `تعتمد الأسعار على التسعيرة الرسمية المعلنة من: ${priceSourceText}. يمكن تعديل سعر اللتر يدوياً بدقة عند تغير الأسعار بالمحطة.`,
      'يؤثر تشغيل مكيف الهواء وظروف الازدحام المروري على معدل الاستهلاك الفعلي بنسبة 10% إلى 20%.',
    ],
    sources: sourceIdsList,
    currency,
    country,
  };
}
