import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowLeft, Clock } from 'lucide-react';
import { GuideArticle } from '@/data/guides';

interface RelatedGuidesProps {
  guides: GuideArticle[];
  title?: string;
}

export default function RelatedGuides({
  guides,
  title = 'شروحات وأدلة إرشادية ذات صلة',
}: RelatedGuidesProps) {
  if (!guides || guides.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-xl">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <h2>{title}</h2>
        </div>
        <Link
          href="/guides"
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
        >
          <span>تصفح جميع الأدلة</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group block p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/70 hover:border-emerald-300 transition-all space-y-2.5"
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                دليل تطبيقي
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{guide.readingTimeMinutes} دقائق</span>
              </span>
            </div>

            <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
              {guide.titleAr}
            </h3>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {guide.summaryAr}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
