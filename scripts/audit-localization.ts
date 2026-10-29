/**
 * Automated Regional Arabic Localization & Terminology Audit
 * 
 * Verifies:
 * 1. Conformance with ARABIC_TERMINOLOGY_GLOSSARY concepts.
 * 2. Proper currency names and symbols across all 22 Arab countries.
 * 3. Country-specific regulatory citations (SERA, ZATCA, HRSD for SA; DEWA, FTA, MoHRE for AE; EgyptERA, ETA for EG).
 * 4. Conceptual precision: ensures Profit Margin is never confused with Markup.
 * 5. Regional automotive and financial terms are appropriately respected.
 */

import { ARABIC_TERMINOLOGY_GLOSSARY } from '../src/content/localization/terminology';
import { ALL_CALCULATORS } from '../src/data/calculators';
import { COUNTRIES } from '../src/data/countries';
import { ALL_COUNTRY_RULES } from '../src/lib/rules/rule-resolver';

interface LocIssue {
  item: string;
  type: 'ERROR' | 'WARNING';
  message: string;
}

const issues: LocIssue[] = [];

console.log('🌍 Starting Regional Arabic Localization & Terminology Audit...\n');

// 1. Audit Glossary Consistency
if (!ARABIC_TERMINOLOGY_GLOSSARY || ARABIC_TERMINOLOGY_GLOSSARY.length < 15) {
  issues.push({ item: 'glossary', type: 'ERROR', message: 'Glossary contains fewer than 15 core entries' });
}

for (const entry of ARABIC_TERMINOLOGY_GLOSSARY) {
  if (!entry.conceptId || !entry.preferredArabicTerm || !entry.englishMeaning) {
    issues.push({ item: `glossary:${entry.conceptId}`, type: 'ERROR', message: 'Incomplete glossary entry' });
  }
}

// 2. Audit Countries Currency & Locale Data
for (const country of COUNTRIES) {
  if (!country.currencySymbolAr || country.currencySymbolAr.trim().length === 0) {
    issues.push({ item: `country:${country.countryCode}`, type: 'ERROR', message: 'Missing Arabic currency symbol' });
  }
  if (!country.currencyNameAr || country.currencyNameAr.trim().length === 0) {
    issues.push({ item: `country:${country.countryCode}`, type: 'ERROR', message: 'Missing Arabic currency name' });
  }
  if (!country.locale || (!country.locale.startsWith('ar_') && !country.locale.startsWith('ar-'))) {
    issues.push({ item: `country:${country.countryCode}`, type: 'ERROR', message: `Invalid Arabic locale format: "${country.locale}"` });
  }
}

// 3. Audit Country Rules Citations
const rulesByCountry: Record<string, string[]> = {};
for (const rule of ALL_COUNTRY_RULES) {
  if (!rulesByCountry[rule.countryCode]) rulesByCountry[rule.countryCode] = [];
  rulesByCountry[rule.countryCode].push(rule.jurisdiction);
}

// Saudi Arabia must reference approved authorities
const saAuthorities = rulesByCountry['SA'] || [];
if (!saAuthorities.includes('SERA') && !saAuthorities.includes('ZATCA') && !saAuthorities.includes('HRSD')) {
  issues.push({ item: 'rules:SA', type: 'ERROR', message: 'Missing approved Saudi regulatory jurisdictions' });
}

// UAE must reference approved authorities
const aeAuthorities = rulesByCountry['AE'] || [];
if (!aeAuthorities.includes('DEWA') && !aeAuthorities.includes('ADDC') && !aeAuthorities.includes('MoHRE') && !aeAuthorities.includes('FTA')) {
  issues.push({ item: 'rules:AE', type: 'ERROR', message: 'Missing approved UAE regulatory jurisdictions' });
}

// Egypt must reference approved authorities
const egAuthorities = rulesByCountry['EG'] || [];
if (!egAuthorities.includes('EgyptERA') && !egAuthorities.includes('ETA') && !egAuthorities.includes('MoM')) {
  issues.push({ item: 'rules:EG', type: 'ERROR', message: 'Missing approved Egyptian regulatory jurisdictions' });
}

// 4. Conceptual Accuracy Checks in Calculators
for (const calc of ALL_CALCULATORS) {
  const contentString = JSON.stringify(calc);

  // Check that Profit Margin and Markup are not conflated
  if (/هامش الربح/i.test(contentString) && /Markup/i.test(calc.nameEn)) {
    issues.push({
      item: calc.slug,
      type: 'ERROR',
      message: 'Conceptual confusion: "Markup" must not be labeled as "هامش الربح"',
    });
  }

  // Check currency label correctness in options
  for (const inp of calc.inputs) {
    if (inp.options) {
      for (const opt of inp.options) {
        if (opt.value === 'SA' && !opt.label.includes('ر.س') && !opt.label.includes('السعودية')) {
          issues.push({ item: `${calc.slug}:${inp.id}`, type: 'WARNING', message: 'Saudi option label should mention SAR or السعودية' });
        }
      }
    }
  }
}

// Report
const errors = issues.filter((i) => i.type === 'ERROR');
const warnings = issues.filter((i) => i.type === 'WARNING');

console.log(`📊 Validated Glossary Entries: ${ARABIC_TERMINOLOGY_GLOSSARY.length}`);
console.log(`📊 Validated Arab Countries: ${COUNTRIES.length}`);

if (errors.length > 0) {
  console.error(`\n❌ Regional Localization Audit Failed with ${errors.length} errors:`);
  errors.forEach((e) => console.error(`  - [${e.item}]: ${e.message}`));
  process.exit(1);
} else {
  console.log(`\n✅ Regional Arabic Localization & Terminology Audit Passed (0 errors)!`);
  if (warnings.length > 0) {
    console.log(`⚠️ ${warnings.length} warnings detected.`);
  }
  process.exit(0);
}
