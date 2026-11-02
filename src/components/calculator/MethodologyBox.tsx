import React from 'react';
import { ShieldCheck, ExternalLink, Calendar, CheckCircle2, AlertCircle, Flag } from 'lucide-react';
import { getSourcesByIds } from '@/data/sources';
import { formatDateAr } from '@/lib/formatters';
import { VerificationStatus } from '@/types/rule';

interface Props {
  sourceIds: string[];
  ruleVersion: string;
  lastReviewedAt: string;
  verificationStatus: VerificationStatus;
  officialSourceName?: string;
  checkedAt?: string;
  calculatorSlug?: string;
  countryCode?: string;
  assumptions?: string[];
  qualifications?: string[];
  className?: string;
}

export default function MethodologyBox({
  sourceIds,
  ruleVersion,
  lastReviewedAt,
  verificationStatus,
  officialSourceName,
  checkedAt,
  calculatorSlug,
  countryCode,
  assumptions,
  qualifications,
  className = '',
}: Props) {
  const sources = getSourcesByIds(sourceIds);
  const effectiveDate = checkedAt || lastReviewedAt;
  const sourceName = officialSourceName || (sources.length > 0 ? sources[0].nameAr : 'الجهات الرسمية المعتمدة');

  const reportSubject = encodeURIComponent(`إبلاغ عن خطأ حسابي: ${calculatorSlug || ''} (${countryCode || 'عام'}) v${ruleVersion}`);
  const reportBody = encodeURIComponent(`السلام عليكم فريق منصة لِسيارتك،\n\nأود الإبلاغ عن ملاحظة أو خطأ في صفحة:\nالحاسبة: ${calculatorSlug || ''}\nالدولة: ${countryCode || 'عام'}\nإصدار اللائحة: v${ruleVersion}\n\nتفاصيل الملاحظة أو النتيجة المتوقعة:\n\n`);
  const reportMailto = `mailto:support@lsayartk.com?subject=${reportSubject}&body=${reportBody}`;

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5 ${className}`}>
      {/* Header with Verification Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-800">المنهجية والمصادر المرجعية</h3>
        </div>

        <div className="flex items-center gap-2">
          {effectiveDate && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> آخر تحديث: {formatDateAr(effectiveDate)}
            </span>
          )}
          <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
            الإصدار: v{ruleVersion}
          </span>
        </div>
      </div>

      {/* Freshness & Source Statement */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs sm:text-sm text-slate-700 space-y-1.5">
        <div className="font-semibold text-slate-800 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>آخر مراجعة وتحديث للقيم: {formatDateAr(effectiveDate)} استناداً إلى {sourceName}</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          تعتمد الحسابات على النصوص النظامية والمعادلات الرياضية المعلنة، وهي نتائج استرشادية غير ملزمة.
        </p>
      </div>

      {/* Official Sources */}
      {sources.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">الجهات والمصادر المرجعية:</h4>
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

      {/* Report an Error Link */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>هل لاحظت اختلافاً في الأرقام أو اللوائح؟</span>
        <a
          href={reportMailto}
          className="inline-flex items-center gap-1.5 font-bold text-amber-700 hover:text-amber-800 hover:underline bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200/60 transition-colors"
        >
          <Flag className="w-3.5 h-3.5" />
          <span>أبلغ عن خطأ في الحساب</span>
        </a>
      </div>
    </div>
  );
}
