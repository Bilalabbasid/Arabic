import React from 'react';
import Link from 'next/link';
import { ALL_CALCULATORS } from '@/data/calculators';
import { CATEGORIES } from '@/data/categories';
import { COUNTRIES } from '@/data/countries';
import AdSlot from '@/components/layout/AdSlot';
import {
  Calculator,
  Search,
  CheckCircle2,
  TrendingUp,
  Car,
  Receipt,
  Briefcase,
  Zap,
  Globe,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Scale,
  Award,
} from 'lucide-react';

export default function HomePage() {
  const popularCalculators = ALL_CALCULATORS.slice(0, 6);
  const featuredCategories = CATEGORIES.slice(0, 8);
  const topCountries = COUNTRIES.slice(0, 10);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-900 text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold mb-2">
            <Sparkles className="w-4 h-4" />
            <span>منصة الحاسبات العربية المعتمدة لجميع الدول العربية الـ 22</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            كل الحاسبات التي تحتاجها في مكان واحد
          </h1>

          <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-lg leading-relaxed font-normal">
            أدوات مجانية لحساب الرواتب والتكاليف والأرباح واستهلاك الكهرباء والسيارات والمزيد، مع حسابات مخصصة حسب بلدك عند توفر قواعد موثقة.
          </p>

          {/* Quick Category Chips */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {popularCalculators.map((c) => (
              <Link
                key={c.slug}
                href={`/calculators/${c.slug}/`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-emerald-500/20 text-slate-200 hover:text-white border border-white/10 text-xs font-medium transition-all"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                <span>{c.shortNameAr}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Country Selector Hub Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600" />
                <span>اختر دولتك لاستعراض الحاسبات والعملات المخصصة</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                نغطي جميع الدول العربية الـ 22 مع دعم القوانين والضرائب الرسمية المحلية.
              </p>
            </div>
            <Link
              href="/calculators/"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shrink-0 shadow-md shadow-emerald-600/20"
            >
              استعراض كافة الحاسبات
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-6">
            {topCountries.map((c) => (
              <Link
                key={c.countryCode}
                href={`/${c.countryCode.toLowerCase()}/`}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all text-xs font-semibold text-slate-700 group"
              >
                <span className="text-2xl">{c.flagEmoji}</span>
                <div className="overflow-hidden">
                  <div className="group-hover:text-emerald-700 truncate">{c.nameAr}</div>
                  <div className="text-[10px] text-slate-400 font-mono">({c.currencySymbolAr})</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad slot */}
      <AdSlot slotId="home-top" />

      {/* 3. Popular Calculators Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">الأكثر طلباً واستخداماً</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              حاسبات يومية يحتاجها كل مواطن ومقيم
            </h2>
          </div>
          <Link href="/calculators/" className="text-sm font-bold text-emerald-600 hover:underline hidden sm:inline-flex items-center gap-1">
            <span>عرض الكل</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCalculators.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}/`}
              className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-12 h-12 rounded-2xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Calculator className="w-6 h-6" />
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {calc.subcategory}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors text-base sm:text-lg mb-2">
                  {calc.nameAr}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                  {calc.descriptionAr}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>ابدأ الحساب الآن</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Categories Section */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              18 قسماً تخصصياً يغطي كافة مناحي الحياة
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              تصفح تصنيفاتنا المصممة لتسهيل وصولك للحاسبة المناسبة لسيارتك أو عملك أو تمويلك
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {featuredCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}/`}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all group"
              >
                <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-sm sm:text-base">
                  {cat.nameAr}
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                  {cat.descriptionAr}
                </p>
                <div className="mt-3 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <span>تصفح حاسبات القسم</span>
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/categories/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
            >
              <span>استعراض جميع الأقسام الـ 18</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. How Calculations Work & Transparency */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-3xl p-8 sm:p-12 border border-emerald-100 space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">الشفافية والمصداقية</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              كيف نضمن دقة وتوافق الحسابات مع دولتك؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              نلتزم بأعلى معايير الشفافية: نوضح المعادلات الرياضية، ونستند إلى لوائح البنوك المركزية وهيئات الضرائب والعمل الرسمية، دون أي تخمين أو بيانات غير موثقة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">لوائح رسمية معلنة</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                حسابات الضرائب ومكافأة نهاية الخدمة والكهرباء مطابقة للمراسيم الملكية وقوانين العمل المعتمدة في كل دولة.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">معادلات وخطوات واضحة</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                لا نقدم أرقاماً مبهمة؛ بل نرفق كل نتيجة بخطوات الحل الرياضي التفصيلية وأمثلة عملية واقعية خطوة بخطوة.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">خصوصية تامة 100%</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                تتم جميع العمليات الحسابية داخل متصفحك مباشرة؛ لا نقوم بتخزين رواتبك أو أرقامك في أي خوادم أو قواعد بيانات.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
