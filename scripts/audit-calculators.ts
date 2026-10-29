import { ALL_CALCULATORS } from '../src/data/calculators';
import { CATEGORIES } from '../src/data/categories';
import { COUNTRIES } from '../src/data/countries';
import { SOURCES } from '../src/data/sources';

interface AuditFinding {
  severity: 'Critical' | 'High' | 'Medium' | 'Informational';
  calculatorSlug: string;
  issue: string;
  details?: string;
}

const findings: AuditFinding[] = [];

console.log('------------------------------------------------------------');
console.log(`بدء التدقيق الآلي لمنصة lsayartk.com عبر ${ALL_CALCULATORS.length} حاسبة...`);
console.log('------------------------------------------------------------');

const categoryIds = new Set(CATEGORIES.map((c) => c.id));
const countryCodes = new Set(COUNTRIES.map((c) => c.countryCode.toUpperCase()));
const sourceIds = new Set(SOURCES.map((s) => s.id));
const seenSlugs = new Set<string>();

ALL_CALCULATORS.forEach((calc) => {
  // 1. Slug uniqueness
  if (seenSlugs.has(calc.slug)) {
    findings.push({
      severity: 'Critical',
      calculatorSlug: calc.slug,
      issue: 'معرف الحاسبة مكرر (Duplicate slug)',
    });
  }
  seenSlugs.add(calc.slug);

  // 2. Category validity
  if (!categoryIds.has(calc.category)) {
    findings.push({
      severity: 'Critical',
      calculatorSlug: calc.slug,
      issue: `القسم المرفق (${calc.category}) غير مسجل في فئات المنصة الرسمية`,
    });
  }

  // 3. Supported countries validity
  calc.supportedCountries.forEach((c) => {
    if (c !== '*' && !countryCodes.has(c.toUpperCase())) {
      findings.push({
        severity: 'High',
        calculatorSlug: calc.slug,
        issue: `كود الدولة (${c}) غير معتمد في سجل الدول العربية الـ 22`,
      });
    }
  });

  // 4. Source IDs validity
  calc.sourceIds.forEach((sId) => {
    if (!sourceIds.has(sId)) {
      findings.push({
        severity: 'High',
        calculatorSlug: calc.slug,
        issue: `معرف المصدر (${sId}) غير مسجل في سجل المصادر الرسمية`,
      });
    }
  });

  // 5. Input default values & sanity checks
  const defaultInputs: Record<string, any> = {};
  calc.inputs.forEach((inp) => {
    if (inp.defaultValue === undefined || inp.defaultValue === null) {
      findings.push({
        severity: 'Critical',
        calculatorSlug: calc.slug,
        issue: `الحقل (${inp.id}) يفتقر إلى قيمة افتراضية defaultValue`,
      });
    }
    defaultInputs[inp.id] = inp.defaultValue;
  });

  // 6. Execution verification on default inputs
  try {
    const result = calc.calculate(defaultInputs);
    if (!result || !result.primary || result.primary.value === undefined) {
      findings.push({
        severity: 'Critical',
        calculatorSlug: calc.slug,
        issue: 'دالة الحساب لم تعد نتيجة أولية صالحة بالقيم الافتراضية',
      });
    }
  } catch (err: any) {
    findings.push({
      severity: 'Critical',
      calculatorSlug: calc.slug,
      issue: 'دالة الحساب أطلقت استثناء خطأ عند تشغيلها بالقيم الافتراضية',
      details: err?.message,
    });
  }

  // 7. Worked examples check
  if (!calc.workedExamples || calc.workedExamples.length === 0) {
    findings.push({
      severity: 'Medium',
      calculatorSlug: calc.slug,
      issue: 'لا يوجد أمثلة عملية توضيحية لهذه الحاسبة',
    });
  }

  // 8. FAQs check
  if (!calc.faqs || calc.faqs.length === 0) {
    findings.push({
      severity: 'Medium',
      calculatorSlug: calc.slug,
      issue: 'لا توجد أسئلة شائعة مخصصة لهذه الحاسبة',
    });
  }
});

// 9. Related calculator links check
ALL_CALCULATORS.forEach((calc) => {
  calc.relatedCalculatorIds.forEach((relId) => {
    if (!seenSlugs.has(relId)) {
      findings.push({
        severity: 'High',
        calculatorSlug: calc.slug,
        issue: `الحاسبة المرتبطة (${relId}) غير موجودة في سجل الحاسبات`,
      });
    }
  });
});

console.log(`تم فحص ${ALL_CALCULATORS.length} حاسبة، ${CATEGORIES.length} قسماً، و ${COUNTRIES.length} دولة.`);
console.log(`إجمالي الملاحظات المكتشفة: ${findings.length}`);

if (findings.length > 0) {
  console.log('\nتفاصيل الملاحظات:');
  findings.forEach((f) => {
    console.log(`[${f.severity}] ${f.calculatorSlug}: ${f.issue} ${f.details ? `(${f.details})` : ''}`);
  });
  if (findings.some((f) => f.severity === 'Critical')) {
    process.exit(1);
  }
} else {
  console.log('✓ نجح التدقيق الآلي بنسبة 100%! جميع الحاسبات والروابط والمعادلات سليمة تماماً.');
}
