import { CountryLegalRules } from './types';

export const BH_RULES: CountryLegalRules = {
  countryCode: 'BH',
  countryNameAr: 'مملكة البحرين',
  currency: 'BHD',
  currencySymbolAr: 'د.ب',
  hasVat: true,
  vatStandardRate: {
    value: 10,
    unit: '%',
    law: 'المرسوم بقانون رقم (33) لسنة 2021 بتعديل بعض أحكام قانون ضريبة القيمة المضافة',
    authority: 'الجهاز الوطني للإيرادات (NBR)',
    sourceUrl: 'https://www.nbr.gov.bh/laws_and_regulations',
    validFrom: '2022-01-01',
    verified: true,
    checkedAt: '2026-11-01',
    notes: 'تمت زيادة النسبة القياسية لضريبة القيمة المضافة من 5% إلى 10% اعتباراً من 1 يناير 2022.',
  },
  vatExemptions: [
    'الخدمات المالية المحددة وإقراض الأموال',
    'توريد وتأجير العقارات السكنية والتجارية',
    'السلع الغذائية الأساسية الـ 94 الخاضعة لنسبة الصفر بالمائة',
    'الرعاية الصحية والتعليم الأساسي',
  ],
  fuelPrices: {
    value: {
      octane91: 0.140,
      octane95: 0.200,
      diesel: 0.160,
      pricingModel: 'أسعار مدعومة ومحددة بقرارات حكومية رسمية',
    },
    unit: 'دينار/لتر',
    law: 'التسعيرة الرسمية للوقود المعتمدة من الهيئة الوطنية للنفط والغاز',
    authority: 'الهيئة الوطنية للنفط والغاز / بابكو إنرجيز',
    sourceUrl: 'https://www.bapcoenergies.com',
    validFrom: '2020-01-01',
    verified: true,
    checkedAt: '2026-10-01',
  },
};
