import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CATEGORIES } from '@/data/categories';
import { getCalculatorsByCategory } from '@/data/calculators';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Grid, ArrowLeft, Layers } from 'lucide-react';
import { formatMetaTitle, constructCanonicalUrl } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: formatMetaTitle('أقسام وتصنيفات الحاسبات'),
  description: 'دليل الأقسام والتصنيفات الشامل لمنصة لِسيارتك، يضم 18 قسماً تغطي الرياضيات والسيارات والمالية والضرائب والرواتب والعقارات.',
  alternates: {
    canonical: constructCanonicalUrl('/categories/'),
  },
};

export default function CategoriesIndexPage() {
  const breadcrumbs = [{ label: 'أقسام الحاسبات', href: '/categories/' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-3 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          أقسام وتصنيفات الحاسبات
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          اختر القسم الذي يناسب متطلباتك للوصول السريع إلى الأدوات والمعادلات التخصصية المعدة لكل مجال.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const calcs = getCalculatorsByCategory(cat.id);
          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}/`}
              className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Layers className="w-5 h-5" />
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {calcs.length} {calcs.length === 1 ? 'حاسبة' : 'حاسبات'}
                  </span>
                </div>

                <h2 className="font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors text-lg mb-2">
                  {cat.nameAr}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                  {cat.descriptionAr}
                </p>

                {/* Subcategories preview */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cat.subcategories.slice(0, 3).map((sub, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>تصفح حاسبات {cat.shortNameAr}</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
