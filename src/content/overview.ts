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

/**
 * One row of the build sheet: a button we might put on a field screen, and the
 * argument for it. `custom` marks a button no off-the-shelf product would ship.
 * Exactly one row is `unnamed`, and it stays blank on purpose.
 */
export type SheetRow = {
  label: string;
  trade: string;
  why: string;
  custom: boolean;
  unnamed?: boolean;
};

/* Two yards ship in the photographs. The haulage build is in the cab, the
   concrete build is in the hero hand and on the office board. One screen
   repeated across every surface is what makes a page read as a product tour. */
const cabStill = {
  src: "/images/hero-cab.webp",
  width: 3072,
  height: 2048,
  alt: "Overhead in a dusty ute: a work-worn hand holding a phone open to a haulage yard's demo field app, with a paper docket on the other thigh.",
  demoNote: "One haulage yard's demo build. Not a live customer job.",
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
  alt: "Site-office laptop open on the concrete yard's demo jobs board, with hi-vis, a two-way radio, and paper dockets in a South West yard office.",
  demoNote: "The same concrete yard's demo board. Not a live customer system.",
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
    heading: "Two yards. Two different builds.",
    lead: "Neither of these is a product you can buy. They are two yards' systems, and the screens do not match because the yards do not.",
    cabStill,
    officeStill,
    field: {
      title: "In the tipper",
      body: "One run on the screen and one button that matters. No signal on the haul road is fine. It queues, then sends when you hit range.",
      points: [
        "Photograph the weighbridge ticket. Keep the paper if you want it.",
        "Loads and tonnes against the run, not a tally on Friday.",
        "Driver hours and the pre-start, on the truck they belong to.",
      ],
    } satisfies ScreenCaption,
    desk: {
      title: "In the concrete yard's office",
      body: "Every open job, what is committed against what was quoted, and the drafts waiting to go to the ledger.",
      points: [
        "Quoted against committed, on every job, today.",
        "Plant hours, service due, certificates and their expiry.",
        "Drafts for Xero. Your bookkeeper still presses send.",
      ],
    } satisfies ScreenCaption,
    /* The board is only ever a photograph on this page, so this line has to
       stay true at every width, including a phone. */
    note: "Demo data on demo jobs, and no customer system anywhere on this page. The phone above is the same build as the one in the photograph at the top of this band, rendered from the same code. The board is the other yard's. None of these screens is a drawing.",
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
    /* Deliberately not a screenshot. This is the marked up draft that comes out
       of the audit, and the blank row is the whole argument. */
    sheet: {
      title: "One screen, six buttons.",
      lead: "This is the first thing we draw after the audit. One field screen, every button on it argued for. The trades below are examples. The blank one is the only row that matters, and it is the one we cannot fill in from here.",
      sheetLabel: "Field app, screen one",
      sheetMeta: "Audit draft",
      customTag: "Custom",
      blankLabel: "Named on the site visit",
      rows: [
        {
          label: "Photograph docket",
          trade: "Every yard",
          why: "The button nobody argues about. The paper still exists, it just gets handled once instead of five times.",
          custom: false,
        },
        {
          label: "Weighbridge ticket",
          trade: "Tipper haulage",
          why: "Cartage is paid by the tonne, so the ticket is the invoice. Filing it under Attachments loses the driver by Wednesday.",
          custom: true,
        },
        {
          label: "Pour card",
          trade: "Concrete formwork",
          why: "Slump, batch, and where it went, while the truck is still on the pad. Nobody reconstructs that on Friday night.",
          custom: true,
        },
        {
          label: "Hot works permit",
          trade: "Steel fabrication",
          why: "On the phone in the bay, because that is where the permit is needed and where it currently is not.",
          custom: true,
        },
        {
          label: "Pump swap",
          trade: "Mechanical service",
          why: "Serial off the old unit, serial onto the new one, meter reading. Three fields a general purpose job form has no way to ask for.",
          custom: true,
        },
        {
          label: "",
          trade: "Your yard",
          why: "We do not know what this one says yet. It is the thing your crew already does on paper and works around in every product you have tried. It gets named in your yard, and it is usually the reason the other five get opened.",
          custom: true,
          unnamed: true,
        },
      ] satisfies SheetRow[],
      foot: "Not a feature list. Six is the budget, and choosing them is the work.",
    },
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
