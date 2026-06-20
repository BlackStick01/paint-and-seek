import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import { AppShell } from '@/components/AppShell';
import { JsonLd } from '@/components/JsonLd';
import { routing, type Locale } from '@/i18n/routing';
import { getLocaleMessages } from '@/lib/messages';
import { absoluteUrl, site } from '@/lib/site';

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();

  const title = 'Paint and Seek Wiki — Codes, Maps, Perks & Strategies';
  const description = site.description;
  const image = absoluteUrl(site.image);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s | ${site.name}`
    },
    description,
    alternates: {
      canonical: locale === 'en' ? '/' : `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((item) => [item, item === 'en' ? '/' : `/${item}`]))
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(locale === 'en' ? '/' : `/${locale}`),
      siteName: site.name,
      images: [{ url: image, width: 1200, height: 630, alt: 'Paint and Seek Wiki codes, maps and camouflage guide' }],
      locale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    },
    icons: {
      icon: [
        { url: '/google-favicon.png', type: 'image/png', sizes: '48x48' },
        { url: '/favicon.ico' },
        { url: '/icon.png', type: 'image/png', sizes: '512x512' }
      ],
      shortcut: ['/favicon.ico'],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }]
    },
    manifest: '/manifest.json'
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const messages = getLocaleMessages(locale);
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: absoluteUrl(locale === 'en' ? '/' : `/${locale}`),
    logo: absoluteUrl('/icon.png'),
    image: absoluteUrl(site.image)
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <JsonLd data={organization} />
      <AppShell>{children}</AppShell>
    </NextIntlClientProvider>
  );
}
