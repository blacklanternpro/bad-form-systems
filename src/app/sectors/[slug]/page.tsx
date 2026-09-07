import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageFrame, PageIntro } from "@/components/chrome/PageFrame";
import { SectorNav, SectorPanel } from "@/components/sectors/SectorBlocks";
import { isSectorSlug, sectors, sectorsIndex, sectorSlugs } from "@/content/sectors";

export function generateStaticParams() {
  return sectorSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isSectorSlug(slug)) {
    return { title: sectorsIndex.metaTitle };
  }
  const sector = sectors[slug];
  return {
    title: `${sector.title} | South West sectors`,
    description: sector.body,
  };
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isSectorSlug(slug)) notFound();
  const sector = sectors[slug];

  return (
    <PageFrame>
      <PageIntro compact title={sectorsIndex.title} body={sectorsIndex.body} />
      <SectorNav active={slug} />
      <SectorPanel sector={sector} />
    </PageFrame>
  );
}
