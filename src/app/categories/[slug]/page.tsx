import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { CATEGORIES, getCategoryBySlug } from '@/data/categories';
import { getCalculatorsByCategory } from '@/data/calculators';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import AdSlot from '@/components/layout/AdSlot';
import { Calculator, ArrowLeft, Layers, Sparkles } from 'lucide-react';
import {
  formatMetaTitle,
  constructCanonicalUrl,
  generateBreadcrumbSchema,
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

  const title = formatMetaTitle(category.metaTitle);
  const canonical = constructCanonicalUrl(`/categories/${category.slug}`);

  return {
    title,
    description: category.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
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

  const calculators = getCalculatorsByCategory(category.id);
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

      <div className="space-y-3 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {category.nameAr}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {category.descriptionAr}
        </p>

        {/* Subcategories pills */}
        <div className="pt-2 flex flex-wrap gap-2">
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

      {/* Calculators in this category */}
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

                <h2 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-base sm:text-lg mb-2">
                  {calc.nameAr}
                </h2>
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
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80">
          <Calculator className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h3 className="font-bold text-slate-700">جاري إضافة المزيد من الحاسبات لهذا القسم</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            يقوم فريقنا بمراجعة وتدقيق حاسبات هذا القسم وفق المعايير الرسمية وسوف تتاح قريباً.
          </p>
        </div>
      )}

      <AdSlot slotId="category-bottom" />
    </div>
  );
}
