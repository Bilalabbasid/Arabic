import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';
import { resolveFuelGrade } from './grades';

export interface FuelCostInputs {
  distanceKm: number;
  fuelConsumption: number; // liters per 100 km
  fuelGrade?: string;
  customFuelPrice?: number;
}

export function calculateFuelCost(inputs: FuelCostInputs, country?: CountryData): CalculationResult {
  const distance = Number(inputs.distanceKm) || 0;
  const consumptionRate = Number(inputs.fuelConsumption) || 8.5;
  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;

  // Determine fuel price
  let pricePerLiter = 2.18; // Default Saudi 91
  let gradeName = 'بنزين 91';

  if (inputs.customFuelPrice && Number(inputs.customFuelPrice) > 0) {
    pricePerLiter = Number(inputs.customFuelPrice);
    gradeName = 'سعر مخصص';
  } else if (country?.fuel.value?.grades) {
    const resolved = resolveFuelGrade(country.fuel.value.grades, inputs.fuelGrade);
    if (resolved) {
      pricePerLiter = resolved.grade.pricePerLiter;
      gradeName = resolved.grade.nameAr;
    }
  }

  const litersNeeded = (distance / 100) * consumptionRate;
  const tripCost = litersNeeded * pricePerLiter;
  const roundTripCost = tripCost * 2;
  const costPerKm = distance > 0 ? tripCost / distance : 0;

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  return {
    primary: {
      label: 'تكلفة الوقود للمشوار (ذهاب)',
      value: tripCost,
      formattedValue: `${fmt(tripCost)} ${currencySymbol}`,
      unit: currencySymbol,
      isCurrency: true,
      badge: `${distance} كم`,
    },
    secondary: [
      {
        label: 'تكلفة المشوار ذهاباً وعودة',
        value: roundTripCost,
        formattedValue: `${fmt(roundTripCost)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
      {
        label: 'كمية الوقود المستهلكة',
        value: litersNeeded,
        formattedValue: `${fmt(litersNeeded)} لتر`,
        unit: 'لتر',
      },
    ],
    details: [
      { label: 'نوع الوقود المعتمد', value: gradeName },
      { label: 'سعر اللتر المعتمد', value: `${fmt(pricePerLiter)} ${currencySymbol}/لتر` },
      { label: 'معدل استهلاك السيارة', value: `${consumptionRate} لتر / 100 كم` },
      { label: 'تكلفة الكيلومتر الواحد', value: `${fmt(costPerKm)} ${currencySymbol}/كم` },
    ],
    calculationSteps: [
      `كمية الوقود المطلوبة = (${distance} كم ÷ 100) × ${consumptionRate} = ${fmt(litersNeeded)} لتر`,
      `تكلفة الوقود (ذهاب) = ${fmt(litersNeeded)} لتر × ${fmt(pricePerLiter)} = ${fmt(tripCost)} ${currencySymbol}`,
      `تكلفة الوقود (ذهاب وعودة) = ${fmt(tripCost)} × 2 = ${fmt(roundTripCost)} ${currencySymbol}`,
    ],
    assumptions: [
      gradeName === 'سعر مخصص'
        ? 'حُسبت التكلفة بسعر اللتر الذي أدخلته.'
        : `حُسبت التكلفة بالسعر الرسمي المسجل لدينا${country?.fuel.checkedAt ? ` (آخر تحقق ${country.fuel.checkedAt})` : ''}؛ إذا تغير السعر في محطتك اليوم فأدخله في حقل «سعر لتر الوقود اليوم».`,
    ],
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
