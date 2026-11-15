import { CalculationResult } from '../../types/calculator';
import { formatNumber } from '../../lib/formatters';

/** Saudi Arabia standard VAT rate, applied after the discount when the option is enabled. */
export const SAUDI_VAT_RATE = 15;

export interface DiscountInputs {
  mode?: 'percent' | 'reverse' | string;
  originalPrice: number | string;
  discountPercent?: number | string;
  secondDiscountPercent?: number | string;
  salePrice?: number | string;
  vat?: 'none' | 'add' | string;
}

const round2 = (n: number) => Math.round(n * 100) / 100;
const money = (n: number) => formatNumber(round2(n), { decimals: 2 });

function errorResult(message: string): CalculationResult {
  return { primary: { label: 'السعر بعد الخصم', value: 0, formattedValue: '-' }, error: message };
}

export function calculateDiscount(inputs: DiscountInputs): CalculationResult {
  const mode = String(inputs.mode || 'percent') === 'reverse' ? 'reverse' : 'percent';
  const price = Number(inputs.originalPrice);
  const addVat = String(inputs.vat) === 'add';

  if (!Number.isFinite(price) || price <= 0) {
    return errorResult('أدخل السعر الأصلي قبل الخصم بقيمة أكبر من صفر.');
  }

  const steps: string[] = [];
  let finalBeforeVat: number;
  let discountPct: number;
  const secondary: NonNullable<CalculationResult['secondary']> = [];

  if (mode === 'reverse') {
    const sale = Number(inputs.salePrice);
    if (!Number.isFinite(sale) || sale < 0) {
      return errorResult('أدخل السعر بعد الخصم كرقم موجب.');
    }
    if (sale > price) {
      return errorResult('السعر بعد الخصم أعلى من السعر الأصلي؛ هذه زيادة في السعر وليست خصماً.');
    }
    finalBeforeVat = sale;
    discountPct = ((price - sale) / price) * 100;
    steps.push(`مبلغ التوفير = ${money(price)} − ${money(sale)} = ${money(price - sale)}`);
    steps.push(`نسبة الخصم = (${money(price - sale)} ÷ ${money(price)}) × 100 = ${round2(discountPct)}%`);
  } else {
    const d1 = Number(inputs.discountPercent) || 0;
    const d2 = Number(inputs.secondDiscountPercent) || 0;
    if (d1 < 0 || d1 > 100 || d2 < 0 || d2 > 100) {
      return errorResult('نسبة الخصم يجب أن تكون بين 0% و 100%.');
    }
    const afterFirst = price * (1 - d1 / 100);
    steps.push(`قيمة الخصم الأول = ${money(price)} × ${d1}% = ${money(price - afterFirst)}`);
    steps.push(`السعر بعد الخصم الأول = ${money(price)} − ${money(price - afterFirst)} = ${money(afterFirst)}`);
    finalBeforeVat = afterFirst;
    if (d2 > 0) {
      finalBeforeVat = afterFirst * (1 - d2 / 100);
      steps.push(`الخصم الإضافي يُحسب على السعر الجديد: ${money(afterFirst)} × ${d2}% = ${money(afterFirst - finalBeforeVat)}`);
      steps.push(`السعر بعد الخصمين = ${money(afterFirst)} − ${money(afterFirst - finalBeforeVat)} = ${money(finalBeforeVat)}`);
      secondary.push({ id: 'afterFirst', label: `السعر بعد الخصم الأول (${d1}%)`, value: round2(afterFirst), formattedValue: money(afterFirst) });
    }
    discountPct = ((price - finalBeforeVat) / price) * 100;
    if (d2 > 0) {
      steps.push(`نسبة الخصم الفعلية الإجمالية = (${money(price - finalBeforeVat)} ÷ ${money(price)}) × 100 = ${round2(discountPct)}% (وليست ${d1 + d2}%)`);
    }
  }

  const saved = price - finalBeforeVat;
  const vatAmount = addVat ? (finalBeforeVat * SAUDI_VAT_RATE) / 100 : 0;
  const finalPrice = finalBeforeVat + vatAmount;
  if (addVat) {
    steps.push(`ضريبة القيمة المضافة ${SAUDI_VAT_RATE}% على السعر بعد الخصم = ${money(finalBeforeVat)} × 15% = ${money(vatAmount)}`);
    steps.push(`السعر النهائي شامل الضريبة = ${money(finalBeforeVat)} + ${money(vatAmount)} = ${money(finalPrice)}`);
  }

  const primary =
    mode === 'reverse'
      ? {
          id: 'discountPercent',
          label: 'نسبة الخصم',
          value: round2(discountPct),
          formattedValue: `${round2(discountPct)}%`,
          badge: `وفّرت ${money(saved)}`,
          highlight: true,
        }
      : {
          id: 'finalPrice',
          label: addVat ? 'السعر النهائي بعد الخصم شامل الضريبة 15%' : 'السعر بعد الخصم',
          value: round2(finalPrice),
          formattedValue: money(finalPrice),
          badge: `خصم ${round2(discountPct)}%`,
          highlight: true,
        };

  secondary.push({ id: 'saved', label: 'مبلغ التوفير (قيمة الخصم)', value: round2(saved), formattedValue: money(saved) });
  secondary.push({ id: 'effectivePercent', label: 'نسبة الخصم الفعلية', value: round2(discountPct), formattedValue: `${round2(discountPct)}%` });
  secondary.push({ id: 'priceAfterDiscount', label: 'السعر بعد الخصم قبل الضريبة', value: round2(finalBeforeVat), formattedValue: money(finalBeforeVat) });
  if (addVat) {
    secondary.push({ id: 'vat', label: 'ضريبة القيمة المضافة 15%', value: round2(vatAmount), formattedValue: money(vatAmount) });
    secondary.push({ id: 'finalWithVat', label: 'المبلغ المدفوع شامل الضريبة', value: round2(finalPrice), formattedValue: money(finalPrice) });
  }

  return {
    primary,
    directAnswer:
      mode === 'reverse'
        ? `الخصم ${round2(discountPct)}%: السعر نزل من ${money(price)} إلى ${money(finalBeforeVat)} ووفّرت ${money(saved)}.`
        : `تدفع ${money(finalPrice)}${addVat ? ' شامل الضريبة' : ''} بدلاً من ${money(price)}، أي توفير ${money(saved)} (${round2(discountPct)}%).`,
    secondary,
    details: [
      { label: 'السعر الأصلي', value: money(price) },
      { label: 'طريقة الحساب', value: mode === 'reverse' ? 'استخراج نسبة الخصم من السعرين' : 'تطبيق نسبة الخصم على السعر' },
    ],
    calculationSteps: steps,
  };
}
