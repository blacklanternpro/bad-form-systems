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

/* Hero hand is the Kemerton demo day. The cab is a capture screen, not that
   job. The office board is the generic system sitting beside the live phone. */
const cabStill = {
  src: "/images/hero-cab.webp",
  width: 3072,
  height: 2048,
  alt: "Overhead in a dusty ute: a work-worn hand holding a phone open to a capture screen, with a paper docket on the other thigh.",
  demoNote: "Demo capture screen. Not a live customer job, and not the hero's Kemerton day.",
  objectPositionClass: "object-[38%_30%] xl:object-[40%_26%]",
} satisfies OverviewStill;

const handStill = {
  src: "/images/field-hand.webp",
  width: 3072,
  height: 2048,
  alt: "A work-worn hand holding a phone open to a concrete yard's demo field app: one job, one capture button, and the day's captures underneath.",
  demoNote: "One concrete yard's demo build. Not a live customer job.",
  objectPositionClass: "object-[62%_38%] lg:object-[58%_40%]",
} satisfies OverviewStill;

const officeStill = {
  src: "/images/office-ims.webp",
  width: 1536,
  height: 1024,
  alt: "Site-office laptop open on a demo jobs board, with hi-vis, a two-way radio, and paper dockets in a South West office.",
  demoNote: "Demo jobs board. Not a live customer system, and not a named yard.",
  objectPositionClass: "object-[70%_50%] xl:object-[68%_46%]",
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
    heading: "Built around the work, not a catalogue.",
    lead: "We audit the workflow first. Then we build the system that can run it: capture on site, one place that holds it, and drafts for the books you already keep.",
    cabStill,
    officeStill,
    field: {
      title: "On the phone",
      body: "The crew get the buttons they will actually press. Six fields, not sixty. No signal on site is fine. It queues, then sends when you hit range.",
      points: [
        "Capture dockets, hours, photos, and signatures where the work happens.",
        "The audit is the brief. If a screen will not be opened, it does not ship.",
        "Xero or MYOB stay the books. Drafts only, until your bookkeeper presses send.",
      ],
    } satisfies ScreenCaption,
    desk: {
      title: "On the board",
      body: "Jobs, hours, plant, variations, certificates, and what is committed against what was quoted. The same system the phone writes into.",
      points: [
        "Quoted against committed, on every job, today.",
        "Plant hours, service due, certificates and their expiry.",
        "Drafts for Xero or MYOB. Your bookkeeper still presses send.",
      ],
    } satisfies ScreenCaption,
    note: "Demo system. Not a customer, and not a product you buy off this page. The phone is the field half of this board.",
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
        body: "Six fields the operator will fill, not sixty they will skip. If it does not survive a gloved thumb on site, it does not ship.",
      },
      {
        title: "Built here, and we come back",
        body: "We are in Bunbury. The build happens here, and the person who built it is the person who walks back into your yard.",
      },
    ] satisfies OverviewBeat[],
  },

  demo: {
    heading: "What the paper is costing you.",
    lead: "Put in your own hours, rate, invoice lag, and leakage. The total is an illustration, not a claim about South West businesses as a group, and not a quote.",
    note: "Illustration only. The number is yours. Nothing is stored.",
    link: { href: "/ghost-tax", label: "Open the ghost tax calculator" } satisfies OverviewLink,
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
