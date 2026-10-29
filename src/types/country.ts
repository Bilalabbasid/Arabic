export interface CountryDefinition {
  countryCode: string; // ISO 2-letter uppercase: 'SA', 'AE', 'EG', etc.
  nameAr: string;
  nameEn: string;
  locale: string; // e.g. 'ar-SA', 'ar-AE', 'ar-EG'
  currencyCode: string; // ISO 4217, e.g. 'SAR', 'AED', 'EGP'
  currencyNameAr: string; // e.g. 'ريال سعودي', 'درهم إماراتي', 'جنيه مصري'
  currencySymbolAr: string; // e.g. 'ر.س', 'د.إ', 'ج.م'
  flagEmoji: string;
  dialCode: string;
  supportedRegions: string[];
  timezones: string[];
  availableCalculatorIds: string[];
  verifiedRuleIds: string[];
}

export type SupportedCountryCode =
  | 'SA'
  | 'AE'
  | 'KW'
  | 'QA'
  | 'BH'
  | 'OM'
  | 'EG'
  | 'JO'
  | 'MA'
  | 'DZ'
  | 'TN'
  | 'IQ'
  | 'LB'
  | 'LY'
  | 'SD'
  | 'YE'
  | 'SY'
  | 'PS'
  | 'MR'
  | 'SO'
  | 'DJ'
  | 'KM';
