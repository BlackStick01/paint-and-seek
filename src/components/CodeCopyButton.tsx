'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

type CodeCopyButtonProps = {
  code: string;
  className?: string;
};

export function CodeCopyButton({ code, className }: CodeCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button className={className || 'code-copy-button'} type="button" onClick={copyCode} aria-label={`Copy ${code}`}>
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
