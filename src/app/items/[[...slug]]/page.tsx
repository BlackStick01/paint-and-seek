import { EnglishContentPage, generateEnglishContentMetadata, generateEnglishContentStaticParams } from '@/lib/english-route';

export function generateStaticParams() {
  return generateEnglishContentStaticParams('items');
}

export function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
  return generateEnglishContentMetadata('items', params);
}

export default function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  return <EnglishContentPage contentType="items" params={params} />;
}
