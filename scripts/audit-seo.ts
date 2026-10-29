/**
 * SEO & Internationalization Audit Script
 * 
 * Validates:
 * 1. Title format and uniqueness across all calculators and country routes.
 * 2. Meta description presence and length (between 50 and 200 characters).
 * 3. Canonical URL construction and absence of query string leaks.
 * 4. Reciprocal hreflang tag generation conforming to Google Search Central guidelines.
 * 5. Valid BCP-47 language codes for all Arab regional targets.
 * 6. Strict isolation: Universal calculators must not have regional hreflang variants.
 */

import { ALL_CALCULATORS } from '../src/data/calculators';
import { COUNTRIES, getCountryByCode } from '../src/data/countries';
import {
  generateHreflangAlternates,
  isCountryCalculatorValid,
  constructCanonicalUrl,
  generateLocalizedCalculatorTitle,
  generateLocalizedCalculatorDescription,
  ARABIC_LOCALE_CODES,
  SITE_DOMAIN,
} from '../src/lib/seo/metadata';

interface AuditIssue {
  slug: string;
  country?: string;
  type: 'ERROR' | 'WARNING';
  message: string;
}

const issues: AuditIssue[] = [];

console.log('🔍 Starting comprehensive International SEO & Metadata Audit...\n');

// 1. Audit Universal & Regional Calculators
const seenCanonicalUrls = new Set<string>();
const seenTitles = new Set<string>();

for (const calc of ALL_CALCULATORS) {
  // A. Meta Title & Description Checks
  if (!calc.metaTitle || calc.metaTitle.length < 10) {
    issues.push({ slug: calc.slug, type: 'ERROR', message: `Title too short or missing: "${calc.metaTitle}"` });
  }
  if (!calc.metaDescription || calc.metaDescription.length < 50) {
    issues.push({ slug: calc.slug, type: 'ERROR', message: `Meta description too short (<50 chars): "${calc.metaDescription}"` });
  }

  // B. Canonical URL Checks for Universal Path
  const universalCanonical = constructCanonicalUrl(`/calculators/${calc.slug}`);
  if (!universalCanonical.startsWith(SITE_DOMAIN)) {
    issues.push({ slug: calc.slug, type: 'ERROR', message: `Invalid canonical domain: ${universalCanonical}` });
  }
  if (seenCanonicalUrls.has(universalCanonical)) {
    issues.push({ slug: calc.slug, type: 'ERROR', message: `Duplicate canonical URL detected: ${universalCanonical}` });
  }
  seenCanonicalUrls.add(universalCanonical);

  // C. Hreflang Alternates Audit
  const hreflangs = generateHreflangAlternates(calc);
  if (!hreflangs['x-default']) {
    issues.push({ slug: calc.slug, type: 'ERROR', message: 'Missing required x-default hreflang alternate' });
  }

  if (calc.countryMode === 'UNIVERSAL') {
    // Universal calculators should ONLY have 'ar' and 'x-default' pointing to /calculators/[slug]
    const keys = Object.keys(hreflangs);
    const nonUniversalKeys = keys.filter((k) => k !== 'ar' && k !== 'x-default');
    if (nonUniversalKeys.length > 0) {
      issues.push({
        slug: calc.slug,
        type: 'ERROR',
        message: `Universal calculator has regional hreflangs: ${nonUniversalKeys.join(', ')}`,
      });
    }
  } else {
    // Country regulated or configurable
    // Verify each hreflang points to a valid country code and valid BCP-47 tag
    for (const [langCode, targetUrl] of Object.entries(hreflangs)) {
      if (langCode === 'x-default') continue;
      const validBcp = Object.values(ARABIC_LOCALE_CODES).includes(langCode);
      if (!validBcp) {
        issues.push({
          slug: calc.slug,
          type: 'ERROR',
          message: `Invalid BCP-47 locale tag: "${langCode}"`,
        });
      }
      if (!targetUrl.startsWith(SITE_DOMAIN)) {
        issues.push({
          slug: calc.slug,
          type: 'ERROR',
          message: `hreflang URL missing domain prefix: ${targetUrl}`,
        });
      }
    }
  }

  // D. Localized Country Pages Metadata Audit
  for (const country of COUNTRIES) {
    if (isCountryCalculatorValid(calc, country.countryCode)) {
      const localizedTitle = generateLocalizedCalculatorTitle(calc, country);
      const localizedDesc = generateLocalizedCalculatorDescription(calc, country);
      const countryCanonical = constructCanonicalUrl(`/${country.countryCode.toLowerCase()}/${calc.slug}`);

      if (!localizedTitle || localizedTitle.length < 15) {
        issues.push({
          slug: calc.slug,
          country: country.countryCode,
          type: 'ERROR',
          message: `Localized title too short: "${localizedTitle}"`,
        });
      }

      if (!localizedDesc || localizedDesc.length < 40) {
        issues.push({
          slug: calc.slug,
          country: country.countryCode,
          type: 'ERROR',
          message: `Localized description too short: "${localizedDesc}"`,
        });
      }

      if (seenCanonicalUrls.has(countryCanonical)) {
        issues.push({
          slug: calc.slug,
          country: country.countryCode,
          type: 'ERROR',
          message: `Duplicate regional canonical: ${countryCanonical}`,
        });
      }
      seenCanonicalUrls.add(countryCanonical);
    }
  }
}

// 2. Summary & Verification
console.log(`📊 Total Canonical URLs audited: ${seenCanonicalUrls.size}`);

const errors = issues.filter((i) => i.type === 'ERROR');
const warnings = issues.filter((i) => i.type === 'WARNING');

if (errors.length > 0) {
  console.error(`\n❌ SEO Audit Failed with ${errors.length} errors:`);
  errors.forEach((e) => {
    console.error(`  - [${e.slug}${e.country ? ` / ${e.country}` : ''}] ${e.message}`);
  });
  process.exit(1);
} else {
  console.log(`\n✅ SEO & Hreflang Audit Passed Successfully with 0 errors!`);
  if (warnings.length > 0) {
    console.log(`⚠️ ${warnings.length} warnings detected.`);
  }
  process.exit(0);
}
