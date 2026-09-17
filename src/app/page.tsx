import { HowWeWork } from "@/components/overview/HowWeWork";
import { PaperOpen } from "@/components/overview/PaperOpen";
import { StillFrame } from "@/components/overview/StillFrame";
import { TwoFronts } from "@/components/overview/TwoFronts";
import { VisitClose } from "@/components/overview/VisitClose";
import { overview } from "@/content/overview";

const HOME_DIRECTION = `<!--
THESIS: First viewport names scattered work, then a custom-owned system for this yard. Not a docket tack-on. Not a shelf product. Not a plugin on Xero.
OWN-WORLD: Paper as NCR carbon + perforated tear-off. Type on cream. Stamp is the visit verb.
STORY: Paper open, cab still, not rented / not a one-off, office still, how we work, close.
FIRST VIEWPORT: Headline, carbon walk, perforation, stamp Book a site visit, What we actually build.
FORM: Tear-off stub. No type on photographs.
FINISH: SE to 4K. Stamp visible without scroll. Ledger-stays is not the lead.
-->`;

export default function HomePage() {
  return (
    <>
      <div hidden dangerouslySetInnerHTML={{ __html: HOME_DIRECTION }} />
      <PaperOpen />
      <StillFrame still={overview.cabStill} />
      <TwoFronts
        rented={overview.fronts.rented}
        oneOff={overview.fronts.oneOff}
        closer={overview.fronts.closer}
      />
      <StillFrame still={overview.officeStill} />
      <HowWeWork />
      <VisitClose />
    </>
  );
}
