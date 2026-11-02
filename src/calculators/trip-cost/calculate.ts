import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface TripCostInputs {
  routeId?: string;
  customDistanceKm?: number;
  fuelConsumption?: number;
  fuelGrade?: string;
  tollFees?: number;
  passengersCount?: number;
}

export function calculateTripCost(inputs: TripCostInputs, country?: CountryData): CalculationResult {
  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;
  const consumption = Number(inputs.fuelConsumption) || 8.5;
  const toll = Number(inputs.tollFees) || 0;
  const passengers = Math.max(1, Number(inputs.passengersCount) || 1);

  // Look up route or custom distance
  let distanceKm = 400;
  let routeName = 'مشوار مخصص';

  if (inputs.routeId && country?.routes) {
    const found = country.routes.find((r) => r.id === inputs.routeId);
    if (found) {
      distanceKm = found.distanceKm;
      routeName = `من ${found.fromCityAr} إلى ${found.toCityAr}`;
    }
  } else if (inputs.customDistanceKm && Number(inputs.customDistanceKm) > 0) {
    distanceKm = Number(inputs.customDistanceKm);
    routeName = `مسار مخصص (${distanceKm} كم)`;
  } else if (country?.routes?.[0]) {
    const first = country.routes[0];
    distanceKm = first.distanceKm;
    routeName = `من ${first.fromCityAr} إلى ${first.toCityAr}`;
  }

  // Fuel price
  let pricePerLiter = 2.18;
  const grades = country?.fuel.value?.grades;
  if (grades) {
    const gradeKey = inputs.fuelGrade && grades[inputs.fuelGrade] ? inputs.fuelGrade : Object.keys(grades)[0];
    if (grades[gradeKey]) pricePerLiter = grades[gradeKey].pricePerLiter;
  }

  const fuelLiters = (distanceKm / 100) * consumption;
  const fuelCostOneWay = fuelLiters * pricePerLiter;
  const totalCostOneWay = fuelCostOneWay + toll;
  const totalCostRoundTrip = (totalCostOneWay * 2);
  const costPerPassenger = totalCostOneWay / passengers;

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  return {
    primary: {
      label: `إجمالي تكلفة الرحلة (${routeName})`,
      value: totalCostOneWay,
      formattedValue: `${fmt(totalCostOneWay)} ${currencySymbol}`,
      unit: currencySymbol,
      isCurrency: true,
      badge: `${distanceKm} كم`,
    },
    secondary: [
      {
        label: 'تكلفة الرحلة ذهاباً وإياباً',
        value: totalCostRoundTrip,
        formattedValue: `${fmt(totalCostRoundTrip)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
      {
        label: 'حصة الراكب الواحد (اتجاه واحد)',
        value: costPerPassenger,
        formattedValue: `${fmt(costPerPassenger)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
    ],
    details: [
      { label: 'المسار المحدد', value: routeName },
      { label: 'المسافة الإجمالية', value: `${distanceKm} كم` },
      { label: 'كمية الوقود المطلوبة', value: `${fmt(fuelLiters)} لتر` },
      { label: 'تكلفة الوقود الصافية', value: `${fmt(fuelCostOneWay)} ${currencySymbol}` },
      ...(toll > 0 ? [{ label: 'رسوم بوابات الطرق (Tolls)', value: `${fmt(toll)} ${currencySymbol}` }] : []),
      { label: 'عدد الركاب المشاركين', value: `${passengers} أشخاص` },
    ],
    calculationSteps: [
      `المسافة: ${distanceKm} كم بمعدل استهلاك ${consumption} لتر/100 كم = ${fmt(fuelLiters)} لتر`,
      `تكلفة الوقود = ${fmt(fuelLiters)} لتر × ${fmt(pricePerLiter)} = ${fmt(fuelCostOneWay)} ${currencySymbol}`,
      toll > 0 ? `المجموع شامل رسوم الطرق (${fmt(toll)}) = ${fmt(totalCostOneWay)} ${currencySymbol}` : `المجموع = ${fmt(totalCostOneWay)} ${currencySymbol}`,
      `نصيب الراكب (${passengers} ركاب) = ${fmt(costPerPassenger)} ${currencySymbol}`,
    ],
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
