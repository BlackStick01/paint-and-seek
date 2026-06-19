'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUp, ChevronDown, ExternalLink, Globe2, Play } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { NAVIGATION_CONFIG, localizeHref } from '@/config/navigation';
import { routing } from '@/i18n/routing';

type AppShellProps = {
  children: React.ReactNode;
};

const languageLabels: Record<string, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português (Brasil)',
  id: 'Bahasa Indonesia'
};

const dropdownLinks: Record<string, Array<{ label: string; href: string }>> = {
  maps: [
    { label: 'House', href: '/maps/paint-and-seek-maps' },
    { label: 'Grocery Store', href: '/maps/paint-and-seek-map-guide' },
    { label: 'Bank', href: '/maps/paint-and-seek-hiding-spots' },
    { label: 'Arcade', href: '/maps/paint-and-seek-best-hiding-spots' }
  ],
  guides: [
    { label: 'Beginner Guide', href: '/guides/paint-and-seek-beginner-guide' },
    { label: 'Paint Tool Mastery', href: '/guides/paint-and-seek-camouflage' },
    { label: 'Hider Strategies', href: '/guides/paint-and-seek-hider-guide' },
    { label: 'Seeker Strategies', href: '/guides/paint-and-seek-seeker-guide' }
  ],
  items: [
    { label: 'How to Earn Coins', href: '/items/paint-and-seek-coins' },
    { label: 'Shop Categories', href: '/items/paint-and-seek-gun-skins' },
    { label: 'Skins & Titles', href: '/items/paint-and-seek-gun-skins' },
    { label: 'Spending Priority', href: '/items/paint-and-seek-coins' }
  ],
  perks: [
    { label: 'How Perks Work', href: '/perks/paint-and-seek-coins' },
    { label: 'Hider Perks', href: '/perks/paint-and-seek-gun-skins' },
    { label: 'Seeker Perks', href: '/perks/paint-and-seek-coins' },
    { label: 'Perks vs Skins', href: '/perks/paint-and-seek-gun-skins' }
  ],
  controls: [
    { label: 'PC / Keyboard & Mouse', href: '/controls/paint-and-seek-pc-controls' },
    { label: 'Mobile / Touch', href: '/controls/paint-and-seek-mobile-controls' },
    { label: 'Console / Gamepad', href: '/controls/paint-and-seek-xbox-controls' },
    { label: 'UI Buttons & Settings', href: '/controls/paint-and-seek-controls' }
  ],
  updates: [
    { label: 'Launch Info', href: '/updates/paint-and-seek-update-log' },
    { label: 'Update Log', href: '/updates/paint-and-seek-update-log' },
    { label: 'Hotfixes & Code Impact', href: '/updates/paint-and-seek-discord' },
    { label: 'Known Issues & Status', href: '/updates/paint-and-seek-group' }
  ],
  community: [
    { label: 'Official Links', href: '/community/paint-and-seek-group' },
    { label: 'Discord Server', href: '/community/paint-and-seek-discord' },
    { label: 'How to Verify Links', href: '/community/paint-and-seek-group' },
    { label: 'Group Requirements', href: '/community/paint-and-seek-group' }
  ]
};

export function AppShell({ children }: AppShellProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const currentPath = useMemo(() => {
    if (!pathname) return '/';
    for (const item of routing.locales) {
      if (pathname === `/${item}`) return '/';
      if (pathname.startsWith(`/${item}/`)) return pathname.replace(`/${item}`, '') || '/';
    }
    return pathname;
  }, [pathname]);

  return (
    <div className="page-shell home-template-page">
      <header className="site-header">
        <nav className="site-nav" aria-label="Primary navigation" onMouseLeave={() => setOpenMenu(null)}>
          <Link href={localizeHref(locale, '/')} className="brand" aria-label="Paint and Seek Wiki home">
            <span className="brand-mark" aria-hidden="true">
              <img src="/images/hero.webp" alt="" width="36" height="36" />
            </span>
            <span className="brand-text">
              <strong>Paint and Seek</strong>
              <small>Codes and Guides</small>
            </span>
          </Link>

          <div className="nav-scroll" role="list">
            {NAVIGATION_CONFIG.map((item) => {
              const links = dropdownLinks[item.key] || [];
              const hasDropdown = links.length > 0 && item.key !== 'codes';
              const active = currentPath === item.path || currentPath.startsWith(`${item.path}/`);
              return (
                <div key={item.key} className={`nav-item ${openMenu === item.key ? 'is-open' : ''}`} role="listitem">
                  {hasDropdown ? (
                    <button
                      className={`nav-link ${active ? 'is-active' : ''}`}
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={openMenu === item.key}
                      onClick={() => setOpenMenu(openMenu === item.key ? null : item.key)}
                      onMouseEnter={() => setOpenMenu(item.key)}
                    >
                      <span>{t(`nav.${item.key}`)}</span>
                      <ChevronDown className="nav-caret" aria-hidden="true" />
                    </button>
                  ) : (
                    <Link className={`nav-link nav-link-direct ${active ? 'is-active' : ''}`} href={localizeHref(locale, item.path)}>
                      <span>{t(`nav.${item.key}`)}</span>
                    </Link>
                  )}
                  {hasDropdown ? (
                    <div className="nav-dropdown primary-dropdown" aria-label={`${t(`nav.${item.key}`)} links`}>
                      <div className="nav-dropdown-list">
                        {links.map((link) => (
                          <Link key={link.label} className="nav-dropdown-link" href={localizeHref(locale, link.href)}>
                            <ExternalLink className="dropdown-arrow" aria-hidden="true" />
                            <span>{link.label}</span>
                          </Link>
                        ))}
                      </div>
                      <Link className="nav-dropdown-readmore" href={localizeHref(locale, item.path)}>
                        <span>{t(`nav.${item.key}`)} overview</span>
                        <ExternalLink className="dropdown-arrow" aria-hidden="true" />
                      </Link>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="site-actions">
            <div className={`nav-item action-item ${openMenu === 'language' ? 'is-open' : ''}`}>
              <button
                type="button"
                className="nav-action language-button"
                aria-haspopup="true"
                aria-expanded={openMenu === 'language'}
                onClick={() => setOpenMenu(openMenu === 'language' ? null : 'language')}
              >
                <Globe2 className="action-icon" aria-hidden="true" />
                <span>{locale.toUpperCase()}</span>
                <ChevronDown className="nav-caret" aria-hidden="true" />
              </button>
              <div className="nav-dropdown action-dropdown language-dropdown">
                {routing.locales.map((item) => (
                  <Link key={item} href={item === 'en' ? '/' : `/${item}`} aria-current={item === locale}>
                    <span>{languageLabels[item]}</span>
                    <strong>{item.toUpperCase()}</strong>
                  </Link>
                ))}
              </div>
            </div>
            <a
              className="nav-action play-button"
              href="https://www.roblox.com/games/106061778438309/Paint-and-Seek"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <Play className="action-icon" aria-hidden="true" />
              <span>Play Game</span>
            </a>
          </div>
        </nav>
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <p className="footer-kicker">Fan guide</p>
              <h2 className="footer-title">{t('footer.aboutTitle')}</h2>
              <p>{t('footer.about')}</p>
            </div>
            <div className="footer-column">
              <h2>Guides</h2>
              <ul>
                {NAVIGATION_CONFIG.map((item) => (
                  <li key={item.key}>
                    <Link href={localizeHref(locale, item.path)}>Paint and Seek {t(`nav.${item.key}`)}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-column">
              <h2>Resources</h2>
              <ul>
                <li>
                  <a href="https://www.roblox.com/games/106061778438309/Paint-and-Seek" target="_blank" rel="nofollow noopener noreferrer">
                    {t('footer.playGame')}
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=Ozf7uTyBsp4" target="_blank" rel="nofollow noopener noreferrer">
                    {t('footer.officialYoutube')}
                  </a>
                </li>
                <li>
                  <Link href={localizeHref(locale, '/sitemap.xml')}>Sitemap</Link>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h2>Site</h2>
              <ul>
                {['about', 'privacy-policy', 'terms-of-service', 'copyright'].map((slug) => (
                  <li key={slug}>
                    <Link href={localizeHref(locale, `/${slug}`)}>{slug.replace(/-/g, ' ')}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Unofficial fan guide. Not affiliated with Roblox, Ikitai Studios, YouTube, Roblox Den, Destructoid, or any linked platform.</p>
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>

      <button
        className={`back-to-top ${showTop ? 'is-visible' : ''}`}
        type="button"
        aria-label="Back to top"
        title="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp aria-hidden="true" />
      </button>
    </div>
  );
}
