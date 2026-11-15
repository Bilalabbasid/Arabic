/**
 * Maps the generic fuel choices offered in calculator forms (octane91 / octane95 / diesel) onto each
 * country's own grade keys (e.g. eplus91, mumtaz95, sansPlomb, solar, gasoil), so a visitor's choice
 * is honoured instead of silently falling back to the first grade.
 */
export interface FuelGrade {
  nameAr: string;
  pricePerLiter: number;
  unitAr?: string;
}

const DIESEL_RE = /diesel|solar|gasoil|mazout|ديزل|سولار|مازوت|غازوال|نافطة/i;
const LPG_RE = /gpl|lpg|غاز البترول/i;

function octaneOf(key: string, g: FuelGrade): number | null {
  const m = `${key} ${g.nameAr}`.match(/(?:^|\D)(8\d|9\d)(?:\D|$)/);
  return m ? Number(m[1]) : null;
}

export function resolveFuelGrade(
  grades: Record<string, FuelGrade>,
  requested?: string
): { key: string; grade: FuelGrade } | null {
  const keys = Object.keys(grades);
  if (keys.length === 0) return null;
  if (requested && grades[requested]) return { key: requested, grade: grades[requested] };

  const pick = (key: string | undefined) => (key ? { key, grade: grades[key] } : null);
  const isDiesel = (k: string) => DIESEL_RE.test(`${k} ${grades[k].nameAr}`);
  const petrol = keys.filter((k) => !isDiesel(k) && !LPG_RE.test(`${k} ${grades[k].nameAr}`));

  if (requested === 'diesel') return pick(keys.find(isDiesel)) ?? pick(keys[0]);

  const target = requested === 'octane95' ? 95 : requested === 'octane91' ? 91 : null;
  if (target !== null && petrol.length) {
    const rated = petrol.map((k) => ({ k, o: octaneOf(k, grades[k]) }));
    const withOctane = rated.filter((r) => r.o !== null) as { k: string; o: number }[];
    const unrated = rated.filter((r) => r.o === null);
    // For regular petrol, an unnumbered grade (e.g. Iraq's "regular") beats a numbered premium one.
    if (target === 91 && unrated.length && !withOctane.some((r) => r.o <= 92)) return pick(unrated[0].k);
    if (withOctane.length) {
      // Closest octane; on a tie prefer the higher grade for 95 and the lower for 91.
      withOctane.sort((a, b) => Math.abs(a.o - target) - Math.abs(b.o - target) || (target === 95 ? b.o - a.o : a.o - b.o));
      return pick(withOctane[0].k);
    }
    // No octane numbers (e.g. "sansPlomb", "essence"): the regular petrol grade.
    return pick(petrol[0]);
  }
  return pick(petrol[0] ?? keys[0]);
}
