'use client';

import React, { useState, useEffect } from 'react';
import { COUNTRIES, getCountryByCode, DEFAULT_COUNTRY } from '@/data/countries';
import { CountryDefinition } from '@/types/country';
import { getSavedCountryCode, saveUserCountryCode } from '@/lib/storage/country';
import { Globe, Check, ChevronDown, X } from 'lucide-react';

interface Props {
  currentCountryCode?: string;
  onCountrySelect?: (country: CountryDefinition) => void;
  className?: string;
}

export default function CountrySelector({ currentCountryCode, onCountrySelect, className = '' }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryDefinition>(() => {
    if (currentCountryCode) {
      return getCountryByCode(currentCountryCode) || DEFAULT_COUNTRY;
    }
    return DEFAULT_COUNTRY;
  });

  useEffect(() => {
    if (currentCountryCode) {
      const match = getCountryByCode(currentCountryCode);
      if (match) setSelectedCountry(match);
      return;
    }

    const saved = getSavedCountryCode();
    if (saved) {
      const match = getCountryByCode(saved);
      if (match) setSelectedCountry(match);
    }

    const handler = (e: any) => {
      const code = e.detail?.countryCode;
      if (code) {
        const match = getCountryByCode(code);
        if (match) setSelectedCountry(match);
      }
    };

    window.addEventListener('lsayartk_country_changed', handler);
    return () => window.removeEventListener('lsayartk_country_changed', handler);
  }, [currentCountryCode]);

  const handleSelect = (country: CountryDefinition) => {
    setSelectedCountry(country);
    saveUserCountryCode(country.countryCode);
    setIsOpen(false);
    if (onCountrySelect) {
      onCountrySelect(country);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-500 bg-white text-slate-800 text-sm font-medium transition-colors shadow-sm"
        aria-label="اختر الدولة"
      >
        <span className="text-base" role="img" aria-label={selectedCountry.nameAr}>
          {selectedCountry.flagEmoji}
        </span>
        <span className="hidden sm:inline">{selectedCountry.nameAr}</span>
        <span className="text-xs text-slate-500 font-mono">({selectedCountry.currencySymbolAr})</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute start-0 sm:end-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white rounded-xl shadow-2xl border border-slate-100 p-2 z-50 divide-y divide-slate-50">
            <div className="p-2 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-600" />
                اختر دولتك لتطبيق العملة واللوائح
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-1">
              {COUNTRIES.map((c) => {
                const isSelected = selectedCountry.countryCode === c.countryCode;
                return (
                  <button
                    key={c.countryCode}
                    type="button"
                    onClick={() => handleSelect(c)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg text-start transition-colors ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{c.flagEmoji}</span>
                      <div>
                        <div className="leading-tight">{c.nameAr}</div>
                        <div className="text-xs text-slate-400 font-sans">{c.nameEn}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {c.currencySymbolAr}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
