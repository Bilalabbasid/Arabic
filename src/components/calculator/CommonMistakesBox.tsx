import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { CommonMistakeItem } from '@/types/calculator';

interface CommonMistakesBoxProps {
  mistakes?: CommonMistakeItem[];
  title?: string;
}

export default function CommonMistakesBox({
  mistakes,
  title = 'أخطاء شائعة يجب تجنبها عند الحساب',
}: CommonMistakesBoxProps) {
  if (!mistakes || mistakes.length === 0) {
    return null;
  }

  return (
    <section className="bg-amber-50/60 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
      <div className="flex items-center gap-2.5 text-amber-900 border-b border-amber-200/60 pb-3">
        <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0" />
        <h2 className="text-base sm:text-xl font-bold">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mistakes.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/90 rounded-2xl p-4 sm:p-5 border border-amber-200/70 space-y-3 shadow-xs"
          >
            {/* The mistake */}
            <div className="flex items-start gap-2 text-rose-700 font-bold text-xs sm:text-sm">
              <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>خطأ شائع: {item.mistake}</span>
            </div>

            {/* The correction */}
            <div className="flex items-start gap-2 text-emerald-800 font-semibold text-xs sm:text-sm bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200/60">
              <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>التصحيح: {item.correction}</span>
            </div>

            {/* Explanation */}
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {item.explanation}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
