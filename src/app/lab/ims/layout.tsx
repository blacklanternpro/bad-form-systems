import type { ReactNode } from "react";
import type { Metadata } from "next";
import "@/styles/ims.css";

export const metadata: Metadata = {
  title: "IMS lab",
  description: "Theoretical IMS screens for the cab and office stills. Lab only.",
  robots: { index: false, follow: false },
};

export default function ImsLabLayout({ children }: { children: ReactNode }) {
  return children;
}
