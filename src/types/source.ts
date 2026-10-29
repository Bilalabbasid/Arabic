export interface SourceDefinition {
  id: string;
  nameAr: string;
  nameEn: string;
  authorityType: 'MINISTRY' | 'CENTRAL_BANK' | 'TAX_AUTHORITY' | 'CUSTOMS' | 'STATISTICAL_BUREAU' | 'INTERNATIONAL';
  countryCode?: string; // Optional if international
  officialUrl: string;
  descriptionAr: string;
}
