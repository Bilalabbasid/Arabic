import fs from 'fs';
import path from 'path';
import { ALL_COUNTRY_CODES, getCountryData } from '../src/data/countries';
import { ALL_CALCULATORS } from '../src/data/calculators';
import { getGatingDetails } from '../src/lib/seo/gating';

async function main() {
  const rows: string[] = [
    [
      'country_code',
      'country_name_ar',
      'calculator_slug',
      'calculator_name_ar',
      'is_indexable',
      'word_count',
      'has_2_worked_examples',
      'rules_verified',
      'is_fresh',
      'reason',
    ].join(','),
  ];

  let totalPages = 0;
  let indexablePages = 0;
  let noindexPages = 0;

  for (const cCode of ALL_COUNTRY_CODES) {
    const country = getCountryData(cCode);
    const countryName = country?.basics.nameAr || cCode;

    for (const calc of ALL_CALCULATORS) {
      totalPages++;
      const gating = getGatingDetails({ countryCode: cCode, calculatorSlug: calc.slug });

      if (gating.isIndexable) {
        indexablePages++;
      } else {
        noindexPages++;
      }

      const escapedReason = gating.reason ? `"${gating.reason.replace(/"/g, '""')}"` : '';
      const escapedCalcName = `"${calc.nameAr.replace(/"/g, '""')}"`;
      const escapedCountryName = `"${countryName.replace(/"/g, '""')}"`;

      rows.push(
        [
          cCode,
          escapedCountryName,
          calc.slug,
          escapedCalcName,
          gating.isIndexable ? 'true' : 'false',
          gating.wordCount,
          gating.hasTwoWorkedExamples ? 'true' : 'false',
          gating.requiredRulesVerified ? 'true' : 'false',
          gating.isFresh ? 'true' : 'false',
          escapedReason,
        ].join(',')
      );
    }
  }

  const outDir = path.join(process.cwd(), 'seo-audit');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'gating-matrix.csv');
  fs.writeFileSync(outPath, '\uFEFF' + rows.join('\n'), 'utf8');

  console.log(`Successfully generated seo-audit/gating-matrix.csv`);
  console.log(`Total combinations: ${totalPages}`);
  console.log(`Indexable: ${indexablePages}`);
  console.log(`Noindex: ${noindexPages}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
