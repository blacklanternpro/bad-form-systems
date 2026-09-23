export const sectorSlugs = ["trades", "civil", "fab", "logistics"] as const;

export type SectorSlug = (typeof sectorSlugs)[number];

export type Sector = {
  slug: SectorSlug;
  navLabel: string;
  places: string;
  title: string;
  body: string;
  modulesHeading: string;
  modulesFoot: string;
  modules: { title: string; body: string }[];
  scenarioHeading: string;
  problem: string;
  approach: string;
};

export const sectorsIndex = {
  metaTitle: "South West sectors",
  metaDescription:
    "Custom job systems for South West WA trade contractors, earthmovers, fabricators, and regional fleets.",
  title: "Built for the work that runs this region",
  body: "Trade crews, earthmovers, fabricators, and regional fleets around Bunbury, Kemerton, Collie, and the wider South West. After an audit we build the system this yard owns. Not a scanner. Not another unused login.",
};

export const sectors: Record<SectorSlug, Sector> = {
  trades: {
    slug: "trades",
    navLabel: "Trades",
    places: "Australind, Bunbury, Treendale, Dunsborough",
    title: "Electrical, plumbing, HVAC, and builders on the road",
    body: "After an audit we build the job system this crew will actually open. Variations, hours, certificates, and the wholesaler paper, in one place. Xero stays the books.",
    modulesHeading: "What this yard can own first",
    modulesFoot: "Extras are added later, not dumped on day one.",
    modules: [
      {
        title: "Variation on the phone",
        body: "Extra downlights, a relocated trench, a signed extra on the spot. The work is on the job card before anyone leaves site.",
      },
      {
        title: "Hours on the job, not a pad",
        body: "One-tap site sign-in so labour sits against the stage you quoted, not a weekly reconstruction.",
      },
      {
        title: "Certificates from site",
        body: "Testing, backflow, gas compliance: numbered in your series and locked once issued.",
      },
      {
        title: "Wholesaler paper",
        body: "Reece, Middy's, Rexel: the receipt lands on the right job instead of the dash.",
      },
    ],
    scenarioHeading: "What this looks like",
    problem:
      "The week lives in Excel, WhatsApp, and a job app the crew stopped opening. The owner reconstructs it on the weekend.",
    approach:
      "A short flow this crew will use, jobs the office can invoice without rebuilding the week, and drafts waiting in Xero.",
  },
  civil: {
    slug: "civil",
    navLabel: "Civil",
    places: "Picton, Davenport, Capel, Kemerton",
    title: "Earthmoving, wet hire, and quarry cartage",
    body: "Wet-hire excavators, graders, side-tippers off a Roelands pile. The system this yard would run first is hire, pre-start, hours, and tonnes on the job, not a pile of cab paper at knock-off.",
    modulesHeading: "What this yard can own first",
    modulesFoot: "Extras are added later, not dumped on day one.",
    modules: [
      {
        title: "Wet and dry hire",
        body: "Meter hours, operator, and standby without a second spreadsheet. Minimum hours built in.",
      },
      {
        title: "Pre-start in the cab",
        body: "A short daily check. A failed pass can block that machine until a fresh one is in.",
      },
      {
        title: "Hours signed on a phone",
        body: "Head contractor signs wet-hire hours on site. That signature rides with the draft invoice.",
      },
      {
        title: "Quarry ticket",
        body: "Tonnage and grade hit the job against the order, not a reconstruction from the glovebox.",
      },
    ],
    scenarioHeading: "What this looks like",
    problem: "Hire hours, tonnes, and pre-starts live in three books. The invoice is already late.",
    approach:
      "Hire, pre-start, hours, and tonnes on the same job while it is still running. Drafts waiting in Xero.",
  },
  fab: {
    slug: "fab",
    navLabel: "Fabrication",
    places: "Halifax, Bunbury Port, Collie",
    title: "Boilermaking, structural, and mechanical",
    body: "A service-call app falls over on cut plate, NDI, and multi-stage sub-assemblies. The floor needs a kiosk, not eighteen menus.",
    modulesHeading: "What this yard can own first",
    modulesFoot: "Extras are added later, not dumped on day one.",
    modules: [
      {
        title: "Stage and ITP",
        body: "Stock, cut, fab, blast and paint, MDR. Each stage has a place, with photos where the pack needs them.",
      },
      {
        title: "Certificates on the job",
        body: "Heat numbers and mill certs tied to the client card instead of a folder on a shared drive.",
      },
      {
        title: "Workshop kiosk",
        body: "A rugged tablet on the floor. Two buttons. Hours against the job without a login ritual.",
      },
      {
        title: "Offcuts and consumables",
        body: "Drop and scrap allocated so the job's actuals can be compared to the quote.",
      },
    ],
    scenarioHeading: "What this looks like",
    problem: "A packaged trade app lasts a few months. Boilermakers will not hunt through nested menus.",
    approach: "A two-control kiosk on the floor, ITP with photos, a pack the client can actually receive.",
  },
  logistics: {
    slug: "logistics",
    navLabel: "Fleet",
    places: "Greenbushes, Busselton, Collie",
    title: "Plant hire and regional transport",
    body: "Floats, CoR, and service intervals spread across more than one South West yard. Attachments and hours are easy to lose if they only live in someone's book.",
    modulesHeading: "What this yard can own first",
    modulesFoot: "Extras are added later, not dumped on day one.",
    modules: [
      {
        title: "Float and mobilisation",
        body: "Drop-off, pickup, standby, and escort costs on the movement, not in a later reconstruction.",
      },
      {
        title: "Hour-meter services",
        body: "Workshop notified when a machine crosses a service interval, from the hours already logged.",
      },
      {
        title: "CoR records",
        body: "Mass, rest, and load-restraint photos in one place the office can find.",
      },
      {
        title: "Where the plant is",
        body: "Machine, attachment, and bucket against the yard or site they are actually at.",
      },
    ],
    scenarioHeading: "What this looks like",
    problem: "Attachment hire missed on the invoice. A 500-hour service that only shows up when something lets go.",
    approach: "Hours from pre-start into the maintenance record, attachments on the hire, one register across yards.",
  },
};

export function isSectorSlug(value: string): value is SectorSlug {
  return (sectorSlugs as readonly string[]).includes(value);
}
