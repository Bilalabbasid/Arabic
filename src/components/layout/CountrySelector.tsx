'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { COUNTRIES, getCountryByCode, DEFAULT_COUNTRY } from '@/data/countries';
import { CountryDefinition } from '@/types/country';
import { getCalculatorBySlug } from '@/data/calculators';
import { isCountryCalculatorValid } from '@/lib/seo/metadata';
import { getSavedCountryCode, saveUserCountryCode } from '@/lib/storage/country';
import { Globe, Check, ChevronDown, X, Search } from 'lucide-react';

interface Props {
  currentCountryCode?: string;
  onCountrySelect?: (country: CountryDefinition) => void;
  className?: string;
}

export default function CountrySelector({ currentCountryCode, onCountrySelect, className = '' }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Determine initial country based on prop, URL pathname, or saved storage
  const [selectedCountry, setSelectedCountry] = useState<CountryDefinition>(() => {
    if (currentCountryCode) {
      return getCountryByCode(currentCountryCode) || DEFAULT_COUNTRY;
    }
    return DEFAULT_COUNTRY;
  });

  // Synchronize country with URL or local storage
  useEffect(() => {
    // 1. Explicit prop passed
    if (currentCountryCode) {
      const match = getCountryByCode(currentCountryCode);
      if (match) setSelectedCountry(match);
      return;
    }

    // 2. Derive from URL (e.g. /sa or /sa/car-fuel-cost)
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0]?.toLowerCase();
    if (firstSegment) {
      const matchUrl = getCountryByCode(firstSegment);
      if (matchUrl) {
        setSelectedCountry(matchUrl);
        saveUserCountryCode(matchUrl.countryCode);
        return;
      }
    }

    // 3. Fallback to storage
    const saved = getSavedCountryCode();
    if (saved) {
      const match = getCountryByCode(saved);
      if (match) setSelectedCountry(match);
    }

    // 4. Custom event listener for cross-component sync
    const handler = (e: any) => {
      const code = e.detail?.countryCode;
      if (code) {
        const match = getCountryByCode(code);
        if (match) setSelectedCountry(match);
      }
    };

    window.addEventListener('lsayartk_country_changed', handler);
    return () => window.removeEventListener('lsayartk_country_changed', handler);
  }, [currentCountryCode, pathname]);

  // Click outside and Escape key handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (country: CountryDefinition) => {
    setSelectedCountry(country);
    saveUserCountryCode(country.countryCode);
    setIsOpen(false);
    setSearchQuery('');

    if (onCountrySelect) {
      onCountrySelect(country);
      return;
    }

    // Smart URL Routing
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0]?.toLowerCase();
    const currentCountryMatch = firstSegment ? getCountryByCode(firstSegment) : undefined;
    const targetCode = country.countryCode.toLowerCase();

    // If currently on a country route (e.g. /sa or /sa/vat-calculator)
    if (currentCountryMatch) {
      if (segments.length >= 2) {
        const calcSlug = segments[1];
        const calc = getCalculatorBySlug(calcSlug);
        if (calc && isCountryCalculatorValid(calc, country.countryCode)) {
          router.push(`/${targetCode}/${calcSlug}/`);
          return;
        }
      }
      // Redirect to the new country hub
      router.push(`/${targetCode}/`);
      return;
    }

    // If on homepage, redirect to the selected country hub
    if (pathname === '/' || pathname === '') {
      router.push(`/${targetCode}/`);
      return;
    }
  };

  // Filter countries by search query
  const filteredCountries = COUNTRIES.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      c.nameAr.toLowerCase().includes(q) ||
      c.nameEn.toLowerCase().includes(q) ||
      c.countryCode.toLowerCase().includes(q) ||
      c.currencySymbolAr.includes(q)
    );
  });

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border text-sm font-medium transition-all shadow-sm ${
          isOpen
            ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/50 text-emerald-950'
            : 'border-slate-200 hover:border-emerald-500 bg-white text-slate-800'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="اختر الدولة والعملة"
      >
        <span className="text-base leading-none" role="img" aria-label={selectedCountry.nameAr}>
          {selectedCountry.flagEmoji}
        </span>
        <span className="hidden sm:inline font-semibold">{selectedCountry.nameAr}</span>
        <span className="text-xs text-slate-500 font-mono">({selectedCountry.currencySymbolAr})</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="قائمة الدول العربية"
          className="absolute end-0 top-full mt-2 w-[calc(100vw-1.5rem)] sm:w-80 max-w-sm max-h-[28rem] overflow-hidden bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-50 flex flex-col animate-in fade-in zoom-in-95 duration-100"
        >
          {/* Header */}
          <div className="p-3 border-b border-slate-100 bg-slate-50/80">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Globe className="w-4 h-4 text-emerald-600" />
                اختر دولتك لتطبيق العملة واللوائح
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute start-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن دولة أو عملة..."
                className="w-full ps-8 pe-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                autoFocus
              />
            </div>
          </div>

          {/* List of Countries */}
          <div className="overflow-y-auto p-1.5 divide-y divide-slate-50 flex-1">
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500">
                لا توجد نتائج مطابقة لبحثك
              </div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = selectedCountry.countryCode === c.countryCode;
                return (
                  <button
                    key={c.countryCode}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(c)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl text-start transition-colors ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-950 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl leading-none">{c.flagEmoji}</span>
                      <div>
                        <div className="leading-tight text-xs sm:text-sm">{c.nameAr}</div>
                        <div className="text-[11px] text-slate-400 font-sans">{c.nameEn}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono">
                        {c.currencySymbolAr}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
