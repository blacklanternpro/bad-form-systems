import { HowWeWork } from "@/components/overview/HowWeWork";
import { PaperOpen } from "@/components/overview/PaperOpen";
import { StillFrame } from "@/components/overview/StillFrame";
import { TwoTruths } from "@/components/overview/TwoTruths";
import { VisitClose } from "@/components/overview/VisitClose";
import { overview } from "@/content/overview";

const HOME_DIRECTION = `<!--
THESIS: This company owns the job system. Added to as the yard grows. Supported from the South West. Ledger stays as support, not the lead.
OWN-WORLD: Paper as NCR carbon + perforated tear-off. Type on cream. Stamp is the visit verb.
STORY: Paper open, cab still, two truths, office still, how we work, close.
FIRST VIEWPORT: Headline, carbon walk, perforation, stamp Book a site visit, How it stays yours.
FORM: Tear-off stub. No type on photographs.
FINISH: SE to 4K. Stamp visible without scroll. Two-line headline.
-->`;

export default function HomePage() {
  return (
    <>
      <div hidden dangerouslySetInnerHTML={{ __html: HOME_DIRECTION }} />
      <PaperOpen />
      <StillFrame still={overview.cabStill} />
      <TwoTruths />
      <StillFrame still={overview.officeStill} />
      <HowWeWork />
      <VisitClose />
    </>
  );
}
