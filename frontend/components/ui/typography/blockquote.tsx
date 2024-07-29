import { ReactNode } from 'react';

export function TypographyBlockquote({ children }: { children: ReactNode }) {
  return <blockquote className="border-l-2 pl-6 italic">{children}</blockquote>;
}
