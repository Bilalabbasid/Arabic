import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface FuelPricesInputs {
  tankSizeLiters?: number;
  fuelGrade?: string;
}

export function calculateFuelPrices(inputs: FuelPricesInputs, country?: CountryData): CalculationResult {
  const tankSize = Number(inputs.tankSizeLiters) || 50;
  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;

  const fuelData = country?.fuel.value;
  const grades = fuelData?.grades || {
    octane91: { nameAr: 'بنزين 91 ممتاز', pricePerLiter: 2.18, unitAr: 'ر.س/لتر' },
    octane95: { nameAr: 'بنزين 95 سوبر', pricePerLiter: 2.33, unitAr: 'ر.س/لتر' },
    diesel: { nameAr: 'ديزل', pricePerLiter: 1.79, unitAr: 'ر.س/لتر' },
  };

  const selectedKey = inputs.fuelGrade && grades[inputs.fuelGrade] ? inputs.fuelGrade : Object.keys(grades)[0];
  const selectedGrade = grades[selectedKey] || Object.values(grades)[0];
  const price = selectedGrade.pricePerLiter;

  const fullTankCost = tankSize * price;
  const halfTankCost = fullTankCost / 2;
  const quarterTankCost = fullTankCost / 4;

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  const rows = Object.entries(grades).map(([key, g]) => ({
    period: g.nameAr,
    values: {
      price: `${fmt(g.pricePerLiter)} ${currencySymbol}/لتر`,
      fill50L: `${fmt(50 * g.pricePerLiter)} ${currencySymbol}`,
      fillTank: `${fmt(tankSize * g.pricePerLiter)} ${currencySymbol}`,
    },
  }));

  return {
    primary: {
      label: `تكلفة ملء خزان (${selectedGrade.nameAr})`,
      value: fullTankCost,
      formattedValue: `${fmt(fullTankCost)} ${currencySymbol}`,
      unit: currencySymbol,
      isCurrency: true,
      badge: `سعة ${tankSize} لتر`,
    },
    secondary: [
      {
        label: 'سعر اللتر الرسمي',
        value: price,
        formattedValue: `${fmt(price)} ${currencySymbol}/لتر`,
      },
      {
        label: 'تكلفة ملء نصف الخزان (50%)',
        value: halfTankCost,
        formattedValue: `${fmt(halfTankCost)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
    ],
    details: [
      { label: 'الوقود المحدد', value: selectedGrade.nameAr },
      { label: 'سعة خزان الوقود', value: `${tankSize} لتر` },
      { label: 'نموذج التسعير في الدولة', value: fuelData?.pricingModel || 'تسعير رسمي' },
      { label: 'الجهة الرسمية المعتمدة', value: country?.fuel.authority || 'وزارة الطاقة' },
      { label: 'تاريخ آخر تحديث رسمي', value: country?.fuel.checkedAt || '2026-11-01' },
    ],
    breakdown: {
      periodLabel: 'نوع الوقود',
      columns: [
        { key: 'price', label: 'سعر اللتر' },
        { key: 'fill50L', label: 'تعبئة 50 لتر' },
        { key: 'fillTank', label: `تعبئة ${tankSize} لتر` },
      ],
      rows,
    },
    calculationSteps: [
      `سعر اللتر المعتمد لـ (${selectedGrade.nameAr}) = ${fmt(price)} ${currencySymbol}`,
      `تكلفة ملء الخزان بالكامل = ${tankSize} لتر × ${fmt(price)} = ${fmt(fullTankCost)} ${currencySymbol}`,
    ],
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
