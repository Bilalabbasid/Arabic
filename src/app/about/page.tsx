import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Calculator, Target, Zap, Globe, Shield, Heart } from 'lucide-react';
import { formatMetaTitle, constructCanonicalUrl } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: formatMetaTitle('عن منصة لِسيارتك'),
  description: 'تعرف على قصة ورؤية منصة لِسيارتك (lsayartk.com)، المنصة العربية الرائدة للحاسبات والأدوات المالية واليومية لـ 22 دولة عربية.',
  alternates: {
    canonical: constructCanonicalUrl('/about'),
  },
};

export default function AboutPage() {
  const breadcrumbs = [{ label: 'عن المنصة', href: '/about' }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          عن منصة لِسيارتك (lsayartk.com)
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          نسعى لبناء أكبر مرجع رقمي عربي للحاسبات التفاعلية المتخصصة، حيث نوفر أدوات حسابية فورية، دقيقة، ومجانية تماماً لجميع مستخدمي الإنترنت في العالم العربي.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">رؤيتنا وأهدافنا</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            الوصول إلى مكتبة تضم أكثر من 200–400+ حاسبة متخصصة تغطي كل احتياج يومي أو مالي أو مهني للمواطن والمقيم في أي دولة عربية، مع الحفاظ على سرعة تصفح فائقة وبساطة في الاستخدام.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">تغطية جغرافية شاملة</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            تغطي منصتنا كافة الدول العربية الـ 22، حيث تراعي الفروق الجوهرية في أسعار الوقود، العملات المحلية، ونسب ضريبة القيمة المضافة، وقوانين العمل المتباينة.
          </p>
        </div>
      </div>

      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-10 space-y-4 shadow-xl">
        <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-emerald-300">
          <Shield className="w-6 h-6" />
          التزامنا بالخصوصية والأمان
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          نؤمن بأن بياناتك المالية والشخصية ملك لك وحدك. منصة لِسيارتك مبنية بدون أي قواعد بيانات تسجل مدخلاتك؛ كل العمليات الحسابية تتم مباشرة في متصفح جهازك دون إرسال رواتبك أو أرقامك إلى خوادمنا.
        </p>
      </div>
    </div>
  );
}
