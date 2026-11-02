import fs from 'fs';
import path from 'path';
import { CountryData, CountryCode } from '../src/data/countries/types';
import { gccCountries } from './data/gcc';
import { levantNileCountries } from './data/levant-nile';
import { maghrebCountries } from './data/maghreb';
import { hornComorosCountries } from './data/horn-comoros';

const allCountries: Record<string, CountryData> = {
  ...gccCountries,
  ...levantNileCountries,
  ...maghrebCountries,
  ...hornComorosCountries,
};

const EXPECTED_COUNTRIES: CountryCode[] = [
  'sa', 'ae', 'kw', 'qa', 'bh', 'om',
  'eg', 'jo', 'lb', 'sy', 'iq', 'ye', 'ps', 'sd',
  'ma', 'dz', 'tn', 'ly', 'mr',
  'so', 'dj', 'km',
];

console.log(`Checking countries count: ${Object.keys(allCountries).length}/22`);
for (const code of EXPECTED_COUNTRIES) {
  if (!allCountries[code]) {
    throw new Error(`Missing country data for code: ${code}`);
  }
}

// 1. Write each country file: src/data/countries/{cc}/index.ts
for (const [cc, data] of Object.entries(allCountries)) {
  const dir = path.resolve(`src/data/countries/${cc}`);
  fs.mkdirSync(dir, { recursive: true });
  const fileContent = `import { CountryData } from '../types';

export const COUNTRY_DATA_${cc.toUpperCase()}: CountryData = ${JSON.stringify(data, null, 2)};

export default COUNTRY_DATA_${cc.toUpperCase()};
`;
  fs.writeFileSync(path.join(dir, 'index.ts'), fileContent, 'utf8');
}
console.log(`Successfully written 22 country index.ts files.`);

// 2. Write src/data/countries/index.ts
const mainIndexContent = `import { CountryCode, CountryData } from './types';
${EXPECTED_COUNTRIES.map((cc) => `import { COUNTRY_DATA_${cc.toUpperCase()} } from './${cc}';`).join('\n')}

export * from './types';
export * from './legacy';

export const ALL_COUNTRIES_DATA: Record<CountryCode, CountryData> = {
${EXPECTED_COUNTRIES.map((cc) => `  ${cc}: COUNTRY_DATA_${cc.toUpperCase()},`).join('\n')}
};

export const ALL_COUNTRY_CODES: CountryCode[] = [
${EXPECTED_COUNTRIES.map((cc) => `  '${cc}',`).join('\n')}
];

export function getCountryData(countryCode: string): CountryData | undefined {
  const code = countryCode.toLowerCase() as CountryCode;
  return ALL_COUNTRIES_DATA[code];
}

export function formatCountryCurrency(
  amount: number,
  countryCode: string,
  options?: { showSymbol?: boolean; showCode?: boolean }
): string {
  const country = getCountryData(countryCode);
  const minorUnits = country?.basics.currency.minorUnits ?? 2;
  const symbol = country?.basics.currency.symbolAr ?? '';
  const code = country?.basics.currency.code ?? '';

  // Use Intl with Latin digits (constraint: Western digits 0-9 sitewide)
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: minorUnits,
    maximumFractionDigits: minorUnits,
  });

  const formattedNum = formatter.format(amount);
  if (options?.showCode) {
    return \`\${formattedNum} \${code}\`;
  }
  if (options?.showSymbol === false) {
    return formattedNum;
  }
  return \`\${formattedNum} \${symbol}\`;
}
`;

fs.writeFileSync(path.resolve('src/data/countries/index.ts'), mainIndexContent, 'utf8');
console.log(`Successfully generated src/data/countries/index.ts`);

// 3. Generate seo-audit/country-data-tracker.csv
const trackerCsvRows: string[] = [];
trackerCsvRows.push('country_code,country_name_ar,field,status,value_summary,law,authority,source_url,checked_at,stale_after_days');

function escapeCsv(str?: string | number | boolean | null): string {
  if (str === undefined || str === null) return '""';
  const val = String(str).replace(/"/g, '""');
  return `"${val}"`;
}

for (const [cc, data] of Object.entries(allCountries)) {
  const nameAr = data.basics.nameAr;
  const fields: Array<{ fieldName: string; rule: any }> = [
    { fieldName: 'vat', rule: data.vat },
    { fieldName: 'incomeTax', rule: data.incomeTax },
    { fieldName: 'socialInsurance', rule: data.socialInsurance },
    { fieldName: 'endOfService', rule: data.endOfService },
    { fieldName: 'consumerFinance', rule: data.consumerFinance },
    { fieldName: 'fuel', rule: data.fuel },
    { fieldName: 'electricity', rule: data.electricity },
    { fieldName: 'vehicle', rule: data.vehicle },
    { fieldName: 'zakat', rule: data.zakat },
  ];

  for (const { fieldName, rule } of fields) {
    let summary = '';
    if (rule.status === 'not_applicable') {
      summary = rule.note || 'غير مطبق / لا توجد ضريبة';
    } else if (rule.status === 'no_official_source') {
      summary = rule.note || 'محرر / لا يوجد مصدر رسمي';
    } else if (rule.status === 'unverified') {
      summary = rule.note || 'غير مؤكد تشريعياً';
    } else if (rule.value) {
      if (fieldName === 'vat') summary = `معدل أساسي ${rule.value.standardRate}%`;
      else if (fieldName === 'incomeTax') summary = rule.value.hasPersonalIncomeTax ? `شرائح ضريبية متصاعدة` : `لا توجد ضريبة دخل`;
      else if (fieldName === 'socialInsurance') summary = `موظف ${rule.value.nationalEmployeeRate}% / صاحب عمل ${rule.value.nationalEmployerRate}% (${rule.value.agencyAcronym})`;
      else if (fieldName === 'endOfService') summary = rule.value.standardFormula;
      else if (fieldName === 'consumerFinance') summary = `سقف استقطاع ${rule.value.dbrCapPercent}% / مدة سيارات ${rule.value.maxAutoFinanceTenorYears} سنوات`;
      else if (fieldName === 'fuel') summary = `نموذج ${rule.value.pricingModel} (${Object.keys(rule.value.grades || {}).length} فئات)`;
      else if (fieldName === 'electricity') summary = `${rule.value.residentialTiers?.length || 0} شرائح سكنية`;
      else if (fieldName === 'vehicle') summary = `تسجيل ${rule.value.registrationFeeAnnual} / جمارك ${rule.value.customsDutyPercent}%`;
      else if (fieldName === 'zakat') summary = rule.value.authorityName || 'فريضة شرعية 2.5%';
    }

    trackerCsvRows.push([
      escapeCsv(cc),
      escapeCsv(nameAr),
      escapeCsv(fieldName),
      escapeCsv(rule.status),
      escapeCsv(summary),
      escapeCsv(rule.law),
      escapeCsv(rule.authority),
      escapeCsv(rule.sourceUrl),
      escapeCsv(rule.checkedAt),
      escapeCsv(rule.staleAfterDays),
    ].join(','));
  }
}

fs.writeFileSync(path.resolve('seo-audit/country-data-tracker.csv'), trackerCsvRows.join('\n'), 'utf8');
console.log(`Successfully generated seo-audit/country-data-tracker.csv with ${trackerCsvRows.length - 1} entries.`);
