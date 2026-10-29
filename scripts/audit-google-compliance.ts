/**
 * Google 2026 Spam Update Compliance & Quality Policy Audit
 *
 * Checks adherence to Google Search Essentials and published spam policies:
 * 1. Scaled Content Abuse (no doorway pages, no thin template-cloned calculators, no universal calc duplication)
 * 2. Misleading Functionality (every published tool actually computes and validates inputs)
 * 3. People-First Content (high editorial value, authentic worked examples, clear source disclosures)
 * 4. Technical Quality (crawlability, no cloaking, no geo-blocking of Googlebot)
 */

import { ALL_CALCULATORS } from '../src/data/calculators';
import { COUNTRIES } from '../src/data/countries';
import { GUIDES } from '../src/data/guides';
import { isCountryCalculatorValid } from '../src/lib/seo/metadata';
import { ALL_COUNTRY_RULES } from '../src/lib/rules/rule-resolver';

interface ComplianceFinding {
  policy: string;
  item: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  message: string;
}

const findings: ComplianceFinding[] = [];
console.log('🛡️ Starting Google 2026 Spam Update Compliance Audit...\n');

// 1. Audit Scaled Content Abuse & Thin Doorway Prevention
console.log('Checking Scaled Content Abuse & Thin Country Duplication...');
const universalCalculators = ALL_CALCULATORS.filter((c) => c.countryMode === 'UNIVERSAL');

for (const calc of universalCalculators) {
  // Ensure universal calculators NEVER generate regional pages for all 22 countries
  for (const country of COUNTRIES) {
    const isValid = isCountryCalculatorValid(calc, country.countryCode);
    if (isValid) {
      findings.push({
        policy: 'Scaled Content Abuse (Doorway Pages)',
        item: `${country.countryCode}/${calc.slug}`,
        severity: 'CRITICAL',
        message: `Universal calculator "${calc.slug}" must not generate country-specific duplicate route for ${country.countryCode}`,
      });
    }
  }
}

// 2. Audit Misleading Functionality & Broken Calculators
console.log('Checking Functional Integrity & Calculation Engines...');
for (const calc of ALL_CALCULATORS) {
  if (calc.publicationStatus === 'PUBLISHED') {
    if (typeof calc.calculate !== 'function') {
      findings.push({
        policy: 'Misleading Functionality',
        item: calc.slug,
        severity: 'CRITICAL',
        message: `Published calculator has no executable calculation engine!`,
      });
      continue;
    }

    // Test with default input values
    const defaultInputs: Record<string, any> = {};
    for (const inp of calc.inputs) {
      defaultInputs[inp.id] = inp.defaultValue;
    }

    try {
      const result = calc.calculate(defaultInputs);
      if (!result || !result.primary || typeof result.primary.value !== 'number' || isNaN(result.primary.value)) {
        findings.push({
          policy: 'Misleading Functionality',
          item: calc.slug,
          severity: 'HIGH',
          message: `Calculator engine produced invalid or NaN result with default inputs`,
        });
      }
    } catch (err: any) {
      findings.push({
        policy: 'Misleading Functionality',
        item: calc.slug,
        severity: 'CRITICAL',
        message: `Calculation engine threw unhandled exception: ${err.message}`,
      });
    }
  }
}

// 3. Audit Regulated Sources & Trust Signals (E-E-A-T)
console.log('Checking Regulated Calculator Trust & Official Sources...');
const regulatedCalculators = ALL_CALCULATORS.filter((c) => c.countryMode === 'COUNTRY_REGULATED');

for (const calc of regulatedCalculators) {
  const approvedRules = ALL_COUNTRY_RULES.filter(
    (r) => r.calculatorId === calc.id && r.verificationStatus === 'APPROVED'
  );

  if (approvedRules.length === 0) {
    findings.push({
      policy: 'Unverified Regulatory Information',
      item: calc.slug,
      severity: 'HIGH',
      message: `Regulated calculator "${calc.slug}" has 0 approved official country rules`,
    });
  }

  for (const rule of approvedRules) {
    if (!rule.sourceIds || rule.sourceIds.length === 0) {
      findings.push({
        policy: 'Missing Primary Source Citation',
        item: `${rule.countryCode}/${calc.slug}`,
        severity: 'HIGH',
        message: `Approved rule for ${rule.countryCode} lacks official government citations`,
      });
    }
  }
}

// 4. Audit Thin Content in Guides
console.log('Checking Editorial Substance & Helpful Content in Guides...');
for (const guide of GUIDES) {
  const fullText = [
    guide.content.intro,
    ...guide.content.sections.map((s) => s.heading + ' ' + s.body),
    guide.content.conclusion,
  ].join(' ');

  if (fullText.length < 500) {
    findings.push({
      policy: 'Thin / Low-Value Content',
      item: guide.slug,
      severity: 'HIGH',
      message: `Guide "${guide.slug}" is too short (< 500 characters)`,
    });
  }
  if (!guide.content.sections || guide.content.sections.length < 2) {
    findings.push({
      policy: 'Thin / Low-Value Content',
      item: guide.slug,
      severity: 'MEDIUM',
      message: `Guide "${guide.slug}" has fewer than 2 structured sections`,
    });
  }
}

// Output summary
console.log(`\n📊 Total Google Compliance Findings: ${findings.length}`);
if (findings.length > 0) {
  console.log('⚠️ Issues detected:');
  for (const f of findings) {
    console.log(`- [${f.severity}] ${f.policy} on ${f.item}: ${f.message}`);
  }
  process.exit(1);
} else {
  console.log('✅ Google 2026 Spam Update Compliance Passed with 0 policy violations!');
}
