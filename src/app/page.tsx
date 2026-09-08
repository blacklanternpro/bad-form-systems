import { HomeHero } from "@/components/overview/HomeHero";
import { SubHero } from "@/components/overview/SubHero";
import { InfoBand, InfoPoints } from "@/components/overview/InfoBand";
import { LandscapeMatrix, PrincipleGrid } from "@/components/overview/OverviewBlocks";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <InfoBand>
        <InfoPoints />
      </InfoBand>
      <SubHero />
      <InfoBand>
        <PrincipleGrid />
        <LandscapeMatrix />
      </InfoBand>
    </>
  );
}
