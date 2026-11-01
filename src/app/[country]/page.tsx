import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  COUNTRIES,
  getCountryByCode,
  getAllCountryCodes,
} from '@/data/countries';
import { getCalculatorsByCountry } from '@/data/calculators';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import AdSlot from '@/components/layout/AdSlot';
import { Calculator, ArrowLeft, ShieldCheck, CheckCircle2, Globe, Building } from 'lucide-react';
import {
  formatMetaTitle,
  constructCanonicalUrl,
  isCountryCalculatorValid,
  generateBreadcrumbSchema,
} from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return getAllCountryCodes().map((code) => ({
    country: code,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country: countryParam } = await params;
  const country = getCountryByCode(countryParam);

  if (!country) {
    return {
      title: 'الدولة غير موجودة',
    };
  }

  const title = formatMetaTitle(`حاسبات ${country.nameAr} – العملة والضرائب واللوائح الرسمية`);
  const canonical = constructCanonicalUrl(`/${country.countryCode.toLowerCase()}`);

  return {
    title,
    description: `دليل الحاسبات المخصصة لـ ${country.nameAr} (${country.currencyNameAr}): حساب ضريبة القيمة المضافة، الوقود، مكافأة نهاية الخدمة، والقروض بالعملة المحلية ${country.currencySymbolAr}.`,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: `حاسبات معتمدة لـ ${country.nameAr} بالعملة المحلية (${country.currencySymbolAr})`,
      url: canonical,
      siteName: 'لِسيارتك',
      locale: country.locale,
      type: 'website',
    },
  };
}

export default async function CountryHubPage({ params }: PageProps) {
  const { country: countryParam } = await params;
  const country = getCountryByCode(countryParam);

  if (!country) {
    notFound();
  }

  const availableCalculators = getCalculatorsByCountry(country.countryCode);
  const breadcrumbs = [
    { label: 'الدول', href: '/' },
    { label: country.nameAr, href: `/${country.countryCode.toLowerCase()}` },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'الرئيسية', url: '/' },
    { name: country.nameAr, url: `/${country.countryCode.toLowerCase()}` },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Country Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-700/60 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl sm:text-5xl">{country.flagEmoji}</span>
              <div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  حاسبات {country.nameAr}
                </h1>
                <span className="text-xs text-slate-400 font-sans">{country.nameEn}</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              أدوات وحاسبات مخصصة للعمل في {country.nameAr} بالعملة الرسمية ({country.currencyNameAr} - {country.currencySymbolAr}) مع تطبيق القوانين والأنظمة المعمول بها محلياً.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 shrink-0 text-xs sm:text-sm space-y-1.5 font-medium">
            <div className="text-emerald-300 font-bold mb-1">بيانات الدولة:</div>
            <div>العملة: {country.currencyNameAr} ({country.currencySymbolAr})</div>
            <div>رمز العملة الدولي: {country.currencyCode}</div>
            <div>مفتاح الاتصال الدولي: {country.dialCode}</div>
          </div>
        </div>
      </div>

      {/* Ad slot */}
      <AdSlot slotId="country-hub-top" />

      {/* List of Available Calculators */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            الحاسبات المتاحة والمعتمدة في {country.nameAr}
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            {availableCalculators.length} حاسبات
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCalculators.map((calc) => {
            const isLocalized = isCountryCalculatorValid(calc, country.countryCode);
            const targetHref = isLocalized
              ? `/${country.countryCode.toLowerCase()}/${calc.slug}`
              : `/calculators/${calc.slug}`;

            return (
              <Link
                key={calc.slug}
                href={targetHref}
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
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                    {calc.descriptionAr}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>احسب بـ {country.currencySymbolAr}</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Supported Regions */}
      {country.supportedRegions && country.supportedRegions.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-600" />
            <span>المناطق والمحافظات المشمولة في {country.nameAr}:</span>
          </h3>
          <div className="flex flex-wrap gap-2 pt-1">
            {country.supportedRegions.map((region, rIdx) => (
              <span
                key={rIdx}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200/60"
              >
                {region}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
