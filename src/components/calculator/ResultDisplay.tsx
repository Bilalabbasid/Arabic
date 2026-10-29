'use client';

import React, { useState } from 'react';
import { CalculationResult } from '@/types/calculator';
import {
  Sparkles,
  AlertTriangle,
  Copy,
  Check,
  CheckCircle2,
  Table,
  ListOrdered,
  Info,
  Calendar,
} from 'lucide-react';
import { formatDateAr } from '@/lib/formatters';

interface Props {
  result: CalculationResult;
  currency?: string;
  countryCode?: string;
  className?: string;
}

export default function ResultDisplay({ result, currency, countryCode, className = '' }: Props) {
  const [copied, setCopied] = useState(false);

  if (result.error) {
    return (
      <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-sm">تنبيه التحقق من المدخلات</h4>
          <p className="text-xs sm:text-sm text-amber-700 mt-1">{result.error}</p>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    const textToCopy = `${result.primary.label}: ${result.primary.formattedValue || result.primary.value} ${result.primary.unit || ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Primary Result Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-900/10 border border-emerald-500/30">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-emerald-300" />
            </span>
            <span className="text-xs sm:text-sm font-semibold text-emerald-100">
              {result.primary.label}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {result.primary.badge && (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
                {result.primary.badge}
              </span>
            )}
            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white transition-colors"
              title="نسخ النتيجة"
              aria-label="نسخ النتيجة"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Primary Value */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl sm:text-5xl font-black font-sans tracking-tight">
            {result.primary.formattedValue || result.primary.value}
          </span>
          {result.primary.unit && !result.primary.isCurrency && (
            <span className="text-base sm:text-xl font-bold text-emerald-200">
              {result.primary.unit}
            </span>
          )}
        </div>

        {/* Direct Answer text if available */}
        {result.directAnswer && (
          <div className="mt-4 pt-4 border-t border-white/15 text-xs sm:text-sm text-emerald-50/90 leading-relaxed">
            {result.directAnswer}
          </div>
        )}
      </div>

      {/* Warnings if any */}
      {result.warnings && result.warnings.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
          <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>تنبيه هام حول العملية الحسابية:</span>
          </div>
          <ul className="list-disc list-inside text-xs text-amber-700 ps-6 space-y-0.5">
            {result.warnings.map((w, idx) => (
              <li key={idx}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Secondary Results Grid */}
      {result.secondary && result.secondary.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {result.secondary.map((sec, idx) => (
            <div
              key={sec.id || idx}
              className={`p-4 rounded-2xl border transition-all ${
                sec.highlight
                  ? 'bg-emerald-50/80 border-emerald-200 shadow-sm'
                  : 'bg-white border-slate-200/80 shadow-sm'
              }`}
            >
              <div className="text-xs font-medium text-slate-500 mb-1">{sec.label}</div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 font-sans">
                {sec.formattedValue || sec.value} {sec.unit && !sec.isCurrency ? sec.unit : ''}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Breakdown Table if available */}
      {result.breakdown && result.breakdown.rows.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-2 text-slate-800 font-bold text-sm sm:text-base">
            <Table className="w-4 h-4 text-emerald-600" />
            <span>جدول التفاصيل والاستهلاك التدريجي</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-start divide-y divide-slate-100">
              <thead className="bg-slate-50/80 text-slate-600 font-bold">
                <tr>
                  <th className="py-3 px-4 text-start font-semibold">الفترة / الشريحة</th>
                  {result.breakdown.columns.map((col) => (
                    <th key={col.key} className="py-3 px-4 text-start font-semibold">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {result.breakdown.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      {row.period}
                    </td>
                    {result.breakdown!.columns.map((col) => (
                      <td key={col.key} className="py-3 px-4 whitespace-nowrap font-mono text-slate-800">
                        {row.values[col.key] ?? '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Calculation Steps if available */}
      {result.calculationSteps && result.calculationSteps.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm sm:text-base">
            <ListOrdered className="w-4 h-4 text-emerald-600" />
            <span>خطوات المعادلة الحسابية المنفذة</span>
          </div>
          <ol className="space-y-2 text-xs sm:text-sm text-slate-700">
            {result.calculationSteps.map((step, sIdx) => (
              <li key={sIdx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {sIdx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
