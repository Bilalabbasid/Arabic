import { CountryRegulatedRule } from '@/types/rule';

export interface UaeVatParams {
  rate: number;
  currency: string;
  mandatoryRegistrationThresholdAED: number;
}

export const AE_TAX_RULES: CountryRegulatedRule<UaeVatParams>[] = [
  {
    ruleId: 'ae-tax-vat-5-current',
    calculatorId: 'vat-calculator',
    countryCode: 'AE',
    jurisdiction: 'FTA',
    effectiveFrom: '2018-01-01',
    effectiveTo: undefined,
    sourceIds: ['ae-fta-vat-5'],
    parameters: {
      rate: 5.0,
      currency: 'AED',
      mandatoryRegistrationThresholdAED: 375000,
    },
    formulaVersion: '2018.1',
    verificationStatus: 'APPROVED',
    lastReviewed: '2026-10-25',
    approvedBy: 'regulatory-audit-team',
    limitations: [
      'تطبق النسبة الأساسية الموحدة 5% وفق المرسوم بقانون اتحادي رقم 8 لسنة 2017.',
    ],
  },
];

