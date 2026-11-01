import { CountryLegalRules } from './types';

export const TN_RULES: CountryLegalRules = {
  countryCode: 'TN',
  countryNameAr: 'الجمهورية التونسية',
  currency: 'TND',
  currencySymbolAr: 'د.ت',
  hasVat: true,
  vatStandardRate: {
    value: 19,
    unit: '%',
    law: 'مجلة الأداء على القيمة المضافة (Code de la TVA - المادة 7)',
    authority: 'الإدارة العامة للأداءات بوزارة المالية التونسية',
    sourceUrl: 'http://www.finances.gov.tn',
    validFrom: '2018-01-01',
    verified: true,
    checkedAt: '2026-11-01',
    notes: 'النسبة العامة للأداء على القيمة المضافة في تونس 19%، وتوجد نسب مخفضة 7% و 13% وفق جداول المجلة.',
  },
  vatExemptions: [
    'المنتجات الغذائية الحيوية والأدوية المسعرة',
    'الخدمات الصحية الاستشفائية والتعليم الإلزامي',
    'النقل العمومي غير السياحي',
  ],
};
