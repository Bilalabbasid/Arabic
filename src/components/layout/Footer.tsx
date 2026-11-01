import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { COUNTRIES } from '@/data/countries';
import CountryFlag from '../common/CountryFlag';
import { Calculator, ShieldCheck, Heart, ExternalLink, Globe } from 'lucide-react';

export default function Footer() {
  const popularCategories = CATEGORIES.slice(0, 6);
  const keyCountries = COUNTRIES.slice(0, 8);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                لِسيارتك<span className="text-emerald-400 font-mono text-sm">.com</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              أدوات مجانية لحساب الرواتب والتكاليف والأرباح واستهلاك الكهرباء والسيارات والمزيد، مع حسابات مخصصة حسب بلدك عند توفر قواعد موثقة.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>حسابات قائمة على لوائح وأنظمة العمل والضرائب الرسمية</span>
            </div>
          </div>

          {/* Categories Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">الأقسام الرئيسية</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {popularCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`} className="hover:text-emerald-400 transition-colors">
                    {cat.nameAr}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/categories" className="text-emerald-400 font-medium hover:underline">
                  جميع الأقسام الـ 18 &larr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Countries Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">الدول المغطاة</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {keyCountries.map((c) => (
                <li key={c.countryCode}>
                  <Link href={`/${c.countryCode.toLowerCase()}`} className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <CountryFlag
                      countryCode={c.countryCode}
                      nameAr={c.nameAr}
                      size="xs"
                      fallbackEmoji={c.flagEmoji}
                    />
                    <span>{c.nameAr}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform & Transparency Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">عن المنصة والشفافية</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  من نحن ورؤيتنا
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-emerald-400 transition-colors">
                  منهجية الحساب والمعايير
                </Link>
              </li>
              <li>
                <Link href="/sources" className="hover:text-emerald-400 transition-colors">
                  المصادر الرسمية والجهات
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  اتصل بنا والمقترحات
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  شروط الاستخدام وإخلاء المسؤولية
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-start leading-relaxed max-w-2xl">
            <strong>إخلاء مسؤولية:</strong> نتائج كافة الحاسبات تقدم لأغراض إرشادية وتثقيفية استناداً إلى المعايير الحسابية واللوائح المعلنة. المنصة لا تقدم استشارات قانونية أو ضريبية ملزمة، ويُنصح دائماً بمراجعة الجهات الرسمية أو المستشارين المعتمدين في المسائل ذات الأثر المالي الكبير.
          </p>
          <div className="text-center md:text-end shrink-0">
            <p>© {new Date().getFullYear()} lsayartk.com – جميع الحقوق محفوظة</p>
            <p className="text-[11px] text-slate-600 mt-0.5">منصة عربية مستقلة بدون أي قواعد بيانات خارجية</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
