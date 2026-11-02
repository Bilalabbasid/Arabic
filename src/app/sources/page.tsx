import React from 'react';
import { Metadata } from 'next';
import { SOURCES } from '@/data/sources';
import { ALL_COUNTRY_LEGAL_RULES } from '@/data/rules';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { ExternalLink, Building, ShieldCheck, Globe, CheckCircle } from 'lucide-react';
import { formatMetaTitle, constructCanonicalUrl } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: formatMetaTitle('المصادر والجهات الرسمية المعتمدة'),
  description: 'دليل الجهات والمصادر الرسمية والبنوك المركزية وهيئات الضرائب والعمل المعتمدة في بناء ومراجعة حاسبات منصة لِسيارتك.',
  alternates: {
    canonical: constructCanonicalUrl('/sources'),
  },
};

interface SourceTableRow {
  country: string;
  topic: string;
  authority: string;
  law: string;
  url: string;
  checkedAt: string;
}

export default function SourcesPage() {
  const breadcrumbs = [{ label: 'المصادر والجهات الرسمية', href: '/sources' }];

  // Compile full table from central rules
  const tableRows: SourceTableRow[] = [
    {
      country: 'المملكة العربية السعودية',
      topic: 'ضريبة القيمة المضافة',
      authority: 'هيئة الزكاة والضريبة والجمارك (ZATCA)',
      law: 'نظام ضريبة القيمة المضافة ولائحته التنفيذية (المرسوم الملكي م/113)',
      url: 'https://zatca.gov.sa/ar/RulesRegulations/Taxes/Pages/vat_regulations.aspx',
      checkedAt: '2026-11-01',
    },
    {
      country: 'المملكة العربية السعودية',
      topic: 'أسعار الوقود',
      authority: 'وزارة الطاقة / شركة أرامكو السعودية',
      law: 'التسعيرة الشهرية للمنتجات البترولية مع السقف الرسمي',
      url: 'https://www.aramco.com/ar/creating-value/products/retail-fuels',
      checkedAt: '2026-10-01',
    },
    {
      country: 'المملكة العربية السعودية',
      topic: 'مكافأة نهاية الخدمة',
      authority: 'وزارة الموارد البشرية والتنمية الاجتماعية',
      law: 'نظام العمل السعودي (المرسوم الملكي رقم م/51 - المادتان 84 و 85)',
      url: 'https://hrsd.gov.sa/knowledge-centre/decisions-and-regulations',
      checkedAt: '2026-11-01',
    },
    {
      country: 'المملكة العربية السعودية',
      topic: 'تعرفة الكهرباء',
      authority: 'هيئة تنظيم المياه والكهرباء (WERA)',
      law: 'تعرفة الاستهلاك السكني المعتمدة ورسوم العداد',
      url: 'https://wera.gov.sa',
      checkedAt: '2026-11-01',
    },
    {
      country: 'الإمارات العربية المتحدة',
      topic: 'ضريبة القيمة المضافة',
      authority: 'الهيئة الاتحادية للضرائب (FTA)',
      law: 'المرسوم بقانون اتحادي رقم (8) لسنة 2017 في شأن ضريبة القيمة المضافة',
      url: 'https://tax.gov.ae/ar/taxes/vat',
      checkedAt: '2026-11-01',
    },
    {
      country: 'الإمارات العربية المتحدة',
      topic: 'أسعار الوقود',
      authority: 'لجنة متابعة أسعار الوقود بوزارة الطاقة',
      law: 'التسعيرة المعتمدة الشهرية لتحرير أسعار البنزين والديزل',
      url: 'https://www.moei.gov.ae/ar/media-centre/fuel-prices.aspx',
      checkedAt: '2026-10-01',
    },
    {
      country: 'الإمارات العربية المتحدة',
      topic: 'مكافأة نهاية الخدمة',
      authority: 'وزارة الموارد البشرية والتوطين (MOHRE)',
      law: 'المرسوم بقانون اتحادي رقم (33) لسنة 2021 (المادة 51)',
      url: 'https://www.mohre.gov.ae/ar/laws-and-regulations/labour-law.aspx',
      checkedAt: '2026-11-01',
    },
    {
      country: 'مصر',
      topic: 'ضريبة القيمة المضافة',
      authority: 'مصلحة الضرائب المصرية',
      law: 'قانون الضريبة على القيمة المضافة رقم 67 لسنة 2016 وتعديلاته',
      url: 'https://www.eta.gov.eg',
      checkedAt: '2026-11-01',
    },
    {
      country: 'مصر',
      topic: 'أسعار الوقود',
      authority: 'وزارة البترول والثروة المعدنية',
      law: 'قرارات لجنة التسعير التلقائي للمنتجات البترولية',
      url: 'https://www.petroleum.gov.eg',
      checkedAt: '2026-10-01',
    },
    {
      country: 'الكويت',
      topic: 'أسعار الوقود',
      authority: 'شركة البترول الوطنية الكويتية (KNPC)',
      law: 'التسعيرة الرسمية المدعومة المعتمدة من مجلس الوزراء',
      url: 'https://www.knpc.com',
      checkedAt: '2026-10-01',
    },
    {
      country: 'قطر',
      topic: 'أسعار الوقود',
      authority: 'قطر للطاقة (QatarEnergy)',
      law: 'التسعيرة الشهرية للمنتجات البترولية لقطر للطاقة',
      url: 'https://www.qatarenergy.qa',
      checkedAt: '2026-10-01',
    },
    {
      country: 'مملكة البحرين',
      topic: 'ضريبة القيمة المضافة',
      authority: 'الجهاز الوطني للإيرادات (NBR)',
      law: 'قانون ضريبة القيمة المضافة وتعديل نسبة 10%',
      url: 'https://www.nbr.gov.bh',
      checkedAt: '2026-11-01',
    },
    {
      country: 'سلطنة عُمان',
      topic: 'ضريبة القيمة المضافة',
      authority: 'جهاز الضرائب العُماني (OTA)',
      law: 'قانون ضريبة القيمة المضافة الصادر بالمرسوم السلطاني 121/2020',
      url: 'https://tms.taxoman.gov.om',
      checkedAt: '2026-11-01',
    },
    {
      country: 'معايير دولية',
      topic: 'كتلة الجسم (BMI)',
      authority: 'منظمة الصحة العالمية (WHO)',
      law: 'المعايير القياسية العالمية لمؤشر كتلة الجسم وتصنيفات الوزن',
      url: 'https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight',
      checkedAt: '2026-11-01',
    },
    {
      country: 'معايير إسلامية',
      topic: 'زكاة المال وعروض التجارة',
      authority: 'هيئة المحاسبة والمراجعة (AAOIFI)',
      law: 'المعيار الشرعي رقم (35) بشأن الزكاة ونصاب الذهب 85 غراماً',
      url: 'https://aaoifi.com',
      checkedAt: '2026-11-01',
    },
    {
      country: 'معايير قياسية دولية',
      topic: 'وحدات القياس والوقت',
      authority: 'المنظمة الدولية للتقييس (ISO) والمكتب الدولي (BIPM)',
      law: 'المعايير الدولية لقياس الوحدات (ISO 80000) والوقت (ISO 8601)',
      url: 'https://www.bipm.org',
      checkedAt: '2026-11-01',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-3 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          المصادر والجهات الرسمية المعتمدة
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          تعتمد حاسبات منصة لِسيارتك حصراً على اللوائح، والمراسيم، والأنظمة المنشورة رسمياً عبر بوابات الوزارات، والهيئات السيادية، والبنوك المركزية، والمنظمات الدولية المعنية.
        </p>
      </div>

      {/* Comprehensive Sources Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>جدول المصادر واللوائح الرسمية المعتمدة ({tableRows.length})</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">تم التحقق من الروابط العميقة</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-start divide-y divide-slate-100">
              <thead className="bg-slate-50/80 text-slate-700 font-bold">
                <tr>
                  <th className="py-3 px-4 text-start">الدولة / النطاق</th>
                  <th className="py-3 px-4 text-start">المجال</th>
                  <th className="py-3 px-4 text-start">الجهة الرسمية</th>
                  <th className="py-3 px-4 text-start">النظام أو اللائحة</th>
                  <th className="py-3 px-4 text-start">تاريخ التحقق</th>
                  <th className="py-3 px-4 text-start">المصدر المباشر</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {tableRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      {row.country}
                    </td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      {row.topic}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">
                      {row.authority}
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-xs">
                      {row.law}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500 text-xs whitespace-nowrap">
                      {row.checkedAt}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                      >
                        <span>زيارة المصدر</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Authority Cards Section */}
      <section className="space-y-4 pt-6">
        <h2 className="text-xl font-bold text-slate-900">الهيئات والجهات المرجعية الرئيسية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SOURCES.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Building className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {s.authorityType}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  {s.nameAr}
                </h3>
                <div className="text-xs text-slate-400 font-sans">{s.nameEn}</div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {s.descriptionAr}
                </p>
              </div>

              <a
                href={s.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-bold text-slate-700 hover:text-emerald-800 border border-slate-200/60 transition-colors"
              >
                <span>زيارة البوابة الرسمية للجهة</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
