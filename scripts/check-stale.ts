import { ALL_COUNTRY_CODES, getCountryData } from '../src/data/countries';
import { CountryData } from '../src/data/countries/types';

interface StaleRuleReport {
  countryCode: string;
  countryName: string;
  ruleKey: string;
  status: string;
  authority?: string;
  sourceUrl?: string;
  checkedAt?: string;
  ageDays: number;
  staleAfterDays: number;
}

export function runFreshnessCheck(referenceDate: Date = new Date()): {
  totalRulesChecked: number;
  verifiedCount: number;
  staleRules: StaleRuleReport[];
} {
  const ruleKeys: Array<keyof Omit<CountryData, 'basics' | 'routes' | 'countryCode'>> = [
    'vat',
    'fuel',
    'electricity',
    'endOfService',
    'socialInsurance',
    'incomeTax',
    'consumerFinance',
    'vehicle',
    'zakat',
  ];

  let totalRulesChecked = 0;
  let verifiedCount = 0;
  const staleRules: StaleRuleReport[] = [];

  const refTime = referenceDate.getTime();

  for (const cCode of ALL_COUNTRY_CODES) {
    const country = getCountryData(cCode);
    if (!country) continue;

    for (const key of ruleKeys) {
      totalRulesChecked++;
      const rule = country[key] as any;
      if (!rule) continue;

      if (rule.status === 'verified') {
        verifiedCount++;
      }

      if (rule.checkedAt && rule.staleAfterDays) {
        const checkedTime = new Date(rule.checkedAt).getTime();
        const ageDays = Math.floor((refTime - checkedTime) / (1000 * 60 * 60 * 24));

        if (ageDays > rule.staleAfterDays) {
          staleRules.push({
            countryCode: cCode,
            countryName: country.basics.nameAr,
            ruleKey: String(key),
            status: rule.status,
            authority: rule.authority,
            sourceUrl: rule.sourceUrl,
            checkedAt: rule.checkedAt,
            ageDays,
            staleAfterDays: rule.staleAfterDays,
          });
        }
      }
    }
  }

  return {
    totalRulesChecked,
    verifiedCount,
    staleRules,
  };
}

async function main() {
  console.log('🔍 Checking legislative & regulatory freshness across all 22 Arab countries...');
  const result = runFreshnessCheck();

  console.log(`✓ Scanned ${result.totalRulesChecked} rules across ${ALL_COUNTRY_CODES.length} countries.`);
  console.log(`✓ Total verified rules: ${result.verifiedCount}`);

  if (result.staleRules.length > 0) {
    console.error(`\n❌ Found ${result.staleRules.length} stale rules requiring verification:`);
    console.table(result.staleRules);
    process.exit(1);
  }

  console.log('\n✅ All verified legislative and regulatory rules are fresh and within valid retention periods.');
  process.exit(0);
}

if (require.main === module || process.argv[1]?.includes('check-stale')) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
