import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { GUIDES, getGuideBySlug } from '@/data/guides';
import { getCalculatorBySlug } from '@/data/calculators';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import AdSlot from '@/components/layout/AdSlot';
import { BookOpen, Clock, Calendar, Calculator, ArrowLeft } from 'lucide-react';
import {
  formatMetaTitle,
  constructCanonicalUrl,
  generateArticleSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo/metadata';
import { formatDateAr } from '@/lib/formatters';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: 'المقال غير موجود',
    };
  }

  const title = formatMetaTitle(guide.titleAr);
  const canonical = constructCanonicalUrl(`/guides/${guide.slug}`);

  return {
    title,
    description: guide.summaryAr,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: guide.summaryAr,
      url: canonical,
      siteName: 'لِسيارتك',
      locale: 'ar_AR',
      type: 'article',
    },
  };
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const relatedCalc = getCalculatorBySlug(guide.relatedCalculatorSlug);
  const breadcrumbs = [
    { label: 'الأدلة', href: '/guides' },
    { label: guide.titleAr, href: `/guides/${guide.slug}` },
  ];

  const articleSchema = generateArticleSchema({
    slug: guide.slug,
    titleAr: guide.titleAr,
    summaryAr: guide.summaryAr,
    updatedAt: guide.updatedAt,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'الرئيسية', url: '/' },
    { name: 'الأدلة والشروحات', url: '/guides' },
    { name: guide.titleAr, url: `/guides/${guide.slug}` },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Article & Breadcrumb Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumbs items={breadcrumbs} />

      <article className="space-y-8">
        <div className="space-y-3 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>آخر تحديث: {formatDateAr(guide.updatedAt)}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{guide.readingTimeMinutes} دقائق قراءة</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {guide.titleAr}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {guide.summaryAr}
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p className="text-base text-slate-800 leading-relaxed font-semibold bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {guide.content.intro}
          </p>

          {guide.content.sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {section.heading}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {section.body}
              </p>
            </section>
          ))}

          {/* Interactive Calculator Callout */}
          {relatedCalc && (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-bold text-sm sm:text-base text-emerald-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                  <span>جرّب الحاسبة التفاعلية المباشرة</span>
                </div>
                <p className="text-xs text-emerald-700 mt-1">
                  قم بإدخال أرقامك في {relatedCalc.nameAr} واحصل على النتيجة فورياً.
                </p>
              </div>

              <Link
                href={`/calculators/${relatedCalc.slug}`}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors shrink-0 shadow-md shadow-emerald-600/20"
              >
                فتح الحاسبة الآن
              </Link>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 text-sm text-slate-500 italic">
            {guide.content.conclusion}
          </div>
        </div>
      </article>

      <AdSlot slotId="guide-bottom" />
    </div>
  );
}
