import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CalendarDays, CheckCircle2, Home, PlayCircle } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { CONTENT_TYPES, NAVIGATION_CONFIG, localizeHref, normalizeContentType } from '@/config/navigation';
import { routing } from '@/i18n/routing';
import { getAllContent, getAllContentPaths, getContent } from '@/lib/content';
import { translate } from '@/lib/messages';
import { absoluteUrl, localePath, site } from '@/lib/site';

type RouteProps = {
  params: Promise<{ locale: string; slug: string[] }>;
};

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string[] }> = [];

  for (const locale of routing.locales) {
    for (const type of CONTENT_TYPES) {
      params.push({ locale, slug: [type] });
    }

    const contentPaths = await getAllContentPaths('en');
    for (const item of contentPaths) {
      params.push({ locale, slug: [item.contentType, ...item.slug] });
    }
  }

  return params;
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const contentType = normalizeContentType(slug[0] || '');
  if (!contentType) return {};

  if (slug.length === 1) {
    const path = `/${contentType}`;
    const title = translate(locale, `lists.${contentType}.title`);
    const description = translate(locale, `lists.${contentType}.description`);
    return {
      title,
      description,
      alternates: {
        canonical: localePath(locale, path),
        languages: Object.fromEntries(routing.locales.map((item) => [item, localePath(item, path)]))
      },
      openGraph: {
        title,
        description,
        url: localePath(locale, path),
        images: [{ url: absoluteUrl('/images/hero.webp'), width: 1200, height: 630 }]
      }
    };
  }

  const content = await getContent(contentType, slug.slice(1), locale);
  if (!content) return {};

  const path = `/${contentType}/${content.slug}`;
  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: localePath(locale, path),
      languages: Object.fromEntries(routing.locales.map((item) => [item, localePath(item, path)]))
    },
    openGraph: {
      title: content.metadata.title,
      description: content.metadata.description,
      url: localePath(locale, path),
      type: 'article',
      publishedTime: content.metadata.date,
      modifiedTime: content.metadata.lastModified,
      images: [{ url: absoluteUrl(content.metadata.image || '/images/hero.webp'), width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metadata.title,
      description: content.metadata.description,
      images: [absoluteUrl(content.metadata.image || '/images/hero.webp')]
    }
  };
}

export default async function SlugPage({ params }: RouteProps) {
  const { locale, slug } = await params;
  const contentType = normalizeContentType(slug[0] || '');
  if (!contentType) notFound();

  if (slug.length === 1) {
    return <NavigationPage locale={locale} contentType={contentType} />;
  }

  const content = await getContent(contentType, slug.slice(1), locale);
  if (!content) notFound();

  const MDXContent = content.MDXContent;
  const relatedItems = (await getAllContent(contentType, locale)).filter((item) => item.slug !== content.slug).slice(0, 5);
  const articlePath = `/${contentType}/${content.slug}`;
  const articleUrl = absoluteUrl(localePath(locale, articlePath));
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.metadata.title,
    description: content.metadata.description,
    image: absoluteUrl(content.metadata.image || '/images/hero.webp'),
    datePublished: content.metadata.date,
    dateModified: content.metadata.lastModified || content.metadata.date,
    author: { '@type': 'Organization', name: site.name },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/android-chrome-512x512.png') }
    },
    mainEntityOfPage: articleUrl
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl(localePath(locale, '/')) },
      { '@type': 'ListItem', position: 2, name: contentType, item: absoluteUrl(localePath(locale, `/${contentType}`)) },
      { '@type': 'ListItem', position: 3, name: content.metadata.title, item: articleUrl }
    ]
  };

  return (
    <>
      <JsonLd data={[articleJsonLd, breadcrumbJsonLd]} />
      <article className="article-page">
        <header className="article-hero">
          <div className="article-layout">
            <Breadcrumbs locale={locale} contentType={contentType} current={content.metadata.title} />
            <div className="article-title-block">
              <p className="home-template-kicker">Roblox Paint and Seek {contentType}</p>
              <h1>{content.metadata.title}</h1>
              <p>{content.metadata.description}</p>
              <div className="article-meta">
                {content.metadata.date ? (
                  <span>
                    <CalendarDays className="mr-1 inline size-4" aria-hidden="true" />
                    {content.metadata.date}
                  </span>
                ) : null}
                <span>{contentType}</span>
                <span>Paint and Seek Roblox</span>
              </div>
            </div>
          </div>
        </header>

        <div className="article-content-layout">
          <div className="article-content">
            <section className="quick-guide">
              <h2>Quick guide</h2>
              <ol>
                <li>Read the page once for the main idea before memorizing individual spots.</li>
                <li>Apply one change in a live round: paint quality, movement discipline, or route order.</li>
                <li>Return to the related pages when the next failure mode becomes obvious.</li>
              </ol>
            </section>
            <div className="article-panel" id="main-content">
              <MDXContent />
            </div>
          </div>
          <aside className="article-sidebar" aria-label="Article sidebar">
            <section className="article-sidebar-card">
              <p className="home-sidebar-kicker">On this page</p>
              <h2>Guide sections</h2>
              <a href="#quick-guide">Quick guide <ArrowRight className="size-4" aria-hidden="true" /></a>
              <a href="#main-content">Main guide <ArrowRight className="size-4" aria-hidden="true" /></a>
              <a href="#related-pages">Related pages <ArrowRight className="size-4" aria-hidden="true" /></a>
            </section>
            <section className="article-sidebar-card" id="related-pages">
              <p className="home-sidebar-kicker">Related</p>
              <h2>More {contentType}</h2>
              {relatedItems.map((item) => (
                <Link key={item.slug} href={localizeHref(locale, `/${contentType}/${item.slug}`)}>
                  {item.metadata.title} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ))}
            </section>
          </aside>
        </div>
      </article>
    </>
  );
}

async function NavigationPage({ locale, contentType }: { locale: string; contentType: NonNullable<ReturnType<typeof normalizeContentType>> }) {
  const items = await getAllContent(contentType, locale);
  const navItem = NAVIGATION_CONFIG.find((item) => item.key === contentType);
  const Icon = navItem?.icon || Home;
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: translate(locale, `lists.${contentType}.title`),
    description: translate(locale, `lists.${contentType}.description`),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.metadata.title,
      url: absoluteUrl(localePath(locale, `/${contentType}/${item.slug}`))
    }))
  };

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <section className="section-index-page">
        <header className="section-index-hero">
          <div className="section-index-layout">
            <Breadcrumbs locale={locale} contentType={contentType} />
            <div className="section-index-title-block">
              <p className="home-template-kicker">Roblox Paint and Seek {translate(locale, `nav.${contentType}`).toLowerCase()}</p>
              <h1>{translate(locale, `lists.${contentType}.title`)}</h1>
              <p>{translate(locale, `lists.${contentType}.intro`)}</p>
              <div className="section-index-stats">
                <div>
                  <strong>{items.length}</strong>
                  <span>current pages</span>
                </div>
                <div>
                  <strong>Jun 16</strong>
                  <span>web checked</span>
                </div>
                <div>
                  <strong>Roblox</strong>
                  <span>Paint and Seek</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="section-index-layout section-index-content">
          <section className="quick-guide">
            <h2>Fast learning plan</h2>
            <ul>
              <li>Begin with the page that matches the problem you feel in-game right now.</li>
              <li>Use written guides as the main teaching layer and the video as a visual companion.</li>
              <li>Diagnose the system that failed: basics, camouflage, hider discipline, seeker route order, controls, or spending.</li>
            </ul>
          </section>

          <section className="quick-guide">
            <h2 className="flex items-center gap-2">
              <PlayCircle className="size-5" aria-hidden="true" />
              A suitable YouTube watch for this hub
            </h2>
            <p>A recent general Paint and Seek gameplay upload from June 2026. Current YouTube coverage is still more raw gameplay than structured tutorial content, but it is useful for seeing role flow and round pacing in motion.</p>
            <a className="button" href="https://www.youtube.com/watch?v=Ozf7uTyBsp4" target="_blank" rel="nofollow noopener noreferrer">
              Watch gameplay guide <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </section>

          <section>
            <div className="home-section-heading">
              <p className="home-template-kicker">Guide list</p>
              <h2 className="flex items-center gap-2">
                <Icon className="size-7" aria-hidden="true" />
                All current Paint and Seek {translate(locale, `nav.${contentType}`).toLowerCase()} pages
              </h2>
              <p>Each page is written as a working teaching page, not a thin placeholder. Open the one that matches your current bottleneck.</p>
            </div>
            <div className="article-grid">
              {items.map((item, index) => (
                <Link key={item.slug} href={localizeHref(locale, `/${contentType}/${item.slug}`)} className="article-card">
                  <span>{index === 0 ? 'Start here' : item.metadata.category}</span>
                  <h3>{item.metadata.title}</h3>
                  <p>{item.metadata.description}</p>
                  <em>{translate(locale, 'shared.readMore')} →</em>
                </Link>
              ))}
            </div>
          </section>

          <section className="quick-guide">
            <h2 className="flex items-center gap-2">
              <CheckCircle2 className="size-5" aria-hidden="true" />
              Which page solves which problem
            </h2>
            <div className="article-grid">
              {items.slice(0, 4).map((item) => (
                <Link key={item.slug} href={localizeHref(locale, `/${contentType}/${item.slug}`)} className="article-card">
                  <span>Compare</span>
                  <h3>{item.metadata.title}</h3>
                  <p>{item.metadata.description}</p>
                  <em>Open topic →</em>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

function Breadcrumbs({ locale, contentType, current }: { locale: string; contentType: string; current?: string }) {
  return (
    <nav className="mb-4 flex flex-wrap gap-2 text-sm font-bold text-muted-foreground" aria-label="Breadcrumb">
      <Link className="inline-flex items-center gap-1 hover:text-primary" href={localizeHref(locale, '/')}>
        <Home className="size-4" aria-hidden="true" />
        Home
      </Link>
      <span>/</span>
      <Link className="capitalize hover:text-primary" href={localizeHref(locale, `/${contentType}`)}>
        {contentType}
      </Link>
      {current ? (
        <>
          <span>/</span>
          <span className="text-foreground">{current}</span>
        </>
      ) : null}
    </nav>
  );
}
