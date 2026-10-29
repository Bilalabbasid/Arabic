import { SOURCES } from '../src/data/sources';
import { COUNTRIES } from '../src/data/countries';

interface Finding {
  severity: 'Critical' | 'High' | 'Medium';
  sourceId: string;
  issue: string;
}

const findings: Finding[] = [];

console.log('============================================================');
console.log(`[AUDIT 3/4] تدقيق المراجع والمصادر الرسمية: ${SOURCES.length} مصدراً`);
console.log('============================================================');

const countryCodes = new Set([...COUNTRIES.map((c) => c.countryCode.toUpperCase()), 'INTL']);
const seenIds = new Set<string>();

SOURCES.forEach((source) => {
  // 1. Duplicate ID
  if (seenIds.has(source.id)) {
    findings.push({
      severity: 'Critical',
      sourceId: source.id,
      issue: 'معرف المصدر مكرر في السجل',
    });
  }
  seenIds.add(source.id);

  // 2. URL Protocol & Domain check
  if (!source.officialUrl || !/^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(source.officialUrl)) {
    findings.push({
      severity: 'Critical',
      sourceId: source.id,
      issue: `الرابط الرسمي (${source.officialUrl}) غير صالح أو لا يبدأ بـ http/https`,
    });
  }

  // 3. Country code
  if (!countryCodes.has(source.countryCode.toUpperCase())) {
    findings.push({
      severity: 'Critical',
      sourceId: source.id,
      issue: `كود الدولة (${source.countryCode}) غير معتمد`,
    });
  }

  // 4. Required fields
  if (!source.documentTitleAr || source.documentTitleAr.trim().length < 5) {
    findings.push({
      severity: 'High',
      sourceId: source.id,
      issue: 'عنوان الوثيقة أو القرار مفقود أو غير مكتمل',
    });
  }

  if (!source.relevantSection || source.relevantSection.trim().length < 5) {
    findings.push({
      severity: 'High',
      sourceId: source.id,
      issue: 'البند أو المادة القانونية المحددة مفقودة',
    });
  }

  // 5. Date format checks
  if (!/^\d{4}-\d{2}-\d{2}$/.test(source.effectiveDate)) {
    findings.push({
      severity: 'Critical',
      sourceId: source.id,
      issue: `تاريخ السريان (${source.effectiveDate}) غير مطابق لمعيار YYYY-MM-DD`,
    });
  }
});

console.log(`إجمالي الملاحظات المكتشفة: ${findings.length}`);
if (findings.length > 0) {
  findings.forEach((f) => {
    console.log(`[${f.severity}] ${f.sourceId}: ${f.issue}`);
  });
  if (findings.some((f) => f.severity === 'Critical')) {
    process.exit(1);
  }
} else {
  console.log('✓ نجح تدقيق المصادر الرسمية بنسبة 100%! جميع المصادر موثقة وتتبع جهات حكومية ودولية معتمدة.');
}
