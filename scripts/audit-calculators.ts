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

console.log('============================================================');
console.log(`[AUDIT 1/4] تدقيق تعريفات وميتاداتا الحاسبات: ${ALL_CALCULATORS.length} حاسبة`);
console.log('============================================================');

const categoryIds = new Set(CATEGORIES.map((c) => c.id));
const countryCodes = new Set(COUNTRIES.map((c) => c.countryCode.toUpperCase()));
const sourceIds = new Set(SOURCES.map((s) => s.id));
const seenSlugs = new Set<string>();

ALL_CALCULATORS.forEach((calc) => {
  // 1. Duplicate slug
  if (seenSlugs.has(calc.slug)) {
    findings.push({
      severity: 'Critical',
      calculatorSlug: calc.slug,
      issue: 'معرف الحاسبة مكرر (Duplicate slug)',
    });
  }
  seenSlugs.add(calc.slug);

  // 2. Category existence
  if (!categoryIds.has(calc.category)) {
    findings.push({
      severity: 'Critical',
      calculatorSlug: calc.slug,
      issue: `القسم المرفق (${calc.category}) غير مسجل في فئات المنصة`,
    });
  }

  // 3. SEO Metadata check
  if (!calc.metaTitle || calc.metaTitle.length < 15) {
    findings.push({
      severity: 'High',
      calculatorSlug: calc.slug,
      issue: 'عنوان الميتا (metaTitle) مفقود أو قصير جداً',
    });
  }

  if (!calc.metaDescription || calc.metaDescription.length < 30) {
    findings.push({
      severity: 'High',
      calculatorSlug: calc.slug,
      issue: 'وصف الميتا (metaDescription) مفقود أو قصير جداً',
    });
  }

  // 4. Formula & Explanation check
  if (!calc.formula || calc.formula.trim().length === 0) {
    findings.push({
      severity: 'Critical',
      calculatorSlug: calc.slug,
      issue: 'المعادلة الرياضية (formula) مفقودة',
    });
  }

  if (!calc.formulaExplanation || calc.formulaExplanation.trim().length === 0) {
    findings.push({
      severity: 'High',
      calculatorSlug: calc.slug,
      issue: 'شرح وتوضيح المعادلة مفقود',
    });
  }

  // 5. Inputs validation
  if (!calc.inputs || calc.inputs.length === 0) {
    findings.push({
      severity: 'Critical',
      calculatorSlug: calc.slug,
      issue: 'لا توجد أي حقول إدخال معرفة للحاسبة',
    });
  }

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

  // 6. Test default calculation run
  try {
    const result = calc.calculate(defaultInputs);
    if (!result || !result.primary || result.primary.value === undefined) {
      findings.push({
        severity: 'Critical',
        calculatorSlug: calc.slug,
        issue: 'دالة الحساب لم تعد نتيجة صالحة بالقيم الافتراضية',
      });
    } else {
      if (typeof result.primary.value === 'number') {
        if (isNaN(result.primary.value)) {
          findings.push({
            severity: 'Critical',
            calculatorSlug: calc.slug,
            issue: 'القيمة الأساسية الناتجة هي NaN',
          });
        }
        if (!isFinite(result.primary.value)) {
          findings.push({
            severity: 'Critical',
            calculatorSlug: calc.slug,
            issue: 'القيمة الأساسية الناتجة هي ما لا نهاية (Infinity)',
          });
        }
      }
    }
  } catch (err: any) {
    findings.push({
      severity: 'Critical',
      calculatorSlug: calc.slug,
      issue: 'دالة الحساب أطلقت استثناء خطأ عند تشغيلها بالقيم الافتراضية',
      details: err?.message,
    });
  }

  // 7. Worked Examples check
  if (!calc.workedExamples || calc.workedExamples.length === 0) {
    findings.push({
      severity: 'Medium',
      calculatorSlug: calc.slug,
      issue: 'لا يوجد أمثلة عملية توضيحية',
    });
  }

  // 8. FAQs check
  if (!calc.faqs || calc.faqs.length === 0) {
    findings.push({
      severity: 'Medium',
      calculatorSlug: calc.slug,
      issue: 'لا توجد أسئلة شائعة مخصصة',
    });
  }
});

// 9. Related calculator links verification
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

console.log(`إجمالي الملاحظات المكتشفة: ${findings.length}`);
if (findings.length > 0) {
  findings.forEach((f) => {
    console.log(`[${f.severity}] ${f.calculatorSlug}: ${f.issue} ${f.details ? `(${f.details})` : ''}`);
  });
  if (findings.some((f) => f.severity === 'Critical')) {
    process.exit(1);
  }
} else {
  console.log('✓ نجح تدقيق تعريفات الحاسبات بنسبة 100%!');
}
