import { CountryLegalRules } from './types';

export const OM_RULES: CountryLegalRules = {
  countryCode: 'OM',
  countryNameAr: 'سلطنة عُمان',
  currency: 'OMR',
  currencySymbolAr: 'ر.ع',
  hasVat: true,
  vatStandardRate: {
    value: 5,
    unit: '%',
    law: 'المرسوم السلطاني رقم 121/2020 بإصدار قانون ضريبة القيمة المضافة',
    authority: 'جهاز الضرائب بسلطنة عُمان',
    sourceUrl: 'https://tms.taxoman.gov.om/portal/ar/web/tax-portal/vat-tax',
    validFrom: '2021-04-16',
    verified: true,
    checkedAt: '2026-11-01',
    notes: 'النسبة الأساسية لضريبة القيمة المضافة 5% في سلطنة عُمان وبدأ تطبيقها رسمياً في 16 أبريل 2021.',
  },
  vatExemptions: [
    'الخدمات المالية المصرفية والتأمينية المحددة في اللائحة',
    'الرعاية الصحية والتعليم الأساسي والعالي',
    'السلع الغذائية الأساسية الخاضعة لنسبة الصفر (نحو 500 سلعة أساسية)',
    'إيجار العقارات للأغراض السكنية والأراضي الفضاء',
  ],
  fuelPrices: {
    value: {
      octane91: 0.229,
      octane95: 0.239,
      diesel: 0.258,
      pricingModel: 'سقف سعري رسمي للبنزين 91 بأمر سامٍ كريم',
    },
    unit: 'ريال/لتر',
    law: 'التسعيرة المعتمدة من وزارة الطاقة والمعادن بتوجيهات كريمة لتثبيت بنزين 91',
    authority: 'وزارة الطاقة والمعادن بسلطنة عُمان',
    sourceUrl: 'https://www.mem.gov.om',
    validFrom: '2021-11-01',
    verified: true,
    checkedAt: '2026-10-01',
  },
};
