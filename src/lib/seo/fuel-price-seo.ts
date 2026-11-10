import { getCountryData } from '@/data/countries';

/**
 * Search-intent copy for country fuel-cost pages.
 *
 * People search for the price ("سعر لتر البنزين في البحرين", "اسعار المحروقات
 * في الكويت"), not for a calculator, so titles, H1 and the answer box lead with
 * the current official price and the month it was checked. Built from the
 * country's verified fuel data so it never drifts from the price table.
 */

export const COUNTRY_SHORT_NAMES_AR: Record<string, string> = {
  sa: 'السعودية',
  ae: 'الإمارات',
  kw: 'الكويت',
  qa: 'قطر',
  bh: 'البحرين',
  om: 'سلطنة عمان',
  eg: 'مصر',
  jo: 'الأردن',
  lb: 'لبنان',
  sy: 'سوريا',
  iq: 'العراق',
  ye: 'اليمن',
  ps: 'فلسطين',
  sd: 'السودان',
  ma: 'المغرب',
  dz: 'الجزائر',
  tn: 'تونس',
  ly: 'ليبيا',
  mr: 'موريتانيا',
  so: 'الصومال',
  dj: 'جيبوتي',
  km: 'جزر القمر',
};

const AR_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

// Currencies with 1,000 fils to the unit, where prices are quoted in fils at the pump.
const FILS_COUNTRIES = new Set(['bh', 'kw', 'om']);

// Fixed official pegs to the US dollar, so the Saudi riyal equivalent is exact.
// SAR 3.75/USD; BHD 0.376/USD; OMR 0.3845/USD; QAR 3.64/USD; AED 3.6725/USD.
const SAR_PER_UNIT: Record<string, number> = {
  bh: 3.75 / 0.376,
  om: 3.75 / 0.3845,
  qa: 3.75 / 3.64,
  ae: 3.75 / 3.6725,
};

const FUEL_SLUGS = new Set(['fuel-cost', 'car-fuel-cost']);

export interface FuelPriceSeo {
  title: string;
  description: string;
  h1: string;
  answerFirst: string;
  monthYear: string;
  sarFaq?: { question: string; answer: string };
}

function monthYearAr(isoDate?: string): string | null {
  if (!isoDate) return null;
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return null;
  return `${AR_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function formatPrice(price: number, countryCode: string, symbol: string): string {
  if (FILS_COUNTRIES.has(countryCode) && price < 1) {
    const fils = Math.round(price * 1000);
    return `${fils} فلس (${price.toFixed(3)} ${symbol})`;
  }
  const text = Number.isInteger(price) ? price.toLocaleString('en-US') : String(price);
  return `${text} ${symbol}`;
}

export function getFuelPriceSeo(calcSlug: string, countryCode: string): FuelPriceSeo | null {
  if (!FUEL_SLUGS.has(calcSlug)) return null;
  const code = countryCode.toLowerCase();
  const data = getCountryData(code);
  const fuel = data?.fuel;
  if (!data || !fuel || fuel.status !== 'verified' || !fuel.value) return null;

  const grades = Object.values(fuel.value.grades || {});
  if (grades.length === 0) return null;

  const name = COUNTRY_SHORT_NAMES_AR[code] || data.basics.nameAr;
  const symbol = data.basics.currency.symbolAr;
  const monthYear = monthYearAr(fuel.checkedAt) || '';
  const monthSuffix = monthYear ? ` ${monthYear}` : '';

  const priceList = grades
    .map((g) => `${g.nameAr}: ${formatPrice(g.pricePerLiter, code, symbol)}`)
    .join('، ');

  const sarRate = SAR_PER_UNIT[code];
  const sarList = sarRate
    ? grades
        .map((g) => `${g.nameAr} ≈ ${(g.pricePerLiter * sarRate).toFixed(2)} ريال سعودي`)
        .join('، ')
    : '';

  const title = `سعر البنزين في ${name} اليوم${monthSuffix} للتر`;
  const description =
    `أسعار البنزين والمحروقات الرسمية في ${name}${monthSuffix} للتر: ${priceList}. ` +
    `احسب تكلفة مشوارك وكم لتر تحتاج سيارتك.`;
  const h1 = `سعر البنزين في ${name} اليوم${monthSuffix} وحاسبة تكلفة الوقود`;
  const answerFirst =
    `سعر لتر البنزين في ${name} حسب التسعيرة الرسمية${monthSuffix ? ` (محدث ${monthYear})` : ''}: ${priceList}.` +
    (sarList ? ` وبالريال السعودي: ${sarList}.` : '');

  const sarFaq = sarRate
    ? {
        question: `كم سعر البنزين في ${name} بالريال السعودي؟`,
        answer: `بسعر الصرف الثابت (1 ${data.basics.currency.nameAr} ≈ ${sarRate.toFixed(4)} ريال سعودي، لأن العملتين مربوطتان بالدولار): ${sarList}.`,
      }
    : undefined;

  return { title, description, h1, answerFirst, monthYear, sarFaq };
}
