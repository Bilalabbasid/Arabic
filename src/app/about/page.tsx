import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Calculator, Target, Shield, Heart, CheckCircle2, ArrowLeft, Mail, Scale } from 'lucide-react';
import { formatMetaTitle, constructCanonicalUrl } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: formatMetaTitle('عن منصة لِسيارتك ورؤيتنا التحريرية'),
  description: 'تعرف على قصة ومنهجية منصة لِسيارتك (lsayartk.com)، المنصة العربية المتخصصة في تقديم حاسبات مالية ويومية دقيقة وموثوقة.',
  alternates: {
    canonical: constructCanonicalUrl('/about'),
  },
};

export default function AboutPage() {
  const breadcrumbs = [{ label: 'عن المنصة', href: '/about' }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          عن منصة لِسيارتك (lsayartk.com)
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          منصة عربية مستقلة تقدم أدوات وحاسبات تفاعلية دقيقة ومجانية لمساعدة الأفراد وأصحاب الأعمال في حساب التكاليف، والضرائب، والرواتب، والوقود، والعمليات الحسابية اليومية بكل شفافية وموثوقية.
        </p>
      </div>

      {/* 1. Who Runs the Site */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
          <Target className="w-5 h-5 text-emerald-600" />
          <h2>من نحن وفريق العمل المسؤول</h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          تدار منصة لِسيارتك بواسطة فريق تحرير وتطوير تقني مستقل: [FILL: real name or company + 2–3 sentences of real background].
        </p>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          نلتزم بعدم اختلاق أي ألقاب وهمية أو ادعاء اعتمادات رسمية غير موثقة؛ حيث تنبع مصداقية أدواتنا من شفافية المعادلات الرياضية، وروابط المصادر الرسمية المعلنة لكل دولة.
        </p>
      </section>

      {/* 2. The Story & Scale */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
          <Calculator className="w-5 h-5 text-emerald-600" />
          <h2>قصة المنصة وحجم المحتوى الفعلي</h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          انطلقت المنصة استجابة للحاجة الماسة إلى أدوات حسابية عربية دقيقة، سريعة، وخالية من الإعلانات المزعجة والحسابات الخاطئة. تضم المنصة حالياً <strong>10 حاسبات متخصصة</strong> تم بناؤها واختبارها برمجياً لتغطي مجالات الرياضيات، والتمويل الشخصي، وضريبة القيمة المضافة، وتكلفة الوقود، وفواتير الكهرباء، ومكافأة نهاية الخدمة، ومحولات القياس القياسية.
        </p>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          نفضل الجودة والدقة على الكمية؛ فلا نقوم بنشر حاسبات شكلية أو مكررة، بل تخضع كل أداة جديدة لدورة تدقيق واختبار صارمة قبل الإتاحة للجمهور.
        </p>
      </section>

      {/* 3. Editorial & Building Policy */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
          <Scale className="w-5 h-5 text-emerald-600" />
          <h2>السياسة التحريرية ومنهجية بناء الحاسبات</h2>
        </div>
        <p className="text-sm text-slate-600">
          تمر كل حاسبة بمراحل محددة لضمان صحتها الرياضية والتنظيمية:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-emerald-700">1. الصياغة الرياضية</span>
            <p className="text-xs text-slate-600">تحديد المعادلة وفق المعايير العلمية والمحاسبية العالمية.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-emerald-700">2. التحقق التنظيمي</span>
            <p className="text-xs text-slate-600">مطابقة النسب والشرائح مع بوابات الوزارات والهيئات الرسمية.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-emerald-700">3. اختبارات الوحدة الآلية</span>
            <p className="text-xs text-slate-600">كتابة اختبارات برمجية تفصيلية (Unit Tests) بأمثلة واقعية محددة.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-emerald-700">4. المراجعة والتحديث</span>
            <p className="text-xs text-slate-600">متابعة شهرية للتغيرات في أسعار الوقود والقرارات الوزارية والضريبية.</p>
          </div>
        </div>
        <div className="pt-2">
          <Link
            href="/methodology"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1.5"
          >
            <span>اقرأ تفاصيل منهجية الحساب والتدقيق</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 4. Business & Funding Model */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900">نموذج التمويل واستقلالية الحساب</h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          يتم تمويل منصة لِسيارتك من خلال المساحات الإعلانية المبرمجة غير المزعجة. نؤكد التزامنا التام بعدم وجود أي حاسبات مدفوعة أو نتائج موجهة لخدمة أي جهة تجارية أو مصرفية؛ فالمعادلات الرياضية ثابتة ومحايدة تماماً.
        </p>
      </section>

      {/* 5. Privacy & Security */}
      <section className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-10 space-y-4 shadow-xl">
        <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-emerald-300">
          <Shield className="w-6 h-6" />
          الخصوصية التامة والحساب المحلي
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          نؤمن بأن بياناتك المالية والشخصية ملك لك وحدك. منصة لِسيارتك مبنية لتعمل بدون أي قواعد بيانات لتسجيل مدخلاتك؛ كل العمليات الحسابية تتم محلياً ومباشرة في متصفح جهازك دون إرسال رواتبك أو أرقامك أو تفاصيل قروضك إلى أي خوادم خارجية.
        </p>
      </section>

      {/* 6. Contact CTA */}
      <div className="text-center pt-4 space-y-2">
        <p className="text-sm text-slate-600">هل لديك مقترح أو استفسار أو تصحيح لأحد الأرقام؟</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-md shadow-emerald-600/20"
        >
          <Mail className="w-4 h-4" />
          <span>تواصل مع فريق التحرير</span>
        </Link>
      </div>
    </div>
  );
}
