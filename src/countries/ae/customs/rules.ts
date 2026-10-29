import { CountryRegulatedRule } from '@/types/rule';

export interface UaeCustomsParams {
  standardDutyRate: number;
  currency: string;
  vatRate: number;
  parcelExemptionThresholdAED: number;
}

export const AE_CUSTOMS_RULES: CountryRegulatedRule<UaeCustomsParams>[] = [
  {
    ruleId: 'ae-customs-standard-2023',
    calculatorId: 'customs-duty',
    countryCode: 'AE',
    jurisdiction: 'Customs',
    effectiveFrom: '2023-01-01',
    effectiveTo: undefined,
    sourceIds: ['ae-fta-vat-5'],
    parameters: {
      standardDutyRate: 5.0,
      currency: 'AED',
      vatRate: 5.0,
      parcelExemptionThresholdAED: 300.0,
    },
    formulaVersion: '2023.1',
    verificationStatus: 'APPROVED',
    lastReviewed: '2026-10-25',
    approvedBy: 'regulatory-audit-team',
    limitations: ['التعرفة الجمركية الاتحادية الموحدة في موانئ ومطارات دولة الإمارات.'],
  },
];

