import { CountryRegulatedRule } from '@/types/rule';

export interface EgyptElectricityParams {
  currency: string;
  /**
   * Seven residential bands. Egypt bills by consumption group, not as a pure
   * progressive ladder:
   *  - 1-100 kWh: band 1 (0-50) and band 2 (51-100) apply progressively.
   *  - 101-650 kWh: the 1-100 rates are lost; 0-200 at band 3, then bands 4 and 5.
   *  - 651-1000 kWh: all consumption at band 6.
   *  - above 1000 kWh: all consumption at band 7.
   * serviceFee is the monthly customer service charge for the band the total falls in.
   */
  slabs: { min: number; max: number; rate: number; serviceFee: number }[];
  nonsubsidizedRateOver1000: number;
}

export const EG_ELECTRICITY_RULES: CountryRegulatedRule<EgyptElectricityParams>[] = [
  {
    ruleId: 'eg-electricity-egyptera-2026-08',
    calculatorId: 'electricity-bill',
    countryCode: 'EG',
    jurisdiction: 'EgyptERA',
    provider: 'EEHC',
    customerCategory: 'residential',
    effectiveFrom: '2026-08-01',
    effectiveTo: undefined,
    sourceIds: ['eg-egyptera-tariff-2024'],
    parameters: {
      currency: 'EGP',
      slabs: [
        { min: 0, max: 50, rate: 0.68, serviceFee: 3.0 },
        { min: 51, max: 100, rate: 0.98, serviceFee: 6.0 },
        { min: 101, max: 200, rate: 1.15, serviceFee: 12.0 },
        { min: 201, max: 350, rate: 1.73, serviceFee: 20.0 },
        { min: 351, max: 650, rate: 2.14, serviceFee: 50.0 },
        { min: 651, max: 1000, rate: 2.41, serviceFee: 60.0 },
        { min: 1001, max: Infinity, rate: 2.74, serviceFee: 100.0 },
      ],
      nonsubsidizedRateOver1000: 2.74,
    },
    formulaVersion: '2026.08',
    verificationStatus: 'APPROVED',
    lastReviewed: '2026-11-07',
    approvedBy: 'regulatory-audit-team',
    limitations: [
      'تطبق تعرفة جهاز تنظيم مرفق الكهرباء الصادرة في 1 أغسطس 2026 (على استهلاك شهر يوليو 2026) على المشتركين المنزليين بالعدادات الميكانيكية ومسبوقة الدفع (الكارت) في مصر.',
      'إذا تجاوز الاستهلاك 100 ك.و.س يُحسب أول 200 ك.و.س بسعر 115 قرشاً، وإذا تجاوز 650 ك.و.س يُحسب كامل الاستهلاك بسعر 241 قرشاً، وفوق 1000 ك.و.س بسعر 274 قرشاً.',
      'قيم مقابل خدمة العملاء الجديدة (3 إلى 100 جنيه) منقولة عن الصحافة المصرية لعدم توفر جدول رسمي منشور؛ وقد تختلف الفاتورة الفعلية بالدمغات والرسوم المحلية.',
    ],
  },
];
