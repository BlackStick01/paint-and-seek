import type { Metadata } from 'next';
import { HomePageClient } from './HomePageClient';
import { JsonLd } from '@/components/JsonLd';
import { translate } from '@/lib/messages';
import { absoluteUrl, localePath, site } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = translate(locale, 'home.meta.title');
  const description = translate(locale, 'home.meta.description');

  return {
    title,
    description,
    alternates: {
      canonical: localePath(locale, '/')
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(localePath(locale, '/')),
      images: [
        {
          url: absoluteUrl(site.image),
          width: 1200,
          height: 630,
          alt: 'Paint and Seek Wiki codes, maps and camouflage guide'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      images: [absoluteUrl(site.image)]
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
    image: absoluteUrl(site.image)
  };

  return (
    <>
      <JsonLd data={website} />
      <HomePageClient />
    </>
  );
}
