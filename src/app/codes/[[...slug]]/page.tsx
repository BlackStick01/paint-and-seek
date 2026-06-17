import { EnglishContentPage, generateEnglishContentMetadata, generateEnglishContentStaticParams } from '@/lib/english-route';

export function generateStaticParams() {
  return generateEnglishContentStaticParams('codes');
}

export function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
  return generateEnglishContentMetadata('codes', params);
}

export default function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  return <EnglishContentPage contentType="codes" params={params} />;
}
