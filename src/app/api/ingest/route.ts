import { ingestSystemInstruction, labFallbackPayload } from "@/content/lab";

type IngestBody = {
  text?: unknown;
};

function fallbackResponse() {
  return Response.json({ ...labFallbackPayload, source: "fallback" });
}

function extractJson(raw: string): unknown {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const payload = fenced ? fenced[1].trim() : trimmed;
  return JSON.parse(payload) as unknown;
}

async function callGemini(apiKey: string, text: string): Promise<unknown> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }],
        systemInstruction: { parts: [{ text: ingestSystemInstruction }] },
        generationConfig: { responseMimeType: "application/json" },
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Gemini HTTP ${res.status}`);
  }

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!resultText) {
    throw new Error("Empty Gemini response");
  }
  return extractJson(resultText);
}

export async function POST(request: Request) {
  let body: IngestBody;
  try {
    body = (await request.json()) as IngestBody;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) {
    return Response.json({ error: "Missing field docket text" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return fallbackResponse();
  }

  try {
    const parsed = await callGemini(apiKey, text);
    if (parsed && typeof parsed === "object") {
      return Response.json({ ...(parsed as Record<string, unknown>), source: "gemini" });
    }
    return fallbackResponse();
  } catch {
    return fallbackResponse();
  }
}
