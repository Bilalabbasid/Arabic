import { ALL_CALCULATORS, getCalculatorBySlug } from '@/data/calculators';
import { CATEGORIES, getCategoryBySlug } from '@/data/categories';
import { INDEXABLE_CATEGORIES } from '@/lib/seo/metadata';
import { COUNTRIES, getCountryByCode, getCountryData } from '@/data/countries';
import { isIndexable, getIndexableCalculatorsForCountry, isCountryHubGatedIndexable } from '@/lib/seo/gating';
import { GUIDES } from '@/data/guides';
import { getCalculatorSeoMeta } from './calculatorSeoData';

export type BlockType =
  | 'breadcrumb'
  | 'country-variants'
  | 'related'
  | 'contextual'
  | 'category-list'
  | 'hub-list'
  | 'guides'
  | 'header'
  | 'footer'
  | 'routes';

export interface LinkEdge {
  fromUrl: string;
  toUrl: string;
  anchorText: string;
  rel: string; // 'canonical' | 'alternate' | ''
  blockType: BlockType;
}

export interface LinkGraphNode {
  url: string;
  pageType: 'home' | 'calculators-index' | 'calculator-generic' | 'country-hub' | 'country-calculator' | 'country-fuel' | 'trip-route' | 'category-hub' | 'guides-index' | 'guide' | 'static-trust';
  isIndexable: boolean;
  inlinks: number;
  outlinks: number;
  clickDepth: number; // BFS distance from /
}

export interface LinkGraph {
  nodes: Map<string, LinkGraphNode>;
  edges: LinkEdge[];
  inlinkMap: Map<string, Set<string>>;
  outlinkMap: Map<string, Set<string>>;
}

export const STATIC_TRUST_PAGES = [
  { path: '/about', title: 'عن منصة لِسيارتك' },
  { path: '/methodology', title: 'منهجية الحساب وتدقيق البيانات' },
  { path: '/sources', title: 'المصادر والجهات الرسمية المعتمدة' },
  { path: '/changelog', title: 'سجل التحديثات والتغييرات النظامية' },
  { path: '/contact', title: 'اتصل بنا وأبلغ عن خطأ' },
  { path: '/privacy', title: 'سياسة الخصوصية' },
  { path: '/terms', title: 'الشروط والأحكام' },
];

/**
 * Builds the entire indexable URL catalog and verified link graph
 */
export function buildLinkGraph(): LinkGraph {
  const nodes = new Map<string, LinkGraphNode>();
  const edges: LinkEdge[] = [];
  const inlinkMap = new Map<string, Set<string>>();
  const outlinkMap = new Map<string, Set<string>>();

  function addNode(url: string, pageType: LinkGraphNode['pageType']) {
    if (!nodes.has(url)) {
      nodes.set(url, {
        url,
        pageType,
        isIndexable: true,
        inlinks: 0,
        outlinks: 0,
        clickDepth: Infinity,
      });
      inlinkMap.set(url, new Set());
      outlinkMap.set(url, new Set());
    }
  }

  function addEdge(fromUrl: string, toUrl: string, anchorText: string, blockType: BlockType, rel: string = '') {
    if (fromUrl === toUrl) return; // Disallow self links
    if (!nodes.has(fromUrl) || !nodes.has(toUrl)) return; // Only link existing indexable nodes

    // Disallow duplicate links in same block
    const isDuplicateInBlock = edges.some(
      (e) => e.fromUrl === fromUrl && e.toUrl === toUrl && e.blockType === blockType
    );
    if (isDuplicateInBlock) return;

    edges.push({ fromUrl, toUrl, anchorText, rel, blockType });
    outlinkMap.get(fromUrl)!.add(toUrl);
    inlinkMap.get(toUrl)!.add(fromUrl);
  }

  // 1. Register all indexable nodes
  // 1.1 Home
  addNode('/', 'home');

  // 1.2 Calculators Index
  addNode('/calculators', 'calculators-index');

  // 1.3 Generic Calculators
  for (const calc of ALL_CALCULATORS) {
    addNode(`/calculators/${calc.slug}`, 'calculator-generic');
  }

  // 1.4 Indexable Category Hubs
  for (const catSlug of INDEXABLE_CATEGORIES) {
    addNode(`/categories/${catSlug}`, 'category-hub');
  }

  // 1.5 Country Hubs (only indexable ones)
  const indexableCountryCodes: string[] = [];
  for (const c of COUNTRIES) {
    const cCode = c.countryCode.toLowerCase();
    if (isCountryHubGatedIndexable(cCode)) {
      indexableCountryCodes.push(cCode);
      addNode(`/${cCode}`, 'country-hub');

      // Country fuel hub if verified fuel exists
      const countryData = getCountryData(cCode);
      if (countryData && countryData.fuel && (countryData.fuel.status === 'verified' || countryData.fuel.status === 'not_applicable')) {
        addNode(`/${cCode}/fuel-prices`, 'country-fuel');
      }

      // Trip routes if fuel verified and routes exist
      if (countryData && countryData.routes && countryData.fuel?.status === 'verified') {
        for (const route of countryData.routes.slice(0, 5)) {
          addNode(`/${cCode}/trip-cost/${route.id}`, 'trip-route');
        }
      }
    }
  }

  // 1.6 Indexable Country Calculator Variants (ALL countries that pass gating)
  const allIndexableCountryCalcs: Array<{ countryCode: string; calculatorSlug: string }> = [];
  for (const c of COUNTRIES) {
    const cCode = c.countryCode.toLowerCase();
    for (const calc of ALL_CALCULATORS) {
      if (isIndexable({ countryCode: cCode, calculatorSlug: calc.slug })) {
        addNode(`/${cCode}/${calc.slug}`, 'country-calculator');
        allIndexableCountryCalcs.push({ countryCode: cCode, calculatorSlug: calc.slug });
      }
    }
  }

  // 1.7 Guides Index & Guides
  addNode('/guides', 'guides-index');
  for (const guide of GUIDES) {
    addNode(`/guides/${guide.slug}`, 'guide');
  }

  // 1.8 Static Trust Pages
  for (const staticPage of STATIC_TRUST_PAGES) {
    addNode(staticPage.path, 'static-trust');
  }

  // 2. Build Edges across pages
  // Global Header/Footer Links on every page
  for (const [url] of nodes) {
    // Header Links
    addEdge(url, '/', 'الرئيسية', 'header');
    addEdge(url, '/calculators', 'جميع الحاسبات', 'header');
    addEdge(url, '/categories/cars-transportation', 'حاسبات السيارات', 'header');
    addEdge(url, '/guides', 'أدلة الاستخدام واللوائح', 'header');

    // Footer Trust & Navigation Links
    for (const trust of STATIC_TRUST_PAGES) {
      addEdge(url, trust.path, trust.title, 'footer');
    }
    for (const cCode of indexableCountryCodes) {
      const c = getCountryByCode(cCode);
      addEdge(url, `/${cCode}`, `حاسبات ${c?.nameAr || cCode}`, 'footer');
    }
    for (const catSlug of INDEXABLE_CATEGORIES) {
      const cat = getCategoryBySlug(catSlug);
      addEdge(url, `/categories/${catSlug}`, cat?.shortNameAr || catSlug, 'footer');
    }
  }

  // 2.1 Home Page specific links
  for (const calc of ALL_CALCULATORS) {
    addEdge('/', `/calculators/${calc.slug}`, calc.nameAr, 'related');
  }
  for (const catSlug of INDEXABLE_CATEGORIES) {
    addEdge('/', `/categories/${catSlug}`, catSlug, 'category-list');
  }
  for (const cCode of indexableCountryCodes) {
    addEdge('/', `/${cCode}`, cCode, 'hub-list');
  }
  for (const guide of GUIDES) {
    addEdge('/', `/guides/${guide.slug}`, guide.titleAr, 'guides');
  }

  // 2.2 Calculators Index (/calculators)
  for (const calc of ALL_CALCULATORS) {
    addEdge('/calculators', `/calculators/${calc.slug}`, calc.nameAr, 'related');
  }

  // 2.3 Category Hubs (/categories/{slug})
  for (const catSlug of INDEXABLE_CATEGORIES) {
    const catUrl = `/categories/${catSlug}`;
    addEdge(catUrl, '/', 'الرئيسية', 'breadcrumb');

    // All calculators in this category
    for (const calc of ALL_CALCULATORS) {
      if (calc.category === catSlug || (calc.additionalCategories && calc.additionalCategories.includes(catSlug))) {
        addEdge(catUrl, `/calculators/${calc.slug}`, calc.nameAr, 'category-list');
      }
    }

    // Country hubs
    for (const cCode of indexableCountryCodes) {
      addEdge(catUrl, `/${cCode}`, `حاسبات ${cCode}`, 'hub-list');
    }

    // Related guides
    for (const guide of GUIDES) {
      if (guide.category === catSlug) {
        addEdge(catUrl, `/guides/${guide.slug}`, guide.titleAr, 'guides');
      }
    }
  }

  // 2.4 Country Hubs (/{cc})
  for (const cCode of indexableCountryCodes) {
    const hubUrl = `/${cCode}`;
    const country = getCountryByCode(cCode);
    const countryName = country?.nameAr || cCode;

    addEdge(hubUrl, '/', 'الرئيسية', 'breadcrumb');

    // Indexable calculators for this country
    const indexableSlugs = getIndexableCalculatorsForCountry(cCode);
    for (const slug of indexableSlugs) {
      const calc = getCalculatorBySlug(slug);
      addEdge(hubUrl, `/${cCode}/${slug}`, calc?.nameAr || slug, 'hub-list');
    }

    // Fuel prices link if verified
    if (nodes.has(`/${cCode}/fuel-prices`)) {
      addEdge(hubUrl, `/${cCode}/fuel-prices`, `أسعار الوقود في ${countryName}`, 'hub-list');
    }

    // Top routes
    const cData = getCountryData(cCode);
    if (cData && cData.routes) {
      for (const route of cData.routes.slice(0, 5)) {
        if (nodes.has(`/${cCode}/trip-cost/${route.id}`)) {
          addEdge(hubUrl, `/${cCode}/trip-cost/${route.id}`, `تكلفة السفر من ${route.fromCityAr} إلى ${route.toCityAr}`, 'routes');
        }
      }
    }

    // Neighbouring countries (e.g. GCC cluster)
    for (const otherCC of indexableCountryCodes) {
      if (otherCC !== cCode) {
        const otherCountry = getCountryByCode(otherCC);
        addEdge(hubUrl, `/${otherCC}`, `حاسبات ${otherCountry?.nameAr || otherCC}`, 'hub-list');
      }
    }
  }

  // 2.5 Country Fuel Hubs (/{cc}/fuel-prices)
  for (const cCode of indexableCountryCodes) {
    const fuelUrl = `/${cCode}/fuel-prices`;
    if (!nodes.has(fuelUrl)) continue;

    addEdge(fuelUrl, '/', 'الرئيسية', 'breadcrumb');
    addEdge(fuelUrl, `/${cCode}`, `دولة ${cCode}`, 'breadcrumb');

    if (nodes.has(`/${cCode}/fuel-cost`)) {
      addEdge(fuelUrl, `/${cCode}/fuel-cost`, 'حاسبة استهلاك وتكلفة الوقود', 'related');
    }
    if (nodes.has(`/${cCode}/trip-cost`)) {
      addEdge(fuelUrl, `/${cCode}/trip-cost`, 'حاسبة تكلفة السفر بين المدن', 'related');
    }
    addEdge(fuelUrl, '/calculators/fuel-prices', 'أسعار الوقود في الدول العربية', 'country-variants');

    const cData = getCountryData(cCode);
    if (cData && cData.routes) {
      for (const route of cData.routes.slice(0, 5)) {
        if (nodes.has(`/${cCode}/trip-cost/${route.id}`)) {
          addEdge(fuelUrl, `/${cCode}/trip-cost/${route.id}`, `تكلفة السفر من ${route.fromCityAr} إلى ${route.toCityAr}`, 'routes');
        }
      }
    }
  }

  // 2.6 Trip Routes (/{cc}/trip-cost/{route})
  for (const cCode of indexableCountryCodes) {
    const cData = getCountryData(cCode);
    if (!cData || !cData.routes) continue;

    for (const route of cData.routes.slice(0, 5)) {
      const routeUrl = `/${cCode}/trip-cost/${route.id}`;
      if (!nodes.has(routeUrl)) continue;

      addEdge(routeUrl, '/', 'الرئيسية', 'breadcrumb');
      addEdge(routeUrl, `/${cCode}`, `دولة ${cCode}`, 'breadcrumb');

      if (nodes.has(`/${cCode}/fuel-prices`)) {
        addEdge(routeUrl, `/${cCode}/fuel-prices`, 'أسعار الوقود الرسمية المعتمدة', 'related');
      }
      if (nodes.has(`/${cCode}/fuel-cost`)) {
        addEdge(routeUrl, `/${cCode}/fuel-cost`, 'حاسبة استهلاك الوقود', 'related');
      }
      if (nodes.has(`/${cCode}/trip-cost`)) {
        addEdge(routeUrl, `/${cCode}/trip-cost`, 'حاسبة مسار الرحلة العامة', 'related');
      }

      for (const otherRoute of cData.routes.slice(0, 5)) {
        if (otherRoute.id !== route.id && nodes.has(`/${cCode}/trip-cost/${otherRoute.id}`)) {
          addEdge(routeUrl, `/${cCode}/trip-cost/${otherRoute.id}`, `مسار ${otherRoute.fromCityAr} - ${otherRoute.toCityAr}`, 'routes');
        }
      }
    }
  }

  // Map of calculator slug -> list of indexable country codes
  const calcCountryVariantsMap = new Map<string, string[]>();
  for (const calc of ALL_CALCULATORS) {
    calcCountryVariantsMap.set(calc.slug, []);
  }
  for (const item of allIndexableCountryCalcs) {
    calcCountryVariantsMap.get(item.calculatorSlug)?.push(item.countryCode);
  }

  // 2.7 Generic Calculator Pages (/calculators/{slug})
  for (const calc of ALL_CALCULATORS) {
    const genUrl = `/calculators/${calc.slug}`;
    const seoMeta = getCalculatorSeoMeta(calc.slug);

    // Breadcrumb
    addEdge(genUrl, '/', 'الرئيسية', 'breadcrumb');
    if (nodes.has(`/categories/${calc.category}`)) {
      addEdge(genUrl, `/categories/${calc.category}`, calc.category, 'breadcrumb');
    }

    // Country variants: link to every indexable country variant of the same calculator
    const countryCodesForCalc = calcCountryVariantsMap.get(calc.slug) || [];
    for (const cCode of countryCodesForCalc) {
      const countryUrl = `/${cCode}/${calc.slug}`;
      if (nodes.has(countryUrl)) {
        const country = getCountryByCode(cCode);
        addEdge(genUrl, countryUrl, `متوفر في ${country?.nameAr || cCode}`, 'country-variants');
      }
    }

    // Related calculators (3 to 6)
    if (seoMeta?.relatedCalculators) {
      for (const rel of seoMeta.relatedCalculators) {
        const relUrl = `/calculators/${rel.slug}`;
        if (nodes.has(relUrl)) {
          addEdge(genUrl, relUrl, rel.reason, 'related');
        }
      }
    }

    // Contextual links inside body text
    if (seoMeta?.contextualLinks) {
      for (const ctx of seoMeta.contextualLinks) {
        const ctxUrl = `/calculators/${ctx.slug}`;
        if (nodes.has(ctxUrl)) {
          addEdge(genUrl, ctxUrl, ctx.anchorText, 'contextual');
        }
      }
    }

    // Guides
    if (seoMeta?.guides) {
      for (const gSlug of seoMeta.guides) {
        const gUrl = `/guides/${gSlug}`;
        if (nodes.has(gUrl)) {
          addEdge(genUrl, gUrl, 'دليل إرشادي', 'guides');
        }
      }
    }
  }

  // 2.8 Country Calculator Pages (/{cc}/{slug}) for ALL indexable country calculators
  for (const { countryCode: cCode, calculatorSlug: calcSlug } of allIndexableCountryCalcs) {
    const countryCalcUrl = `/${cCode}/${calcSlug}`;
    if (!nodes.has(countryCalcUrl)) continue;

    const calc = getCalculatorBySlug(calcSlug);
    if (!calc) continue;

    const country = getCountryByCode(cCode);
    const countryName = country?.nameAr || cCode;
    const seoMeta = getCalculatorSeoMeta(calc.slug);

    // Breadcrumb:
    // If country hub is indexable: الرئيسية › {country} › {calculator}
    // If country hub is NOT indexable: الرئيسية › {category} › {calculator}
    addEdge(countryCalcUrl, '/', 'الرئيسية', 'breadcrumb');
    if (nodes.has(`/${cCode}`)) {
      addEdge(countryCalcUrl, `/${cCode}`, countryName, 'breadcrumb');
    } else if (nodes.has(`/categories/${calc.category}`)) {
      addEdge(countryCalcUrl, `/categories/${calc.category}`, calc.category, 'breadcrumb');
    }

    // Country variants block: generic page + all OTHER indexable country variants of same calculator
    addEdge(countryCalcUrl, `/calculators/${calc.slug}`, 'النسخة العامة لجميع الدول', 'country-variants');
    const countryCodesForCalc = calcCountryVariantsMap.get(calc.slug) || [];
    for (const otherCC of countryCodesForCalc) {
      if (otherCC !== cCode) {
        const otherUrl = `/${otherCC}/${calc.slug}`;
        if (nodes.has(otherUrl)) {
          const oc = getCountryByCode(otherCC);
          addEdge(countryCalcUrl, otherUrl, `متوفر في ${oc?.nameAr || otherCC}`, 'country-variants');
        }
      }
    }

    // Related calculators block: prefer same country's variant if indexable, else generic
    if (seoMeta?.relatedCalculators) {
      for (const rel of seoMeta.relatedCalculators) {
        const localizedRelUrl = `/${cCode}/${rel.slug}`;
        const genericRelUrl = `/calculators/${rel.slug}`;
        const targetUrl = nodes.has(localizedRelUrl) ? localizedRelUrl : genericRelUrl;
        if (nodes.has(targetUrl)) {
          addEdge(countryCalcUrl, targetUrl, rel.reason, 'related');
        }
      }
    }

    // Contextual links
    if (seoMeta?.contextualLinks) {
      for (const ctx of seoMeta.contextualLinks) {
        const localizedCtxUrl = `/${cCode}/${ctx.slug}`;
        const genericCtxUrl = `/calculators/${ctx.slug}`;
        const targetUrl = nodes.has(localizedCtxUrl) ? localizedCtxUrl : genericCtxUrl;
        if (nodes.has(targetUrl)) {
          addEdge(countryCalcUrl, targetUrl, ctx.anchorText, 'contextual');
        }
      }
    }

    // Link to country fuel prices hub from any car calculator
    if (calc.category === 'cars-transportation' && nodes.has(`/${cCode}/fuel-prices`)) {
      addEdge(countryCalcUrl, `/${cCode}/fuel-prices`, `أسعار الوقود في ${countryName}`, 'related');
    }

    // Guides
    if (seoMeta?.guides) {
      for (const gSlug of seoMeta.guides) {
        const gUrl = `/guides/${gSlug}`;
        if (nodes.has(gUrl)) {
          addEdge(countryCalcUrl, gUrl, 'دليل إرشادي معتمد', 'guides');
        }
      }
    }
  }

  // 2.9 Guides Index & Guides
  addEdge('/guides', '/', 'الرئيسية', 'breadcrumb');
  for (const guide of GUIDES) {
    addEdge('/guides', `/guides/${guide.slug}`, guide.titleAr, 'guides');
  }

  for (const guide of GUIDES) {
    const guideUrl = `/guides/${guide.slug}`;
    addEdge(guideUrl, '/', 'الرئيسية', 'breadcrumb');
    addEdge(guideUrl, '/guides', 'الأدلة', 'breadcrumb');

    // Link to primary related calculator
    if (nodes.has(`/calculators/${guide.relatedCalculatorSlug}`)) {
      const relCalc = getCalculatorBySlug(guide.relatedCalculatorSlug);
      addEdge(guideUrl, `/calculators/${guide.relatedCalculatorSlug}`, relCalc?.nameAr || 'الحاسبة المرتبطة', 'related');
    }

    // Link to at least 1 other calculator from the content or category
    for (const calc of ALL_CALCULATORS) {
      if (calc.slug !== guide.relatedCalculatorSlug && (calc.category === guide.category || calc.slug === 'percentage-calculator')) {
        addEdge(guideUrl, `/calculators/${calc.slug}`, calc.nameAr, 'related');
        break; // Ensure at least 2 calculators linked
      }
    }

    // Related guides
    for (const otherGuide of GUIDES) {
      if (otherGuide.slug !== guide.slug) {
        addEdge(guideUrl, `/guides/${otherGuide.slug}`, otherGuide.titleAr, 'guides');
      }
    }
  }

  // 2.10 Static Trust Pages
  for (const staticPage of STATIC_TRUST_PAGES) {
    addEdge(staticPage.path, '/', 'الرئيسية', 'breadcrumb');
    addEdge(staticPage.path, '/calculators', 'تصفح كافة الحاسبات', 'related');
  }

  // 3. Compute inlinks, outlinks, and BFS click depth
  for (const [url, node] of nodes) {
    node.inlinks = inlinkMap.get(url)?.size || 0;
    node.outlinks = outlinkMap.get(url)?.size || 0;
  }

  // BFS for Click Depth starting from '/'
  const queue: Array<{ url: string; depth: number }> = [{ url: '/', depth: 0 }];
  const visited = new Set<string>(['/']);
  nodes.get('/')!.clickDepth = 0;

  while (queue.length > 0) {
    const { url, depth } = queue.shift()!;
    const neighbors = outlinkMap.get(url);
    if (!neighbors) continue;

    for (const nextUrl of neighbors) {
      if (!visited.has(nextUrl)) {
        visited.add(nextUrl);
        const nextNode = nodes.get(nextUrl);
        if (nextNode) {
          nextNode.clickDepth = depth + 1;
        }
        queue.push({ url: nextUrl, depth: depth + 1 });
      }
    }
  }

  return { nodes, edges, inlinkMap, outlinkMap };
}

/**
 * Generates CSV content from link graph edges
 */
export function generateLinkGraphCsv(graph: LinkGraph): string {
  const headers = ['from_url', 'to_url', 'anchor_text', 'rel', 'block_type'];
  const rows = [headers.join(',')];

  for (const edge of graph.edges) {
    const safeAnchor = `"${edge.anchorText.replace(/"/g, '""')}"`;
    rows.push([edge.fromUrl, edge.toUrl, safeAnchor, edge.rel, edge.blockType].join(','));
  }

  return rows.join('\n');
}
