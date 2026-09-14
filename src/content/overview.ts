export type OverviewStill = {
  src: string;
  width: number;
  height: number;
  alt: string;
  demoNote: string;
  objectPositionClass: string;
};

export type OverviewBeat = {
  title: string;
  body: string;
};

export type FrontNote = {
  title: string;
  body: string;
};

export const overview = {
  metaTitle: "BAD FORM Systems | Your yard's own job system, South West WA",
  metaDescription:
    "We sit in the yard, audit the work, and build the system this business owns. Jobs, costing, plant, variations, certificates, the ute. Xero or MYOB stay the books.",
  headline: "Excel, paper, checklists, three apps.",
  body: "We digitise the work that currently lives in spreadsheets, pads, forms, and logins that do not talk, then gets lost. The full build is jobs, costing, plant, variations, certificates, and the ute. Xero stays the books.",
  walkLine:
    "One custom system. Built for this yard. Jobs, costing, plant, variations, the ute. Xero stays the books.",
  cabStill: {
    src: "/images/hero-cab.webp",
    width: 1536,
    height: 1024,
    alt: "Overhead in a dusty ute: a work-worn hand on a phone open to a theoretical field job system, and a paper docket on the other thigh.",
    demoNote: "Demo layout. Not a live product shot.",
    objectPositionClass: "object-[38%_28%] xl:object-[40%_24%]",
  } satisfies OverviewStill,
  officeStill: {
    src: "/images/office-ims.webp",
    width: 1536,
    height: 1024,
    alt: "Site-office laptop open on a theoretical BAD FORM Systems jobs dashboard, with hi-vis and dockets in a South West yard office.",
    demoNote: "Theoretical office job system. Demo layout, not a live customer system.",
    objectPositionClass: "object-[78%_22%] xl:object-[74%_20%]",
  } satisfies OverviewStill,
  primaryCta: { href: "/contact", label: "Book a site visit" },
  secondaryCta: { href: "/coexistence", label: "What we actually build" },
  fieldApp: {
    jobNo: "10482",
  },
  fronts: {
    rented: {
      title: "Rented job apps",
      body: "Generic screens the crew stops opening. Your data lives inside someone else's plan.",
    },
    oneOff: {
      title: "One-off custom builds",
      body: "Yours until the developer moves on. Then it is nobody's.",
    },
    closer:
      "One system this yard owns. Your name on it, only the parts you run, kept current from Bunbury. Add civil, fab, or fleet when that work is real.",
  },
  workHeading: "How we work",
  beats: [
    {
      title: "Sit in the yard first",
      body: "We sit in the office and on the ute before we write a line. The audit is the brief.",
    },
    {
      title: "Build the whole job system",
      body: "Jobs, costing, plant, variations, certificates, the ute. Photographing paper is one door in, not the product.",
    },
    {
      title: "Keep it current from Bunbury",
      body: "Your name on it. Add civil, fab, or fleet when that work is real. You are not a remote ticket.",
    },
  ] satisfies OverviewBeat[],
  closeLine: "If this yard should own its job system, we should be on site.",
  landscape: {
    title: "Where the work actually lives",
    body: "Most South West yards already have a ledger they trust. The gap is everything scattered before a line hits Xero or MYOB: Excel, paper, checklists, forms, and apps that do not talk.",
    columns: ["Layer", "What you see today", "The gap", "What we do"],
    rows: [
      {
        highlight: false,
        layer: "Ledger and tax",
        tools: "Xero, MYOB, Reckon",
        gap: "Fine for BAS and payroll. Blind to live jobs, machine hours, and what happened on site.",
        strategy: "Leave it. Connect through the official API.",
        mobileSummary: "Accounts and BAS stay. This layer is not the problem.",
        mobileAction: "Connect. Do not replace.",
      },
      {
        highlight: true,
        layer: "Jobs and the field",
        tools: "Excel, WhatsApp, clipboards, glovebox dockets, checklists",
        gap: "Hours, variations, forms, and supplier paper live in people's heads and on pads until someone types them up.",
        strategy: "Audit the workflow. Build the job system this yard actually runs.",
        mobileSummary: "Spreadsheets, chats, paper, and forms. This is the work we take on.",
        mobileAction: "A custom system for this operation.",
      },
      {
        highlight: false,
        layer: "Off-the-shelf job apps",
        tools: "SimPRO, AroFlo, Tradify, and similar",
        gap: "Built for a generic workflow. Crews stop using them when the screens do not match the job.",
        strategy: "Do not add another unused login. Build the few screens this crew will actually open.",
        mobileSummary: "Shelf software the crew will not open on site.",
        mobileAction: "Fewer screens. Built for this operation.",
      },
    ],
    footerNote: "The point is not more software. It is one workflow for work that currently lives in five places.",
    footerLink: {
      href: "/coexistence",
      label: "What we actually build",
    },
  },
};
