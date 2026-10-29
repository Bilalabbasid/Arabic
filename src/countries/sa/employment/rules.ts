import { CountryRegulatedRule } from '@/types/rule';

export interface SaudiEmploymentParams {
  currency: string;
  firstFiveYearsDaysPerYear: number;
  subsequentYearsDaysPerYear: number;
  resignationScale: {
    underTwoYears: number; // 0
    twoToFiveYears: number; // 1/3 (0.3333)
    fiveToTenYears: number; // 2/3 (0.6667)
    tenYearsOrMore: number; // 1.0
  };
  salaryBasis: 'last_gross_wage'; // includes basic + fixed allowances (housing, transport)
}

export const SA_EMPLOYMENT_RULES: CountryRegulatedRule<SaudiEmploymentParams>[] = [
  {
    ruleId: 'sa-employment-hrsd-m51',
    calculatorId: 'end-of-service-reward',
    countryCode: 'SA',
    jurisdiction: 'HRSD',
    customerCategory: 'private_sector_employee',
    effectiveFrom: '2006-04-23',
    effectiveTo: undefined,
    sourceIds: ['sa-hrsd-labor-m51'],
    parameters: {
      currency: 'SAR',
      firstFiveYearsDaysPerYear: 15, // half month
      subsequentYearsDaysPerYear: 30, // full month
      resignationScale: {
        underTwoYears: 0.0,
        twoToFiveYears: 1 / 3,
        fiveToTenYears: 2 / 3,
        tenYearsOrMore: 1.0,
      },
      salaryBasis: 'last_gross_wage',
    },
    formulaVersion: '2006.1',
    verificationStatus: 'APPROVED',
    lastReviewed: '2026-10-25',
    approvedBy: 'regulatory-audit-team',
    limitations: [
      'الأجر المعتمد هو الأجر الفعلي الأخير الشامل للبدلات الثابتة المتفق عليها في العقد كبدل السكن والنقل.',
      'تستحق العاملة المكافأة كاملة في حال إنهاء العقد خلال 6 أشهر من الزواج أو 3 أشهر من الوضع بموجب المادة 87.',
    ],
  },
];

