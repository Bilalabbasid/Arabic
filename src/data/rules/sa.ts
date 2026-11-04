import { CountryLegalRules } from './types';

export const SA_RULES: CountryLegalRules = {
  countryCode: 'SA',
  countryNameAr: 'المملكة العربية السعودية',
  currency: 'SAR',
  currencySymbolAr: 'ر.س',
  hasVat: true,
  vatStandardRate: {
    value: 15,
    unit: '%',
    law: 'نظام ضريبة القيمة المضافة الصادر بالمرسوم الملكي م/113 وتعديلاته بالأمر الملكي أ/638',
    authority: 'هيئة الزكاة والضريبة والجمارك (ZATCA)',
    sourceUrl: 'https://zatca.gov.sa/ar/RulesRegulations/Taxes/Pages/vat_regulations.aspx',
    validFrom: '2020-07-01',
    verified: true,
    checkedAt: '2026-11-01',
    notes: 'النسبة الأساسية لضريبة القيمة المضافة 15% وتطبق على جميع السلع والخدمات باستثناء المعفاة أو الخاضعة لنسبة الصفر.',
  },
  vatExemptions: [
    'الخدمات المالية المحددة في اللائحة التنفيذية (الفائدة، هوامش المرابحة، التأمين على الحياة)',
    'تأجير العقارات السكنية الخاصة بالسكن',
    'السلع والخدمات الموردة إلى جهات حكومية معفاة أو خاضعة لنسبة الصفر (مثل الصادرات ونقل الركاب الدولي)',
  ],
  endOfService: {
    value: {
      articles: 'المادتان (84) و (85) من نظام العمل السعودي الصادر بالمرسوم الملكي م/51',
      summary: 'أجر نصف شهر عن كل سنة من السنوات الخمس الأولى، وأجر شهر كامل عن كل سنة تالية، مع تطبيق مقياس الاستقالة التدريجي.',
    },
    law: 'نظام العمل السعودي (المرسوم الملكي رقم م/51 وتعديلاته)',
    authority: 'وزارة الموارد البشرية والتنمية الاجتماعية',
    sourceUrl: 'https://hrsd.gov.sa/knowledge-centre/decisions-and-regulations',
    validFrom: '2006-04-23',
    verified: true,
    checkedAt: '2026-11-01',
  },
  electricityTariff: {
    value: {
      residentialTiers: [
        { limitKwh: 6000, rate: 0.18 },
        { limitKwh: Infinity, rate: 0.30 },
      ],
      meterFeeText: 'مقابل خدمة العداد الشهري محدد حسب سعة القاطع (من 10 إلى 30 ريال لسعات 50-100 أمبير).',
    },
    unit: 'ريال/ك.و.س',
    law: 'تعرفة الاستهلاك الكهربائي المعتمدة بقرار مجلس الوزراء رقم 170',
    authority: 'هيئة تنظيم المياه والكهرباء (WERA)',
    sourceUrl: 'https://wera.gov.sa',
    validFrom: '2018-01-01',
    verified: true,
    checkedAt: '2026-11-01',
  },
  fuelPrices: {
    value: {
      octane91: 2.18,
      octane95: 2.33,
      diesel: 1.79,
      pricingModel: 'سقف رسمي معتمد بأمر ملكي كريم لحماية المستهلك',
    },
    unit: 'ريال/لتر',
    law: 'التسعيرة الرسمية للوقود المعتمدة من وزارة الطاقة وأرامكو السعودية',
    authority: 'وزارة الطاقة / شركة أرامكو السعودية',
    sourceUrl: 'https://www.aramco.com/ar/creating-value/products/retail-fuels',
    validFrom: '2021-07-10',
    verified: true,
    checkedAt: '2026-10-01',
  },
};
