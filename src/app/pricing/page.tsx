import type { Metadata } from "next";
import { PageFrame, PageIntro } from "@/components/chrome/PageFrame";
import { PricingGrid } from "@/components/pricing/PricingGrid";
import { pricing } from "@/content/pricing";

export const metadata: Metadata = {
  title: pricing.metaTitle,
  description: pricing.metaDescription,
};

export default function PricingPage() {
  return (
    <PageFrame>
      <PageIntro title={pricing.title} body={pricing.body} />
      <PricingGrid />
    </PageFrame>
  );
}
