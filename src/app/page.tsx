import { HomeHero } from "@/components/overview/HomeHero";
import { LandscapeMatrix, PrincipleList } from "@/components/overview/OverviewBlocks";
import { PageFrame } from "@/components/chrome/PageFrame";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <PageFrame>
        <PrincipleList />
        <LandscapeMatrix />
      </PageFrame>
    </>
  );
}
