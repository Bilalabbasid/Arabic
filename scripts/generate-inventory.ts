/**
 * Script to inventory all pages and analyze similarity
 */
import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(process.cwd(), '.next/server/app');
const SITEMAP_FILE = path.join(APP_DIR, 'sitemap.xml.body');
const OUTPUT_DIR = path.join(process.cwd(), 'seo-audit');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 1. Read sitemap URLs
let sitemapUrls = new Set<string>();
if (fs.existsSync(SITEMAP_FILE)) {
  const content = fs.readFileSync(SITEMAP_FILE, 'utf8');
  const matches = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
  sitemapUrls = new Set(matches);
}

// Helper to determine page type and URL path from relative file path
function getRouteInfo(relPath: string) {
  const normalized = relPath.replace(/\\/g, '/');
  const route = normalized.replace(/\.html$/, '');
  
  if (route === 'index') {
    return { path: '/', type: 'home' };
  }
  if (route === '_not-found') {
    return { path: '/404', type: 'static', status: 404 };
  }
  if (route.startsWith('calculators/')) {
    return { path: `/${route}`, type: 'calculator' };
  }
  if (route === 'calculators') {
    return { path: `/${route}`, type: 'calculator' };
  }
  if (route.startsWith('categories/')) {
    return { path: `/${route}`, type: 'category' };
  }
  if (route === 'categories') {
    return { path: `/${route}`, type: 'category' };
  }
  if (route.startsWith('guides/')) {
    return { path: `/${route}`, type: 'guide' };
  }
  if (route === 'guides') {
    return { path: `/${route}`, type: 'guide' };
  }
  if (['about', 'contact', 'methodology', 'privacy', 'sources', 'terms'].includes(route)) {
    return { path: `/${route}`, type: 'static' };
  }
  
  const parts = route.split('/');
  if (parts.length === 1) {
    return { path: `/${parts[0]}`, type: 'country-hub' };
  }
  if (parts.length === 2) {
    return { path: `/${parts[0]}/${parts[1]}`, type: 'country-calculator' };
  }
  
  return { path: `/${route}`, type: 'static' };
}

// Find all HTML files
function getHtmlFiles(dir: string, baseDir = dir): string[] {
  let results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath, baseDir));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(path.relative(baseDir, fullPath));
    }
  }
  return results;
}

// Fast and safe tag stripping
function stripTags(html: string): string {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<header\b[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer\b[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function getShingles(text: string, k = 3): Set<string> {
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const shingles = new Set<string>();
  for (let i = 0; i <= words.length - k; i++) {
    shingles.add(words.slice(i, i + k).join(' '));
  }
  return shingles;
}

function jaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 && setB.size === 0) return 1.0;
  if (setA.size === 0 || setB.size === 0) return 0.0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) {
      intersection++;
    }
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

export function runInventory() {
  const htmlFiles = getHtmlFiles(APP_DIR).filter(f => !f.includes('_not-found') || f === '_not-found.html');
  
  const inventoryRows: any[] = [];
  const pageTexts: Record<string, string> = {};

  for (const file of htmlFiles) {
    const filePath = path.join(APP_DIR, file);
    const html = fs.readFileSync(filePath, 'utf8');
    const { path: urlPath, type, status = 200 } = getRouteInfo(file);
    const fullUrl = `https://lsayartk.com${urlPath === '/' ? '' : urlPath}`;
    
    // Title
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/is);
    const title = titleMatch ? titleMatch[1].trim() : '';
    
    // Meta Description
    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/is)
      || html.match(/<meta[^>]*content=["'](.*?)["'][^>]*name=["']description["']/is);
    const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';
    
    // H1
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/is);
    const h1 = h1Match ? stripTags(h1Match[1]).trim() : '';
    
    // Canonical
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/is)
      || html.match(/<link[^>]*href=["'](.*?)["'][^>]*rel=["']canonical["']/is);
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';
    
    // Robots
    const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["'](.*?)["']/is)
      || html.match(/<meta[^>]*content=["'](.*?)["'][^>]*name=["']robots["']/is);
    const robotsMeta = robotsMatch ? robotsMatch[1].trim() : 'index, follow';
    
    // Visible text (excluding header, footer, nav)
    const visibleText = stripTags(html);
    pageTexts[urlPath] = visibleText;
    const words = visibleText.split(/\s+/).filter(w => w.length > 0);
    const visibleWordCount = words.length;
    
    // Calculators linked from main content (excluding header/footer/nav)
    let mainHtml = html
      .replace(/<header\b[\s\S]*?<\/header>/gi, ' ')
      .replace(/<footer\b[\s\S]*?<\/footer>/gi, ' ')
      .replace(/<nav\b[\s\S]*?<\/nav>/gi, ' ');
    const hrefMatches = [...mainHtml.matchAll(/href=["'](\/calculators\/[a-z0-9-]+|\/[a-z]{2}\/[a-z0-9-]+)["']/gi)];
    const calculatorsLinked = Array.from(new Set(hrefMatches.map(m => m[1]))).join(';');
    
    // JSON-LD types
    const jsonLdMatches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis)];
    const jsonLdTypes: string[] = [];
    for (const jm of jsonLdMatches) {
      try {
        const parsed = JSON.parse(jm[1]);
        if (parsed['@type']) {
          jsonLdTypes.push(parsed['@type']);
        } else if (Array.isArray(parsed)) {
          parsed.forEach(p => { if (p['@type']) jsonLdTypes.push(p['@type']); });
        }
      } catch (e) {
        const typeRegex = /"@type"\s*:\s*"([^"]+)"/g;
        let match;
        while ((match = typeRegex.exec(jm[1])) !== null) {
          jsonLdTypes.push(match[1]);
        }
      }
    }
    const jsonLdTypesStr = Array.from(new Set(jsonLdTypes)).join(';');
    
    // og:image
    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["'](.*?)["']/is)
      || html.match(/<meta[^>]*content=["'](.*?)["'][^>]*property=["']og:image["']/is);
    const ogImage = ogImageMatch ? 'y' : 'n';
    
    // in sitemap
    const inSitemap = sitemapUrls.has(canonical || fullUrl) ? 'yes' : 'no';
    
    inventoryRows.push({
      url: fullUrl,
      type,
      status,
      title,
      title_length: title.length,
      meta_description: metaDescription,
      meta_description_length: metaDescription.length,
      h1,
      canonical,
      robots_meta: robotsMeta,
      visible_word_count: visibleWordCount,
      calculators_linked: calculatorsLinked,
      jsonld_types: jsonLdTypesStr,
      og_image: ogImage,
      in_sitemap: inSitemap,
    });
  }
  
  // Sort rows: home, calculators, country-calculators, country-hubs, categories, guides, static
  const typeOrder: Record<string, number> = {
    home: 1,
    calculator: 2,
    'country-calculator': 3,
    'country-hub': 4,
    category: 5,
    guide: 6,
    static: 7,
  };
  inventoryRows.sort((a, b) => {
    const diff = (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
    if (diff !== 0) return diff;
    return a.url.localeCompare(b.url);
  });
  
  // Write inventory.csv
  const headers = [
    'url',
    'type',
    'status',
    'title',
    'title_length',
    'meta_description',
    'meta_description_length',
    'h1',
    'canonical',
    'robots_meta',
    'visible_word_count',
    'calculators_linked',
    'jsonld_types',
    'og_image',
    'in_sitemap',
  ];
  
  const escapeCsv = (val: any) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };
  
  const csvLines = [
    headers.join(','),
    ...inventoryRows.map(r => headers.map(h => escapeCsv(r[h])).join(',')),
  ];
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'inventory-after.csv'), '\uFEFF' + csvLines.join('\n'), 'utf8');
  console.log(`Saved ${inventoryRows.length} rows to seo-audit/inventory-after.csv`);

  // Duplicates analysis
  const duplicateRows: any[] = [];
  const countryCalcRows = inventoryRows.filter(r => r.type === 'country-calculator');
  
  for (const r of countryCalcRows) {
    const urlObj = new URL(r.url);
    const parts = urlObj.pathname.split('/').filter(Boolean); // [cc, slug]
    if (parts.length === 2) {
      const [cc, slug] = parts;
      const genericPath = `/calculators/${slug}`;
      const genericText = pageTexts[genericPath] || '';
      const countryText = pageTexts[urlObj.pathname] || '';
      
      const genShingles = getShingles(genericText, 3);
      const countryShingles = getShingles(countryText, 3);
      const similarity = jaccardSimilarity(genShingles, countryShingles);
      
      duplicateRows.push({
        country_calculator_url: r.url,
        generic_calculator_url: `https://lsayartk.com${genericPath}`,
        similarity_jaccard_pct: (similarity * 100).toFixed(2) + '%',
        country_word_count: countryText.split(/\s+/).filter(Boolean).length,
        generic_word_count: genericText.split(/\s+/).filter(Boolean).length,
      });
    }
  }
  
  const dupHeaders = [
    'country_calculator_url',
    'generic_calculator_url',
    'similarity_jaccard_pct',
    'country_word_count',
    'generic_word_count',
  ];
  const dupLines = [
    dupHeaders.join(','),
    ...duplicateRows.map(r => dupHeaders.map(h => escapeCsv(r[h])).join(',')),
  ];
  fs.writeFileSync(path.join(OUTPUT_DIR, 'duplicates-after.csv'), '\uFEFF' + dupLines.join('\n'), 'utf8');
  console.log(`Saved ${duplicateRows.length} rows to seo-audit/duplicates-after.csv`);
}

runInventory();
