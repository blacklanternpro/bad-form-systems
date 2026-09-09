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
  metaTitle: "BAD FORM Systems | Operations systems for South West WA",
  metaDescription:
    "Keep Xero or MYOB. Custom IMS and ute capture for South West yards. Evaluation is a site visit.",
  headline: "The job system sits beside the books.",
  body: "We digitise the work that currently lives in spreadsheets, pads, forms, and logins that do not talk, then gets lost. Start with a receipt-parser pilot, or go all the way to jobs, costing, plant, variations, certificates, and the ute. Xero stays the books.",
  walkLine:
    "Keep Xero or MYOB. We build the job system the crew will use. Next step is a yard visit.",
  cabStill: {
    src: "/images/hero-cab.webp",
    width: 1536,
    height: 1024,
    alt: "Overhead in a dusty ute: a work-worn hand on a phone open to a theoretical field IMS, and a paper docket on the other thigh.",
    demoNote: "Demo layout. Not a live product shot.",
    objectPositionClass: "object-[38%_46%] xl:object-[40%_42%]",
  } satisfies OverviewStill,
  officeStill: {
    src: "/images/office-ims.webp",
    width: 1536,
    height: 1024,
    alt: "Site-office laptop open on a theoretical BAD FORM Systems jobs dashboard, with hi-vis and dockets in a South West yard office.",
    demoNote: "Theoretical office IMS. Demo layout, not a live customer system.",
    objectPositionClass: "object-[78%_22%] xl:object-[74%_20%]",
  } satisfies OverviewStill,
  primaryCta: { href: "/contact", label: "Book a site visit" },
  secondaryCta: { href: "/coexistence", label: "How we sit beside Xero" },
  fieldApp: {
    jobNo: "10482",
  },
  truths: {
    lead: {
      title: "The ledger stays",
      body: "You do not rip out accounting. Xero or MYOB remain the books. IMS is built beside them.",
    },
    support: {
      title: "We come to the yard",
      body: "Evaluation is a walkthrough in the South West, not a demo call from another city.",
    },
  },
  workHeading: "How we work",
  beats: [
    {
      title: "Sit on the ute first",
      body: "We sit in the office and on the ute before we write a line.",
    },
    {
      title: "Custom IMS plus cab capture",
      body: "Not another SaaS login. Screens this crew will actually open.",
    },
    {
      title: "Built in the South West",
      body: "Build happens here. You are not a remote ticket.",
    },
  ] satisfies OverviewBeat[],
  closeLine: "If the books stay and the crew will use it, we should be on the yard.",
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
        gap: "Hours, variations, forms, and supplier dockets live in people's heads and on paper until someone types them up.",
        strategy: "Digitise that workflow. Pilot on dockets, or build the full job and field layer this yard actually runs.",
        mobileSummary: "Spreadsheets, chats, paper, and forms. This is the work we take on.",
        mobileAction: "Pilot or full custom system. Field capture included.",
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
      label: "See how the three layers fit",
    },
  },
};
