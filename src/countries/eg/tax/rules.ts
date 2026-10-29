import { CountryRegulatedRule } from '@/types/rule';

export interface EgyptVatParams {
  rate: number;
  currency: string;
  registrationThresholdEGP: number;
}

export const EG_TAX_RULES: CountryRegulatedRule<EgyptVatParams>[] = [
  {
    ruleId: 'eg-tax-vat-14-current',
    calculatorId: 'vat-calculator',
    countryCode: 'EG',
    jurisdiction: 'ETA',
    effectiveFrom: '2017-07-01',
    effectiveTo: undefined,
    sourceIds: ['eg-eta-vat-14'],
    parameters: {
      rate: 14.0,
      currency: 'EGP',
      registrationThresholdEGP: 500000,
    },
    formulaVersion: '2017.1',
    verificationStatus: 'APPROVED',
    lastReviewed: '2026-10-25',
    approvedBy: 'regulatory-audit-team',
    limitations: [
      'السعر العام لضريبة القيمة المضافة بموجب القانون رقم 67 لسنة 2016 هو 14%.',
    ],
  },
];

