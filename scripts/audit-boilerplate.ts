import { ALL_CALCULATORS } from '../src/data/calculators';
import { COUNTRY_CALCULATOR_CONTENT } from '../src/data/country-content';
import { GUIDES } from '../src/data/guides';
import { CATEGORIES } from '../src/data/categories';

// Collect all page texts
interface PageSnippet {
  source: string;
  text: string;
}

const pages: PageSnippet[] = [];

// Calculators
for (const calc of ALL_CALCULATORS) {
  pages.push({
    source: `calc:${calc.slug}`,
    text: `${calc.descriptionAr} ${calc.formulaExplanation} ${calc.workedExamples.map(e => e.title + ' ' + (e.steps || []).join(' ') + ' ' + e.resultSummary).join(' ')} ${calc.faqs.map(f => f.question + ' ' + f.answer).join(' ')}`
  });
}

// Country calculators
for (const [calcSlug, countries] of Object.entries(COUNTRY_CALCULATOR_CONTENT)) {
  for (const [countryCode, content] of Object.entries(countries)) {
    pages.push({
      source: `country:${countryCode}:${calcSlug}`,
      text: `${content.intro} ${content.currentRateOrRule} ${content.detailedAnalysis || ''} ${(content.exemptionsOrExclusions || []).join(' ')} ${content.workedExamples.map(e => e.title + ' ' + (e.steps || []).join(' ') + ' ' + e.resultSummary).join(' ')} ${content.faqs.map(f => f.question + ' ' + f.answer).join(' ')}`
    });
  }
}

// Guides
for (const guide of GUIDES) {
  pages.push({
    source: `guide:${guide.slug}`,
    text: `${guide.summaryAr} ${guide.content.intro} ${guide.content.sections.map(s => s.heading + ' ' + s.body).join(' ')} ${guide.content.conclusion}`
  });
}

// Extract 8-word shingles
function extractShingles(text: string, size = 8): string[] {
  // Normalize whitespace and punctuation
  const words = text
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()؟،؛"'\n\r\t]/g, ' ')
    .split(/\s+/)
    .map(w => w.trim().toLowerCase())
    .filter(w => w.length > 1);

  const shingles: string[] = [];
  for (let i = 0; i <= words.length - size; i++) {
    shingles.push(words.slice(i, i + size).join(' '));
  }
  return shingles;
}

const shingleMap = new Map<string, Set<string>>();

for (const p of pages) {
  const shingles = extractShingles(p.text, 8);
  const seenOnPage = new Set<string>();
  for (const s of shingles) {
    if (seenOnPage.has(s)) continue;
    seenOnPage.add(s);
    if (!shingleMap.has(s)) {
      shingleMap.set(s, new Set());
    }
    shingleMap.get(s)!.add(p.source);
  }
}

const duplicates: Array<{ phrase: string; count: number; pages: string[] }> = [];

for (const [phrase, pageSet] of shingleMap.entries()) {
  if (pageSet.size > 5) {
    duplicates.push({
      phrase,
      count: pageSet.size,
      pages: Array.from(pageSet)
    });
  }
}

console.log(`Analyzed ${pages.length} pages.`);
console.log(`Found ${duplicates.length} 8-word phrases appearing on > 5 pages.`);
if (duplicates.length > 0) {
  console.log('Top repeated phrases:');
  duplicates.sort((a, b) => b.count - a.count).slice(0, 10).forEach(d => {
    console.log(`- [${d.count} pages]: "${d.phrase}"`);
  });
} else {
  console.log('✅ Clean! No identical phrases > 8 words across > 5 pages.');
}
