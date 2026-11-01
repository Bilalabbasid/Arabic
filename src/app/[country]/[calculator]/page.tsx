import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  COUNTRIES,
  getCountryByCode,
  getAllCountryCodes,
} from '@/data/countries';
import {
  ALL_CALCULATORS,
  getCalculatorBySlug,
  getRelatedCalculators,
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

  if (!country || !calc || !isCountryCalculatorValid(calc, country.countryCode)) {
    notFound();
  }

  const relatedCalculators = getRelatedCalculators(calc, 6, country.countryCode);

  const breadcrumbs = [
    { label: country.nameAr, href: `/${country.countryCode.toLowerCase()}` },
    { label: calc.shortNameAr || calc.nameAr, href: `/${country.countryCode.toLowerCase()}/${calc.slug}` },
  ];

  // Default inputs preset to country and currency
  const defaultInputs: Record<string, any> = {};
  for (const inp of calc.inputs) {
    if (inp.id === 'country') {
      defaultInputs[inp.id] = country.countryCode;
    } else {
      defaultInputs[inp.id] = inp.defaultValue;
    }
  }

  let initialResult: CalculationResult;
  try {
    initialResult = calc.calculate(defaultInputs, {
      countryCode: country.countryCode,
      currencyCode: country.currencyCode,
    });
  } catch (err) {
    initialResult = {
      primary: { label: 'النتيجة', value: 0, formattedValue: '-' },
      error: 'تعذر الحساب التلقائي الأولي.',
    };
  }

  // Schemas
  const calculatorSchema = generateCalculatorSchema({
    nameAr: `${calc.nameAr} - ${country.nameAr}`,
    descriptionAr: calc.metaDescription,
    slug: calc.slug,
    countryCode: country.countryCode,
  });

  const faqSchema = generateFaqSchema(calc.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'الرئيسية', url: '/' },
    { name: country.nameAr, url: `/${country.countryCode.toLowerCase()}` },
    { name: calc.nameAr, url: `/${country.countryCode.toLowerCase()}/${calc.slug}` },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Schemas */}
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

      <Breadcrumbs items={breadcrumbs} />

      {/* Header with Country Badge */}
      <div className="space-y-3 max-w-4xl">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            <span>{country.flagEmoji}</span>
            <span>{country.nameAr}</span>
          </span>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            العملة: {country.currencyNameAr} ({country.currencySymbolAr})
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {calc.nameAr} في {country.nameAr}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {calc.descriptionAr} مخصصة للعمل وفق القواعد والأسعار المعتمدة في {country.nameAr}.
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
        countryCode={country.countryCode}
        currencyCode={country.currencyCode}
      />

      <AdSlot slotId="country-calc-mid" />

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
      <RelatedCalculators
        calculators={relatedCalculators}
        currentCountryCode={country.countryCode}
      />
    </div>
  );
}
