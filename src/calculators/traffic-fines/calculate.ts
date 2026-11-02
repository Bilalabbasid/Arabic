import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface TrafficFinesInputs {
  violationIndex?: number;
  discountPercent?: number;
  pointsAccumulated?: number;
}

export function calculateTrafficFines(inputs: TrafficFinesInputs, country?: CountryData): CalculationResult {
  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;

  const fines = country?.vehicle.value?.trafficFines || [
    { categoryAr: 'السرعة الزائدة', violationAr: 'تجاوز السرعة المقررة من 10 إلى 20 كم/س', minFine: 150, maxFine: 300 },
    { categoryAr: 'السرعة الزائدة', violationAr: 'تجاوز السرعة المقررة من 20 إلى 30 كم/س', minFine: 300, maxFine: 500 },
    { categoryAr: 'الإشارات المرورية', violationAr: 'تجاوز إشارة الضوء الأحمر', minFine: 3000, maxFine: 6000 },
    { categoryAr: 'السلامة العامة', violationAr: 'عدم ربط حزام الأمان', minFine: 150, maxFine: 300 },
    { categoryAr: 'السلامة العامة', violationAr: 'استخدام الهاتف المحمول أثناء القيادة باليد', minFine: 500, maxFine: 900 },
  ];

  const index = Math.min(Math.max(0, Number(inputs.violationIndex) || 0), fines.length - 1);
  const violation = fines[index] || fines[0];

  const discountRate = Number(inputs.discountPercent) || 0;
  const minFine = violation.minFine;
  const maxFine = violation.maxFine || minFine;
  const discountedMinFine = minFine * (1 - discountRate / 100);
  const discountedMaxFine = maxFine * (1 - discountRate / 100);

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  const rows = fines.map((f, i) => ({
    period: f.violationAr,
    values: {
      category: f.categoryAr,
      fine: f.maxFine && f.maxFine !== f.minFine ? `${fmt(f.minFine)} - ${fmt(f.maxFine)} ${currencySymbol}` : `${fmt(f.minFine)} ${currencySymbol}`,
      points: f.blackPoints ? `${f.blackPoints} نقاط` : '-',
    },
  }));

  return {
    primary: {
      label: 'قيمة المخالفة المرورية المقررة',
      value: discountedMinFine,
      formattedValue: minFine !== maxFine
        ? `من ${fmt(discountedMinFine)} إلى ${fmt(discountedMaxFine)} ${currencySymbol}`
        : `${fmt(discountedMinFine)} ${currencySymbol}`,
      unit: currencySymbol,
      badge: discountRate > 0 ? `خصم ${discountRate}%` : violation.categoryAr,
    },
    secondary: [
      {
        label: 'الحد الأدنى للغرامة',
        value: discountedMinFine,
        formattedValue: `${fmt(discountedMinFine)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
      {
        label: 'الحد الأعلى للغرامة',
        value: discountedMaxFine,
        formattedValue: `${fmt(discountedMaxFine)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
    ],
    details: [
      { label: 'وصف المخالفة', value: violation.violationAr },
      { label: 'التصنيف المروري', value: violation.categoryAr },
      { label: 'النقاط المرورية المسجلة', value: violation.blackPoints ? `${violation.blackPoints} نقاط سوداء` : 'لا توجد نقاط' },
      { label: 'المرجع واللائحة الرسمية', value: country?.vehicle.law || 'نظام المرور ولائحته التنفيذية' },
    ],
    breakdown: {
      columns: [
        { key: 'category', label: 'التصنيف' },
        { key: 'fine', label: 'الغرامة المقررة' },
        { key: 'points', label: 'النقاط' },
      ],
      rows,
    },
    calculationSteps: [
      `المخالفة: ${violation.violationAr}`,
      `الغرامة النظامية: من ${fmt(minFine)} إلى ${fmt(maxFine)} ${currencySymbol}`,
      discountRate > 0 ? `بعد تطبيق خصم السداد (${discountRate}%): من ${fmt(discountedMinFine)} إلى ${fmt(discountedMaxFine)} ${currencySymbol}` : 'السداد بالقيمة النظامية الكاملة',
    ],
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
