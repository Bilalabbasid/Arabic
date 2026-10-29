import React from 'react';
import { WorkedExample } from '@/types/calculator';
import { BookOpen, CheckCircle, ArrowLeft } from 'lucide-react';

interface Props {
  examples: WorkedExample[];
  className?: string;
}

export default function WorkedExampleBox({ examples, className = '' }: Props) {
  if (!examples || examples.length === 0) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 text-slate-800">
        <BookOpen className="w-5 h-5 text-emerald-600" />
        <h3 className="text-base font-bold">أمثلة عملية واقعية خطوة بخطوة</h3>
      </div>

      <div className="space-y-4">
        {examples.map((example, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4"
          >
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                {example.title}
              </h4>
              {example.description && (
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {example.description}
                </p>
              )}
            </div>

            {/* Steps list */}
            {example.steps && example.steps.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
                <span className="text-xs font-bold text-slate-600 block mb-2">خطوات الحل التفصيلية:</span>
                <ol className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {example.steps.map((step, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Summary Box */}
            {example.resultSummary && (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200/70 text-xs sm:text-sm font-bold">
                <span>النتيجة النهائية للمثال:</span>
                <span className="text-emerald-700 font-mono text-sm sm:text-base">{example.resultSummary}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
