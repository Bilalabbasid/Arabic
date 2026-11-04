import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  COUNTRIES,
  getCountryByCode,
  getAllCountryCodes,
  getCountryData,
} from '@/data/countries';
import { ALL_CALCULATORS } from '@/data/calculators';
import { getCountryLegalRules } from '@/data/rules';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CountryFlag from '@/components/common/CountryFlag';
import AdSlot from '@/components/layout/AdSlot';
import { Calculator, ArrowLeft, ShieldCheck, CheckCircle2, Globe, Building, Info } from 'lucide-react';
import {
  formatMetaTitle,
  constructCanonicalUrl,
  isCountryCalculatorValid,
  isCountryHubIndexable,
  generateBreadcrumbSchema,
  DEFAULT_OG_IMAGES,
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

  const isIndexable = isCountryHubIndexable(country.countryCode);
  const title = formatMetaTitle(`حاسبات ${country.nameAr} – العملة والضرائب واللوائح الرسمية`);
  const canonical = constructCanonicalUrl(`/${country.countryCode.toLowerCase()}`);

  return {
    title,
    description: `دليل الحاسبات المخصصة لـ ${country.nameAr} (${country.currencyNameAr}): حساب ضريبة القيمة المضافة، الوقود، مكافأة نهاية الخدمة بالعملة المحلية ${country.currencySymbolAr}.`,
    robots: {
      index: isIndexable,
      follow: true,
    },
    alternates: {
      canonical,
    },
    openGraph: {
      images: DEFAULT_OG_IMAGES,
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

  const countryRules = getCountryLegalRules(country.countryCode);
  const countryData = getCountryData(country.countryCode.toLowerCase());

  // Separate localized calculators from generic/universal calculators
  const localizedCalculators = ALL_CALCULATORS.filter(
    (calc) => isCountryCalculatorValid(calc, country.countryCode)
  );

  const universalCalculators = ALL_CALCULATORS.filter(
    (calc) => !isCountryCalculatorValid(calc, country.countryCode)
  );

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
              <CountryFlag
                countryCode={country.countryCode}
                nameAr={country.nameAr}
                size="xl"
                className="w-12 h-8 rounded-lg shadow-md"
                fallbackEmoji={country.flagEmoji}
              />
              <div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  حاسبات {country.nameAr}
                </h1>
                <span className="text-xs text-slate-400 font-sans">{country.nameEn}</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              دليل الأدوات والحاسبات المخصصة لـ {country.nameAr} بالعملة الرسمية ({country.currencyNameAr} – {country.currencySymbolAr}) مع استعراض القواعد واللوائح الرسمية المعتمدة.
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

      {/* Summary of Verified Local Rules */}
      {countryRules && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>ملخص الأنظمة واللوائح المعتمدة في {country.nameAr}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {/* VAT Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
              <span className="text-xs font-bold text-slate-500 block">ضريبة القيمة المضافة:</span>
              <span className="text-sm font-extrabold text-slate-800 block">
                {countryRules.hasVat && countryRules.vatStandardRate
                  ? `${countryRules.vatStandardRate.value}% (النسبة الأساسية)`
                  : 'لا تطبق ضريبة القيمة المضافة'}
              </span>
              <span className="text-xs text-slate-500 line-clamp-2">
                {countryRules.vatStandardRate?.authority || countryRules.vatOfficialStatusText || 'معفاة نظاماً'}
              </span>
            </div>

            {/* Labour Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
              <span className="text-xs font-bold text-slate-500 block">نظام العمل ومكافأة نهاية الخدمة:</span>
              <span className="text-sm font-extrabold text-slate-800 block">
                {countryRules.endOfService ? 'نظام محدد وموثق' : 'حساب عام استرشادي'}
              </span>
              <span className="text-xs text-slate-500 line-clamp-2">
                {countryRules.endOfService?.law || 'وفق عقد العمل والأنظمة المعمول بها'}
              </span>
            </div>

            {/* Fuel Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
              <span className="text-xs font-bold text-slate-500 block">تسعيرة الوقود والبنزين:</span>
              <span className="text-sm font-extrabold text-slate-800 block">
                {countryRules.fuelPrices
                  ? `بنزين 91: ${countryRules.fuelPrices.value.octane91} ${country.currencySymbolAr}`
                  : 'أسعار متغيرة بحسب المحطة'}
              </span>
              <span className="text-xs text-slate-500 line-clamp-2">
                {countryRules.fuelPrices?.authority || 'يتطلب إدخال سعر اللتر الفعلي'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Section 1: Genuinely Localized Calculators */}
      {localizedCalculators.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              حاسبات مخصصة للأنظمة والأسعار في {country.nameAr}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {localizedCalculators.length} حاسبات متوافقة محلياً
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localizedCalculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/${country.countryCode.toLowerCase()}/${calc.slug}`}
                className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-12 h-12 rounded-2xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Calculator className="w-6 h-6" />
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                      لوائح {country.nameAr}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors text-base sm:text-lg mb-2">
                    {calc.nameAr} في {country.nameAr}
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
            ))}
          </div>
        </div>
      )}

{/* Section: Intercity Trip Routes */}
      {countryData?.routes && countryData.routes.length > 0 && countryData.fuel?.status === 'verified' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              تكلفة السفر والتنقل بالسيارة بين مدن {country.nameAr}
            </h2>
            <Link
              href={`/${country.countryCode.toLowerCase()}/fuel-cost`}
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              حاسبة استهلاك الوقود &larr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {countryData.routes.slice(0, 6).map((route) => (
              <Link
                key={route.id}
                href={`/${country.countryCode.toLowerCase()}/trip-cost/${route.id}`}
                className="group bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-emerald-700 text-sm">
                    من {route.fromCityAr} إلى {route.toCityAr}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    مسافة {route.distanceKm} كم • طريق سريع
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-emerald-50 text-slate-400 group-hover:text-emerald-600 transition-colors">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Section 2: Universal / Generic Calculators supporting Local Currency */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            حاسبات عامة تدعم الحساب بالعملة المحلية ({country.currencySymbolAr})
          </h2>
          <Link href="/calculators" className="text-xs font-bold text-emerald-600 hover:underline">
            كل الحاسبات &larr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universalCalculators.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-700 group-hover:text-white transition-colors">
                    <Calculator className="w-5 h-5" />
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {calc.subcategory}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors text-base mb-2">
                  {calc.nameAr}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {calc.descriptionAr}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                <span>فتح الحاسبة العامة</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
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
