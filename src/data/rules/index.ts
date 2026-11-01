export * from './types';
import { SA_RULES } from './sa';
import { AE_RULES } from './ae';
import { EG_RULES } from './eg';
import { BH_RULES } from './bh';
import { OM_RULES } from './om';
import { KW_RULES } from './kw';
import { QA_RULES } from './qa';
import { JO_RULES } from './jo';
import { MA_RULES } from './ma';
import { DZ_RULES } from './dz';
import { TN_RULES } from './tn';
import { LB_RULES } from './lb';
import { CountryLegalRules } from './types';

export const ALL_COUNTRY_LEGAL_RULES: Record<string, CountryLegalRules> = {
  SA: SA_RULES,
  AE: AE_RULES,
  EG: EG_RULES,
  BH: BH_RULES,
  OM: OM_RULES,
  KW: KW_RULES,
  QA: QA_RULES,
  JO: JO_RULES,
  MA: MA_RULES,
  DZ: DZ_RULES,
  TN: TN_RULES,
  LB: LB_RULES,
};

export const ZAKAT_RULES = {
  nisabGoldGrams: 85,
  nisabSilverGrams: 595,
  lunarRatePercent: 2.5,
  solarRatePercent: 2.577,
  goldPriceSourceNotice: 'يتطلب إدخال سعر جرام الذهب عيار 24 الصافي الحالي وفق السوق المحلي لتحديد النصاب الدقيق.',
  verified: true,
  checkedAt: '2026-11-01',
};

export function getCountryLegalRules(countryCode: string): CountryLegalRules | undefined {
  return ALL_COUNTRY_LEGAL_RULES[countryCode.toUpperCase()];
}
