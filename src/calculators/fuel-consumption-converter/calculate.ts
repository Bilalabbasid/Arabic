import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface FuelConsumptionInputs {
  value: number;
  fromUnit: 'l_100km' | 'km_l' | 'mpg_us' | 'mpg_uk';
}

export function calculateFuelConsumptionConverter(inputs: FuelConsumptionInputs, country?: CountryData): CalculationResult {
  const val = Number(inputs.value) || 0;
  const unit = inputs.fromUnit || 'l_100km';

  let l100km = 0;
  if (val > 0) {
    switch (unit) {
      case 'l_100km':
        l100km = val;
        break;
      case 'km_l':
        l100km = 100 / val;
        break;
      case 'mpg_us':
        l100km = 235.215 / val;
        break;
      case 'mpg_uk':
        l100km = 282.481 / val;
        break;
    }
  }

  const kmL = l100km > 0 ? 100 / l100km : 0;
  const mpgUs = l100km > 0 ? 235.215 / l100km : 0;
  const mpgUk = l100km > 0 ? 282.481 / l100km : 0;

  // Efficiency classification (Saudi SASO / standard)
  let rating = 'متوسط';
  let badgeColor = 'bg-amber-500';
  if (kmL >= 16) {
    rating = 'ممتاز جداً (اقتصادي للغاية)';
    badgeColor = 'bg-emerald-600';
  } else if (kmL >= 14) {
    rating = 'ممتاز';
    badgeColor = 'bg-emerald-500';
  } else if (kmL >= 12) {
    rating = 'جيد جداً';
    badgeColor = 'bg-teal-500';
  } else if (kmL >= 10) {
    rating = 'جيد';
    badgeColor = 'bg-blue-500';
  } else if (kmL < 8) {
    rating = 'سيئ جداً (مرتفع الاستهلاك)';
    badgeColor = 'bg-rose-500';
  }

  return {
    primary: {
      label: 'الاستهلاك القياسي (لتر / 100 كم)',
      value: l100km,
      formattedValue: `${l100km.toFixed(2)} لتر / 100 كم`,
      unit: 'لتر / 100 كم',
      badge: rating,
    },
    secondary: [
      {
        label: 'المسافة المقطوعة باللتر الواحد (كم / لتر)',
        value: kmL,
        formattedValue: `${kmL.toFixed(2)} كم / لتر`,
        unit: 'كم / لتر',
      },
      {
        label: 'الميل لكل جالون أمريكي (MPG US)',
        value: mpgUs,
        formattedValue: `${mpgUs.toFixed(2)} MPG`,
        unit: 'MPG US',
      },
    ],
    details: [
      { label: 'الميل لكل جالون إمبراطوري (MPG UK)', value: `${mpgUk.toFixed(2)} MPG UK` },
      { label: 'تقييم كفاءة الطاقة التقريبي', value: rating },
    ],
    calculationSteps: [
      `التحويل من ${unit} إلى لتر/100 كم = ${l100km.toFixed(2)}`,
      `كم / لتر = 100 ÷ ${l100km.toFixed(2)} = ${kmL.toFixed(2)} كم/لتر`,
      `ميل / جالون أمريكي (MPG US) = 235.215 ÷ ${l100km.toFixed(2)} = ${mpgUs.toFixed(2)} MPG`,
    ],
  };
}
