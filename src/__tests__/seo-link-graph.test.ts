import { describe, it, expect } from 'vitest';
import { buildLinkGraph, STATIC_TRUST_PAGES } from '@/seo/linkGraph';
import { isIndexable, isCountryHubGatedIndexable } from '@/lib/seo/gating';

describe('SEO Internal Linking & Link Graph Invariants', () => {
  const graph = buildLinkGraph();

  it('should build a non-empty graph of indexable pages and directed edges', () => {
    expect(graph.nodes.size).toBeGreaterThan(100);
    expect(graph.edges.length).toBeGreaterThan(1000);
  });

  it('invariant: Click depth <= 3 for every indexable page from / via BFS (test)', () => {
    for (const [url, node] of graph.nodes) {
      expect(
        node.clickDepth,
        `Page ${url} has click depth ${node.clickDepth} > 3`
      ).toBeLessThanOrEqual(3);
    }
  });

  it('invariant: No orphans - every indexable page has inlinks >= 3 (test)', () => {
    for (const [url, node] of graph.nodes) {
      if (url === '/') continue; // Root home page is entry point
      expect(
        node.inlinks,
        `Page ${url} has only ${node.inlinks} inlinks (minimum 3 required)`
      ).toBeGreaterThanOrEqual(3);
    }
  });

  it('invariant: No dead ends - every indexable page has outlinks >= 5 (test)', () => {
    for (const [url, node] of graph.nodes) {
      expect(
        node.outlinks,
        `Page ${url} has only ${node.outlinks} outlinks (minimum 5 required)`
      ).toBeGreaterThanOrEqual(5);
    }
  });

  it('invariant: No self-links and no links to nonexistent nodes', () => {
    for (const edge of graph.edges) {
      expect(edge.fromUrl).not.toBe(edge.toUrl);
      expect(graph.nodes.has(edge.fromUrl)).toBe(true);
      expect(graph.nodes.has(edge.toUrl)).toBe(true);
    }
  });

  it('invariant: No duplicate links in the same block', () => {
    const seen = new Set<string>();
    for (const edge of graph.edges) {
      const key = `${edge.fromUrl}->${edge.toUrl}#${edge.blockType}`;
      expect(seen.has(key), `Duplicate edge found: ${key}`).toBe(false);
      seen.add(key);
    }
  });

  it('invariant: No links to unverified/noindex country pages (test)', () => {
    for (const edge of graph.edges) {
      // Check if destination is a country-calculator route
      const match = edge.toUrl.match(/^\/([a-z]{2})\/([a-z0-9-]+)$/);
      if (match) {
        const [, cc, slug] = match;
        if (slug !== 'fuel-prices') {
          const indexable = isIndexable({ countryCode: cc, calculatorSlug: slug });
          expect(
            indexable,
            `Edge points to unverified/noindex country calculator: ${edge.toUrl} from ${edge.fromUrl}`
          ).toBe(true);
        }
      }

      // Check if destination is a country hub
      const hubMatch = edge.toUrl.match(/^\/([a-z]{2})$/);
      if (hubMatch) {
        const [, cc] = hubMatch;
        const hubIndexable = isCountryHubGatedIndexable(cc);
        expect(
          hubIndexable,
          `Edge points to noindex country hub: ${edge.toUrl} from ${edge.fromUrl}`
        ).toBe(true);
      }
    }
  });
});

