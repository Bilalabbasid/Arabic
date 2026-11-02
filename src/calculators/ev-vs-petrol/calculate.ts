import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface EvVsPetrolInputs {
  annualKm: number;
  petrolConsumptionL100km?: number;
  petrolPricePerLiter?: number;
  evEfficiencyKwh100km?: number;
  electricityRatePerKwh?: number;
}

export function calculateEvVsPetrol(inputs: EvVsPetrolInputs, country?: CountryData): CalculationResult {
  const annualKm = Number(inputs.annualKm) || 20000;
  const petrolL100 = Number(inputs.petrolConsumptionL100km) || 8.5;
  const evKwh100 = Number(inputs.evEfficiencyKwh100km) || 18.0;

  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;

  // Fetch verified fuel price & electricity tariff from country data
  const fuelPrice = inputs.petrolPricePerLiter || country?.fuel.value?.grades?.octane91?.pricePerLiter || 2.18;
  const elecRate = inputs.electricityRatePerKwh || country?.electricity.value?.residentialTiers?.[0]?.ratePerKwh || 0.18;

  const annualPetrolLiters = (annualKm / 100) * petrolL100;
  const annualPetrolCost = annualPetrolLiters * fuelPrice;

  const annualEvKwh = (annualKm / 100) * evKwh100;
  const annualEvCost = annualEvKwh * elecRate;

  const annualSavings = Math.max(0, annualPetrolCost - annualEvCost);
  const fiveYearSavings = annualSavings * 5;

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  return {
    primary: {
      label: 'التوفير السنوي في تكلفة الطاقة مع السيارة الكهربائية',
      value: annualSavings,
      formattedValue: `${fmt(annualSavings)} ${currencySymbol} / سنة`,
      unit: currencySymbol,
      isCurrency: true,
      badge: `توفير 5 سنوات: ${fmt(fiveYearSavings)} ${currencySymbol}`,
    },
    secondary: [
      {
        label: 'التكلفة السنوية لبنزين السيارة التقليدية',
        value: annualPetrolCost,
        formattedValue: `${fmt(annualPetrolCost)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
      {
        label: 'التكلفة السنوية لشحن السيارة الكهربائية',
        value: annualEvCost,
        formattedValue: `${fmt(annualEvCost)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
    ],
    details: [
      { label: 'المسافة السنوية المقطوعة', value: `${fmt(annualKm)} كم/سنة` },
      { label: 'سعر لتر البنزين المعتمد', value: `${fmt(fuelPrice)} ${currencySymbol}/لتر` },
      { label: 'تعرفة شحن الكهرباء المعتمدة', value: `${fmt(elecRate)} ${currencySymbol}/ك.و.س` },
      { label: 'تكلفة الكيلومتر الواحد (بنزين)', value: `${((annualPetrolCost / annualKm)).toFixed(3)} ${currencySymbol}/كم` },
      { label: 'تكلفة الكيلومتر الواحد (كهرباء)', value: `${((annualEvCost / annualKm)).toFixed(3)} ${currencySymbol}/كم` },
    ],
    calculationSteps: [
      `تكلفة البنزين السنوية = (${annualKm} ÷ 100) × ${petrolL100} لتر × ${fmt(fuelPrice)} = ${fmt(annualPetrolCost)} ${currencySymbol}`,
      `تكلفة شحن الكهرباء السنوية = (${annualKm} ÷ 100) × ${evKwh100} ك.و.س × ${fmt(elecRate)} = ${fmt(annualEvCost)} ${currencySymbol}`,
      `صافي الوفر السنوي = ${fmt(annualPetrolCost)} - ${fmt(annualEvCost)} = ${fmt(annualSavings)} ${currencySymbol}`,
    ],
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
