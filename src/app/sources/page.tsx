import React from 'react';
import { Metadata } from 'next';
import { SOURCES } from '@/data/sources';
import { COUNTRIES } from '@/data/countries';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { ExternalLink, Building, ShieldCheck, Globe } from 'lucide-react';
import { formatMetaTitle, constructCanonicalUrl } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: formatMetaTitle('المصادر الرسمية والجهات المعتمدة'),
  description: 'دليل الجهات والمصادر الرسمية والبنوك المركزية وهيئات الضرائب المعتمدة في بناء حاسبات منصة لِسيارتك.',
  alternates: {
    canonical: constructCanonicalUrl('/sources'),
  },
};

export default function SourcesPage() {
  const breadcrumbs = [{ label: 'المصادر والجهات الرسمية', href: '/sources' }];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-3 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          المصادر والجهات الرسمية المعتمدة
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          تستند جميع حاسبات منصة لِسيارتك إلى اللوائح والأنظمة المنشورة رسمياً عبر بوابات الوزارات والهيئات السيادية والبنوك المركزية في الدول العربية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SOURCES.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {s.authorityType}
                </span>
              </div>

              <h2 className="font-bold text-slate-900 text-base sm:text-lg">
                {s.nameAr}
              </h2>
              <div className="text-xs text-slate-400 font-sans">{s.nameEn}</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {s.descriptionAr}
              </p>
            </div>

            <a
              href={s.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-bold text-slate-700 hover:text-emerald-800 border border-slate-200/60 transition-colors"
            >
              <span>زيارة البوابة الرسمية للجهة</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
