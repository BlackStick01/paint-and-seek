import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { AppShell } from '@/components/AppShell';
import { JsonLd } from '@/components/JsonLd';
import en from '@/locales/en.json';
import { absoluteUrl, site } from '@/lib/site';

export function EnglishShell({ children }: { children: ReactNode }) {
  setRequestLocale('en');

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/android-chrome-512x512.png'),
    image: absoluteUrl('/images/hero.webp')
  };

  return (
    <NextIntlClientProvider locale="en" messages={en}>
      <JsonLd data={organization} />
      <AppShell>{children}</AppShell>
    </NextIntlClientProvider>
  );
}
