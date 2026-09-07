import type { Metadata } from "next";
import { GhostTaxCalculator } from "@/components/calculator/GhostTaxCalculator";
import { PageFrame, PageIntro } from "@/components/chrome/PageFrame";
import { calculatorCopy } from "@/content/calculator";

export const metadata: Metadata = {
  title: calculatorCopy.metaTitle,
  description: calculatorCopy.metaDescription,
};

export default function GhostTaxPage() {
  return (
    <PageFrame>
      <PageIntro compact title={calculatorCopy.title} body={calculatorCopy.body} />
      <GhostTaxCalculator />
    </PageFrame>
  );
}
