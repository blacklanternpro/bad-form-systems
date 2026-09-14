import { HowWeWork } from "@/components/overview/HowWeWork";
import { PaperOpen } from "@/components/overview/PaperOpen";
import { StillFrame } from "@/components/overview/StillFrame";
import { TwoTruths } from "@/components/overview/TwoTruths";
import { VisitClose } from "@/components/overview/VisitClose";
import { overview } from "@/content/overview";

const HOME_DIRECTION = `<!--
THESIS: First viewport names the 2am problem (glovebox week) then the relief (a job system this yard keeps). Visit is the next step.
OWN-WORLD: Paper as NCR carbon + perforated tear-off. Type on cream. Stamp is the visit verb.
STORY: Paper open (this slice), then stills and later blocks.
FIRST VIEWPORT: Headline, carbon walk, perforation, stamp Book a site visit, How Sunday night stops.
FORM: Tear-off stub. No type on photographs.
FINISH: SE to 4K. Stamp visible without scroll. No brochure verbs.
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
