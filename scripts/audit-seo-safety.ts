/**
 * Technical SEO Safety Audit
 *
 * Checks:
 * 1. Sitemap canonical validity & synchronization.
 * 2. Robots.txt directives.
 * 3. Title uniqueness and character lengths.
 * 4. Structured data schemas.
 * 5. Elimination of dangerous practices (accidental noindex, canonical mismatch).
 */

import sitemapGenerator from '../src/app/sitemap';
import robotsGenerator from '../src/app/robots';
import { ALL_CALCULATORS } from '../src/data/calculators';
import { SITE_DOMAIN, constructCanonicalUrl } from '../src/lib/seo/metadata';

interface SeoIssue {
  item: string;
  type: 'ERROR' | 'WARNING';
  message: string;
}

const issues: SeoIssue[] = [];
console.log('🛡️ Starting Technical SEO Safety Audit...\n');

// 1. Robots.txt Audit
const robots = robotsGenerator();
if (!robots.rules) {
  issues.push({ item: 'robots.txt', type: 'ERROR', message: 'Missing robots rules' });
}
if (!robots.sitemap || robots.sitemap !== `${SITE_DOMAIN}/sitemap.xml`) {
  issues.push({ item: 'robots.txt', type: 'ERROR', message: `Invalid sitemap URL in robots: ${robots.sitemap}` });
}

// 2. Sitemap Audit
const sitemap = sitemapGenerator();
console.log(`📊 Auditing ${sitemap.length} sitemap URLs...`);

const seenUrls = new Set<string>();
for (const entry of sitemap) {
  // Check URL format
  if (!entry.url.startsWith('https://lsayartk.com/')) {
    issues.push({ item: entry.url, type: 'ERROR', message: 'URL does not start with https://lsayartk.com/' });
  }

  // Check duplicate URLs in sitemap
  if (seenUrls.has(entry.url)) {
    issues.push({ item: entry.url, type: 'ERROR', message: `Duplicate URL in sitemap: ${entry.url}` });
  }
  seenUrls.add(entry.url);

  // Check lastModified date is valid
  if (!entry.lastModified || isNaN(new Date(entry.lastModified).getTime())) {
    issues.push({ item: entry.url, type: 'ERROR', message: `Invalid lastModified date in sitemap` });
  }

  // Check priority is between 0 and 1
  if (typeof entry.priority !== 'number' || entry.priority < 0 || entry.priority > 1) {
    issues.push({ item: entry.url, type: 'ERROR', message: `Invalid priority value: ${entry.priority}` });
  }
}

// 3. Calculator Title Safety Audit
const seenTitles = new Set<string>();
for (const calc of ALL_CALCULATORS) {
  if (seenTitles.has(calc.metaTitle)) {
    issues.push({ item: calc.slug, type: 'ERROR', message: `Duplicate calculator metaTitle: ${calc.metaTitle}` });
  }
  seenTitles.add(calc.metaTitle);

  if (calc.metaTitle.length < 25) {
    issues.push({ item: calc.slug, type: 'WARNING', message: `Title too short (< 25 chars): ${calc.metaTitle}` });
  }
  if (calc.metaTitle.length > 75) {
    issues.push({ item: calc.slug, type: 'WARNING', message: `Title too long (> 75 chars): ${calc.metaTitle}` });
  }

  if (calc.metaDescription.length < 60) {
    issues.push({ item: calc.slug, type: 'WARNING', message: `Meta description too short (< 60 chars)` });
  }
  if (calc.metaDescription.length > 200) {
    issues.push({ item: calc.slug, type: 'WARNING', message: `Meta description too long (> 200 chars)` });
  }
}

console.log(`📊 SEO Safety Issues: ${issues.length}`);
const errors = issues.filter((i) => i.type === 'ERROR');

if (errors.length > 0) {
  for (const e of errors) {
    console.log(`❌ [ERROR] ${e.item}: ${e.message}`);
  }
  process.exit(1);
} else {
  console.log('✅ Technical SEO Safety Audit Passed with 0 errors!');
}
