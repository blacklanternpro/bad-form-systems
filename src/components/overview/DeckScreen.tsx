import type { ReactNode } from "react";

interface DeckScreenProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function DeckScreen({ children, className = "", id }: DeckScreenProps) {
  return (
    <section
      id={id}
      className={`deck-screen snap-start ${className}`.trim()}
    >
      {children}
    </section>
  );
}
