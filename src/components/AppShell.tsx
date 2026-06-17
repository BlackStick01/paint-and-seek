'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { BookOpen, ChevronDown, ExternalLink, Languages } from 'lucide-react';
import { NAVIGATION_CONFIG, localizeHref } from '@/config/navigation';
import { routing } from '@/i18n/routing';

type AppShellProps = {
  children: React.ReactNode;
};

const languageLabels: Record<string, string> = {
  en: 'English EN',
  es: 'Español ES',
  pt: 'Português PT',
  id: 'Bahasa Indonesia ID'
};

export function AppShell({ children }: AppShellProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <>
      <header className="wiki-shell py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <Link href={localizeHref(locale, '/')} className="flex min-w-0 items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-md border border-primary bg-gradient-to-br from-primary to-primary-light text-lg font-black text-slate-950">
              P
            </span>
            <span className="min-w-0">
              <strong className="block truncate text-base font-black">{t('nav.brand')}</strong>
              <small className="block text-xs font-bold text-muted-foreground">Fan guide</small>
            </span>
          </Link>

          <nav className="grid gap-2 lg:max-w-4xl">
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {NAVIGATION_CONFIG.map((item) => (
                <Link
                  key={item.key}
                  href={localizeHref(locale, item.path)}
                  className="inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-card/80 px-3 text-sm font-extrabold text-foreground hover:border-primary"
                >
                  <item.icon className="size-4" aria-hidden="true" />
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </div>
            <details className="group self-start rounded-md border border-border bg-card/70 px-3 py-2 text-sm font-bold text-muted-foreground lg:self-end">
              <summary className="flex cursor-pointer list-none items-center gap-2">
                <Languages className="size-4 text-primary" aria-hidden="true" />
                {locale.toUpperCase()}
                <ChevronDown className="size-4 transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="mt-2 flex flex-wrap gap-2">
                {routing.locales.map((item) => (
                  <Link key={item} href={item === 'en' ? '/' : `/${item}`} className="rounded border border-border px-2 py-1 hover:border-primary">
                    {languageLabels[item]}
                  </Link>
                ))}
              </div>
            </details>
          </nav>
        </div>
      </header>

      <main className="wiki-shell pb-12">{children}</main>

      <footer className="wiki-shell grid gap-5 border-t border-border py-8 md:grid-cols-4">
        <section className="md:col-span-1">
          <p className="mb-2 text-xs font-black uppercase text-primary">Fan guide</p>
          <h2 className="text-xl font-black">{t('footer.aboutTitle')}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{t('footer.about')}</p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-black">{t('nav.guides')}</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {NAVIGATION_CONFIG.slice(0, 6).map((item) => (
              <li key={item.key}>
                <Link className="hover:text-primary" href={localizeHref(locale, item.path)}>
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-black">Resources</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a className="inline-flex items-center gap-1 hover:text-primary" href="https://www.roblox.com/" rel="nofollow noopener noreferrer" target="_blank">
                {t('footer.playGame')} <ExternalLink className="size-3" aria-hidden="true" />
              </a>
            </li>
            <li>
              <Link className="hover:text-primary" href={localizeHref(locale, '/community')}>
                {t('footer.officialDiscord')}
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href={localizeHref(locale, '/sitemap.xml')}>
                Sitemap
              </Link>
            </li>
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-black">Site</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {['about', 'privacy-policy', 'terms-of-service', 'copyright'].map((slug) => (
              <li key={slug}>
                <Link className="hover:text-primary" href={localizeHref(locale, `/${slug}`)}>
                  {slug.replace(/-/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <p className="border-t border-border pt-4 text-sm text-muted-foreground md:col-span-4">
          <BookOpen className="mr-2 inline size-4 text-primary" aria-hidden="true" />
          {t('footer.copyright')}
        </p>
      </footer>
    </>
  );
}
