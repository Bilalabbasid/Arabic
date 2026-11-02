import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getCountryByCode, getCountryData, COUNTRIES } from '@/data/countries';
import { formatMetaTitle, constructCanonicalUrl, generateBreadcrumbSchema } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CountryFlag from '@/components/common/CountryFlag';
import AdSlot from '@/components/layout/AdSlot';
import { Navigation, Fuel, ArrowRightLeft, ShieldCheck, MapPin, Calculator, Calendar } from 'lucide-react';
import { formatDateAr } from '@/lib/formatters';

interface PageProps {
  params: Promise<{ country: string; route: string }>;
}

export async function generateStaticParams() {
  const paramsList: Array<{ country: string; route: string }> = [];

  for (const c of COUNTRIES) {
    const cCode = c.countryCode.toLowerCase();
    const cData = getCountryData(cCode);
    if (cData && cData.routes && cData.fuel?.status === 'verified') {
      for (const r of cData.routes) {
        paramsList.push({
          country: cCode,
          route: r.id,
        });
      }
    }
  }

  return paramsList;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country: countryParam, route: routeParam } = await params;
  const country = getCountryByCode(countryParam);
  const countryData = getCountryData(countryParam);
  const route = countryData?.routes?.find((r) => r.id === routeParam);

  if (!country || !countryData || !route) {
    return {
      title: 'المسار غير موجود',
    };
  }

  const title = formatMetaTitle(`تكلفة السفر من ${route.fromCityAr} إلى ${route.toCityAr} بالسيارة – مسافة ${route.distanceKm} كم`);
  const description = `احسب تكلفة استهلاك بنزين السفر من ${route.fromCityAr} إلى ${route.toCityAr} (مسافة ${route.distanceKm} كم) بالسيارة وفق أحدث أسعار الوقود الرسمية في ${country.nameAr}.`;
  const canonical = constructCanonicalUrl(`/${country.countryCode.toLowerCase()}/trip-cost/${route.id}`);

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'لِسيارتك',
      locale: country.locale,
      type: 'website',
    },
  };
}

export default async function TripRoutePage({ params }: PageProps) {
  const { country: countryParam, route: routeParam } = await params;
  const country = getCountryByCode(countryParam);
  const countryData = getCountryData(countryParam);
  const route = countryData?.routes?.find((r) => r.id === routeParam);

  if (!country || !countryData || !route) {
    notFound();
  }

  const fuelRule = countryData.fuel;
  const grades = fuelRule?.value?.grades || {};
  const gradeEntries = Object.entries(grades);
  const currencySymbol = country.currencySymbolAr;

  // Typical average sedan consumption: 8.0 L / 100 km
  const consumptionRate = 8.0;
  const fuelLiters = (route.distanceKm * consumptionRate) / 100;

  const primaryGrade = gradeEntries[0] ? gradeEntries[0][1] : undefined;
  const primaryCost = primaryGrade ? (fuelLiters * primaryGrade.pricePerLiter).toFixed(2) : null;

  const breadcrumbs = [
    { label: country.nameAr, href: `/${country.countryCode.toLowerCase()}` },
    { label: `مسار ${route.fromCityAr} - ${route.toCityAr}`, href: `/${country.countryCode.toLowerCase()}/trip-cost/${route.id}` },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'الرئيسية', url: '/' },
    ...breadcrumbs.map((b) => ({ name: b.label, url: b.href })),
  ]);

  // Check if reverse route exists in dataset
  const reverseRoute = countryData.routes?.find(
    (r) => r.fromCityAr === route.toCityAr && r.toCityAr === route.fromCityAr
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/60">
            <CountryFlag countryCode={country.countryCode} className="w-4 h-3 rounded-xs" />
            <span>{country.nameAr}</span>
          </span>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            المسافة المعتمدة: {route.distanceKm} كم
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          تكلفة السفر من {route.fromCityAr} إلى {route.toCityAr} بالسيارة
        </h1>

        {/* Direct Answer Box */}
        <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 font-medium text-xs sm:text-sm leading-relaxed flex items-start gap-3 shadow-xs">
          <span className="font-extrabold text-emerald-800 shrink-0">إجابة مباشرة:</span>
          <span>
            تبلغ مسافة الطريق البري بين {route.fromCityAr} و{route.toCityAr} حوالي <strong>{route.distanceKm} كم</strong>. لسيارة تستهلك 8 لتر/100 كم، يحتاج المشوار إلى قرابة <strong>{fuelLiters.toFixed(1)} لتر</strong> وقود، بتكلفة تقديرية تبدأ من {primaryCost ? `${primaryCost} ${currencySymbol}` : 'حسب التسعيرة'} لنوع {primaryGrade?.nameAr || 'الوقود'}.
          </span>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          تم احتساب كميات وتكاليف الوقود استناداً إلى مسافات الطرق السريعة المعتمدة من {route.source} وأحدث تسعيرة معتمدة للوقود في {country.nameAr}.
        </p>
      </div>

      {/* Calculated Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>المسافة المقطوعة</span>
            <Navigation className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {route.distanceKm} <span className="text-sm font-bold text-slate-500">كم</span>
          </div>
          <p className="text-[11px] text-slate-500">طريق سريع معتمد باتجاه واحد</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>استهلاك الوقود التقديري</span>
            <Fuel className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {fuelLiters.toFixed(1)} <span className="text-sm font-bold text-slate-500">لتر</span>
          </div>
          <p className="text-[11px] text-slate-500">لمعدل قياسي 8.0 لتر / 100 كم</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>التكلفة التقديرية</span>
            <span className="text-xs font-bold text-emerald-600">{currencySymbol}</span>
          </div>
          <div className="text-2xl font-black text-emerald-700">
            {primaryCost || '—'} <span className="text-sm font-bold text-slate-500">{currencySymbol}</span>
          </div>
          <p className="text-[11px] text-slate-500">ذهاب فقط وفق السعر الرسمي</p>
        </div>
      </div>

      {/* Fuel Type Comparison Table */}
      {gradeEntries.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Fuel className="w-5 h-5 text-emerald-600" />
            <span>مقارنة تكلفة الرحلة حسب نوع الوقود في {country.nameAr}</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/50">
                  <th className="p-3 rounded-r-xl">نوع الوقود</th>
                  <th className="p-3">السعر الرسمي للتر</th>
                  <th className="p-3">استهلاك الرحلة (لتر)</th>
                  <th className="p-3 rounded-l-xl">التكلفة ذهاباً ({currencySymbol})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {gradeEntries.map(([key, grade]) => {
                  const cost = (fuelLiters * grade.pricePerLiter).toFixed(2);
                  return (
                    <tr key={key}>
                      <td className="p-3 font-bold text-slate-800">{grade.nameAr}</td>
                      <td className="p-3 text-slate-600">{grade.pricePerLiter} {currencySymbol}</td>
                      <td className="p-3 text-slate-600">{fuelLiters.toFixed(1)} لتر</td>
                      <td className="p-3 font-extrabold text-emerald-700">{cost} {currencySymbol}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Links & Related Intercity Routes */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
        <h3 className="text-base font-bold text-slate-800">روابط ذات صلة بهذا المسار</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {reverseRoute ? (
            <Link
              href={`/${country.countryCode.toLowerCase()}/trip-cost/${reverseRoute.id}`}
              className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors shadow-xs"
            >
              <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
              <span>المسار العكسي: {route.toCityAr} إلى {route.fromCityAr}</span>
            </Link>
          ) : (
            <Link
              href={`/${country.countryCode.toLowerCase()}/trip-cost`}
              className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors shadow-xs"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>حاسبة تكلفة السفر العامة</span>
            </Link>
          )}

          <Link
            href={`/${country.countryCode.toLowerCase()}/fuel-prices`}
            className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors shadow-xs"
          >
            <Fuel className="w-4 h-4 text-emerald-600" />
            <span>أسعار الوقود في {country.nameAr}</span>
          </Link>

          <Link
            href={`/${country.countryCode.toLowerCase()}/fuel-cost`}
            className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors shadow-xs"
          >
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>حاسبة استهلاك الوقود المخصصة</span>
          </Link>
        </div>
      </div>

      <AdSlot slotId="trip-route-bottom" />
    </div>
  );
}
