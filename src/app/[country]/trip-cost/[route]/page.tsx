import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getCountryByCode, getCountryData, COUNTRIES } from '@/data/countries';
import { formatMetaTitle, constructCanonicalUrl, generateBreadcrumbSchema, generateFaqSchema, DEFAULT_OG_IMAGES } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CountryFlag from '@/components/common/CountryFlag';
import AdSlot from '@/components/layout/AdSlot';
import { Navigation, Fuel, ArrowRightLeft, ShieldCheck, MapPin, Calculator, Calendar, Clock } from 'lucide-react';
import FaqAccordion from '@/components/calculator/FaqAccordion';
import { formatDateAr } from '@/lib/formatters';

interface PageProps {
  params: Promise<{ country: string; route: string }>;
}

// Average highway speed used when a route has no verified driving time.
const AVG_HIGHWAY_SPEED_KMH = 90;

function estimateDriveMinutes(distanceKm: number, durationMinutes?: number): number {
  if (durationMinutes && durationMinutes > 0) return durationMinutes;
  return Math.max(5, Math.round(((distanceKm / AVG_HIGHWAY_SPEED_KMH) * 60) / 5) * 5);
}

function formatDriveDuration(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const hoursText =
    h === 0 ? '' : h === 1 ? 'ساعة' : h === 2 ? 'ساعتين' : h <= 10 ? `${h} ساعات` : `${h} ساعة`;
  const minutesText = m === 0 ? '' : m >= 3 && m <= 10 ? `${m} دقائق` : `${m} دقيقة`;
  if (!hoursText) return minutesText;
  if (!minutesText) return hoursText;
  return `${hoursText} و${minutesText}`;
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

  const duration = formatDriveDuration(estimateDriveMinutes(route.distanceKm, route.durationMinutes));
  // Searchers ask "كم كيلو" / "كم ساعة" / "كم تبعد": put both answers in the snippet.
  const title = formatMetaTitle(`المسافة بين ${route.fromCityAr} و${route.toCityAr} ${route.distanceKm} كم (${duration} بالسيارة)`);
  const description = `كم تبعد ${route.toCityAr} عن ${route.fromCityAr}؟ المسافة ${route.distanceKm} كم بالسيارة وتستغرق القيادة نحو ${duration}. اعرف كم لتر بنزين يحتاج المشوار وتكلفته ذهاباً وإياباً (${route.distanceKm * 2} كم) بأسعار الوقود الرسمية.`;
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
      images: DEFAULT_OG_IMAGES,
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
  const durationText = formatDriveDuration(estimateDriveMinutes(route.distanceKm, route.durationMinutes));
  const from = route.fromCityAr;
  const to = route.toCityAr;

  const routeFaqs = [
    {
      question: `كم تبعد ${to} عن ${from}؟`,
      answer: `تبعد ${to} عن ${from} حوالي ${route.distanceKm} كم بالسيارة عبر الطريق البري المعتمد، وهي المسافة نفسها تقريباً في الاتجاه العكسي من ${to} إلى ${from}. ذهاباً وإياباً تبلغ المسافة نحو ${route.distanceKm * 2} كم.`,
    },
    {
      question: `كم ساعة من ${from} إلى ${to} بالسيارة؟`,
      answer: `تستغرق القيادة من ${from} إلى ${to} نحو ${durationText} في الظروف المرورية العادية، وقد تزيد المدة مع الازدحام أو أعمال الطرق أو التوقف للاستراحة والتزود بالوقود.`,
    },
    {
      question: `كم لتر بنزين تحتاج الرحلة من ${from} إلى ${to}؟`,
      answer: `تحتاج سيارة سيدان متوسطة (8 لتر/100 كم) إلى نحو ${fuelLiters.toFixed(1)} لتر للذهاب فقط، والسيارة الاقتصادية (7 لتر/100 كم) نحو ${(route.distanceKm * 0.07).toFixed(1)} لتر، بينما تحتاج سيارة SUV (10.5 لتر/100 كم) نحو ${(route.distanceKm * 0.105).toFixed(1)} لتر.`,
    },
    ...(primaryGrade && primaryCost
      ? [
          {
            question: `كم تكلفة البنزين من ${from} إلى ${to} ذهاباً وإياباً؟`,
            answer: `بسعر ${primaryGrade.nameAr} الرسمي (${primaryGrade.pricePerLiter} ${currencySymbol}/لتر) تبلغ تكلفة الذهاب نحو ${primaryCost} ${currencySymbol}، والذهاب والعودة (${route.distanceKm * 2} كم) نحو ${(Number(primaryCost) * 2).toFixed(2)} ${currencySymbol} لسيارة تستهلك 8 لتر/100 كم.`,
          },
        ]
      : []),
  ];
  const faqSchema = generateFaqSchema(routeFaqs);

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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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
          المسافة بين {route.fromCityAr} و{route.toCityAr} بالسيارة وتكلفة البنزين
        </h1>

        {/* Direct Answer Box */}
        <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 font-medium text-xs sm:text-sm leading-relaxed flex items-start gap-3 shadow-xs">
          <span className="font-extrabold text-emerald-800 shrink-0">إجابة مباشرة:</span>
          <span>
            تبعد {route.toCityAr} عن {route.fromCityAr} حوالي <strong>{route.distanceKm} كم</strong> بالسيارة ({route.distanceKm * 2} كم ذهاباً وإياباً)، وتستغرق القيادة نحو <strong>{durationText}</strong> في الظروف العادية. لسيارة تستهلك 8 لتر/100 كم يحتاج المشوار إلى قرابة <strong>{fuelLiters.toFixed(1)} لتر</strong> وقود، بتكلفة تقديرية تبدأ من {primaryCost ? `${primaryCost} ${currencySymbol}` : 'حسب التسعيرة'} لنوع {primaryGrade?.nameAr || 'الوقود'}.
          </span>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          تم احتساب كميات وتكاليف الوقود استناداً إلى مسافات الطرق السريعة المعتمدة من {route.source} وأحدث تسعيرة معتمدة للوقود في {country.nameAr}.
        </p>
      </div>

      {/* Calculated Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
            <span>مدة القيادة</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-lg font-black text-slate-900 leading-snug">{durationText}</div>
          <p className="text-[11px] text-slate-500">تقريباً في الظروف العادية</p>
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

{/* Round Trip Calculation & Highway Analysis */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          تفاصيل رحلة الذهاب والعودة (مسار كامل {route.distanceKm * 2} كم)
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          في حال التخطيط لرحلة ذهاباً وإياباً بين {route.fromCityAr} و{route.toCityAr}، تبلغ المسافة الإجمالية المقطوعة <strong>{route.distanceKm * 2} كم</strong>. ويتطلب المشوار الكامل ما يقارب <strong>{(fuelLiters * 2).toFixed(1)} لتر</strong> من الوقود، بتكلفة تقديرية إجمالية تبدأ من {primaryCost ? `${(Number(primaryCost) * 2).toFixed(2)} ${currencySymbol}` : 'حسب التسعيرة'} لنوع {primaryGrade?.nameAr || 'الوقود'}.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <h3 className="font-bold text-sm text-slate-800">معدل الاستهلاك حسب نوع وحجم السيارة</h3>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li><strong>سيارة سيدان اقتصادية (4 سلندر):</strong> حوالي 6.5 إلى 7.5 لتر / 100 كم ({(route.distanceKm * 0.07).toFixed(1)} لتر ذهاباً).</li>
              <li><strong>سيارة عائلية متوسطة (SUV 6 سلندر):</strong> حوالي 9.5 إلى 11.5 لتر / 100 كم ({(route.distanceKm * 0.105).toFixed(1)} لتر ذهاباً).</li>
              <li><strong>مركبة دفع رباعي ثقيلة أو نقل:</strong> حوالي 12.0 إلى 15.0 لتر / 100 كم ({(route.distanceKm * 0.135).toFixed(1)} لتر ذهاباً).</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <h3 className="font-bold text-sm text-slate-800">عوامل مؤثرة على استهلاك البنزين أثناء السفر</h3>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li><strong>السرعة الزائدة:</strong> القيادة بسرعة 120 كم/س تستهلك وقوداً إضافياً بنسبة تصل إلى 20% مقارنة بالسرعة الاقتصادية 90-100 كم/س.</li>
              <li><strong>مكيف الهواء:</strong> يزيد تشغيل التكييف في الأجواء الحارة من استهلاك المحرك بنسبة تتراوح بين 5% و12%.</li>
              <li><strong>ضغط الإطارات:</strong> انخفاض ضغط الإطارات عن المستوى الموصى به يرفع مقاومة الدوران ويزيد حرق الوقود.</li>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-amber-900 text-xs sm:text-sm leading-relaxed">
          <strong>إرشادات السلامة والتزود بالوقود:</strong> يُنصح بتعبئة خزان الوقود بالكامل قبل مغادرة {route.fromCityAr} ومتابعة مؤشر الوقود عند الاقتراب من منتصف المسافة، والالتزام بالسرعات القانونية المحددة على الطريق السريع لضمان سلامتك وتحقيق أفضل كفاءة استهلاك ممكنة لسيارتك.
        </div>
      </div>

      <FaqAccordion faqs={routeFaqs} />

      {/* Other Intercity Routes in Country */}
      {countryData.routes && countryData.routes.filter((r) => r.id !== route.id).length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            مسارات أخرى بين المدن في {country.nameAr}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {countryData.routes
              .filter((r) => r.id !== route.id)
              .slice(0, 6)
              .map((otherRoute) => (
                <Link
                  key={otherRoute.id}
                  href={`/${country.countryCode.toLowerCase()}/trip-cost/${otherRoute.id}`}
                  className="p-3 bg-slate-50 hover:bg-emerald-50/60 rounded-xl border border-slate-200 hover:border-emerald-300 text-xs font-bold text-slate-700 hover:text-emerald-800 transition-colors shadow-2xs"
                >
                  من {otherRoute.fromCityAr} إلى {otherRoute.toCityAr} ({otherRoute.distanceKm} كم)
                </Link>
              ))}
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
            href="/calculators/fuel-prices"
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
