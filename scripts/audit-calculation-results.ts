import { ALL_CALCULATORS } from '../src/data/calculators';
import { COUNTRIES } from '../src/data/countries';

interface CalculationFinding {
  severity: 'Critical' | 'High';
  calculatorSlug: string;
  testCase: string;
  issue: string;
}

const findings: CalculationFinding[] = [];

console.log('============================================================');
console.log(`[AUDIT 4/4] تدقيق متانة العمليات الحسابية ومنع أخطاء NaN والانقسام على صفر`);
console.log('============================================================');

ALL_CALCULATORS.forEach((calc) => {
  const defaultInputs: Record<string, any> = {};
  calc.inputs.forEach((inp) => {
    defaultInputs[inp.id] = inp.defaultValue;
  });

  // Test 1: Baseline Default Run
  try {
    const res = calc.calculate(defaultInputs);
    if (res.primary && typeof res.primary.value === 'number') {
      if (isNaN(res.primary.value) || !isFinite(res.primary.value)) {
        findings.push({
          severity: 'Critical',
          calculatorSlug: calc.slug,
          testCase: 'Default Inputs',
          issue: `النتيجة تحتوي على NaN أو Infinity: ${res.primary.value}`,
        });
      }
    }
  } catch (err: any) {
    findings.push({
      severity: 'Critical',
      calculatorSlug: calc.slug,
      testCase: 'Default Inputs Exception',
      issue: err?.message,
    });
  }

  // Test 2: Zero Values Test
  const zeroInputs: Record<string, any> = { ...defaultInputs };
  calc.inputs.forEach((inp) => {
    if (inp.type === 'number' || inp.type === 'decimal' || inp.type === 'currency' || inp.type === 'percentage') {
      zeroInputs[inp.id] = 0;
    }
  });

  try {
    const zeroRes = calc.calculate(zeroInputs);
    if (zeroRes.primary && typeof zeroRes.primary.value === 'number') {
      if (isNaN(zeroRes.primary.value) || !isFinite(zeroRes.primary.value)) {
        findings.push({
          severity: 'Critical',
          calculatorSlug: calc.slug,
          testCase: 'Zero Inputs Division',
          issue: `إدخال الأصفار تسبب في نتيجة NaN أو قسمة على صفر: ${zeroRes.primary.value}`,
        });
      }
    }
  } catch (err: any) {
    findings.push({
      severity: 'Critical',
      calculatorSlug: calc.slug,
      testCase: 'Zero Inputs Crash',
      issue: err?.message,
    });
  }

  // Test 3: Large Values / Stress Test
  const largeInputs: Record<string, any> = { ...defaultInputs };
  calc.inputs.forEach((inp) => {
    if (inp.type === 'number' || inp.type === 'decimal' || inp.type === 'currency') {
      largeInputs[inp.id] = 10000000;
    }
  });

  try {
    const largeRes = calc.calculate(largeInputs);
    if (largeRes.primary && typeof largeRes.primary.value === 'number') {
      if (isNaN(largeRes.primary.value)) {
        findings.push({
          severity: 'Critical',
          calculatorSlug: calc.slug,
          testCase: 'Large Numbers',
          issue: `القيم الكبيرة تسببت في NaN: ${largeRes.primary.value}`,
        });
      }
    }
  } catch (err: any) {
    findings.push({
      severity: 'Critical',
      calculatorSlug: calc.slug,
      testCase: 'Large Numbers Crash',
      issue: err?.message,
    });
  }

  // Test 4: Multi-Country Context Matrix
  const sampleCountries = ['SA', 'AE', 'EG', 'KW', 'QA', 'OM'];
  sampleCountries.forEach((cCode) => {
    try {
      const countryRes = calc.calculate(defaultInputs, { countryCode: cCode });
      if (countryRes.primary && typeof countryRes.primary.value === 'number') {
        if (isNaN(countryRes.primary.value)) {
          findings.push({
            severity: 'Critical',
            calculatorSlug: calc.slug,
            testCase: `Country Context (${cCode})`,
            issue: `التبديل لدولة ${cCode} أرجع قيمة NaN`,
          });
        }
      }
    } catch (err: any) {
      findings.push({
        severity: 'Critical',
        calculatorSlug: calc.slug,
        testCase: `Country Context Crash (${cCode})`,
        issue: err?.message,
      });
    }
  });
});

console.log(`إجمالي الملاحظات المكتشفة: ${findings.length}`);
if (findings.length > 0) {
  findings.forEach((f) => {
    console.log(`[${f.severity}] ${f.calculatorSlug} (${f.testCase}): ${f.issue}`);
  });
  if (findings.some((f) => f.severity === 'Critical')) {
    process.exit(1);
  }
} else {
  console.log('✓ نجح تدقيق متانة العمليات الحسابية بنسبة 100%! لا يوجد أي انهيار برمجي أو نتائج غير معرفة (NaN).');
}
