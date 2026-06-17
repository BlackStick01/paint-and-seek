import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="mt-10 text-3xl font-black tracking-normal text-foreground" {...props} />,
    h3: (props) => <h3 className="mt-8 text-2xl font-extrabold tracking-normal text-foreground" {...props} />,
    h4: (props) => <h4 className="mt-6 text-xl font-extrabold tracking-normal text-foreground" {...props} />,
    p: (props) => <p className="mt-4 leading-8 text-muted-foreground" {...props} />,
    ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground" {...props} />,
    ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted-foreground" {...props} />,
    li: (props) => <li className="leading-7" {...props} />,
    a: (props) => <a className="font-bold text-primary underline-offset-4 hover:underline" {...props} />,
    strong: (props) => <strong className="font-black text-foreground" {...props} />,
    ...components
  };
}
