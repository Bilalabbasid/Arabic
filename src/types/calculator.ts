import { VerificationStatus } from './rule';

export type InputType =
  | 'number'
  | 'decimal'
  | 'currency'
  | 'percentage'
  | 'date'
  | 'time'
  | 'select'
  | 'boolean'
  | 'slider'
  | 'radio'
  | 'text'
  | 'country'
  | 'region'
  | 'provider'
  | 'unit';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
}

export interface ConditionalOptionGroup {
  condition: { field: string; value: any | any[] };
  options: SelectOption[];
}

export interface ConditionalLabelGroup {
  condition: { field: string; value: any | any[] };
  label: string;
  unit?: string;
  helpText?: string;
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: InputType;
  defaultValue: number | string | boolean;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  options?: SelectOption[];
  conditionalOptions?: ConditionalOptionGroup[];
  conditionalLabels?: ConditionalLabelGroup[];
  dependsOn?: { field: string; value: any | any[] };
  validationMessage?: string;
  exampleValue?: string | number;
}

export interface ResultItem {
  id?: string;
  label: string;
  value: number | string;
  formattedValue?: string;
  unit?: string;
  highlight?: boolean;
  helpText?: string;
  badge?: string;
  isCurrency?: boolean;
}

export interface CalculationBreakdownRow {
  period: string | number;
  values: Record<string, string | number>;
}

export interface CalculationResult {
  primary: ResultItem;
  secondary?: ResultItem[];
  details?: ResultItem[];
  breakdown?: {
    columns: { key: string; label: string; align?: 'start' | 'end' | 'center' }[];
    rows: CalculationBreakdownRow[];
  };
  calculationSteps?: string[];
  directAnswer?: string;
  warnings?: string[];
  assumptions?: string[];
  qualifications?: string[];
  sources?: string[];
  relevantRuleVersion?: string;
  country?: string;
  currency?: string;
  effectiveDate?: string;
  error?: string;
}

export type CalculationFunction = (
  inputs: Record<string, any>,
  context?: {
    countryCode?: string;
    currencyCode?: string;
    locale?: string;
  }
) => CalculationResult;

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WorkedExample {
  title: string;
  description: string;
  inputs: Record<string, any>;
  steps: string[];
  resultSummary: string;
}

export type CountryMode = 'UNIVERSAL' | 'COUNTRY_CONFIGURABLE' | 'COUNTRY_REGULATED';
export type PublicationStatus = 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';

export interface CalculatorDefinition {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  shortNameAr: string;
  category: string;
  subcategory: string;
  descriptionAr: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  searchKeywords: string[];
  inputs: CalculatorInput[];
  resultDefinition?: {
    primaryLabel: string;
    primaryUnit?: string;
  };
  calculationEngineId: string;
  calculate: CalculationFunction;
  formula: string;
  formulaExplanation: string;
  workedExamples: WorkedExample[];
  faqs: FAQItem[];
  relatedCalculatorIds: string[];
  countryMode: CountryMode;
  supportedCountries: string[]; // ISO codes or ['*'] for all 22
  supportedJurisdictions: string[];
  sourceIds: string[];
  ruleVersion: string;
  verificationStatus: VerificationStatus;
  publicationStatus: PublicationStatus;
  lastReviewedAt: string;
}
