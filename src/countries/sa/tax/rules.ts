import { CountryRegulatedRule } from '@/types/rule';

export interface SaudiVatParams {
  rate: number;
  currency: string;
  exemptionThresholdAnnualSales: number;
  mandatoryRegistrationThreshold: number;
}

export const SA_TAX_RULES: CountryRegulatedRule<SaudiVatParams>[] = [
  // Current 15% VAT
  {
    ruleId: 'sa-tax-vat-15-current',
    calculatorId: 'vat-calculator',
    countryCode: 'SA',
    jurisdiction: 'ZATCA',
    effectiveFrom: '2020-07-01',
    effectiveTo: undefined,
    sourceIds: ['sa-zatca-vat-15'],
    parameters: {
      rate: 15,
      currency: 'SAR',
      exemptionThresholdAnnualSales: 187500,
      mandatoryRegistrationThreshold: 375000,
    },
    formulaVersion: '2020.1',
    verificationStatus: 'APPROVED',
    lastReviewed: '2026-10-25',
    approvedBy: 'regulatory-audit-team',
    limitations: [
      'تطبق النسبة الأساسية (15%) على كافة السلع والخدمات غير المعفاة وغير الخاضعة لنسبة الصفر.',
    ],
  },
  // Historical 5% VAT (2018-01-01 to 2020-06-30)
  {
    ruleId: 'sa-tax-vat-5-historical',
    calculatorId: 'vat-calculator',
    countryCode: 'SA',
    jurisdiction: 'ZATCA',
    effectiveFrom: '2018-01-01',
    effectiveTo: '2020-06-30',
    sourceIds: ['sa-zatca-vat-15'],
    parameters: {
      rate: 5,
      currency: 'SAR',
      exemptionThresholdAnnualSales: 187500,
      mandatoryRegistrationThreshold: 375000,
    },
    formulaVersion: '2018.1',
    verificationStatus: 'APPROVED',
    lastReviewed: '2026-10-25',
    approvedBy: 'regulatory-audit-team',
    limitations: ['فترة تاريخية سابقة كانت تطبق فيها ضريبة 5% بالمملكة.'],
  },
];
