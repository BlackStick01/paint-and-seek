'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Play, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ResponsiveLeaderboardAd } from '@/components/ads/ResponsiveLeaderboardAd';
import { CodeCopyButton } from '@/components/CodeCopyButton';
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

const youtubeEmbed = 'https://www.youtube.com/embed/Ozf7uTyBsp4?autoplay=1&rel=0';

const mapCards = [
  {
    label: 'Start here',
    title: 'House',
    description: 'House is the best first training map when you want room order, fallback spots, and simple camouflage decisions to start making sense.',
    bullets: ['Pick a side room before the main hall.', 'Match one wall and one prop edge together.'],
    href: '/maps/paint-and-seek-maps'
  },
  {
    label: 'Route discipline',
    title: 'Grocery Store',
    description: 'Open Grocery Store when you want aisle logic, endcap hiding, and seeker routes that reward staying organized under pressure.',
    bullets: ['Think in lanes, not isolated shelves.', 'Use endcaps instead of trusting open sightlines.'],
    href: '/maps/paint-and-seek-map-guide'
  },
  {
    label: 'Pressure map',
    title: 'Bank',
    description: 'Bank teaches silhouette discipline, side cover, and late-round movement on more exposed angles.',
    bullets: ['Respect open floor space early.', 'Treat side cover as a second life.'],
    href: '/maps/paint-and-seek-hiding-spots'
  },
  {
    label: 'High ceiling',
    title: 'Arcade',
    description: 'Arcade is where visual noise becomes the challenge: lighting, color clutter, and machine-bank hiding all compete for attention.',
    bullets: ['Use lighting shifts on purpose.', 'Seekers win by controlling scan order.'],
    href: '/maps/paint-and-seek-best-hiding-spots'
  }
];

const labColumns = [
  {
    label: 'Guides',
    title: 'Role guides',
    copy: 'These pages sharpen the way you think: first-match flow, paint reading, hider discipline, and seeker route control.',
    href: '/guides',
    links: [
      ['Start here', 'Beginner Guide', '/guides/paint-and-seek-beginner-guide'],
      ['Highest leverage', 'Paint Tool Mastery', '/guides/paint-and-seek-camouflage'],
      ['Role page', 'Hider Strategies', '/guides/paint-and-seek-hider-guide'],
      ['Role page', 'Seeker Strategies', '/guides/paint-and-seek-seeker-guide']
    ]
  },
  {
    label: 'Controls',
    title: 'Controls stack',
    copy: 'These control pages focus on movement rhythm, camera control, UI routing, and what to do when a button feels wrong.',
    href: '/controls',
    links: [
      ['Desktop', 'PC / Keyboard & Mouse', '/controls/paint-and-seek-pc-controls'],
      ['Touch', 'Mobile / Touch', '/controls/paint-and-seek-mobile-controls'],
      ['Gamepad', 'Console / Gamepad', '/controls/paint-and-seek-xbox-controls'],
      ['Interface', 'UI Buttons & Settings', '/controls/paint-and-seek-controls']
    ]
  }
];

export function HomePageClient() {
  const t = useTranslations();
  const locale = useLocale();
  const [videoOpen, setVideoOpen] = useState(false);
  const heroStats = t.raw('home.hero.stats') as string[];
  const snapshotItems = t.raw('home.snapshot.items') as SnapshotItem[];
  const aboutStats = t.raw('home.aboutGame.stats') as AboutStat[];
  const paragraphs = t.raw('home.aboutGame.paragraphs') as string[];
  const codes = t.raw('sidebarCodes') as SidebarCode[];

  useEffect(() => {
    document.documentElement.classList.toggle('video-modal-open', videoOpen);
    return () => document.documentElement.classList.remove('video-modal-open');
  }, [videoOpen]);

  return (
    <>
      <div className="home-template-main">
        <div className="container home-template-layout">
          <div className="home-template-primary">
            <section className="home-template-hero">
              <div className="home-template-title-row">
                <span className="home-template-kicker">{t('home.hero.eyebrow')}</span>
              </div>
              <h1>{t('home.hero.title')}</h1>
              <button className="home-template-video" type="button" aria-label="Watch gameplay video" onClick={() => setVideoOpen(true)}>
                <Image src="/images/hero.webp" alt="ROBLOX PAINT AND SEEK!" fill priority className="home-video-image" sizes="(min-width: 980px) 760px, 100vw" />
                <span className="home-video-play" aria-hidden="true">
                  <Play />
                </span>
                <span className="home-video-watch">Watch gameplay video</span>
              </button>
              <p className="home-template-lead">{t('home.hero.description')}</p>
              <div className="home-template-pills">
                {heroStats.slice(1, 3).map((item) => {
                  const [value, ...label] = item.split(' ');
                  return (
                    <span key={item} className="home-template-pill">
                      <small>{label.join(' ') || 'Paint and Seek'}</small>
                      <strong>{value}</strong>
                    </span>
                  );
                })}
              </div>
              <div className="home-template-ctas">
                <Link className="home-hero-cta home-hero-cta-start" href={localizeHref(locale, '/guides/paint-and-seek-beginner-guide')}>
                  <span className="home-hero-cta-copy">
                    <strong>{t('home.hero.primaryCta')}</strong>
                    <small>Beginner route</small>
                  </span>
                  <span className="home-hero-cta-arrow">→</span>
                </Link>
                <Link className="home-hero-cta home-hero-cta-codes" href={localizeHref(locale, '/codes')}>
                  <span className="home-hero-cta-copy">
                    <strong>{t('home.hero.secondaryCta')}</strong>
                    <small>Free rewards first</small>
                  </span>
                  <span className="home-hero-cta-arrow">→</span>
                </Link>
                <Link className="home-hero-cta home-hero-cta-maps" href={localizeHref(locale, '/maps')}>
                  <span className="home-hero-cta-copy">
                    <strong>{t('home.hero.tertiaryCta')}</strong>
                    <small>4 launch maps</small>
                  </span>
                  <span className="home-hero-cta-arrow">→</span>
                </Link>
              </div>
            </section>

            <ResponsiveLeaderboardAd />

            <section className="home-intro-grid">
              <div className="home-panel home-updates-panel">
                <div className="home-panel-header">
                  <div>
                    <p className="home-panel-kicker">{t('home.snapshot.eyebrow')}</p>
                    <h2>{t('home.snapshot.title')}</h2>
                  </div>
                  <span>Jun 16</span>
                </div>
                <div className="home-update-list">
                  {snapshotItems.map((item) => (
                    <Link key={item.title} href={localizeHref(locale, '/updates')} className="home-update-row">
                      <span className={`home-update-kind home-update-kind-${item.label.toLowerCase()}`}>{item.label}</span>
                      <time>{item.date}</time>
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </Link>
                  ))}
                </div>
                <Link className="home-update-more" href={localizeHref(locale, '/updates')}>
                  Updates <ArrowRight aria-hidden="true" />
                </Link>
              </div>

              <div className="home-panel home-start-panel">
                <div className="home-panel-header">
                  <div>
                    <p className="home-panel-kicker">{t('home.start.eyebrow')}</p>
                    <h2>{t('home.start.title')}</h2>
                  </div>
                </div>
                <ol className="home-journey-list">
                  {STARTING_POINTS.map((item) => (
                    <li key={item.key}>
                      <Link href={localizeHref(locale, item.href)} className="home-journey-link">
                        <span className="home-journey-number">{t(`home.start.cards.${item.key}.number`)}</span>
                        <span className="home-journey-copy">
                          <strong>{t(`home.start.cards.${item.key}.title`)}</strong>
                          <p>{t(`home.start.cards.${item.key}.description`)}</p>
                        </span>
                        <span className="home-journey-arrow" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section className="home-section home-popular-section">
              <div className="home-section-heading center">
                <p className="home-template-kicker">{t('home.hubs.eyebrow')}</p>
                <h2>{t('home.hubs.title')}</h2>
                <p>{t('home.hubs.description')}</p>
              </div>
              <div className="home-popular-carousel" aria-label="Main guide hubs">
                <div className="home-popular-track">
                  {[0, 1].map((set) => (
                    <div className="home-popular-set" key={set} aria-hidden={set === 1}>
                      {HOME_ROUTE_CARDS.map((card) => (
                        <Link key={`${set}-${card.key}`} className="home-popular-card" href={localizeHref(locale, card.href)}>
                          <Image src="/images/hero.webp" alt="" fill sizes="560px" />
                          <span>{card.tag}</span>
                          <strong>{t(`nav.${card.key}`)}</strong>
                          <small>{t(`home.hubs.cards.${card.key}`)}</small>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="home-section home-what-section" id="what-is-it">
              <div className="home-what-copy">
                <p className="home-template-kicker">Game Overview</p>
                <h2>{t('home.aboutGame.title')}</h2>
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="home-answer-list">
                  <article>
                    <h3>Paint and Seek starts with camouflage, not speed</h3>
                    <p>The first layer is reading surfaces well enough to disappear before the seeker reaches your corner.</p>
                  </article>
                  <article>
                    <h3>The maps are where the game really clicks</h3>
                    <p>Once House, Grocery Store, Bank, and Arcade stop feeling random, both roles become easier to read.</p>
                  </article>
                </div>
                <Link className="button" href={localizeHref(locale, '/guides')}>{t('home.aboutGame.cta')} <ArrowRight aria-hidden="true" /></Link>
              </div>
              <div className="home-what-media">
                <Image src="/images/hero.webp" alt="Paint and Seek Roblox gameplay artwork" width={720} height={405} />
                <div className="home-game-snapshot">
                  <div className="home-game-snapshot-header">
                    <h3>Game Snapshot</h3>
                    <p>Current Paint and Seek public stats</p>
                  </div>
                  <div className="home-fact-grid">
                    {aboutStats.slice(3).map((stat) => (
                      <article key={stat.label}>
                        <span>{stat.label}</span>
                        <strong>{stat.value}</strong>
                        <small>Public snapshot</small>
                      </article>
                    ))}
                  </div>
                  <p className="home-game-snapshot-source">Roblox public game, votes, and group snapshot checked Jun 18, 2026 UTC+8</p>
                </div>
              </div>
            </section>

            <section className="home-section" id="guide-index">
              <div className="home-section-heading">
                <p className="home-template-kicker">Paint and Seek guide routes</p>
                <h2>Choose your Paint and Seek starting point</h2>
                <p>These homepage routes are built from the live guide stack, so each card solves a real player problem instead of padding the page with generic overview copy.</p>
              </div>
              <div className="guide-route-picker-grid">
                {HOME_ROUTE_CARDS.map((card, index) => (
                  <Link key={card.key} href={localizeHref(locale, card.href)} className="guide-route-card">
                    <span className="guide-card-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="guide-card-label">{card.tag}</span>
                    <h2>{t(`nav.${card.key}`)}</h2>
                    <p>{t(`home.hubs.cards.${card.key}`)}</p>
                    <em>Open overview →</em>
                  </Link>
                ))}
              </div>
            </section>

            <section className="home-section" id="map-playbook">
              <div className="home-section-heading">
                <p className="home-template-kicker">Paint and Seek map playbook</p>
                <h2>Map pages built around how rounds are actually lost</h2>
                <p>Each map page answers a different failure mode. Use this playbook when you know the map name but still want a cleaner reason to open one route over another.</p>
              </div>
              <div className="guide-playbook-grid">
                {mapCards.map((card) => (
                  <Link key={card.title} href={localizeHref(locale, card.href)} className="guide-playbook-card">
                    <span>{card.label}</span>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <ul>
                      {card.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                    <em>Open guide →</em>
                  </Link>
                ))}
              </div>
            </section>

            <section className="home-section" id="execution-lab">
              <div className="home-section-heading">
                <p className="home-template-kicker">Paint and Seek execution lab</p>
                <h2>Sharpen role reads, paint choices, and control confidence</h2>
                <p>Use this section when the game already makes sense conceptually, but your hands, paint choices, or role decisions still break down once a live round starts.</p>
              </div>
              <div className="guide-lab-grid">
                {labColumns.map((column) => (
                  <article className="guide-lab-column" key={column.title}>
                    <div className="guide-lab-header">
                      <span>{column.label}</span>
                      <h3>{column.title}</h3>
                      <p>{column.copy}</p>
                      <Link href={localizeHref(locale, column.href)}>Open overview →</Link>
                    </div>
                    <div className="guide-lab-link-list">
                      {column.links.map(([label, title, href]) => (
                        <Link key={title} className="guide-lab-link" href={localizeHref(locale, href)}>
                          <span>{label}</span>
                          <strong>{title}</strong>
                          <small>Use this when that layer is the one costing your live rounds.</small>
                        </Link>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="home-section" id="economy-loop">
              <div className="home-section-heading">
                <p className="home-template-kicker">Paint and Seek economy loop</p>
                <h2>Build a smarter reward path before you buy for style</h2>
                <p>The clean order is simple: claim the newest codes, understand how Coins arrive, learn the shop lanes, and only then start making personality purchases.</p>
              </div>
              <div className="guide-reward-shop-layout">
                <article className="guide-code-feature">
                  <span>Codes</span>
                  <h3>Current codes</h3>
                  <p>Use the code route first so your real balance is clear before you spend on cosmetics, crates, or perk rolls.</p>
                  <div className="guide-code-rewards">
                    {codes.map((item) => (
                      <div key={item.code}>
                        <strong>{item.code}</strong>
                        <small>{item.reward}</small>
                      </div>
                    ))}
                  </div>
                  <Link className="text-link" href={localizeHref(locale, '/codes')}>Check active codes →</Link>
                </article>
                <div className="guide-priority-strip">
                  {['Codes come before shopping', 'Coins work better with a buffer', 'Spend on the problem you actually have'].map((title, index) => (
                    <article key={title}>
                      <span>Step {index + 1}</span>
                      <strong>{title}</strong>
                      <p>{index === 0 ? 'Let codes raise your real balance first.' : index === 1 ? 'Build a reserve through codes and normal rounds.' : 'Guides or controls often matter more than another cosmetic lane.'}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="home-section">
              <div className="home-bottom-cta">
                <h2>{t('home.finalCta.title')}</h2>
                <p>{t('home.finalCta.description')}</p>
                <div className="home-template-ctas">
                  <Link className="button" href={localizeHref(locale, '/guides')}>{t('home.finalCta.primary')} <ArrowRight aria-hidden="true" /></Link>
                  <a className="button secondary" href="https://www.roblox.com/games/106061778438309/Paint-and-Seek" rel="nofollow noopener noreferrer" target="_blank">
                    {t('home.finalCta.secondary')} <ArrowRight aria-hidden="true" />
                  </a>
                </div>
              </div>
            </section>
          </div>

          <aside className="home-template-sidebar" aria-label="Paint and Seek sidebar">
            <section className="home-sidebar-block home-sidebar-nav-card">
              <p className="home-sidebar-kicker">{t('shared.wikiNavigation')}</p>
              <h2>Primary navigation</h2>
              <nav className="wiki-navigation-list">
                {HOME_ROUTE_CARDS.map((card) => (
                  <Link key={card.key} href={localizeHref(locale, card.href)}>
                    <span>{t(`nav.${card.key}`)}</span>
                    <strong>{card.key === 'codes' ? '1' : card.key === 'guides' ? '5' : '6'}</strong>
                  </Link>
                ))}
              </nav>
            </section>
            <section className="home-sidebar-block">
              <p className="home-sidebar-kicker">{t('shared.activeCodes')}</p>
              <h2>{t('shared.activeCodes')}</h2>
              <div className="code-grid">
                {codes.map((item) => (
                  <div key={item.code} className="sidebar-code-card">
                    <span>
                      <strong>{item.code}</strong>
                      <em>{item.reward}</em>
                    </span>
                    <CodeCopyButton code={item.code} className="sidebar-code-copy" />
                  </div>
                ))}
              </div>
              <Link className="home-update-more" href={localizeHref(locale, '/codes')}>{t('shared.viewAllCodes')} <ArrowRight aria-hidden="true" /></Link>
            </section>
            <section className="home-sidebar-block">
              <p className="home-sidebar-kicker">Official Roblox page</p>
              <h2>Paint and Seek</h2>
              <a className="home-sidebar-media" href="https://www.roblox.com/games/106061778438309/Paint-and-Seek" rel="nofollow noopener noreferrer" target="_blank">
                <Image src="/images/hero.webp" alt="Paint and Seek Roblox" fill sizes="300px" />
                <span>Open official game</span>
              </a>
            </section>
          </aside>
        </div>
      </div>

      {videoOpen ? (
        <div className="home-video-modal" role="dialog" aria-modal="true" aria-label="Paint and Seek gameplay video">
          <button className="home-video-backdrop" type="button" aria-label="Close video" onClick={() => setVideoOpen(false)} />
          <div className="home-video-dialog" tabIndex={-1}>
            <button className="home-video-close" type="button" aria-label="Close video" onClick={() => setVideoOpen(false)}>
              <X aria-hidden="true" />
            </button>
            <iframe
              className="home-video-frame"
              src={youtubeEmbed}
              title="ROBLOX PAINT AND SEEK!"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
