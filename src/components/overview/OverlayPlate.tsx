import type { ReactNode } from "react";

type OverlayPlateTag = "div" | "header" | "article";

interface OverlayPlateProps {
  children: ReactNode;
  className?: string;
  as?: OverlayPlateTag;
}

export function OverlayPlate({
  children,
  className = "",
  as: Tag = "div",
}: OverlayPlateProps) {
  return <Tag className={`overlay-plate ${className}`.trim()}>{children}</Tag>;
}
