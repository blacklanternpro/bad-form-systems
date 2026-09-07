type ContactBody = {
  name?: unknown;
  biz?: unknown;
  phone?: unknown;
  acc?: unknown;
  notes?: unknown;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function buildMailto(payload: {
  name: string;
  biz: string;
  phone: string;
  acc: string;
  notes: string;
}) {
  const address = process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.CONTACT_TO_EMAIL || "";
  if (!address) return null;
  const subject = encodeURIComponent(`Yard walkthrough: ${payload.biz}`);
  const body = encodeURIComponent(
    [
      `Name: ${payload.name}`,
      `Business: ${payload.biz}`,
      `Phone: ${payload.phone}`,
      `Accounting: ${payload.acc}`,
      "",
      "Bottleneck:",
      payload.notes || "(none provided)",
    ].join("\n"),
  );
  return `mailto:${address}?subject=${subject}&body=${body}`;
}

async function sendResend(to: string, payload: {
  name: string;
  biz: string;
  phone: string;
  acc: string;
  notes: string;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "BAD FORM Systems <noreply@bad-form.pro>",
      to: [to],
      subject: `Yard walkthrough: ${payload.biz}`,
      text: [
        `Name: ${payload.name}`,
        `Business: ${payload.biz}`,
        `Phone: ${payload.phone}`,
        `Accounting: ${payload.acc}`,
        "",
        "Bottleneck:",
        payload.notes || "(none provided)",
      ].join("\n"),
    }),
  });
  return res.ok;
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return Response.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  const payload = {
    name: asString(body.name),
    biz: asString(body.biz),
    phone: asString(body.phone),
    acc: asString(body.acc) || "xero",
    notes: asString(body.notes),
  };

  if (!payload.name || !payload.biz || !payload.phone) {
    return Response.json(
      { ok: false, message: "Name, business, and phone are required." },
      { status: 400 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const mailto = buildMailto(payload);

  if (process.env.RESEND_API_KEY && to) {
    const sent = await sendResend(to, payload);
    if (sent) {
      return Response.json({
        ok: true,
        message: "Request sent. We will contact you to lock a time at the yard or workshop.",
      });
    }
  }

  return Response.json(
    {
      ok: false,
      code: "delivery_unconfigured",
      message:
        "Email delivery is not configured on this site yet. Open an email draft to send the request directly.",
      mailto,
    },
    { status: 503 },
  );
}
