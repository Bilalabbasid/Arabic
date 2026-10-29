import React from 'react';
import Link from 'next/link';
import { CalculatorDefinition } from '@/types/calculator';
import { Calculator, ArrowLeft } from 'lucide-react';

interface Props {
  calculators: CalculatorDefinition[];
  currentCountryCode?: string;
  className?: string;
}

export default function RelatedCalculators({ calculators, currentCountryCode, className = '' }: Props) {
  if (!calculators || calculators.length === 0) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">حاسبات ذات صلة قد تهمك</h3>
        <Link href="/calculators/" className="text-xs font-bold text-emerald-600 hover:underline">
          عرض كل الحاسبات &larr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculators.map((calc) => {
          const href = currentCountryCode
            ? `/${currentCountryCode.toLowerCase()}/${calc.slug}/`
            : `/calculators/${calc.slug}/`;

          return (
            <Link
              key={calc.slug}
              href={href}
              className="group p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Calculator className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {calc.subcategory}
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors text-sm line-clamp-1">
                  {calc.nameAr}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {calc.descriptionAr}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                <span>ابدأ الحساب</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
