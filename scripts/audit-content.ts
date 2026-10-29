/**
 * Content Quality & Arabic Completeness Audit Script
 * 
 * Verifies:
 * 1. All calculators have comprehensive Arabic names, descriptions, and H1 tags.
 * 2. Every calculator has a documented mathematical formula and Arabic explanation.
 * 3. Every calculator has at least one worked example with calculation steps.
 * 4. Every calculator has at least one informative Arabic FAQ.
 * 5. All guide articles have valid structure, intro, sections, and conclusions.
 * 6. Detects any unlocalized placeholder text (e.g. lorem ipsum, TODO, TBD).
 */

import { ALL_CALCULATORS } from '../src/data/calculators';
import { GUIDES } from '../src/data/guides';

interface ContentIssue {
  item: string;
  type: 'ERROR' | 'WARNING';
  message: string;
}

const issues: ContentIssue[] = [];
console.log('📝 Starting Content Quality & Arabic Completeness Audit...\n');

// 1. Audit Calculators Content
for (const calc of ALL_CALCULATORS) {
  // Check Names & Titles
  if (!calc.nameAr || calc.nameAr.trim().length === 0) {
    issues.push({ item: calc.slug, type: 'ERROR', message: 'Missing Arabic name (nameAr)' });
  }
  if (!calc.h1 || calc.h1.trim().length === 0) {
    issues.push({ item: calc.slug, type: 'ERROR', message: 'Missing H1 heading' });
  }

  // Check Formula & Explanation
  if (!calc.formula || calc.formula.trim().length === 0) {
    issues.push({ item: calc.slug, type: 'ERROR', message: 'Missing mathematical formula' });
  }
  if (!calc.formulaExplanation || calc.formulaExplanation.trim().length < 20) {
    issues.push({ item: calc.slug, type: 'ERROR', message: 'Formula explanation too short or missing' });
  }

  // Check Worked Examples
  if (!calc.workedExamples || calc.workedExamples.length === 0) {
    issues.push({ item: calc.slug, type: 'ERROR', message: 'Missing worked examples' });
  } else {
    for (const [idx, eg] of calc.workedExamples.entries()) {
      if (!eg.title || eg.title.trim().length === 0) {
        issues.push({ item: calc.slug, type: 'ERROR', message: `Worked example #${idx + 1} missing title` });
      }
      if (!eg.steps || eg.steps.length === 0) {
        issues.push({ item: calc.slug, type: 'ERROR', message: `Worked example #${idx + 1} missing calculation steps` });
      }
    }
  }

  // Check FAQs
  if (!calc.faqs || calc.faqs.length === 0) {
    issues.push({ item: calc.slug, type: 'ERROR', message: 'Missing FAQs' });
  } else {
    for (const [idx, faq] of calc.faqs.entries()) {
      if (!faq.question || faq.question.trim().length < 5) {
        issues.push({ item: calc.slug, type: 'ERROR', message: `FAQ #${idx + 1} question too short` });
      }
      if (!faq.answer || faq.answer.trim().length < 15) {
        issues.push({ item: calc.slug, type: 'ERROR', message: `FAQ #${idx + 1} answer too short` });
      }
    }
  }

  // Check Inputs
  for (const inp of calc.inputs) {
    if (!inp.label || inp.label.trim().length === 0) {
      issues.push({ item: calc.slug, type: 'ERROR', message: `Input "${inp.id}" missing Arabic label` });
    }
  }

  // Placeholder check in text fields
  const serialized = JSON.stringify(calc);
  if (/lorem ipsum|todo|tbd|placeholder/i.test(serialized)) {
    issues.push({ item: calc.slug, type: 'WARNING', message: 'Potential placeholder or English draft text found' });
  }
}

// 2. Audit Guides Content
for (const guide of GUIDES) {
  if (!guide.titleAr || guide.titleAr.length < 10) {
    issues.push({ item: `guide:${guide.slug}`, type: 'ERROR', message: 'Guide title too short' });
  }
  if (!guide.content.intro || guide.content.intro.length < 30) {
    issues.push({ item: `guide:${guide.slug}`, type: 'ERROR', message: 'Guide intro too short' });
  }
  if (!guide.content.sections || guide.content.sections.length < 2) {
    issues.push({ item: `guide:${guide.slug}`, type: 'ERROR', message: 'Guide should contain at least 2 sections' });
  }
  if (!guide.content.conclusion || guide.content.conclusion.length < 20) {
    issues.push({ item: `guide:${guide.slug}`, type: 'ERROR', message: 'Guide conclusion too short' });
  }
}

console.log(`📊 Calculators audited: ${ALL_CALCULATORS.length}`);
console.log(`📊 In-depth Guides audited: ${GUIDES.length}`);

const errors = issues.filter((i) => i.type === 'ERROR');
const warnings = issues.filter((i) => i.type === 'WARNING');

if (errors.length > 0) {
  console.error(`\n❌ Content Audit Failed with ${errors.length} errors:`);
  errors.forEach((e) => console.error(`  - [${e.item}] ${e.message}`));
  process.exit(1);
} else {
  console.log(`\n✅ Content & Arabic Completeness Audit Passed with 0 errors!`);
  if (warnings.length > 0) {
    console.log(`⚠️ ${warnings.length} warnings detected.`);
  }
  process.exit(0);
}
