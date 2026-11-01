import { CountryLegalRules } from './types';

export const JO_RULES: CountryLegalRules = {
  countryCode: 'JO',
  countryNameAr: 'المملكة الأردنية الهاشمية',
  currency: 'JOD',
  currencySymbolAr: 'د.أ',
  hasVat: true,
  vatStandardRate: {
    value: 16,
    unit: '%',
    law: 'قانون الضريبة العامة على المبيعات رقم (6) لسنة 1994 وتعديلاته',
    authority: 'دائرة ضريبة الدخل والمبيعات الأردنية (ISTD)',
    sourceUrl: 'https://www.istd.gov.jo',
    validFrom: '2010-01-01',
    verified: true,
    checkedAt: '2026-11-01',
    notes: 'تطبق النسبة العامة 16% كضريبة مبيعات عامة موازية لضريبة القيمة المضافة في الأردن.',
  },
  vatExemptions: [
    'السلع الزراعية الأساسية غير المصنعة والخبز والأعلاف',
    'الخدمات الطبية والتعليمية الرسمية',
    'النقل العام الجماعي داخل المملكة',
  ],
};
