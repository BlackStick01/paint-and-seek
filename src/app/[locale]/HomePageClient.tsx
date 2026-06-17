'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react';
import { HOME_ROUTE_CARDS, STARTING_POINTS, localizeHref } from '@/config/navigation';

type SnapshotItem = {
  label: string;
  date: string;
  title: string;
  description: string;
};

type AboutStat = {
  label: string;
  value: string;
};

type SidebarCode = {
  code: string;
  reward: string;
};

export function HomePageClient() {
  const t = useTranslations();
  const locale = useLocale();
  const heroStats = t.raw('home.hero.stats') as string[];
  const snapshotItems = t.raw('home.snapshot.items') as SnapshotItem[];
  const aboutStats = t.raw('home.aboutGame.stats') as AboutStat[];
  const paragraphs = t.raw('home.aboutGame.paragraphs') as string[];
  const codes = t.raw('sidebarCodes') as SidebarCode[];

  return (
    <div className="space-y-8">
      <section className="grid gap-5 py-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="wiki-card relative overflow-hidden p-7 sm:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--nav-theme)/0.13),transparent_45%),repeating-linear-gradient(0deg,hsl(0_0%_100%/0.04),hsl(0_0%_100%/0.04)_1px,transparent_1px,transparent_9px)]" />
          <div className="relative">
            <p className="text-sm font-black uppercase text-primary">{t('home.hero.eyebrow')}</p>
            <h1 className="mt-4 max-w-[13ch] text-5xl font-black leading-none tracking-normal sm:text-7xl lg:text-8xl">
              {t('home.hero.title')}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{t('home.hero.description')}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {heroStats.map((item) => (
                <span key={item} className="rounded-md border border-border bg-background/45 px-3 py-2 text-sm font-bold text-muted-foreground">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={localizeHref(locale, '/guides/paint-and-seek-beginner-guide')} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-primary bg-primary px-4 text-sm font-black text-slate-950">
                {t('home.hero.primaryCta')} <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href={localizeHref(locale, '/codes')} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-black hover:border-primary">
                {t('home.hero.secondaryCta')} <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
              </Link>
              <Link href={localizeHref(locale, '/maps')} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-black hover:border-primary">
                {t('home.hero.tertiaryCta')} <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <div className="wiki-card overflow-hidden">
          <div className="relative min-h-[320px] lg:h-full">
            <Image src="/images/hero.webp" alt="ROBLOX PAINT AND SEEK!" fill priority className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-background/80 p-4 text-sm font-black backdrop-blur">
              <PlayCircle className="size-5 text-primary" aria-hidden="true" />
              {t('home.hero.videoLabel')}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-black uppercase text-primary">{t('home.snapshot.eyebrow')}</p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">{t('home.snapshot.title')}</h2>
        </div>
        <div className="grid gap-3">
          {snapshotItems.map((item) => (
            <Link key={item.title} href={localizeHref(locale, '/updates')} className="wiki-card wiki-link-card grid gap-2 p-4">
              <span className="text-xs font-black uppercase text-primary">{item.label} · {item.date}</span>
              <strong>{item.title}</strong>
              <span className="text-sm leading-6 text-muted-foreground">{item.description}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-4">
          <p className="text-sm font-black uppercase text-primary">{t('home.start.eyebrow')}</p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">{t('home.start.title')}</h2>
        </div>
        {STARTING_POINTS.map((item) => (
          <Link key={item.key} href={localizeHref(locale, item.href)} className="wiki-card wiki-link-card grid gap-3 p-5">
            <span className="grid size-9 place-items-center rounded-md border border-primary text-sm font-black text-primary">
              {t(`home.start.cards.${item.key}.number`)}
            </span>
            <item.icon className="size-6 text-primary" aria-hidden="true" />
            <h3 className="text-xl font-black">{t(`home.start.cards.${item.key}.title`)}</h3>
            <p className="text-sm leading-6 text-muted-foreground">{t(`home.start.cards.${item.key}.description`)}</p>
          </Link>
        ))}
      </section>

      <section>
        <div className="mb-4 grid gap-4 lg:grid-cols-[390px_1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase text-primary">{t('home.hubs.eyebrow')}</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">{t('home.hubs.title')}</h2>
          </div>
          <p className="text-muted-foreground">{t('home.hubs.description')}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {HOME_ROUTE_CARDS.map((card) => (
            <Link key={card.key} href={localizeHref(locale, card.href)} className="wiki-card wiki-link-card grid gap-3 p-5">
              <span className="text-xs font-black uppercase text-primary">{card.tag}</span>
              <card.icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="text-xl font-black">{t(`nav.${card.key}`)}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{t(`home.hubs.cards.${card.key}`)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="prose-panel">
          <h2 className="text-3xl font-black sm:text-4xl">{t('home.aboutGame.title')}</h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 leading-8 text-muted-foreground">{paragraph}</p>
          ))}
          <Link href={localizeHref(locale, '/guides')} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md border border-primary bg-primary px-4 text-sm font-black text-slate-950">
            {t('home.aboutGame.cta')} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <aside className="grid gap-4">
          <div className="wiki-card p-5">
            <h2 className="text-xl font-black">Game Snapshot</h2>
            <dl className="mt-4 grid gap-3">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between gap-4 border-b border-border pb-2 last:border-0">
                  <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                  <dd className="font-black text-primary-light">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="wiki-card p-5">
            <h2 className="text-xl font-black">{t('shared.activeCodes')}</h2>
            <div className="mt-4 grid gap-2">
              {codes.map((item) => (
                <div key={item.code} className="flex items-center justify-between gap-3 rounded-md border border-border bg-background/45 p-3">
                  <code className="font-black text-primary-light">{item.code}</code>
                  <span className="text-xs font-bold text-muted-foreground">{item.reward}</span>
                </div>
              ))}
            </div>
            <Link href={localizeHref(locale, '/codes')} className="mt-4 inline-flex text-sm font-black text-primary">
              {t('shared.viewAllCodes')} <ArrowRight className="ml-1 size-4" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </section>

      <section className="prose-panel">
        <h2 className="text-3xl font-black sm:text-4xl">{t('home.finalCta.title')}</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">{t('home.finalCta.description')}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={localizeHref(locale, '/guides')} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-primary bg-primary px-4 text-sm font-black text-slate-950">
            {t('home.finalCta.primary')} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <a href="https://www.roblox.com/" rel="nofollow noopener noreferrer" target="_blank" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-black hover:border-primary">
            {t('home.finalCta.secondary')} <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
