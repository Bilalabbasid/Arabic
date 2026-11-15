'use client';

import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import {
  GOLD_REFERENCE,
  goldCurrencyFor,
  karatPurity,
  pricePerGram24,
  DEFAULT_GOLD_COUNTRY,
} from '@/data/gold-prices';
import { getSavedCountryCode } from '@/lib/storage/country';

interface LiveQuote {
  usdPerOunce: number;
  /** Units per USD, keyed by ISO currency code. */
  rates: Record<string, number>;
  updatedAt: string;
}

let quotePromise: Promise<LiveQuote | null> | null = null;

/** One fetch per page view: spot gold in USD (gold-api.com) and USD exchange rates (open.er-api.com). */
function fetchQuote(): Promise<LiveQuote | null> {
  if (!quotePromise) {
    quotePromise = (async () => {
      try {
        const [goldRes, fxRes] = await Promise.all([
          fetch('https://api.gold-api.com/price/XAU', { cache: 'no-store' }),
          fetch('https://open.er-api.com/v6/latest/USD'),
        ]);
        if (!goldRes.ok) return null;
        const gold = await goldRes.json();
        const fx = fxRes.ok ? await fxRes.json() : null;
        const price = Number(gold?.price);
        if (!Number.isFinite(price) || price <= 0) return null;
        return {
          usdPerOunce: price,
          rates: fx?.result === 'success' && fx.rates ? fx.rates : {},
          updatedAt: String(gold.updatedAt || new Date().toISOString()),
        };
      } catch {
        return null;
      }
    })();
  }
  return quotePromise;
}

const KARATS = [24, 22, 21, 18];

export default function LiveGoldPrice({ slug, inputId = 'goldPrice24' }: { slug: string; inputId?: string }) {
  const [country, setCountry] = useState<string>(DEFAULT_GOLD_COUNTRY);
  const [quote, setQuote] = useState<LiveQuote | null>(null);
  const [status, setStatus] = useState<'loading' | 'live' | 'fallback'>('loading');
  const countryRef = useRef(country);

  const currency = goldCurrencyFor(country);
  const usdPerOunce = quote?.usdPerOunce ?? GOLD_REFERENCE.usdPerOunce;
  const rate = quote?.rates[currency.code] ?? currency.usdRate;
  const p24 = pricePerGram24(usdPerOunce, rate);
  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: currency.decimals, maximumFractionDigits: currency.decimals });

  const applyPrice = (cc: string, q: LiveQuote | null) => {
    const cur = goldCurrencyFor(cc);
    const raw = pricePerGram24(q?.usdPerOunce ?? GOLD_REFERENCE.usdPerOunce, q?.rates[cur.code] ?? cur.usdRate);
    const value = Math.round(raw * 10 ** cur.decimals) / 10 ** cur.decimals;
    // Deferred so the runner handles a country change first, then receives the matching price.
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('lsayartk_set_inputs', { detail: { slug, values: { [inputId]: value } } }));
    }, 0);
  };

  useEffect(() => {
    const cc = (getSavedCountryCode() || DEFAULT_GOLD_COUNTRY).toLowerCase();
    countryRef.current = cc;
    setCountry(cc);
    let cancelled = false;
    fetchQuote().then((q) => {
      if (cancelled) return;
      setQuote(q);
      setStatus(q ? 'live' : 'fallback');
      if (q) applyPrice(countryRef.current, q);
    });

    const onCountry = (e: any) => {
      const next = String(e.detail?.countryCode || '').toLowerCase();
      if (!next) return;
      countryRef.current = next;
      setCountry(next);
      fetchQuote().then((q) => applyPrice(next, q));
    };
    window.addEventListener('lsayartk_country_changed', onCountry);
    return () => {
      cancelled = true;
      window.removeEventListener('lsayartk_country_changed', onCountry);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, inputId]);

  const updated = quote ? new Date(quote.updatedAt) : null;
  const updatedText = updated
    ? updated.toLocaleString('ar-EG-u-nu-latn', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
    : GOLD_REFERENCE.asOf;

  return (
    <section className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 sm:p-5 space-y-3" aria-live="polite">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-bold text-amber-950 text-sm sm:text-base">
          سعر غرام الذهب اليوم بـ{currency.nameAr}
        </h2>
        <span className="text-[11px] sm:text-xs text-amber-900/80">
          {status === 'loading' && 'جارٍ جلب السعر الحالي…'}
          {status === 'live' && `سعر السوق العالمي • آخر تحديث ${updatedText}`}
          {status === 'fallback' && `تعذّر جلب السعر الآن؛ نعرض السعر المرجعي بتاريخ ${GOLD_REFERENCE.asOf}`}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {KARATS.map((k) => (
          <div key={k} className="bg-white rounded-xl border border-amber-100 px-3 py-2">
            <div className="text-[11px] text-slate-500">عيار {k}</div>
            <div className="font-bold text-slate-900 text-sm sm:text-base tabular-nums">
              {fmt(p24 * karatPurity(k))} <span className="text-xs font-medium">{currency.symbolAr}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-600">
        <span>
          الأونصة {usdPerOunce.toLocaleString('en-US', { maximumFractionDigits: 2 })} دولار. أسعار المحلات قد تزيد قليلاً عن سعر السوق، فعدّل السعر في الحاسبة بسعر محلك.
        </span>
        <button
          type="button"
          onClick={() => applyPrice(countryRef.current, quote)}
          className="inline-flex items-center gap-1 font-bold text-amber-800 hover:text-amber-950"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          استخدم سعر اليوم في الحاسبة
        </button>
      </div>
    </section>
  );
}
