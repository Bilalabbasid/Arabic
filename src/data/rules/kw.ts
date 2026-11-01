import { CountryLegalRules } from './types';

export const KW_RULES: CountryLegalRules = {
  countryCode: 'KW',
  countryNameAr: 'دولة الكويت',
  currency: 'KWD',
  currencySymbolAr: 'د.ك',
  hasVat: false,
  vatOfficialStatusText: 'لا تطبق دولة الكويت ضريبة القيمة المضافة حتى الآن؛ وقد تم استبعاد فرضها رسمياً ضمن خطة الإصلاح المالي وبرنامج عمل الحكومة 2026-2030.',
  vatStandardRate: undefined,
  fuelPrices: {
    value: {
      octane91: 0.085,
      octane95: 0.105,
      diesel: 0.115,
      pricingModel: 'أسعار حكومية مدعومة تصدر عن لجنة مراجعة أسعار البنزين',
    },
    unit: 'دينار/لتر',
    law: 'التسعيرة الرسمية المدعومة لشركة البترول الوطنية الكويتية',
    authority: 'شركة البترول الوطنية الكويتية (KNPC) / وزارة النفط',
    sourceUrl: 'https://www.knpc.com',
    validFrom: '2020-01-01',
    verified: true,
    checkedAt: '2026-10-01',
  },
};
