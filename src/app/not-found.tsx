import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Calculator, Home, ArrowLeft, Search, AlertCircle } from 'lucide-react';
import { formatMetaTitle } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: formatMetaTitle('الصفحة غير موجودة – 404'),
  description: 'عذراً، الصفحة التي تحاول الوصول إليها غير موجودة أو تم نقلها. يمكنك استكشاف أشهر الحاسبات على منصة لِسيارتك أو العودة للرئيسية.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const topCalculators = [
    { name: 'حاسبة استهلاك وتكلفة الوقود', href: '/calculators/car-fuel-cost/' },
    { name: 'حاسبة ضريبة القيمة المضافة (15% و 5%)', href: '/calculators/vat-calculator/' },
    { name: 'حاسبة القروض والتمويل البنكي', href: '/calculators/loan-calculator/' },
    { name: 'حاسبة مكافأة نهاية الخدمة', href: '/calculators/end-of-service-reward/' },
    { name: 'حاسبة فاتورة الكهرباء والشرائح', href: '/calculators/electricity-bill/' },
    { name: 'حاسبة النسبة المئوية الشاملة', href: '/calculators/percentage-calculator/' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8">
      {/* 404 Badge */}
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm mx-auto">
        <AlertCircle className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <span className="text-sm font-bold text-emerald-600 tracking-wider font-mono">ERROR 404</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          عذراً، الصفحة التي تبحث عنها غير موجودة!
        </h1>
        <p className="max-w-lg mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
          ربما تم نقل الصفحة أو تغيير مسارها أو كتابة الرابط بشكل غير صحيح. نوصيك بالبحث أو الانتقال لأحد الروابط الشائعة أدناه.
        </p>
      </div>

      {/* Primary Navigation Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
        >
          <Home className="w-4 h-4" />
          <span>العودة للصفحة الرئيسية</span>
        </Link>
        <Link
          href="/calculators/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all hover:scale-[1.02]"
        >
          <Calculator className="w-4 h-4" />
          <span>دليل كافة الحاسبات (8 أدوات)</span>
        </Link>
      </div>

      {/* Suggested Popular Tools */}
      <div className="pt-8 border-t border-slate-200/80 max-w-2xl mx-auto text-right">
        <h2 className="text-sm font-bold text-slate-700 mb-4 text-center">
          أو يمكنك الانتقال مباشرة إلى إحدى حاسباتنا الشائعة:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {topCalculators.map((calc, idx) => (
            <Link
              key={idx}
              href={calc.href}
              className="p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/30 text-xs sm:text-sm font-semibold text-slate-800 flex items-center justify-between group transition-all"
            >
              <span>{calc.name}</span>
              <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:-translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

