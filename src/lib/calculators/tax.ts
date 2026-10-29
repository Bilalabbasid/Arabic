import { CalculationResult } from '@/types/calculator';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatters';

export const COUNTRY_VAT_RATES: Record<string, { rate: number; nameAr: string; currency: string }> = {
  SA: { rate: 15, nameAr: 'ضريبة القيمة المضافة السعودية (15%)', currency: 'SAR' },
  AE: { rate: 5, nameAr: 'ضريبة القيمة المضافة الإماراتية (5%)', currency: 'AED' },
  BH: { rate: 10, nameAr: 'ضريبة القيمة المضافة البحرينية (10%)', currency: 'BHD' },
  OM: { rate: 5, nameAr: 'ضريبة القيمة المضافة العُمانية (5%)', currency: 'OMR' },
  EG: { rate: 14, nameAr: 'ضريبة القيمة المضافة المصرية (14%)', currency: 'EGP' },
  JO: { rate: 16, nameAr: 'ضريبة المبيعات العامة الأردنية (16%)', currency: 'JOD' },
  MA: { rate: 20, nameAr: 'الضريبة على القيمة المضافة المغربية (20%)', currency: 'MAD' },
  DZ: { rate: 19, nameAr: 'الرسم على القيمة المضافة الجزائري (19%)', currency: 'DZD' },
  TN: { rate: 19, nameAr: 'الأداء على القيمة المضافة التونسي (19%)', currency: 'TND' },
  LB: { rate: 11, nameAr: 'ضريبة القيمة المضافة اللبنانية (11%)', currency: 'LBP' },
  KW: { rate: 0, nameAr: 'الكويت (لا تطبق ضريبة قيمة مضافة حالياً)', currency: 'KWD' },
  QA: { rate: 0, nameAr: 'قطر (لا تطبق ضريبة قيمة مضافة حالياً)', currency: 'QAR' },
};

/**
 * Calculates VAT addition or extraction
 */
export function calculateVat(
  inputs: Record<string, any>,
  context?: { countryCode?: string; currencyCode?: string }
): CalculationResult {
  const amount = Number(inputs.amount);
  const calculationType = String(inputs.calculationType || 'add'); // 'add' (exclusive) or 'extract' (inclusive)
  const country = (context?.countryCode || String(inputs.country || 'SA')).toUpperCase();
  const currency = context?.currencyCode || inputs.currency || COUNTRY_VAT_RATES[country]?.currency || 'SAR';

  // Resolve rate
  let vatRate = Number(inputs.customRate);
  if (isNaN(vatRate) || vatRate < 0 || vatRate > 100) {
    vatRate = COUNTRY_VAT_RATES[country]?.rate ?? 15;
  }

  if (isNaN(amount) || amount <= 0) {
    return {
      primary: { label: 'مبلغ الضريبة', value: 0, formattedValue: '-' },
      error: 'يرجى إدخال مبلغ صحيح أكبر من الصفر.',
    };
  }

  let netAmount = 0;
  let taxAmount = 0;
  let grossAmount = 0;

  if (calculationType === 'add') {
    // Amount is Net (غير شامل) -> add tax
    netAmount = amount;
    taxAmount = (netAmount * vatRate) / 100;
    grossAmount = netAmount + taxAmount;
  } else {
    // Amount is Gross (شامل) -> extract tax and net
    grossAmount = amount;
    netAmount = grossAmount / (1 + vatRate / 100);
    taxAmount = grossAmount - netAmount;
  }

  return {
    primary: {
      id: 'taxAmount',
      label: 'قيمة الضريبة المستحقة',
      value: taxAmount,
      formattedValue: formatCurrency(taxAmount, currency),
      unit: currency,
      highlight: true,
      isCurrency: true,
    },
    secondary: [
      {
        id: 'grossAmount',
        label: 'المبلغ الإجمالي (شامل الضريبة)',
        value: grossAmount,
        formattedValue: formatCurrency(grossAmount, currency),
        unit: currency,
        highlight: calculationType === 'add',
      },
      {
        id: 'netAmount',
        label: 'المبلغ الأساسي (قبل الضريبة)',
        value: netAmount,
        formattedValue: formatCurrency(netAmount, currency),
        unit: currency,
        highlight: calculationType === 'extract',
      },
      {
        id: 'vatRate',
        label: 'نسبة الضريبة المطبقة',
        value: vatRate,
        formattedValue: formatPercent(vatRate),
        unit: '%',
      },
    ],
    details: [
      { label: 'نوع العملية الحسابية', value: calculationType === 'add' ? 'إضافة الضريبة على المبلغ الصافي' : 'استخراج الضريبة من المبلغ الإجمالي' },
      { label: 'الدولة والنسبة الرسمية', value: COUNTRY_VAT_RATES[country]?.nameAr || `نسبة مخصصة (%${vatRate})` },
    ],
    calculationSteps: [
      calculationType === 'add'
        ? `حساب قيمة الضريبة: ${formatCurrency(netAmount, currency)} × (${vatRate} ÷ 100) = ${formatCurrency(taxAmount, currency)}`
        : `استخراج المبلغ قبل الضريبة: ${formatCurrency(grossAmount, currency)} ÷ (1 + ${vatRate / 100}) = ${formatCurrency(netAmount, currency)}`,
      calculationType === 'add'
        ? `حساب الإجمالي النهائي: ${formatCurrency(netAmount, currency)} + ${formatCurrency(taxAmount, currency)} = ${formatCurrency(grossAmount, currency)}`
        : `قيمة الضريبة المستخرجة: ${formatCurrency(grossAmount, currency)} - ${formatCurrency(netAmount, currency)} = ${formatCurrency(taxAmount, currency)}`,
    ],
    directAnswer: calculationType === 'add'
      ? `عند إضافة ضريبة بنسبة ${formatPercent(vatRate)} على مبلغ ${formatCurrency(netAmount, currency)}، تصبح الضريبة ${formatCurrency(taxAmount, currency)} والإجمالي ${formatCurrency(grossAmount, currency)}.`
      : `المبلغ ${formatCurrency(grossAmount, currency)} يشمل ضريبة قدرها ${formatCurrency(taxAmount, currency)}، ومبلغه الأساسي قبل الضريبة هو ${formatCurrency(netAmount, currency)}.`,
    assumptions: [
      'تخضع السلع والخدمات المعفاة أو الخاضعة لنسبة الصفر (Zero-rated) لضوابط الهيئة الضريبية المعتمدة في دولتك.',
    ],
    currency,
    country,
  };
}

/**
 * Calculates Zakat on wealth and business assets
 */
export function calculateZakatWealth(
  inputs: Record<string, any>,
  context?: { currencyCode?: string }
): CalculationResult {
  const cash = Number(inputs.cash || 0);
  const tradeGoods = Number(inputs.tradeGoods || 0);
  const receivables = Number(inputs.receivables || 0);
  const debtsToDeduct = Number(inputs.debtsToDeduct || 0);
  const calendarType = String(inputs.calendarType || 'hijri'); // 'hijri' (2.5%) or 'gregorian' (2.577%)
  const goldGramPrice = Number(inputs.goldGramPrice || 280); // Default estimate per gram 24k
  const currency = context?.currencyCode || inputs.currency || 'SAR';

  const totalAssets = cash + tradeGoods + receivables;
  const netZakatableWealth = Math.max(0, totalAssets - debtsToDeduct);
  const nisabGold85g = goldGramPrice * 85;
  const rate = calendarType === 'hijri' ? 0.025 : 0.02577;
  const ratePercentDisplay = calendarType === 'hijri' ? '2.5%' : '2.577%';

  const isEligible = netZakatableWealth >= nisabGold85g;
  const zakatAmount = isEligible ? netZakatableWealth * rate : 0;

  return {
    primary: {
      id: 'zakatAmount',
      label: 'مقدار الزكاة الواجبة شرعاً',
      value: zakatAmount,
      formattedValue: formatCurrency(zakatAmount, currency),
      unit: currency,
      highlight: true,
      badge: isEligible ? 'بلغ النصاب وحال عليه الحول' : 'لم يبلغ النصاب الشرعي',
      isCurrency: true,
    },
    secondary: [
      {
        id: 'netZakatableWealth',
        label: 'صافي الوعاء الزكوي الخاضع للزكاة',
        value: netZakatableWealth,
        formattedValue: formatCurrency(netZakatableWealth, currency),
        unit: currency,
      },
      {
        id: 'nisabValue',
        label: 'قيمة النصاب الشرعي (85 غرام ذهب عيار 24)',
        value: nisabGold85g,
        formattedValue: formatCurrency(nisabGold85g, currency),
        unit: currency,
      },
      {
        id: 'appliedRate',
        label: 'النسبة الشرعية المطبقة',
        value: ratePercentDisplay,
        formattedValue: `${ratePercentDisplay} (${calendarType === 'hijri' ? 'سنة هجرية' : 'سنة ميلادية'})`,
      },
    ],
    details: [
      { label: 'النقد والأرصدة البنكية', value: formatCurrency(cash, currency) },
      { label: 'عروض التجارة المعدة للبيع', value: formatCurrency(tradeGoods, currency) },
      { label: 'الديون المرجوة التحصيل', value: formatCurrency(receivables, currency) },
      { label: 'الديون والالتزامات المخصومة', value: formatCurrency(debtsToDeduct, currency) },
    ],
    calculationSteps: [
      `إجمالي الأصول الزكوية: ${formatCurrency(cash, currency)} + ${formatCurrency(tradeGoods, currency)} + ${formatCurrency(receivables, currency)} = ${formatCurrency(totalAssets, currency)}`,
      `صافي الوعاء بعد خصم الديون العاجلة: ${formatCurrency(totalAssets, currency)} - ${formatCurrency(debtsToDeduct, currency)} = ${formatCurrency(netZakatableWealth, currency)}`,
      `التحقق من بلوغ النصاب (85 غرام × ${formatCurrency(goldGramPrice, currency)}): ${formatCurrency(nisabGold85g, currency)} (النتيجة: ${isEligible ? 'المال بلغ النصاب' : 'المال لم يبلغ النصاب، ولا زكاة فيه'})`,
      isEligible ? `حساب الزكاة: ${formatCurrency(netZakatableWealth, currency)} × ${ratePercentDisplay} = ${formatCurrency(zakatAmount, currency)}` : 'لا تجب الزكاة لأن الوعاء الزكوي أقل من قيمة النصاب الشرعي.',
    ],
    directAnswer: isEligible
      ? `مقدار الزكاة الواجب إخراجها هو ${formatCurrency(zakatAmount, currency)} على صافي ثروة بلغ ${formatCurrency(netZakatableWealth, currency)}.`
      : `لا تجب الزكاة لعدم بلوغ النصاب الشرعي (${formatCurrency(nisabGold85g, currency)}).`,
    assumptions: [
      'يشترط لوجوب الزكاة مضي حول كامل (عام هجري أو ميلادي) على امتلاك النصاب.',
      'عروض القنية (مثل المنزل الشخصي والسيارة الخاصة والأثاث المكتبي غير المعد للبيع) لا زكاة فيها بالإجماع.',
    ],
    currency,
  };
}
