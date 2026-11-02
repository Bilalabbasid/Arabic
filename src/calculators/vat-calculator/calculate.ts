import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface VatInputs {
  amount: number;
  isVatInclusive?: boolean;
  customRate?: number;
}

export function calculateVat(inputs: VatInputs, country?: CountryData): CalculationResult {
  const amount = Number(inputs.amount) || 0;
  const isInclusive = Boolean(inputs.isVatInclusive);
  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;

  // Determine effective rate
  let rate = 15;
  let hasOfficialVat = true;
  let statusNote = '';

  if (inputs.customRate !== undefined && inputs.customRate !== null && !isNaN(Number(inputs.customRate))) {
    rate = Number(inputs.customRate);
  } else if (country) {
    if (country.vat.status === 'not_applicable') {
      rate = 0;
      hasOfficialVat = false;
      statusNote = country.vat.note || 'لا تطبق ضريبة القيمة المضافة رسمياً في هذه الدولة.';
    } else if (country.vat.value) {
      rate = country.vat.value.standardRate;
    }
  }

  let netAmount = 0;
  let vatAmount = 0;
  let grossAmount = 0;

  if (isInclusive) {
    grossAmount = amount;
    netAmount = rate > 0 ? amount / (1 + rate / 100) : amount;
    vatAmount = grossAmount - netAmount;
  } else {
    netAmount = amount;
    vatAmount = amount * (rate / 100);
    grossAmount = netAmount + vatAmount;
  }

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  const warnings: string[] = [];
  if (!hasOfficialVat) {
    warnings.push(statusNote);
  }

  return {
    primary: {
      label: 'مبلغ ضريبة القيمة المضافة',
      value: vatAmount,
      formattedValue: `${fmt(vatAmount)} ${currencySymbol}`,
      unit: currencySymbol,
      isCurrency: true,
      badge: `${rate}%`,
    },
    secondary: [
      {
        label: 'المبلغ الإجمالي شامل الضريبة',
        value: grossAmount,
        formattedValue: `${fmt(grossAmount)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
      {
        label: 'المبلغ الأساسي قبل الضريبة',
        value: netAmount,
        formattedValue: `${fmt(netAmount)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
    ],
    details: [
      { label: 'نسبة الضريبة المطبقة', value: `${rate}%` },
      { label: 'نوع العملية', value: isInclusive ? 'المبلغ المدخل شامل الضريبة' : 'المبلغ المدخل غير شامل الضريبة' },
      { label: 'الجهة الضريبية المختصة', value: country?.vat.authority || 'الهيئة الضريبية المعتمدة' },
    ],
    calculationSteps: [
      isInclusive
        ? `المبلغ الصافي = المبلغ الإجمالي (${fmt(grossAmount)}) ÷ (1 + ${rate}/100) = ${fmt(netAmount)} ${currencySymbol}`
        : `مبلغ الضريبة = المبلغ الأساسي (${fmt(netAmount)}) × (${rate} ÷ 100) = ${fmt(vatAmount)} ${currencySymbol}`,
      `المبلغ الإجمالي النهائي = ${fmt(grossAmount)} ${currencySymbol}`,
    ],
    warnings: warnings.length > 0 ? warnings : undefined,
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
