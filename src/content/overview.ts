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

export const overview = {
  metaTitle: "BAD FORM Systems | The job system this company owns",
  metaDescription:
    "Custom job software this company owns. Built for this yard, added to as you grow, supported from the South West. Xero or MYOB stay the books.",
  headline: "The job system this company owns.",
  body: "Software built for this yard, kept by this yard, added to when the work changes, and supported from the South West. Xero stays the books.",
  walkLine:
    "Built for this yard. Added to as you grow. Supported from the South West. Xero stays the books.",
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
  secondaryCta: { href: "/coexistence", label: "How it stays yours" },
  fieldApp: {
    jobNo: "10482",
  },
  truths: {
    lead: {
      title: "This company owns it.",
      body: "Not a rented job app. Software built for this yard, kept by this yard, added to when the work changes.",
    },
    support: {
      title: "We still come to the yard.",
      body: "Build, extras, and support are scoped on site in the South West, not from another city's ticket queue.",
    },
  },
  workHeading: "How we work",
  beats: [
    {
      title: "Sit on the ute first.",
      body: "We sit in the office and on the ute before we write a line.",
    },
    {
      title: "Build software this company owns.",
      body: "Not a rented login. A job system built for this yard and kept by this yard.",
    },
    {
      title: "Add to it and support it here.",
      body: "Extras when the work changes. Support from the South West, not another city's ticket queue.",
    },
  ] satisfies OverviewBeat[],
  closeLine: "If this yard should own the job system, we should be on site.",
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
      label: "How it stays yours",
    },
  },
};
