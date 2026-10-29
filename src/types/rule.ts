export type VerificationStatus =
  | 'PLANNED'
  | 'IMPLEMENTED'
  | 'SOURCE_REQUIRED'
  | 'SOURCE_REVIEWED'
  | 'FORMULA_TESTED'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'REVIEW_REQUIRED'
  | 'DISABLED';

export interface CountryRegulatedRule<TParams = Record<string, any>> {
  ruleId: string;
  calculatorId: string;
  countryCode: string; // ISO 2-letter uppercase e.g. 'SA', 'AE', 'EG'
  jurisdiction: string; // e.g. 'ZATCA', 'HRSD', 'SERA', 'FTA', 'DEWA', 'ADDC', 'ETA', 'EgyptERA'
  customerCategory?: string; // e.g. 'residential', 'commercial', 'industrial', 'national', 'expatriate'
  provider?: string; // e.g. 'SEC' (Saudi), 'DEWA' (Dubai), 'ADDC' (Abu Dhabi), 'SEWA' (Sharjah), 'EEHC' (Egypt)
  effectiveFrom: string; // ISO Date 'YYYY-MM-DD'
  effectiveTo?: string; // ISO Date 'YYYY-MM-DD' or undefined if currently in force
  sourceIds: string[];
  parameters: TParams;
  formulaVersion: string;
  verificationStatus: VerificationStatus;
  lastReviewed: string; // ISO Date 'YYYY-MM-DD'
  limitations?: string[];
  approvedBy?: string; // Documented reviewer/auditor identifier
}

export interface RuleResolutionQuery {
  calculatorId: string;
  countryCode: string;
  jurisdiction?: string;
  provider?: string;
  customerCategory?: string;
  effectiveDate?: string; // Defaults to current date if omitted
}

export interface RuleResolutionResult<TParams = Record<string, any>> {
  isAvailable: boolean;
  rule?: CountryRegulatedRule<TParams>;
  unavailableReason?: string;
  availableOptions?: {
    jurisdictions?: string[];
    providers?: string[];
    customerCategories?: string[];
  };
}
