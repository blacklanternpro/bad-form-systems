import type { Metadata } from "next";
import { DayLoop, Layers } from "@/components/coexistence/CoexistenceBlocks";
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
    </PageFrame>
  );
}
