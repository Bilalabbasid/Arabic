import React from 'react';
import { ShieldCheck, ExternalLink, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { getSourcesByIds } from '@/data/sources';
import { formatDateAr } from '@/lib/formatters';

interface Props {
  sourceIds: string[];
  ruleVersion: string;
  lastReviewedAt: string;
  verificationStatus: 'VERIFIED' | 'PROVISIONAL' | 'COMMUNITY';
  assumptions?: string[];
  qualifications?: string[];
  className?: string;
}

export default function MethodologyBox({
  sourceIds,
  ruleVersion,
  lastReviewedAt,
  verificationStatus,
  assumptions,
  qualifications,
  className = '',
}: Props) {
  const sources = getSourcesByIds(sourceIds);

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5 ${className}`}>
      {/* Header with Verification Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-800">المنهجية والتحقق والمصادر الرسمية</h3>
        </div>

        <div className="flex items-center gap-2">
          {verificationStatus === 'VERIFIED' && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> تم التحقق الرسمي
            </span>
          )}
          <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
            الإصدار: v{ruleVersion}
          </span>
        </div>
      </div>

      {/* Verification date */}
      {lastReviewedAt && (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>آخر مراجعة وتحديث للمعايير: {formatDateAr(lastReviewedAt)}</span>
        </div>
      )}

      {/* Official Sources */}
      {sources.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">الجهات والمراجع الرسمية المعتمدة:</h4>
          <div className="space-y-2">
            {sources.map((s) => (
              <a
                key={s.id}
                href={s.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/60 text-xs sm:text-sm transition-colors group"
              >
                <div>
                  <div className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {s.nameAr}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{s.descriptionAr}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0 ms-2" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Assumptions & Limitations */}
      {((assumptions && assumptions.length > 0) || (qualifications && qualifications.length > 0)) && (
        <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-600">
          {assumptions && assumptions.length > 0 && (
            <div>
              <h5 className="font-bold text-slate-700 mb-1">الافتراضات الحسابية:</h5>
              <ul className="list-disc list-inside space-y-1 text-slate-500">
                {assumptions.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          {qualifications && qualifications.length > 0 && (
            <div>
              <h5 className="font-bold text-slate-700 mb-1">محددات الحساب:</h5>
              <ul className="list-disc list-inside space-y-1 text-slate-500">
                {qualifications.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
