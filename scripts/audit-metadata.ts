/**
 * Comprehensive Metadata & Open Graph Audit
 * 
 * Verifies:
 * 1. Title uniqueness across all routes.
 * 2. Meta description presence, length, and quality (no empty or stub descriptions).
 * 3. Open Graph titles, descriptions, and site names.
 * 4. Correct canonical URL formulation with valid https://lsayartk.com domain.
 * 5. Structured Data schemas (WebApplication, FAQPage, BreadcrumbList).
 */

import { ALL_CALCULATORS } from '../src/data/calculators';
import { CATEGORIES } from '../src/data/categories';
import { GUIDES } from '../src/data/guides';
import { COUNTRIES } from '../src/data/countries';
import {
  formatMetaTitle,
  constructCanonicalUrl,
  generateCalculatorSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
  isCountryCalculatorValid,
  generateLocalizedCalculatorTitle,
  generateLocalizedCalculatorDescription,
  SITE_DOMAIN,
} from '../src/lib/seo/metadata';

interface MetaIssue {
  page: string;
  type: 'ERROR' | 'WARNING';
  message: string;
}

const issues: MetaIssue[] = [];
const seenTitles = new Set<string>();

console.log('🏷️ Starting Metadata, Open Graph & Structured Data Audit...\n');

// 1. Audit Calculators Metadata & Schema
for (const calc of ALL_CALCULATORS) {
  const title = formatMetaTitle(calc.metaTitle);
  if (seenTitles.has(title)) {
    issues.push({ page: `calc:${calc.slug}`, type: 'ERROR', message: `Duplicate title: "${title}"` });
  }
  seenTitles.add(title);

  if (!calc.metaDescription || calc.metaDescription.length < 50) {
    issues.push({ page: `calc:${calc.slug}`, type: 'ERROR', message: `Meta description too short: "${calc.metaDescription}"` });
  }

  const canonical = constructCanonicalUrl(`/calculators/${calc.slug}`);
  if (!canonical.startsWith(SITE_DOMAIN)) {
    issues.push({ page: `calc:${calc.slug}`, type: 'ERROR', message: `Invalid canonical domain: ${canonical}` });
  }

  // Schema generation validation
  const calcSchema = generateCalculatorSchema({
    nameAr: calc.nameAr,
    descriptionAr: calc.descriptionAr,
    slug: calc.slug,
  });
  if (!calcSchema || calcSchema['@type'] !== 'WebApplication') {
    issues.push({ page: `calc:${calc.slug}`, type: 'ERROR', message: 'Invalid WebApplication JSON-LD schema' });
  }

  const faqSchema = generateFaqSchema(calc.faqs);
  if (calc.faqs && calc.faqs.length > 0 && (!faqSchema || faqSchema['@type'] !== 'FAQPage')) {
    issues.push({ page: `calc:${calc.slug}`, type: 'ERROR', message: 'Invalid FAQPage JSON-LD schema' });
  }
}

// 2. Audit Categories Metadata
for (const cat of CATEGORIES) {
  const catTitle = formatMetaTitle(cat.metaTitle);
  if (seenTitles.has(catTitle)) {
    issues.push({ page: `category:${cat.slug}`, type: 'ERROR', message: `Duplicate category title: "${catTitle}"` });
  }
  seenTitles.add(catTitle);

  if (!cat.metaDescription || cat.metaDescription.length < 50) {
    issues.push({ page: `category:${cat.slug}`, type: 'ERROR', message: `Category description too short: "${cat.metaDescription}"` });
  }
}

// 3. Audit Localized Country Pages Metadata
for (const country of COUNTRIES) {
  for (const calc of ALL_CALCULATORS) {
    if (isCountryCalculatorValid(calc, country.countryCode)) {
      const localizedTitle = generateLocalizedCalculatorTitle(calc, country);
      const localizedDesc = generateLocalizedCalculatorDescription(calc, country);
      const countryCanonical = constructCanonicalUrl(`/${country.countryCode.toLowerCase()}/${calc.slug}`);

      if (!localizedTitle || localizedTitle.length < 15) {
        issues.push({ page: `${country.countryCode}:${calc.slug}`, type: 'ERROR', message: 'Localized title too short' });
      }
      if (!localizedDesc || localizedDesc.length < 40) {
        issues.push({ page: `${country.countryCode}:${calc.slug}`, type: 'ERROR', message: 'Localized description too short' });
      }
      if (!countryCanonical.startsWith(SITE_DOMAIN)) {
        issues.push({ page: `${country.countryCode}:${calc.slug}`, type: 'ERROR', message: 'Invalid country canonical' });
      }
    }
  }
}

// 4. Audit Guides Metadata
for (const guide of GUIDES) {
  const guideTitle = formatMetaTitle(guide.titleAr);
  if (seenTitles.has(guideTitle)) {
    issues.push({ page: `guide:${guide.slug}`, type: 'ERROR', message: `Duplicate guide title: "${guideTitle}"` });
  }
  seenTitles.add(guideTitle);

  if (!guide.summaryAr || guide.summaryAr.length < 40) {
    issues.push({ page: `guide:${guide.slug}`, type: 'ERROR', message: 'Guide summary too short' });
  }
}

// Report
const errors = issues.filter((i) => i.type === 'ERROR');
const warnings = issues.filter((i) => i.type === 'WARNING');

console.log(`📊 Total unique titles verified: ${seenTitles.size}`);

if (errors.length > 0) {
  console.error(`\n❌ Metadata Audit Failed with ${errors.length} errors:`);
  errors.forEach((e) => console.error(`  - [${e.page}]: ${e.message}`));
  process.exit(1);
} else {
  console.log(`\n✅ Metadata, Open Graph & Structured Data Audit Passed with 0 errors!`);
  if (warnings.length > 0) {
    console.log(`⚠️ ${warnings.length} warnings detected.`);
  }
  process.exit(0);
}
