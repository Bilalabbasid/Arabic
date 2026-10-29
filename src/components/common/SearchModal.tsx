'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ALL_CALCULATORS } from '@/data/calculators';
import { CalculatorDefinition } from '@/types/calculator';
import { Search, X, Calculator, ArrowLeft, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CalculatorDefinition[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults(ALL_CALCULATORS.slice(0, 5));
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(ALL_CALCULATORS.slice(0, 5));
      return;
    }

    const q = query.trim().toLowerCase();
    const filtered = ALL_CALCULATORS.filter((calc) => {
      return (
        calc.nameAr.toLowerCase().includes(q) ||
        calc.nameEn.toLowerCase().includes(q) ||
        calc.shortNameAr.toLowerCase().includes(q) ||
        calc.descriptionAr.toLowerCase().includes(q) ||
        calc.searchKeywords.some((k) => k.toLowerCase().includes(q))
      );
    });

    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-slate-900/60 backdrop-blur-sm">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10 flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن أي حاسبة... (مثال: بنزين، ضريبة، قرض، مكافأة نهاية الخدمة)"
            className="w-full px-3 py-4 text-slate-800 placeholder:text-slate-400 focus:outline-none text-base"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ms-2 px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
          >
            إغلاق
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 divide-y divide-slate-100">
          <div className="text-xs font-bold text-slate-400 px-3 py-2 flex items-center justify-between">
            <span>{query ? `نتائج البحث (${results.length})` : 'الحاسبات الشائعة'}</span>
            {!query && (
              <span className="flex items-center gap-1 text-emerald-600">
                <Sparkles className="w-3.5 h-3.5" /> مقترحة لك
              </span>
            )}
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Calculator className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="font-medium text-slate-700">لم نعثر على حاسبات مطابقة لبحثك</p>
              <p className="text-xs text-slate-400 mt-1">جرب كلمات أخرى مثل &quot;وقود&quot;، &quot;قرض&quot;، &quot;كهرباء&quot;، أو تصفح الأقسام.</p>
            </div>
          ) : (
            results.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}/`}
                onClick={onClose}
                className="group flex items-start justify-between p-3 rounded-xl hover:bg-emerald-50/70 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors text-sm sm:text-base">
                      {calc.nameAr}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {calc.descriptionAr}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="inline-block text-[11px] font-medium text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                        {calc.subcategory}
                      </span>
                    </div>
                  </div>
                </div>
                <ArrowLeft className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:-translate-x-1 transition-all shrink-0 mt-2" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
