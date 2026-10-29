import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ALL_CALCULATORS } from '@/data/calculators';
import { CATEGORIES } from '@/data/categories';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import AdSlot from '@/components/layout/AdSlot';
import { Calculator, ArrowLeft, Filter, Sparkles } from 'lucide-react';
import { formatMetaTitle, constructCanonicalUrl } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: formatMetaTitle('دليل كافة الحاسبات العربية المتاحة'),
  description: 'فهرس شامل لجميع الحاسبات والأدوات المالية والرياضية وحاسبات السيارات والرواتب والضرائب المتاحة على منصة لِسيارتك.',
  alternates: {
    canonical: constructCanonicalUrl('/calculators/'),
  },
};

export default function CalculatorsIndexPage() {
  const breadcrumbs = [{ label: 'جميع الحاسبات', href: '/calculators/' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-3 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          دليل كافة الحاسبات العربية
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          تصفح قائمة حاسباتنا المتكاملة، المصنفة بدقة لتلبية احتياجاتك في حسابات الوقود، القروض، الضرائب، الرواتب، والمزيد.
        </p>
      </div>

      {/* Grid of calculators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALL_CALCULATORS.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculators/${calc.slug}/`}
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
              <span>استخدم الحاسبة الآن</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <AdSlot slotId="calcs-index-bottom" />
    </div>
  );
}
