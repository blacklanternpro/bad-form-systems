export const calculatorCopy = {
  metaTitle: "Ghost tax calculator",
  metaDescription:
    "Illustrative estimate of time and leakage from paper dockets and late invoices. Not a measured result or a quote.",
  title: "Ghost tax",
  body: "If hours are retyped and extras go unbilled, that cost is real for you even if nobody has measured it. Put in your own numbers. The total is an illustration, not a claim about South West businesses as a group, and not a quote.",
  controlsHeading: "Your numbers",
  resultLabel: "Illustrative annual drag",
  totalCaption: "Hours retyped plus extras you typed as monthly leakage, annualised. Not a quote.",
  adminLabel: "Admin hours, annualised",
  leakageLabel: "Monthly leakage, annualised",
  cashTrapLabel: "Invoice lag you entered",
  cashTrapSuffix: " days",
  cta: { href: "/contact", label: "Book a site visit" },
  hoursHelp: "Office time spent retyping dockets, chasing tickets, and matching receipts.",
  leakageHelp: "Unsigned extras, materials that never hit the job, hours that get disputed.",
};

export const calculatorDefaults = {
  hours: 14,
  hoursMin: 2,
  hoursMax: 40,
  rate: 55,
  rateMin: 35,
  rateMax: 110,
  rateStep: 5,
  lag: 9,
  lagMin: 1,
  lagMax: 25,
  leakage: 1800,
  leakageMin: 0,
  leakageMax: 10000,
  leakageStep: 200,
};
