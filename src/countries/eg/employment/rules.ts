import { CountryRegulatedRule } from '@/types/rule';

export interface EgyptEmploymentParams {
  currency: string;
  firstFiveYearsDaysPerYear: number;
  subsequentYearsDaysPerYear: number;
  eligibleRetirementAge: number;
  salaryBasis: 'last_wage';
}

export const EG_EMPLOYMENT_RULES: CountryRegulatedRule<EgyptEmploymentParams>[] = [
  {
    ruleId: 'eg-employment-law-12-2003',
    calculatorId: 'end-of-service-reward',
    countryCode: 'EG',
    jurisdiction: 'MinistryOfLabor',
    customerCategory: 'private_sector_employee',
    effectiveFrom: '2003-07-01',
    effectiveTo: undefined,
    sourceIds: ['eg-labor-law-12'],
    parameters: {
      currency: 'EGP',
      firstFiveYearsDaysPerYear: 15,
      subsequentYearsDaysPerYear: 30,
      eligibleRetirementAge: 60,
      salaryBasis: 'last_wage',
    },
    formulaVersion: '2003.1',
    verificationStatus: 'APPROVED',
    lastReviewed: '2026-10-25',
    approvedBy: 'regulatory-audit-team',
    limitations: [
      'تنص المادة 126 من قانون العمل المصري على استحقاق المكافأة عن سنوات الخدمة بعد سن الستين إذا لم يكن للمؤمن عليه معاش وفق قانون التأمين الاجتماعي.',
    ],
  },
];
