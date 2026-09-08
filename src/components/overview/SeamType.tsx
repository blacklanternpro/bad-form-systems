import type { ReactNode } from "react";

interface SeamTypeProps {
  children: ReactNode;
}

export function SeamType({ children }: SeamTypeProps) {
  return (
    <div className="type-seam relative isolate translate-y-4 lg:translate-y-6">
      <div className="type-seam-burst" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
