import { CalculationResult, CalculationBreakdownRow } from '@/types/calculator';
import { formatCurrency, formatNumber } from '@/lib/formatters';

/**
 * Calculates electricity consumption bill based on official regulatory slabs/tiers
 */
export function calculateElectricityBill(
  inputs: Record<string, any>,
  context?: { countryCode?: string; currencyCode?: string }
): CalculationResult {
  const kwh = Number(inputs.kwh);
  const tariffCategory = String(inputs.tariffCategory || 'residential'); // 'residential' or 'commercial'
  const meterBreakerAmps = Number(inputs.meterBreakerAmps || 60); // Meter capacity
  const country = (context?.countryCode || String(inputs.country || 'SA')).toUpperCase();
  const currency = context?.currencyCode || inputs.currency || 'SAR';

  if (isNaN(kwh) || kwh < 0) {
    return {
      primary: { label: 'قيمة فاتورة الكهرباء', value: 0, formattedValue: '-' },
      error: 'يرجى إدخال كمية استهلاك صحيحة بوحدة كيلوواط/ساعة.',
    };
  }

  let energyCost = 0;
  let meterServiceFee = 0;
  let vatAmount = 0;
  let totalBill = 0;
  const breakdownRows: CalculationBreakdownRow[] = [];
  const steps: string[] = [];

  if (country === 'SA') {
    // Saudi Electricity Regulatory Authority (SERA) Residential Rates:
    // Tier 1: 1 - 6000 kWh @ 0.18 SAR
    // Tier 2: 6001+ kWh @ 0.30 SAR
    // Commercial Rates: 1-6000 @ 0.20 SAR, 6001+ @ 0.30 SAR
    // Meter fee: ~15 SAR for 60A, ~20 SAR for 100A
    const rateTier1 = tariffCategory === 'commercial' ? 0.20 : 0.18;
    const rateTier2 = 0.30;

    const kwhTier1 = Math.min(kwh, 6000);
    const kwhTier2 = Math.max(0, kwh - 6000);

    const costTier1 = kwhTier1 * rateTier1;
    const costTier2 = kwhTier2 * rateTier2;
    energyCost = costTier1 + costTier2;

    meterServiceFee = meterBreakerAmps <= 60 ? 15 : 20;

    breakdownRows.push({
      period: 'الشريحة الأولى (1 - 6000 ك.و.س)',
      values: {
        units: `${formatNumber(kwhTier1)} ك.و.س`,
        rate: `${formatCurrency(rateTier1, currency, { decimals: 2 })} / ك.و.س`,
        cost: formatCurrency(costTier1, currency),
      },
    });

    if (kwhTier2 > 0) {
      breakdownRows.push({
        period: 'الشريحة الثانية (أكثر من 6000 ك.و.س)',
        values: {
          units: `${formatNumber(kwhTier2)} ك.و.س`,
          rate: `${formatCurrency(rateTier2, currency, { decimals: 2 })} / ك.و.س`,
          cost: formatCurrency(costTier2, currency),
        },
      });
    }

    steps.push(`حساب استهلاك الشريحة الأولى: ${formatNumber(kwhTier1)} ك.و.س × ${rateTier1} = ${formatCurrency(costTier1, currency)}`);
    if (kwhTier2 > 0) {
      steps.push(`حساب استهلاك الشريحة الثانية: ${formatNumber(kwhTier2)} ك.و.س × ${rateTier2} = ${formatCurrency(costTier2, currency)}`);
    }

    const subtotal = energyCost + meterServiceFee;
    vatAmount = subtotal * 0.15; // 15% VAT in SA
    totalBill = subtotal + vatAmount;

    steps.push(`خدمة العداد والاشتراك الشهري: ${formatCurrency(meterServiceFee, currency)}`);
    steps.push(`ضريبة القيمة المضافة (15%): ${formatCurrency(vatAmount, currency)}`);
    steps.push(`إجمالي الفاتورة النهائي: ${formatCurrency(totalBill, currency)}`);
  } else {
    // Generic flat / tiered estimate for other countries (e.g. 0.30 / unit + 5% VAT)
    energyCost = kwh * 0.25;
    meterServiceFee = 10;
    const subtotal = energyCost + meterServiceFee;
    vatAmount = subtotal * 0.05;
    totalBill = subtotal + vatAmount;

    breakdownRows.push({
      period: 'الاستهلاك الشهري العام',
      values: {
        units: `${formatNumber(kwh)} ك.و.س`,
        rate: '0.25 للوحدة تقريبياً',
        cost: formatCurrency(energyCost, currency),
      },
    });
  }

  return {
    primary: {
      id: 'totalBill',
      label: 'إجمالي فاتورة الكهرباء المتوقعة',
      value: totalBill,
      formattedValue: formatCurrency(totalBill, currency),
      unit: currency,
      highlight: true,
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
        label: 'مقابل خدمة العداد الشهري',
        value: meterServiceFee,
        formattedValue: formatCurrency(meterServiceFee, currency),
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
      { label: 'كمية الاستهلاك الإجمالية', value: `${formatNumber(kwh)} كيلوواط / ساعة` },
      { label: 'نوع التعرفة المحددة', value: tariffCategory === 'residential' ? 'سكني' : 'تجاري' },
      { label: 'سعة قاطع العداد', value: `${meterBreakerAmps} أمبير` },
    ],
    breakdown: {
      columns: [
        { key: 'units', label: 'الكمية المستهلكة' },
        { key: 'rate', label: 'سعر الوحدة' },
        { key: 'cost', label: 'المبلغ المستحق' },
      ],
      rows: breakdownRows,
    },
    calculationSteps: steps,
    directAnswer: `فاتورة الكهرباء لاستهلاك قدره ${formatNumber(kwh)} ك.و.س تبلغ ${formatCurrency(totalBill, currency)} شاملة خدمة العداد وضريبة القيمة المضافة.`,
    assumptions: [
      'تعتمد الحسابات على دورة فوترة شهرية منتظمة (30 يوماً). في حال كانت دورة الفاتورة أطول أو أقصر، يتم احتساب الشرائح بنظام التناسب اليومي.',
      'تخضع التعرفة لتسعيرة هيئة تنظيم المياه والكهرباء (SERA) في المملكة العربية السعودية.',
    ],
    country,
    currency,
  };
}
