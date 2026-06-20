'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { AdFrame } from './AdFrame';

export function DismissibleStickyBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="sticky top-16 z-30 py-2">
      <div className="relative mx-auto max-w-4xl px-4">
        <div className="mx-auto flex w-[320px] max-w-full justify-center">
          <AdFrame src="/ads/banner-320x50.html" width={320} height={50} title="Advertisement" />
        </div>

        <button
          type="button"
          aria-label="Close advertisement"
          onClick={() => setDismissed(true)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/90 p-1 text-black/60 shadow-sm hover:text-black"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
