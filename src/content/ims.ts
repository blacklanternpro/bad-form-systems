export type ImsPaintId = "day" | "dusk";

export type ImsSyncState = "synced" | "queued";

export type ImsSeverity = "hold" | "watch";

export type ImsCaptureRow = {
  id: string;
  label: string;
  meta: string;
  time: string;
  sync: ImsSyncState;
  thumb?: { src: string; alt: string };
  glyph?: "prestart" | "signature" | "hours" | "load";
};

export type ImsMetric = {
  label: string;
  value: string;
  unit?: string;
};

export type ImsJobRow = {
  job: string;
  jobNo: string;
  site: string;
  plant: string;
  hours: string;
  quoted: string;
  committed: string;
  /** Committed against quoted, 0 to 1. Drives the inline bar width. */
  burn: number;
  status: string;
  state: "onsite" | "watch" | "prestart" | "ready" | "quoted";
};

export type ImsAttentionRow = {
  title: string;
  meta: string;
  severity: ImsSeverity;
};

export type ImsFieldActionId = "hours" | "variation" | "load";

export type ImsFieldTabId = "job" | "capture" | "hours" | "more";

export type ImsBuildId = "pour" | "cartage" | "generic";

export const imsBuildIds = ["pour", "cartage", "generic"] as const;

/**
 * A field-app vocabulary. `pour` is the hero still and Tuesday. `cartage`
 * stays in the lab. `generic` is the live breakout and the office board: no
 * place names, no trade, day paint. Naming a trade here would sell that trade
 * as the product.
 */
export type ImsFieldBuild = {
  /** A short label for the lab, never a customer. Generic stays "Field". */
  trade: string;
  statusTime: string;
  jobNo: string;
  jobTitle: string;
  jobMeta: string;
  jobScope: string;
  stateLabel: string;
  stateMeta: string;
  sync: { queuedLabel: string; offlineNote: string };
  primaryAction: { label: string; hint: string };
  secondaryActions: { id: ImsFieldActionId; label: string }[];
  metrics: ImsMetric[];
  feedHeading: string;
  feed: ImsCaptureRow[];
  tabs: { id: ImsFieldTabId; label: string }[];
  selectedTab: ImsFieldTabId;
};

const docketThumb = {
  src: "/images/ims/capture-docket.webp",
  alt: "Photographed supplier docket, demo capture.",
};

const siteThumb = {
  src: "/images/ims/capture-site.webp",
  alt: "Photographed ground at the pour edge, demo capture.",
};

/* The cartage yard photographs a weighbridge ticket, so it reuses the docket
   frame with its own alt. It never borrows the pour build's site photo: that
   alt describes concrete, and alt text does not get to be approximately true. */
const ticketThumb = {
  src: "/images/ims/capture-docket.webp",
  alt: "Photographed weighbridge ticket, demo capture.",
};

export const imsFieldBuilds: Record<ImsBuildId, ImsFieldBuild> = {
  /* The concrete yard. This build owns the hero still only. Its day has to
     agree with the Tuesday timeline, because the copy sends the reader from
     one to the other. Late afternoon: the phone still clocked on. The office
     board is the generic system and must not reuse these job names. */
  pour: {
    trade: "Concrete formwork",
    statusTime: "17:04",
    jobNo: "BF-2025-0325",
    jobTitle: "Kemerton pad",
    jobMeta: "Kemerton",
    jobScope: "Concrete formwork",
    stateLabel: "On site",
    stateMeta: "Clocked on 6:48",
    sync: {
      queuedLabel: "2 queued",
      offlineNote: "No signal at the pit. Sends when you hit range.",
    },
    primaryAction: {
      label: "Photograph docket",
      hint: "Line items, GST, and this job code",
    },
    secondaryActions: [
      { id: "hours", label: "Log hours" },
      { id: "variation", label: "Raise variation" },
    ],
    metrics: [
      { label: "Today", value: "9.5", unit: "hrs" },
      { label: "Job to date", value: "41.5", unit: "hrs" },
      { label: "EX20 meter", value: "1,284.6", unit: "hrs" },
    ],
    feedHeading: "Captured today",
    /* Newest first, and the times match the Tuesday timeline on the homepage,
       because the copy sends the reader from one to the other. Four rows fit the
       screen; the pre-start sits below the fold on purpose, so the feed reads as
       a list that carries on. */
    feed: [
      {
        id: "hours",
        label: "Crew hours, four on the pad",
        meta: "Split across two pours",
        time: "16:40",
        sync: "synced",
        glyph: "hours",
      },
      {
        id: "variation",
        label: "Variation 02, signed",
        meta: "D. Brown on site",
        time: "11:00",
        sync: "queued",
        glyph: "signature",
      },
      {
        id: "site",
        label: "Second pour, edge",
        meta: "4 photos",
        time: "9:15",
        sync: "queued",
        thumb: siteThumb,
      },
      {
        id: "docket",
        label: "Supplier docket",
        meta: "Bunbury counter",
        time: "6:52",
        sync: "synced",
        thumb: docketThumb,
      },
      {
        id: "prestart",
        label: "Pre-start, EX20",
        meta: "Ten checks, all clear",
        time: "6:45",
        sync: "synced",
        glyph: "prestart",
      },
    ],
    tabs: [
      { id: "job", label: "Job" },
      { id: "capture", label: "Capture" },
      { id: "hours", label: "Hours" },
      { id: "more", label: "More" },
    ],
    selectedTab: "job",
  },

  /* A different yard, hauling sand. Lab only. Same components, and almost
     nothing the driver touches is the same: the button that matters
     photographs a weighbridge ticket, the day is counted in loads and tonnes
     rather than hours on a pad, and the first tab is a run, not a job. It
     does not appear on `/`. */
  cartage: {
    trade: "Tipper haulage",
    statusTime: "15:12",
    jobNo: "BF-2025-0341",
    jobTitle: "Capel sand cartage",
    jobMeta: "Capel pit",
    jobScope: "Tipper haulage",
    stateLabel: "On the road",
    stateMeta: "Clocked on 5:20",
    sync: {
      queuedLabel: "3 queued",
      offlineNote: "No signal on the haul road. Sends when you hit range.",
    },
    primaryAction: {
      label: "Weighbridge ticket",
      hint: "Tonnes, pit, and this run",
    },
    secondaryActions: [
      { id: "hours", label: "Log hours" },
      { id: "load", label: "Add load" },
    ],
    metrics: [
      { label: "Loads today", value: "7" },
      { label: "Tonnes today", value: "148.2", unit: "t" },
      { label: "Truck 12", value: "9.8", unit: "hrs" },
    ],
    feedHeading: "Captured today",
    feed: [
      {
        id: "load-07",
        label: "Load 7, Capel to Kemerton",
        meta: "28.4 t on the ticket",
        time: "14:58",
        sync: "queued",
        glyph: "load",
      },
      {
        id: "ticket",
        label: "Weighbridge ticket",
        meta: "Capel pit",
        time: "14:44",
        sync: "queued",
        thumb: ticketThumb,
      },
      {
        id: "hours",
        label: "Driver hours, Truck 12",
        meta: "Second shift on the run",
        time: "13:05",
        sync: "synced",
        glyph: "hours",
      },
      {
        id: "load-06",
        label: "Load 6, Capel to Kemerton",
        meta: "27.9 t on the ticket",
        time: "12:20",
        sync: "synced",
        glyph: "load",
      },
      {
        id: "prestart",
        label: "Pre-start, Truck 12",
        meta: "Twelve checks, all clear",
        time: "5:15",
        sync: "synced",
        glyph: "prestart",
      },
    ],
    tabs: [
      { id: "job", label: "Run" },
      { id: "capture", label: "Capture" },
      { id: "hours", label: "Hours" },
      { id: "more", label: "More" },
    ],
    selectedTab: "job",
  },

  /* Homepage live phone. No South West place, no trade, no job the reader
     can file as the product. Day paint on the breakout. Capture is a
     document camera with the same dusk chrome as the job tab, not an empty
     finder. The cab still is a baked photograph in the hero's language, not
     this build. */
  generic: {
    trade: "Field",
    statusTime: "09:41",
    jobNo: "10482",
    jobTitle: "Job 01",
    jobMeta: "Site A",
    jobScope: "Open",
    stateLabel: "Active",
    stateMeta: "Clocked on 07:10",
    sync: {
      queuedLabel: "Queued",
      offlineNote: "Sends when you hit range.",
    },
    primaryAction: {
      label: "Capture",
      hint: "Paper, site, or a meter",
    },
    secondaryActions: [
      { id: "hours", label: "Log hours" },
      { id: "variation", label: "Add note" },
    ],
    metrics: [
      { label: "Today", value: "8.0", unit: "hrs" },
      { label: "This job", value: "32.0", unit: "hrs" },
      { label: "Open", value: "6" },
    ],
    feedHeading: "Today",
    feed: [
      {
        id: "hours",
        label: "Hours, four on site",
        meta: "Against this job",
        time: "09:12",
        sync: "synced",
        glyph: "hours",
      },
      {
        id: "note",
        label: "Note signed",
        meta: "On site",
        time: "08:40",
        sync: "queued",
        glyph: "signature",
      },
      {
        id: "docket",
        label: "Supplier docket",
        meta: "Counter",
        time: "07:22",
        sync: "synced",
        thumb: docketThumb,
      },
      {
        id: "prestart",
        label: "Pre-start",
        meta: "All clear",
        time: "07:05",
        sync: "synced",
        glyph: "prestart",
      },
    ],
    tabs: [
      { id: "job", label: "Job" },
      { id: "capture", label: "Capture" },
      { id: "hours", label: "Hours" },
      { id: "more", label: "More" },
    ],
    selectedTab: "job",
  },
};

export const imsCopy = {
  labTitle: "IMS screens",
  labBody:
    "Lab only. Field apps and the office board used on the homepage. Demo data, not a shipped product.",
  demo: "DEMO",
  demoNote: "Demo system. Not a live customer job.",
  brandMark: "BAD FORM",
  brandArm: "Systems",

  desk: {
    breadcrumb: "Jobs",
    week: "Week 12",
    topSync: "Xero synced 17:02",
    heading: "Jobs",
    newJob: "New job",
    filters: ["All", "On site", "Draft", "Closed"] as const,
    selectedFilter: "All",
    summary: [
      { label: "Open jobs", value: "6" },
      { label: "Hours today", value: "38.5" },
      { label: "Unbilled", value: "$12,480" },
      { label: "Drafts for Xero", value: "4" },
    ] satisfies ImsMetric[],
    tableColumns: ["Job", "Plant", "Hours", "Quoted against committed", "Status"] as const,
    jobs: [
      {
        job: "Job 01",
        jobNo: "10482",
        site: "Site A",
        plant: "Unit 2",
        hours: "32.0",
        quoted: "$18,400",
        committed: "$12,180",
        burn: 0.66,
        status: "On site",
        state: "onsite",
      },
      {
        job: "Job 02",
        jobNo: "10471",
        site: "North plant",
        plant: "Unit 5",
        hours: "26.0",
        quoted: "$9,600",
        committed: "$8,940",
        burn: 0.93,
        status: "Watch",
        state: "watch",
      },
      {
        job: "Job 03",
        jobNo: "10458",
        site: "Run 12",
        plant: "Bay 2",
        hours: "63.0",
        quoted: "$24,800",
        committed: "$23,910",
        burn: 0.96,
        status: "Invoice ready",
        state: "ready",
      },
      {
        job: "Job 04",
        jobNo: "10444",
        site: "Store",
        plant: "Unit 2",
        hours: "12.5",
        quoted: "$6,200",
        committed: "$1,480",
        burn: 0.24,
        status: "Pre-start",
        state: "prestart",
      },
      {
        job: "Job 05",
        jobNo: "10421",
        site: "Plant",
        plant: "Bay 1",
        hours: "9.0",
        quoted: "$3,150",
        committed: "$1,020",
        burn: 0.32,
        status: "Quoted",
        state: "quoted",
      },
      {
        job: "Job 06",
        jobNo: "10408",
        site: "Site B",
        plant: "Unit 4",
        hours: "18.5",
        quoted: "$7,400",
        committed: "$4,260",
        burn: 0.58,
        status: "On site",
        state: "onsite",
      },
    ] satisfies ImsJobRow[],
    capturesHeading: "Captures today",
    captures: [
      {
        id: "hours",
        label: "Hours",
        meta: "Four on site",
        time: "09:12",
        sync: "synced",
        glyph: "hours",
      },
      {
        id: "note",
        label: "Note",
        meta: "Signed",
        time: "08:40",
        sync: "queued",
        glyph: "signature",
      },
      {
        id: "check",
        label: "Pre-start",
        meta: "All clear",
        time: "07:05",
        sync: "synced",
        glyph: "prestart",
      },
      {
        id: "docket",
        label: "Supplier docket",
        meta: "Job 01",
        time: "07:22",
        sync: "synced",
        thumb: docketThumb,
      },
    ] satisfies ImsCaptureRow[],
    attentionHeading: "Needs a look",
    attention: [
      {
        title: "Variation unsigned",
        meta: "Job 02, raised Monday",
        severity: "hold",
      },
      {
        title: "Service due in 15.4 hrs",
        meta: "On the meter, not on a calendar",
        severity: "watch",
      },
      {
        title: "Certificate not filed",
        meta: "Job 03, invoice ready",
        severity: "watch",
      },
    ] satisfies ImsAttentionRow[],
    books: {
      heading: "Beside the books",
      lead: "4 drafts ready for Xero",
      sync: "Last sync 17:02",
      stats: [
        { label: "Draft invoices", value: "4" },
        { label: "Payroll hours", value: "38.5" },
        { label: "Supplier dockets", value: "11" },
      ] satisfies ImsMetric[],
      foot: "Drafts only. Your bookkeeper still presses send.",
    },
    nav: [
      { id: "jobs", label: "Jobs" },
      { id: "capture", label: "Captures" },
      { id: "hours", label: "Hours" },
      { id: "plant", label: "Plant" },
      { id: "variations", label: "Variations" },
      { id: "certificates", label: "Certificates" },
      { id: "costing", label: "Costing" },
    ],
    selectedNav: "jobs",
  },

  paints: {
    day: { id: "day" as const, label: "Office light" },
    dusk: { id: "dusk" as const, label: "Cab dark" },
  },
};

/**
 * Lab routes. The phone carries a build because pour, cartage, and generic
 * all ship in the lab; the board is the generic system and carries a paint
 * alone. scripts/shoot-stills.mjs builds the same URLs by hand, so keep them
 * in step.
 */
export const imsHref = {
  phone: (build: ImsBuildId, paint: ImsPaintId) => `/lab/ims/phone/${build}/${paint}`,
  desk: (paint: ImsPaintId) => `/lab/ims/desk/${paint}`,
};

export const IMS_PHONE = { width: 390, height: 844 } as const;
/** Chassis around IMS_PHONE. Lab device-frame captures still use this. */
export const IMS_DEVICE = { width: 418, height: 872, radius: 54, bezel: 14 } as const;
export const IMS_DESK = { width: 1440, height: 810 } as const;
