import { CalculationResult, CalculationBreakdownRow } from '@/types/calculator';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatters';
import { resolveApplicableRule } from '@/lib/rules/rule-resolver';

/**
 * Calculates electricity consumption bill based on verified official regulatory slabs/tiers
 * for Saudi Arabia (SERA/SEC), UAE (DEWA/ADDC), and Egypt (EgyptERA).
 */
export function calculateElectricityBill(
  inputs: Record<string, any>,
  context?: { countryCode?: string; currencyCode?: string }
): CalculationResult {
  const kwh = Number(inputs.kwh);
  const tariffCategory = String(inputs.tariffCategory || 'residential');
  const provider = inputs.provider ? String(inputs.provider) : undefined;
  const meterBreakerAmps = Number(inputs.meterBreakerAmps || 60);
  const country = (context?.countryCode || String(inputs.country || 'SA')).toUpperCase();
  const effectiveDate = inputs.effectiveDate ? String(inputs.effectiveDate) : undefined;

  if (isNaN(kwh) || kwh < 0) {
    return {
      primary: { label: 'قيمة فاتورة الكهرباء', value: 0, formattedValue: '-' },
      error: 'يرجى إدخال كمية استهلاك صحيحة بوحدة كيلوواط/ساعة (أكبر من أو تساوي الصفر).',
    };
  }

  // Attempt to resolve verified regulatory country rule
  const resolution = resolveApplicableRule<any>({
    calculatorId: 'electricity-bill',
    countryCode: country,
    provider: provider || (country === 'AE' ? 'DEWA' : country === 'EG' ? 'EEHC' : 'SEC'),
    customerCategory: tariffCategory,
    effectiveDate,
  });

  let currency = context?.currencyCode || inputs.currency || (country === 'AE' ? 'AED' : country === 'EG' ? 'EGP' : 'SAR');
  let energyCost = 0;
  let meterServiceFee = 0;
  let fuelSurchargeTotal = 0;
  let vatAmount = 0;
  let totalBill = 0;
  const breakdownRows: CalculationBreakdownRow[] = [];
  const steps: string[] = [];
  let sourceCitations: string[] = [];
  let ruleVersion = '2026.1';
  let assumptionsList: string[] = [];

  if (resolution.isAvailable && resolution.rule) {
    const rule = resolution.rule;
    currency = rule.parameters.currency || currency;
    sourceCitations = rule.sourceIds;
    ruleVersion = rule.formulaVersion;

    if (country === 'SA') {
      // Saudi Arabia SERA Regulated Engine
      const params = rule.parameters;
      const isCommercial = tariffCategory === 'commercial';
      const slabs = isCommercial ? params.slabs.commercial : params.slabs.residential;

      const slab1Limit = slabs[0].max;
      const kwhTier1 = Math.min(kwh, slab1Limit);
      const kwhTier2 = Math.max(0, kwh - slab1Limit);

      const costTier1 = kwhTier1 * slabs[0].rate;
      const costTier2 = kwhTier2 * slabs[1].rate;
      energyCost = costTier1 + costTier2;

      meterServiceFee = meterBreakerAmps <= 60 ? params.meterFees.breakerUpTo60A : params.meterFees.breakerAbove60A;

      breakdownRows.push({
        period: `الشريحة الأولى (1 - ${formatNumber(slab1Limit)} ك.و.س)`,
        values: {
          units: `${formatNumber(kwhTier1)} ك.و.س`,
          rate: `${slabs[0].rate.toFixed(2)} ${currency}`,
          cost: formatCurrency(costTier1, currency),
        },
      });

      steps.push(`الشريحة الأولى: ${formatNumber(kwhTier1)} ك.و.س × ${slabs[0].rate.toFixed(2)} = ${formatCurrency(costTier1, currency)}`);

      if (kwhTier2 > 0) {
        breakdownRows.push({
          period: `الشريحة الثانية (أكثر من ${formatNumber(slab1Limit)} ك.و.س)`,
          values: {
            units: `${formatNumber(kwhTier2)} ك.و.س`,
            rate: `${slabs[1].rate.toFixed(2)} ${currency}`,
            cost: formatCurrency(costTier2, currency),
          },
        });
        steps.push(`الشريحة الثانية: ${formatNumber(kwhTier2)} ك.و.س × ${slabs[1].rate.toFixed(2)} = ${formatCurrency(costTier2, currency)}`);
      }

      const subtotal = energyCost + meterServiceFee;
      vatAmount = subtotal * (params.vatRate / 100);
      totalBill = subtotal + vatAmount;

      steps.push(`مقابل خدمة العداد (${meterBreakerAmps}A): ${formatCurrency(meterServiceFee, currency)}`);
      steps.push(`ضريبة القيمة المضافة (${params.vatRate}%): ${formatCurrency(vatAmount, currency)}`);
      steps.push(`إجمالي الفاتورة النهائي: ${formatCurrency(totalBill, currency)}`);

      assumptionsList = [
        'تطبق تعرفة هيئة تنظيم المياه والكهرباء (SERA) في المملكة العربية السعودية على دورة فوترة شهرية منتظمة (30 يوماً).',
        'تضاف ضريبة القيمة المضافة (15%) على إجمالي استهلاك الطاقة ومقابل خدمة العداد.',
      ];
    } else if (country === 'AE') {
      // UAE Regulated Engine (DEWA Dubai or ADDC Abu Dhabi)
      const params = rule.parameters;
      const slabs = params.slabs;

      let remainingKwh = kwh;
      slabs.forEach((slab: any, idx: number) => {
        if (remainingKwh <= 0) return;
        const slabSpan = slab.max === Infinity ? remainingKwh : Math.min(remainingKwh, slab.max - slab.min + 1);
        const slabCost = slabSpan * slab.rate;
        energyCost += slabCost;
        remainingKwh -= slabSpan;

        breakdownRows.push({
          period: `الشريحة ${idx + 1} (${formatNumber(slab.min)} - ${slab.max === Infinity ? 'فأكثر' : formatNumber(slab.max)} ك.و.س)`,
          values: {
            units: `${formatNumber(slabSpan)} ك.و.س`,
            rate: `${slab.rate.toFixed(3)} ${currency}`,
            cost: formatCurrency(slabCost, currency),
          },
        });
        steps.push(`الشريحة ${idx + 1}: ${formatNumber(slabSpan)} ك.و.س × ${slab.rate.toFixed(3)} = ${formatCurrency(slabCost, currency)}`);
      });

      if (params.fuelSurchargePerKwh > 0) {
        fuelSurchargeTotal = kwh * params.fuelSurchargePerKwh;
        steps.push(`رسم الوقود الإضافي (Fuel Surcharge): ${formatNumber(kwh)} ك.و.س × ${params.fuelSurchargePerKwh} = ${formatCurrency(fuelSurchargeTotal, currency)}`);
      }

      const subtotal = energyCost + fuelSurchargeTotal;
      vatAmount = subtotal * (params.vatRate / 100);
      totalBill = subtotal + vatAmount;

      steps.push(`ضريبة القيمة المضافة (${params.vatRate}%): ${formatCurrency(vatAmount, currency)}`);
      steps.push(`إجمالي الفاتورة النهائي: ${formatCurrency(totalBill, currency)}`);

      assumptionsList = [
        `تطبق تعرفة ${rule.provider} المعتمدة في دولة الإمارات العربية المتحدة.`,
        'الفاتورة لا تشمل رسوم البلدية الإيجارية المضافة على عقود إيجار إمارة دبي (5%).',
      ];
    } else if (country === 'EG') {
      // Egypt Regulated Engine (EgyptERA 7-tier residential system)
      const params = rule.parameters;
      const slabs = params.slabs;

      if (kwh > 1000) {
        // Non-subsidized full recalculation at flat rate tier 7
        const flatRate = params.nonsubsidizedRateOver1000;
        energyCost = kwh * flatRate;
        meterServiceFee = slabs[6].serviceFee;

        breakdownRows.push({
          period: 'استهلاك غير مدعوم (أكثر من 1000 ك.و.س)',
          values: {
            units: `${formatNumber(kwh)} ك.و.س`,
            rate: `${flatRate} ${currency}`,
            cost: formatCurrency(energyCost, currency),
          },
        });
        steps.push(`الاستهلاك تجاوز 1000 ك.و.س، فتم احتساب كامل الاستهلاك بدون دعم: ${formatNumber(kwh)} × ${flatRate} = ${formatCurrency(energyCost, currency)}`);
      } else {
        // Progressive tiers
        let remainingKwh = kwh;
        for (let i = 0; i < slabs.length && remainingKwh > 0; i++) {
          const slab = slabs[i];
          if (kwh <= 100 && i >= 2) break;
          const slabCapacity = slab.max - slab.min + 1;
          const slabUnits = Math.min(remainingKwh, slabCapacity);
          const slabCost = slabUnits * slab.rate;
          energyCost += slabCost;
          remainingKwh -= slabUnits;

          breakdownRows.push({
            period: `الشريحة ${i + 1} (${slab.min} - ${slab.max} ك.و.س)`,
            values: {
              units: `${formatNumber(slabUnits)} ك.و.س`,
              rate: `${slab.rate} ${currency}`,
              cost: formatCurrency(slabCost, currency),
            },
          });
          meterServiceFee = slab.serviceFee;
        }
        steps.push(`حساب مجموع استهلاك الشرائح المنزلية: ${formatCurrency(energyCost, currency)}`);
      }

      totalBill = energyCost + meterServiceFee;
      steps.push(`مقابل خدمة العملاء والدمغات: ${formatCurrency(meterServiceFee, currency)}`);
      steps.push(`إجمالي الفاتورة: ${formatCurrency(totalBill, currency)}`);

      assumptionsList = [
        'تطبق تعرفة جهاز تنظيم مرفق الكهرباء وحماية المستهلك (EgyptERA) لعام 2024/2026 في جمهورية مصر العربية.',
        'الاستهلاك الذي يتجاوز 1000 ك.و.س شهرياً يُحسب بالكامل بسعر 2.23 ج.م بدون دعم تبادلي.',
      ];
    }
  } else {
    // If country is not regulated, explain transparently and provide clean user-configurable math
    const unitRate = Number(inputs.customKwhRate || 0.25);
    energyCost = kwh * unitRate;
    meterServiceFee = 10;
    vatAmount = energyCost * 0.05;
    totalBill = energyCost + meterServiceFee + vatAmount;

    breakdownRows.push({
      period: 'حساب تقديري عام بالتعرفة المدخلة يدوياً',
      values: {
        units: `${formatNumber(kwh)} ك.و.س`,
        rate: `${unitRate} ${currency}`,
        cost: formatCurrency(energyCost, currency),
      },
    });

    steps.push(`حساب الاستهلاك وفق السعر التقديري: ${formatNumber(kwh)} ك.و.س × ${unitRate} = ${formatCurrency(energyCost, currency)}`);
    assumptionsList = [
      resolution.unavailableReason || 'حساب استرشادي غير خاضع للوائح رسمية معتمدة لهذه الدولة.',
      'يمكنك تحديد سعر الكيلوواط يدوياً للحصول على نتيجة دقيقة لتعرفة منطقتك.',
    ];
  }

  return {
    primary: {
      id: 'totalBill',
      label: 'إجمالي فاتورة الكهرباء المستحقة',
      value: totalBill,
      formattedValue: formatCurrency(totalBill, currency),
      unit: currency,
      highlight: true,
      badge: resolution.isAvailable ? `تعرفة رسمية معتمدة (${resolution.rule?.jurisdiction})` : 'تقدير استرشادي',
      isCurrency: true,
    },
    secondary: [
      {
        id: 'energyCost',
        label: 'تكلفة استهلاك الطاقة الكهربائية',
        value: energyCost,
        formattedValue: formatCurrency(energyCost, currency),
        unit: currency,
      },
      {
        id: 'meterServiceFee',
        label: country === 'AE' && fuelSurchargeTotal > 0 ? 'رسم الوقود الإضافي' : 'مقابل خدمة العداد / العملاء',
        value: fuelSurchargeTotal > 0 ? fuelSurchargeTotal : meterServiceFee,
        formattedValue: formatCurrency(fuelSurchargeTotal > 0 ? fuelSurchargeTotal : meterServiceFee, currency),
        unit: currency,
      },
      {
        id: 'vatAmount',
        label: 'ضريبة القيمة المضافة',
        value: vatAmount,
        formattedValue: formatCurrency(vatAmount, currency),
        unit: currency,
      },
    ],
    details: [
      { label: 'كمية الاستهلاك المسجلة', value: `${formatNumber(kwh)} ك.و.س` },
      { label: 'الجهة التنظيمية المسؤولة', value: resolution.rule?.jurisdiction || 'غير محدد' },
      { label: 'إصدار القاعدة والمعايير', value: `v${ruleVersion}` },
    ],
    breakdown: {
      columns: [
        { key: 'units', label: 'الكمية المستهلكة' },
        { key: 'rate', label: 'سعر الوحدة' },
        { key: 'cost', label: 'القيمة المستحقة' },
      ],
      rows: breakdownRows,
    },
    calculationSteps: steps,
    directAnswer: `فاتورة الكهرباء لاستهلاك قدره ${formatNumber(kwh)} ك.و.س في ${country} تبلغ ${formatCurrency(totalBill, currency)} شاملة الرسوم والضرائب المقررة.`,
    assumptions: assumptionsList,
    sources: sourceCitations,
    relevantRuleVersion: ruleVersion,
    country,
    currency,
  };
}
