'use client';

import React, { useId, useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { GOLD_UNIT_AR, GRAMS_PER_TOLA, GRAMS_PER_TROY_OUNCE, GoldWeightUnit, convertGoldWeight } from '@/data/gold-prices';

const UNITS: GoldWeightUnit[] = ['gram', 'tola', 'ounce'];
const DECIMALS: Record<GoldWeightUnit, number> = { gram: 3, tola: 4, ounce: 5 };

const show = (n: number, unit: GoldWeightUnit) =>
  Number.isFinite(n) ? String(Math.round(n * 10 ** DECIMALS[unit]) / 10 ** DECIMALS[unit]) : '';

/** Gram ⇄ tola ⇄ troy-ounce converter: typing in any box updates the other two. */
export default function GoldWeightConverter() {
  const baseId = useId();
  const [values, setValues] = useState<Record<GoldWeightUnit, string>>({
    gram: '100',
    tola: show(convertGoldWeight(100, 'gram', 'tola'), 'tola'),
    ounce: show(convertGoldWeight(100, 'gram', 'ounce'), 'ounce'),
  });

  const onChange = (from: GoldWeightUnit, raw: string) => {
    const n = Number(raw);
    if (raw.trim() === '' || !Number.isFinite(n) || n < 0) {
      setValues((v) => ({ ...v, [from]: raw }));
      return;
    }
    const next = { gram: '', tola: '', ounce: '' } as Record<GoldWeightUnit, string>;
    for (const u of UNITS) next[u] = u === from ? raw : show(convertGoldWeight(n, from, u), u);
    setValues(next);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 space-y-3">
      <div className="flex items-center gap-2 font-bold text-slate-800 text-sm sm:text-base">
        <ArrowLeftRight className="w-4 h-4 text-amber-600" />
        <h2>تحويل وزن الذهب: غرام ⇄ تولة ⇄ أونصة</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {UNITS.map((u) => (
          <label key={u} htmlFor={`${baseId}-${u}`} className="block space-y-1">
            <span className="text-xs font-semibold text-slate-600">{GOLD_UNIT_AR[u]}</span>
            <input
              id={`${baseId}-${u}`}
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={values[u]}
              onChange={(e) => onChange(u, e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
          </label>
        ))}
      </div>
      <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
        التولة = {GRAMS_PER_TOLA} غرام، والأونصة الذهبية (التروي) = {GRAMS_PER_TROY_OUNCE} غرام، أي أن الأونصة = 2.667 تولة تقريباً. اكتب الوزن في أي خانة لتحويله.
      </p>
    </section>
  );
}
