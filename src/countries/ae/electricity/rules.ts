import { CountryRegulatedRule } from '@/types/rule';

export interface UaeElectricityParams {
  currency: string;
  vatRate: number;
  slabs: { min: number; max: number; rate: number }[];
  fuelSurchargePerKwh: number;
}

export const AE_ELECTRICITY_RULES: CountryRegulatedRule<UaeElectricityParams>[] = [
  // Dubai (DEWA) Slab Tariff
  {
    ruleId: 'ae-electricity-dewa-2024',
    calculatorId: 'electricity-bill',
    countryCode: 'AE',
    jurisdiction: 'DEWA',
    provider: 'DEWA',
    customerCategory: 'residential',
    effectiveFrom: '2024-01-01',
    effectiveTo: undefined,
    sourceIds: ['ae-dewa-tariff-2024', 'ae-fta-vat-5'],
    parameters: {
      currency: 'AED',
      vatRate: 5.0,
      slabs: [
        { min: 1, max: 2000, rate: 0.23 },
        { min: 2001, max: 4000, rate: 0.28 },
        { min: 4001, max: 6000, rate: 0.32 },
        { min: 6001, max: Infinity, rate: 0.38 },
      ],
      fuelSurchargePerKwh: 0.05, // Standard fuel surcharge (approx 5 fils per kWh)
    },
    formulaVersion: '2024.1',
    verificationStatus: 'APPROVED',
    lastReviewed: '2026-10-25',
    approvedBy: 'regulatory-audit-team',
    limitations: [
      'تطبق تعرفة هيئة كهرباء ومياه دبي (ديوا) حصرياً داخل إمارة دبي.',
      'تخضع الفاتورة لرسوم بلدية دبي المنفصلة (5% من القيمة الإيجارية السنوية للشقق المستأجرة).',
    ],
  },
  // Abu Dhabi (ADDC) Expatriate Residential Tariff
  {
    ruleId: 'ae-electricity-addc-expat-2024',
    calculatorId: 'electricity-bill',
    countryCode: 'AE',
    jurisdiction: 'ADDC',
    provider: 'ADDC',
    customerCategory: 'residential_expatriate',
    effectiveFrom: '2024-01-01',
    effectiveTo: undefined,
    sourceIds: ['ae-addc-tariff-2024', 'ae-fta-vat-5'],
    parameters: {
      currency: 'AED',
      vatRate: 5.0,
      slabs: [
        { min: 1, max: 600, rate: 0.268 }, // Up to 20 kWh/day (600 kWh/month) Green band
        { min: 601, max: Infinity, rate: 0.305 }, // Above 20 kWh/day Red band
      ],
      fuelSurchargePerKwh: 0.0,
    },
    formulaVersion: '2024.1',
    verificationStatus: 'APPROVED',
    lastReviewed: '2026-10-25',
    approvedBy: 'regulatory-audit-team',
    limitations: [
      'تطبق هذه التعرفة على فئة المقيمين السكنيين المشتركين مع شركة أبوظبي للتوزيع (ADDC).',
    ],
  },
];
