export type ImsPaintId = "day" | "dusk";

export type ImsJobRow = {
  job: string;
  hours: string;
  plant: string;
  status: "live" | "draft" | "prestart";
  statusLabel: string;
};

export const imsCopy = {
  labTitle: "IMS screens",
  labBody:
    "Lab only. Theoretical field and office chrome, plus native stills reshot so the screens sit in the glass. Same job system, two paints. Not a shipped product.",
  jobTitle: "Kemerton pad",
  demo: "DEMO",
  demoNote: "Theoretical IMS. Demo layout, not a live customer job.",
  productName: "BAD FORM Systems",
  tiles: [
    { label: "Hours", value: "7.0" },
    { label: "Plant", value: "EX20" },
    { label: "Cost", value: "live demo" },
  ],
  primary: [
    {
      id: "capture",
      label: "Capture docket",
      hint: "Photograph the paper docket",
    },
    {
      id: "hours",
      label: "Log hours",
      hint: "7.0 on this job",
    },
    {
      id: "prestart",
      label: "Pre-start",
      hint: "Plant EX20",
    },
  ],
  secondary: [
    { id: "jobs", label: "Jobs" },
    { id: "variations", label: "Variations" },
    { id: "certificates", label: "Certificates" },
  ],
  nav: [
    { id: "jobs", label: "Jobs" },
    { id: "capture", label: "Capture" },
    { id: "hours", label: "Hours" },
    { id: "prestart", label: "Pre-start" },
    { id: "variations", label: "Variations" },
    { id: "certificates", label: "Certificates" },
    { id: "plant", label: "Plant" },
  ],
  selectedNav: "jobs",
  jobsHeading: "Jobs",
  tableColumns: ["Job", "Hours", "Plant", "Status"] as const,
  jobs: [
    {
      job: "Kemerton pad",
      hours: "7.0",
      plant: "EX20",
      status: "live",
      statusLabel: "live demo",
    },
    {
      job: "Picton access",
      hours: "—",
      plant: "EX20",
      status: "draft",
      statusLabel: "draft",
    },
    {
      job: "Collie pump",
      hours: "—",
      plant: "—",
      status: "prestart",
      statusLabel: "pre-start",
    },
  ] satisfies ImsJobRow[],
  books: {
    heading: "Beside the books",
    lead: "Xero stays.",
    stats: [
      { label: "Hours", value: "7.0" },
      { label: "Cost", value: "live demo" },
    ],
    foot: "Live hours and cost as demo. Not a ledger replacement.",
  },
  paints: {
    day: {
      id: "day" as const,
      label: "Daylight cool",
      href: { phone: "/lab/ims/phone-day", desk: "/lab/ims/desk-day" },
    },
    dusk: {
      id: "dusk" as const,
      label: "Yard dusk",
      href: { phone: "/lab/ims/phone-dusk", desk: "/lab/ims/desk-dusk" },
    },
  },
  stills: {
    cabDay: "/images/hero-cab-day.webp",
    cabDusk: "/images/hero-cab-dusk.webp",
    officeDay: "/images/office-ims-day.webp",
    officeDusk: "/images/office-ims-dusk.webp",
    cabRollback: "/images/hero-cab-rollback.webp",
    officeRollback: "/images/office-ims-rollback.webp",
    cabObjectPositionClass: "object-[48%_46%]",
    officeObjectPositionClass: "object-[72%_32%]",
  },
};

export const IMS_PHONE = { width: 390, height: 844 } as const;
export const IMS_DESK = { width: 1440, height: 900 } as const;
