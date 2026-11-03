import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { formatMetaTitle, constructCanonicalUrl } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { ShieldCheck, Calendar, ExternalLink, Scale, CheckCircle2, AlertCircle, ArrowLeft, History } from 'lucide-react';

export const metadata: Metadata = {
  title: formatMetaTitle('سجل التحديثات التشريعية والضريبية واللوائح الرسمية'),
  description:
    'سجل رسمي مؤرخ ومحدث لكافة التعديلات التشريعية والضريبية وأسعار الوقود وأنظمة العمل والتأمينات الاجتماعية المعتمدة في 22 دولة عربية عبر منصة لِسيارتك.',
  alternates: {
    canonical: constructCanonicalUrl('/changelog'),
  },
  openGraph: {
    title: formatMetaTitle('سجل التحديثات التشريعية والضريبية – لِسيارتك'),
    description: 'توثيق مؤرخ للقرارات الوزارية والتعديلات التشريعية لنسب الضرائب والوقود والتأمينات في الدول العربية.',
    url: constructCanonicalUrl('/changelog'),
    siteName: 'لِسيارتك',
    locale: 'ar_SA',
    type: 'website',
  },
};

interface ChangelogEntry {
  id: string;
  date: string;
  countryCode: string;
  countryName: string;
  sector: 'ضرائب' | 'وقود' | 'عمل ونهاية خدمة' | 'تأمينات وتقاعد' | 'مرور وجمارك';
  title: string;
  decreeOrLaw: string;
  authority: string;
  sourceUrl: string;
  changeSummary: string;
  impactOnCalculators: string[];
}

const LEGISLATIVE_CHANGELOG: ChangelogEntry[] = [
  {
    id: 'cl-2026-11-01-layer',
    date: '2026-11-01',
    countryCode: 'all',
    countryName: 'كافة الدول العربية الـ 22',
    sector: 'ضرائب',
    title: 'إطلاق طبقة البيانات التشريعية الموحدة وتحديث المصادر الرسمية',
    decreeOrLaw: 'معايير التحقق والتوثيق المعتمدة لمنصة لِسيارتك الإصدار 2026.1',
    authority: 'الهيئات الضريبية والمصارف المركزية ووزارات العمل العربية',
    sourceUrl: 'https://www.lsayartk.com/sources',
    changeSummary:
      'إكمال تدقيق وتوثيق نسب الضرائب والرسوم الجمركية وأنظمة العمل وسقوف المديونية لجميع الدول الـ 22، وتأكيد وسم الحالات غير المطبقة (مثل عدم وجود ضريبة قيمة مضافة في الكويت وقطر) بشفافية تامة دون أي تزييف.',
    impactOnCalculators: ['vat-calculator', 'fuel-prices', 'end-of-service-reward', 'car-finance'],
  },
  {
    id: 'cl-2026-10-01-fuel-gcc',
    date: '2026-10-01',
    countryCode: 'ae',
    countryName: 'الإمارات العربية المتحدة',
    sector: 'وقود',
    title: 'مراجعة تسعيرة الوقود الشهرية لشهر أكتوبر 2026',
    decreeOrLaw: 'قرار لجنة متابعة أسعار الوقود برئاسة وزارة الطاقة والبنية التحتية',
    authority: 'لجنة متابعة أسعار الجازولين والديزل',
    sourceUrl: 'https://www.moei.gov.ae',
    changeSummary:
      'تحديث الأسعار الرسمية المعتمدة للتر البنزين (سوبر 98: 3.15 درهم، خصوصي 95: 3.03 درهم، إي بلس 91: 2.96 درهم، والديزل: 3.09 درهم) وتضمين ضريبة 5%.',
    impactOnCalculators: ['fuel-cost', 'fuel-prices', 'trip-cost'],
  },
  {
    id: 'cl-2026-06-01-egypt-fuel',
    date: '2026-06-01',
    countryCode: 'eg',
    countryName: 'جمهورية مصر العربية',
    sector: 'وقود',
    title: 'تعديل أسعار بيع المنتجات البترولية ربع السنوي',
    decreeOrLaw: 'قرار لجنة التسعير التلقائي للمنتجات البترولية رقم (1) لسنة 2026',
    authority: 'لجنة التسعير التلقائي للمنتجات البترولية – وزارة البترول والثروة المعدنية',
    sourceUrl: 'https://www.petroleum.gov.eg',
    changeSummary:
      'تعديل أسعار بيع لتر البنزين والسولار في السوق المحلي (بنزين 95: 17.00 جنيه، بنزين 92: 15.25 جنيه، بنزين 80: 13.75 جنيه، السولار: 13.50 جنيه).',
    impactOnCalculators: ['fuel-cost', 'fuel-prices'],
  },
  {
    id: 'cl-2024-07-03-gosi-sa',
    date: '2024-07-03',
    countryCode: 'sa',
    countryName: 'المملكة العربية السعودية',
    sector: 'تأمينات وتقاعد',
    title: 'صدور نظام التأمينات الاجتماعية الجديد للملتحقين الجدد بسوق العمل',
    decreeOrLaw: 'المرسوم الملكي رقم (م/211) وتعديلات نظام التأمينات الاجتماعية',
    authority: 'المؤسسة العامة للتأمينات الاجتماعية (GOSI)',
    sourceUrl: 'https://gosi.gov.sa',
    changeSummary:
      'سريان التعديلات على المشتركين الجدد مع الإبقاء على نسب المشتركين الحاليين (9% فرع المعاشات + 0.75% ساند للمواطن، و 2% فرع الأخطار المهنية للمقيم يتحملها صاحب العمل بالكامل).',
    impactOnCalculators: ['net-salary', 'end-of-service-reward'],
  },
  {
    id: 'cl-2022-02-02-labour-ae',
    date: '2022-02-02',
    countryCode: 'ae',
    countryName: 'الإمارات العربية المتحدة',
    sector: 'عمل ونهاية خدمة',
    title: 'سريان قانون تنظيم علاقات العمل الجديد وتوحيد عقود العمل',
    decreeOrLaw: 'المرسوم بقانون اتحادي رقم (33) لسنة 2021 بشأن تنظيم علاقات العمل ولائحته التنفيذية',
    authority: 'وزارة الموارد البشرية والتوطين (MOHRE)',
    sourceUrl: 'https://www.mohre.gov.ae',
    changeSummary:
      'إلغاء التمييز في احتساب مكافأة نهاية الخدمة بين الاستقالة وإنهاء العقد في العقود محددة المدة (21 يوماً عن كل سنة للسنوات الخمس الأولى، و30 يوماً عما زاد عنها على أساس الأجر الأساسي الأخير).',
    impactOnCalculators: ['end-of-service-reward'],
  },
  {
    id: 'cl-2022-01-01-vat-bh',
    date: '2022-01-01',
    countryCode: 'bh',
    countryName: 'مملكة البحرين',
    sector: 'ضرائب',
    title: 'تعديل النسبة الأساسية لضريبة القيمة المضافة إلى 10%',
    decreeOrLaw: 'المرسوم بقانون رقم (40) لسنة 2021 بتعديل بعض أحكام قانون ضريبة القيمة المضافة',
    authority: 'الجهاز الوطني للإيرادات (NBR)',
    sourceUrl: 'https://www.nbr.gov.bh',
    changeSummary:
      'مضاعفة النسبة الأساسية للضريبة من 5% إلى 10% مع الإبقاء على قائمة السلع الأساسية المعفاة وتوريدات التعليم والصحة بنسبة الصفر (0%).',
    impactOnCalculators: ['vat-calculator', 'car-import-customs'],
  },
  {
    id: 'cl-2021-04-16-vat-om',
    date: '2021-04-16',
    countryCode: 'om',
    countryName: 'سلطنة عُمان',
    sector: 'ضرائب',
    title: 'بدء تطبيق ضريبة القيمة المضافة بنسبة 5%',
    decreeOrLaw: 'المرسوم السلطاني رقم (121/2020) بإصدار قانون ضريبة القيمة المضافة',
    authority: 'جهاز الضرائب بسلطنة عمان (Tax Authority)',
    sourceUrl: 'https://tms.taxoman.gov.om',
    changeSummary:
      'بدء العمل الرسمي بضريبة القيمة المضافة بالنسبة الأساسية 5% مع إعفاء الأدوية والتجهيزات الطبية والسلع الغذائية الأساسية ورعاية المسنين.',
    impactOnCalculators: ['vat-calculator', 'car-import-customs'],
  },
  {
    id: 'cl-2020-07-01-vat-sa',
    date: '2020-07-01',
    countryCode: 'sa',
    countryName: 'المملكة العربية السعودية',
    sector: 'ضرائب',
    title: 'رفع نسبة ضريبة القيمة المضافة إلى 15%',
    decreeOrLaw: 'الأمر الملكي رقم (أ/638) وتعديلات لائحة نظام ضريبة القيمة المضافة',
    authority: 'هيئة الزكاة والضريبة والجمارك (ZATCA)',
    sourceUrl: 'https://zatca.gov.sa',
    changeSummary:
      'زيادة النسبة الأساسية للضريبة من 5% إلى 15% على كافة السلع والخدمات الخاضعة للضريبة واستبدال ضريبة العقار السكني بضريبة التصرفات العقارية (5%).',
    impactOnCalculators: ['vat-calculator', 'car-import-customs'],
  },
  {
    id: 'cl-2018-01-01-vat-gcc',
    date: '2018-01-01',
    countryCode: 'sa',
    countryName: 'المملكة العربية السعودية والإمارات',
    sector: 'ضرائب',
    title: 'بدء تطبيق ضريبة القيمة المضافة بموجب الاتفاقية الموحدة لدول مجلس التعاون',
    decreeOrLaw: 'الاتفاقية الموحدة لضريبة القيمة المضافة لدول مجلس التعاون لدول الخليج العربية',
    authority: 'الأمانة العامة لمجلس التعاون والهيئات الضريبية الوطنية',
    sourceUrl: 'https://www.gcc-sg.org',
    changeSummary:
      'انطلاق تطبيق نظام ضريبة القيمة المضافة بنسبة أساسية أولية 5% في كل من المملكة العربية السعودية ودولة الإمارات العربية المتحدة.',
    impactOnCalculators: ['vat-calculator'],
  },
];

export default function ChangelogPage() {
  const breadcrumbs = [
    { label: 'الرئيسية', href: '/' },
    { label: 'سجل التحديثات التشريعية', href: '/changelog' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        {/* Header */}
        <header className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
          <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 mb-3">
            <History className="w-8 h-8" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              شفافية وحداثة البيانات التشريعية
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
            سجل التحديثات التشريعية والضريبية واللوائح الرسمية
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-4">
            توثق هذه الصفحة تاريخ التعديلات في القوانين، واللوائح التنفيذية، ونسب الضرائب، وأسعار الوقود، وأنظمة مكافأة نهاية الخدمة والتأمينات الاجتماعية عبر كافة الدول العربية. تخضع جميع القيم لمراجعة دورية صارمة مرتبطة مباشرة بالجرائد الرسمية ومواقع الوزارات والهيئات الحكومية المعتمدة.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>بيانات موثقة بروابط مصادر عميقة</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-blue-500" />
              <span>التزام صارم بنصوص المراسيم والقرارات</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>فحص آلي لفترات الصلاحية والحداثة</span>
            </div>
          </div>
        </header>

        {/* Timeline list */}
        <div className="space-y-6">
          {LEGISLATIVE_CHANGELOG.map((entry) => (
            <article
              key={entry.id}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    {entry.sector}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {entry.countryName}
                  </span>
                </div>
                <time className="text-xs font-medium text-slate-500 dark:text-slate-400" dateTime={entry.date}>
                  {entry.date}
                </time>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                {entry.title}
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                {entry.changeSummary}
              </p>

              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-3 text-xs text-slate-600 dark:text-slate-400 space-y-1 mb-4">
                <div>
                  <strong className="text-slate-800 dark:text-slate-200 font-semibold">المستند النظامي: </strong>
                  <span>{entry.decreeOrLaw}</span>
                </div>
                <div>
                  <strong className="text-slate-800 dark:text-slate-200 font-semibold">الجهة الرسمية: </strong>
                  <span>{entry.authority}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <span>الحاسبات المتأثرة:</span>
                  <div className="flex flex-wrap gap-1">
                    {entry.impactOnCalculators.map((slug) => (
                      <Link
                        key={slug}
                        href={`/calculators/${slug}`}
                        className="text-emerald-600 dark:text-emerald-400 hover:underline font-mono bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded"
                      >
                        /{slug}
                      </Link>
                    ))}
                  </div>
                </div>

                <a
                  href={entry.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
                >
                  <span>المصدر الرسمي</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border border-blue-200 dark:border-blue-900 text-xs sm:text-sm text-blue-900 dark:text-blue-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">سياسة حداثة وموثوقية البيانات:</p>
            <p className="leading-relaxed">
              إذا لاحظت صدور مرسوم أو قرار وزاري جديد لم يُدرج بعد في جداولنا، يُرجى مراسلتنا عبر صفحة{' '}
              <Link href="/contact" className="underline font-semibold hover:text-blue-700 dark:hover:text-blue-300">
                اتصل بنا
              </Link>{' '}
              مع إرفاق رابط المصدر الرسمي في الجريدة الرسمية أو الموقع الحكومي المختص لمراجعته وتحديثه فوراً.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
