import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const withMDX = createMDX({
  extension: /\.mdx?$/
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next-paint-seek',
  pageExtensions: ['ts', 'tsx', 'mdx'],
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com'
      }
    ]
  }
};

export default withNextIntl(withMDX(nextConfig));
