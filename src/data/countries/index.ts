import { CountryCode, CountryData } from './types';
import { COUNTRY_DATA_SA } from './sa';
import { COUNTRY_DATA_AE } from './ae';
import { COUNTRY_DATA_KW } from './kw';
import { COUNTRY_DATA_QA } from './qa';
import { COUNTRY_DATA_BH } from './bh';
import { COUNTRY_DATA_OM } from './om';
import { COUNTRY_DATA_EG } from './eg';
import { COUNTRY_DATA_JO } from './jo';
import { COUNTRY_DATA_LB } from './lb';
import { COUNTRY_DATA_SY } from './sy';
import { COUNTRY_DATA_IQ } from './iq';
import { COUNTRY_DATA_YE } from './ye';
import { COUNTRY_DATA_PS } from './ps';
import { COUNTRY_DATA_SD } from './sd';
import { COUNTRY_DATA_MA } from './ma';
import { COUNTRY_DATA_DZ } from './dz';
import { COUNTRY_DATA_TN } from './tn';
import { COUNTRY_DATA_LY } from './ly';
import { COUNTRY_DATA_MR } from './mr';
import { COUNTRY_DATA_SO } from './so';
import { COUNTRY_DATA_DJ } from './dj';
import { COUNTRY_DATA_KM } from './km';

export * from './types';
export * from './legacy';

export const ALL_COUNTRIES_DATA: Record<CountryCode, CountryData> = {
  sa: COUNTRY_DATA_SA,
  ae: COUNTRY_DATA_AE,
  kw: COUNTRY_DATA_KW,
  qa: COUNTRY_DATA_QA,
  bh: COUNTRY_DATA_BH,
  om: COUNTRY_DATA_OM,
  eg: COUNTRY_DATA_EG,
  jo: COUNTRY_DATA_JO,
  lb: COUNTRY_DATA_LB,
  sy: COUNTRY_DATA_SY,
  iq: COUNTRY_DATA_IQ,
  ye: COUNTRY_DATA_YE,
  ps: COUNTRY_DATA_PS,
  sd: COUNTRY_DATA_SD,
  ma: COUNTRY_DATA_MA,
  dz: COUNTRY_DATA_DZ,
  tn: COUNTRY_DATA_TN,
  ly: COUNTRY_DATA_LY,
  mr: COUNTRY_DATA_MR,
  so: COUNTRY_DATA_SO,
  dj: COUNTRY_DATA_DJ,
  km: COUNTRY_DATA_KM,
};

export const ALL_COUNTRY_CODES: CountryCode[] = [
  'sa',
  'ae',
  'kw',
  'qa',
  'bh',
  'om',
  'eg',
  'jo',
  'lb',
  'sy',
  'iq',
  'ye',
  'ps',
  'sd',
  'ma',
  'dz',
  'tn',
  'ly',
  'mr',
  'so',
  'dj',
  'km',
];

export function getCountryData(countryCode: string): CountryData | undefined {
  const code = countryCode.toLowerCase() as CountryCode;
  return ALL_COUNTRIES_DATA[code];
}

export function formatCountryCurrency(
  amount: number,
  countryCode: string,
  options?: { showSymbol?: boolean; showCode?: boolean }
): string {
  const country = getCountryData(countryCode);
  const minorUnits = country?.basics.currency.minorUnits ?? 2;
  const symbol = country?.basics.currency.symbolAr ?? '';
  const code = country?.basics.currency.code ?? '';

  // Use Intl with Latin digits (constraint: Western digits 0-9 sitewide)
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: minorUnits,
    maximumFractionDigits: minorUnits,
  });

  const formattedNum = formatter.format(amount);
  if (options?.showCode) {
    return `${formattedNum} ${code}`;
  }
  if (options?.showSymbol === false) {
    return formattedNum;
  }
  return `${formattedNum} ${symbol}`;
}
