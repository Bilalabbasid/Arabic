import React from 'react';
import Link from 'next/link';
import { getCalculatorBySlug } from '@/data/calculators';
import { isIndexable } from '@/lib/seo/gating';
import { getCalculatorSeoMeta } from '@/seo/calculatorSeoData';
import { Calculator, ArrowLeft, Sparkles } from 'lucide-react';

interface Props {
  calculatorSlug: string;
  currentCountryCode?: string;
  className?: string;
}

export default function RelatedCalculatorsBlock({
  calculatorSlug,
  currentCountryCode,
  className = '',
}: Props) {
  const normSlug = calculatorSlug === 'car-fuel-cost' ? 'fuel-cost' : calculatorSlug;
  const seoMeta = getCalculatorSeoMeta(normSlug);

  if (!seoMeta || !seoMeta.relatedCalculators || seoMeta.relatedCalculators.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">حاسبات مرتبطة وموصى بها</h3>
        </div>
        <Link href="/calculators" className="text-xs font-bold text-emerald-600 hover:underline">
          عرض كل الحاسبات &larr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {seoMeta.relatedCalculators.slice(0, 6).map((item) => {
          const calcDef = getCalculatorBySlug(item.slug);
          if (!calcDef) return null;

          // Determine destination URL: on country page, link to same country's variant if indexable, else generic
          const isCountryVariantIndexable = currentCountryCode
            ? isIndexable({ countryCode: currentCountryCode.toLowerCase(), calculatorSlug: item.slug })
            : false;

          const targetUrl = isCountryVariantIndexable
            ? `/${currentCountryCode!.toLowerCase()}/${item.slug}`
            : `/calculators/${item.slug}`;

          return (
            <Link
              key={item.slug}
              href={targetUrl}
              className="group p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Calculator className="w-4 h-4" />
                  </span>
                  {isCountryVariantIndexable && currentCountryCode && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                      مخصص لدولتك
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors text-sm line-clamp-1">
                  {calcDef.nameAr}
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                  {item.reason}
                </p>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
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

