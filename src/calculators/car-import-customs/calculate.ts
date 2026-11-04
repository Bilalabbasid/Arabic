import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface CarImportInputs {
  carValueFob: number;
  shippingAndInsurance?: number;
  carAgeYears?: number;
  engineCc?: number;
}

export function calculateCarImportCustoms(inputs: CarImportInputs, country?: CountryData): CalculationResult {
  const fob = Number(inputs.carValueFob) || 0;
  const shipping = Number(inputs.shippingAndInsurance) || 0;
  const age = Number(inputs.carAgeYears) || 0;

  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;

  // CIF Value = FOB + Freight + Insurance
  const cifValue = fob + shipping;

  const customsDutyPercent = country?.vehicle.value?.customsDutyPercent ?? 5.0;
  const customsVatPercent = country ? (country.vehicle.value?.customsVatPercent ?? (country.vat.status === 'verified' ? country.vat.value?.standardRate ?? 0 : 0)) : 15.0;

  const customsDutyAmount = cifValue * (customsDutyPercent / 100);
  const vatTaxableBase = cifValue + customsDutyAmount;
  const vatAmount = vatTaxableBase * (customsVatPercent / 100);
  const totalCustomsAndTax = customsDutyAmount + vatAmount;
  const totalLandedCost = cifValue + totalCustomsAndTax;

  const maxAge = country?.vehicle.value?.maxImportAgeYears ?? 5;
  const warnings: string[] = [];
  if (age > maxAge) {
    warnings.push(
      `تنبيه قانوني: عمر السيارة (${age} سنوات) يتجاوز الحد الأقصى المسموح به لاستيراد سيارات الركوب في ${country?.basics.nameAr || 'الدولة'} (${maxAge} سنوات من سنة الصنع)، وقد تُرفض جمركياً.`
    );
  }

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  return {
    primary: {
      label: 'إجمالي الرسوم الجمركية والضريبية',
      value: totalCustomsAndTax,
      formattedValue: `${fmt(totalCustomsAndTax)} ${currencySymbol}`,
      unit: currencySymbol,
      isCurrency: true,
      badge: `جمارك ${customsDutyPercent}% + ضريبة ${customsVatPercent}%`,
    },
    secondary: [
      {
        label: 'إجمالي تكلفة السيارة واصلة المنفذ',
        value: totalLandedCost,
        formattedValue: `${fmt(totalLandedCost)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
      {
        label: 'رسم الجمارك النظامي',
        value: customsDutyAmount,
        formattedValue: `${fmt(customsDutyAmount)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
    ],
    details: [
      { label: 'القيمة الجمركية CIF (شاملة الشحن والتأمين)', value: `${fmt(cifValue)} ${currencySymbol}` },
      { label: 'نسبة الرسوم الجمركية المعتمدة', value: `${customsDutyPercent}%` },
      { label: 'مبلغ ضريبة القيمة المضافة عند الاستيراد', value: `${fmt(vatAmount)} ${currencySymbol} (${customsVatPercent}%)` },
      { label: 'شرط عمر السيارة المسموح', value: `حتى ${maxAge} سنوات من سنة الصنع` },
      { label: 'المرجع والجهة الجمركية', value: country?.vehicle.authority || 'مصلحة الجمارك' },
    ],
    calculationSteps: [
      `القيمة الجمركية (CIF) = قيمة السيارة (${fmt(fob)}) + الشحن (${fmt(shipping)}) = ${fmt(cifValue)} ${currencySymbol}`,
      `الرسوم الجمركية (${customsDutyPercent}%) = ${fmt(customsDutyAmount)} ${currencySymbol}`,
      customsVatPercent > 0
        ? `ضريبة القيمة المضافة (${customsVatPercent}%) على الوعاء الجمركي (${fmt(vatTaxableBase)}) = ${fmt(vatAmount)} ${currencySymbol}`
        : 'لا توجد ضريبة قيمة مضافة للاستيراد في هذه الدولة',
      `المجموع المستحق للجمارك = ${fmt(totalCustomsAndTax)} ${currencySymbol}`,
    ],
    warnings: warnings.length > 0 ? warnings : undefined,
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
