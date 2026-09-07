import type { Metadata } from "next";
import { PageFrame, PageIntro } from "@/components/chrome/PageFrame";
import { SectorNav, SectorPanel } from "@/components/sectors/SectorBlocks";
import { sectors, sectorsIndex } from "@/content/sectors";

export const metadata: Metadata = {
  title: sectorsIndex.metaTitle,
  description: sectorsIndex.metaDescription,
};

export default function SectorsIndexPage() {
  const featured = sectors.trades;
  return (
    <PageFrame>
      <PageIntro compact title={sectorsIndex.title} body={sectorsIndex.body} />
      <SectorNav active="trades" />
      <SectorPanel sector={featured} />
    </PageFrame>
  );
}
