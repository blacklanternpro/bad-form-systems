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
  glyph?: "prestart" | "signature" | "hours";
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

const docketThumb = {
  src: "/images/ims/capture-docket.webp",
  alt: "Photographed supplier docket, demo capture.",
};

const siteThumb = {
  src: "/images/ims/capture-site.webp",
  alt: "Photographed ground at the pour edge, demo capture.",
};

export const imsCopy = {
  labTitle: "IMS screens",
  labBody:
    "Lab only. The field app and the office board that sit in the homepage stills. Demo data, two paints, not a shipped product.",
  demo: "DEMO",
  demoNote: "Demo system. Not a live customer job.",
  brandMark: "BAD FORM",
  brandArm: "Systems",

  field: {
    statusTime: "6:52",
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
      { label: "Today", value: "7.0", unit: "hrs" },
      { label: "Job to date", value: "41.5", unit: "hrs" },
      { label: "EX20 meter", value: "1,284.6", unit: "hrs" },
    ] satisfies ImsMetric[],
    feedHeading: "Captured today",
    feed: [
      {
        id: "docket",
        label: "Supplier docket",
        meta: "Bunbury counter",
        time: "9:22",
        sync: "synced",
        thumb: docketThumb,
      },
      {
        id: "site",
        label: "Second pour, edge",
        meta: "4 photos",
        time: "12:05",
        sync: "queued",
        thumb: siteThumb,
      },
      {
        id: "variation",
        label: "Variation 02, signed",
        meta: "D. Brown on site",
        time: "13:15",
        sync: "queued",
        glyph: "signature",
      },
      {
        id: "hours",
        label: "Crew hours, four on the pad",
        meta: "Split across two pours",
        time: "11:30",
        sync: "synced",
        glyph: "hours",
      },
      {
        id: "prestart",
        label: "Pre-start, EX20",
        meta: "Ten checks, all clear",
        time: "6:48",
        sync: "synced",
        glyph: "prestart",
      },
    ] satisfies ImsCaptureRow[],
    tabs: [
      { id: "job", label: "Job" },
      { id: "capture", label: "Capture" },
      { id: "hours", label: "Hours" },
      { id: "more", label: "More" },
    ],
    selectedTab: "job",
  },

  desk: {
    breadcrumb: "Jobs",
    week: "Week 12",
    topSync: "Xero synced 7:02",
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
        job: "Kemerton pad",
        jobNo: "BF-2025-0325",
        site: "Kemerton",
        plant: "EX20",
        hours: "41.5",
        quoted: "$18,400",
        committed: "$12,180",
        burn: 0.66,
        status: "On site",
        state: "onsite",
      },
      {
        job: "Picton access",
        jobNo: "BF-2025-0318",
        site: "Picton",
        plant: "PC55",
        hours: "26.0",
        quoted: "$9,600",
        committed: "$8,940",
        burn: 0.93,
        status: "Watch",
        state: "watch",
      },
      {
        job: "Treendale fitout",
        jobNo: "BF-2025-0307",
        site: "Treendale",
        plant: "Ute 4",
        hours: "63.0",
        quoted: "$24,800",
        committed: "$23,910",
        burn: 0.96,
        status: "Invoice ready",
        state: "ready",
      },
      {
        job: "Collie pump pad",
        jobNo: "BF-2025-0311",
        site: "Collie",
        plant: "EX20, WT12",
        hours: "12.5",
        quoted: "$6,200",
        committed: "$1,480",
        burn: 0.24,
        status: "Pre-start",
        state: "prestart",
      },
      {
        job: "Halifax bracket run",
        jobNo: "BF-2025-0296",
        site: "Halifax",
        plant: "Bay 2",
        hours: "9.0",
        quoted: "$3,150",
        committed: "$1,020",
        burn: 0.32,
        status: "Quoted",
        state: "quoted",
      },
      {
        job: "Australind service run",
        jobNo: "BF-2025-0288",
        site: "Australind",
        plant: "Ute 2",
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
        id: "docket",
        label: "Supplier docket",
        meta: "Kemerton pad",
        time: "9:22",
        sync: "synced",
        thumb: docketThumb,
      },
      {
        id: "site",
        label: "Second pour",
        meta: "Kemerton pad",
        time: "12:05",
        sync: "queued",
        thumb: siteThumb,
      },
      {
        id: "variation",
        label: "Variation 02",
        meta: "Signed on site",
        time: "13:15",
        sync: "queued",
        glyph: "signature",
      },
      {
        id: "hours",
        label: "Crew hours",
        meta: "Four crew",
        time: "16:40",
        sync: "synced",
        glyph: "hours",
      },
    ] satisfies ImsCaptureRow[],
    attentionHeading: "Needs a look",
    attention: [
      {
        title: "Variation 02 unsigned",
        meta: "Picton access, raised Tuesday",
        severity: "hold",
      },
      {
        title: "EX20 service due in 15.4 hrs",
        meta: "On the meter, not on a calendar",
        severity: "watch",
      },
      {
        title: "Electrical cert not filed",
        meta: "Treendale fitout, invoice ready",
        severity: "watch",
      },
    ] satisfies ImsAttentionRow[],
    books: {
      heading: "Beside the books",
      lead: "4 drafts ready for Xero",
      sync: "Last sync 7:02",
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
    day: {
      id: "day" as const,
      label: "Office light",
      href: { phone: "/lab/ims/phone-day", desk: "/lab/ims/desk-day" },
    },
    dusk: {
      id: "dusk" as const,
      label: "Cab dark",
      href: { phone: "/lab/ims/phone-dusk", desk: "/lab/ims/desk-dusk" },
    },
  },
};

export const IMS_PHONE = { width: 390, height: 844 } as const;
export const IMS_DESK = { width: 1440, height: 810 } as const;
