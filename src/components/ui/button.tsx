import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: false;
  variant?: 'default' | 'secondary' | 'ghost';
};

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-extrabold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        variant === 'default' && 'border border-primary bg-primary text-slate-950 hover:bg-primary-light',
        variant === 'secondary' && 'border border-border bg-card text-foreground hover:border-primary',
        variant === 'ghost' && 'text-foreground hover:bg-card',
        className
      )}
      {...props}
    />
  );
}
