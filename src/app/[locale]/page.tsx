import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HomePageClient } from './HomePageClient';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl, localePath, site } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: localePath(locale, '/')
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: localePath(locale, '/'),
      images: [{ url: absoluteUrl('/images/hero.webp'), width: 1200, height: 630 }]
    }
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: absoluteUrl(localePath(locale, '/')),
    description: site.description,
    image: absoluteUrl('/images/hero.webp')
  };

  return (
    <>
      <JsonLd data={website} />
      <HomePageClient />
    </>
  );
}
