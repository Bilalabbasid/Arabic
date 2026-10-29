import { getCountryByCode, DEFAULT_COUNTRY } from '@/data/countries';

/**
 * Format a numeric value cleanly with thousands separators.
 * Standardizes on clean numeral rendering avoiding bi-directional cursor jumps.
 */
export function formatNumber(
  value: number | string,
  options?: {
    decimals?: number;
    useEasternDigits?: boolean;
    locale?: string;
  }
): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '-';

  const decimals = options?.decimals !== undefined ? options.decimals : (num % 1 !== 0 ? 2 : 0);

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);

  if (options?.useEasternDigits) {
    const easternDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return formatted.replace(/[0-9]/g, (w) => easternDigits[parseInt(w, 10)]);
  }

  return formatted;
}

/**
 * Formats a monetary value with proper Arabic currency symbol / code.
 * Ex: 12,500.00 ر.س
 */
export function formatCurrency(
  value: number | string,
  currencyCode = 'SAR',
  options?: {
    decimals?: number;
    showCodeOnly?: boolean;
    countryCode?: string;
  }
): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '-';

  const formattedNum = formatNumber(num, { decimals: options?.decimals ?? 2 });

  if (options?.showCodeOnly) {
    return `${formattedNum} ${currencyCode}`;
  }

  // Find symbol from country registry
  let symbol = currencyCode;
  if (options?.countryCode) {
    const country = getCountryByCode(options.countryCode);
    if (country) {
      symbol = country.currencySymbolAr;
    }
  } else {
    // Lookup by currencyCode
    switch (currencyCode.toUpperCase()) {
      case 'SAR':
        symbol = 'ر.س';
        break;
      case 'AED':
        symbol = 'د.إ';
        break;
      case 'EGP':
        symbol = 'ج.م';
        break;
      case 'KWD':
        symbol = 'د.ك';
        break;
      case 'QAR':
        symbol = 'ر.ق';
        break;
      case 'BHD':
        symbol = 'د.ب';
        break;
      case 'OMR':
        symbol = 'ر.ع';
        break;
      case 'JOD':
        symbol = 'د.أ';
        break;
      case 'MAD':
        symbol = 'د.م';
        break;
      case 'DZD':
        symbol = 'د.ج';
        break;
      case 'TND':
        symbol = 'د.ت';
        break;
      case 'IQD':
        symbol = 'د.ع';
        break;
      case 'USD':
        symbol = '$';
        break;
      default:
        symbol = currencyCode;
    }
  }

  return `${formattedNum} ${symbol}`;
}

/**
 * Formats a percentage value.
 * Ex: 15%
 */
export function formatPercent(value: number | string, decimals = 2): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '-';

  const cleanDecimals = num % 1 === 0 ? 0 : decimals;
  const formattedNum = formatNumber(num, { decimals: cleanDecimals });
  return `%${formattedNum}`;
}

/**
 * Formats a date string or Date object into Arabic locale format.
 */
export function formatDateAr(dateInput: string | Date | undefined): string {
  if (!dateInput) return '-';
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '-';

  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
