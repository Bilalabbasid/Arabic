import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { GUIDES } from '@/data/guides';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { BookOpen, Clock, ArrowLeft, Calculator } from 'lucide-react';
import { formatMetaTitle, constructCanonicalUrl } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: formatMetaTitle('الأدلة والشروحات الحسابية'),
  description: 'مقالات وأدلة تعليمية تشرح بالخطوات كيفية حساب تكلفة الوقود، مكافأة نهاية الخدمة، أقساط القروض، والضرائب بدقة.',
  alternates: {
    canonical: constructCanonicalUrl('/guides'),
  },
};

export default function GuidesIndexPage() {
  const breadcrumbs = [{ label: 'الأدلة والشروحات', href: '/guides' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-3 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          الأدلة والشروحات الحسابية
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          شروحات مبسطة ومعمقة تشرح المعادلات الرياضية واللوائح القانونية المعتمدة وراء كل حاسبة على منصتنا.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>قراءة في {guide.readingTimeMinutes} دقائق</span>
              </div>

              <h2 className="font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors text-lg sm:text-xl leading-snug">
                {guide.titleAr}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                {guide.summaryAr}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>قراءة {guide.titleAr}</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
