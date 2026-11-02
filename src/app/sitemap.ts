import { MetadataRoute } from 'next';
import { getAllSitemapEntries } from '@/seo/sitemaps';

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllSitemapEntries();
}
