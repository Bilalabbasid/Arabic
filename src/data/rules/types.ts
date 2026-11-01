export interface LegalRuleValue<T = number | string | Record<string, any>> {
  value: T;
  unit?: string;
  law: string;
  authority: string;
  sourceUrl: string;
  validFrom: string;
  verified: boolean;
  checkedAt: string;
  notes?: string;
}

export interface CountryLegalRules {
  countryCode: string;
  countryNameAr: string;
  currency: string;
  currencySymbolAr: string;
  hasVat: boolean;
  vatStandardRate?: LegalRuleValue<number>;
  vatExemptions?: string[];
  vatOfficialStatusText?: string;
  endOfService?: LegalRuleValue<{
    articles: string;
    summary: string;
  }>;
  electricityTariff?: LegalRuleValue<{
    residentialTiers: Array<{ limitKwh: number; rate: number }>;
    meterFeeText?: string;
  }>;
  fuelPrices?: LegalRuleValue<{
    octane91: number;
    octane95: number;
    diesel: number;
    pricingModel: string;
  }>;
}
