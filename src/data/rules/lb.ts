import { CountryLegalRules } from './types';

export const LB_RULES: CountryLegalRules = {
  countryCode: 'LB',
  countryNameAr: 'الجمهورية اللبنانية',
  currency: 'LBP',
  currencySymbolAr: 'ل.ل',
  hasVat: true,
  vatStandardRate: {
    value: 11,
    unit: '%',
    law: 'قانون الضريبة على القيمة المضافة رقم 379/2001 وتعديلاته بموجب القانون رقم 64/2017',
    authority: 'مديرية الضريبة على القيمة المضافة - وزارة المالية اللبنانية',
    sourceUrl: 'http://www.finance.gov.lb',
    validFrom: '2018-01-01',
    verified: true,
    checkedAt: '2026-11-01',
    notes: 'معدل الضريبة على القيمة المضافة في لبنان 11% بموجب التعديل القانوني لعام 2017.',
  },
  vatExemptions: [
    'المواد الغذائية الحيوية الخاضعة للتسعير الرسمي والخبز والحليب',
    'الخدمات الطبية والاستشفائية والأدوية',
    'الأنشطة التعليمية والتربوية المعتمدة',
  ],
};
