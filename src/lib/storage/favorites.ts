/**
 * Safe client-side storage for calculator favorites and recently viewed calculators.
 * 
 * Guarantees:
 * - Only stores calculator slugs (identifiers) and minimal timestamps.
 * - NEVER persists user inputs, financial data, or personal details.
 * - Safe for SSR (Server-Side Rendering) and private browsing modes.
 * - Entirely local to the user's browser.
 */

const FAVORITES_STORAGE_KEY = 'lsayartk_favorites';
const RECENT_STORAGE_KEY = 'lsayartk_recent';
const MAX_RECENT_ITEMS = 8;

export interface RecentCalculatorItem {
  slug: string;
  timestamp: number;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/**
 * Retrieves the list of favorite calculator slugs.
 */
export function getFavoriteSlugs(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item): item is string => typeof item === 'string' && item.length > 0 && item.length < 100
      );
    }
  } catch {
    // LocalStorage quota or privacy sandbox error
  }
  return [];
}

/**
 * Checks whether a given calculator slug is favorited.
 */
export function isCalculatorFavorite(slug: string): boolean {
  if (!slug) return false;
  return getFavoriteSlugs().includes(slug);
}

/**
 * Toggles a calculator in the favorites list.
 * Returns true if now favorited, false if removed.
 */
export function toggleFavoriteCalculator(slug: string): boolean {
  if (!slug || !isBrowser()) return false;
  try {
    const current = getFavoriteSlugs();
    const index = current.indexOf(slug);
    let updated: string[];
    let isNowFav: boolean;

    if (index >= 0) {
      updated = current.filter((s) => s !== slug);
      isNowFav = false;
    } else {
      updated = [slug, ...current.filter((s) => s !== slug)].slice(0, 50);
      isNowFav = true;
    }

    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent('lsayartk_favorites_changed', {
        detail: { slug, isFavorited: isNowFav },
      })
    );
    return isNowFav;
  } catch {
    return false;
  }
}

/**
 * Records an interaction/view for recently used calculators.
 */
export function recordCalculatorInteraction(slug: string): void {
  if (!slug || !isBrowser()) return;
  try {
    const raw = window.localStorage.getItem(RECENT_STORAGE_KEY);
    const existing: RecentCalculatorItem[] = raw ? JSON.parse(raw) : [];
    const filtered = existing.filter((item) => item.slug !== slug);
    const updated = [{ slug, timestamp: Date.now() }, ...filtered].slice(0, MAX_RECENT_ITEMS);

    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('lsayartk_recent_changed', { detail: { slug } }));
  } catch {
    // Fail-safe
  }
}

/**
 * Retrieves recently interacted calculators.
 */
export function getRecentCalculators(): RecentCalculatorItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(RECENT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.slice(0, MAX_RECENT_ITEMS);
    }
  } catch {
    // Fail-safe
  }
  return [];
}
