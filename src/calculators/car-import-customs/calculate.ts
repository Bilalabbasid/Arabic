import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface CarImportInputs {
  carValueFob: number;
  shippingAndInsurance?: number;
  carAgeYears?: number;
  engineCc?: number;
  /** 'eu' when the car has preferential EU origin (Egypt: 0% duty); otherwise 'other' */
  originPreferential?: 'eu' | 'other' | string;
}

type Band = { maxCc?: number; rate: number };

function pickRate(bands: Band[] | undefined, cc: number): number {
  if (!bands || bands.length === 0) return 0;
  const band = bands.find((b) => b.maxCc === undefined || cc <= b.maxCc);
  return band ? band.rate : 0;
}

export function calculateCarImportCustoms(inputs: CarImportInputs, country?: CountryData): CalculationResult {
  const fob = Number(inputs.carValueFob) || 0;
  const shipping = Number(inputs.shippingAndInsurance) || 0;
  const age = Number(inputs.carAgeYears) || 0;
  const engineCc = Number(inputs.engineCc) || 1600;
  const isPreferentialOrigin = inputs.originPreferential === 'eu';

  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  // CIF Value = FOB + Freight + Insurance
  const cifValue = fob + shipping;
  const vehicle = country?.vehicle.value;
  const taxes = vehicle?.importTaxes;

  let customsDutyPercent: number;
  let customsDutyAmount: number;
  let scheduleTaxPercent = 0;
  let scheduleTaxAmount = 0;
  let customsVatPercent: number;
  let vatTaxableBase: number;
  let vatAmount: number;
  let developmentFeePercent = 0;
  let developmentFeeAmount = 0;

  if (taxes) {
    // Engine-size chain (Egypt): duty -> schedule tax -> VAT -> development fee
    customsDutyPercent = isPreferentialOrigin
      ? (taxes.preferentialOriginDutyRate ?? 0)
      : pickRate(taxes.dutyBands, engineCc);
    customsDutyAmount = cifValue * (customsDutyPercent / 100);

    scheduleTaxPercent = pickRate(taxes.scheduleTaxBands, engineCc);
    scheduleTaxAmount = (cifValue + customsDutyAmount) * (scheduleTaxPercent / 100);

    customsVatPercent = taxes.vatRate;
    vatTaxableBase = cifValue + customsDutyAmount + scheduleTaxAmount;
    vatAmount = vatTaxableBase * (customsVatPercent / 100);

    developmentFeePercent = pickRate(taxes.developmentFeeBands, engineCc);
    developmentFeeAmount = (vatTaxableBase + vatAmount) * (developmentFeePercent / 100);
  } else {
    // Flat GCC model: duty on CIF, VAT on (CIF + duty)
    customsDutyPercent = vehicle?.customsDutyPercent ?? 5.0;
    customsVatPercent = country
      ? (vehicle?.customsVatPercent ?? (country.vat.status === 'verified' ? country.vat.value?.standardRate ?? 0 : 0))
      : 15.0;
    customsDutyAmount = cifValue * (customsDutyPercent / 100);
    vatTaxableBase = cifValue + customsDutyAmount;
    vatAmount = vatTaxableBase * (customsVatPercent / 100);
  }

  const totalCustomsAndTax = customsDutyAmount + scheduleTaxAmount + vatAmount + developmentFeeAmount;
  const totalLandedCost = cifValue + totalCustomsAndTax;

  const maxAge = vehicle?.maxImportAgeYears ?? 5;
  const countryName = country?.basics.nameAr || 'الدولة';
  const warnings: string[] = [];
  if (maxAge === 0 && age > 0) {
    warnings.push(
      `تنبيه قانوني: لا يُسمح في ${countryName} باستيراد سيارات الركوب المستعملة؛ يُشترط أن تكون السيارة جديدة غير مستعملة ومن سنة الموديل عند الشحن.`
    );
  } else if (age > maxAge) {
    warnings.push(
      `تنبيه قانوني: عمر السيارة (${age} سنوات) يتجاوز الحد الأقصى المسموح به لاستيراد سيارات الركوب في ${countryName} (${maxAge} سنوات من سنة الصنع)، وقد تُرفض جمركياً.`
    );
  }

  const badge = taxes
    ? `جمارك ${customsDutyPercent}% + جدول ${scheduleTaxPercent}% + قيمة مضافة ${customsVatPercent}% + تنمية ${developmentFeePercent}%`
    : `جمارك ${customsDutyPercent}% + ضريبة ${customsVatPercent}%`;

  const details: Array<{ label: string; value: string }> = [
    { label: 'القيمة الجمركية CIF (شاملة الشحن والتأمين)', value: `${fmt(cifValue)} ${currencySymbol}` },
    {
      label: 'نسبة الرسوم الجمركية المعتمدة',
      value: taxes && isPreferentialOrigin
        ? `${customsDutyPercent}% (${taxes.preferentialOriginLabelAr || 'منشأ تفضيلي'})`
        : `${customsDutyPercent}%`,
    },
  ];
  if (taxes) {
    details.push(
      { label: 'سعة المحرك المعتمدة في الحساب', value: `${engineCc} سم³` },
      { label: `ضريبة الجدول (${scheduleTaxPercent}%)`, value: `${fmt(scheduleTaxAmount)} ${currencySymbol}` },
    );
  }
  details.push({ label: 'مبلغ ضريبة القيمة المضافة عند الاستيراد', value: `${fmt(vatAmount)} ${currencySymbol} (${customsVatPercent}%)` });
  if (taxes) {
    details.push({ label: `رسم تنمية الموارد المالية للدولة (${developmentFeePercent}%)`, value: `${fmt(developmentFeeAmount)} ${currencySymbol}` });
  }
  details.push(
    { label: 'شرط عمر السيارة المسموح', value: maxAge === 0 ? 'سيارات جديدة من سنة الموديل فقط' : `حتى ${maxAge} سنوات من سنة الصنع` },
    { label: 'المرجع والجهة الجمركية', value: country?.vehicle.authority || 'مصلحة الجمارك' },
  );

  const calculationSteps = [
    `القيمة الجمركية (CIF) = قيمة السيارة (${fmt(fob)}) + الشحن (${fmt(shipping)}) = ${fmt(cifValue)} ${currencySymbol}`,
    `الرسوم الجمركية (${customsDutyPercent}%) = ${fmt(customsDutyAmount)} ${currencySymbol}`,
  ];
  if (taxes) {
    calculationSteps.push(
      `ضريبة الجدول (${scheduleTaxPercent}%) على (CIF + الجمارك) = ${fmt(scheduleTaxAmount)} ${currencySymbol}`,
      `ضريبة القيمة المضافة (${customsVatPercent}%) على (${fmt(vatTaxableBase)}) = ${fmt(vatAmount)} ${currencySymbol}`,
      `رسم التنمية (${developmentFeePercent}%) على القيمة الإجمالية (${fmt(vatTaxableBase + vatAmount)}) = ${fmt(developmentFeeAmount)} ${currencySymbol}`,
    );
  } else {
    calculationSteps.push(
      customsVatPercent > 0
        ? `ضريبة القيمة المضافة (${customsVatPercent}%) على الوعاء الجمركي (${fmt(vatTaxableBase)}) = ${fmt(vatAmount)} ${currencySymbol}`
        : 'لا توجد ضريبة قيمة مضافة للاستيراد في هذه الدولة',
    );
  }
  calculationSteps.push(`المجموع المستحق للجمارك = ${fmt(totalCustomsAndTax)} ${currencySymbol}`);

  return {
    primary: {
      label: 'إجمالي الرسوم الجمركية والضريبية',
      value: totalCustomsAndTax,
      formattedValue: `${fmt(totalCustomsAndTax)} ${currencySymbol}`,
      unit: currencySymbol,
      isCurrency: true,
      badge,
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
    details,
    calculationSteps,
    warnings: warnings.length > 0 ? warnings : undefined,
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
