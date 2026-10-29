import { ALL_COUNTRY_RULES } from '../src/lib/rules/rule-resolver';
import { COUNTRIES } from '../src/data/countries';
import { SOURCES } from '../src/data/sources';

interface Finding {
  severity: 'Critical' | 'High' | 'Medium';
  ruleId: string;
  issue: string;
}

const findings: Finding[] = [];

console.log('============================================================');
console.log(`[AUDIT 2/4] تدقيق القواعد التنظيمية للدول: ${ALL_COUNTRY_RULES.length} قاعدة`);
console.log('============================================================');

const countryCodes = new Set(COUNTRIES.map((c) => c.countryCode.toUpperCase()));
const sourceIds = new Set(SOURCES.map((s) => s.id));
const ruleIdSet = new Set<string>();

ALL_COUNTRY_RULES.forEach((rule) => {
  // 1. Duplicate rule ID
  if (ruleIdSet.has(rule.ruleId)) {
    findings.push({
      severity: 'Critical',
      ruleId: rule.ruleId,
      issue: 'معرف القاعدة مكرر في السجل',
    });
  }
  ruleIdSet.add(rule.ruleId);

  // 2. Country code validity
  if (!countryCodes.has(rule.countryCode.toUpperCase())) {
    findings.push({
      severity: 'Critical',
      ruleId: rule.ruleId,
      issue: `كود الدولة (${rule.countryCode}) غير مسجل في سجل الدول الـ 22`,
    });
  }

  // 3. Date validity & ordering
  if (!/^\d{4}-\d{2}-\d{2}$/.test(rule.effectiveFrom)) {
    findings.push({
      severity: 'Critical',
      ruleId: rule.ruleId,
      issue: `تنسيق تاريخ السريان (${rule.effectiveFrom}) غير مطابق لمعيار YYYY-MM-DD`,
    });
  }

  if (rule.effectiveTo) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(rule.effectiveTo)) {
      findings.push({
        severity: 'Critical',
        ruleId: rule.ruleId,
        issue: `تنسيق تاريخ انتهاء السريان (${rule.effectiveTo}) غير مطابق لمعيار YYYY-MM-DD`,
      });
    }
    if (rule.effectiveFrom > rule.effectiveTo) {
      findings.push({
        severity: 'Critical',
        ruleId: rule.ruleId,
        issue: `تاريخ السريان (${rule.effectiveFrom}) متأخر عن تاريخ الانتهاء (${rule.effectiveTo})`,
      });
    }
  }

  // 4. Source IDs existence
  if (!rule.sourceIds || rule.sourceIds.length === 0) {
    findings.push({
      severity: 'High',
      ruleId: rule.ruleId,
      issue: 'لا يوجد أي مصادر رسمية مرفقة بهذه القاعدة التنظيمية',
    });
  } else {
    rule.sourceIds.forEach((sId) => {
      if (!sourceIds.has(sId)) {
        findings.push({
          severity: 'Critical',
          ruleId: rule.ruleId,
          issue: `المصدر المرجعي (${sId}) غير مسجل في سجل المصادر الرسمية SOURCES`,
        });
      }
    });
  }

  // 5. Approved review check
  if (rule.verificationStatus === 'APPROVED' && !rule.approvedBy) {
    findings.push({
      severity: 'High',
      ruleId: rule.ruleId,
      issue: 'القاعدة معتمدة (APPROVED) ولكن يفتقر سجلها إلى توثيق اسم المدقق/المراجع (approvedBy)',
    });
  }
});

// 6. Check for overlapping conflicting rules
for (let i = 0; i < ALL_COUNTRY_RULES.length; i++) {
  for (let j = i + 1; j < ALL_COUNTRY_RULES.length; j++) {
    const a = ALL_COUNTRY_RULES[i];
    const b = ALL_COUNTRY_RULES[j];

    if (
      a.countryCode === b.countryCode &&
      a.calculatorId === b.calculatorId &&
      a.jurisdiction === b.jurisdiction &&
      a.provider === b.provider &&
      a.customerCategory === b.customerCategory
    ) {
      // Check date collision
      const aStart = a.effectiveFrom;
      const aEnd = a.effectiveTo || '9999-12-31';
      const bStart = b.effectiveFrom;
      const bEnd = b.effectiveTo || '9999-12-31';

      const overlaps = Math.max(aStart.localeCompare(bStart), bStart.localeCompare(aStart)) <= 0
        ? true
        : aStart <= bEnd && bStart <= aEnd;

      if (overlaps) {
        findings.push({
          severity: 'Critical',
          ruleId: `${a.ruleId} vs ${b.ruleId}`,
          issue: `تم رصد تعارض زمني بين قاعدتين لنفس الفئة والمزود (${a.effectiveFrom}..${a.effectiveTo || 'current'} مع ${b.effectiveFrom}..${b.effectiveTo || 'current'})`,
        });
      }
    }
  }
}

console.log(`إجمالي الملاحظات المكتشفة: ${findings.length}`);
if (findings.length > 0) {
  findings.forEach((f) => {
    console.log(`[${f.severity}] ${f.ruleId}: ${f.issue}`);
  });
  if (findings.some((f) => f.severity === 'Critical')) {
    process.exit(1);
  }
} else {
  console.log('✓ نجح تدقيق القواعد التنظيمية للدول بنسبة 100%! لا يوجد أي تعارض أو أخطاء تاريخية.');
}
