import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ContactForm from '@/components/common/ContactForm';
import { Mail, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import { formatMetaTitle, constructCanonicalUrl } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: formatMetaTitle('اتصل بنا ومركز الدعم والمقترحات'),
  description: 'تواصل مع فريق تحرير منصة لِسيارتك لتقديم الاستفسارات، أو الإبلاغ عن أخطاء في الحسابات، أو الاستفسارات الإعلانية والشراكات.',
  alternates: {
    canonical: constructCanonicalUrl('/contact'),
  },
};

export default function ContactPage() {
  const breadcrumbs = [{ label: 'اتصل بنا', href: '/contact' }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          تواصل معنا ومركز المقترحات
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          نرحب دائماً بملاحظاتكم واستفساراتكم، ويسعدنا تلقي أي تصحيحات حول اللوائح والتعرفات المعلنة لمساعدتنا في الحفاظ على أعلى معايير الدقة والشفافية.
        </p>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">البريد الإلكتروني المباشر</h2>
          <a
            href="mailto:info@lsayartk.com"
            className="text-xs text-emerald-700 hover:text-emerald-800 font-mono font-semibold block"
            dir="ltr"
          >
            info@lsayartk.com
          </a>
          <span className="text-[11px] text-slate-400 block">للمراسلات الرسمية والتحريرية والمقترحات</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">زمن الاستجابة المتوقع</h2>
          <p className="text-xs text-slate-600 font-medium">
            خلال 48 ساعة عمل
          </p>
          <span className="text-[11px] text-slate-400 block">من الأحد إلى الخميس</span>
        </div>
      </div>

      {/* Contact Form with Category Selection */}
      <ContactForm />
    </div>
  );
}
