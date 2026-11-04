import { CountryRegulatedRule, VerificationStatus } from '@/types/rule';
import { CountryData } from '@/data/countries/types';
import { COUNTRY_DATA_SA } from '@/data/countries/sa';
import { COUNTRY_DATA_AE } from '@/data/countries/ae';
import { COUNTRY_DATA_EG } from '@/data/countries/eg';

/**
 * Approval records for the data-driven regulated calculators (fuel prices, traffic fines,
 * vehicle fees, car import customs, net salary).
 *
 * These engines read their values from `src/data/countries/*`. To avoid a second copy of the
 * numbers drifting out of sync, each rule's `parameters` are taken directly from that country
 * data; the rule records the official source, review date, approval status and limitations.
 *
 * Verified against primary sources on 2026-11-05 (see `src/data/sources.ts`). Only values
 * confirmed with high confidence are APPROVED; the rest are REVIEW_REQUIRED with the reason.
 */

const REVIEWED = '2026-11-05';
const REVIEWER = 'regulatory-audit-team';

interface RuleSpec {
  calculatorId: string;
  data: CountryData;
  jurisdiction: string;
  effectiveFrom: string;
  sourceIds: string[];
  parameters: Record<string, unknown>;
  status: VerificationStatus;
  limitations?: string[];
}

function makeRule(spec: RuleSpec): CountryRegulatedRule {
  const cc = spec.data.countryCode.toUpperCase();
  return {
    ruleId: `${cc.toLowerCase()}-${spec.calculatorId}-${spec.effectiveFrom}`,
    calculatorId: spec.calculatorId,
    countryCode: cc,
    jurisdiction: spec.jurisdiction,
    effectiveFrom: spec.effectiveFrom,
    effectiveTo: undefined,
    sourceIds: spec.sourceIds,
    parameters: spec.parameters,
    formulaVersion: '2026.11',
    verificationStatus: spec.status,
    lastReviewed: REVIEWED,
    approvedBy: spec.status === 'APPROVED' ? REVIEWER : undefined,
    limitations: spec.limitations,
  };
}

const fuel = (d: CountryData) => ({ grades: d.fuel.value?.grades, pricingModel: d.fuel.value?.pricingModel });
const fines = (d: CountryData) => ({ trafficFines: d.vehicle.value?.trafficFines });
const fees = (d: CountryData) => ({
  registrationFeeAnnual: d.vehicle.value?.registrationFeeAnnual,
  periodicInspectionFee: d.vehicle.value?.periodicInspectionFee,
  drivingLicenceRenewal10Yr: d.vehicle.value?.drivingLicenceRenewal10Yr,
  drivingLicenceValidityYears: d.vehicle.value?.drivingLicenceValidityYears ?? 10,
});
const customs = (d: CountryData) => ({
  customsDutyPercent: d.vehicle.value?.customsDutyPercent,
  customsVatPercent: d.vehicle.value?.customsVatPercent,
  maxImportAgeYears: d.vehicle.value?.maxImportAgeYears,
});
const payroll = (d: CountryData) => ({ socialInsurance: d.socialInsurance.value, incomeTax: d.incomeTax.value });

export const VERIFIED_REGULATED_RULES: CountryRegulatedRule[] = [
  // ---------------- Fuel prices ----------------
  makeRule({
    calculatorId: 'fuel-prices', data: COUNTRY_DATA_SA, jurisdiction: 'Aramco', effectiveFrom: '2026-01-01',
    sourceIds: ['sa-aramco-fuel-pricing'], parameters: fuel(COUNTRY_DATA_SA), status: 'APPROVED',
    limitations: ['سعر الديزل 1.79 ر.س منذ 1 يناير 2026؛ بنزين 91 و95 عند السقف المعتمد منذ 10 يوليو 2021.'],
  }),
  makeRule({
    calculatorId: 'fuel-prices', data: COUNTRY_DATA_AE, jurisdiction: 'UAE Fuel Price Committee', effectiveFrom: '2026-11-01',
    sourceIds: ['ae-fuel-price-committee'], parameters: fuel(COUNTRY_DATA_AE), status: 'APPROVED',
    limitations: ['تتغير الأسعار شهرياً في اليوم الأول من كل شهر ويجب تحديثها.'],
  }),
  makeRule({
    calculatorId: 'fuel-prices', data: COUNTRY_DATA_EG, jurisdiction: 'Ministry of Petroleum', effectiveFrom: '2026-03-10',
    sourceIds: ['eg-petroleum-fuel-pricing'], parameters: fuel(COUNTRY_DATA_EG), status: 'APPROVED',
    limitations: ['قررت لجنة التسعير في 15 أكتوبر 2026 تثبيت الأسعار حتى نهاية ديسمبر 2026.'],
  }),

  // ---------------- Traffic fines ----------------
  makeRule({
    calculatorId: 'traffic-fines', data: COUNTRY_DATA_SA, jurisdiction: 'General Department of Traffic', effectiveFrom: '2018-08-16',
    sourceIds: ['sa-traffic-law-m85'], parameters: fines(COUNTRY_DATA_SA), status: 'APPROVED',
    limitations: [
      'شرائح السرعة المعروضة للطرق التي حدها 120 كم/س أو أقل؛ للطرق المحددة بـ 140 كم/س جدول أشد.',
      'غرامة استخدام الهاتف 500-900 ر.س وفق تصريحات الإدارة العامة للمرور، بينما يذكر جدول النظام 150-300 ر.س.',
    ],
  }),
  makeRule({
    calculatorId: 'traffic-fines', data: COUNTRY_DATA_AE, jurisdiction: 'UAE Ministry of Interior', effectiveFrom: '2017-07-01',
    sourceIds: ['ae-moi-traffic-178-2017'], parameters: fines(COUNTRY_DATA_AE), status: 'APPROVED',
    limitations: ['تدخل اللائحة التنفيذية الجديدة (قرار مجلس الوزراء 174 لسنة 2026) حيز التنفيذ في 1 يناير 2027 وقد تعدل القيم.'],
  }),
  makeRule({
    calculatorId: 'traffic-fines', data: COUNTRY_DATA_EG, jurisdiction: 'Egypt Ministry of Interior', effectiveFrom: '2014-07-03',
    sourceIds: ['eg-traffic-law-66'], parameters: fines(COUNTRY_DATA_EG), status: 'APPROVED',
    limitations: [
      'وفق القانون 66 لسنة 1973 المعدل بالقانون 121 لسنة 2008 والقرار بقانون 59 لسنة 2014؛ سُحب مشروع تعديل 2025 من البرلمان في 3 فبراير 2026 ولم يصدر قانون جديد حتى نوفمبر 2026.',
      'تتضاعف الغرامة عند العود خلال ستة أشهر، وقد يُضاف الحبس في مخالفة السرعة.',
    ],
  }),

  // ---------------- Vehicle fees ----------------
  makeRule({
    calculatorId: 'vehicle-fees', data: COUNTRY_DATA_SA, jurisdiction: 'General Department of Traffic / SASO', effectiveFrom: '2024-10-29',
    sourceIds: ['sa-traffic-law-m85', 'sa-saso-mvpi-fee'], parameters: fees(COUNTRY_DATA_SA), status: 'APPROVED',
    limitations: ['الفحص الدوري 115 ر.س شاملة الضريبة؛ لا تشمل الحسبة رسوم اللوحات أو التأمين الإلزامي.'],
  }),
  makeRule({
    calculatorId: 'vehicle-fees', data: COUNTRY_DATA_AE, jurisdiction: 'RTA Dubai', effectiveFrom: '2024-01-01',
    sourceIds: ['ae-rta-vehicle-fees'], parameters: fees(COUNTRY_DATA_AE), status: 'APPROVED',
    limitations: [
      'الرسوم وفق إمارة دبي وتضاف 20 درهماً رسوم المعرفة والابتكار لكل معاملة.',
      'يُقسم رسم رخصة القيادة على 5 سنوات وفق صلاحيتها للمقيمين (أغلب السائقين)؛ صلاحيتها للمواطنين ومواطني الخليج 10 سنوات.',
    ],
  }),
  makeRule({
    calculatorId: 'vehicle-fees', data: COUNTRY_DATA_EG, jurisdiction: 'Egypt Ministry of Interior', effectiveFrom: '2026-10-01',
    sourceIds: ['eg-development-fee-147-1984', 'eg-traffic-law-66'], parameters: fees(COUNTRY_DATA_EG), status: 'REVIEW_REQUIRED',
    limitations: [
      'رسم التنمية السنوي لتجديد ترخيص سيارة ملاكي 1330-1630 سم3 هو 750 جنيهاً وفق القانون 147 لسنة 1984 (يختلف حسب السعة).',
      'منذ 1 أكتوبر 2026 يُسدد مقابل خدمة موحد (نحو 310 جنيهات للتجديد و1,650 للإصدار وفق لوحات وحدات المرور) غير منشور رسمياً، ولا تشمل الحسبة التأمين الإجباري وضريبة المرور.',
      'رسم الفحص الفني بعد نظام أكتوبر 2026 غير موثق رسمياً.',
    ],
  }),

  // ---------------- Car import customs ----------------
  makeRule({
    calculatorId: 'car-import-customs', data: COUNTRY_DATA_SA, jurisdiction: 'ZATCA', effectiveFrom: '2020-07-01',
    sourceIds: ['sa-zatca-vehicle-import', 'sa-zatca-vat-15'], parameters: customs(COUNTRY_DATA_SA), status: 'APPROVED',
    limitations: ['يجوز استيراد سيارات أقدم من 5 سنوات لفئات محددة بمقابل مالي من 20% إلى 50% من القيمة وفق القرار 335.'],
  }),
  makeRule({
    calculatorId: 'car-import-customs', data: COUNTRY_DATA_AE, jurisdiction: 'Dubai Customs', effectiveFrom: '2018-01-01',
    sourceIds: ['ae-dubai-customs-vehicles', 'ae-fta-vat-5'], parameters: customs(COUNTRY_DATA_AE), status: 'APPROVED',
    limitations: ['لا يوجد حد رسمي منشور لعمر السيارة المستوردة؛ السيارات ذات المقود الأيمن لا تُرخص للسير على الطرق.'],
  }),
  makeRule({
    calculatorId: 'car-import-customs', data: COUNTRY_DATA_EG, jurisdiction: 'Egyptian Customs Authority', effectiveFrom: '2022-01-01',
    sourceIds: ['eg-customs-vehicle-tariff', 'eg-development-fee-147-1984', 'eg-eta-vat-14'],
    parameters: { ...customs(COUNTRY_DATA_EG), importTaxes: COUNTRY_DATA_EG.vehicle.value?.importTaxes },
    status: 'APPROVED',
    limitations: [
      'يحسب سيارات الركوب بمحرك احتراق داخلي فقط؛ للسيارات الهجينة والكهربائية فئات مختلفة.',
      'يُشترط أن تكون سيارة الركوب جديدة ومن سنة الموديل؛ لا تشمل الحسبة رسم ترخيص السيارة الجديدة ولا مبادرة سيارات المصريين بالخارج.',
      'الإعفاء الأوروبي للضريبة الجمركية فقط ويتطلب شهادة منشأ تفضيلية EUR.1.',
    ],
  }),

  // ---------------- Net salary ----------------
  makeRule({
    calculatorId: 'net-salary', data: COUNTRY_DATA_SA, jurisdiction: 'GOSI', effectiveFrom: '2026-07-01',
    sourceIds: ['sa-gosi-social-insurance'], parameters: payroll(COUNTRY_DATA_SA), status: 'APPROVED',
    limitations: ['ترتفع نسبة المعاشات في النظام الجديد 0.5% على كل طرف في 1 يوليو من كل عام حتى 2028.'],
  }),
  makeRule({
    calculatorId: 'net-salary', data: COUNTRY_DATA_AE, jurisdiction: 'GPSSA', effectiveFrom: '2023-10-31',
    sourceIds: ['ae-gpssa-pension'], parameters: payroll(COUNTRY_DATA_AE), status: 'APPROVED',
    limitations: [
      'اشتراكات المعاشات للمواطنين فقط؛ يدفع الجميع اشتراك التأمين ضد التعطل (5 أو 10 دراهم شهرياً) غير المحتسب هنا.',
      'العاملون في جهات إمارة أبوظبي يخضعون لصندوق أبوظبي للمعاشات بنسب مختلفة.',
    ],
  }),
  makeRule({
    calculatorId: 'net-salary', data: COUNTRY_DATA_EG, jurisdiction: 'NOSI / ETA', effectiveFrom: '2026-01-01',
    sourceIds: ['eg-nosi-social-insurance', 'eg-eta-income-tax-7-2024'], parameters: payroll(COUNTRY_DATA_EG), status: 'APPROVED',
    limitations: ['لا تشمل الحسبة اشتراك التأمين الصحي الشامل في المحافظات المطبق فيها ولا خصم صندوق الشهداء.'],
  }),
];
