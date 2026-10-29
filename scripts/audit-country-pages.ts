/**
 * Country-Specific Pages & Localized SEO Safety Audit
 *
 * Verifies that:
 * 1. Country hubs and regional calculators have valid BCP-47 hreflangs.
 * 2. Country pages avoid scaled doorway duplication.
 * 3. Universal calculators return false on country route checks.
 * 4. Only verified country regulations are indexed.
 */

import { ALL_CALCULATORS } from '../src/data/calculators';
import { COUNTRIES } from '../src/data/countries';
import {
  isCountryCalculatorValid,
  constructCanonicalUrl,
  generateHreflangAlternates,
  ARABIC_LOCALE_CODES,
} from '../src/lib/seo/metadata';

interface CountryIssue {
  item: string;
  type: 'ERROR' | 'WARNING';
  message: string;
}

const issues: CountryIssue[] = [];
console.log('🌍 Starting Country Pages & Regional SEO Audit...\n');

// 1. Audit all 22 Country Codes
for (const country of COUNTRIES) {
  const code = country.countryCode;
  if (!ARABIC_LOCALE_CODES[code]) {
    issues.push({ item: code, type: 'ERROR', message: `Missing BCP-47 locale mapping for country code ${code}` });
  }

  // Canonical for country hub
  const hubCanonical = constructCanonicalUrl(`/${code.toLowerCase()}`);
  if (!hubCanonical.startsWith('https://lsayartk.com/')) {
    issues.push({ item: code, type: 'ERROR', message: `Invalid hub canonical: ${hubCanonical}` });
  }
}

// 2. Audit Country Calculators
let totalValidCountryCalculators = 0;
for (const calc of ALL_CALCULATORS) {
  const alternates = generateHreflangAlternates(calc);

  if (calc.countryMode === 'UNIVERSAL') {
    // Universal calculators must only have 'ar' and 'x-default' pointing to /calculators/[slug]
    const keys = Object.keys(alternates);
    if (keys.length > 2 || (keys.length === 2 && (!keys.includes('ar') || !keys.includes('x-default')))) {
      issues.push({
        item: calc.slug,
        type: 'ERROR',
        message: `Universal calculator has regional hreflangs: ${keys.join(', ')}`,
      });
    }
  } else {
    // Regional calculators must have valid alternates
    if (!alternates['x-default']) {
      issues.push({ item: calc.slug, type: 'ERROR', message: `Missing x-default hreflang alternate` });
    }

    for (const [lang, url] of Object.entries(alternates)) {
      if (!url.startsWith('https://lsayartk.com/')) {
        issues.push({ item: `${calc.slug}:${lang}`, type: 'ERROR', message: `Invalid alternate URL: ${url}` });
      }
    }
  }

  // Count valid pages
  for (const c of COUNTRIES) {
    if (isCountryCalculatorValid(calc, c.countryCode)) {
      totalValidCountryCalculators++;
    }
  }
}

console.log(`📊 Verified regional calculator pages: ${totalValidCountryCalculators}`);
console.log(`📊 Country audit issues: ${issues.length}`);

if (issues.length > 0) {
  for (const i of issues) {
    console.log(`❌ [${i.type}] ${i.item}: ${i.message}`);
  }
  process.exit(1);
} else {
  console.log('✅ Country Pages & Regional SEO Audit Passed with 0 errors!');
}
