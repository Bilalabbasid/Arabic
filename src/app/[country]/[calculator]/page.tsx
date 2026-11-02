import React from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  COUNTRIES,
  getCountryByCode,
  getCountryData,
} from '@/data/countries';
import {
  ALL_CALCULATORS,
  getCalculatorBySlug,
} from '@/data/calculators';
import {
  generateCalculatorSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
  formatMetaTitle,
  constructCanonicalUrl,
  generateLocalizedCalculatorTitle,
  generateLocalizedCalculatorDescription,
  generateHreflangAlternates,
  isCountryCalculatorValid,
} from '@/lib/seo/metadata';
import { getCountryCalculatorContent } from '@/data/country-content';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CountryFlag from '@/components/common/CountryFlag';
import CalculatorRunner from '@/components/calculator/CalculatorRunner';
import FormulaBox from '@/components/calculator/FormulaBox';
import MethodologyBox from '@/components/calculator/MethodologyBox';
import WorkedExampleBox from '@/components/calculator/WorkedExampleBox';
import FaqAccordion from '@/components/calculator/FaqAccordion';
import RelatedCalculatorsBlock from '@/components/calculator/RelatedCalculatorsBlock';
import CountryVariantsBlock from '@/components/calculator/CountryVariantsBlock';
import RelatedGuides from '@/components/calculator/RelatedGuides';
import { getGuidesByCalculatorSlug } from '@/data/guides';
import AdSlot from '@/components/layout/AdSlot';
import { CalculationResult } from '@/types/calculator';
import { ExternalLink, ShieldCheck, AlertCircle, FileText, CheckCircle2, Fuel } from 'lucide-react';

interface PageProps {
  params: Promise<{ country: string; calculator: string }>;
}

export async function generateStaticParams() {
  const paramsList: { country: string; calculator: string }[] = [];

  for (const country of COUNTRIES) {
    const cCode = country.countryCode.toLowerCase();
    for (const calc of ALL_CALCULATORS) {
      if (calc.publicationStatus === 'PUBLISHED' && isCountryCalculatorValid(calc, country.countryCode)) {
        paramsList.push({
          country: cCode,
          calculator: calc.slug,
        });
      }
    }
  }

  return paramsList;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country: countryParam, calculator: calcSlug } = await params;
  const country = getCountryByCode(countryParam);
  const calc = getCalculatorBySlug(calcSlug);

  if (!country || !calc || !isCountryCalculatorValid(calc, country.countryCode)) {
    return {
      title: 'الصفحة غير موجودة',
    };
  }

  const title = generateLocalizedCalculatorTitle(calc, country);
  const description = generateLocalizedCalculatorDescription(calc, country);
  const canonical = constructCanonicalUrl(`/${country.countryCode.toLowerCase()}/${calc.slug}`);
  const alternatesLanguages = generateHreflangAlternates(calc);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternatesLanguages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'لِسيارتك',
      locale: country.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CountryCalculatorPage({ params }: PageProps) {
  const { country: countryParam, calculator: calcSlug } = await params;
  const country = getCountryByCode(countryParam);
  const calc = getCalculatorBySlug(calcSlug);

  if (!country || !calc) {
    notFound();
  }

  // Soft-404 / Hard Gating: If not valid for this country, permanent redirect to universal calculator
  if (!isCountryCalculatorValid(calc, country.countryCode)) {
    permanentRedirect(`/calculators/${calc.slug}`);
  }

  const countryContent = getCountryCalculatorContent(calc.slug, country.countryCode);
  const countryData = getCountryData(country.countryCode);
  const relatedGuides = getGuidesByCalculatorSlug(calc.slug);

  const isNoVatCountry = calc.slug === 'vat-calculator' && (country.countryCode === 'KW' || country.countryCode === 'QA');

  const defaultInputs: Record<string, any> = {};
  for (const inp of calc.inputs) {
    defaultInputs[inp.id] = inp.defaultValue;
  }

  let initialResult: CalculationResult;
  try {
    initialResult = calc.calculate(defaultInputs, {
      countryCode: country.countryCode,
      currencyCode: country.currencyCode,
    });
  } catch (err) {
    initialResult = {
      primary: {
        label: 'النتيجة',
        value: 0,
        formattedValue: '0',
      },
      details: [],
    };
  }

  const breadcrumbs = [
    { label: country.nameAr, href: `/${country.countryCode.toLowerCase()}` },
    { label: calc.shortNameAr || calc.nameAr, href: `/${country.countryCode.toLowerCase()}/${calc.slug}` },
  ];

  const effectiveFaqs = countryContent?.faqs?.length
    ? countryContent.faqs
    : calc.faqs;

  const calculatorSchema = generateCalculatorSchema({
    nameAr: countryContent?.h1 || calc.nameAr,
    descriptionAr: countryContent?.intro || calc.descriptionAr,
    slug: calc.slug,
    countryCode: country.countryCode,
  });
  const faqSchema = generateFaqSchema(effectiveFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'الرئيسية', url: '/' },
    ...breadcrumbs.map((b) => ({ name: b.label, url: b.href })),
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8" dir="rtl">
      {/* Structured Data (Schema.org) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Header Banner */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/60">
            <CountryFlag
              countryCode={country.countryCode}
              className="w-4 h-3 rounded-xs"
            />
            <span>{country.nameAr}</span>
          </span>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            العملة: {country.currencyNameAr} ({country.currencySymbolAr})
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {countryContent?.h1 || `${calc.nameAr} في ${country.nameAr}`}
        </h1>
        {calc.answerFirstAr && (
          <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 font-medium text-xs sm:text-sm leading-relaxed flex items-start gap-3 shadow-xs">
            <span className="font-extrabold text-emerald-800 shrink-0">إجابة مباشرة:</span>
            <span>{calc.answerFirstAr}</span>
          </div>
        )}
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {countryContent?.intro || calc.descriptionAr}
        </p>

        {/* Link to Country Fuel Prices Hub for car calculators */}
        {calc.category === 'cars-transportation' && countryData?.fuel?.status === 'verified' && (
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 flex items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-950 font-semibold">
              <Fuel className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>هل تبحث عن أسعار الوقود الرسمية المحدثة لهذا الشهر في {country.nameAr}؟</span>
            </div>
            <Link
              href={`/${country.countryCode.toLowerCase()}/fuel-prices`}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline shrink-0"
            >
              عرض تسعيرة البنزين &larr;
            </Link>
          </div>
        )}

        {/* Honest Notice for Countries with No VAT (Kuwait & Qatar) */}
        {isNoVatCountry && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-800">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>إيضاح قانوني رسمي بشأن ضريبة القيمة المضافة في {country.nameAr}</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-amber-800">
              {country.countryCode === 'KW'
                ? 'لا تطبق دولة الكويت ضريبة القيمة المضافة حتى الآن؛ وقد تم استبعادها رسمياً من برنامج عمل الحكومة والوثيقة المالية 2026-2030. الحاسبة أدناه مهيأة بحقل نسبة مخصصة لاختبار العمليات التجارية والاستيراد من الخارج دون إلزام بضريبة محلية.'
                : 'لا تفرض دولة قطر ضريبة القيمة المضافة حالياً؛ حيث لا يزال المشروع قيد التخطيط التشريعي ولم يدخل حيز التطبيق. يمكنك استخدام الحاسبة أدناه لأغراض التقدير أو حساب المعاملات الدولية.'}
            </p>
          </div>
        )}

        {/* Official Authority & Legal Source Box */}
        {countryContent && (
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-500 block">الجهة الرسمية المنظمة:</span>
                <a
                  href={countryContent.authorityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-extrabold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-1.5 mt-0.5"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{countryContent.authorityName}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 block">المرجع التشريعي المعتمد:</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">{countryContent.lawName}</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {countryContent.currentRateOrRule}
            </p>
          </div>
        )}
      </div>

      {/* Available in other Countries Block */}
      <CountryVariantsBlock
        calculatorSlug={calc.slug}
        currentCountryCode={country.countryCode}
        calculatorNameAr={calc.nameAr}
      />

      {/* Interactive Calculator Runner */}
      <CalculatorRunner
        slug={calc.slug}
        nameAr={countryContent?.h1 || calc.nameAr}
        category={calc.category}
        inputs={calc.inputs}
        initialResult={initialResult}
        calculationEngineId={calc.calculationEngineId}
        countryCode={country.countryCode}
        currencyCode={country.currencyCode}
      />

      {/* Exemptions or Exclusions Section */}
      {countryContent?.exemptionsOrExclusions && countryContent.exemptionsOrExclusions.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>الإعفاءات والحالات الخاصة المعتمدة في {country.nameAr}</span>
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
            {countryContent.exemptionsOrExclusions.map((ex, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span>{ex}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <AdSlot slotId="country-calc-mid" />

      {/* Formula & Explanation */}
      <FormulaBox
        formula={calc.formula}
        explanation={calc.formulaExplanation}
      />

      {/* Worked Examples in Local Currency */}
      <WorkedExampleBox
        examples={countryContent?.workedExamples || calc.workedExamples}
      />

      {/* In-depth Country Editorial Analysis */}
      {countryContent?.detailedAnalysis && (
        <div className="bg-slate-50/60 rounded-2xl p-6 border border-slate-200/70 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>نظرة تحليلية على التطبيق واللوائح في {country.nameAr}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {countryContent.detailedAnalysis}
          </p>
        </div>
      )}

      {/* Common Mistakes */}
      {countryContent?.commonMistakes && countryContent.commonMistakes.length > 0 && (
        <div className="bg-amber-50/40 rounded-2xl p-6 border border-amber-200/60 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-amber-950 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span>أخطاء شائعة يجب تجنبها عند الحساب</span>
          </h2>
          <ul className="space-y-2 pt-1">
            {countryContent.commonMistakes.map((cm, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-amber-900 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                <span>{cm}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Methodology, Sources & Assumptions */}
      <MethodologyBox
        sourceIds={calc.sourceIds}
        ruleVersion={calc.ruleVersion}
        lastReviewedAt={calc.lastReviewedAt}
        verificationStatus={calc.verificationStatus}
        officialSourceName={countryContent?.authorityName}
        calculatorSlug={calc.slug}
        countryCode={country.countryCode}
        assumptions={initialResult.assumptions}
        qualifications={initialResult.qualifications}
      />

      {/* FAQs */}
      <FaqAccordion faqs={effectiveFaqs} />

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <RelatedGuides guides={relatedGuides} />
      )}

      {/* Recommended & Related Calculators */}
      <RelatedCalculatorsBlock
        calculatorSlug={calc.slug}
        currentCountryCode={country.countryCode}
      />
    </div>
  );
}
