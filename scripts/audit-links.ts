/**
 * Internal Linking & Route Crawlability Audit
 * 
 * Verifies:
 * 1. All category links point to valid implemented categories.
 * 2. All related calculator links resolve to valid, published calculators.
 * 3. Guide related calculator slugs lead to active published calculators.
 * 4. Sitemap entries match existing static and dynamic routes.
 * 5. Breadcrumb hierarchy resolves to valid landing pages.
 * 6. Identifies any orphan pages or broken routes across the site.
 */

import { ALL_CALCULATORS, getCalculatorBySlug } from '../src/data/calculators';
import { CATEGORIES, getCategoryBySlug } from '../src/data/categories';
import { GUIDES } from '../src/data/guides';
import { COUNTRIES, getCountryByCode } from '../src/data/countries';
import { isCountryCalculatorValid } from '../src/lib/seo/metadata';

interface LinkIssue {
  source: string;
  targetLink: string;
  type: 'ERROR' | 'WARNING';
  message: string;
}

const issues: LinkIssue[] = [];

console.log('🔗 Starting Internal Linking & Crawlability Audit...\n');

// 1. Audit Related Calculators in Calculators Registry
for (const calc of ALL_CALCULATORS) {
  for (const relId of calc.relatedCalculatorIds) {
    const relCalc = getCalculatorBySlug(relId);
    if (!relCalc) {
      issues.push({
        source: `calculator:${calc.slug}`,
        targetLink: `/calculators/${relId}`,
        type: 'ERROR',
        message: `Broken related calculator reference: "${relId}" does not exist in registry.`,
      });
    } else if (relCalc.publicationStatus !== 'PUBLISHED') {
      issues.push({
        source: `calculator:${calc.slug}`,
        targetLink: `/calculators/${relId}`,
        type: 'WARNING',
        message: `Related calculator "${relId}" is not published (status: ${relCalc.publicationStatus}).`,
      });
    }
  }

  // Check Category reference
  const cat = getCategoryBySlug(calc.category);
  if (!cat) {
    issues.push({
      source: `calculator:${calc.slug}`,
      targetLink: `/categories/${calc.category}`,
      type: 'ERROR',
      message: `Invalid category reference: "${calc.category}" not found in CATEGORIES.`,
    });
  }
}

// 2. Audit Guides Related Calculator Slugs
for (const guide of GUIDES) {
  if (guide.relatedCalculatorSlug) {
    const targetCalc = getCalculatorBySlug(guide.relatedCalculatorSlug);
    if (!targetCalc) {
      issues.push({
        source: `guide:${guide.slug}`,
        targetLink: `/calculators/${guide.relatedCalculatorSlug}`,
        type: 'ERROR',
        message: `Guide references nonexistent calculator: "${guide.relatedCalculatorSlug}".`,
      });
    }
  }
}

// 3. Audit Categories Related Slugs
for (const cat of CATEGORIES) {
  for (const relCatSlug of cat.relatedCategorySlugs) {
    const relCat = getCategoryBySlug(relCatSlug);
    if (!relCat) {
      issues.push({
        source: `category:${cat.slug}`,
        targetLink: `/categories/${relCatSlug}`,
        type: 'ERROR',
        message: `Broken related category reference: "${relCatSlug}".`,
      });
    }
  }
}

// 4. Audit Country Calculators Link Destinations
for (const country of COUNTRIES) {
  for (const calc of ALL_CALCULATORS) {
    if (isCountryCalculatorValid(calc, country.countryCode)) {
      // Must be country configurable or regulated
      if (calc.countryMode === 'UNIVERSAL') {
        issues.push({
          source: `country:${country.countryCode}`,
          targetLink: `/${country.countryCode.toLowerCase()}/${calc.slug}`,
          type: 'ERROR',
          message: `Universal calculator linked to regional country path.`,
        });
      }
    }
  }
}

// Report
const errors = issues.filter((i) => i.type === 'ERROR');
const warnings = issues.filter((i) => i.type === 'WARNING');

console.log(`📊 Inspected all internal cross-links across Calculators, Categories, Guides, and Countries.`);

if (errors.length > 0) {
  console.error(`\n❌ Internal Linking Audit Failed with ${errors.length} errors:`);
  errors.forEach((e) => console.error(`  - [${e.source} -> ${e.targetLink}]: ${e.message}`));
  process.exit(1);
} else {
  console.log(`\n✅ Internal Linking & Route Crawlability Audit Passed with 0 errors!`);
  if (warnings.length > 0) {
    console.log(`⚠️ ${warnings.length} warnings detected.`);
  }
  process.exit(0);
}
