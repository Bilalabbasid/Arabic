import React from 'react';
import Link from 'next/link';
import { Fuel, Receipt } from 'lucide-react';
import { getCountryData } from '@/data/countries';
import { getCountryFuelInsights } from '@/lib/country-fuel-insights';
import { getVatInsights } from '@/lib/vat-insights';
import { isIndexable } from '@/lib/seo/gating';

const money = (n: number) =>
  n.toLocaleString('en-US', Math.abs(n) >= 1000 ? { maximumFractionDigits: 0 } : { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * This month's numbers for a country hub: every fuel grade with tank and per-100-km cost, the
 * change since the previous price list, and VAT with a worked example. All from verified data.
 */
export default function CountryHubFacts({ countryCode, countryNameAr }: { countryCode: string; countryNameAr: string }) {
  const cc = countryCode.toLowerCase();
  const data = getCountryData(cc);
  const fuel = getCountryFuelInsights(cc);
  const vat = getVatInsights(cc);
  if (!fuel && !vat) return null;

  const grades = data?.fuel?.value?.grades ?? {};
  const history = [...(data?.fuel?.value?.priceHistory ?? [])].sort((a, b) => b.date.localeCompare(a.date));
  const [latest, previous] = history;
  const changes =
    latest && previous
      ? Object.entries(grades)
          .map(([key, g]) => ({ name: g.nameAr, from: previous.prices[key], to: latest.prices[key] }))
          .filter((c) => c.from !== undefined && c.to !== undefined)
      : [];
  const moved = changes.filter((c) => c.from !== c.to);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {fuel && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Fuel className="w-5 h-5 text-emerald-600" />
            <span>أسعار الوقود في {countryNameAr}{fuel.checkedAt ? ` (تحقق ${fuel.checkedAt})` : ''}</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/50">
                  <th className="p-2">النوع</th>
                  <th className="p-2">اللتر</th>
                  <th className="p-2">خزان 60 لتراً</th>
                  <th className="p-2">100 كم (8 لترات)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fuel.grades.map((g) => (
                  <tr key={g.nameAr}>
                    <td className="p-2 font-bold text-slate-800">{g.nameAr}</td>
                    <td className="p-2">{g.price} {fuel.symbol}</td>
                    <td className="p-2">{money(g.price * 60)} {fuel.symbol}</td>
                    <td className="p-2">{money(g.price * 8)} {fuel.symbol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {moved.length > 0
              ? `مقارنة بقائمة ${previous.date}: ${moved
                  .map((c) => `${c.name} ${c.to > c.from ? 'ارتفع' : 'انخفض'} من ${c.from} إلى ${c.to} ${fuel.symbol}`)
                  .join('، ')}.`
              : latest && previous
                ? `لم تتغير الأسعار عن قائمة ${previous.date}.`
                : `${fuel.pricingModel ? `في ${countryNameAr} ${fuel.pricingModel}.` : ''}`}{' '}
            {`ومن يقود 1,500 كم شهرياً بسيارة تستهلك 8 لترات لكل 100 كم يدفع نحو ${money(fuel.monthly)} ${fuel.symbol} في الشهر بسعر ${fuel.regular.nameAr}.`}{' '}
            {isIndexable({ countryCode: cc, calculatorSlug: 'fuel-cost' }) && (
              <Link href={`/${cc}/fuel-cost`} className="font-bold text-emerald-700 hover:underline">
                احسب تكلفة مشوارك بهذه الأسعار
              </Link>
            )}
          </p>
        </div>
      )}
      {vat && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-600" />
            <span>{vat.taxName} في {countryNameAr}: {vat.rate}%</span>
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {`تُطبق ${vat.taxName} بنسبة ${vat.rate}%${vat.validFrom ? ` منذ ${vat.validFrom}` : ''}${vat.authority ? ` وتشرف عليها ${vat.authority}` : ''}. فسلعة سعرها 1,000 ${vat.symbol} قبل الضريبة تُباع بـ ${money(vat.forward[2].gross)} ${vat.symbol}، وفاتورة إجماليها 1,000 ${vat.symbol} شاملة الضريبة أصلها ${money(vat.reverse[2].net)} ${vat.symbol} والضريبة فيها ${money(vat.reverse[2].vat)} ${vat.symbol}.`}
          </p>
          {vat.exemptions.length > 0 && (
            <ul className="text-xs sm:text-sm text-slate-600 space-y-1 list-disc list-inside">
              {vat.exemptions.slice(0, 3).map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
          {isIndexable({ countryCode: cc, calculatorSlug: 'vat-calculator' }) && (
            <Link href={`/${cc}/vat-calculator`} className="inline-block text-sm font-bold text-emerald-700 hover:underline">
              احسب الضريبة لأي مبلغ ←
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
