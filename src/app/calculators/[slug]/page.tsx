import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  ALL_CALCULATORS,
  getCalculatorBySlug,
  getRelatedCalculators,
} from '@/data/calculators';
import { getCategoryBySlug } from '@/data/categories';
import {
  generateCalculatorSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
  formatMetaTitle,
  constructCanonicalUrl,
} from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CalculatorRunner from '@/components/calculator/CalculatorRunner';
import FormulaBox from '@/components/calculator/FormulaBox';
import MethodologyBox from '@/components/calculator/MethodologyBox';
import WorkedExampleBox from '@/components/calculator/WorkedExampleBox';
import FaqAccordion from '@/components/calculator/FaqAccordion';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import AdSlot from '@/components/layout/AdSlot';
import { CalculationResult } from '@/types/calculator';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_CALCULATORS.map((c) => ({
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
  const canonical = constructCanonicalUrl(`/calculators/${calc.slug}/`);

  return {
    title,
    description: calc.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: calc.metaDescription,
      url: canonical,
      siteName: 'لِسيارتك',
      locale: 'ar_AR',
      type: 'website',
    },
    twitter: {
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
  const relatedCalculators = getRelatedCalculators(calc, 6);

  const breadcrumbs = [
    ...(category ? [{ label: category.nameAr, href: `/categories/${category.slug}/` }] : []),
    { label: calc.shortNameAr || calc.nameAr, href: `/calculators/${calc.slug}/` },
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
      primary: { label: 'النتيجة', value: 0, formattedValue: '-' },
      error: 'تعذر الحساب التلقائي الأولي.',
    };
  }

  // Schemas
  const calculatorSchema = generateCalculatorSchema({
    nameAr: calc.nameAr,
    descriptionAr: calc.metaDescription,
    slug: calc.slug,
  });

  const faqSchema = generateFaqSchema(calc.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'الرئيسية', url: '/' },
    ...(category ? [{ name: category.nameAr, url: `/categories/${category.slug}/` }] : []),
    { name: calc.nameAr, url: `/calculators/${calc.slug}/` },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Page Header */}
      <div className="space-y-3 max-w-4xl">
        <div className="inline-block text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
          {calc.subcategory}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {calc.h1 || calc.nameAr}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {calc.descriptionAr}
        </p>
      </div>

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

      {/* Methodology, Sources & Assumptions */}
      <MethodologyBox
        sourceIds={calc.sourceIds}
        ruleVersion={calc.ruleVersion}
        lastReviewedAt={calc.lastReviewedAt}
        verificationStatus={calc.verificationStatus}
        assumptions={initialResult.assumptions}
        qualifications={initialResult.qualifications}
      />

      {/* FAQs */}
      <FaqAccordion faqs={calc.faqs} />

      {/* Related Calculators */}
      <RelatedCalculators calculators={relatedCalculators} />
    </div>
  );
}
