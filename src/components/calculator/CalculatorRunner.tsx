'use client';

import React, { useState, useEffect, useId, useTransition } from 'react';
import { CalculatorInput, CalculationResult, SelectOption } from '@/types/calculator';
import { loadCalculatorEngine } from '@/lib/calculators/dynamic-loader';
import ResultDisplay from './ResultDisplay';
import {
  isCalculatorFavorite,
  toggleFavoriteCalculator,
  recordCalculatorInteraction,
} from '@/lib/storage/favorites';
import {
  RotateCcw,
  Bookmark,
  Share2,
  Check,
  AlertCircle,
  HelpCircle,
  SlidersHorizontal,
} from 'lucide-react';

interface Props {
  slug: string;
  nameAr: string;
  category: string;
  inputs: CalculatorInput[];
  initialResult: CalculationResult;
  calculationEngineId: string;
  countryCode?: string;
  currencyCode?: string;
}

export function resolveFieldLabel(def: CalculatorInput, currentInputs: Record<string, any>): string {
  if (def.conditionalLabels) {
    for (const item of def.conditionalLabels) {
      if (currentInputs[item.condition.field] === item.condition.value) {
        return item.label;
      }
    }
  }
  return def.label;
}

export function resolveFieldUnit(def: CalculatorInput, currentInputs: Record<string, any>): string | undefined {
  if (def.conditionalLabels) {
    for (const item of def.conditionalLabels) {
      if (currentInputs[item.condition.field] === item.condition.value && item.unit !== undefined) {
        return item.unit;
      }
    }
  }
  return def.unit;
}

export function resolveFieldHelpText(def: CalculatorInput, currentInputs: Record<string, any>): string | undefined {
  if (def.conditionalLabels) {
    for (const item of def.conditionalLabels) {
      if (currentInputs[item.condition.field] === item.condition.value && item.helpText !== undefined) {
        return item.helpText;
      }
    }
  }
  return def.helpText;
}

export function resolveFieldOptions(def: CalculatorInput, currentInputs: Record<string, any>): SelectOption[] | undefined {
  if (def.conditionalOptions) {
    for (const item of def.conditionalOptions) {
      if (currentInputs[item.condition.field] === item.condition.value) {
        return item.options;
      }
    }
  }
  return def.options;
}

export default function CalculatorRunner({
  slug,
  nameAr,
  category,
  inputs: inputDefs,
  initialResult,
  calculationEngineId,
  countryCode,
  currencyCode,
}: Props) {
  const formId = useId();
  const [, startTransition] = useTransition();

  // State: Inputs
  const [inputs, setInputs] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    for (const inp of inputDefs) {
      init[inp.id] = inp.defaultValue;
    }
    return init;
  });

  // State: Validation Errors
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // State: Active Calculation Result
  const [result, setResult] = useState<CalculationResult>(initialResult);

  // State: Favorited
  const [isFavorited, setIsFavorited] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Record interaction on mount & sync favorite state
  useEffect(() => {
    recordCalculatorInteraction(slug);
    setIsFavorited(isCalculatorFavorite(slug));

    const handler = (e: any) => {
      if (e.detail?.slug === slug) {
        setIsFavorited(Boolean(e.detail.isFavorited));
      }
    };
    window.addEventListener('lsayartk_favorites_changed', handler);
    return () => window.removeEventListener('lsayartk_favorites_changed', handler);
  }, [slug]);

  // Validation function: NEVER silently clamps, shows explicit message
  const validateInputs = (newInputs: Record<string, any>): Record<string, string> => {
    const errors: Record<string, string> = {};

    for (const def of inputDefs) {
      // Check dependsOn visibility
      if (def.dependsOn) {
        const parentVal = newInputs[def.dependsOn.field];
        const match = Array.isArray(def.dependsOn.value)
          ? def.dependsOn.value.includes(parentVal)
          : parentVal === def.dependsOn.value;
        if (!match) continue; // Hidden field, don't validate
      }

      const val = newInputs[def.id];

      if (def.required && (val === undefined || val === null || val === '')) {
        errors[def.id] = 'هذا الحقل مطلوب لإتمام الحساب.';
        continue;
      }

      if (def.type === 'number' || def.type === 'decimal' || def.type === 'currency' || def.type === 'percentage') {
        const num = Number(val);
        if (isNaN(num)) {
          errors[def.id] = 'يرجى إدخال قيمة عددية صحيحة.';
        } else {
          if (def.min !== undefined && num < def.min) {
            errors[def.id] = `الحد الأدنى المسموح به هو ${def.min}.`;
          } else if (def.max !== undefined && num > def.max) {
            errors[def.id] = `الحد الأقصى المسموح به هو ${def.max}.`;
          }
        }
      }
    }

    return errors;
  };

  // Run calculation dynamically
  const runCalculation = async (currentInputs: Record<string, any>) => {
    const errors = validateInputs(currentInputs);
    setValidationErrors(errors);

    // If critical required field has error, don't execute engine with corrupted data
    if (Object.keys(errors).length > 0) {
      setResult((prev) => ({
        ...prev,
        error: 'يرجى تصحيح المدخلات غير الصحيحة المحددة باللون الأحمر أدناه.',
      }));
      return;
    }

    try {
      const engineFn = await loadCalculatorEngine(calculationEngineId);
      if (engineFn) {
        startTransition(() => {
          const res = engineFn(currentInputs, {
            countryCode,
            currencyCode,
          });
          setResult(res);
        });
      }
    } catch (err) {
      console.error('Calculation error:', err);
      setResult({
        primary: { label: 'خطأ', value: 0, formattedValue: '-' },
        error: 'حدث خطأ أثناء إجراء الحساب. يرجى مراجعة القيم المدخلة.',
      });
    }
  };

  const handleInputChange = (fieldId: string, value: any) => {
    const updated = { ...inputs, [fieldId]: value };
    setInputs(updated);
    runCalculation(updated);
  };

  const handleReset = () => {
    const init: Record<string, any> = {};
    for (const inp of inputDefs) {
      init[inp.id] = inp.defaultValue;
    }
    setInputs(init);
    setValidationErrors({});
    runCalculation(init);
  };

  const handleFavoriteToggle = () => {
    const nowFav = toggleFavoriteCalculator(slug);
    setIsFavorited(nowFav);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left / Main Column: Form Inputs */}
      <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        {/* Card Header with Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
            <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
            <span>مدخلات ومعطيات الحساب</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleFavoriteToggle}
              className={`p-2 rounded-xl transition-colors ${
                isFavorited
                  ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
              }`}
              title={isFavorited ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
              aria-label="المفضلة"
            >
              <Bookmark className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              title="مشاركة رابط الحاسبة"
              aria-label="مشاركة"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              title="إعادة التعيين للقيم الافتراضية"
              aria-label="إعادة التعيين"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Inputs List */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          {inputDefs.map((def) => {
            // Check dependsOn
            if (def.dependsOn) {
              const parentVal = inputs[def.dependsOn.field];
              const isVisible = Array.isArray(def.dependsOn.value)
                ? def.dependsOn.value.includes(parentVal)
                : parentVal === def.dependsOn.value;
              if (!isVisible) return null;
            }

            const label = resolveFieldLabel(def, inputs);
            const unit = resolveFieldUnit(def, inputs);
            const help = resolveFieldHelpText(def, inputs);
            const options = resolveFieldOptions(def, inputs);
            const error = validationErrors[def.id];
            const inputId = `${formId}-${def.id}`;

            return (
              <div key={def.id} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor={inputId} className="block text-xs sm:text-sm font-bold text-slate-800">
                    {label}
                    {def.required && <span className="text-rose-500 ms-1">*</span>}
                  </label>
                  {unit && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {unit}
                    </span>
                  )}
                </div>

                {/* Input Controls Rendering */}
                {def.type === 'select' || def.type === 'country' ? (
                  <select
                    id={inputId}
                    value={inputs[def.id] ?? def.defaultValue}
                    onChange={(e) => handleInputChange(def.id, e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white text-slate-800 text-sm font-medium transition-colors"
                  >
                    {options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : def.type === 'radio' ? (
                  <div className="space-y-2 pt-1">
                    {options?.map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                          inputs[def.id] === opt.value
                            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-bold'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name={inputId}
                          value={opt.value}
                          checked={inputs[def.id] === opt.value}
                          onChange={(e) => handleInputChange(def.id, e.target.value)}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-xs sm:text-sm">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                ) : def.type === 'slider' ? (
                  <div className="space-y-2">
                    <input
                      id={inputId}
                      type="range"
                      min={def.min ?? 0}
                      max={def.max ?? 100}
                      step={def.step ?? 1}
                      value={inputs[def.id] ?? def.defaultValue}
                      onChange={(e) => handleInputChange(def.id, Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span>{def.min}</span>
                      <span className="font-bold text-slate-800 text-sm">{inputs[def.id]} {unit}</span>
                      <span>{def.max}</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      id={inputId}
                      type={def.type === 'number' || def.type === 'decimal' || def.type === 'currency' || def.type === 'percentage' ? 'number' : 'text'}
                      value={inputs[def.id] ?? ''}
                      min={def.min}
                      max={def.max}
                      step={def.step ?? (def.type === 'decimal' ? '0.1' : '1')}
                      placeholder={def.placeholder || (def.exampleValue !== undefined ? `مثال: ${def.exampleValue}` : '')}
                      onChange={(e) => handleInputChange(def.id, e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                        error
                          ? 'border-rose-400 bg-rose-50/40 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                          : 'border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white text-slate-800'
                      }`}
                    />
                  </div>
                )}

                {/* Validation Error Message */}
                {error && (
                  <p className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{error}</span>
                  </p>
                )}

                {/* Help text */}
                {help && !error && (
                  <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                    {help}
                  </p>
                )}
              </div>
            );
          })}
        </form>
      </div>

      {/* Right Column: Live Results Display */}
      <div className="lg:col-span-6 space-y-6">
        <ResultDisplay
          result={result}
          currency={currencyCode}
          countryCode={countryCode}
        />
      </div>
    </div>
  );
}
