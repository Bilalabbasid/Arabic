import React from 'react';
import Link from 'next/link';
import { Fuel } from 'lucide-react';
import { COUNTRIES } from '@/data/countries';
import { getCountryFuelInsights } from '@/lib/country-fuel-insights';
import { isIndexable } from '@/lib/seo/gating';

const f2 = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Regular-petrol price in every country with an official price, for the generic fuel-cost page. */
export default function ArabFuelPricesTable() {
  const rows = COUNTRIES.map((c) => ({ c, ins: getCountryFuelInsights(c.countryCode) }))
    .filter((x): x is { c: (typeof COUNTRIES)[number]; ins: NonNullable<ReturnType<typeof getCountryFuelInsights>> } => !!x.ins)
    .map(({ c, ins }) => ({
      code: c.countryCode.toLowerCase(),
      name: ins.name,
      grade: ins.regular.nameAr,
      price: ins.regular.price,
      symbol: ins.symbol,
      sar: ins.peers?.find((p) => p.self)?.sar,
      per100: ins.per100,
      checkedAt: ins.checkedAt,
      linkable: isIndexable({ countryCode: c.countryCode.toLowerCase(), calculatorSlug: 'fuel-cost' }),
    }))
    .sort((a, b) => (a.sar ?? 99) - (b.sar ?? 99));

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
        <Fuel className="w-5 h-5 text-emerald-600" />
        <span>سعر البنزين العادي في الدول العربية وتكلفة 100 كم</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/50">
              <th className="p-3">الدولة</th>
              <th className="p-3">النوع</th>
              <th className="p-3">سعر اللتر</th>
              <th className="p-3">≈ بالريال السعودي</th>
              <th className="p-3">تكلفة 100 كم (8 لتر)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <tr key={r.code}>
                <td className="p-3 font-bold">
                  {r.linkable ? (
                    <Link href={`/${r.code}/fuel-cost`} className="text-emerald-700 hover:underline">
                      {r.name}
                    </Link>
                  ) : (
                    r.name
                  )}
                </td>
                <td className="p-3 text-slate-600">{r.grade}</td>
                <td className="p-3">{r.price} {r.symbol}</td>
                <td className="p-3">{r.sar !== undefined ? `${f2(r.sar)} ر.س` : '—'}</td>
                <td className="p-3">{f2(r.per100)} {r.symbol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        الأسعار الرسمية المسجلة لكل دولة مع تاريخ آخر تحقق في صفحتها، وتحويل الريال السعودي بأسعار صرف 15 نوفمبر 2026 (لا يُعرض للدول التي يختلف فيها سعر الصرف الرسمي كثيراً عن سعر السوق). تكلفة 100 كم محسوبة لسيارة تستهلك 8 لترات، فاضربها في المسافة ÷ 100 لأي مشوار، أو استخدم الحاسبة أعلاه مع استهلاك سيارتك الفعلي.
      </p>
    </div>
  );
}
