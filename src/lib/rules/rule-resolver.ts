import {
  CountryRegulatedRule,
  RuleResolutionQuery,
  RuleResolutionResult,
} from '@/types/rule';

import { SA_ELECTRICITY_RULES } from '@/countries/sa/electricity/rules';
import { SA_EMPLOYMENT_RULES } from '@/countries/sa/employment/rules';
import { SA_TAX_RULES } from '@/countries/sa/tax/rules';
import { SA_CUSTOMS_RULES } from '@/countries/sa/customs/rules';

import { AE_ELECTRICITY_RULES } from '@/countries/ae/electricity/rules';
import { AE_EMPLOYMENT_RULES } from '@/countries/ae/employment/rules';
import { AE_TAX_RULES } from '@/countries/ae/tax/rules';
import { AE_CUSTOMS_RULES } from '@/countries/ae/customs/rules';

import { EG_ELECTRICITY_RULES } from '@/countries/eg/electricity/rules';
import { EG_EMPLOYMENT_RULES } from '@/countries/eg/employment/rules';
import { EG_TAX_RULES } from '@/countries/eg/tax/rules';

// Aggregated Master Registry of Country Rules
export const ALL_COUNTRY_RULES: CountryRegulatedRule<any>[] = [
  ...SA_ELECTRICITY_RULES,
  ...SA_EMPLOYMENT_RULES,
  ...SA_TAX_RULES,
  ...SA_CUSTOMS_RULES,
  ...AE_ELECTRICITY_RULES,
  ...AE_EMPLOYMENT_RULES,
  ...AE_TAX_RULES,
  ...AE_CUSTOMS_RULES,
  ...EG_ELECTRICITY_RULES,
  ...EG_EMPLOYMENT_RULES,
  ...EG_TAX_RULES,
];

/**
 * Resolves the legally applicable and approved rule version for a given country,
 * jurisdiction, provider, customer category, and effective date.
 * 
 * Strict Guarantees:
 * - NEVER falls back silently to another country's rules (e.g. Saudi rules will NEVER be used for UAE).
 * - NEVER invents or guesses missing parameters.
 * - Enforces effective date boundary validity (effectiveFrom <= date <= effectiveTo).
 * - Enforces APPROVED verification status.
 */
export function resolveApplicableRule<TParams = Record<string, any>>(
  query: RuleResolutionQuery
): RuleResolutionResult<TParams> {
  const countryCode = query.countryCode.toUpperCase();
  const effectiveDate = query.effectiveDate || new Date().toISOString().slice(0, 10);

  // 1. Filter candidates matching country and calculator
  const candidates = ALL_COUNTRY_RULES.filter(
    (r) =>
      r.countryCode.toUpperCase() === countryCode &&
      r.calculatorId === query.calculatorId
  );

  if (candidates.length === 0) {
    return {
      isAvailable: false,
      unavailableReason: `لا توجد لوائح نظامية معتمدة لهذه الحاسبة في دولة (${countryCode}). يرجى استخدام الحاسبة العامة التقديرية أو تحديد دولة مدعومة.`,
    };
  }

  // Collect available options for user guidance
  const availableJurisdictions = Array.from(new Set(candidates.map((c) => c.jurisdiction)));
  const availableProviders = Array.from(new Set(candidates.map((c) => c.provider).filter(Boolean))) as string[];
  const availableCategories = Array.from(new Set(candidates.map((c) => c.customerCategory).filter(Boolean))) as string[];

  // 2. Filter by provider if specified
  let filtered = candidates;
  if (query.provider) {
    filtered = filtered.filter((c) => c.provider?.toLowerCase() === query.provider?.toLowerCase());
    if (filtered.length === 0) {
      return {
        isAvailable: false,
        unavailableReason: `المزود المحدد (${query.provider}) غير متوفر حالياً ضمن لوائح ${countryCode}. المزودون المتاحون: ${availableProviders.join(', ')}.`,
        availableOptions: {
          jurisdictions: availableJurisdictions,
          providers: availableProviders,
          customerCategories: availableCategories,
        },
      };
    }
  }

  // 3. Filter by jurisdiction if specified
  if (query.jurisdiction) {
    filtered = filtered.filter((c) => c.jurisdiction.toLowerCase() === query.jurisdiction?.toLowerCase());
    if (filtered.length === 0) {
      return {
        isAvailable: false,
        unavailableReason: `الجهة التنظيمية المحددة (${query.jurisdiction}) غير مسجلة لدولة ${countryCode}.`,
        availableOptions: { jurisdictions: availableJurisdictions },
      };
    }
  }

  // 4. Filter by customerCategory if specified
  if (query.customerCategory) {
    filtered = filtered.filter((c) => !c.customerCategory || c.customerCategory === query.customerCategory);
  }

  // 5. Date-sensitive version matching
  const dateMatched = filtered.filter((r) => {
    const afterStart = r.effectiveFrom <= effectiveDate;
    const beforeEnd = !r.effectiveTo || r.effectiveTo >= effectiveDate;
    return afterStart && beforeEnd;
  });

  if (dateMatched.length === 0) {
    return {
      isAvailable: false,
      unavailableReason: `لا توجد لائحة سارية بتاريخ (${effectiveDate}) لهذا التصنيف في ${countryCode}.`,
    };
  }

  // 6. Check for conflicting overlapping rules
  if (dateMatched.length > 1) {
    // Check if one is more specific (has matching customerCategory and provider)
    const exactMatch = dateMatched.find(
      (r) =>
        (!query.provider || r.provider === query.provider) &&
        (!query.customerCategory || r.customerCategory === query.customerCategory)
    );

    if (exactMatch && dateMatched.filter(r => r.customerCategory === exactMatch.customerCategory && r.provider === exactMatch.provider).length === 1) {
      dateMatched.splice(0, dateMatched.length, exactMatch);
    } else {
      return {
        isAvailable: false,
        unavailableReason: `تم رصد تعارض بين أكثر من قاعدة تنظيمية لنفس التاريخ والجهة (${countryCode} - ${query.calculatorId}). تم إيقاف الحساب تلقائياً للتحقق البشري.`,
      };
    }
  }

  const selectedRule = dateMatched[0];

  // 7. Verify Approval Status
  if (selectedRule.verificationStatus !== 'APPROVED') {
    return {
      isAvailable: false,
      unavailableReason: `اللائحة الخاصة بـ (${selectedRule.ruleId}) قيد المراجعة والتدقيق الإداري (الحالة: ${selectedRule.verificationStatus}) ولم يتم اعتمادها للنشر بعد.`,
    };
  }

  return {
    isAvailable: true,
    rule: selectedRule as CountryRegulatedRule<TParams>,
    availableOptions: {
      jurisdictions: availableJurisdictions,
      providers: availableProviders,
      customerCategories: availableCategories,
    },
  };
}

