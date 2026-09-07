export const coexistence = {
  metaTitle: "How BAD FORM fits",
  metaDescription:
    "Keep Xero or MYOB. We build the operations layer between the field and the office.",
  title: "Xero stays. We build what sits in front of it.",
  body: "You do not have to throw out the ledger, change bank feeds, or send the accountant to training. We build the job and field layer, then push clean drafts into the tool you already run.",
  layers: [
    {
      owner: "You keep this",
      title: "Accounting",
      stack: "Xero or MYOB",
      body: "General ledger, payroll, super, and BAS stay where they are. Official APIs carry drafts in so the bookkeeper is not retyping dockets.",
      items: ["No bookkeeper retraining", "Bank rec stays in the ledger", "Invoices drafted, not reinvented"],
    },
    {
      owner: "We build this",
      title: "Job system",
      stack: "Built for this yard",
      body: "The office view of jobs, plant, costing, and billing. Schedules, quarry reconciliations, fabrication stages, or trade variations: only what this operation actually runs.",
      items: ["Replaces the master spreadsheet", "Job cost visible while the job is live", "Shaped around your dispatch, not a generic trade template"],
    },
    {
      owner: "Crews use this",
      title: "Ute and cab capture",
      stack: "Phone, photo, voice",
      body: "The bit in the pocket. Photograph a quarry ticket or wholesaler docket. Speak a short hours note. Pre-start and sign-off without a desktop workflow on a dusty screen.",
      items: ["Works when the phone has no signal", "Line items pulled from the photo", "No app-store install required"],
    },
  ],
  loopTitle: "An example day, not a guarantee",
  loop: [
    {
      time: "Start of day",
      place: "Yard and ute",
      lead: "Pre-start and job pack on the phone.",
      body: "Safety check and drawings on the device that is already in the cab.",
    },
    {
      time: "Mid-morning",
      place: "On site",
      lead: "A supplier or quarry docket arrives.",
      body: "Photograph it. Materials hit the job instead of the glovebox.",
    },
    {
      time: "Knock-off",
      place: "Office",
      lead: "The job cost is current.",
      body: "Hours, plant, and sign-off are already in the system, not on a pad in the ute.",
    },
    {
      time: "Same afternoon",
      place: "Xero",
      lead: "A draft invoice is waiting.",
      body: "Pushed to the ledger with the docket attached, ready for the bookkeeper to send.",
    },
  ],
};
