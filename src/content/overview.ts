export type OverviewStill = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Screen-reader only. Never printed on the photograph. */
  demoNote: string;
  objectPositionClass: string;
};

export type OverviewLink = {
  href: string;
  label: string;
};

/** One line of the Tuesday narrative. `time` is a clock reading, not a metric. */
export type DayEntry = {
  time: string;
  line: string;
};

export type DayColumn = {
  title: string;
  note: string;
  entries: DayEntry[];
};

/** Caption beside a live product screen in the product band. */
export type ScreenCaption = {
  title: string;
  body: string;
  points: string[];
};

export type MapGroup = {
  title: string;
  items: string[];
};

export type OverviewBeat = {
  title: string;
  body: string;
};

const cabStill = {
  src: "/images/hero-cab.webp",
  width: 1536,
  height: 1024,
  alt: "Overhead in a dusty ute: a work-worn hand holding a phone open to the demo field app, with a paper docket on the other thigh.",
  demoNote: "Demo field app on the screen. Not a live customer job.",
  objectPositionClass: "object-[38%_30%] xl:object-[40%_26%]",
} satisfies OverviewStill;

const handStill = {
  src: "/images/field-hand.webp",
  width: 1536,
  height: 1024,
  alt: "A work-worn hand holding a phone open to the demo field app: one job, one capture button, and the day's captures underneath.",
  demoNote: "Demo field app on the screen. Not a live customer job.",
  objectPositionClass: "object-[62%_38%] lg:object-[58%_40%]",
} satisfies OverviewStill;

const officeStill = {
  src: "/images/office-ims.webp",
  width: 1536,
  height: 1024,
  alt: "Site-office laptop open on the demo jobs board, with hi-vis, a two-way radio, and paper dockets in a South West yard office.",
  demoNote: "Demo jobs board on the screen. Not a live customer system.",
  objectPositionClass: "object-[72%_30%] xl:object-[68%_26%]",
} satisfies OverviewStill;

export const overview = {
  metaTitle: "BAD FORM Systems | Operations systems for South West WA",
  metaDescription:
    "Keep Xero or MYOB. Custom job systems and ute capture for South West yards. Evaluation is a site visit.",

  primaryCta: { href: "/contact", label: "Book a site visit" } satisfies OverviewLink,
  secondaryCta: { href: "/coexistence", label: "How we sit beside Xero" } satisfies OverviewLink,

  /** The header prints this. Do not change the number without checking the still copy. */
  fieldApp: { jobNo: "10482" },

  hero: {
    headline: "One system for the whole job.",
    walk: "Dockets, hours, plant, and variations captured on site. Xero still does the books. We build it around your workflow.",
    still: handStill,
  },

  tuesday: {
    heading: "The same Tuesday, twice.",
    lead: "Kemerton pad is the demo job on the phone above. The work does not change. Where it lands does.",
    columns: [
      {
        title: "On paper",
        note: "The cost is not the paper. It is the week between doing the work and billing it.",
        entries: [
          { time: "6:40", line: "Yesterday's roadbase docket is in the ute somewhere." },
          { time: "9:15", line: "Second pour goes on. Nobody writes it down." },
          { time: "11:00", line: "Builder asks what the extra feed will cost. You guess." },
          { time: "15:30", line: "Operator texts his hours. Two days are missing." },
          { time: "19:00", line: "Kitchen table, a shoebox of paper, and the night gone." },
          { time: "Friday", line: "Invoice goes out late and the variation is not on it." },
        ],
      },
      {
        title: "On the system",
        note: "Same day, same crew. The paper still exists. It gets photographed once and never handled again.",
        entries: [
          { time: "6:48", line: "Operator clocks on against the job. Hours start counting." },
          { time: "6:52", line: "Docket photographed at the counter. Line items read off it." },
          { time: "9:15", line: "Second pour captured, four photos, tagged to the job." },
          { time: "11:00", line: "Variation raised on the phone, signed on the bonnet." },
          { time: "15:30", line: "Committed against quoted, while there is still time to act." },
          { time: "17:00", line: "Draft invoice sitting in Xero. Your bookkeeper presses send." },
        ],
      },
    ] satisfies DayColumn[],
  },

  product: {
    heading: "Two screens. One job.",
    lead: "The phone is built for a gloved thumb in a cab. The board is built for whoever has to invoice it.",
    cabStill,
    officeStill,
    field: {
      title: "In the cab",
      body: "One job on the screen and one button that matters. No signal at the pit is fine. It queues, then sends when you hit range.",
      points: [
        "Photograph the docket. Keep the paper if you want it.",
        "Hours against a job, not against a week.",
        "Variations signed on site by the person who asked for them.",
      ],
    } satisfies ScreenCaption,
    desk: {
      title: "In the office",
      body: "Every open job, what is committed against what was quoted, and the drafts waiting to go to the ledger.",
      points: [
        "Quoted against committed, on every job, today.",
        "Plant hours, service due, certificates and their expiry.",
        "Drafts for Xero. Your bookkeeper still presses send.",
      ],
    } satisfies ScreenCaption,
    note: "Live screens running the same code as the photographs above. Demo data, not a customer system.",
  },

  map: {
    heading: "What gets captured, and where it ends up.",
    lead: "This is the full shape of it. Most yards start with the one part that is costing them money and grow into the rest.",
    groups: [
      {
        title: "Captured on site",
        items: [
          "Supplier dockets and counter receipts",
          "Hours against the job and the machine",
          "Photos before the work gets covered up",
          "Pre-starts and site checks",
          "Variations, signed where they happen",
          "Meter readings straight off the plant",
        ],
      },
      {
        title: "Held in one place",
        items: [
          "Job, site, and cost centre",
          "Quoted against committed",
          "Plant register and what is due",
          "Certificates and expiry dates",
          "Variation register with signatures",
          "One search that finds the docket",
        ],
      },
      {
        title: "Sent to the books",
        items: [
          "Draft invoices for Xero or MYOB",
          "Payroll hours, already coded to jobs",
          "Supplier bills against the right job",
          "Nothing posts without your bookkeeper",
        ],
      },
    ] satisfies MapGroup[],
    footNote: "Not every yard needs all of it. We build the part that pays for itself first.",
    link: { href: "/sectors", label: "What this looks like in your trade" } satisfies OverviewLink,
  },

  custom: {
    heading: "Off the shelf assumes a yard it has never seen.",
    lead: "SimPRO, AroFlo, and the rest are built for an average business. Crews stop opening them the week the screens stop matching the job. That is not a training problem.",
    beats: [
      {
        title: "We audit the workflow first",
        body: "A day in the office and on the ute. We map what already works, because that is the part you should not have to change. The audit is the brief.",
      },
      {
        title: "You get the screens your crew will open",
        body: "Six fields the operator will fill, not sixty they will skip. If it does not survive a gloved thumb at the pit, it does not ship.",
      },
      {
        title: "Built here, and we come back",
        body: "We are in Bunbury. The build happens here, and the person who built it is the person who walks back into your yard.",
      },
    ] satisfies OverviewBeat[],
  },

  demo: {
    heading: "Try the boring part.",
    lead: "Paste a docket the way it comes off the counter. It comes back as line items, GST, and a draft the ledger will take.",
    sourceLabel: "Docket text",
    actionLabel: "Read this docket",
    resultLabel: "What the system files",
    idle: "Pick a docket above, then read it.",
    loading: "Reading line items",
    error: "That did not go through. Try it again.",
    fallbackNote: "Running the local sample. No model key is configured on this deployment.",
    note: "Demo engine. Nothing is stored and no customer job is used.",
    link: { href: "/lab", label: "Open the docket lab" } satisfies OverviewLink,
  },

  visit: {
    heading: "What a site visit actually is.",
    lead: "Two hours in your yard. Not a demo call from another city.",
    items: [
      {
        title: "We walk it with you",
        body: "Office, ute, workshop, and the pile of paper it all ends up in.",
      },
      {
        title: "You get the map either way",
        body: "A written picture of where the job is leaking time, yours to keep whether or not you hire us.",
      },
      {
        title: "We will tell you to stop",
        body: "If there is nothing here worth building, that is the answer you get.",
      },
    ] satisfies OverviewBeat[],
    footNote: "Draft price bands sit on the pricing page with the working we used.",
    link: { href: "/pricing", label: "See draft pricing" } satisfies OverviewLink,
  },

  close: {
    line: "If the books stay and the crew will use it, we should be on the yard.",
  },
};
