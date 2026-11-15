import { CalculationResult } from '../../types/calculator';
import {
  GOLD_KARATS,
  GOLD_REFERENCE,
  GRAMS_PER_TROY_OUNCE,
  GRAMS_PER_TOLA,
  GOLD_UNIT_AR,
  GOLD_UNIT_GRAMS,
  GoldWeightUnit,
  goldCurrencyFor,
  karatPurity,
  referencePricePerGram24,
} from '../../data/gold-prices';

export type GoldMode = 'buy' | 'sell';

export interface GoldInputs {
  mode?: GoldMode | string;
  weightGrams: number | string;
  weightUnit?: GoldWeightUnit | string;
  karat?: number | string;
  goldPrice24?: number | string;
  makingChargePerGram?: number | string;
  vatPercent?: number | string;
  sellDiscountPercent?: number | string;
}

export interface GoldContext {
  countryCode?: string;
}

/**
 * VAT applied when the field is left blank: Saudi Arabia 15% and the UAE 5% on jewellery;
 * investment gold (24K bars/coins, 99%+) is zero-rated in both. Elsewhere 0% unless entered.
 */
export function defaultGoldVat(countryCode: string | undefined, karat: number): number {
  if (karat === 24) return 0;
  const cc = String(countryCode || 'sa').toLowerCase();
  if (cc === 'sa') return 15;
  if (cc === 'ae') return 5;
  return 0;
}

const KARAT_AR: Record<number, string> = { 24: 'عيار 24', 22: 'عيار 22', 21: 'عيار 21', 18: 'عيار 18', 14: 'عيار 14' };

export function calculateGold(inputs: GoldInputs, ctx?: GoldContext): CalculationResult {
  const currency = goldCurrencyFor(ctx?.countryCode);
  const sym = currency.symbolAr;
  const money = (n: number, decimals = currency.decimals) =>
    `${n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })} ${sym}`;
  const round = (n: number) => Math.round(n * 10 ** currency.decimals) / 10 ** currency.decimals;

  const mode: GoldMode = inputs.mode === 'sell' ? 'sell' : 'buy';
  const unit: GoldWeightUnit = inputs.weightUnit === 'tola' || inputs.weightUnit === 'ounce' ? inputs.weightUnit : 'gram';
  const wInput = Number(inputs.weightGrams);
  const w = wInput * GOLD_UNIT_GRAMS[unit]; // grams, exact for the maths
  const wShow = Math.round(w * 1000) / 1000;
  const wText = unit === 'gram' ? `${wShow} غرام` : `${wInput} ${GOLD_UNIT_AR[unit]} (${wShow} غرام)`;
  const karat = Number(inputs.karat ?? 21);
  const typedPrice = Number(inputs.goldPrice24) || 0;
  const making = Math.max(0, Number(inputs.makingChargePerGram) || 0);
  const vatTyped = inputs.vatPercent !== undefined && inputs.vatPercent !== null && String(inputs.vatPercent).trim() !== '';
  const vatPct = vatTyped ? Math.max(0, Number(inputs.vatPercent) || 0) : defaultGoldVat(ctx?.countryCode, karat);
  const discountPct = Math.max(0, Number(inputs.sellDiscountPercent) || 0);

  const fail = (error: string): CalculationResult => ({
    primary: { id: 'total', label: 'قيمة الذهب', value: 0, formattedValue: '-' },
    error,
  });
  if (!Number.isFinite(wInput) || wInput <= 0 || w > 1000000) return fail('أدخل وزن الذهب (أكبر من صفر).');
  if (!(GOLD_KARATS as readonly number[]).includes(karat)) return fail('اختر عيار الذهب: 24 أو 22 أو 21 أو 18 أو 14.');
  if (typedPrice < 0) return fail('سعر الغرام لا يمكن أن يكون سالباً.');
  if (vatPct > 100 || discountPct > 100) return fail('النسبة يجب أن تكون بين 0 و 100%.');

  const usingReference = typedPrice <= 0;
  const p24 = usingReference ? referencePricePerGram24(ctx?.countryCode) : typedPrice;
  const purity = karatPurity(karat);
  const perGram = p24 * purity;
  const goldValue = w * perGram;
  const pureGrams = w * purity;

  const warnings: string[] = [];
  if (usingReference) {
    warnings.push(
      `لم يُدخل سعر غرام عيار 24، فاستخدمنا السعر المرجعي بتاريخ ${GOLD_REFERENCE.asOf} (${money(p24)}). أدخل سعر اليوم من محل الذهب للحصول على نتيجة دقيقة.`
    );
  }
  if (currency.parallelMarket) {
    warnings.push(`السعر محوَّل بسعر الصرف الرسمي لـ${currency.nameAr}، وقد يختلف سعر الذهب في السوق المحلية بسبب فرق سعر الصرف الموازي.`);
  }

  const karatRows = GOLD_KARATS.map((k) => ({
    period: KARAT_AR[k],
    values: {
      purity: `${((k / 24) * 1000).toFixed(0)}/1000`,
      perGram: money(p24 * karatPurity(k)),
      perTola: money(p24 * karatPurity(k) * GRAMS_PER_TOLA),
      perOunce: money(p24 * karatPurity(k) * GRAMS_PER_TROY_OUNCE),
      value: money(w * p24 * karatPurity(k)),
    },
  }));
  const breakdown: CalculationResult['breakdown'] = {
    title: `سعر ${wText} ذهب بكل عيار`,
    periodLabel: 'العيار',
    columns: [
      { key: 'purity', label: 'النقاوة' },
      { key: 'perGram', label: 'سعر الغرام' },
      { key: 'perTola', label: 'سعر التولة' },
      { key: 'perOunce', label: 'سعر الأونصة' },
      { key: 'value', label: `قيمة ${wText}` },
    ],
    rows: karatRows,
  };

  const commonSecondary = [
    { id: 'perGram', label: `سعر غرام ${KARAT_AR[karat]}`, value: round(perGram), formattedValue: money(perGram) },
    { id: 'price24', label: 'سعر غرام عيار 24 المستخدم', value: round(p24), formattedValue: money(p24), helpText: usingReference ? `سعر مرجعي بتاريخ ${GOLD_REFERENCE.asOf}` : undefined },
    { id: 'pureGrams', label: 'وزن الذهب الخالص في القطعة', value: Math.round(pureGrams * 1000) / 1000, unit: 'غرام' },
    {
      id: 'weightUnits',
      label: 'الوزن بالوحدات الثلاث',
      value: `${w.toLocaleString('en-US', { maximumFractionDigits: 3 })} غرام = ${(w / GRAMS_PER_TOLA).toLocaleString('en-US', { maximumFractionDigits: 3 })} تولة = ${(w / GRAMS_PER_TROY_OUNCE).toLocaleString('en-US', { maximumFractionDigits: 4 })} أونصة`,
    },
  ];

  if (mode === 'sell') {
    const sellValue = goldValue * (1 - discountPct / 100);
    return {
      primary: {
        id: 'total',
        label: `قيمة بيع ${wText} ${KARAT_AR[karat]}`,
        value: round(sellValue),
        formattedValue: money(sellValue),
        badge: discountPct ? `بعد خصم ${discountPct}%` : `${money(perGram)} للغرام`,
        highlight: true,
      },
      directAnswer: `قيمة ${wText} ذهب ${KARAT_AR[karat]} عند البيع نحو ${money(sellValue)}، على أساس ${money(perGram)} للغرام${discountPct ? ` بعد خصم المحل ${discountPct}%` : ''}.`,
      secondary: [
        ...commonSecondary,
        { id: 'goldValue', label: 'القيمة قبل خصم المحل', value: round(goldValue), formattedValue: money(goldValue) },
        ...(discountPct ? [{ id: 'discount', label: `خصم المحل (${discountPct}%)`, value: round(goldValue - sellValue), formattedValue: money(goldValue - sellValue) }] : []),
      ],
      breakdown,
      calculationSteps: [
        `سعر غرام ${KARAT_AR[karat]} = ${money(p24)} × ${karat} ÷ 24 = ${money(perGram)}`,
        `القيمة = ${wText} × ${money(perGram)} = ${money(goldValue)}`,
        ...(discountPct ? [`بعد خصم ${discountPct}% = ${money(goldValue)} × ${(1 - discountPct / 100).toFixed(3)} = ${money(sellValue)}`] : []),
      ],
      warnings: warnings.length ? warnings : undefined,
      assumptions: [
        'لا تُحسب المصنعية عند بيع الذهب المستعمل؛ تشتريه المحلات بوزنه وعياره فقط، وغالباً بسعر أقل قليلاً من سعر السوق.',
      ],
    };
  }

  const makingTotal = w * making;
  const subtotal = goldValue + makingTotal;
  const vat = subtotal * (vatPct / 100);
  const total = subtotal + vat;
  const included = [making ? 'المصنعية' : '', vatPct ? 'الضريبة' : ''].filter(Boolean);
  if (karat === 24 && vatPct > 0 && ['sa', 'ae'].includes(String(ctx?.countryCode || 'sa').toLowerCase())) {
    warnings.push('سبائك وجنيهات الذهب الاستثمارية عيار 24 (نقاوة 99% فأكثر) معفاة من ضريبة القيمة المضافة في السعودية والإمارات؛ اجعل الضريبة 0% إذا كانت مشترياتك سبائك.');
  }

  return {
    primary: {
      id: 'total',
      label: `سعر ${wText} ${KARAT_AR[karat]}${included.length ? ` شاملاً ${included.join(' و')}` : ''}`,
      value: round(total),
      formattedValue: money(total),
      badge: `${money(total / w)} للغرام`,
      highlight: true,
    },
    directAnswer: `سعر ${wText} ذهب ${KARAT_AR[karat]} = ${money(goldValue)} قيمة الذهب${making ? ` + ${money(makingTotal)} مصنعية` : ''}${vatPct ? ` + ${money(vat)} ضريبة ${vatPct}%` : ''} = ${money(total)}.`,
    secondary: [
      ...commonSecondary,
      { id: 'goldValue', label: 'قيمة الذهب (الوزن × سعر الغرام)', value: round(goldValue), formattedValue: money(goldValue) },
      { id: 'making', label: `المصنعية (${money(making)} للغرام × ${wShow} غرام)`, value: round(makingTotal), formattedValue: money(makingTotal) },
      { id: 'vat', label: `ضريبة القيمة المضافة (${vatPct}%)`, value: round(vat), formattedValue: money(vat) },
    ],
    breakdown,
    calculationSteps: [
      `سعر غرام ${KARAT_AR[karat]} = ${money(p24)} × ${karat} ÷ 24 = ${money(perGram)}`,
      `قيمة الذهب = ${wShow} × ${money(perGram)} = ${money(goldValue)}`,
      ...(making ? [`المصنعية = ${wShow} × ${money(making)} = ${money(makingTotal)}`] : []),
      ...(vatPct ? [`الضريبة = ${money(subtotal)} × ${vatPct}% = ${money(vat)}`] : []),
      `الإجمالي = ${money(total)}`,
    ],
    details: [
      { label: 'وزن الأونصة (الأوقية) الذهبية', value: `${GRAMS_PER_TROY_OUNCE} غرام` },
      { label: 'وزن التولة', value: `${GRAMS_PER_TOLA} غرام` },
      { label: 'العملة', value: `${currency.nameAr} (${currency.code})` },
    ],
    warnings: warnings.length ? warnings : undefined,
    assumptions: [
      'سعر الغرام لكل عيار = سعر عيار 24 × العيار ÷ 24، وقد تضيف المحلات هامشاً بسيطاً فوق سعر السوق.',
      'المصنعية تختلف حسب المحل ونوع القطعة، والسعر النهائي يحدده محل الذهب.',
    ],
  };
}
