"use client";

import { useEffect, type ReactNode } from "react";

interface HomeDeckProps {
  children: ReactNode;
}

export function HomeDeck({ children }: HomeDeckProps) {
  useEffect(() => {
    document.documentElement.classList.add("home-deck");
    return () => {
      document.documentElement.classList.remove("home-deck");
    };
  }, []);

  return <div className="home-deck-sequence">{children}</div>;
}
