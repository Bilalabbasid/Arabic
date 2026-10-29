import { CountryRegulatedRule } from '@/types/rule';

export interface UaeEmploymentParams {
  currency: string;
  firstFiveYearsDaysPerYear: number; // 21 days
  subsequentYearsDaysPerYear: number; // 30 days
  maximumCapMonths: number; // 24 months basic salary
  resignationReductionApplies: boolean; // false under Decree Law 33/2021
  salaryBasis: 'basic_salary_only'; // excludes housing, transport, utility allowances
}

export const AE_EMPLOYMENT_RULES: CountryRegulatedRule<UaeEmploymentParams>[] = [
  // Current Law: Federal Decree-Law No. (33) of 2021
  {
    ruleId: 'ae-employment-mohre-33-2021',
    calculatorId: 'end-of-service-reward',
    countryCode: 'AE',
    jurisdiction: 'MoHRE',
    customerCategory: 'private_sector_employee',
    effectiveFrom: '2022-02-02',
    effectiveTo: undefined,
    sourceIds: ['ae-mohre-labor-law-33'],
    parameters: {
      currency: 'AED',
      firstFiveYearsDaysPerYear: 21,
      subsequentYearsDaysPerYear: 30,
      maximumCapMonths: 24,
      resignationReductionApplies: false, // In new law, resignation does not reduce gratuity if service >= 1 year
      salaryBasis: 'basic_salary_only',
    },
    formulaVersion: '2022.1',
    verificationStatus: 'APPROVED',
    lastReviewed: '2026-10-25',
    approvedBy: 'regulatory-audit-team',
    limitations: [
      'يشترط إكمال سنة واحدة على الأقل من الخدمة المستمرة لاستحقاق مكافأة نهاية الخدمة.',
      'يحسب الأجر على أساس الراتب الأساسي الأخير فقط، مستبعداً كافة البدلات والعلاوات بموجب المادة 51.',
      'الحد الأقصى لإجمالي المكافأة لا يتجاوز أجر سنتين أساسيتين.',
    ],
  },
  // Historical Law: Federal Law No. (8) of 1980 (Historical reference)
  {
    ruleId: 'ae-employment-mohre-8-1980',
    calculatorId: 'end-of-service-reward',
    countryCode: 'AE',
    jurisdiction: 'MoHRE',
    customerCategory: 'private_sector_employee',
    effectiveFrom: '1980-01-01',
    effectiveTo: '2022-02-01',
    sourceIds: ['ae-mohre-labor-law-33'],
    parameters: {
      currency: 'AED',
      firstFiveYearsDaysPerYear: 21,
      subsequentYearsDaysPerYear: 30,
      maximumCapMonths: 24,
      resignationReductionApplies: true, // Old law reduced gratuity in unlimited contracts
      salaryBasis: 'basic_salary_only',
    },
    formulaVersion: '1980.1',
    verificationStatus: 'APPROVED',
    lastReviewed: '2026-10-25',
    approvedBy: 'regulatory-audit-team',
    limitations: ['قانون العمل التاريخي القديم الملغى بالمرسوم بقانون 33 لسنة 2021.'],
  },
];

