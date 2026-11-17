import React from 'react';
import Link from 'next/link';
import { Receipt } from 'lucide-react';
import { VatInsights as Insights, arabVatRates } from '@/lib/vat-insights';
import { isIndexable } from '@/lib/seo/gating';

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Worked VAT amounts in the country's currency: adding the tax, and extracting it from a gross price. */
export function CountryVatInsights({ v }: { v: Insights }) {
  const s = v.symbol;
  const mul = (1 + v.rate / 100).toFixed(2);
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
      <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
        <Receipt className="w-5 h-5 text-emerald-600" />
        <span>جدول {v.taxName} {v.rate}% في {v.name} لمبالغ شائعة</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs sm:text-sm">
            <caption className="text-start text-xs font-bold text-slate-600 pb-2">إضافة الضريبة (× {mul})</caption>
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/50">
                <th className="p-2">المبلغ قبل الضريبة</th>
                <th className="p-2">الضريبة</th>
                <th className="p-2">الإجمالي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {v.forward.map((r) => (
                <tr key={r.net}>
                  <td className="p-2">{fmt(r.net)} {s}</td>
                  <td className="p-2">{fmt(r.vat)} {s}</td>
                  <td className="p-2 font-bold text-emerald-700">{fmt(r.gross)} {s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs sm:text-sm">
            <caption className="text-start text-xs font-bold text-slate-600 pb-2">استخراج أصل المبلغ (÷ {mul})</caption>
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/50">
                <th className="p-2">المبلغ شامل الضريبة</th>
                <th className="p-2">أصل المبلغ</th>
                <th className="p-2">الضريبة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {v.reverse.map((r) => (
                <tr key={r.gross}>
                  <td className="p-2">{fmt(r.gross)} {s}</td>
                  <td className="p-2 font-bold text-emerald-700">{fmt(r.net)} {s}</td>
                  <td className="p-2">{fmt(r.vat)} {s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        {`في ${v.name} تُحسب ${v.taxName} بنسبة ${v.rate}%${v.validFrom ? ` منذ ${v.validFrom}` : ''}: اضرب المبلغ الصافي في ${(v.rate / 100).toFixed(2)} لمعرفة الضريبة، أو في ${mul} لمعرفة السعر النهائي، واقسم أي سعر شامل للضريبة على ${mul} لاستخراج أصل المبلغ. فمثلاً فاتورة إجماليها ${fmt(v.reverse[3].gross)} ${s} أصلها ${fmt(v.reverse[3].net)} ${s} والضريبة فيها ${fmt(v.reverse[3].vat)} ${s}.`}
      </p>
    </div>
  );
}

/** All Arab countries' standard VAT rates, for the generic VAT calculator page. */
export function ArabVatRatesTable() {
  const rows = arabVatRates();
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
      <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
        <Receipt className="w-5 h-5 text-emerald-600" />
        <span>نسبة ضريبة القيمة المضافة في الدول العربية</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/50">
              <th className="p-3">الدولة</th>
              <th className="p-3">النسبة الأساسية</th>
              <th className="p-3">مطبقة منذ</th>
              <th className="p-3">لاستخراج أصل المبلغ اقسم على</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <tr key={r.code}>
                <td className="p-3 font-bold">
                  {isIndexable({ countryCode: r.code.toLowerCase(), calculatorSlug: 'vat-calculator' }) ? (
                    <Link href={`/${r.code.toLowerCase()}/vat-calculator`} className="text-emerald-700 hover:underline">
                      {r.name}
                    </Link>
                  ) : (
                    r.name
                  )}
                </td>
                <td className="p-3">{r.hasVat ? `${r.rate}%` : 'لا توجد ضريبة قيمة مضافة'}</td>
                <td className="p-3">{r.validFrom || '—'}</td>
                <td className="p-3">{r.hasVat ? (1 + r.rate / 100).toFixed(2) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        أعلى نسبة بين هذه الدول في المغرب (20%) ثم الجزائر وتونس (19%)، وأدناها في الإمارات وعُمان (5%)، بينما لا تطبق الكويت وقطر ضريبة قيمة مضافة حتى الآن. وفي الأردن تُسمى الضريبة العامة على المبيعات بنسبة 16%. اختر دولتك من الجدول لفتح الحاسبة بنسبتها وجدول مبالغها.
      </p>
    </div>
  );
}
