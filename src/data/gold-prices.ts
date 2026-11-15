/**
 * Gold price reference data.
 *
 * The gold calculator page fetches the live spot price (api.gold-api.com) and USD exchange rates
 * (open.er-api.com) in the browser. The values below are the fallback used for the server-rendered
 * page and whenever those services are unreachable. Refresh them with the same two sources.
 */
export const GOLD_REFERENCE = {
  /** Spot gold, USD per troy ounce. */
  usdPerOunce: 3887.6,
  asOf: '2026-11-15',
};

export const GRAMS_PER_TROY_OUNCE = 31.1034768;
/** Standard (Indian/Gulf) tola: 3/8 troy ounce. */
export const GRAMS_PER_TOLA = 11.6638038;

export type GoldWeightUnit = 'gram' | 'tola' | 'ounce';
export const GOLD_UNIT_GRAMS: Record<GoldWeightUnit, number> = { gram: 1, tola: GRAMS_PER_TOLA, ounce: GRAMS_PER_TROY_OUNCE };
export const GOLD_UNIT_AR: Record<GoldWeightUnit, string> = { gram: 'غرام', tola: 'تولة', ounce: 'أونصة' };

/** Convert a weight between grams, tolas and troy ounces. */
export function convertGoldWeight(value: number, from: GoldWeightUnit, to: GoldWeightUnit): number {
  return (value * GOLD_UNIT_GRAMS[from]) / GOLD_UNIT_GRAMS[to];
}

export const GOLD_KARATS = [24, 22, 21, 18, 14] as const;
export type GoldKarat = (typeof GOLD_KARATS)[number];

/** Fineness of each karat (parts gold out of 24). */
export const karatPurity = (karat: number) => karat / 24;

export interface GoldCurrency {
  code: string;
  symbolAr: string;
  nameAr: string;
  /** Units of this currency per 1 USD on the reference date. */
  usdRate: number;
  /** Decimals to show for prices per gram. */
  decimals: number;
  /** Official rate differs a lot from the local market rate. */
  parallelMarket?: boolean;
}

/** Currency for each country the site covers (lowercase ISO country code). */
export const GOLD_CURRENCIES: Record<string, GoldCurrency> = {
  sa: { code: 'SAR', symbolAr: 'ر.س', nameAr: 'ريال سعودي', usdRate: 3.75, decimals: 2 },
  ae: { code: 'AED', symbolAr: 'د.إ', nameAr: 'درهم إماراتي', usdRate: 3.6725, decimals: 2 },
  kw: { code: 'KWD', symbolAr: 'د.ك', nameAr: 'دينار كويتي', usdRate: 0.31116, decimals: 3 },
  qa: { code: 'QAR', symbolAr: 'ر.ق', nameAr: 'ريال قطري', usdRate: 3.64, decimals: 2 },
  bh: { code: 'BHD', symbolAr: 'د.ب', nameAr: 'دينار بحريني', usdRate: 0.376, decimals: 3 },
  om: { code: 'OMR', symbolAr: 'ر.ع', nameAr: 'ريال عماني', usdRate: 0.384497, decimals: 3 },
  eg: { code: 'EGP', symbolAr: 'ج.م', nameAr: 'جنيه مصري', usdRate: 53.439277, decimals: 0 },
  jo: { code: 'JOD', symbolAr: 'د.أ', nameAr: 'دينار أردني', usdRate: 0.709, decimals: 2 },
  lb: { code: 'LBP', symbolAr: 'ل.ل', nameAr: 'ليرة لبنانية', usdRate: 89500, decimals: 0, parallelMarket: true },
  sy: { code: 'SYP', symbolAr: 'ل.س', nameAr: 'ليرة سورية', usdRate: 121.955344, decimals: 0, parallelMarket: true },
  iq: { code: 'IQD', symbolAr: 'د.ع', nameAr: 'دينار عراقي', usdRate: 1515.052653, decimals: 0, parallelMarket: true },
  ye: { code: 'YER', symbolAr: 'ر.ي', nameAr: 'ريال يمني', usdRate: 236.746097, decimals: 0, parallelMarket: true },
  ps: { code: 'ILS', symbolAr: '₪', nameAr: 'شيكل', usdRate: 3.208773, decimals: 2 },
  sd: { code: 'SDG', symbolAr: 'ج.س', nameAr: 'جنيه سوداني', usdRate: 498.093029, decimals: 0, parallelMarket: true },
  ly: { code: 'LYD', symbolAr: 'د.ل', nameAr: 'دينار ليبي', usdRate: 6.427677, decimals: 2, parallelMarket: true },
  tn: { code: 'TND', symbolAr: 'د.ت', nameAr: 'دينار تونسي', usdRate: 3.018899, decimals: 2 },
  dz: { code: 'DZD', symbolAr: 'د.ج', nameAr: 'دينار جزائري', usdRate: 136.792539, decimals: 0, parallelMarket: true },
  ma: { code: 'MAD', symbolAr: 'د.م.', nameAr: 'درهم مغربي', usdRate: 9.882546, decimals: 2 },
  mr: { code: 'MRU', symbolAr: 'أ.م', nameAr: 'أوقية موريتانية', usdRate: 40.547147, decimals: 0 },
  so: { code: 'SOS', symbolAr: 'ش.ص', nameAr: 'شلن صومالي', usdRate: 571.980592, decimals: 0 },
  dj: { code: 'DJF', symbolAr: 'ف.ج', nameAr: 'فرنك جيبوتي', usdRate: 177.721, decimals: 0 },
  km: { code: 'KMF', symbolAr: 'ف.ق', nameAr: 'فرنك قمري', usdRate: 445.713401, decimals: 0 },
};

export const DEFAULT_GOLD_COUNTRY = 'sa';

export function goldCurrencyFor(countryCode?: string): GoldCurrency {
  return GOLD_CURRENCIES[String(countryCode || DEFAULT_GOLD_COUNTRY).toLowerCase()] ?? GOLD_CURRENCIES[DEFAULT_GOLD_COUNTRY];
}

/** 24K price per gram in a currency, from a USD/oz spot price and a USD rate. */
export function pricePerGram24(usdPerOunce: number, usdRate: number): number {
  return (usdPerOunce / GRAMS_PER_TROY_OUNCE) * usdRate;
}

/** Reference 24K price per gram for a country's currency (fallback when no live price). */
export function referencePricePerGram24(countryCode?: string): number {
  return pricePerGram24(GOLD_REFERENCE.usdPerOunce, goldCurrencyFor(countryCode).usdRate);
}
