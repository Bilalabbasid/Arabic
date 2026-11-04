import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { CATEGORIES, getCategoryBySlug, CATEGORY_RICH_INTROS } from '@/data/categories';
import { getCalculatorsByCategory } from '@/data/calculators';
import { GUIDES } from '@/data/guides';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import AdSlot from '@/components/layout/AdSlot';
import { Calculator, ArrowLeft, Layers, Sparkles, BookOpen, Clock } from 'lucide-react';
import {
  formatMetaTitle,
  constructCanonicalUrl,
  generateBreadcrumbSchema,
  isCategoryIndexable,
  DEFAULT_OG_IMAGES,
} from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'القسم غير موجود',
    };
  }

  const isIndexable = isCategoryIndexable(category.id);
  const title = formatMetaTitle(category.metaTitle);
  const canonical = constructCanonicalUrl(`/categories/${category.slug}`);

  return {
    title,
    description: category.metaDescription,
    alternates: {
      canonical: isIndexable ? canonical : undefined,
    },
    robots: isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      images: DEFAULT_OG_IMAGES,
      title,
      description: category.metaDescription,
      url: canonical,
      siteName: 'لِسيارتك',
      locale: 'ar_AR',
      type: 'website',
    },
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const isIndexable = isCategoryIndexable(category.id);
  const calculators = getCalculatorsByCategory(category.id);
  const richIntro = CATEGORY_RICH_INTROS[category.id];

  const categoryCalcSlugs = new Set(calculators.map((c) => c.slug));
  const relatedGuides = GUIDES.filter(
    (g) => categoryCalcSlugs.has(g.relatedCalculatorSlug) || g.category === category.id
  );

  const breadcrumbs = [
    { label: 'الأقسام', href: '/categories' },
    { label: category.nameAr, href: `/categories/${category.slug}` },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'الرئيسية', url: '/' },
    { name: 'أقسام الحاسبات', url: '/categories' },
    { name: category.nameAr, url: `/categories/${category.slug}` },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-4 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {category.nameAr}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {category.descriptionAr}
        </p>

        {/* Subcategories pills */}
        <div className="pt-1 flex flex-wrap gap-2">
          {category.subcategories.map((sub, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-100"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* Rich Category Intro (150-300 words) for indexable categories */}
      {richIntro && (
        <section className="bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>نظرة عامة على أدوات القسم</span>
          </div>
          <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p className="font-semibold text-slate-900">{richIntro.intro}</p>
            <p className="whitespace-pre-line text-slate-600 leading-relaxed">
              {richIntro.detailedDescription}
            </p>
          </div>
        </section>
      )}

      {/* Calculators in this category */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <span>حاسبات {category.nameAr} المتاحة ({calculators.length})</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">نتائج فورية ومعادلات معتمدة</span>
        </div>

        {calculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}`}
                className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-12 h-12 rounded-2xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Calculator className="w-6 h-6" />
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {calc.subcategory}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-base sm:text-lg mb-2">
                    {calc.nameAr}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                    {calc.descriptionAr}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>ابدأ الحساب</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center bg-white rounded-3xl border border-slate-200/80 space-y-3">
            <Calculator className="w-10 h-10 mx-auto text-slate-400" />
            <h3 className="font-bold text-slate-700">قسم غير متاح حالياً</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              لم يتم تفعيل حاسبات مخصصة لهذا التصنيف بعد. يمكنك استعراض كافة حاسباتنا المتاحة حالياً من الدليل العام.
            </p>
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-2"
            >
              <span>تصفح جميع الحاسبات المتاحة</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>

      {/* Related Guides Section */}
      {relatedGuides.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-slate-200/60">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>أدلة وإرشادات تخصصية مرتبطة بهذا القسم</span>
            </h2>
            <Link href="/guides" className="text-xs font-bold text-emerald-600 hover:underline">
              عرض جميع الأدلة &larr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>قراءة خلال {guide.readingTimeMinutes} دقائق</span>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-sm sm:text-base leading-snug">
                    {guide.titleAr}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {guide.summaryAr}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>قراءة الدليل الكامل</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <AdSlot slotId="category-bottom" />
    </div>
  );
}
