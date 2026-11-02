/**
 * Release in Waves Configuration
 * Controls gradual rollout and deployment of calculators and localized country variants.
 * Pages with publishAt dates in the future are suppressed from build generation and sitemaps.
 */

export interface ReleaseItem {
  id: string;
  type: 'calculator' | 'country_calculator' | 'country_hub';
  calculatorSlug?: string;
  countryCode?: string;
  wave: number;
  publishAt: string; // ISO date string (YYYY-MM-DD)
  descriptionAr: string;
}

export const RELEASE_PLAN: ReleaseItem[] = [
  // Wave 1: Core calculators and top car tools with verified data (Live today)
  {
    id: 'wave1-core-calculators',
    type: 'calculator',
    wave: 1,
    publishAt: '2026-11-01',
    descriptionAr: 'المرحلة 1: الحاسبات الأساسية وحاسبات المركبات والضرائب والرواتب',
  },
  {
    id: 'wave1-gcc-sa',
    type: 'country_hub',
    countryCode: 'sa',
    wave: 1,
    publishAt: '2026-11-01',
    descriptionAr: 'المرحلة 1: مركز وحاسبات المملكة العربية السعودية المعتمدة',
  },
  {
    id: 'wave1-gcc-ae',
    type: 'country_hub',
    countryCode: 'ae',
    wave: 1,
    publishAt: '2026-11-01',
    descriptionAr: 'المرحلة 1: مركز وحاسبات دولة الإمارات العربية المتحدة المعتمدة',
  },
  {
    id: 'wave1-nile-eg',
    type: 'country_hub',
    countryCode: 'eg',
    wave: 1,
    publishAt: '2026-11-01',
    descriptionAr: 'المرحلة 1: مركز وحاسبات جمهورية مصر العربية المعتمدة',
  },
  {
    id: 'wave1-gcc-kw-qa-bh-om',
    type: 'country_calculator',
    wave: 1,
    publishAt: '2026-11-01',
    descriptionAr: 'المرحلة 1: حاسبات الوقود والضرائب لدول مجلس التعاون (الكويت، قطر، البحرين، عمان)',
  },
  {
    id: 'wave1-levant-maghreb',
    type: 'country_calculator',
    wave: 1,
    publishAt: '2026-11-01',
    descriptionAr: 'المرحلة 1: حاسبات ضريبة القيمة المضافة للأردن والمغرب والجزائر وتونس ولبنان',
  },

  // Wave 2: Weekly expansion (7 days after launch)
  {
    id: 'wave2-car-tools-gcc',
    type: 'country_calculator',
    calculatorSlug: 'car-finance',
    countryCode: 'sa',
    wave: 2,
    publishAt: '2026-11-08',
    descriptionAr: 'المرحلة 2: حاسبة تمويل السيارات السعودية وفق سقف SAMA',
  },
  {
    id: 'wave2-car-finance-ae',
    type: 'country_calculator',
    calculatorSlug: 'car-finance',
    countryCode: 'ae',
    wave: 2,
    publishAt: '2026-11-08',
    descriptionAr: 'المرحلة 2: حاسبة تمويل السيارات في الإمارات وفق ضوابط المصرف المركزي',
  },
  {
    id: 'wave2-routes-sa',
    type: 'country_calculator',
    calculatorSlug: 'trip-cost',
    countryCode: 'sa',
    wave: 2,
    publishAt: '2026-11-08',
    descriptionAr: 'المرحلة 2: مسارات السفر الرئيسية بين المدن السعودية',
  },

  // Wave 3: Weekly expansion (14 days after launch)
  {
    id: 'wave3-customs-fines-gcc',
    type: 'country_calculator',
    calculatorSlug: 'car-import-customs',
    countryCode: 'sa',
    wave: 3,
    publishAt: '2026-11-15',
    descriptionAr: 'المرحلة 3: جمارك استيراد السيارات السعودية',
  },
  {
    id: 'wave3-traffic-fines-ae',
    type: 'country_calculator',
    calculatorSlug: 'traffic-fines',
    countryCode: 'ae',
    wave: 3,
    publishAt: '2026-11-15',
    descriptionAr: 'المرحلة 3: جدول مخالفات المرور والنقاط السوداء بدبي وأبوظبي',
  },
];

/**
 * Checks whether a given page is released according to the release plan
 */
export function isPageReleased(
  page: { countryCode?: string; calculatorSlug?: string; type?: string },
  currentDate: Date = new Date('2026-11-02T06:00:00Z')
): boolean {
  const now = currentDate.getTime();

  // Find most specific release item matching this page
  const specific = RELEASE_PLAN.find((item) => {
    if (page.calculatorSlug && page.countryCode) {
      return item.calculatorSlug === page.calculatorSlug && item.countryCode?.toLowerCase() === page.countryCode?.toLowerCase();
    }
    if (page.countryCode && !page.calculatorSlug) {
      return item.type === 'country_hub' && item.countryCode?.toLowerCase() === page.countryCode?.toLowerCase();
    }
    if (page.calculatorSlug && !page.countryCode) {
      return item.calculatorSlug === page.calculatorSlug;
    }
    return false;
  });

  if (specific) {
    return new Date(specific.publishAt).getTime() <= now;
  }

  // Fall back to Wave 1 general rule
  return true;
}

