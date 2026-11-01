import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Scale, AlertTriangle, FileText } from 'lucide-react';
import { formatMetaTitle, constructCanonicalUrl } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: formatMetaTitle('شروط الاستخدام وإخلاء المسؤولية'),
  description: 'شروط استخدام منصة لِسيارتك وإخلاء المسؤولية القانونية والمالية المتعلقة بنتائج الحاسبات والتقديرات التوجيهية.',
  alternates: {
    canonical: constructCanonicalUrl('/terms'),
  },
};

export default function TermsPage() {
  const breadcrumbs = [{ label: 'شروط الاستخدام', href: '/terms' }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          شروط الاستخدام وإخلاء المسؤولية
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          يرجى قراءة هذه الشروط بعناية قبل استخدام أدوات وحاسبات منصة لِسيارتك (lsayartk.com).
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-600" />
            <span>1. الطبيعة الإرشادية للأدوات</span>
          </h2>
          <p>
            تقدم جميع الحاسبات والأدوات البرمجية على منصة لِسيارتك لأغراض التثقيف والإرشاد والمحاكاة التقديرية فقط. لا تشكل نتائج الحاسبات عقوداً رسمية ملزمة أو استشارات مالية أو قانونية أو ضريبية أو طبية معتمدة.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>2. حدود المسؤولية</span>
          </h2>
          <p>
            لا تتحمل إدارة المنصة أي مسؤولية قانونية أو أضرار مالية مباشرة أو غير مباشرة ناتجة عن الاعتماد الحصري على نتائج الحاسبات، حيث تخضع العقود الفردية وقوانين العمل والضرائب لتفاصيل وظروف خاصة قد لا تشملها النماذج العامة.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>3. حقوق الملكية الفكرية</span>
          </h2>
          <p>
            كافة الأكواد البرمجية، النصوص التوضيحية، وتصاميم الواجهات على منصة لِسيارتك محمية بموجب أنظمة حماية حقوق المؤلف، ولا يجوز نسخها أو إعادة نشرها بدون إذن مسبق.
          </p>
        </section>
      </div>
    </div>
  );
}
