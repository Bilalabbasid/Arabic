import fs from 'fs';
import path from 'path';
import { ALL_CALCULATORS } from '../src/data/calculators';
import { getDisclaimerForCalculator } from '../src/components/calculator/ResultDisclaimer';

interface Row {
  calculator_slug: string;
  disclaimer_type: string;
  disclaimer_text: string;
  source_authority: string;
  source_url: string;
  last_checked: string;
}

const rows: Row[] = [];

for (const calc of ALL_CALCULATORS) {
  const disclaimer = getDisclaimerForCalculator(calc.slug, 'SA');
  rows.push({
    calculator_slug: calc.slug,
    disclaimer_type: disclaimer.disclaimerType,
    disclaimer_text: `"${disclaimer.disclaimerText.replace(/"/g, '""')}"`,
    source_authority: `"${disclaimer.authority.replace(/"/g, '""')}"`,
    source_url: disclaimer.sourceUrl,
    last_checked: disclaimer.lastChecked,
  });
}

const csvHeader = 'calculator_slug,disclaimer_type,disclaimer_text,source_authority,source_url,last_checked\n';
const csvContent = csvHeader + rows.map((r) => `${r.calculator_slug},${r.disclaimer_type},${r.disclaimer_text},${r.source_authority},${r.source_url},${r.last_checked}`).join('\n');

const outPath = path.join(process.cwd(), 'seo-audit/disclaimer-mapping.csv');
fs.writeFileSync(outPath, csvContent, 'utf8');
console.log('Successfully wrote', rows.length, 'disclaimers to', outPath);
