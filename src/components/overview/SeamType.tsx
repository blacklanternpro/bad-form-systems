import type { ReactNode } from "react";

interface SeamTypeProps {
  children: ReactNode;
}

export function SeamType({ children }: SeamTypeProps) {
  return (
    <div className="type-seam relative isolate -mt-24 lg:-mt-36">
      <div className="type-seam-burst" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
