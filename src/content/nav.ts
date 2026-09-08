export type NavLink = {
  href: string;
  label: string;
};

export const siteName = "BAD FORM Systems";

export const navLinks: NavLink[] = [
  { href: "/", label: "Overview" },
  { href: "/coexistence", label: "Coexistence" },
  { href: "/sectors", label: "Sectors" },
  { href: "/ghost-tax", label: "Ghost tax" },
  { href: "/pricing", label: "Pricing" },
  { href: "/lab", label: "Docket lab" },
];

export const headerNavLinks: NavLink[] = [
  { href: "/", label: "System" },
  { href: "/coexistence", label: "Process" },
  { href: "/sectors", label: "Sectors" },
  { href: "/contact", label: "Contact" },
];

export const extraNavLinks: NavLink[] = [
  { href: "/ghost-tax", label: "Ghost tax" },
  { href: "/pricing", label: "Pricing" },
  { href: "/lab", label: "Docket lab" },
];

export const primaryCta: NavLink = {
  href: "/contact",
  label: "Book a site visit",
};

export const HASH_TO_PATH: Record<string, string> = {
  overview: "/",
  coexistence: "/coexistence",
  southwest: "/sectors",
  calculator: "/ghost-tax",
  pricing: "/pricing",
  fieldtest: "/lab",
  contact: "/contact",
};

export const PATH_ALIASES: Record<string, string> = {
  "/overview": "/",
  "/southwest": "/sectors",
  "/calculator": "/ghost-tax",
  "/fieldtest": "/lab",
};

export const footer = {
  blurb:
    "Custom operations systems for trade, civil, fabrication, and fleet crews in Bunbury and the South West. Built to sit beside Xero or MYOB.",
  copyright: "© 2026 BAD FORM Systems. Bunbury and South West WA.",
  integrations: "Connects to Xero and MYOB",
};
