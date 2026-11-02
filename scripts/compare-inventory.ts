import fs from 'fs';
import path from 'path';

function parseCsv(filename: string) {
  const content = fs.readFileSync(path.join('seo-audit', filename), 'utf8').replace(/^\uFEFF/, '');
  const lines = content.split('\n').filter(l => l.trim().length > 0);
  const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, ''));
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    // Basic CSV row parse
    const matches = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
    // Or regex split
    const rowObj: Record<string, string> = {};
    const values: string[] = [];
    let inQuotes = false;
    let currVal = '';
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      if (char === '"') {
        if (inQuotes && lines[i][j + 1] === '"') {
          currVal += '"';
          j++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(currVal);
        currVal = '';
      } else {
        currVal += char;
      }
    }
    values.push(currVal);

    headers.forEach((h, idx) => {
      rowObj[h] = values[idx] || '';
    });
    rows.push(rowObj);
  }
  return rows;
}

const beforeRows = parseCsv('inventory.csv');
const afterRows = parseCsv('inventory-after.csv');

console.log(`Before rows count: ${beforeRows.length}`);
console.log(`After rows count: ${afterRows.length}`);

// Breakdown by type
function getBreakdown(rows: Record<string, string>[]) {
  const byType: Record<string, { total: number; indexable: number; inSitemap: number }> = {};
  for (const r of rows) {
    const t = r.type || 'unknown';
    if (!byType[t]) byType[t] = { total: 0, indexable: 0, inSitemap: 0 };
    byType[t].total++;
    const isIndexable = !r.robots_meta?.includes('noindex');
    if (isIndexable) byType[t].indexable++;
    if (r.in_sitemap === 'yes') byType[t].inSitemap++;
  }
  return byType;
}

console.log('--- Before Breakdown ---');
console.table(getBreakdown(beforeRows));

console.log('--- After Breakdown ---');
console.table(getBreakdown(afterRows));

// Duplicates comparison
const dupAfter = fs.readFileSync('seo-audit/duplicates-after.csv', 'utf8').trim().split('\n');
console.log(`Duplicates rows after: ${dupAfter.length - 1}`);

// Jaccard similarity stats
const simMatches = dupAfter.slice(1).map(l => {
  const parts = l.split(',');
  return parseFloat(parts[2]?.replace(/["%]/g, '') || '0');
});
const avgSim = simMatches.reduce((a, b) => a + b, 0) / simMatches.length;
console.log(`Average Jaccard similarity to generic calculator: ${avgSim.toFixed(2)}%`);
