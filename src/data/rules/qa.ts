import { CountryLegalRules } from './types';

export const QA_RULES: CountryLegalRules = {
  countryCode: 'QA',
  countryNameAr: 'دولة قطر',
  currency: 'QAR',
  currencySymbolAr: 'ر.ق',
  hasVat: false,
  vatOfficialStatusText: 'لا تفرض دولة قطر ضريبة القيمة المضافة حالياً؛ حيث ما زال مشروع القانون قيد الدراسة والتخطيط ولم يدخل حيز التطبيق الفعلي.',
  vatStandardRate: undefined,
  fuelPrices: {
    value: {
      octane91: 1.90,
      octane95: 2.10,
      diesel: 2.05,
      pricingModel: 'تسعيرة وقود معلنة شهرياً من قبل قطر للطاقة',
    },
    unit: 'ريال/لتر',
    law: 'التسعيرة الشهرية لأسعار الوقود الصادرة عن قطر للطاقة',
    authority: 'قطر للطاقة (QatarEnergy)',
    sourceUrl: 'https://www.qatarenergy.qa',
    validFrom: '2026-10-01',
    verified: true,
    checkedAt: '2026-10-01',
  },
};
