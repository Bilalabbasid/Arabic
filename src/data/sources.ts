import { SourceDefinition } from '@/types/source';

export const SOURCES: SourceDefinition[] = [
  {
    id: 'zatca-sa',
    nameAr: 'هيئة الزكاة والضريبة والجمارك (زاتكا) - السعودية',
    nameEn: 'Zakat, Tax and Customs Authority (ZATCA) - Saudi Arabia',
    authorityType: 'TAX_AUTHORITY',
    countryCode: 'SA',
    officialUrl: 'https://zatca.gov.sa',
    descriptionAr: 'الجهة الرسمية المسؤولة عن تحصيل الزكاة الشرعية وضريبة القيمة المضافة (15%) والجمارك في المملكة العربية السعودية.',
  },
  {
    id: 'hrsd-sa',
    nameAr: 'وزارة الموارد البشرية والتنمية الاجتماعية - السعودية',
    nameEn: 'Ministry of Human Resources and Social Development - Saudi Arabia',
    authorityType: 'MINISTRY',
    countryCode: 'SA',
    officialUrl: 'https://hrsd.gov.sa',
    descriptionAr: 'الجهة المنظمة لنظام العمل والعمال ولوائح مكافأة نهاية الخدمة وعقود العمل والنزاعات العمالية.',
  },
  {
    id: 'sera-sa',
    nameAr: 'هيئة تنظيم المياه والكهرباء (سيرا) - السعودية',
    nameEn: 'Water and Electricity Regulatory Authority (SERA) - Saudi Arabia',
    authorityType: 'MINISTRY',
    countryCode: 'SA',
    officialUrl: 'https://sera.gov.sa',
    descriptionAr: 'الجهة المعتمدة لتعرفة استهلاك الكهرباء وشرائح الفواتير السكنية والتجارية والصناعية.',
  },
  {
    id: 'sama-sa',
    nameAr: 'البنك المركزي السعودي (ساما)',
    nameEn: 'Saudi Central Bank (SAMA)',
    authorityType: 'CENTRAL_BANK',
    countryCode: 'SA',
    officialUrl: 'https://www.sama.gov.sa',
    descriptionAr: 'المشرع والمنظم للمؤسسات المالية ومعايير التمويل الشخصي والعقاري والنسبة السنوية للربح (APR).',
  },
  {
    id: 'fta-ae',
    nameAr: 'الهيئة الاتحادية للضرائب - الإمارات',
    nameEn: 'Federal Tax Authority (FTA) - UAE',
    authorityType: 'TAX_AUTHORITY',
    countryCode: 'AE',
    officialUrl: 'https://tax.gov.ae',
    descriptionAr: 'الجهة المسؤولة عن إدارة وتطبيق ضريبة القيمة المضافة (5%) وضريبة الشركات في دولة الإمارات.',
  },
  {
    id: 'mohre-ae',
    nameAr: 'وزارة الموارد البشرية والتوطين - الإمارات',
    nameEn: 'Ministry of Human Resources and Emiratisation (MoHRE) - UAE',
    authorityType: 'MINISTRY',
    countryCode: 'AE',
    officialUrl: 'https://www.mohre.gov.ae',
    descriptionAr: 'الجهة المسؤولة عن قانون تنظيم علاقات العمل الاتحادي ولوائح مكافأة نهاية الخدمة.',
  },
  {
    id: 'eta-eg',
    nameAr: 'مصلحة الضرائب المصرية',
    nameEn: 'Egyptian Tax Authority (ETA)',
    authorityType: 'TAX_AUTHORITY',
    countryCode: 'EG',
    officialUrl: 'https://www.eta.gov.eg',
    descriptionAr: 'الجهة المنظمة لضريبة الدخل وفق القانون رقم 91 لسنة 2005 وتعديلاته وضريبة القيمة المضافة (14%).',
  },
  {
    id: 'cbe-eg',
    nameAr: 'البنك المركزي المصري',
    nameEn: 'Central Bank of Egypt (CBE)',
    authorityType: 'CENTRAL_BANK',
    countryCode: 'EG',
    officialUrl: 'https://www.cbe.org.eg',
    descriptionAr: 'المشرف على السياسة النقدية وسعر الفائدة والقطاع المصرفي في جمهورية مصر العربية.',
  },
  {
    id: 'who-intl',
    nameAr: 'منظمة الصحة العالمية (WHO)',
    nameEn: 'World Health Organization (WHO)',
    authorityType: 'INTERNATIONAL',
    officialUrl: 'https://www.who.int',
    descriptionAr: 'المعايير الدولية لتصنيف مؤشر كتلة الجسم (BMI) والمعدلات الصحية المقبولة دولياً.',
  },
];

const SOURCE_MAP = new Map<string, SourceDefinition>();
for (const s of SOURCES) {
  SOURCE_MAP.set(s.id, s);
}

export function getSourceById(id: string): SourceDefinition | undefined {
  return SOURCE_MAP.get(id);
}

export function getSourcesByIds(ids: string[]): SourceDefinition[] {
  return ids.map((id) => SOURCE_MAP.get(id)).filter((s): s is SourceDefinition => Boolean(s));
}
