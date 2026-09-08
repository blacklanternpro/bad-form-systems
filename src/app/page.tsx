import { HomeHero } from "@/components/overview/HomeHero";
import { InfoBand, OfferFacts, VisitFacts } from "@/components/overview/InfoBand";
import { LandscapeMatrix, VisitClose } from "@/components/overview/OverviewBlocks";
import { SubHero } from "@/components/overview/SubHero";

const HOME_DIRECTION = `<!--
THESIS: A South West owner leaves knowing the ledger stays, the crew can capture from the ute, and the next step is a yard visit — not another SaaS hero.
OWN-WORLD: Incumbent paper/docket system; stills carry titles; cream bands carry facts; stamp button is the visit verb.
STORY: See the job on the phone → two objections killed → see the office → how the work is taken on → book.
FIRST VIEWPORT: Full-bleed cab still, ink type at the bottom with burst, stamp Book a site visit, text link How we sit beside Xero.
FORM: Existing still-then-band rhythm; visit facts before offer; surface extension, not a new world.
FINISH: Desktop + mobile pass; IMS still readable; no plates/slab/mirror regressions.
-->`;

export default function HomePage() {
  return (
    <>
      <div hidden dangerouslySetInnerHTML={{ __html: HOME_DIRECTION }} />
      <HomeHero />
      <InfoBand flushTop>
        <VisitFacts />
      </InfoBand>
      <SubHero />
      <InfoBand flushTop>
        <OfferFacts />
        <LandscapeMatrix />
        <VisitClose />
      </InfoBand>
    </>
  );
}
