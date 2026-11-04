import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { ShieldCheck, Scale, CheckCircle2, AlertTriangle, BookOpen, Layers, Clock, ExternalLink, Mail, ArrowLeft } from 'lucide-react';
import { formatMetaTitle, constructCanonicalUrl } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: formatMetaTitle('المنهجية العلمية والشفافية وتحديث البيانات'),
  description: 'دليل المنهجية المعتمدة في بناء حاسبات منصة لِسيارتك، دورات تحديث أسعار الوقود والضرائب، وقواعد التقريب المحاسبي وسجل التغييرات.',
  alternates: {
    canonical: constructCanonicalUrl('/methodology'),
  },
};

export default function MethodologyPage() {
  const breadcrumbs = [{ label: 'المنهجية والمعايير', href: '/methodology' }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          معايير الشفافية والموثوقية
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          منهجية العمل والتحقق وسجل التحديثات
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          في منصة لِسيارتك (lsayartk.com)، لا نعتمد على التخمين أو التقديرات العشوائية. صُممت كل حاسبة وفق إطار برمجي وقانوني محكم يربط المعادلات الرياضية بنصوص اللوائح الرسمية، ويخضع لاختبارات دقيقة ومستمرة.
        </p>
      </div>

      <div className="space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
        {/* 1. Source of Truth */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-600" />
            <span>1. مصدر الحقيقة الموحد والربط بالمصادر الرسمية</span>
          </h2>
          <p>
            تتبع المنصة هيكلية موحدة تفصل بين منطق المعادلات الرياضية (Universal Physics & Math) والمتغيرات التنظيمية المحلية الخاصة بكل دولة. تُعرف جميع النسب والتعرفات القانونية داخل ملفات مركزية في مسار <code>src/data/rules/</code>، وترتبط مباشرة بالموقع الرسمي للجهة الحكومية المختصة وتاريخ المراجعة.
          </p>
          <div className="pt-2">
            <Link
              href="/sources"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1.5"
            >
              <span>استعراض دليل المصادر الرسمية والجهات المعتمدة</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* 2. Update Frequency Schedule Table */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span>2. جدول مواعيد ودورات تحديث البيانات</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            تتم مراجعة وتحديث قيم الحسابات تلقائياً وفق المواعيد الرسمية التالية:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-start divide-y divide-slate-100 border border-slate-100 rounded-xl">
              <thead className="bg-slate-50 text-slate-700 font-bold">
                <tr>
                  <th className="p-3 text-start">نوع البيانات</th>
                  <th className="p-3 text-start">دورية التحديث</th>
                  <th className="p-3 text-start">آلية التحقق</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-3 font-semibold text-slate-900">أسعار الوقود (الإمارات، قطر، عمان)</td>
                  <td className="p-3">شهرياً (في اليوم الأول من كل شهر ميلادي)</td>
                  <td className="p-3">مطابقة بيانات لجان تسعير الوقود الرسمية</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">أسعار الوقود (السعودية، الكويت، البحرين، مصر)</td>
                  <td className="p-3">شهرياً / ربع سنوي بحسب إعلانات اللجان المختصة</td>
                  <td className="p-3">متابعة إعلانات أرامكو والشركات الوطنية للبترول</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">ضريبة القيمة المضافة (VAT)</td>
                  <td className="p-3">فور صدور أي مرسوم ملكي أو قانون تشريعي</td>
                  <td className="p-3">النشر في الجريدة الرسمية وبوابات الهيئات الضريبية</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">مكافأة نهاية الخدمة وأنظمة العمل</td>
                  <td className="p-3">عند تعديل مواد أنظمة العمل والقرارات الوزارية</td>
                  <td className="p-3">بوابات وزارات الموارد البشرية والعمل</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">تعرفة الكهرباء بالشرائح</td>
                  <td className="p-3">عند صدور قرارات تنظيمية من هيئات تنظيم الكهرباء</td>
                  <td className="p-3">بوابات هيئات تنظيم قطاع الكهرباء والمياه</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Mathematical & Rounding Standards */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>3. معايير التقريب والحدود المحاسبية</span>
          </h2>
          <div className="space-y-3 text-slate-600 text-xs sm:text-sm">
            <p>
              <strong>قواعد التقريب المالي:</strong> تُقرب جميع المبالغ النقدية الناتجة إلى أقرب وحدتين عشريتين (هللة / فلس / قرش) باستخدام التقريب الحسابي القياسي (Standard Half-Up Rounding: <code>Math.round(val * 100) / 100</code>)، ما لم تنص اللائحة الرسمية للدولة على قاعدة تقريب خاصة.
            </p>
            <p>
              <strong>نطاق الحالات القياسية:</strong> تعالج حاسباتنا الحالات القياسية الأكثر شيوعاً في عقود العمل والمعاملات التجارية. الحالات المعقدة (مثل العقود الاستثنائية، المنازعات القضائية، الشركات ذات الإعفاءات الخاصة) تتطلب مراجعة المستشار القانوني أو المحاسب القانوني المعتمد.
            </p>
          </div>
        </section>

        {/* 4. Real Changelog Table */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>4. سجل التعديلات والتحديثات الفعلي (Changelog)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            سجل موثق لأحدث التعديلات والتحسينات المطبقة على حاسبات المنصة:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-start divide-y divide-slate-100 border border-slate-100 rounded-xl">
              <thead className="bg-slate-50 text-slate-700 font-bold">
                <tr>
                  <th className="p-3 text-start">التاريخ</th>
                  <th className="p-3 text-start">الحاسبة المعنية</th>
                  <th className="p-3 text-start">تفاصيل التحديث</th>
                  <th className="p-3 text-start">المصدر المرجعي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-3 font-mono text-slate-900 whitespace-nowrap">2026-11-02</td>
                  <td className="p-3 font-semibold text-slate-800">ضريبة القيمة المضافة</td>
                  <td className="p-3">تحديث صفحات الكويت وقطر لتوضيح عدم فرض ضريبة القيمة المضافة حالياً وتوفير حاسبة استرشادية حرة.</td>
                  <td className="p-3">وزارة المالية الكويتية / القطرية</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-slate-900 whitespace-nowrap">2026-11-01</td>
                  <td className="p-3 font-semibold text-slate-800">تكلفة وقود السيارة</td>
                  <td className="p-3">تحديث أسعار البنزين والديزل الرسمية لدول مجلس التعاون الخليجي ومصر لشهر نوفمبر 2026.</td>
                  <td className="p-3">لجان تسعير الوقود الرسمية</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-slate-900 whitespace-nowrap">2026-10-20</td>
                  <td className="p-3 font-semibold text-slate-800">مكافأة نهاية الخدمة</td>
                  <td className="p-3">تحديث محرك الحساب وفق المادتين 84 و 85 من نظام العمل السعودي والمرسوم بقانون اتحادي إماراتي رقم 33 لسنة 2021.</td>
                  <td className="p-3">بوابات وزارات الموارد البشرية</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-slate-900 whitespace-nowrap">2026-10-15</td>
                  <td className="p-3 font-semibold text-slate-800">فاتورة الكهرباء</td>
                  <td className="p-3">تطبيق شرائح الاستهلاك السكني المعتمدة من هيئة تنظيم المياه والكهرباء بالسعودية ورسوم العداد.</td>
                  <td className="p-3">هيئة تنظيم المياه والكهرباء (WERA)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. How to Report an Error */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
            <Mail className="w-5 h-5" />
            <h2>الإبلاغ عن خطأ أو تعديل في اللوائح</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            إذا لاحظت أي اختلاف بين النتائج والتعرفات المحلية المطبقة في مدينتك، أو صدر قرار حكومي جديد لم يتم تحديثه، يرجى مراسلتنا فوراً عبر البريد الإلكتروني المباشر <a href="mailto:info@lsayartk.com" className="text-emerald-400 font-mono font-bold hover:underline" dir="ltr">info@lsayartk.com</a> أو من خلال صفحة الاتصال، وسيقوم فريق التحرير بمراجعة المصدر وتحديث الحاسبة خلال 24–48 ساعة.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors"
            >
              <span>نموذج الإبلاغ المباشر</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
