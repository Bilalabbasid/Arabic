'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const breadcrumbs = [{ label: 'اتصل بنا', href: '/contact/' }];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">شكراً لتواصلك معنا!</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              وصلتنا رسالتك وسيقوم فريق التحرير بمراجعة مقترحك والرد عليك في أقرب وقت.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                الاسم الكريم
              </label>
              <input
                type="text"
                required
                placeholder="أدخل اسمك"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-sans text-start"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                موضوع الرسالة أو اسم الحاسبة المقترحة
              </label>
              <input
                type="text"
                required
                placeholder="مثال: اقتراح إضافة حاسبة جمارك السيارات في مصر"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                تفاصيل الرسالة أو المصادر الرسمية
              </label>
              <textarea
                rows={5}
                required
                placeholder="اكتب رسالتك هنا..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>إرسال الرسالة</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
