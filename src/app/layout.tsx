import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { absoluteUrl, site } from '@/lib/site';

const ogImage = absoluteUrl(site.image);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: {
    icon: [
      { url: '/google-favicon.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' }
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }]
  },
  openGraph: {
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Paint and Seek Wiki codes, maps and camouflage guide'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogImage]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z6FSBQFFBK" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Z6FSBQFFBK');
`
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
