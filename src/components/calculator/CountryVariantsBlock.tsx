import React from 'react';
import Link from 'next/link';
import { COUNTRIES, getCountryByCode } from '@/data/countries';
import { isIndexable } from '@/lib/seo/gating';
import CountryFlag from '@/components/common/CountryFlag';
import { Globe, ArrowLeft, MapPin } from 'lucide-react';

interface Props {
  calculatorSlug: string;
  currentCountryCode?: string;
  calculatorNameAr?: string;
  className?: string;
}

export default function CountryVariantsBlock({
  calculatorSlug,
  currentCountryCode,
  calculatorNameAr = 'هذه الحاسبة',
  className = '',
}: Props) {
  const normSlug = calculatorSlug === 'car-fuel-cost' ? 'fuel-cost' : calculatorSlug;

  // Find all countries where this calculator is indexable
  const availableCountries = COUNTRIES.filter((c) => {
    const cCode = c.countryCode.toLowerCase();
    return isIndexable({ countryCode: cCode, calculatorSlug: normSlug });
  });

  const otherCountries = currentCountryCode
    ? availableCountries.filter((c) => c.countryCode.toLowerCase() !== currentCountryCode.toLowerCase())
    : availableCountries;

  if (otherCountries.length === 0 && !currentCountryCode) {
    return null;
  }

  return (
    <div className={`bg-gradient-to-br from-slate-50 to-emerald-50/20 rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/70">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-800">
            متوفر أيضاً في الدول التالية
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          مخصصة باللوائح والضرائب والعملة المحلية
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
        {/* On country pages, link back to generic universal version */}
        {currentCountryCode && (
          <Link
            href={`/calculators/${normSlug}`}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 transition-all text-xs font-bold text-slate-700 hover:text-emerald-700 shadow-xs group"
          >
            <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">النسخة العامة</span>
          </Link>
        )}

        {otherCountries.map((c) => (
          <Link
            key={c.countryCode}
            href={`/${c.countryCode.toLowerCase()}/${normSlug}`}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 transition-all text-xs font-semibold text-slate-700 hover:text-emerald-700 shadow-xs group"
          >
            <CountryFlag countryCode={c.countryCode} className="w-5 h-3.5 shadow-xs shrink-0 rounded-xs" />
            <span className="truncate">{c.nameAr}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

