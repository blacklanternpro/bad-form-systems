import type { Metadata } from "next";
import Link from "next/link";
import { DayLoop, GrowStops, Layers } from "@/components/coexistence/CoexistenceBlocks";
import { PageFrame, PageIntro } from "@/components/chrome/PageFrame";
import { coexistence } from "@/content/coexistence";

export const metadata: Metadata = {
  title: coexistence.metaTitle,
  description: coexistence.metaDescription,
};

export default function CoexistencePage() {
  return (
    <PageFrame>
      <PageIntro title={coexistence.title} body={coexistence.body} />
      <Layers />
      <DayLoop />
      <GrowStops />
      <p className="type-docket mt-12 max-w-[48ch] text-sm text-brand-steel">
        {coexistence.labLink.note}{" "}
        <Link href={coexistence.labLink.href} className="btn-text text-sm">
          {coexistence.labLink.label}
        </Link>
      </p>
    </PageFrame>
  );
}
