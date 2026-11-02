import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface ElectricityInputs {
  consumptionKwh: number;
  meterServiceFee?: number;
  customerType?: 'residential' | 'commercial';
}

export function calculateElectricityBill(inputs: ElectricityInputs, country?: CountryData): CalculationResult {
  const kwh = Number(inputs.consumptionKwh) || 0;
  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;

  const elecData = country?.electricity.value;
  const tiers = elecData?.residentialTiers || [
    { minKwh: 1, maxKwh: 6000, ratePerKwh: 0.18 },
    { minKwh: 6001, ratePerKwh: 0.30 },
  ];

  let totalEnergyCost = 0;
  let remainingKwh = kwh;
  const tierBreakdown: Array<{ name: string; kwhInTier: number; rate: number; cost: number }> = [];

  for (let i = 0; i < tiers.length; i++) {
    const tier = tiers[i];
    const tierCapacity = tier.maxKwh ? tier.maxKwh - tier.minKwh + 1 : Infinity;
    const kwhInThisTier = Math.min(remainingKwh, tierCapacity);

    if (kwhInThisTier > 0) {
      const cost = kwhInThisTier * tier.ratePerKwh;
      totalEnergyCost += cost;
      tierBreakdown.push({
        name: `الشريحة ${i + 1} (${tier.minKwh}${tier.maxKwh ? ` - ${tier.maxKwh}` : '+'})`,
        kwhInTier: kwhInThisTier,
        rate: tier.ratePerKwh,
        cost,
      });
      remainingKwh -= kwhInThisTier;
    }
  }

  const meterFee = inputs.meterServiceFee !== undefined ? Number(inputs.meterServiceFee) : (elecData?.meterServiceFeeMonthly || 0);
  const vatApplies = elecData?.vatApplies ?? false;
  const vatRate = vatApplies && country?.vat.status === 'verified' ? country.vat.value?.standardRate || 0 : 0;

  const subtotal = totalEnergyCost + meterFee;
  const vatAmount = subtotal * (vatRate / 100);
  const totalBill = subtotal + vatAmount;

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  const rows = tierBreakdown.map((t) => ({
    period: t.name,
    values: {
      kwh: `${fmt(t.kwhInTier)} ك.و.س`,
      rate: `${t.rate.toFixed(3)} ${currencySymbol}`,
      cost: `${fmt(t.cost)} ${currencySymbol}`,
    },
  }));

  return {
    primary: {
      label: 'إجمالي الفاتورة التقديرية',
      value: totalBill,
      formattedValue: `${fmt(totalBill)} ${currencySymbol}`,
      unit: currencySymbol,
      isCurrency: true,
      badge: `${fmt(kwh)} ك.و.س`,
    },
    secondary: [
      {
        label: 'تكلفة استهلاك الطاقة الكهربائية',
        value: totalEnergyCost,
        formattedValue: `${fmt(totalEnergyCost)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
      {
        label: 'ضريبة القيمة المضافة',
        value: vatAmount,
        formattedValue: `${fmt(vatAmount)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
    ],
    details: [
      { label: 'رسم خدمة العداد الشهري', value: `${fmt(meterFee)} ${currencySymbol}` },
      { label: 'نسبة الضريبة المطبقة', value: `${vatRate}%` },
      { label: 'الجهة التنظيمية المسؤولة', value: country?.electricity.authority || 'هيئة تنظيم الكهرباء' },
    ],
    breakdown: {
      columns: [
        { key: 'kwh', label: 'الاستهلاك' },
        { key: 'rate', label: 'سعر الوحدة' },
        { key: 'cost', label: 'المبلغ' },
      ],
      rows,
    },
    calculationSteps: [
      `استهلاك الطاقة: ${fmt(kwh)} كيلوواط ساعي موزع على ${tierBreakdown.length} شرائح`,
      `المجموع قبل الضريبة (شاملاً رسم العداد ${fmt(meterFee)}): ${fmt(subtotal)} ${currencySymbol}`,
      vatRate > 0 ? `الضريبة (${vatRate}%): ${fmt(vatAmount)} ${currencySymbol}` : 'لا تطبق ضريبة على الفاتورة السكنية',
      `المجموع النهائي: ${fmt(totalBill)} ${currencySymbol}`,
    ],
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
