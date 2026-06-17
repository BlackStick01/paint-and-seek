import { EnglishContentPage, generateEnglishContentMetadata, generateEnglishContentStaticParams } from '@/lib/english-route';

export function generateStaticParams() {
  return generateEnglishContentStaticParams('community');
}

export function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
  return generateEnglishContentMetadata('community', params);
}

export default function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  return <EnglishContentPage contentType="community" params={params} />;
}
