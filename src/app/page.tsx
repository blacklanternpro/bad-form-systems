import { HowWeWork } from "@/components/overview/HowWeWork";
import { PaperOpen } from "@/components/overview/PaperOpen";
import { StillFrame } from "@/components/overview/StillFrame";
import { TwoTruths } from "@/components/overview/TwoTruths";
import { VisitClose } from "@/components/overview/VisitClose";
import { overview } from "@/content/overview";

const HOME_DIRECTION = `<!--
THESIS: A South West owner leaves knowing the ledger stays, the crew can capture from the ute, and the next step is a yard visit, not another SaaS hero.
OWN-WORLD: Incumbent paper/docket system. Type lives on cream. Stills are photographs. Stamp button is the visit verb.
STORY: Paper offer, cab still, two objections, office still, how the work is taken on, book.
FIRST VIEWPORT: Cream paper, headline, walk, stamp Book a site visit, text link How we sit beside Xero.
FORM: Paper then still, not type on pixels. Asymmetric truths. Numbered process. No landscape table.
FINISH: Desktop and mobile pass. IMS still readable. No plates, slab, mirror, or burst regressions.
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
