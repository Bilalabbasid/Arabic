import { describe, it, expect } from 'vitest';
import { runFreshnessCheck } from '../../scripts/check-stale';
import sitemap from '@/app/sitemap';
import { metadata } from '@/app/changelog/page';

describe('Phase 5: Freshness & Legislative Changelog', () => {
  it('runFreshnessCheck verifies all 22 countries with 0 stale rules', () => {
    const result = runFreshnessCheck(new Date('2026-11-02T06:00:00Z'));
    expect(result.totalRulesChecked).toBe(198); // 22 countries * 9 rule categories
    expect(result.verifiedCount).toBeGreaterThanOrEqual(115);
    expect(result.staleRules.length).toBe(0);
  });

  it('changelog page metadata has proper title, canonical, and description', () => {
    expect(metadata.title).toContain('سجل التحديثات التشريعية');
    expect(metadata.description).toBeTruthy();
    expect(metadata.alternates?.canonical).toBe('https://lsayartk.com/changelog');
  });

  it('sitemap includes /changelog URL with canonical apex format', () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain('https://lsayartk.com/changelog');
  });
});
