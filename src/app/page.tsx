import { HomeDeck } from "@/components/overview/HomeDeck";
import { HomeHero } from "@/components/overview/HomeHero";
import { SubHero } from "@/components/overview/SubHero";
import { DeckScreen } from "@/components/overview/DeckScreen";
import { LandscapeMatrix, PrincipleScreen } from "@/components/overview/OverviewBlocks";
import { overview } from "@/content/overview";

export default function HomePage() {
  return (
    <HomeDeck>
      <HomeHero />
      <SubHero />
      {overview.principles.map((principle, index) => (
        <DeckScreen key={principle.title} className="bg-brand-black">
          <PrincipleScreen principle={principle} ledger={index === 0} />
        </DeckScreen>
      ))}
      <DeckScreen className="bg-brand-black">
        <LandscapeMatrix />
      </DeckScreen>
    </HomeDeck>
  );
}
