import { getCountryData } from '@/data/countries';
import { resolveFuelGrade } from '@/calculators/fuel-cost/grades';

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

// Currencies with 1,000 subunits (fils, or baisa in Oman), where pump prices are quoted in subunits.
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
  /** False once the stored price is past its re-check date: the title then drops the price and month. */
  fresh: boolean;
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

/** Thousandth-unit wording: fils in Kuwait and Bahrain, baisa in Oman, with the Arabic counted-noun form. */
function subunitText(thousandths: number, countryCode: string): string {
  const lastTwo = thousandths % 100;
  if (countryCode === 'om') return `${thousandths} ${lastTwo >= 3 && lastTwo <= 10 ? 'بيسات' : 'بيسة'}`;
  return `${thousandths} ${lastTwo >= 3 && lastTwo <= 10 ? 'فلوس' : lastTwo >= 11 ? 'فلساً' : 'فلس'}`;
}

function formatPrice(price: number, countryCode: string, symbol: string): string {
  if (FILS_COUNTRIES.has(countryCode) && price < 1) {
    return `${subunitText(Math.round(price * 1000), countryCode)} (${price.toFixed(3)} ${symbol})`;
  }
  const text = Number.isInteger(price) ? price.toLocaleString('en-US') : String(price);
  return `${text} ${symbol}`;
}

/** Stored price still within its re-check window (checkedAt + staleAfterDays, default 35). */
export function isFuelPriceFresh(checkedAt: string | undefined, staleAfterDays = 35, now: Date = new Date()): boolean {
  if (!checkedAt) return false;
  const checked = new Date(checkedAt);
  if (isNaN(checked.getTime())) return false;
  return now.getTime() - checked.getTime() <= staleAfterDays * 86_400_000;
}

/** Short price for a title: "235 فلس" in fils countries, otherwise "2.18 ريال". */
function titlePrice(price: number, countryCode: string, currencyNameAr: string): string {
  if (FILS_COUNTRIES.has(countryCode) && price < 1) return subunitText(Math.round(price * 1000), countryCode);
  const unit = currencyNameAr.split(' ')[0];
  return `${Number.isInteger(price) ? price.toLocaleString('en-US') : price} ${unit}`;
}

export function getFuelPriceSeo(calcSlug: string, countryCode: string, now: Date = new Date()): FuelPriceSeo | null {
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

  // Price in the title only while the stored price is fresh, so a missed monthly update never shows a wrong price.
  const fresh = isFuelPriceFresh(fuel.checkedAt, fuel.staleAfterDays ?? 35, now);
  const regular = resolveFuelGrade(fuel.value.grades, 'octane91');
  const octane = regular?.grade.nameAr.match(/\d{2}/)?.[0];
  const title =
    fresh && regular
      ? `سعر البنزين في ${name} اليوم: ${octane ?? regular.grade.nameAr} بـ ${titlePrice(regular.grade.pricePerLiter, code, data.basics.currency.nameAr)}${monthYear ? ` (${monthYear})` : ''}`
      : `سعر البنزين في ${name} اليوم للتر`;
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

  return { title, fresh, description, h1, answerFirst, monthYear, sarFaq };
}
