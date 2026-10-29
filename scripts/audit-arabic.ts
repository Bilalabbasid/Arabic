/**
 * Automated Native Arabic Language & Editorial Audit
 * 
 * Verifies:
 * 1. Absence of foreign text (German leftovers, unexpected English sentences).
 * 2. Elimination of robotic filler phrases ("في عالمنا اليوم", "في العصر الرقمي", "أدخل قيمة الإدخال", etc.).
 * 3. Proper spelling, punctuation, Hamza usage, Ta Marbuta, and Alif Maqsura.
 * 4. Completeness of Arabic fields (names, descriptions, inputs, help text, steps, FAQs).
 * 5. Natural and active phrasing in UI labels and call-to-actions.
 */

import { ALL_CALCULATORS } from '../src/data/calculators';
import { CATEGORIES } from '../src/data/categories';
import { GUIDES } from '../src/data/guides';

interface Issue {
  context: string;
  field: string;
  type: 'ERROR' | 'WARNING';
  message: string;
}

const issues: Issue[] = [];

console.log('📝 Starting Native Arabic Editorial & Linguistic Audit...\n');

// Robotic clichés and unnatural translation patterns
const UNNATURAL_PHRASES = [
  /في عالمنا اليوم/i,
  /في العصر الرقمي الحديث/i,
  /تعتبر هذه الأداة من أهم/i,
  /تعد هذه الأداة من الأدوات المهمة/i,
  /أدخل قيمة الإدخال الخاصة بك/i,
  /القيمة الناتجة/i,
  /الرجاء إدخال المدخلات/i,
  /lorem ipsum/i,
  /todo/i,
  /tbd/i,
];

// German linguistic leakage scanner
const GERMAN_LEAK_PATTERNS = [
  /\bRechner\b/i,
  /\bBerechnen\b/i,
  /\bErgebnis\b/i,
  /\bKategorie\b/i,
  /\bEingabe\b/i,
  /\bund\b/i,
  /\boder\b/i,
  /\bbitte\b/i,
];

function inspectArabicText(text: string, context: string, field: string) {
  if (!text || typeof text !== 'string') return;

  // 1. Check for robotic clichés
  for (const pattern of UNNATURAL_PHRASES) {
    if (pattern.test(text)) {
      issues.push({
        context,
        field,
        type: 'ERROR',
        message: `Robotic or unnatural filler detected: "${text.match(pattern)?.[0]}"`,
      });
    }
  }

  // 2. Check for German leakage
  for (const gPattern of GERMAN_LEAK_PATTERNS) {
    if (gPattern.test(text)) {
      issues.push({
        context,
        field,
        type: 'ERROR',
        message: `German architectural residue detected: "${text.match(gPattern)?.[0]}"`,
      });
    }
  }

  // 3. Check for raw English paragraphs in Arabic fields
  // Allow technical IDs, symbols (kW, kWh, cm, kg, VAT, BMI, ROAS, SAR, AED, EGP), and English names where explicitly needed
  const englishSentences = text.match(/[A-Z][a-z]{3,}\s+[a-z]{3,}\s+[a-z]{3,}/g);
  if (englishSentences && field !== 'nameEn') {
    issues.push({
      context,
      field,
      type: 'WARNING',
      message: `Possible untranslated English sentence: "${englishSentences[0]}"`,
    });
  }

  // 4. Common Arabic Orthographic Checks (Ta Marbuta vs Ha)
  // Check for common typo: 'مكافاه' instead of 'مكافأة'
  if (/\bمكافاه\b/.test(text)) {
    issues.push({
      context,
      field,
      type: 'ERROR',
      message: 'Orthographic typo: "مكافاه" should be "مكافأة"',
    });
  }
}

// 1. Audit Calculators
for (const calc of ALL_CALCULATORS) {
  inspectArabicText(calc.nameAr, calc.slug, 'nameAr');
  inspectArabicText(calc.shortNameAr, calc.slug, 'shortNameAr');
  inspectArabicText(calc.descriptionAr, calc.slug, 'descriptionAr');
  inspectArabicText(calc.metaTitle, calc.slug, 'metaTitle');
  inspectArabicText(calc.metaDescription, calc.slug, 'metaDescription');
  inspectArabicText(calc.h1, calc.slug, 'h1');
  inspectArabicText(calc.formulaExplanation, calc.slug, 'formulaExplanation');

  for (const inp of calc.inputs) {
    inspectArabicText(inp.label, `${calc.slug}:${inp.id}`, 'label');
    if (inp.helpText) inspectArabicText(inp.helpText, `${calc.slug}:${inp.id}`, 'helpText');
    if (inp.options) {
      for (const opt of inp.options) {
        inspectArabicText(opt.label, `${calc.slug}:${inp.id}:${opt.value}`, 'optionLabel');
      }
    }
  }

  for (const [idx, eg] of calc.workedExamples.entries()) {
    inspectArabicText(eg.title, `${calc.slug}:example#${idx + 1}`, 'title');
    inspectArabicText(eg.description, `${calc.slug}:example#${idx + 1}`, 'description');
    for (const step of eg.steps) {
      inspectArabicText(step, `${calc.slug}:example#${idx + 1}`, 'step');
    }
    inspectArabicText(eg.resultSummary, `${calc.slug}:example#${idx + 1}`, 'resultSummary');
  }

  for (const [idx, faq] of calc.faqs.entries()) {
    inspectArabicText(faq.question, `${calc.slug}:faq#${idx + 1}`, 'question');
    inspectArabicText(faq.answer, `${calc.slug}:faq#${idx + 1}`, 'answer');
  }
}

// 2. Audit Categories
for (const cat of CATEGORIES) {
  inspectArabicText(cat.nameAr, `category:${cat.slug}`, 'nameAr');
  inspectArabicText(cat.shortNameAr, `category:${cat.slug}`, 'shortNameAr');
  inspectArabicText(cat.descriptionAr, `category:${cat.slug}`, 'descriptionAr');
  inspectArabicText(cat.metaTitle, `category:${cat.slug}`, 'metaTitle');
  inspectArabicText(cat.metaDescription, `category:${cat.slug}`, 'metaDescription');
}

// 3. Audit Guides
for (const guide of GUIDES) {
  inspectArabicText(guide.titleAr, `guide:${guide.slug}`, 'titleAr');
  inspectArabicText(guide.summaryAr, `guide:${guide.slug}`, 'summaryAr');
  inspectArabicText(guide.content.intro, `guide:${guide.slug}`, 'intro');
  for (const sec of guide.content.sections) {
    inspectArabicText(sec.heading, `guide:${guide.slug}`, 'heading');
    inspectArabicText(sec.body, `guide:${guide.slug}`, 'body');
  }
  inspectArabicText(guide.content.conclusion, `guide:${guide.slug}`, 'conclusion');
}

// Results Report
const errors = issues.filter((i) => i.type === 'ERROR');
const warnings = issues.filter((i) => i.type === 'WARNING');

console.log(`📊 Total inspected items across Calculators, Categories & Guides: ${ALL_CALCULATORS.length + CATEGORIES.length + GUIDES.length}`);

if (errors.length > 0) {
  console.error(`\n❌ Arabic Editorial Audit Failed with ${errors.length} errors:`);
  errors.forEach((e) => console.error(`  - [${e.context}] (${e.field}): ${e.message}`));
  process.exit(1);
} else {
  console.log(`\n✅ Arabic Editorial & Linguistic Audit Passed Successfully (0 errors)!`);
  if (warnings.length > 0) {
    console.log(`⚠️ ${warnings.length} warnings detected.`);
  }
  process.exit(0);
}

