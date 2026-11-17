import { ALL_COUNTRY_LEGAL_RULES } from '@/data/rules';
import { COUNTRY_SHORT_NAMES_AR } from '@/lib/seo/fuel-price-seo';

/**
 * Country-specific VAT facts for /{cc}/vat-calculator and the all-country rate table on
 * /calculators/vat-calculator. Built from the verified tax rules, so each country page shows its
 * own rate, law, start date and worked amounts in its own currency.
 */

export const VAT_EXAMPLE_AMOUNTS = [100, 500, 1000, 5000, 10000];

export interface VatInsights {
  code: string;
  name: string;
  taxName: string;
  rate: number;
  symbol: string;
  law?: string;
  authority?: string;
  validFrom?: string;
  exemptions: string[];
  forward: Array<{ net: number; vat: number; gross: number }>;
  reverse: Array<{ gross: number; net: number; vat: number }>;
}

const r2 = (n: number) => Math.round(n * 100) / 100;

export function getVatInsights(countryCode: string): VatInsights | null {
  const code = countryCode.toUpperCase();
  const rule = ALL_COUNTRY_LEGAL_RULES[code];
  if (!rule || !rule.hasVat || !rule.vatStandardRate) return null;
  const rate = rule.vatStandardRate.value;
  const k = rate / 100;
  return {
    code,
    name: COUNTRY_SHORT_NAMES_AR[code.toLowerCase()] || rule.countryNameAr,
    // Jordan levies a general sales tax rather than a VAT.
    taxName: code === 'JO' ? 'ضريبة المبيعات العامة' : 'ضريبة القيمة المضافة',
    rate,
    symbol: rule.currencySymbolAr,
    law: rule.vatStandardRate.law,
    authority: rule.vatStandardRate.authority,
    validFrom: rule.vatStandardRate.validFrom,
    exemptions: rule.vatExemptions || [],
    forward: VAT_EXAMPLE_AMOUNTS.map((net) => ({ net, vat: r2(net * k), gross: r2(net * (1 + k)) })),
    reverse: VAT_EXAMPLE_AMOUNTS.map((gross) => ({ gross, net: r2(gross / (1 + k)), vat: r2(gross - gross / (1 + k)) })),
  };
}

export function vatFaqs(v: VatInsights): Array<{ question: string; answer: string }> {
  const s = v.symbol;
  const div = (1 + v.rate / 100).toFixed(2);
  const ex = v.reverse[2];
  return [
    {
      question: `كم نسبة ${v.taxName} في ${v.name}؟`,
      answer: `النسبة الأساسية ${v.rate}%${v.validFrom ? ` منذ ${v.validFrom}` : ''}${v.law ? ` بموجب ${v.law}` : ''}${v.authority ? `، وتشرف عليها ${v.authority}` : ''}.`,
    },
    {
      question: `كيف أستخرج أصل المبلغ قبل الضريبة في ${v.name}؟`,
      answer: `اقسم المبلغ الشامل للضريبة على ${div}: فمبلغ 1,000 ${s} شامل الضريبة أصله ${ex.net.toLocaleString('en-US')} ${s} والضريبة فيه ${ex.vat.toLocaleString('en-US')} ${s}. ولحساب الضريبة على مبلغ صافٍ اضربه في ${(v.rate / 100).toFixed(2)}، وللسعر النهائي اضربه في ${div}.`,
    },
  ];
}

/** All countries with their standard rate (0 where no VAT), lowest first, for the generic VAT page. */
export function arabVatRates(): Array<{ code: string; name: string; rate: number; validFrom?: string; hasVat: boolean }> {
  return Object.entries(ALL_COUNTRY_LEGAL_RULES)
    .map(([code, rule]) => ({
      code,
      name: COUNTRY_SHORT_NAMES_AR[code.toLowerCase()] || rule.countryNameAr,
      rate: rule.hasVat && rule.vatStandardRate ? rule.vatStandardRate.value : 0,
      validFrom: rule.hasVat ? rule.vatStandardRate?.validFrom : undefined,
      hasVat: !!rule.hasVat,
    }))
    .sort((a, b) => a.rate - b.rate || a.name.localeCompare(b.name, 'ar'));
}
