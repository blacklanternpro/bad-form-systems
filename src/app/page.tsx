import { HomeHero } from "@/components/overview/HomeHero";
import { SubHero } from "@/components/overview/SubHero";
import { LandscapeMatrix, PrincipleList } from "@/components/overview/OverviewBlocks";
import { PageFrame } from "@/components/chrome/PageFrame";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <SubHero />
      <PageFrame>
        <PrincipleList />
        <LandscapeMatrix />
      </PageFrame>
    </>
  );
}
