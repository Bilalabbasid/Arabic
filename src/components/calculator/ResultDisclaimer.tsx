import React from 'react';
import { CalculationResult } from '@/types/calculator';
import { ALL_COUNTRY_LEGAL_RULES } from '@/data/rules';
import { Info, ExternalLink } from 'lucide-react';

interface Props {
  calculatorSlug?: string;
  result: CalculationResult;
  countryCode?: string;
  className?: string;
}

interface DisclaimerContent {
  disclaimerType: string;
  disclaimerText: string;
  authority: string;
  sourceUrl: string;
  lastChecked: string;
}

export function getDisclaimerForCalculator(
  slug: string | undefined,
  countryCode: string | undefined,
  result?: CalculationResult
): DisclaimerContent {
  const code = (countryCode || result?.country || 'SA').toUpperCase();
  const rule = ALL_COUNTRY_LEGAL_RULES[code];

  switch (slug) {
    case 'vat-calculator': {
      if (rule && rule.hasVat && rule.vatStandardRate) {
        return {
          disclaimerType: 'tax',
          disclaimerText: `تعتمد هذه النتيجة على نسبة ضريبة القيمة المضافة المعلنة من ${rule.vatStandardRate.authority} (${rule.vatStandardRate.value}%). الفواتير الضريبية الرسمية تخضع لتعليمات ${rule.vatStandardRate.authority} وقواعد الفوترة الإلكترونية.`,
          authority: rule.vatStandardRate.authority,
          sourceUrl: rule.vatStandardRate.sourceUrl,
          lastChecked: rule.vatStandardRate.checkedAt,
        };
      }
      if (rule && !rule.hasVat) {
        return {
          disclaimerType: 'tax',
          disclaimerText: `لا تطبق ضريبة القيمة المضافة رسمياً في ${rule.countryNameAr}. تم استخدام النسبة المدخلة كحساب تقديري استرشادي غير ملزم.`,
          authority: rule.vatStandardRate?.authority || 'وزارة المالية',
          sourceUrl: rule.vatStandardRate?.sourceUrl || 'https://www.mof.gov.kw',
          lastChecked: '2026-11-01',
        };
      }
      return {
        disclaimerType: 'tax',
        disclaimerText: 'تعتمد هذه النتيجة على نسبة ضريبة القيمة المضافة المدخلة. الفواتير الضريبية الرسمية تخضع لتعليمات الهيئة الضريبية المختصة وقواعد الفوترة المعمول بها.',
        authority: 'الهيئات الضريبية المعتمدة',
        sourceUrl: 'https://zatca.gov.sa',
        lastChecked: '2026-11-01',
      };
    }

    case 'end-of-service-reward': {
      if (rule && rule.endOfService) {
        return {
          disclaimerType: 'labour',
          disclaimerText: `حساب تقديري استرشادي مبني على ${rule.endOfService.value.articles} من ${rule.endOfService.law}. المستحقات النهائية تخضع لمراجعة إدارة الموارد البشرية والبدلات الثابتة في العقد.`,
          authority: rule.endOfService.authority,
          sourceUrl: rule.endOfService.sourceUrl,
          lastChecked: rule.endOfService.checkedAt,
        };
      }
      return {
        disclaimerType: 'labour',
        disclaimerText: 'حساب تقديري استرشادي مبني على المادتين 84 و 85 من نظام العمل السعودي أو قانون العمل المقابل. المستحقات النهائية تخضع لمراجعة إدارة الموارد البشرية والبدلات الثابتة في العقد.',
        authority: 'وزارات الموارد البشرية والعمل',
        sourceUrl: 'https://hrsd.gov.sa',
        lastChecked: '2026-11-01',
      };
    }

    case 'loan-calculator':
      return {
        disclaimerType: 'finance',
        disclaimerText: 'قسط استرشادي وفق طريقة الفائدة المتناقصة أو المرابحة البنكية. العرض النهائي وجدول السداد ورسوم التأمين والمصادقة تحددها جهة التمويل المرخصة من البنك المركزي.',
        authority: 'البنوك المركزية وهيئات الرقابة المالية المصرفية',
        sourceUrl: 'https://www.sama.gov.sa',
        lastChecked: '2026-11-01',
      };

    case 'zakat-wealth':
      return {
        disclaimerType: 'zakat',
        disclaimerText: 'حساب تقديري بناءً على سعر الذهب المُدخل ونصاب 85 غراماً شرعياً بنسبة 2.5% للسنة الهجرية. يُرجى مراجعة إدارات الفتوى والزكاة المعتمدة في المسائل المعقدة والأصول المركبة.',
        authority: 'المعايير الشرعية لهيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية (AAOIFI)',
        sourceUrl: 'https://aaoifi.com',
        lastChecked: '2026-11-01',
      };

    case 'bmi-calculator':
      return {
        disclaimerType: 'health',
        disclaimerText: 'مؤشر كتلة الجسم هو تقدير إحصائي ولا يغني عن الاستشارة الطبية المتخصصة، ولا ينطبق على الأطفال أو الحوامل أو الرياضيين ذوي الكتلة العضلية العالية.',
        authority: 'منظمة الصحة العالمية (WHO) – معايير مؤشر كتلة الجسم',
        sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight',
        lastChecked: '2026-11-01',
      };

    case 'car-fuel-cost':
    case 'fuel-cost':
    case 'fuel-prices':
    case 'trip-cost':
    case 'fuel-consumption-converter': {
      if (rule && rule.fuelPrices) {
        return {
          disclaimerType: 'fuel-electricity',
          disclaimerText: `تعتمد التكلفة على التسعيرة الرسمية المعلنة من ${rule.fuelPrices.authority} (${rule.fuelPrices.value.pricingModel}). قد يختلف الاستهلاك الفعلي حسب ظروف القيادة وحالة المحرك والمكيف.`,
          authority: rule.fuelPrices.authority,
          sourceUrl: rule.fuelPrices.sourceUrl,
          lastChecked: rule.fuelPrices.checkedAt,
        };
      }
      return {
        disclaimerType: 'fuel-electricity',
        disclaimerText: 'تعتمد التكلفة على أسعار الوقود الرسمية المعلنة. قد تختلف كمية الاستهلاك الفعلية بحسب ظروف الطريق وتشغيل المكيف وطريقة القيادة.',
        authority: 'وزارات الطاقة وشركات الوقود الوطنية',
        sourceUrl: 'https://www.aramco.com',
        lastChecked: '2026-11-01',
      };
    }

    case 'traffic-fines':
      return {
        disclaimerType: 'fines',
        disclaimerText: 'قيم المخالفات الواردة استرشادية مبنية على لوائح المرور وجداول الغرامات المقررة نظاماً؛ وقد تختلف الغرامة الفعلية بحسب ظروف الضبط، أو تطبيق التخفيضات الرسمية المعلنة، أو تراكم النقاط المرورية وسجل السائق.',
        authority: 'الإدارات العامة للمرور ووزارات الداخلية',
        sourceUrl: 'https://www.moi.gov.sa',
        lastChecked: '2026-11-01',
      };

    case 'car-import-customs':
      return {
        disclaimerType: 'customs',
        disclaimerText: 'الرسوم الجمركية وضريبة القيمة المضافة محسوبة وفق جداول التعريفة الجمركية وضوابط سنة الموديل. القيمة الجمركية النهائية تحددها السلطات الجمركية عند المنفذ بناءً على فواتير الشراء والتأمين والشحن (CIF) وحالة المركبة.',
        authority: 'هيئات ومصالح الجمارك الرسمية',
        sourceUrl: 'https://zatca.gov.sa',
        lastChecked: '2026-11-01',
      };

    case 'lease-vs-buy':
    case 'car-finance':
    case 'car-affordability':
      return {
        disclaimerType: 'lease',
        disclaimerText: 'مقارنة استرشادية لخيارات الشراء النقدي والتمويل التأجيري والمرابحة. العروض التمويلية الفعلية ومعدل النسبة السنوي (APR) وقيمة الدفعة الأخيرة وجدول السداد تحددها البنوك وشركات التمويل المرخصة من البنك المركزي.',
        authority: 'البنوك المركزية وهيئات الرقابة المالية والمصرفية',
        sourceUrl: 'https://www.sama.gov.sa',
        lastChecked: '2026-11-01',
      };

    case 'car-depreciation':
    case 'tire-size':
    case 'ev-vs-petrol':
      return {
        disclaimerType: 'depreciation',
        disclaimerText: 'حسابات تقديرية مبنية على معدلات الاستهلاك والمسافات السنوية المتوسطة وتكاليف الصيانة الدورية. القيمة السوقية وتكاليف التشغيل الفعلية تتأثر مباشرة بطريقة الاستخدام وظروف المناخ ونوع المركبة.',
        authority: 'معايير تقييم المركبات والاستهلاك المعتمدة',
        sourceUrl: 'https://lsayartk.com/sources',
        lastChecked: '2026-11-01',
      };

    case 'vehicle-fees':
      return {
        disclaimerType: 'vehicle-fees',
        disclaimerText: 'رسوم تجديد الاستمارة أو رخصة السير والفحص الدوري والتأمين تستند إلى اللوائح النظامية الرسمية المعتمدة لكل فئة ونوع مركبة.',
        authority: 'إدارات المرور وهيئات المواصفات والمقاييس',
        sourceUrl: 'https://www.moi.gov.sa',
        lastChecked: '2026-11-01',
      };

    case 'net-salary':
      return {
        disclaimerType: 'salary',
        disclaimerText: 'احتساب صافي الراتب يعتمد على نسب اشتراكات التأمينات الاجتماعية والتقاعد وشرائح ضريبة الدخل الشخصي النظامية المعتمدة لكل دولة للمواطنين والمقيمين.',
        authority: 'مؤسسات التأمينات الاجتماعية ومصالح الضرائب',
        sourceUrl: 'https://gosi.gov.sa',
        lastChecked: '2026-11-01',
      };

    case 'hijri-converter':
    case 'hijri-age':
    case 'ramadan-countdown':
      return {
        disclaimerType: 'calendar',
        disclaimerText: 'الحسابات مبنية على تقويم أم القرى والحسابات الفلكية المعتمدة للاقتران القمري. بداية الأشهر الهجرية الفعلية ومناسبات شهر رمضان ترتبط بالرؤية الشرعية للهلال والمحاكم العليا وهيئات الإفتاء الرسمية.',
        authority: 'تقويم أم القرى والمحاكم العليا وهيئات الإفتاء الشرعية',
        sourceUrl: 'https://www.ummulqura.org.sa',
        lastChecked: '2026-11-01',
      };

    case 'electricity-bill': {
      if (rule && rule.electricityTariff) {
        return {
          disclaimerType: 'fuel-electricity',
          disclaimerText: `تعتمد التكلفة على التعرفة الرسمية وشرائح الاستهلاك المعلنة من ${rule.electricityTariff.authority}. قد تنطبق رسوم خدمة العداد وضريبة القيمة المضافة النظامية.`,
          authority: rule.electricityTariff.authority,
          sourceUrl: rule.electricityTariff.sourceUrl,
          lastChecked: rule.electricityTariff.checkedAt,
        };
      }
      return {
        disclaimerType: 'fuel-electricity',
        disclaimerText: 'تعتمد التكلفة على التعرفة الرسمية لشرائح الاستهلاك. قد تنطبق رسوم قراءة العداد وضريبة القيمة المضافة بحسب اللائحة المعتمدة محلياً.',
        authority: 'هيئات تنظيم الكهرباء الوطنية',
        sourceUrl: 'https://sera.gov.sa',
        lastChecked: '2026-11-01',
      };
    }

    case 'percentage-calculator':
      return {
        disclaimerType: 'math-units',
        disclaimerText: 'نتيجة حسابية دقيقة مبنية على القواعد الرياضية والجبرية القياسية دون أي افتراضات تقديرية.',
        authority: 'المعايير الرياضية القياسية الدولية',
        sourceUrl: 'https://www.iso.org',
        lastChecked: '2026-11-01',
      };

    case 'length-converter':
      return {
        disclaimerType: 'math-units',
        disclaimerText: 'نتيجة حسابية دقيقة مبنية على معاملات التحويل القياسية الدولية (معيار ISO 80000-3 للكميات والوحدات).',
        authority: 'المكتب الدولي للأوزان والمقاييس (BIPM) / المنظمة الدولية للتقييس (ISO)',
        sourceUrl: 'https://www.bipm.org',
        lastChecked: '2026-11-01',
      };

    case 'time-converter':
      return {
        disclaimerType: 'math-units',
        disclaimerText: 'نتيجة حسابية دقيقة مبنية على القواعد الزمنية القياسية الدولية (معيار ISO 8601 للتقويم والوحدات الزمنية).',
        authority: 'المنظمة الدولية للتقييس (ISO 8601)',
        sourceUrl: 'https://www.iso.org',
        lastChecked: '2026-11-01',
      };

    default:
      return {
        disclaimerType: 'general',
        disclaimerText: 'نتائج هذه الحاسبة استرشادية تعليمية غير ملزمة رسمياً، وتعتمد على المعادلات واللوائح المعلنة بتاريخ مراجعتها.',
        authority: 'المراجع واللوائح الرسمية المعتمدة',
        sourceUrl: 'https://lsayartk.com/sources',
        lastChecked: '2026-11-01',
      };
  }
}

export default function ResultDisclaimer({
  calculatorSlug,
  result,
  countryCode,
  className = '',
}: Props) {
  const disclaimer = getDisclaimerForCalculator(calculatorSlug, countryCode, result);

  return (
    <div
      role="note"
      aria-label="تنويه حول النتيجة"
      className={`p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-slate-700 text-sm leading-relaxed space-y-2 shadow-sm ${className}`}
    >
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-2 flex-1">
          <p className="font-medium text-slate-800 leading-relaxed text-sm sm:text-base">
            {disclaimer.disclaimerText}
          </p>
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-200/60 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>آخر تحديث للأنظمة: {disclaimer.lastChecked}</span>
            <span>•</span>
            <a
              href={disclaimer.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>رابط المصدر: {disclaimer.authority}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
