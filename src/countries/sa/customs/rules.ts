import { CountryRegulatedRule } from '@/types/rule';

export interface SaudiCustomsParams {
  standardAdValoremDutyRate: number;
  currency: string;
  expressParcelExemptionThresholdSAR: number;
  vatRate: number;
}

export const SA_CUSTOMS_RULES: CountryRegulatedRule<SaudiCustomsParams>[] = [
  {
    ruleId: 'sa-customs-gcc-standard',
    calculatorId: 'customs-duty',
    countryCode: 'SA',
    jurisdiction: 'ZATCA',
    effectiveFrom: '2023-01-01',
    effectiveTo: undefined,
    sourceIds: ['sa-zatca-vat-15'],
    parameters: {
      standardAdValoremDutyRate: 5.0, // 5% standard GCC tariff
      currency: 'SAR',
      expressParcelExemptionThresholdSAR: 1000.0,
      vatRate: 15.0,
    },
    formulaVersion: '2023.1',
    verificationStatus: 'APPROVED',
    lastReviewed: '2026-10-25',
    approvedBy: 'regulatory-audit-team',
    limitations: [
      'تخضع بعض السلع المحمية وطنياً لرسوم جمركية تتراوح بين 10% إلى 20% وفق التعرفة الجمركية المتكاملة.',
    ],
  },
];

