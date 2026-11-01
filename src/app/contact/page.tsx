import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ContactForm from '@/components/common/ContactForm';
import { formatMetaTitle, constructCanonicalUrl } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: formatMetaTitle('اتصل بنا واقترح حاسبات جديدة'),
  description: 'تواصل مع فريق منصة لِسيارتك لتقديم الاقتراحات أو الاستفسارات أو الإبلاغ عن أي تحديث للوائح الحسابية في دولتك.',
  alternates: {
    canonical: constructCanonicalUrl('/contact'),
  },
};

export default function ContactPage() {
  const breadcrumbs = [{ label: 'اتصل بنا', href: '/contact' }];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          تواصل معنا واقترح حاسبات جديدة
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          يسعدنا استقبال مقترحاتكم للحاسبات الجديدة، أو الإبلاغ عن أي تحديث في لوائح الضرائب والعمل في دولتك لمساعدتنا في تحديث المنصة فورياً.
        </p>
      </div>

      <ContactForm />
    </div>
  );
}
