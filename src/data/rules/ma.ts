import { CountryLegalRules } from './types';

export const MA_RULES: CountryLegalRules = {
  countryCode: 'MA',
  countryNameAr: 'المملكة المغربية',
  currency: 'MAD',
  currencySymbolAr: 'د.م.',
  hasVat: true,
  vatStandardRate: {
    value: 20,
    unit: '%',
    law: 'المدونة العامة للضرائب بالمغرب (Code Général des Impôts - المادة 98)',
    authority: 'المديرية العامة للضرائب بالمغرب (DGI)',
    sourceUrl: 'https://portail.tax.gov.ma/wps/portal/DGI/reglementation-fiscale',
    validFrom: '2014-01-01',
    verified: true,
    checkedAt: '2026-11-01',
    notes: 'النسبة العادية للضريبة على القيمة المضافة في المغرب هي 20%، وتوجد نسب مخفضة لقطاعات محددة (7% و 10% و 14%).',
  },
  vatExemptions: [
    'المنتجات الفلاحية غير المصنعة والخبز والحليب',
    'الأنشطة التعليمية والطبية المرخصة',
    'العمليات الاستثمارية الخاضعة للإعفاء بموجب ميثاق الاستثمار',
  ],
};
