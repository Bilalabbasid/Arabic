import { describe, it, expect } from 'vitest';
import { ALL_COUNTRY_RULES } from '@/lib/rules/rule-resolver';
import { getSourceById } from '@/data/sources';
import { ALL_CALCULATORS } from '@/data/calculators';

describe('Regulated rules registry', () => {
  it('every rule cites sources that exist in the source registry', () => {
    for (const rule of ALL_COUNTRY_RULES) {
      for (const id of rule.sourceIds) {
        expect(getSourceById(id), `${rule.ruleId} cites unknown source "${id}"`).toBeDefined();
      }
    }
  });

  it('every COUNTRY_REGULATED calculator has at least one APPROVED rule', () => {
    const regulated = ALL_CALCULATORS.filter((c) => c.countryMode === 'COUNTRY_REGULATED');
    for (const calc of regulated) {
      const approved = ALL_COUNTRY_RULES.filter((r) => r.calculatorId === calc.id && r.verificationStatus === 'APPROVED');
      expect(approved.length, `${calc.slug} has no approved rule`).toBeGreaterThan(0);
    }
  });

  it('approved rules carry the values the calculators actually use (no empty parameters)', () => {
    for (const rule of ALL_COUNTRY_RULES.filter((r) => r.verificationStatus === 'APPROVED')) {
      const values = Object.values(rule.parameters).filter((v) => v !== undefined);
      expect(values.length, `${rule.ruleId} has no parameters`).toBeGreaterThan(0);
    }
  });
});
