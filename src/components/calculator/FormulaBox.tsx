import React from 'react';
import { FunctionSquare, Info } from 'lucide-react';

interface Props {
  formula: string;
  explanation: string;
  className?: string;
}

export default function FormulaBox({ formula, explanation, className = '' }: Props) {
  if (!formula) return null;

  return (
    <div className={`bg-gradient-to-br from-slate-50 to-slate-100/80 rounded-2xl p-6 border border-slate-200/80 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-3 text-slate-800">
        <FunctionSquare className="w-5 h-5 text-emerald-600" />
        <h3 className="text-base font-bold">المعادلة الرياضية المستخدمة</h3>
      </div>

      {/* Formula Display Banner (enforces LTR for mathematical symbols while isolating Arabic labels) */}
      <div
        dir="ltr"
        className="bg-white rounded-xl p-4 border border-slate-200/60 font-mono text-sm sm:text-base text-emerald-950 font-bold overflow-x-auto text-left shadow-inner"
      >
        <bdi>{formula}</bdi>
      </div>

      {/* Explanation */}
      {explanation && (
        <div className="mt-4 flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}
