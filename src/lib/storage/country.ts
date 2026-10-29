import { DEFAULT_COUNTRY, getCountryByCode } from '@/data/countries';
import { CountryDefinition } from '@/types/country';

const COUNTRY_STORAGE_KEY = 'lsayartk_user_country';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/**
 * Gets the user's saved country code from localStorage.
 */
export function getSavedCountryCode(): string | null {
  if (!isBrowser()) return null;
  try {
    const saved = window.localStorage.getItem(COUNTRY_STORAGE_KEY);
    if (saved && getCountryByCode(saved)) {
      return saved.toUpperCase();
    }
  } catch {
    // Fail-safe
  }
  return null;
}

/**
 * Saves the user's preferred country code to localStorage and triggers a change event.
 */
export function saveUserCountryCode(countryCode: string): void {
  if (!isBrowser()) return;
  try {
    const code = countryCode.toUpperCase();
    window.localStorage.setItem(COUNTRY_STORAGE_KEY, code);
    window.dispatchEvent(
      new CustomEvent('lsayartk_country_changed', {
        detail: { countryCode: code },
      })
    );
  } catch {
    // Storage quota / private mode
  }
}

/**
 * Resolves the effective country based on priority:
 * 1. Explicit urlCountryCode (highest priority)
 * 2. Saved user preference
 * 3. Geolocation suggestion from Vercel header
 * 4. Default country (Saudi Arabia)
 */
export function resolveEffectiveCountry(options: {
  urlCountryCode?: string | null;
  geoCountryCode?: string | null;
}): CountryDefinition {
  // 1. Explicit country URL
  if (options.urlCountryCode) {
    const fromUrl = getCountryByCode(options.urlCountryCode);
    if (fromUrl) return fromUrl;
  }

  // 2. Saved preference in browser
  const saved = getSavedCountryCode();
  if (saved) {
    const fromSaved = getCountryByCode(saved);
    if (fromSaved) return fromSaved;
  }

  // 3. Geolocation suggestion
  if (options.geoCountryCode) {
    const fromGeo = getCountryByCode(options.geoCountryCode);
    if (fromGeo) return fromGeo;
  }

  // 4. Default fallback
  return DEFAULT_COUNTRY;
}
