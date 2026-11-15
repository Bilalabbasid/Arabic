import { getCountryData } from '@/data/countries';
import type { CountryData } from '@/data/countries/types';
import { resolveFuelGrade } from '@/calculators/fuel-cost/grades';
import { GOLD_CURRENCIES } from '@/data/gold-prices';
import { COUNTRY_SHORT_NAMES_AR } from '@/lib/seo/fuel-price-seo';

/**
 * Country-specific fuel facts for /{cc}/fuel-cost pages: tank fill costs, cost per distance,
 * a regional price comparison in Saudi riyals, popular routes and how prices are set. Each
 * number comes from the country's own verified data, so every country page carries its own text.
 */

export const TANKS_L = [40, 60, 80];
export const SEDAN_L100 = 8;
export const MONTHLY_KM = 1500;

const REGIONS: Record<string, string[]> = {
  gulf: ['sa', 'ae', 'kw', 'qa', 'bh', 'om'],
  levant: ['jo', 'lb', 'sy', 'ps', 'iq'],
  nile: ['eg', 'sd', 'ly'],
  maghreb: ['ma', 'dz', 'tn', 'mr', 'ly'],
  horn: ['ye', 'so', 'dj', 'km'],
};

const PRICING_MODEL_AR: Record<string, string> = {
  fixed_official: 'تحدد الحكومة سعراً رسمياً ثابتاً لا يتغير إلا بقرار رسمي',
  monthly_adjusted: 'تراجع لجنة التسعير الأسعار دورياً (شهرياً غالباً) وفق أسعار النفط العالمية',
  subsidised_cap: 'يُطبق سقف سعري مدعوم يحدد الحد الأعلى لسعر البنزين العادي',
  liberalised: 'الأسعار محررة وتحددها الشركات والمحطات وفق السوق',
};

export interface CountryFuelInsights {
  name: string;
  symbol: string;
  regular: { nameAr: string; price: number };
  grades: Array<{ nameAr: string; price: number }>;
  tanks: Array<{ liters: number; costs: number[] }>;
  per100: number;
  per1000: number;
  monthly: number;
  peers?: Array<{ code: string; name: string; local: number; symbol: string; sar: number; diffPct: number; self: boolean }>;
  rank?: { position: number; of: number };
  routes: Array<{ id: string; label: string; km: number; cost: number }>;
  pricingModel?: string;
  history?: { unchangedSince?: string; changes: Array<{ date: string; from: number; to: number }> };
  checkedAt?: string;
}

const sarOf = (cc: string, price: number) => {
  const cur = GOLD_CURRENCIES[cc];
  return cur ? (price / cur.usdRate) * 3.75 : NaN;
};

function regularOf(data: CountryData | undefined) {
  if (!data || data.fuel?.status !== 'verified' || !data.fuel.value?.grades) return null;
  return resolveFuelGrade(data.fuel.value.grades, 'octane91');
}

export function getCountryFuelInsights(countryCode: string): CountryFuelInsights | null {
  const cc = countryCode.toLowerCase();
  const data = getCountryData(cc);
  const reg = regularOf(data);
  if (!data || !reg) return null;

  const grades = Object.values(data.fuel.value!.grades).map((g) => ({ nameAr: g.nameAr, price: g.pricePerLiter }));
  const p = reg.grade.pricePerLiter;
  const name = COUNTRY_SHORT_NAMES_AR[cc] || data.basics.nameAr;

  const comparable = (code: string) => {
    const cur = GOLD_CURRENCIES[code];
    return cur && !cur.parallelMarket;
  };

  let peers: CountryFuelInsights['peers'];
  let rank: CountryFuelInsights['rank'];
  if (comparable(cc)) {
    const all = Object.keys(GOLD_CURRENCIES)
      .filter(comparable)
      .map((code) => {
        const r = regularOf(getCountryData(code));
        return r ? { code, local: r.grade.pricePerLiter, sar: sarOf(code, r.grade.pricePerLiter) } : null;
      })
      .filter((x): x is { code: string; local: number; sar: number } => !!x && Number.isFinite(x.sar));
    const mineSar = sarOf(cc, p);
    const sorted = [...all].sort((a, b) => a.sar - b.sar);
    rank = { position: sorted.findIndex((x) => x.code === cc) + 1, of: sorted.length };
    const region = Object.values(REGIONS).find((r) => r.includes(cc)) || [];
    const peerCodes = new Set([...region, ...(cc === 'sa' ? ['eg', 'jo'] : ['sa'])]);
    peers = all
      .filter((x) => peerCodes.has(x.code))
      .sort((a, b) => a.sar - b.sar)
      .map((x) => ({
        code: x.code,
        name: COUNTRY_SHORT_NAMES_AR[x.code] || x.code,
        local: x.local,
        symbol: GOLD_CURRENCIES[x.code].symbolAr,
        sar: Math.round(x.sar * 100) / 100,
        diffPct: Math.round(((x.sar - mineSar) / mineSar) * 100),
        self: x.code === cc,
      }));
  }

  const hist = data.fuel.value?.priceHistory;
  let history: CountryFuelInsights['history'];
  if (hist && hist.length >= 2) {
    const ordered = [...hist].sort((a, b) => a.date.localeCompare(b.date));
    const changes: Array<{ date: string; from: number; to: number }> = [];
    for (let i = 1; i < ordered.length; i++) {
      const a = ordered[i - 1].prices[reg.key];
      const b = ordered[i].prices[reg.key];
      if (a !== undefined && b !== undefined && a !== b) changes.push({ date: ordered[i].date, from: a, to: b });
    }
    history = { changes, unchangedSince: changes.length === 0 ? ordered[0].date : undefined };
  }

  const r2 = (n: number) => Math.round(n * 100) / 100;
  return {
    name,
    symbol: data.basics.currency.symbolAr,
    regular: { nameAr: reg.grade.nameAr, price: p },
    grades,
    tanks: TANKS_L.map((l) => ({ liters: l, costs: grades.map((g) => r2(l * g.price)) })),
    per100: r2(SEDAN_L100 * p),
    per1000: r2(SEDAN_L100 * 10 * p),
    monthly: r2((MONTHLY_KM / 100) * SEDAN_L100 * p),
    peers,
    rank,
    routes: (data.routes || []).slice(0, 5).map((r) => ({
      id: r.id,
      label: `${r.fromCityAr} – ${r.toCityAr}`,
      km: r.distanceKm,
      cost: r2((r.distanceKm / 100) * SEDAN_L100 * p),
    })),
    pricingModel: PRICING_MODEL_AR[data.fuel.value!.pricingModel],
    history,
    checkedAt: data.fuel.checkedAt,
  };
}

export function countryFuelFaqs(ins: CountryFuelInsights): Array<{ question: string; answer: string }> {
  const s = ins.symbol;
  const ri = Math.max(0, ins.grades.findIndex((g) => g.nameAr === ins.regular.nameAr));
  const faqs = [
    {
      question: `كم تكلفة تعبئة خزان البنزين في ${ins.name}؟`,
      answer: `بسعر ${ins.regular.nameAr} (${ins.regular.price} ${s} للتر): خزان 40 لتراً = ${ins.tanks[0].costs[ri]} ${s}، و60 لتراً = ${ins.tanks[1].costs[ri]} ${s}، و80 لتراً = ${ins.tanks[2].costs[ri]} ${s}.`,
    },
    {
      question: `كم يكلف البنزين لكل 100 كم في ${ins.name}؟`,
      answer: `سيارة تستهلك ${SEDAN_L100} لترات لكل 100 كم تدفع نحو ${ins.per100} ${s} لكل 100 كم بسعر ${ins.regular.nameAr}، أي ${ins.per1000} ${s} لكل 1,000 كم، ونحو ${ins.monthly} ${s} شهرياً لمن يقود ${MONTHLY_KM.toLocaleString('en-US')} كم في الشهر.`,
    },
  ];
  if (ins.rank && ins.peers) {
    const sa = ins.peers.find((x) => x.code === 'sa');
    faqs.push({
      question: `هل البنزين في ${ins.name} رخيص مقارنة بالدول العربية؟`,
      answer: `ترتيب ${ins.name} في رخص البنزين العادي هو المرتبة ${ins.rank.position} من ${ins.rank.of} دولة عربية بعد تحويل الأسعار إلى الريال السعودي${
        sa && sa.code !== 'sa' && !sa.self ? `، وسعر البنزين العادي في السعودية ${sa.diffPct === 0 ? 'مماثل تقريباً' : sa.diffPct > 0 ? `أغلى بنحو ${sa.diffPct}%` : `أرخص بنحو ${Math.abs(sa.diffPct)}%`}` : ''
      }.`,
    });
  }
  return faqs;
}
