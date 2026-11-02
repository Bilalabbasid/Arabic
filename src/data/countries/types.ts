export type RuleStatus = 'verified' | 'not_applicable' | 'no_official_source' | 'unverified';

export type CountryCode =
  | 'sa' | 'ae' | 'kw' | 'qa' | 'bh' | 'om' // GCC
  | 'eg' | 'jo' | 'lb' | 'sy' | 'iq' | 'ye' | 'ps' | 'sd' // Levant, Iraq, Nile & Yemen
  | 'ma' | 'dz' | 'tn' | 'ly' | 'mr' // Maghreb
  | 'so' | 'dj' | 'km'; // Horn of Africa & Comoros

export interface RuleValue<T> {
  status: RuleStatus;
  value?: T;               // Only when verified or unverified
  note?: string;           // Arabic explanation shown on page
  law?: string;            // Law or decree name + number
  authority?: string;      // Arabic name of the regulatory authority
  sourceUrl?: string;      // Deep link to government or official source
  validFrom?: string;      // Effective date of the regulation
  checkedAt?: string;      // Real date when verified
  staleAfterDays?: number; // E.g. 35 for monthly fuel, 400 for annual taxes
}

export interface LocalTerminology {
  vehicleRegistration: string; // e.g. "استمارة" (SA), "ملكية" (AE), "رخصة تسيير / carte grise" (DZ/MA/TN), "رخصة تسيير" (EG)
  diesel: string;              // e.g. "ديزل" (Gulf), "سولار" (EG), "مازوت" (Levant), "غازوال" (Maghreb)
  periodicInspection: string;  // e.g. "الفحص الدوري" (SA), "فحص المركبة" (AE), "الفحص الفني" (EG/Maghreb)
  drivingLicence: string;      // e.g. "رخصة القيادة" / "رخصة السياقة"
}

export interface IntercityRoute {
  id: string;
  fromCityAr: string;
  toCityAr: string;
  distanceKm: number;
  source: string;
}

export interface TrafficFineItem {
  categoryAr: string;
  violationAr: string;
  minFine: number;
  maxFine?: number;
  blackPoints?: number;
}

export interface CountryData {
  countryCode: string; // Lowercase ISO code: sa, ae, kw, etc.
  basics: {
    nameAr: string;
    nameEn: string;
    locale: string;
    currency: {
      code: string;
      nameAr: string;
      symbolAr: string;
      minorUnits: number; // 2 or 3 (KWD, BHD, OMR, JOD, TND, LYD use 3)
    };
    weekendDays: number[]; // 5=Friday, 6=Saturday, 0=Sunday
    officialCalendar: 'gregorian' | 'hijri' | 'dual';
    localTerms: LocalTerminology;
  };
  vat: RuleValue<{
    standardRate: number;
    reducedRates?: number[];
    zeroRatedItems?: string[];
    exemptItems?: string[];
  }>;
  incomeTax: RuleValue<{
    hasPersonalIncomeTax: boolean;
    brackets?: Array<{ thresholdUpTo?: number; rate: number }>;
    standardDeduction?: number;
  }>;
  socialInsurance: RuleValue<{
    nationalEmployeeRate: number;
    nationalEmployerRate: number;
    expatEmployeeRate?: number;
    expatEmployerRate?: number;
    maxMonthlyWageCap?: number;
    agencyNameAr: string;
    agencyAcronym: string;
  }>;
  endOfService: RuleValue<{
    standardFormula: string;
    firstTierYears: number;
    firstTierFraction: number; // e.g. 0.5 (half month)
    secondTierFraction: number; // e.g. 1.0 (full month)
    resignationScale: Array<{ minYears: number; maxYears?: number; fractionOfAward: number }>;
    wageBasis: 'basic_only' | 'gross_wage_with_fixed_allowances';
    articles: string;
  }>;
  consumerFinance: RuleValue<{
    dbrCapPercent: number; // Debt burden ratio limit (e.g. 33.33, 45, 50)
    dbrCapPensionerPercent?: number;
    maxAutoFinanceTenorYears: number;
    quoteConvention: 'flat' | 'reducing';
    islamicFinanceTerm: string;
  }>;
  fuel: RuleValue<{
    pricingModel: 'fixed_official' | 'monthly_adjusted' | 'subsidised_cap' | 'liberalised';
    grades: Record<string, { nameAr: string; pricePerLiter: number; unitAr: string }>;
    priceHistory?: Array<{ date: string; prices: Record<string, number> }>;
    updateCadenceDays?: number;
  }>;
  electricity: RuleValue<{
    residentialTiers: Array<{ minKwh: number; maxKwh?: number; ratePerKwh: number }>;
    meterServiceFeeMonthly?: number;
    vatApplies: boolean;
  }>;
  vehicle: RuleValue<{
    registrationFeeAnnual: number;
    periodicInspectionFee: number;
    drivingLicenceRenewal10Yr: number;
    customsDutyPercent: number;
    customsVatPercent: number;
    maxImportAgeYears?: number;
    importAgeRules?: string;
    trafficFines?: TrafficFineItem[];
  }>;
  zakat: RuleValue<{
    authorityName?: string;
    isMandatoryForCompanies: boolean;
    individualNoteAr: string;
  }>;
  routes: IntercityRoute[];
}
