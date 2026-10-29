import { CountryRegulatedRule } from '@/types/rule';

export interface EgyptElectricityParams {
  currency: string;
  slabs: { min: number; max: number; rate: number; serviceFee: number }[];
  nonsubsidizedRateOver1000: number;
}

export const EG_ELECTRICITY_RULES: CountryRegulatedRule<EgyptElectricityParams>[] = [
  {
    ruleId: 'eg-electricity-egyptera-2024',
    calculatorId: 'electricity-bill',
    countryCode: 'EG',
    jurisdiction: 'EgyptERA',
    provider: 'EEHC',
    customerCategory: 'residential',
    effectiveFrom: '2024-08-01',
    effectiveTo: undefined,
    sourceIds: ['eg-egyptera-tariff-2024'],
    parameters: {
      currency: 'EGP',
      slabs: [
        { min: 0, max: 50, rate: 0.68, serviceFee: 1.0 },
        { min: 51, max: 100, rate: 0.78, serviceFee: 2.0 },
        { min: 101, max: 200, rate: 0.95, serviceFee: 6.0 },
        { min: 201, max: 350, rate: 1.55, serviceFee: 11.0 },
        { min: 351, max: 650, rate: 1.95, serviceFee: 15.0 },
        { min: 651, max: 1000, rate: 2.10, serviceFee: 25.0 },
        { min: 1001, max: Infinity, rate: 2.23, serviceFee: 40.0 },
      ],
      nonsubsidizedRateOver1000: 2.23,
    },
    formulaVersion: '2024.1',
    verificationStatus: 'APPROVED',
    lastReviewed: '2026-10-25',
    approvedBy: 'regulatory-audit-team',
    limitations: [
      'تطبق تعرفة جهاز تنظيم مرفق الكهرباء على المشتركين بالعدادات الميكانيكية ومسبوقة الدفع (الكارت) في مصر.',
      'إذا تجاوز الاستهلاك 1000 ك.و.س يُحسب كامل الاستهلاك بسعر الشريحة السابعة (2.23 ج.م) دون أي دعم تبادلي.',
    ],
  },
];

