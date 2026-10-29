import { CalculationResult } from '@/types/calculator';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatters';

/**
 * Calculates End of Service Gratuity (مكافأة نهاية الخدمة)
 * Supports Saudi Labor Law (Articles 84 & 85) and UAE Federal Labor Law
 */
export function calculateEndOfService(
  inputs: Record<string, any>,
  context?: { countryCode?: string; currencyCode?: string }
): CalculationResult {
  const salary = Number(inputs.salary); // Monthly salary
  const serviceYears = Number(inputs.years || 0);
  const serviceMonths = Number(inputs.months || 0);
  const serviceDays = Number(inputs.days || 0);
  const country = (context?.countryCode || String(inputs.country || 'SA')).toUpperCase();
  const terminationReason = String(inputs.terminationReason || 'employer_end'); // 'employer_end', 'resignation', 'contract_expired'
  const currency = context?.currencyCode || inputs.currency || (country === 'AE' ? 'AED' : 'SAR');

  if (isNaN(salary) || salary <= 0) {
    return {
      primary: { label: 'مكافأة نهاية الخدمة', value: 0, formattedValue: '-' },
      error: 'يرجى إدخال راتب شهري صحيح أكبر من الصفر.',
    };
  }

  const totalYears = serviceYears + serviceMonths / 12 + serviceDays / 365;

  if (totalYears <= 0) {
    return {
      primary: { label: 'مكافأة نهاية الخدمة', value: 0, formattedValue: '-' },
      error: 'يرجى إدخال مدة خدمة صالحة.',
    };
  }

  let fullGratuity = 0;
  let entitlementRatio = 1.0;
  let explanationSteps: string[] = [];
  let ruleCitation = '';

  if (country === 'AE') {
    // UAE Labor Law (Decree Law No. 33 of 2021)
    ruleCitation = 'المرسوم بقانون اتحادي رقم (33) لسنة 2021 بشأن تنظيم علاقات العمل بدولة الإمارات';
    // 21 days basic salary for each year of the first 5 years
    // 30 days basic salary for each additional year
    // Not entitled if less than 1 year
    if (totalYears < 1) {
      fullGratuity = 0;
      entitlementRatio = 0;
      explanationSteps.push('لا يستحق العامل مكافأة نهاية الخدمة إذا كانت مدة خدمته أقل من سنة كاملة مستمرة.');
    } else {
      const first5 = Math.min(5, totalYears);
      const after5 = Math.max(0, totalYears - 5);

      const dayWage = salary / 30;
      const part1 = first5 * (21 * dayWage);
      const part2 = after5 * (30 * dayWage);
      fullGratuity = part1 + part2;

      // Cap at 2 years salary
      const maxCap = salary * 24;
      if (fullGratuity > maxCap) {
        fullGratuity = maxCap;
        explanationSteps.push(`تم تطبيق الحد الأقصى القانوني للمكافأة (أجر سنتين = ${formatCurrency(maxCap, currency)}).`);
      }

      explanationSteps.push(`احتساب أجر 21 يوماً عن السنوات الخمس الأولى: ${formatCurrency(part1, currency)}`);
      if (after5 > 0) {
        explanationSteps.push(`احتساب أجر 30 يوماً عن السنوات التالية (${formatNumber(after5, { decimals: 2 })} سنة): ${formatCurrency(part2, currency)}`);
      }
    }
  } else {
    // Default: Saudi Labor Law (Articles 84 & 85)
    ruleCitation = 'المادتان (84) و (85) من نظام العمل السعودي الصادر بالمرسوم الملكي م/51';
    const first5 = Math.min(5, totalYears);
    const after5 = Math.max(0, totalYears - 5);

    const halfMonthWage = salary / 2;
    const part1 = first5 * halfMonthWage;
    const part2 = after5 * salary;
    fullGratuity = part1 + part2;

    explanationSteps.push(`احتساب نصف أجر شهر عن السنوات الخمس الأولى (${formatNumber(first5, { decimals: 2 })} سنة): ${formatCurrency(part1, currency)}`);
    if (after5 > 0) {
      explanationSteps.push(`احتساب أجر شهر كامل عن السنوات التالية (${formatNumber(after5, { decimals: 2 })} سنة): ${formatCurrency(part2, currency)}`);
    }

    // Apply Art 85 resignation reduction if applicable
    if (terminationReason === 'resignation') {
      if (totalYears < 2) {
        entitlementRatio = 0;
        explanationSteps.push('في حالة الاستقالة: خدمة أقل من سنتين لا تستحق أي مكافأة بموجب المادة 85.');
      } else if (totalYears < 5) {
        entitlementRatio = 1 / 3;
        explanationSteps.push('في حالة الاستقالة: خدمة بين سنتين و5 سنوات يستحق العامل ثلث المكافأة (33.3%).');
      } else if (totalYears < 10) {
        entitlementRatio = 2 / 3;
        explanationSteps.push('في حالة الاستقالة: خدمة بين 5 سنوات و10 سنوات يستحق العامل ثلثي المكافأة (66.6%).');
      } else {
        entitlementRatio = 1.0;
        explanationSteps.push('في حالة الاستقالة: خدمة 10 سنوات فأكثر يستحق العامل المكافأة كاملة (100%).');
      }
    } else {
      explanationSteps.push('إنهاء العقد من قبل صاحب العمل أو انتهاء العقد محدد المدة: استحقاق المكافأة كاملة (100%).');
    }
  }

  const finalGratuity = fullGratuity * entitlementRatio;

  return {
    primary: {
      id: 'finalGratuity',
      label: 'مكافأة نهاية الخدمة المستحقة',
      value: finalGratuity,
      formattedValue: formatCurrency(finalGratuity, currency),
      unit: currency,
      highlight: true,
      badge: entitlementRatio === 1 ? 'استحقاق كامل 100%' : entitlementRatio > 0 ? `استحقاق جزئي (${formatPercent(entitlementRatio * 100, 1)})` : 'لا يوجد استحقاق قانوني',
      isCurrency: true,
    },
    secondary: [
      {
        id: 'fullGratuity',
        label: 'المكافأة التقديرية الكاملة (قبل نسبة الاستقالة)',
        value: fullGratuity,
        formattedValue: formatCurrency(fullGratuity, currency),
        unit: currency,
      },
      {
        id: 'totalServiceDuration',
        label: 'إجمالي مدة الخدمة المحتسبة',
        value: totalYears,
        formattedValue: `${serviceYears} سنة و ${serviceMonths} شهر و ${serviceDays} يوم (${formatNumber(totalYears, { decimals: 2 })} سنة)`,
      },
      {
        id: 'entitlementPercentage',
        label: 'نسبة الاستحقاق النظامية',
        value: entitlementRatio * 100,
        formattedValue: formatPercent(entitlementRatio * 100, 1),
        unit: '%',
      },
    ],
    details: [
      { label: 'الراتب المعتمد في الحساب', value: formatCurrency(salary, currency) },
      { label: 'سبب انتهاء العلاقة العمالية', value: terminationReason === 'resignation' ? 'استقالة بمبادرة من الموظف' : 'انتهاء عقد محدد المدة أو إنهاء من المنشأة' },
      { label: 'المرجعية النظامية المعتمدة', value: ruleCitation },
    ],
    calculationSteps: explanationSteps,
    directAnswer: `مكافأة نهاية الخدمة المستحقة عن مدة خدمة ${formatNumber(totalYears, { decimals: 2 })} سنة تبلغ ${formatCurrency(finalGratuity, currency)} وفق لوائح العمل المعتمدة.`,
    assumptions: [
      'في السعودية، يُعتمد الأجر الفعلي الأخير الشامل للبدلات الثابتة المتفق عليها في عقد العمل.',
      'في الإمارات، يُعتمد الأجر الأساسي الأخير مستبعداً بدلات السكن والنقل والعلاوات بموجب المادة 51 من قانون العمل.',
      'لا تدخل فترات الإجازات غير مدفوعة الأجر أو الانقطاع غير المبرر ضمن حساب مدة الخدمة.',
    ],
    relevantRuleVersion: country === 'AE' ? 'UAE-LABOR-2021' : 'SA-LABOR-M51',
    country,
    currency,
  };
}
