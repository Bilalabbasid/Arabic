import { getCountryData, ALL_COUNTRY_CODES } from '@/data/countries';
import { CountryCode, CountryData } from '@/data/countries/types';
import { getCalculatorBySlug, ALL_CALCULATORS } from '@/data/calculators';
import { getCountryCalculatorContent } from '@/data/country-content';

export interface CountryCalculatorPageInput {
  countryCode: string;
  calculatorSlug: string;
}

export interface GatingDetails {
  countryCode: string;
  calculatorSlug: string;
  url: string;
  isIndexable: boolean;
  reason?: string;
  requiredRulesVerified: boolean;
  wordCount: number;
  hasTwoWorkedExamples: boolean;
  isFresh: boolean;
  rulesChecked: Array<{
    ruleKey: string;
    status: string;
    checkedAt?: string;
    staleAfterDays?: number;
    isStale: boolean;
  }>;
}

// Map each calculator slug to the country rules it strictly requires
export function getRequiredRuleKeysForCalculator(calculatorSlug: string): Array<keyof Omit<CountryData, 'basics'>> {
  const normSlug = calculatorSlug === 'car-fuel-cost' ? 'fuel-cost' : calculatorSlug;

  switch (normSlug) {
    case 'vat-calculator':
      return ['vat'];
    case 'fuel-cost':
    case 'fuel-prices':
    case 'trip-cost':
      return ['fuel'];
    case 'end-of-service-reward':
      return ['endOfService'];
    case 'electricity-bill':
      return ['electricity'];
    case 'net-salary':
      return ['socialInsurance', 'incomeTax'];
    case 'car-finance':
    case 'car-affordability':
    case 'lease-vs-buy':
      return ['finance'];
    case 'car-import-customs':
      return ['customs', 'vat'];
    case 'traffic-fines':
      return ['trafficFines'];
    case 'vehicle-fees':
      return ['vehicleRegistration'];
    default:
      return [];
  }
}

/**
 * Calculates total visible word count of unique localized copy for a country calculator page
 */
export function calculateCountryCalculatorWordCount(countryCode: string, calculatorSlug: string): number {
  const calc = getCalculatorBySlug(calculatorSlug);
  const content = getCountryCalculatorContent(calculatorSlug, countryCode);

  if (!content) {
    return 0;
  }

  const textParts: string[] = [
    calc?.answerFirstAr || '',
    calc?.formulaExplanation || '',
    calc?.descriptionAr || '',
    ...(calc?.commonMistakes?.flatMap((m) => [m.mistake, m.correction, m.explanation]) || []),
    content.intro || '',
    content.detailedAnalysis || '',
    content.currentRateOrRule || '',
    ...(content.exemptionsOrExclusions || []),
    ...content.workedExamples.flatMap((w) => [w.title, ...(w.steps || []), w.resultSummary || '']),
    ...content.faqs.flatMap((f) => [f.question, f.answer]),
  ];

  const fullText = textParts.join(' ');
  return fullText.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Full Gating Rule for Country-Calculator pages.
 *
 * A country page is indexable ONLY if:
 * 1. Every required rule for that calculator in that country has status === 'verified' or 'not_applicable'.
 * 2. Content has >= 400 words unique local copy.
 * 3. Includes at least 2 worked examples.
 * 4. Data is not stale (checkedAt within staleAfterDays).
 */
export function getGatingDetails(page: CountryCalculatorPageInput): GatingDetails {
  const cCode = page.countryCode.toLowerCase();
  const slug = page.calculatorSlug;
  const url = `https://lsayartk.com/${cCode}/${slug}`;

  const country = getCountryData(cCode);
  const calc = getCalculatorBySlug(slug);

  if (!country || !calc) {
    return {
      countryCode: cCode,
      calculatorSlug: slug,
      url,
      isIndexable: false,
      reason: 'Country or Calculator not found',
      requiredRulesVerified: false,
      wordCount: 0,
      hasTwoWorkedExamples: false,
      isFresh: false,
      rulesChecked: [],
    };
  }

  // Universal calculators do not have country-specific variants
  if (calc.countryMode === 'UNIVERSAL') {
    return {
      countryCode: cCode,
      calculatorSlug: slug,
      url,
      isIndexable: false,
      reason: 'Universal calculator has no localized country variant; canonical is on /calculators/',
      requiredRulesVerified: false,
      wordCount: 0,
      hasTwoWorkedExamples: false,
      isFresh: false,
      rulesChecked: [],
    };
  }

  const requiredRuleKeys = getRequiredRuleKeysForCalculator(slug);
  if (requiredRuleKeys.length === 0) {
    return {
      countryCode: cCode,
      calculatorSlug: slug,
      url,
      isIndexable: false,
      reason: 'No required rules mapped for this calculator',
      requiredRulesVerified: false,
      wordCount: 0,
      hasTwoWorkedExamples: false,
      isFresh: false,
      rulesChecked: [],
    };
  }

  // Current reference timestamp (audit session: 2026-11-02)
  const now = new Date('2026-11-02T06:00:00Z').getTime();

  let requiredRulesVerified = true;
  let isFresh = true;
  const rulesChecked: GatingDetails['rulesChecked'] = [];

  for (const key of requiredRuleKeys) {
    const rule = country[key] as any;
    if (!rule) {
      requiredRulesVerified = false;
      rulesChecked.push({
        ruleKey: String(key),
        status: 'missing',
        isStale: false,
      });
      continue;
    }

    const isVerifiedOrNA = rule.status === 'verified' || rule.status === 'not_applicable';
    if (!isVerifiedOrNA) {
      requiredRulesVerified = false;
    }

    let isRuleStale = false;
    if (rule.checkedAt && rule.staleAfterDays) {
      const checkedTime = new Date(rule.checkedAt).getTime();
      const ageDays = (now - checkedTime) / (1000 * 60 * 60 * 24);
      if (ageDays > rule.staleAfterDays) {
        isRuleStale = true;
        isFresh = false;
      }
    }

    rulesChecked.push({
      ruleKey: String(key),
      status: rule.status,
      checkedAt: rule.checkedAt,
      staleAfterDays: rule.staleAfterDays,
      isStale: isRuleStale,
    });
  }

  const content = getCountryCalculatorContent(slug, cCode);
  const wordCount = calculateCountryCalculatorWordCount(cCode, slug);
  const hasTwoWorkedExamples = Boolean(
    content && content.workedExamples && content.workedExamples.length >= 2
  );

  const failureReasons: string[] = [];
  if (!requiredRulesVerified) {
    const unverifiedKeys = rulesChecked
      .filter((r) => r.status !== 'verified' && r.status !== 'not_applicable')
      .map((r) => `${r.ruleKey} (${r.status})`)
      .join(', ');
    failureReasons.push(`Required rules not verified: ${unverifiedKeys}`);
  }

  if (wordCount < 400) {
    failureReasons.push(`Word count too low (${wordCount} words < 400 required)`);
  }

  if (!hasTwoWorkedExamples) {
    failureReasons.push(`Missing 2 localized worked examples (found ${content?.workedExamples?.length || 0})`);
  }

  if (!isFresh) {
    failureReasons.push('Stale data detected');
  }

  const isIndexable = failureReasons.length === 0;

  return {
    countryCode: cCode,
    calculatorSlug: slug,
    url,
    isIndexable,
    reason: isIndexable ? undefined : failureReasons.join('; '),
    requiredRulesVerified,
    wordCount,
    hasTwoWorkedExamples,
    isFresh,
    rulesChecked,
  };
}

/**
 * Returns true if the page passes all 4 gating criteria
 */
export function isIndexable(page: CountryCalculatorPageInput): boolean {
  return getGatingDetails(page).isIndexable;
}

/**
 * Returns list of calculator slugs that are indexable for a given country
 */
export function getIndexableCalculatorsForCountry(countryCode: string): string[] {
  const cCode = countryCode.toLowerCase();
  const indexableSlugs: string[] = [];

  for (const calc of ALL_CALCULATORS) {
    if (isIndexable({ countryCode: cCode, calculatorSlug: calc.slug })) {
      indexableSlugs.push(calc.slug);
    }
  }

  return indexableSlugs;
}

/**
 * Country hub /[country] is indexable only if it lists >= 3 indexable calculator variants;
 * otherwise it must have noindex, follow.
 */
export function isCountryHubGatedIndexable(countryCode: string): boolean {
  const indexableCalcs = getIndexableCalculatorsForCountry(countryCode);
  return indexableCalcs.length >= 3;
}
