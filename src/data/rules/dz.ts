import { CountryLegalRules } from './types';

export const DZ_RULES: CountryLegalRules = {
  countryCode: 'DZ',
  countryNameAr: 'الجمهورية الجزائرية الديمقراطية الشعبية',
  currency: 'DZD',
  currencySymbolAr: 'د.ج',
  hasVat: true,
  vatStandardRate: {
    value: 19,
    unit: '%',
    law: 'قانون الضرائب على رقم الأعمال (المادة 21) وقوانين المالية المتعاقبة',
    authority: 'المديرية العامة للضرائب بالجزائر (DGI)',
    sourceUrl: 'https://www.mfdgi.gov.dz',
    validFrom: '2017-01-01',
    verified: true,
    checkedAt: '2026-11-01',
    notes: 'المعدل العادي للرسم على القيمة المضافة في الجزائر هو 19%، والمعدل المخفض 9% للسلع ذات الأهمية الاقتصادية.',
  },
  vatExemptions: [
    'المواد الغذائية واسعة الاستهلاك (الحبوب، الدقيق، الحليب المقنن)',
    'الأدوية والمستلزمات الطبية الاستراتيجية',
    'الكتب والمطبوعات الثقافية والصحف',
  ],
};
