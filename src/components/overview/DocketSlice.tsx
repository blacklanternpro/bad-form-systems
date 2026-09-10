"use client";

import { ArrowRight, Warning } from "@phosphor-icons/react";
import Link from "next/link";
import { useId, useState } from "react";
import { docketPresets } from "@/content/lab";
import { overview } from "@/content/overview";

type DraftLine = {
  description: string;
  quantity: number | null;
  unit: string | null;
  rate: number | null;
  amount: number | null;
};

type Draft = {
  client: string | null;
  site: string | null;
  lines: DraftLine[];
  subtotal: number | null;
  gst: number | null;
  total: number | null;
  flags: { label: string; value: string }[];
  account: string | null;
  fallback: boolean;
  raw: string;
};

const presetKeys = Object.keys(docketPresets);

const money = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 2,
});

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asText(value: unknown): string | null {
  if (typeof value === "string" && value.trim().length > 0) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

/** Turn a spelled-out key into a readable label: gst_aud becomes Gst aud. */
function humanise(key: string): string {
  const words = key.replace(/[_-]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * The route answers from a model when a key is configured and from a local
 * sample when it is not, so the shape is close but never guaranteed. Anything
 * that cannot be read falls through to the payload view instead of throwing.
 */
function readDraft(payload: unknown): Draft {
  const record = asRecord(payload) ?? {};
  const rawItems = Array.isArray(record.line_items) ? record.line_items : [];

  const lines: DraftLine[] = rawItems.flatMap((item) => {
    const row = asRecord(item);
    const description = row ? asText(row.description) : null;
    if (!row || !description) return [];
    return [
      {
        description,
        quantity: asNumber(row.quantity),
        unit: asText(row.unit),
        rate: asNumber(row.unit_rate_aud ?? row.unit_rate),
        amount: asNumber(row.subtotal_ex_gst ?? row.amount),
      },
    ];
  });

  const complianceFlags = asRecord(record.compliance_flags) ?? {};
  const flags = Object.entries(complianceFlags).flatMap(([key, value]) => {
    const text = asText(value);
    return text ? [{ label: humanise(key), value: text }] : [];
  });

  const xero = asRecord(record.xero_sync_payload);
  const account =
    asText(record.recommended_xero_account_code) ?? (xero ? asText(xero.account_code) : null);

  return {
    client: asText(record.client_name),
    site: asText(record.site_location),
    lines,
    subtotal: asNumber(record.subtotal_ex_gst),
    gst: asNumber(record.gst_aud),
    total: asNumber(record.total_inc_gst),
    flags: flags.slice(0, 3),
    account,
    fallback: asText(record.source) === "fallback",
    raw: JSON.stringify(payload, null, 2),
  };
}

function Amount({ value }: { value: number | null }) {
  return <span className="type-data text-[0.85rem]">{value === null ? "" : money.format(value)}</span>;
}

export function DocketSlice() {
  const copy = overview.demo;
  const inputId = useId();
  const [preset, setPreset] = useState(presetKeys[0]);
  const [text, setText] = useState(docketPresets[presetKeys[0]].text);
  const [draft, setDraft] = useState<Draft | null>(null);
  /* Bumped on every read so the result block remounts and the line items rise in
     sequence again. Without it a second read swaps the numbers with no signal
     that anything happened. */
  const [run, setRun] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPayload, setShowPayload] = useState(false);

  async function readDocket() {
    const body = text.trim();
    if (body.length === 0) {
      setError(copy.idle);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: body }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setDraft(readDraft((await response.json()) as unknown));
      setRun((value) => value + 1);
    } catch {
      setError(copy.error);
      setDraft(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-brand-black py-12 md:py-16" aria-labelledby="demo-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="demo-heading"
          className="type-hero max-w-[18ch] text-[1.6rem] text-brand-ink md:text-[2rem]"
        >
          {copy.heading}
        </h2>
        <p className="type-body mt-4 max-w-[56ch] text-brand-steel">{copy.lead}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              {presetKeys.map((key) => {
                const active = key === preset;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setPreset(key);
                      setText(docketPresets[key].text);
                      setError(null);
                      setDraft(null);
                    }}
                    className={`min-h-11 rounded-sm border px-3.5 text-[0.8125rem] leading-5 transition-colors active:translate-y-px ${
                      active
                        ? "border-brand-ink bg-brand-stamp font-semibold text-brand-cobalt"
                        : "border-brand-border bg-brand-card text-brand-steel hover:text-brand-ink"
                    }`}
                  >
                    {docketPresets[key].label}
                  </button>
                );
              })}
            </div>

            <label htmlFor={inputId} className="type-label mb-2 block">
              {copy.sourceLabel}
            </label>
            <textarea
              id={inputId}
              value={text}
              rows={10}
              spellCheck={false}
              onChange={(event) => {
                setText(event.target.value);
                setError(null);
              }}
              className="field-control h-[15rem] resize-y font-[family-name:var(--font-docket)] text-[0.8125rem] leading-6"
            />

            <button
              type="button"
              onClick={readDocket}
              disabled={loading}
              className="btn-primary mt-4 min-h-11 active:translate-y-px"
            >
              {loading ? copy.loading : copy.actionLabel}
            </button>
          </div>

          <div className="rounded-sm border border-brand-ink bg-brand-card">
            <div className="flex items-baseline justify-between gap-4 border-b border-brand-border-muted px-4 py-3 sm:px-5">
              <h3 className="type-data text-[0.8rem] text-brand-ink">{copy.resultLabel}</h3>
              {draft && !loading ? (
                <button
                  type="button"
                  onClick={() => setShowPayload((value) => !value)}
                  className="type-meta underline decoration-brand-ply decoration-2 underline-offset-4 hover:text-brand-ink"
                >
                  {showPayload ? "Show the invoice" : "Show the payload"}
                </button>
              ) : null}
            </div>

            <div className="px-4 py-4 sm:px-5" aria-live="polite" aria-busy={loading}>
              {error ? (
                <p className="flex items-start gap-2 text-[0.9rem] text-brand-ink" role="alert">
                  <Warning size={18} weight="bold" className="mt-0.5 shrink-0" aria-hidden />
                  {error}
                </p>
              ) : loading ? (
                <ul className="space-y-3">
                  {[0, 1, 2, 3].map((row) => (
                    <li
                      key={row}
                      className="h-9 animate-pulse rounded-sm bg-brand-card-hover motion-reduce:animate-none"
                    />
                  ))}
                </ul>
              ) : !draft ? (
                <div>
                  <ul className="space-y-2">
                    {[0, 1, 2].map((row) => (
                      <li
                        key={row}
                        className="h-9 rounded-sm border border-dashed border-brand-border-muted"
                      />
                    ))}
                  </ul>
                  <p className="type-meta mt-4">{copy.idle}</p>
                </div>
              ) : showPayload ? (
                <pre className="type-data max-h-[22rem] overflow-auto text-[0.75rem] leading-5 text-brand-ink">
                  {draft.raw}
                </pre>
              ) : (
                <div>
                  {draft.client ? (
                    <p className="mb-4 text-[0.95rem] leading-6 text-brand-ink">
                      <span className="font-semibold">{draft.client}</span>
                      {draft.site ? (
                        <span className="type-meta block">{draft.site}</span>
                      ) : null}
                    </p>
                  ) : null}

                  {draft.lines.length > 0 ? (
                    <dl
                      key={run}
                      className="divide-y divide-brand-border-muted border-t border-brand-border-muted"
                    >
                      {draft.lines.map((line, index) => (
                        <div
                          key={line.description}
                          className="enter flex items-baseline justify-between gap-4 py-2.5"
                          style={{ "--enter-delay": `${index * 70}ms` } as React.CSSProperties}
                        >
                          <dt className="max-w-[28ch] text-[0.9rem] leading-5 text-brand-ink">
                            {line.description}
                            {line.quantity !== null ? (
                              <span className="type-meta block">
                                {line.quantity}
                                {line.unit ? ` ${line.unit}` : ""}
                                {line.rate !== null ? ` at ${money.format(line.rate)}` : ""}
                              </span>
                            ) : null}
                          </dt>
                          <dd className="shrink-0 text-right">
                            <Amount value={line.amount} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <pre className="type-data max-h-[18rem] overflow-auto text-[0.75rem] leading-5">
                      {draft.raw}
                    </pre>
                  )}

                  {draft.subtotal !== null || draft.total !== null ? (
                    <dl
                      key={`totals-${run}`}
                      className="enter mt-3 border-t border-brand-ink pt-3"
                      style={
                        {
                          "--enter-delay": `${draft.lines.length * 70 + 60}ms`,
                        } as React.CSSProperties
                      }
                    >
                      {[
                        { label: "Subtotal, ex GST", value: draft.subtotal },
                        { label: "GST", value: draft.gst },
                        { label: "Total, inc GST", value: draft.total },
                      ]
                        .filter((row) => row.value !== null)
                        .map((row) => (
                          <div key={row.label} className="flex justify-between gap-4 py-1">
                            <dt className="type-meta">{row.label}</dt>
                            <dd>
                              <Amount value={row.value} />
                            </dd>
                          </div>
                        ))}
                    </dl>
                  ) : null}

                  {draft.account ? (
                    <p className="type-meta mt-4 border-t border-brand-border-muted pt-3">
                      Coded to {draft.account}
                    </p>
                  ) : null}

                  {draft.flags.length > 0 ? (
                    <ul className="mt-3 space-y-1">
                      {draft.flags.map((flag) => (
                        <li key={flag.label} className="type-meta">
                          {flag.label}: {flag.value}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {draft.fallback ? (
                    <p className="type-meta mt-4 border-t border-brand-border-muted pt-3">
                      {copy.fallbackNote}
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-brand-border-muted pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-meta max-w-[48ch]">{copy.note}</p>
          <Link href={copy.link.href} className="btn-text min-h-11 shrink-0 text-[0.85rem]">
            {copy.link.label}
            <ArrowRight size={14} weight="bold" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
