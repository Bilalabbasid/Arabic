import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { ShieldCheck, Scale, CheckCircle2, AlertTriangle, BookOpen, Layers } from 'lucide-react';
import { formatMetaTitle, constructCanonicalUrl } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: formatMetaTitle('المنهجية العلمية والشفافية في الحساب'),
  description: 'تعرف على المنهجية المعتمدة في بناء حاسبات منصة لِسيارتك وكيفية تدقيق وتحديث القوانين والضرائب الرسمية لمختلف الدول العربية.',
  alternates: {
    canonical: constructCanonicalUrl('/methodology/'),
  },
};

export default function MethodologyPage() {
  const breadcrumbs = [{ label: 'المنهجية والمعايير', href: '/methodology/' }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          معايير الدقة والشفافية
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          منهجية العمل والمعايير الحسابية
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          في منصة لِسيارتك (lsayartk.com)، لا نعتمد على التخمين أو التقديرات العشوائية. صُممت كل حاسبة وفق إطار هندسي وقانوني دقيق يضمن سلامة الحسابات ومطابقتها للأنظمة الرسمية.
        </p>
      </div>

      <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        {/* Section 1 */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-600" />
            <span>1. تصنيف الحاسبات حسب النطاق الجغرافي (Country Mode Architecture)</span>
          </h2>
          <p>
            تتبع المنصة تصنيفاً معمارياً ثلاثي المستويات لضمان عدم خلط الأنظمة المحلية بالمعادلات الكونية:
          </p>
          <ul className="list-disc list-inside space-y-2 ps-2 text-slate-600 text-sm">
            <li>
              <strong>حاسبات كونية (UNIVERSAL):</strong> تعتمد على نظريات رياضية أو طبية عالمية لا تتغير بتغير الدولة، مثل مؤشر كتلة الجسم (WHO) والنسب المئوية والعمليات الهندسية.
            </li>
            <li>
              <strong>حاسبات متغيرة المعطيات (COUNTRY_CONFIGURABLE):</strong> المعادلة الحسابية عالمية وموحدة، ولكن المدخلات تختلف من دولة لأخرى (مثل أسعار لتر البنزين، العملات المحلية، ونسب ضريبة القيمة المضافة).
            </li>
            <li>
              <strong>حاسبات تنظيمية سيادية (COUNTRY_REGULATED):</strong> صيغة الحساب نفسها مشروطة بنص قانوني أو مرسوم رسمي محدد (مثل مكافأة نهاية الخدمة وفق المادتين 84 و 85 من نظام العمل السعودي أو قانون العمل الإماراتي).
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>2. دورة التدقيق والتحديث المستمر</span>
          </h2>
          <p>
            تخضع جميع القواعد والتعرفات المطبقة لمراجعة دورية منتظمة. عند صدور أي تعديل على قوانين العمل أو الضرائب أو شرائح الكهرباء في أي دولة عربية، يتم تحديث إصدار القاعدة (Rule Version) وتوثيق تاريخ المراجعة ومصدر القرار على صفحة الحاسبة مباشرة.
          </p>
        </section>

        {/* Section 3 */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>3. إخلاء المسؤولية القانونية والمالية</span>
          </h2>
          <p>
            على الرغم من الحرص البالغ على مطابقة النتائج للواقع العملي، فإن المنصة لا تدعي &quot;دقة مطلقة بنسبة 100% مضمونة قانوناً&quot; لأي نتيجة، حيث قد تتدخل عوامل فردية في العقود الخاصة أو استثناءات في اللوائح التنفيذية. جميع النتائج مقدمة لأغراض استرشادية، ويجب مراجعة المستشار المالي أو القانوني المختص في القرارات المصيرية.
          </p>
        </section>
      </div>
    </div>
  );
}
