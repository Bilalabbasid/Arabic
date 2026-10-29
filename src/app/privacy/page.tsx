import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { ShieldCheck, Lock, DatabaseZap, HardDrive } from 'lucide-react';
import { formatMetaTitle, constructCanonicalUrl } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: formatMetaTitle('سياسة الخصوصية وحماية البيانات'),
  description: 'سياسة الخصوصية لمنصة لِسيارتك: تأكيد عدم استخدام أي قواعد بيانات خادم لحفظ مدخلاتك، وحفظ التفضيلات محلياً في متصفحك فقط.',
  alternates: {
    canonical: constructCanonicalUrl('/privacy/'),
  },
};

export default function PrivacyPage() {
  const breadcrumbs = [{ label: 'سياسة الخصوصية', href: '/privacy/' }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          سياسة الخصوصية وحماية البيانات
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          تاريخ السريان: أكتوبر 2026. خصوصيتك وسلامة بياناتك الحسابية هي المبدأ الأساسي الذي صُممت منصة لِسيارتك عليه.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
        {/* Core Guarantee */}
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-base text-emerald-800">
            <Lock className="w-5 h-5" />
            <span>ضمان الخصوصية التامة: لا توجد قواعد بيانات لحفظ مدخلاتك</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
            منصة لِسيارتك (lsayartk.com) لا تمتلك ولا تستخدم أي قواعد بيانات لتخزين أرقامك أو رواتبك أو مبالغ قروضك أو أوزانك. جميع العمليات الحسابية تُنفذ وتُعالج بالكامل على جهازك (Client-side Execution) داخل متصفح الإنترنت.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-emerald-600" />
            <span>1. استخدام التخزين المحلي في المتصفح (localStorage)</span>
          </h2>
          <p>
            نستخدم خاصية التخزين المحلي في متصفحك (localStorage) فقط لتخزين خيارات غير حساسة تشمل:
          </p>
          <ul className="list-disc list-inside space-y-1 ps-2 text-slate-600 text-sm">
            <li>معرّفات الحاسبات المفضلة لديك (Calculator Slugs) لتسهيل وصولك إليها.</li>
            <li>كود دولتك المفضلة (مثل SA أو AE) لعرض العملة المناسبة لك تلقائياً.</li>
            <li>قائمة مختصرة بآخر الحاسبات التي قمت بزيارتها.</li>
          </ul>
          <p className="text-xs text-slate-500">
            هذه البيانات لا تغادر جهازك مطلقاً ولا يمكن لأي خادم خارجي الوصول إليها، ويمكنك مسحها في أي وقت عبر إعدادات متصفحك.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>2. حسابات المستخدمين وتسجيل الدخول</span>
          </h2>
          <p>
            لا تتطلب منصتنا إنشاء أي حساب أو كلمة مرور أو تسجيل دخول بالبريد الإلكتروني لاستخدام أي من الحاسبات المتوفرة. كافة الأدوات مجانية ومتاحة مباشرة دون جمع أي بيانات هوية.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            3. ملفات تعريف الارتباط والإعلانات (Cookies & Ads)
          </h2>
          <p>
            قد نستعين بشركات إعلانية تابعة لجهات خارجية (مثل Google AdSense) لعرض الإعلانات عند زيارة موقعنا. قد تستخدم هذه الشركات ملفات تعريف الارتباط لعرض إعلانات ملائمة بناءً على زياراتك السابقة للمواقع. يمكنك إدارة تفضيلات الإعلانات عبر إعدادات حساب Google الخاص بك.
          </p>
        </section>
      </div>
    </div>
  );
}
