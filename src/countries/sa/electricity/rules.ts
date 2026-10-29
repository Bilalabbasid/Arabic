import { CountryRegulatedRule } from '@/types/rule';

export interface SaudiElectricityParams {
  currency: string;
  vatRate: number;
  slabs: {
    residential: { min: number; max: number; rate: number }[];
    commercial: { min: number; max: number; rate: number }[];
  };
  meterFees: {
    breakerUpTo60A: number;
    breakerAbove60A: number;
  };
}

export const SA_ELECTRICITY_RULES: CountryRegulatedRule<SaudiElectricityParams>[] = [
  // Current Active Rule (Effective from 2024-01-01)
  {
    ruleId: 'sa-electricity-sera-2024',
    calculatorId: 'electricity-bill',
    countryCode: 'SA',
    jurisdiction: 'SERA',
    provider: 'SEC',
    customerCategory: 'residential',
    effectiveFrom: '2024-01-01',
    effectiveTo: undefined, // Currently in effect
    sourceIds: ['sa-sera-tariff-2024', 'sa-zatca-vat-15'],
    parameters: {
      currency: 'SAR',
      vatRate: 15,
      slabs: {
        residential: [
          { min: 1, max: 6000, rate: 0.18 },
          { min: 6001, max: Infinity, rate: 0.30 },
        ],
        commercial: [
          { min: 1, max: 6000, rate: 0.20 },
          { min: 6001, max: Infinity, rate: 0.30 },
        ],
      },
      meterFees: {
        breakerUpTo60A: 15.0,
        breakerAbove60A: 20.0,
      },
    },
    formulaVersion: '2024.1',
    verificationStatus: 'APPROVED',
    lastReviewed: '2026-10-25',
    approvedBy: 'regulatory-audit-team',
    limitations: [
      'التعرفة تطبق على المشتركين السكنيين والتجاريين الأفراد والشركات في المملكة العربية السعودية.',
      'الاستهلاك الزراعي والصناعي يخضع لتعرفة مستقلة معتمدة من هيئة سيرا.',
    ],
  },
  // Historical Rule (2018 to 2020: 5% VAT era)
  {
    ruleId: 'sa-electricity-sera-2018',
    calculatorId: 'electricity-bill',
    countryCode: 'SA',
    jurisdiction: 'SERA',
    provider: 'SEC',
    customerCategory: 'residential',
    effectiveFrom: '2018-01-01',
    effectiveTo: '2020-06-30',
    sourceIds: ['sa-sera-tariff-2024'],
    parameters: {
      currency: 'SAR',
      vatRate: 5,
      slabs: {
        residential: [
          { min: 1, max: 6000, rate: 0.18 },
          { min: 6001, max: Infinity, rate: 0.30 },
        ],
        commercial: [
          { min: 1, max: 6000, rate: 0.20 },
          { min: 6001, max: Infinity, rate: 0.30 },
        ],
      },
      meterFees: {
        breakerUpTo60A: 15.0,
        breakerAbove60A: 20.0,
      },
    },
    formulaVersion: '2018.1',
    verificationStatus: 'APPROVED',
    lastReviewed: '2026-10-25',
    approvedBy: 'regulatory-audit-team',
    limitations: ['فترة تاريخية سابقة كانت تطبق فيها ضريبة القيمة المضافة بنسبة 5% فقط.'],
  },
];

