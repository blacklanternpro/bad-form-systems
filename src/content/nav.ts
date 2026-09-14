export type NavLink = {
  href: string;
  label: string;
};

export const siteName = "BAD FORM Systems";

export const navLinks: NavLink[] = [
  { href: "/", label: "Overview" },
  { href: "/coexistence", label: "How it works" },
  { href: "/sectors", label: "Sectors" },
  { href: "/contact", label: "Contact" },
];

export const headerNavLinks: NavLink[] = [
  { href: "/", label: "System" },
  { href: "/coexistence", label: "How it works" },
  { href: "/sectors", label: "Sectors" },
  { href: "/contact", label: "Contact" },
];

export const extraNavLinks: NavLink[] = [];

export const primaryCta: NavLink = {
  href: "/contact",
  label: "Book a site visit",
};

export const HASH_TO_PATH: Record<string, string> = {
  overview: "/",
  coexistence: "/coexistence",
  southwest: "/sectors",
  calculator: "/",
  pricing: "/coexistence",
  fieldtest: "/coexistence",
  contact: "/contact",
};

export const PATH_ALIASES: Record<string, string> = {
  "/overview": "/",
  "/southwest": "/sectors",
  "/calculator": "/",
  "/fieldtest": "/coexistence",
  "/pricing": "/coexistence",
  "/ghost-tax": "/",
  "/lab": "/coexistence",
};

export const footer = {
  blurb:
    "Job software your yard owns. Set up in your name, added to as the work grows, supported from Bunbury and the South West. Xero or MYOB stay the books.",
  copyright: "© 2026 BAD FORM Systems. Bunbury and South West WA.",
  integrations: "Connects to Xero and MYOB",
};
