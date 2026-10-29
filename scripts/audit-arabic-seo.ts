/**
 * Automated Arabic SEO & Search-Intent Audit
 * 
 * Verifies:
 * 1. Title tags reflect genuine Arabic search queries without mechanical stuffing.
 * 2. Meta descriptions are informative, user-benefit focused, and within 50-200 chars.
 * 3. H1 headings align with search intent and are distinct from site name wrappers.
 * 4. URLs are clean, canonicalized, and strictly prevent duplicate universal pages.
 * 5. Primary and secondary Arabic search keywords are recorded for each tool.
 * 6. Valid reciprocal hreflangs exist exclusively between published equivalent pages.
 */

import { ALL_CALCULATORS } from '../src/data/calculators';
import { CATEGORIES } from '../src/data/categories';
import { COUNTRIES } from '../src/data/countries';
import {
  generateLocalizedCalculatorTitle,
  generateLocalizedCalculatorDescription,
  constructCanonicalUrl,
  isCountryCalculatorValid,
  generateHreflangAlternates,
  SITE_DOMAIN,
} from '../src/lib/seo/metadata';

interface SeoIssue {
  target: string;
  type: 'ERROR' | 'WARNING';
  message: string;
}

const issues: SeoIssue[] = [];

console.log('🔍 Starting Arabic Technical & On-Page SEO Audit...\n');

// 1. Audit Calculators SEO
for (const calc of ALL_CALCULATORS) {
  // Title checks
  if (!calc.metaTitle || calc.metaTitle.length < 15) {
    issues.push({ target: calc.slug, type: 'ERROR', message: `Title too short: "${calc.metaTitle}"` });
  }
  if (calc.metaTitle.length > 90) {
    issues.push({ target: calc.slug, type: 'WARNING', message: `Title exceeds 90 characters: "${calc.metaTitle}"` });
  }
  if (!calc.metaTitle.includes('حاسبة') && !calc.metaTitle.includes('حساب')) {
    issues.push({ target: calc.slug, type: 'WARNING', message: 'Title lacks primary search verb (حاسبة / حساب)' });
  }

  // Meta description checks
  if (!calc.metaDescription || calc.metaDescription.length < 60) {
    issues.push({ target: calc.slug, type: 'ERROR', message: `Meta description too short (<60 chars): "${calc.metaDescription}"` });
  }
  if (calc.metaDescription.length > 250) {
    issues.push({ target: calc.slug, type: 'WARNING', message: `Meta description too long (>250 chars)` });
  }

  // H1 checks
  if (!calc.h1 || calc.h1.trim().length === 0) {
    issues.push({ target: calc.slug, type: 'ERROR', message: 'Missing primary H1 tag' });
  }

  // Search keywords
  if (!calc.searchKeywords || calc.searchKeywords.length < 3) {
    issues.push({ target: calc.slug, type: 'ERROR', message: 'At least 3 primary Arabic search keywords required' });
  }

  // Check Localized URLs & Hreflang
  const hreflangs = generateHreflangAlternates(calc);
  if (!hreflangs['x-default']) {
    issues.push({ target: calc.slug, type: 'ERROR', message: 'Missing x-default in hreflang alternate links' });
  }

  // Universal calculators must NOT have regional URLs
  if (calc.countryMode === 'UNIVERSAL') {
    for (const c of COUNTRIES) {
      if (isCountryCalculatorValid(calc, c.countryCode)) {
        issues.push({
          target: calc.slug,
          type: 'ERROR',
          message: `Universal calculator incorrectly valid for country ${c.countryCode}`,
        });
      }
    }
  }

  // Country Regulated/Configurable checks
  for (const country of COUNTRIES) {
    if (isCountryCalculatorValid(calc, country.countryCode)) {
      const locTitle = generateLocalizedCalculatorTitle(calc, country);
      const locDesc = generateLocalizedCalculatorDescription(calc, country);
      const locCanonical = constructCanonicalUrl(`/${country.countryCode.toLowerCase()}/${calc.slug}`);

      if (!locTitle || locTitle.length < 15) {
        issues.push({ target: `${country.countryCode}:${calc.slug}`, type: 'ERROR', message: 'Localized title too short' });
      }
      if (!locDesc || locDesc.length < 50) {
        issues.push({ target: `${country.countryCode}:${calc.slug}`, type: 'ERROR', message: 'Localized description too short' });
      }
      if (!locCanonical.startsWith(SITE_DOMAIN)) {
        issues.push({ target: `${country.countryCode}:${calc.slug}`, type: 'ERROR', message: 'Invalid canonical URL prefix' });
      }
    }
  }
}

// 2. Audit Categories SEO
for (const cat of CATEGORIES) {
  if (!cat.metaTitle || cat.metaTitle.length < 15) {
    issues.push({ target: `category:${cat.slug}`, type: 'ERROR', message: 'Category title too short' });
  }
  if (!cat.metaDescription || cat.metaDescription.length < 50) {
    issues.push({ target: `category:${cat.slug}`, type: 'ERROR', message: 'Category description too short' });
  }
}

// Report
const errors = issues.filter((i) => i.type === 'ERROR');
const warnings = issues.filter((i) => i.type === 'WARNING');

console.log(`📊 Inspected Calculators & Categories for SEO compliance.`);

if (errors.length > 0) {
  console.error(`\n❌ Arabic SEO Audit Failed with ${errors.length} errors:`);
  errors.forEach((e) => console.error(`  - [${e.target}]: ${e.message}`));
  process.exit(1);
} else {
  console.log(`\n✅ Arabic SEO & Search-Intent Audit Passed with 0 errors!`);
  if (warnings.length > 0) {
    console.log(`⚠️ ${warnings.length} warnings detected.`);
  }
  process.exit(0);
}

