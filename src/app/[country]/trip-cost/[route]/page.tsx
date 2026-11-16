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
import { getRelatedRoutes } from '@/lib/routes';
import { computeRouteInsights, BREAK_LENGTH_MIN, EV_KWH_PER_100, TANK_LITERS } from '@/lib/route-insights';

interface PageProps {
  params: Promise<{ country: string; route: string }>;
}

// Where the shortest road and the real journey can differ a lot (closures, checkpoints, conflict).
const ROAD_CONDITION_NOTES: Record<string, string> = {
  ye: 'منذ سنوات الحرب أُغلقت بعض الطرق المباشرة بين المدن اليمنية، مثل الطريق بين صنعاء وتعز، فقد تسلك الرحلة طرقاً بديلة أطول بكثير من المسافة والمدة المعروضتين؛ تحقق من حالة الطريق قبل السفر.',
  ps: 'تمر الطرق بين مدن الضفة الغربية بحواجز عسكرية قد تطيل زمن الرحلة كثيراً أو تغلق الطريق مؤقتاً، والمسافة والمدة المعروضتان للطريق نفسه دون وقت الانتظار على الحواجز.',
  sd: 'بسبب الحرب قد تكون بعض الطرق بين المدن السودانية مغلقة أو غير آمنة، فتحقق من حالة الطريق قبل السفر؛ المسافة والمدة المعروضتان لأقصر طريق بري في الظروف العادية.',
};

// Average highway speed used when a route has no verified driving time.
const AVG_HIGHWAY_SPEED_KMH = 90;

function estimateDriveMinutes(distanceKm: number, durationMinutes?: number): number {
  if (durationMinutes && durationMinutes > 0) return durationMinutes;
  return Math.max(5, Math.round(((distanceKm / AVG_HIGHWAY_SPEED_KMH) * 60) / 5) * 5);
}

const timesAr = (n: number) => (n === 1 ? 'مرة واحدة' : n === 2 ? 'مرتين' : `${n} مرات`);
const breaksAr = (n: number) => (n === 1 ? 'استراحة واحدة' : n === 2 ? 'استراحتين' : n <= 10 ? `${n} استراحات` : `${n} استراحة`);
// Money: 2 decimals for small amounts, whole units with separators for large ones (e.g. Iraqi dinars).
const f2 = (n: number) =>
  n.toLocaleString('en-US', Math.abs(n) >= 1000 ? { maximumFractionDigits: 0 } : { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
    // Distance and drive time are useful on their own; fuel cost is only shown when prices are verified.
    if (cData && cData.routes && cData.routes.length > 0) {
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

  const driveMinutes = estimateDriveMinutes(route.distanceKm, route.durationMinutes);
  const duration = formatDriveDuration(driveMinutes);
  const ins = computeRouteInsights(route, driveMinutes, countryData, getRelatedRoutes(countryData.routes, route, 3));
  const sym = country.currencySymbolAr;
  // Searchers ask "كم كيلو" / "كم ساعة" / "كم تبعد": distance and time stay in the title; the fuel cost
  // (which the title does not answer) is the reason to click, so it leads the description.
  const fullTitle = `المسافة بين ${route.fromCityAr} و${route.toCityAr} ${route.distanceKm} كم (${duration}) وتكلفة البنزين`;
  const title = formatMetaTitle(
    fullTitle.length <= 65 ? fullTitle : `المسافة بين ${route.fromCityAr} و${route.toCityAr} ${route.distanceKm} كم (${duration} بالسيارة)`
  );
  const tankText =
    ins.tank.refuelsRound === 0
      ? 'ويكفي خزان واحد للذهاب والعودة'
      : ins.tank.refuelsOneWay === 0
        ? 'ويكفي خزان واحد للذهاب'
        : `وتحتاج للتزود بالوقود ${ins.tank.refuelsOneWay === 1 ? 'مرة' : `${ins.tank.refuelsOneWay} مرات`} في الطريق`;
  const description =
    ins.costOneWay !== undefined
      ? `كم تبعد ${route.toCityAr} عن ${route.fromCityAr}؟ ${route.distanceKm} كم بالسيارة ونحو ${duration}. بنزين الذهاب لسيارة سيدان ${f2(ins.costOneWay)} ${sym} و${f2(ins.costOneWay * 2)} ${sym} ذهاباً وإياباً، ${tankText}. قارن تكلفة سيارتك.`
      : `كم تبعد ${route.toCityAr} عن ${route.fromCityAr}؟ ${route.distanceKm} كم بالسيارة ونحو ${duration}. يحتاج الذهاب نحو ${ins.liters} لتر بنزين لسيارة سيدان و${ins.byCar[2].liters} لتر لسيارة SUV، ${tankText}.`;
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
  const fuelVerified = fuelRule?.status === 'verified';
  const grades = fuelVerified ? fuelRule?.value?.grades || {} : {};
  const gradeEntries = Object.entries(grades);
  const currencySymbol = country.currencySymbolAr;

  // Typical average sedan consumption: 8.0 L / 100 km
  const consumptionRate = 8.0;
  const fuelLiters = (route.distanceKm * consumptionRate) / 100;

  const driveMinutes = estimateDriveMinutes(route.distanceKm, route.durationMinutes);
  const durationText = formatDriveDuration(driveMinutes);
  const from = route.fromCityAr;
  const to = route.toCityAr;
  const relatedRoutes = getRelatedRoutes(countryData.routes, route, 12);
  const ins = computeRouteInsights(route, driveMinutes, countryData, relatedRoutes);
  // Regular petrol (91 or the nearest local grade), not whatever grade happens to be listed first.
  const primaryGrade = ins.price ? { nameAr: ins.price.nameAr, pricePerLiter: ins.price.perLiter } : undefined;
  const primaryCost = ins.costOneWay !== undefined ? f2(ins.costOneWay) : null;

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
            answer: `بسعر ${primaryGrade.nameAr} الرسمي (${primaryGrade.pricePerLiter} ${currencySymbol}/لتر) تبلغ تكلفة الذهاب نحو ${primaryCost} ${currencySymbol}، والذهاب والعودة (${route.distanceKm * 2} كم) نحو ${f2((ins.costOneWay ?? 0) * 2)} ${currencySymbol} لسيارة تستهلك 8 لتر/100 كم.`,
          },
        ]
      : []),
    {
      question: `هل يكفي خزان وقود واحد للذهاب من ${from} إلى ${to} والعودة؟`,
      answer:
        ins.tank.refuelsRound === 0
          ? `نعم، يستهلك الذهاب والعودة (${route.distanceKm * 2} كم) نحو ${(fuelLiters * 2).toFixed(1)} لتر لسيارة سيدان، وهذا أقل من 85% من خزان سعته ${TANK_LITERS} لتراً، فلا تحتاج للتزود بالوقود إذا انطلقت بخزان ممتلئ.`
          : `الذهاب وحده يستهلك نحو ${ins.tank.shareOneWay}% من خزان سعته ${TANK_LITERS} لتراً${ins.tank.refuelsOneWay ? `، وتحتاج للتزود بالوقود ${timesAr(ins.tank.refuelsOneWay)} في الطريق` : ''}، أما الذهاب والعودة (${route.distanceKm * 2} كم) فيحتاجان نحو ${(fuelLiters * 2).toFixed(1)} لتر، أي التزود بالوقود ${timesAr(ins.tank.refuelsRound)} على الأقل.`,
    },
    {
      question: `كم استراحة أحتاج في الطريق من ${from} إلى ${to}؟`,
      answer:
        ins.breaks.count === 0
          ? `مدة القيادة ${durationText}، أي أقل من ساعتين، فلا تحتاج عادة إلى استراحة، وإن كان التوقف القصير مفيداً عند الشعور بالتعب.`
          : `يُنصح بالتوقف نحو ${BREAK_LENGTH_MIN} دقيقة كل ساعتين من القيادة، فرحلة مدتها ${durationText} تحتاج ${breaksAr(ins.breaks.count)}، فتصبح المدة الكلية قرابة ${formatDriveDuration(ins.breaks.totalMinutes)}.`,
    },
    ...(ins.perPassenger.length
      ? [
          {
            question: `كم نصيب كل شخص من بنزين المشوار بين ${from} و${to}؟`,
            answer: `تكلفة الذهاب نحو ${primaryCost} ${currencySymbol} لسيارة سيدان؛ فإذا تقاسمها شخصان فنصيب كل منهما ${f2(ins.perPassenger[0].cost)} ${currencySymbol}، وثلاثة أشخاص ${f2(ins.perPassenger[1].cost)} ${currencySymbol}، وأربعة ${f2(ins.perPassenger[2].cost)} ${currencySymbol} لكل شخص.`,
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
            تبعد {route.toCityAr} عن {route.fromCityAr} حوالي <strong>{route.distanceKm} كم</strong> بالسيارة ({route.distanceKm * 2} كم ذهاباً وإياباً)، وتستغرق القيادة نحو <strong>{durationText}</strong> في الظروف العادية. لسيارة تستهلك 8 لتر/100 كم يحتاج المشوار إلى قرابة <strong>{fuelLiters.toFixed(1)} لتر</strong> وقود{primaryCost ? `، بتكلفة تقديرية تبدأ من ${primaryCost} ${currencySymbol} لنوع ${primaryGrade?.nameAr}` : ''}.
          </span>
        </div>

        {ROAD_CONDITION_NOTES[country.countryCode.toLowerCase()] && (
          <p className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed">
            <strong>تنبيه عن حالة الطريق: </strong>
            {ROAD_CONDITION_NOTES[country.countryCode.toLowerCase()]}
          </p>
        )}
        <p className="text-sm text-slate-600 leading-relaxed">
          {fuelVerified
            ? `حسبنا وقود مسار ${from} – ${to} وتكلفته من مسافة الطريق البري ${route.distanceKm} كم (المصدر: ${route.source}) وأحدث تسعيرة معتمدة للوقود في ${country.nameAr}${primaryGrade ? ` (${primaryGrade.nameAr} بسعر ${primaryGrade.pricePerLiter} ${currencySymbol} للتر)` : ''}.`
            : `مسافة ${route.distanceKm} كم ومدة ${durationText} بين ${from} و${to} محسوبتان لأقصر طريق بري بالسيارة (المصدر: ${route.source}). أسعار الوقود في ${country.nameAr} حرة وتختلف بين المحطات، لذا نعرض كمية الوقود باللتر ويمكنك إدخال سعر محطتك في حاسبة تكلفة الرحلة.`}
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
                  const cost = f2(fuelLiters * grade.pricePerLiter);
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

{/* Round trip, car size, speed/AC, stops: numbers worked out for this route */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          تفاصيل رحلة الذهاب والعودة (مسار كامل {route.distanceKm * 2} كم)
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          في حال التخطيط لرحلة ذهاباً وإياباً بين {from} و{to}، تبلغ المسافة الإجمالية المقطوعة <strong>{route.distanceKm * 2} كم</strong>. ويتطلب المشوار الكامل ما يقارب <strong>{(fuelLiters * 2).toFixed(1)} لتر</strong> من الوقود{primaryCost ? `، بتكلفة تقديرية إجمالية تبدأ من ${f2((ins.costOneWay ?? 0) * 2)} ${currencySymbol} لنوع ${primaryGrade?.nameAr}` : ''}.
        </p>

        <div className="space-y-3">
          <h3 className="font-bold text-base text-slate-800">تكلفة مشوار {from} – {to} حسب حجم سيارتك</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/50">
                  <th className="p-3">نوع السيارة</th>
                  <th className="p-3">الاستهلاك</th>
                  <th className="p-3">لترات الذهاب</th>
                  {primaryGrade && <th className="p-3">تكلفة الذهاب</th>}
                  {primaryGrade && <th className="p-3">ذهاب وعودة</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {ins.byCar.map((c) => (
                  <tr key={c.id}>
                    <td className="p-3 font-bold text-slate-800">{c.nameAr}</td>
                    <td className="p-3 text-slate-600">{c.l100} لتر/100 كم</td>
                    <td className="p-3 text-slate-600">{c.liters} لتر</td>
                    {primaryGrade && <td className="p-3 font-bold text-emerald-700">{f2(c.costOneWay ?? 0)} {currencySymbol}</td>}
                    {primaryGrade && <td className="p-3 text-slate-700">{f2(c.costRound ?? 0)} {currencySymbol}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {`على طريق ${from} – ${to} تستهلك سيارة الدفع الرباعي الكبيرة نحو ${ins.economyVsLargeLiters} لتر أكثر من السيارة الصغيرة في الاتجاه الواحد${
              primaryGrade && ins.byCar[3].costOneWay !== undefined && ins.byCar[0].costOneWay !== undefined
                ? `، أي فرق ${f2(ins.byCar[3].costOneWay - ins.byCar[0].costOneWay)} ${currencySymbol} في الذهاب و${f2((ins.byCar[3].costOneWay - ins.byCar[0].costOneWay) * 2)} ${currencySymbol} في الذهاب والعودة`
                : ''
            }. ${primaryGrade ? `الأسعار محسوبة بسعر ${primaryGrade.nameAr} (${primaryGrade.pricePerLiter} ${currencySymbol} للتر).` : 'اضرب عدد اللترات في سعر اللتر في محطتك لمعرفة التكلفة.'}`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <h3 className="font-bold text-sm text-slate-800">السرعة والمكيف على طريق {from} – {to}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {`القيادة بسرعة 120 كم/س بدل 100 كم/س (حيث يسمح الحد القانوني) تزيد الاستهلاك نحو 20%، أي ${ins.speed.extraLiters} لتر إضافية على هذا المسار${
                ins.speed.extraCost !== undefined ? ` بتكلفة ${f2(ins.speed.extraCost)} ${currencySymbol}` : ''
              }، مقابل توفير نظري قدره ${ins.speed.minutesSaved} دقيقة فقط من زمن الرحلة.`}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {`أما تشغيل المكيف طوال الطريق فيضيف 5% إلى 12% من الوقود، أي بين ${ins.ac.minLiters} و${ins.ac.maxLiters} لتر${
                ins.ac.minCost !== undefined && ins.ac.maxCost !== undefined ? ` (${f2(ins.ac.minCost)} إلى ${f2(ins.ac.maxCost)} ${currencySymbol})` : ''
              } في الاتجاه الواحد.`}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <h3 className="font-bold text-sm text-slate-800">التزود بالوقود والاستراحات بين {from} و{to}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {`يستهلك الذهاب نحو ${ins.tank.shareOneWay}% من خزان سيدان سعته ${TANK_LITERS} لتراً، ${
                ins.tank.refuelsOneWay === 0
                  ? `فيكفي خزان ممتلئ من ${from} للوصول إلى ${to}`
                  : `فتحتاج للتزود بالوقود ${timesAr(ins.tank.refuelsOneWay)} في الطريق، ويفضل أن يكون ذلك قرب منتصف المسافة عند الكيلو ${ins.tank.halfwayKm}`
              }، ${ins.tank.refuelsRound === 0 ? 'ويكفي الخزان نفسه للعودة أيضاً.' : `وللذهاب والعودة تحتاج للتزود ${timesAr(ins.tank.refuelsRound)} على الأقل.`}`}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {ins.breaks.count === 0
                ? `مدة القيادة ${durationText} قصيرة نسبياً ولا تتطلب استراحة.`
                : `بمعدل استراحة ${BREAK_LENGTH_MIN} دقيقة كل ساعتين تحتاج ${breaksAr(ins.breaks.count)}، فتصبح الرحلة قرابة ${formatDriveDuration(ins.breaks.totalMinutes)} بدلاً من ${durationText}.`}
            </p>
          </div>
        </div>

        {ins.perPassenger.length === 3 && (
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong>تقاسم التكلفة: </strong>
            {`إذا تقاسم بنزين الذهاب من ${from} إلى ${to} شخصان فنصيب كل منهما ${f2(ins.perPassenger[0].cost)} ${currencySymbol}، وإذا كانوا ثلاثة فـ${f2(ins.perPassenger[1].cost)} ${currencySymbol} لكل شخص، وأربعة ${f2(ins.perPassenger[2].cost)} ${currencySymbol} لكل شخص.`}
          </p>
        )}

        {ins.ev && (
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong>بالسيارة الكهربائية: </strong>
            {`تحتاج سيارة تستهلك ${EV_KWH_PER_100} ك.و.س/100 كم إلى نحو ${ins.ev.kwh} ك.و.س للذهاب من ${from} إلى ${to}، بتكلفة ${f2(ins.ev.cost)} ${currencySymbol} عند الشحن المنزلي بتعرفة ${ins.ev.rate} ${currencySymbol} للكيلوواط${
              ins.ev.savingVsSedan !== undefined && ins.ev.savingVsSedan > 0 ? `، أي أقل من البنزين بنحو ${f2(ins.ev.savingVsSedan)} ${currencySymbol}` : ''
            }${
              ins.ev.chargingStops > 0
                ? `، مع ${ins.ev.chargingStops === 1 ? 'توقف واحد' : `${ins.ev.chargingStops} توقفات`} للشحن في الطريق لسيارة مداها الفعلي نحو 320 كم على الطرق السريعة.`
                : '، ويكفي شحن واحد كامل لقطع المسافة.'
            }`}
          </p>
        )}

        {ins.nearby.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-bold text-base text-slate-800">مقارنة مع مسارات قريبة من {from} و{to}</h3>
            <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
              {ins.nearby.map((n) => (
                <li key={n.route.id}>
                  <Link href={`/${country.countryCode.toLowerCase()}/trip-cost/${n.route.id}`} className="font-bold text-emerald-700 hover:underline">
                    {n.route.fromCityAr} – {n.route.toCityAr}
                  </Link>
                  {`: ${n.route.distanceKm} كم، ${
                    n.diffKm === 0 ? 'بالمسافة نفسها تقريباً' : `${n.diffKm > 0 ? 'أطول' : 'أقصر'} بـ ${Math.abs(n.diffKm)} كم من مسار ${from} – ${to}`
                  }${n.costOneWay !== undefined ? `، وبنزينها نحو ${f2(n.costOneWay)} ${currencySymbol} للذهاب` : ''}.`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <FaqAccordion faqs={routeFaqs} />

      {/* Other Intercity Routes in Country */}
      {countryData.routes && countryData.routes.filter((r) => r.id !== route.id).length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            مسارات أخرى بين المدن في {country.nameAr}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {relatedRoutes.map((otherRoute) => (
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
