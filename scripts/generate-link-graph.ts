import * as fs from 'fs';
import * as path from 'path';
import { buildLinkGraph, generateLinkGraphCsv } from '../src/seo/linkGraph';

function main() {
  const graph = buildLinkGraph();
  const csv = generateLinkGraphCsv(graph);

  const outDir = path.resolve(process.cwd(), 'seo-audit');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'link-graph.csv');
  fs.writeFileSync(outPath, csv, 'utf-8');

  console.log(`Link graph successfully generated at ${outPath}`);
  console.log(`Total nodes: ${graph.nodes.size}`);
  console.log(`Total edges: ${graph.edges.length}`);
}

main();

