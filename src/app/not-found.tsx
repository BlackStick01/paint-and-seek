import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en" className="dark">
      <body>
        <main className="wiki-shell py-8">
          <section className="prose-panel">
            <h1 className="text-4xl font-black">Page not found</h1>
            <p className="mt-4 text-muted-foreground">This Paint and Seek wiki page is not available yet.</p>
            <Link className="mt-6 inline-flex rounded-md border border-primary bg-primary px-4 py-3 text-sm font-black text-slate-950" href="/">
              Back to Paint and Seek Wiki
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
