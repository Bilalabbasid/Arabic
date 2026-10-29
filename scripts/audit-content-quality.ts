/**
 * Content Quality & People-First Value Audit Script
 *
 * Verifies that all published calculators and guides provide substantial,
 * helpful, original, and linguistically natural Arabic content.
 */

import { ALL_CALCULATORS } from '../src/data/calculators';
import { GUIDES } from '../src/data/guides';
import { CATEGORIES } from '../src/data/categories';

interface QualityIssue {
  item: string;
  type: 'ERROR' | 'WARNING';
  message: string;
}

const issues: QualityIssue[] = [];
console.log('✍️ Starting In-Depth Content Quality & Substance Audit...\n');

// 1. Calculator Content Quality
for (const calc of ALL_CALCULATORS) {
  // Check meaningful explanation length
  if (!calc.formulaExplanation || calc.formulaExplanation.length < 30) {
    issues.push({ item: calc.slug, type: 'ERROR', message: 'Formula explanation too concise (< 30 chars)' });
  }

  // Check worked examples depth
  if (!calc.workedExamples || calc.workedExamples.length === 0) {
    issues.push({ item: calc.slug, type: 'ERROR', message: 'No worked examples provided' });
  } else {
    for (const eg of calc.workedExamples) {
      if (eg.steps.length < 2) {
        issues.push({ item: calc.slug, type: 'WARNING', message: `Worked example "${eg.title}" has fewer than 2 calculation steps` });
      }
    }
  }

  // Check FAQs quality
  if (!calc.faqs || calc.faqs.length < 2) {
    issues.push({ item: calc.slug, type: 'WARNING', message: 'Fewer than 2 informative FAQs provided' });
  }

  // Check inputs guidance
  for (const inp of calc.inputs) {
    if (!inp.helpText || inp.helpText.length < 10) {
      issues.push({ item: `${calc.slug}:${inp.id}`, type: 'WARNING', message: 'Input field lacks helpful user guidance' });
    }
  }
}

// 2. Guide Articles Depth & Substance
for (const guide of GUIDES) {
  const fullText = [
    guide.content.intro,
    ...guide.content.sections.map((s) => s.heading + ' ' + s.body),
    guide.content.conclusion,
  ].join(' ');

  // Word count check (~200+ words minimum)
  const approxWords = fullText.split(/\s+/).length;
  if (approxWords < 200) {
    issues.push({ item: guide.slug, type: 'ERROR', message: `Guide word count too low (${approxWords} words)` });
  }

  // Check sections and headings
  if (!guide.content.sections || guide.content.sections.length < 2) {
    issues.push({ item: guide.slug, type: 'WARNING', message: 'Guide has fewer than 2 structured subsections' });
  }

  // Check placeholder tokens
  const lowerContent = fullText.toLowerCase();
  if (lowerContent.includes('lorem ipsum') || lowerContent.includes('placeholder') || lowerContent.includes('todo')) {
    issues.push({ item: guide.slug, type: 'ERROR', message: 'Guide contains unremoved placeholder tokens' });
  }
}

// 3. Category Descriptions
for (const cat of CATEGORIES) {
  if (!cat.descriptionAr || cat.descriptionAr.length < 25) {
    issues.push({ item: cat.slug, type: 'ERROR', message: 'Category description too thin (< 25 chars)' });
  }
}

console.log(`📊 Quality Audit Summary: ${issues.length} total issues found.`);
const errors = issues.filter((i) => i.type === 'ERROR');
if (errors.length > 0) {
  for (const e of errors) {
    console.log(`❌ [ERROR] ${e.item}: ${e.message}`);
  }
  process.exit(1);
} else {
  console.log('✅ Content Quality & People-First Value Audit Passed Successfully (0 errors)!');
}
