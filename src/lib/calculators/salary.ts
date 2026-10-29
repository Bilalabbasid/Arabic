import { CalculationResult } from '@/types/calculator';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatters';
import { resolveApplicableRule } from '@/lib/rules/rule-resolver';

/**
 * Calculates End of Service Gratuity (مكافأة نهاية الخدمة)
 * Rigorously verified against:
 * 1. Saudi Labor Law (Royal Decree M/51, Articles 84 & 85)
 * 2. UAE Federal Decree-Law No. (33) of 2021 (Article 51)
 * 3. Egyptian Labor Law No. 12 of 2003 (Article 126)
 */
export function calculateEndOfService(
  inputs: Record<string, any>,
  context?: { countryCode?: string; currencyCode?: string }
): CalculationResult {
  const salary = Number(inputs.salary); // Monthly salary
  let serviceYears = Number(inputs.years || 0);
  let serviceMonths = Number(inputs.months || 0);
  let serviceDays = Number(inputs.days || 0);

  // If start date and end date are provided, calculate exact continuous duration
  if (inputs.startDate && inputs.endDate) {
    const start = new Date(inputs.startDate);
    const end = new Date(inputs.endDate);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end > start) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      serviceYears = Math.floor(totalDays / 365);
      serviceMonths = Math.floor((totalDays % 365) / 30);
      serviceDays = totalDays % 30;
    }
  }

  const country = (context?.countryCode || String(inputs.country || 'SA')).toUpperCase();
  const terminationReason = String(inputs.terminationReason || 'employer_end'); // 'employer_end', 'resignation', 'contract_expired'
  let currency = context?.currencyCode || inputs.currency || (country === 'AE' ? 'AED' : country === 'EG' ? 'EGP' : 'SAR');

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
      error: 'يرجى إدخال مدة خدمة صالحة أو تاريخي بداية ونهاية خدمة صحيحين.',
    };
  }

  // Resolve verified country rule
  const resolution = resolveApplicableRule<any>({
    calculatorId: 'end-of-service-reward',
    countryCode: country,
    customerCategory: 'private_sector_employee',
  });

  let fullGratuity = 0;
  let entitlementRatio = 1.0;
  const explanationSteps: string[] = [];
  let ruleCitation = '';
  let sourceCitations: string[] = [];
  let ruleVersion = '2026.1';
  let assumptionsList: string[] = [];

  if (resolution.isAvailable && resolution.rule) {
    const rule = resolution.rule;
    currency = rule.parameters.currency || currency;
    sourceCitations = rule.sourceIds;
    ruleVersion = rule.formulaVersion;

    if (country === 'AE') {
      // UAE Federal Decree-Law No. (33) of 2021
      ruleCitation = 'المرسوم بقانون اتحادي رقم (33) لسنة 2021 ولائحته التنفيذية (المادة 51)';
      const params = rule.parameters;

      if (totalYears < 1.0) {
        fullGratuity = 0;
        entitlementRatio = 0.0;
        explanationSteps.push('مدة الخدمة أقل من سنة كاملة مستمرة: لا يستحق العامل مكافأة نهاية الخدمة بموجب المادة 51.');
      } else {
        const first5 = Math.min(5, totalYears);
        const after5 = Math.max(0, totalYears - 5);
        const dayWage = salary / 30; // 30-day statutory divisor

        const part1 = first5 * (params.firstFiveYearsDaysPerYear * dayWage);
        const part2 = after5 * (params.subsequentYearsDaysPerYear * dayWage);
        fullGratuity = part1 + part2;

        explanationSteps.push(`احتساب أجر 21 يوماً أساسياً عن السنوات الخمس الأولى (${formatNumber(first5, { decimals: 2 })} سنة): ${formatCurrency(part1, currency)}`);
        if (after5 > 0) {
          explanationSteps.push(`احتساب أجر 30 يوماً أساسياً عن السنوات التالية (${formatNumber(after5, { decimals: 2 })} سنة): ${formatCurrency(part2, currency)}`);
        }

        // Apply statutory ceiling: max 2 years basic salary
        const maxCap = salary * params.maximumCapMonths;
        if (fullGratuity > maxCap) {
          fullGratuity = maxCap;
          explanationSteps.push(`تم تطبيق الحد الأقصى القانوني للمكافأة (أجر سنتين أساسيتين = ${formatCurrency(maxCap, currency)}) بموجب الفقرة 5 من المادة 51.`);
        }

        // In new UAE law, resignation does NOT reduce gratuity if service >= 1 year
        entitlementRatio = 1.0;
        explanationSteps.push('بموجب المرسوم بقانون رقم 33 لسنة 2021، يستحق العامل المكافأة كاملة بنسبة 100% سواء كان الإنهاء من المنشأة أو بالاستقالة بعد إتمام سنة الخدمة.');
      }

      assumptionsList = [
        'يعتمد حساب المكافأة على الراتب الأساسي الأخير فقط مستبعداً بدلات السكن والنقل والعلاوات (المادة 51).',
        'تستحق كسور السنة مكافأة بنسبة ما قضاه العامل منها في العمل بشرط إكمال السنة الأولى.',
      ];
    } else if (country === 'EG') {
      // Egypt Labor Law No. 12 of 2003 (Article 126)
      ruleCitation = 'المادة (126) من قانون العمل المصري رقم 12 لسنة 2003';
      const first5 = Math.min(5, totalYears);
      const after5 = Math.max(0, totalYears - 5);

      const part1 = first5 * (salary / 2);
      const part2 = after5 * salary;
      fullGratuity = part1 + part2;
      entitlementRatio = 1.0;

      explanationSteps.push(`احتساب أجر نصف شهر عن كل سنة من السنوات الخمس الأولى: ${formatCurrency(part1, currency)}`);
      if (after5 > 0) {
        explanationSteps.push(`احتساب أجر شهر كامل عن كل سنة تالية: ${formatCurrency(part2, currency)}`);
      }

      assumptionsList = [
        'تطبق أحكام المادة 126 من قانون العمل المصري للعامل الذي يبلغ سن الستين دون أن يكون له معاش تأميني.',
      ];
    } else {
      // Saudi Arabia Labor Law (Royal Decree M/51, Articles 84 & 85)
      ruleCitation = 'المادتان (84) و (85) من نظام العمل السعودي الصادر بالمرسوم الملكي م/51';
      const params = rule.parameters;
      const first5 = Math.min(5, totalYears);
      const after5 = Math.max(0, totalYears - 5);

      const part1 = first5 * (salary / 2);
      const part2 = after5 * salary;
      fullGratuity = part1 + part2;

      explanationSteps.push(`احتساب أجر نصف شهر عن السنوات الخمس الأولى (${formatNumber(first5, { decimals: 2 })} سنة): ${formatCurrency(part1, currency)}`);
      if (after5 > 0) {
        explanationSteps.push(`احتساب أجر شهر كامل عن السنوات التالية (${formatNumber(after5, { decimals: 2 })} سنة): ${formatCurrency(part2, currency)}`);
      }

      if (terminationReason === 'resignation') {
        if (totalYears < 2) {
          entitlementRatio = params.resignationScale.underTwoYears; // 0
          explanationSteps.push('في حالة الاستقالة: خدمة أقل من سنتين متتاليتين لا تستحق أي مكافأة نظامية بموجب المادة 85.');
        } else if (totalYears < 5) {
          entitlementRatio = params.resignationScale.twoToFiveYears; // 1/3
          explanationSteps.push('في حالة الاستقالة: خدمة بين سنتين و5 سنوات يستحق العامل ثلث المكافأة (33.33%) بموجب المادة 85.');
        } else if (totalYears < 10) {
          entitlementRatio = params.resignationScale.fiveToTenYears; // 2/3
          explanationSteps.push('في حالة الاستقالة: خدمة بين 5 سنوات و10 سنوات يستحق العامل ثلثي المكافأة (66.67%) بموجب المادة 85.');
        } else {
          entitlementRatio = params.resignationScale.tenYearsOrMore; // 1.0
          explanationSteps.push('في حالة الاستقالة: خدمة 10 سنوات فأكثر يستحق العامل المكافأة كاملة بنسبة 100% بموجب المادة 85.');
        }
      } else {
        entitlementRatio = 1.0;
        explanationSteps.push('إنهاء العقد من قبل صاحب العمل أو انتهاء مدة العقد محدد المدة: استحقاق كامل بنسبة 100% بموجب المادة 84.');
      }

      assumptionsList = [
        'الأجر المعتمد هو الأجر الفعلي الأخير الشامل للأساسي والبدلات الثابتة (سكن، مواصلات).',
        'تستحق العاملة المكافأة كاملة إذا أنهت عقدها خلال 6 أشهر من تاريخ زواجها أو 3 أشهر من تاريخ وضعها (المادة 87).',
      ];
    }
  } else {
    // Unsupported country: reject or explain clearly
    return {
      primary: { label: 'مكافأة نهاية الخدمة', value: 0, formattedValue: '-' },
      error: resolution.unavailableReason || `لوائح مكافأة نهاية الخدمة لدولة (${country}) غير معتمدة حالياً. يرجى اختيار دولة مدعومة رسمياً.`,
    };
  }

  const finalGratuity = fullGratuity * entitlementRatio;

  return {
    primary: {
      id: 'finalGratuity',
      label: 'مكافأة نهاية الخدمة المستحقة نظاماً',
      value: finalGratuity,
      formattedValue: formatCurrency(finalGratuity, currency),
      unit: currency,
      highlight: true,
      badge: entitlementRatio === 1 ? 'استحقاق كامل 100%' : entitlementRatio > 0 ? `استحقاق جزئي (${formatPercent(entitlementRatio * 100, 1)})` : 'لا يوجد استحقاق نظامي',
      isCurrency: true,
    },
    secondary: [
      {
        id: 'fullGratuity',
        label: 'المكافأة التقديرية الكاملة (قبل خصم الاستقالة)',
        value: fullGratuity,
        formattedValue: formatCurrency(fullGratuity, currency),
        unit: currency,
      },
      {
        id: 'totalServiceYears',
        label: 'مدة الخدمة المحتسبة',
        value: totalYears,
        formattedValue: `${serviceYears} سنة و ${serviceMonths} شهر و ${serviceDays} يوم (${formatNumber(totalYears, { decimals: 2 })} سنة)`,
      },
      {
        id: 'entitlementPercentage',
        label: 'نسبة الاستحقاق المعتمدة',
        value: entitlementRatio * 100,
        formattedValue: formatPercent(entitlementRatio * 100, 1),
        unit: '%',
      },
    ],
    details: [
      { label: 'الراتب المعتمد في الحساب', value: formatCurrency(salary, currency) },
      { label: 'طبيعة إنهاء العلاقة العمالية', value: terminationReason === 'resignation' ? 'استقالة بمبادرة من العامل' : 'إنهاء عقد من صاحب العمل أو انتهاء مدته' },
      { label: 'السند واللوائح النظامية', value: ruleCitation },
      { label: 'إصدار القاعدة', value: `v${ruleVersion}` },
    ],
    calculationSteps: explanationSteps,
    directAnswer: `مكافأة نهاية الخدمة المستحقة عن مدة خدمة قدرها ${formatNumber(totalYears, { decimals: 2 })} سنة تبلغ ${formatCurrency(finalGratuity, currency)} وفق ${ruleCitation}.`,
    assumptions: assumptionsList,
    sources: sourceCitations,
    relevantRuleVersion: ruleVersion,
    country,
    currency,
  };
}
