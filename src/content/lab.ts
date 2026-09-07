export const labCopy = {
  metaTitle: "Docket lab",
  metaDescription:
    "Demo: messy field notes turned into a draft invoice-shaped payload. Sample data, not a live customer job.",
  title: "Docket lab",
  body: "This is a demonstration. Paste messy notes or use a sample. The engine tries to pull line items, GST, and a draft ledger-shaped payload. Without a configured model key it returns a local sample so you can still see the shape.",
  inputLabel: "Field note, receipt text, or cab log",
  processLabel: "Process docket",
  outputHeading: "Normalised payload",
  copyLabel: "Copy JSON",
  loading: "Reading line items…",
  placeholder:
    "Press Process docket to run the demo.\nIf no model key is configured, you will get a local sample payload.",
  footerLeft: "Demo only",
  footerRight: "Not a live customer job",
  emptyError: "Enter or select a field note first.",
  failError: "Could not process the docket. Try again.",
  copyError: "Copy failed. Select the output and copy it manually.",
};

export const docketPresets: Record<string, { label: string; text: string }> = {
  trades: {
    label: "Trade docket",
    text: `JOB CARD #T-441 - TREENDALE COMMERCIAL ELECTRICAL & HVAC
Client: Treendale Medical Centre Extension | Builder: South West Commercial Builders
Lead Sparky: Trent Reynolds (Dual Trade A-Grade #EC-11902)
Hours: 8.0 hrs rough-in & 3-phase sub-board install @ $110/hr
Apprentice: Cooper Davies (8.0 hrs @ $55/hr)
Supplier Materials (Rexel Bunbury Invoice #RX-88301 PO# 4410):
- 100m 16mm 4-core & earth orange circular cable ($640.00)
- 1x 24-pole surface mount loadcentre switchboard ($315.00)
- 6x 20A 3-phase RCBO breakers ($82.50 ea -> $495.00)
Variation on-site: Builder requested additional 15A dedicated feed for sterilizer unit. Signed on site by Site Foreman (Craig M).
Safety: Lockout-tagout tested, electrical testing certificate #ET-WA-9041 verified.`,
  },
  civil: {
    label: "Wet hire",
    text: `DOCKET #7821 - PICTON CIVIL & EARTHWORKS
Date: 04/09/2026 | Site: Kemerton Lithium Access Road Sub-grade
Machine: Cat 330 Next Gen (Plant #EX-04) | Operator: Mick Taylor (6.5 hrs wet hire @ $210/hr)
Standby: 1.5 hrs rain delay waiting for compaction signoff @ $120/hr
Material: 3x Side tipper loads from Roelands Quarry - 14mm roadbase. 
Quarry Ticket weights: 31.4t, 32.1t, 29.8t (Total: 93.3 tonnes @ $28.50/t).
Supervisor signoff on-site: Dave Vance (Main Roads contractor). Signed ok.`,
  },
  fab: {
    label: "Fabrication",
    text: `JOB #F-902 - HALIFAX MECHANICAL & BOILERMAKING
Client: South West Port Crane Overhaul | Contact: Steve B.
Boilermaker Hours: 18.5 hrs shop fab @ $115/hr (Norm Henderson, Boilermaker Trade)
Consumables: 2x 350 Grade Plate 20mm (Cut to 1200x800mm) - Heat #HT-98442. 1x box E7018 low-hy electrodes.
NDI Ultrasonic testing completed by Bureau Veritas - Signoff Cert BV-WA-881 attached.
Blast & Primer completed in-house (3.5 hrs @ $95/hr). Ready for dispatch to Berth 3.`,
  },
  collie: {
    label: "Field service",
    text: `FIELD SERVICE DOCKET - COLLIE MINING SERVICES
Client: Griffin Dewatering Project | Plant: Godwin HL250M Diesel Pump
Technician: Jarrod Ross | Hours: 5 hrs site travel & labor @ $145/hr
Parts Used: 1x Mechanical Seal kit ($480), 2x Heavy suction gaskets ($45 ea), 20L Delo 400 engine oil ($130).
Issue: Replaced worn impeller wear ring. Tested pump running 85 PSI clean.
Pre-start hazard ID completed. JHA signed. DEMIRS water management checklist verified.`,
  },
};

export const labFallbackPayload = {
  status: "PROCESSED_VIA_LOCAL_FALLBACK",
  client_name: "Treendale Medical Centre Extension",
  site_location: "Treendale WA",
  line_items: [
    {
      description: "Lead A-Grade Electrician Labor (T. Reynolds)",
      quantity: 8.0,
      unit: "hours",
      unit_rate_aud: 110,
      subtotal_ex_gst: 880.0,
    },
    {
      description: "Apprentice Electrician Labor (C. Davies)",
      quantity: 8.0,
      unit: "hours",
      unit_rate_aud: 55,
      subtotal_ex_gst: 440.0,
    },
    {
      description: "100m 16mm 4C+E Orange Circular Cable (Rexel PO# 4410)",
      quantity: 1.0,
      unit: "roll",
      unit_rate_aud: 640,
      subtotal_ex_gst: 640.0,
    },
    {
      description: "24-Pole Surface Mount Switchboard",
      quantity: 1.0,
      unit: "unit",
      unit_rate_aud: 315,
      subtotal_ex_gst: 315.0,
    },
    {
      description: "20A 3-Phase RCBO Breakers",
      quantity: 6.0,
      unit: "units",
      unit_rate_aud: 82.5,
      subtotal_ex_gst: 495.0,
    },
  ],
  subtotal_ex_gst: 2770.0,
  gst_aud: 277.0,
  total_inc_gst: 3047.0,
  compliance_flags: {
    electrical_testing_certificate: "ET-WA-9041 (Logged)",
    site_foreman_signoff: "Craig M. (Approved)",
    variation_status: "LOCKED_TO_INVOICE",
  },
  xero_sync_payload: {
    invoice_type: "ACCREC",
    status: "DRAFT",
    account_code: "220 - Trade Services & Materials",
  },
};

export const ingestSystemInstruction = `You are the BAD FORM Western Australian Industrial & Trade Automation Engine.
Extract messy field notes, cab logs, trade counter dockets (Reece, Middy's, Rexel), and quarry dockets into a structured JSON schema ready for Xero/MYOB invoicing and compliance.
Include:
- client_name
- site_location
- line_items (array of description, quantity, unit, unit_rate_aud, subtotal_ex_gst)
- subtotal_ex_gst
- gst_aud
- total_inc_gst
- compliance_flags (WA WHS Act 2022 / Electrical testing cert / DEMIRS / supervisor signature verified)
- recommended_xero_account_code (e.g. 200 - Sales Revenue, 210 - Plant Wet Hire, 220 - Trade Services Labor, 230 - Materials Reimbursed)
Format strictly as JSON.`;
