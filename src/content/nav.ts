export type NavLink = {
  href: string;
  label: string;
};

export const siteName = "BAD FORM Systems";

export const navLinks: NavLink[] = [
  { href: "/", label: "Overview" },
  { href: "/coexistence", label: "Build" },
  { href: "/sectors", label: "Sectors" },
  { href: "/lab", label: "Lab" },
  { href: "/contact", label: "Contact" },
];

export const headerNavLinks: NavLink[] = [
  { href: "/", label: "System" },
  { href: "/coexistence", label: "Build" },
  { href: "/sectors", label: "Sectors" },
  { href: "/contact", label: "Contact" },
];

export const extraNavLinks: NavLink[] = [{ href: "/lab", label: "Lab" }];

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
    "Custom job software this company owns, expanded as the yard grows, supported in Bunbury and the South West. Xero or MYOB stay the books.",
  copyright: "© 2026 BAD FORM Systems. Bunbury and South West WA.",
  integrations: "Connects to Xero and MYOB",
};
