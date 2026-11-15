import React from 'react';
import Link from 'next/link';
import { Fuel, MapPin, TrendingUp } from 'lucide-react';
import { CountryFuelInsights as Insights, SEDAN_L100, MONTHLY_KM } from '@/lib/country-fuel-insights';

const f2 = (n: number) =>
  n.toLocaleString('en-US', Math.abs(n) >= 1000 ? { maximumFractionDigits: 0 } : { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function CountryFuelInsights({ ins, countryCode }: { ins: Insights; countryCode: string }) {
  const s = ins.symbol;
  const cc = countryCode.toLowerCase();
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <Fuel className="w-5 h-5 text-emerald-600" />
          <span>كم تكلفة تعبئة خزان البنزين في {ins.name}؟</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/50">
                <th className="p-3">سعة الخزان</th>
                {ins.grades.map((g) => (
                  <th key={g.nameAr} className="p-3">{g.nameAr}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {ins.tanks.map((t) => (
                <tr key={t.liters}>
                  <td className="p-3 font-bold text-slate-800">{t.liters} لتراً</td>
                  {t.costs.map((c, i) => (
                    <td key={i} className="p-3 text-slate-700">{f2(c)} {s}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          {`بسعر ${ins.regular.nameAr} في ${ins.name} (${ins.regular.price} ${s} للتر) تدفع سيارة تستهلك ${SEDAN_L100} لترات لكل 100 كم نحو ${f2(ins.per100)} ${s} لكل 100 كم، و${f2(ins.per1000)} ${s} لكل 1,000 كم، أي قرابة ${f2(ins.monthly)} ${s} شهرياً إذا كنت تقود ${MONTHLY_KM.toLocaleString('en-US')} كم في الشهر داخل ${ins.name}.`}
        </p>
      </section>

      {ins.peers && ins.rank && ins.peers.length > 1 && (
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span>سعر البنزين في {ins.name} مقارنة بالدول المجاورة (بالريال السعودي)</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/50">
                  <th className="p-3">الدولة</th>
                  <th className="p-3">البنزين العادي بالعملة المحلية</th>
                  <th className="p-3">بالريال السعودي</th>
                  <th className="p-3">مقارنة بسعر {ins.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {ins.peers.map((x) => (
                  <tr key={x.code} className={x.self ? 'bg-emerald-50/60' : ''}>
                    <td className="p-3 font-bold text-slate-800">{x.name}</td>
                    <td className="p-3 text-slate-600">{x.local} {x.symbol}</td>
                    <td className="p-3 text-slate-700">{f2(x.sar)} ر.س</td>
                    <td className="p-3 text-slate-700">
                      {x.self ? '—' : x.diffPct === 0 ? 'مماثل تقريباً' : x.diffPct > 0 ? `أغلى بـ ${x.diffPct}%` : `أرخص بـ ${Math.abs(x.diffPct)}%`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {`ترتيب ${ins.name} في رخص البنزين العادي: المرتبة ${ins.rank.position} من بين ${ins.rank.of} دولة عربية بعد تحويل الأسعار إلى الريال السعودي (المرتبة 1 هي الأرخص). التحويل بأسعار صرف 15 نوفمبر 2026، ولا تشمل المقارنة الدول التي يختلف فيها سعر الصرف الرسمي كثيراً عن سعر السوق.`}
          </p>
        </section>
      )}

      {ins.routes.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span>تكلفة البنزين لأشهر الطرق في {ins.name}</span>
          </h2>
          <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
            {ins.routes.map((r) => (
              <li key={r.id}>
                <Link href={`/${cc}/trip-cost/${r.id}`} className="font-bold text-emerald-700 hover:underline">
                  {r.label}
                </Link>
                {`: ${r.km} كم، نحو ${f2(r.cost)} ${s} بنزين للذهاب بسعر ${ins.regular.nameAr}.`}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(ins.pricingModel || ins.history) && (
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">كيف يُحدد سعر البنزين في {ins.name}؟</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {`في ${ins.name} ${ins.pricingModel || 'تُعلن الأسعار رسمياً'}، وآخر تحقق لدينا من الأسعار المعروضة كان في ${ins.checkedAt || 'الشهر الحالي'}.`}
            {ins.history?.unchangedSince ? ` لم يتغير سعر ${ins.regular.nameAr} منذ ${ins.history.unchangedSince} على الأقل وفق سجلنا.` : ''}
            {ins.history && ins.history.changes.length > 0
              ? ` آخر تغيير لسعر ${ins.regular.nameAr}: ${ins.history.changes
                  .slice(-2)
                  .map((c) => `من ${c.from} إلى ${c.to} ${s} في ${c.date}`)
                  .join('، ثم ')}.`
              : ''}
          </p>
        </section>
      )}
    </div>
  );
}
