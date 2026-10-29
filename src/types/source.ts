import { VerificationStatus } from './rule';

export interface SourceDefinition {
  id: string;
  nameAr: string;
  nameEn: string;
  authorityType:
    | 'MINISTRY'
    | 'CENTRAL_BANK'
    | 'TAX_AUTHORITY'
    | 'REGULATOR'
    | 'CUSTOMS'
    | 'UTILITY_PROVIDER'
    | 'STATISTICAL_BUREAU'
    | 'INTERNATIONAL';
  countryCode: string; // ISO 2-letter e.g. 'SA', 'AE', 'EG', or 'INTL'
  documentTitleAr: string;
  documentTitleEn?: string;
  officialUrl: string;
  applicableRegulationOrTariff: string;
  publicationDate?: string; // ISO Date 'YYYY-MM-DD'
  effectiveDate: string; // ISO Date 'YYYY-MM-DD'
  relevantSection: string;
  lastReviewed: string; // ISO Date 'YYYY-MM-DD'
  verificationStatus: VerificationStatus;
  descriptionAr: string;
}
