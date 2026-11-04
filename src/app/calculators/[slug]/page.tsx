import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  ALL_CALCULATORS,
  getCalculatorBySlug,
} from '@/data/calculators';
import { getCategoryBySlug } from '@/data/categories';
import {
  generateCalculatorSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
  formatMetaTitle,
  constructCanonicalUrl,
  generateHreflangAlternates,
  DEFAULT_OG_IMAGES,
} from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CalculatorRunner from '@/components/calculator/CalculatorRunner';
import FormulaBox from '@/components/calculator/FormulaBox';
import MethodologyBox from '@/components/calculator/MethodologyBox';
import WorkedExampleBox from '@/components/calculator/WorkedExampleBox';
import CommonMistakesBox from '@/components/calculator/CommonMistakesBox';
import RelatedGuides from '@/components/calculator/RelatedGuides';
import FaqAccordion from '@/components/calculator/FaqAccordion';
import RelatedCalculatorsBlock from '@/components/calculator/RelatedCalculatorsBlock';
import CountryVariantsBlock from '@/components/calculator/CountryVariantsBlock';
import AdSlot from '@/components/layout/AdSlot';
import { getGuidesByCalculatorSlug } from '@/data/guides';
import { CalculationResult } from '@/types/calculator';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_CALCULATORS
    .filter((c) => c.publicationStatus === 'PUBLISHED')
    .map((c) => ({
      slug: c.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);

  if (!calc) {
    return {
      title: 'الحاسبة غير موجودة',
    };
  }

  const title = formatMetaTitle(calc.metaTitle);
  const canonical = constructCanonicalUrl(`/calculators/${calc.slug}`);
  const alternatesLanguages = generateHreflangAlternates(calc);

  return {
    title,
    description: calc.metaDescription,
    alternates: {
      canonical,
      languages: alternatesLanguages,
    },
    openGraph: {
      images: DEFAULT_OG_IMAGES,
      title,
      description: calc.metaDescription,
      url: canonical,
      siteName: 'لِسيارتك',
      locale: 'ar_AR',
      type: 'website',
    },
    twitter: {
      images: DEFAULT_OG_IMAGES,
      card: 'summary_large_image',
      title,
      description: calc.metaDescription,
    },
  };
}

export default async function CalculatorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);

  if (!calc) {
    notFound();
  }

  const category = getCategoryBySlug(calc.category);
  const relatedGuides = getGuidesByCalculatorSlug(calc.slug);

  const breadcrumbs = [
    ...(category ? [{ label: category.nameAr, href: `/categories/${category.slug}` }] : []),
    { label: calc.shortNameAr || calc.nameAr, href: `/calculators/${calc.slug}` },
  ];

  // Precalculate initial result on the server using default inputs for instant LCP (0ms)
  const defaultInputs: Record<string, any> = {};
  for (const inp of calc.inputs) {
    defaultInputs[inp.id] = inp.defaultValue;
  }

  let initialResult: CalculationResult;
  try {
    initialResult = calc.calculate(defaultInputs);
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

  const calculatorSchema = generateCalculatorSchema({
    nameAr: calc.nameAr,
    descriptionAr: calc.descriptionAr,
    slug: calc.slug,
  });
  const faqSchema = generateFaqSchema(calc.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map((b) => ({ name: b.label, url: b.href }))
  );

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

      {/* Header with Title & Direct Answer */}
      <div className="space-y-4">
        <div className="inline-block text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
          {calc.subcategory}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {calc.h1 || calc.nameAr}
        </h1>
        {calc.answerFirstAr && (
          <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 font-medium text-xs sm:text-sm leading-relaxed flex items-start gap-3 shadow-xs">
            <span className="font-extrabold text-emerald-800 shrink-0">إجابة مباشرة:</span>
            <span>{calc.answerFirstAr}</span>
          </div>
        )}
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {calc.descriptionAr}
        </p>
      </div>

      {/* Available in Specific Countries Block */}
      <CountryVariantsBlock calculatorSlug={calc.slug} />

      {/* Interactive Calculator Runner */}
      <CalculatorRunner
        slug={calc.slug}
        nameAr={calc.nameAr}
        category={calc.category}
        inputs={calc.inputs}
        initialResult={initialResult}
        calculationEngineId={calc.calculationEngineId}
      />

      {/* Ad slot */}
      <AdSlot slotId="calc-mid" />

      {/* Formula & Explanation */}
      <FormulaBox
        formula={calc.formula}
        explanation={calc.formulaExplanation}
      />

      {/* Worked Examples */}
      <WorkedExampleBox examples={calc.workedExamples} />

      {/* Common Mistakes */}
      {calc.commonMistakes && calc.commonMistakes.length > 0 && (
        <CommonMistakesBox mistakes={calc.commonMistakes} />
      )}

      {/* Methodology, Sources & Assumptions */}
      <MethodologyBox
        sourceIds={calc.sourceIds}
        ruleVersion={calc.ruleVersion}
        lastReviewedAt={calc.lastReviewedAt}
        verificationStatus={calc.verificationStatus}
        calculatorSlug={calc.slug}
        assumptions={initialResult.assumptions}
        qualifications={initialResult.qualifications}
      />

      {/* FAQs */}
      <FaqAccordion faqs={calc.faqs} />

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <RelatedGuides guides={relatedGuides} />
      )}

      {/* Recommended & Related Calculators */}
      <RelatedCalculatorsBlock calculatorSlug={calc.slug} />
    </div>
  );
}
