'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [channel, setChannel] = useState('corrections');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">نموذج التواصل المباشر</h2>
        <p className="text-xs text-slate-500 mt-1">
          يرجى اختيار القسم المناسب لرسالتك لضمان توجيهها إلى الفريق المسؤول والرد بأسرع وقت ممكن.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">شكراً لتواصلك معنا!</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            وصلتنا رسالتك وسيقوم فريق العمل بمراجعتها والرد عليك عبر البريد الإلكتروني خلال 48 ساعة عمل.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Channel Selector */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
              نوع الاستفسار / الغرض من التواصل
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <label
                className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center gap-2 ${
                  channel === 'corrections'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <input
                  type="radio"
                  name="channel"
                  value="corrections"
                  checked={channel === 'corrections'}
                  onChange={() => setChannel('corrections')}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>تدقيق وتصحيح خطأ حسابي</span>
              </label>

              <label
                className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center gap-2 ${
                  channel === 'advertising'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <input
                  type="radio"
                  name="channel"
                  value="advertising"
                  checked={channel === 'advertising'}
                  onChange={() => setChannel('advertising')}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>الإعلانات والشراكات</span>
              </label>

              <label
                className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center gap-2 ${
                  channel === 'feedback'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <input
                  type="radio"
                  name="channel"
                  value="feedback"
                  checked={channel === 'feedback'}
                  onChange={() => setChannel('feedback')}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>مقترحات وملاحظات عامة</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                البريد الإلكتروني للرد
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-sans text-start"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
              عنوان الموضوع أو اسم الحاسبة المعنية
            </label>
            <input
              type="text"
              required
              placeholder={channel === 'corrections' ? 'مثال: تحديث سعر بنزين 95 في عمان لشهر نوفمبر' : 'اكتب موضوع الرسالة هنا'}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
              تفاصيل الرسالة أو روابط المصادر الرسمية المؤيدة
            </label>
            <textarea
              rows={5}
              required
              placeholder="اكتب التفاصيل الكاملة هنا. في حال الإبلاغ عن تعديل نظامي، يرجى تزويدنا برابط القرار أو الجريدة الرسمية..."
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
  );
}
