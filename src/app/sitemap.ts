import type { MetadataRoute } from 'next';
import { CONTENT_TYPES } from '@/config/navigation';
import { routing } from '@/i18n/routing';
import { getAllContentPaths } from '@/lib/content';
import { absoluteUrl, localePath } from '@/lib/site';

export const dynamic = 'force-static';

const staticPages = ['/', '/about', '/privacy-policy', '/terms-of-service', '/copyright'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const page of staticPages) {
      entries.push({
        url: absoluteUrl(localePath(locale, page)),
        lastModified: now,
        changeFrequency: page === '/' ? 'daily' : 'yearly',
        priority: page === '/' ? 1 : 0.3
      });
    }

    for (const type of CONTENT_TYPES) {
      entries.push({
        url: absoluteUrl(localePath(locale, `/${type}`)),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7
      });
    }

    const contentPaths = await getAllContentPaths('en');
    for (const item of contentPaths) {
      entries.push({
        url: absoluteUrl(localePath(locale, `/${item.contentType}/${item.slug.join('/')}`)),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8
      });
    }
  }

  return entries;
}
